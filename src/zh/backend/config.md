# 配置

## 后端配置 (.env)

```bash
SECRET_KEY=your-secret-key
DEBUG=true
CORS_ORIGINS=["http://localhost:9527"]
DB_PATH=app_system.sqlite3
REDIS_URL=redis://localhost:6379/0
ACCESS_TOKEN_EXPIRE=720        # 分钟
REFRESH_TOKEN_EXPIRE=7         # 天
```

## 前端配置 (web/.env)

```bash
VITE_AUTH_ROUTE_MODE=dynamic
VITE_ROUTE_HOME=home
VITE_SERVICE_SUCCESS_CODE=0000
VITE_SERVICE_LOGOUT_CODES=2100,2101
VITE_SERVICE_MODAL_LOGOUT_CODES=2102
VITE_SERVICE_EXPIRED_TOKEN_CODES=2103
```

## 代码规范

- `ruff.toml`：行宽 200，规则 E/F/I，双引号
- Pyright：standard 模式，检查 `app/` 目录
- ESLint：基于 @soybeanjs/eslint-config-vue
