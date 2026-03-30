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
```

### 更新部署

```bash
git pull
docker compose down && docker compose up -d
```

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
