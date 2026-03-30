# 常见问题

## 前端

### 修改 .env 文件后不生效

需要重启 Vite 开发服务器。

### 路由不在菜单中显示

检查路由 meta 是否设置了 `hideInMenu: true`。

### 静态路由 vs 动态路由

- 静态：前端定义路由，`roles` 过滤
- 动态：后端 API 返回路由

### 跨域错误

开发环境使用 Vite 代理，生产环境使用 Nginx 反向代理。

### 生产环境 404

确保 Nginx 配置了 `try_files $uri $uri/ /index.html`。

### 多根元素错误

`.vue` 模板中只能有一个根元素。

## 后端

### Redis 连接失败

确保 Redis 已启动：`redis-cli ping` 应返回 `PONG`。

### API 自动注册不生效

重启后端服务：`uv run python run.py`。

### 数据库迁移错误

```bash
rm -rf migrations/
aerich init-db
```

## Docker

### 查看日志

```bash
docker compose logs -f app
```
