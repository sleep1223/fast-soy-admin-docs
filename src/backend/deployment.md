# 部署

## Docker Compose（推荐）

```bash
git clone https://github.com/sleep1223/fast-soy-admin
cd fast-soy-admin
docker compose up -d
```

| 服务 | 端口 | 说明 |
|------|------|------|
| nginx | 1880 | 前端 + API 反向代理 |
| app | 9999 | FastAPI 后端 |
| redis | 6379 | 缓存层 |

### 查看日志

```bash
docker compose logs -f          # 所有服务
docker compose logs -f app      # 仅后端
make logs                       # 等价的 Makefile 入口；可加 SVC=app|nginx|redis、TAIL=N
```

### 更新部署

```bash
git pull
docker compose down && docker compose up -d --build   # 代码变更要加 --build（或 make rebuild）
docker compose exec app uv run tortoise migrate       # 若本次更新含模型变更
```

## Docker 下的数据库初始化与迁移

> 核心原则：
>
> - **迁移文件**（`migrations/` 目录）由开发者在本地生成、随 git 提交、随镜像 `COPY` 进容器；
> - **迁移执行**（建表 / 升级表结构 / 跑初始化数据）由运维在容器里执行。
>
> 启动时**不会**自动迁移——新部署必须手动 `initdb`，后续模型变更必须手动 `migrate`。

### 数据持久化前置检查

默认 `docker-compose.yml` 仅声明了 `redis_data` / `static_data` 两个卷，**SQLite 文件没挂卷**（位于容器内 `/opt/fast-soy-admin/app_system.sqlite3`），`docker compose down` 或 `--build` 重建后会丢。生产务必二选一：

- **切外部数据库**：把 `.env.docker` 里的 `DB_URL` 指向外部 Postgres/MySQL；
- **把 SQLite 挂卷**：在 `app` 服务下加 `- sqlite_data:/opt/fast-soy-admin/db`，再把 `file_path` 改成 `db/app_system.sqlite3`。

### 首次部署（initdb）

`make up` / `docker compose up -d` **不会自动建表**。新库第一次启动时，后端连上去会发现表不存在（日志里能看到 `no such table: ...` 之类的报错）——这是预期行为，手动触发一次 `initdb` 即可：

```bash
make up                                                               # 起容器
docker compose exec app uv run python -m app.cli initdb               # 建表 + 写入基础数据
docker compose restart app                                            # 让后端重连到已建好的库
```

几个容易踩的点：

- **`initdb` 必须在容器里跑，不能在宿主机跑**。compose 用 `.env.docker`，`DB_URL` / Redis 地址都指向容器网络；宿主机 `make initdb` 会写到宿主机本地的 `app_system.sqlite3`，跟容器里的是两个文件。
- **`initdb` 只能在全新库上跑一次**，它不是幂等建表，表已存在会报错。之后任何模型变更一律走 `migrate`（见下一节）。
- **判断该 `initdb` 还是 `migrate`**：

  ```bash
  docker compose exec app uv run tortoise history
  ```

  报错 / 无输出 → 空库，跑 `initdb`；有历史但不是最新 → 跑 `migrate`。

- **确认 SQLite 文件位置**（默认容器内 `/opt/fast-soy-admin/app_system.sqlite3`，未挂卷时 `down` 会丢）：

  ```bash
  docker compose exec app ls -la /opt/fast-soy-admin/app_system.sqlite3
  ```

### 日常模型变更（makemigrations + migrate）

推荐流程：**本地生成迁移、提交 git、服务器重建并执行**。

```bash
# --- 本地（开发机） ---
# 1. 改 app/**/models.py
make makemigrations                 # 生成 migrations/models/*.py
git add migrations/ app/
git commit -m "feat(xxx): ..."
git push

# --- 服务器 ---
git pull
docker compose up -d --build app    # 重建包含新代码 + 新迁移文件的镜像
docker compose exec app uv run tortoise migrate
docker compose exec app uv run tortoise history   # 确认迁移已应用
```

为什么不在容器里 `makemigrations`：容器内生成的迁移文件在 `docker compose down` 后会随容器销毁，且不会回流到 git，下次重建会重新生成冲突。**迁移文件属于代码，必须在本地生成并入库。**

### 业务模块 `init_data.init()` 何时跑

不是迁移——是**每次启动由 Redis leader worker 自动执行**的幂等对账（菜单 / 角色 / API / 业务种子数据）。所以：

- 新增业务模块 / 修改 `init_data.py` 后，`docker compose up -d --build` 即可，**不需要手动触发**；
- 但表结构变更仍然要先 `migrate`，`init_data` 依赖表已存在。

启动期的完整顺序见 [启动初始化与对账](./init-data.md)。

### 常用排错命令

```bash
docker compose exec app uv run tortoise history            # 查看已应用的迁移
docker compose exec app uv run tortoise heads              # 查看最新迁移头
docker compose logs -f app | grep -iE "migrate|tortoise"   # 观察启动期日志
docker compose exec app sh -c 'ls -la migrations/models/'  # 确认迁移文件已随镜像打包
```

### 回滚

Tortoise 的 `downgrade` 对 SQLite 支持有限，生产回滚推荐方案：

1. 先从备份恢复数据库文件 / 快照（SQLite 直接还原 `app_system.sqlite3`，外部库走 DBA 通道）；
2. `git revert` 对应的代码 + 迁移提交；
3. `docker compose up -d --build`。

不要试图在生产用 `tortoise downgrade` 回滚结构变更。

## 手动部署

### 后端

```bash
uv sync --no-dev
uvicorn app:app --host 0.0.0.0 --port 9999 --workers 4
```

### 前端

```bash
cd web && pnpm install && pnpm build
# 将 dist/ 部署到 Web 服务器
```

### Nginx 配置

```nginx
server {
    listen 80;
    root /path/to/web/dist;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:9999;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
