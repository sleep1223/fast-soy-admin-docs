# Configuration

## Backend Configuration

Configuration is managed via `pydantic-settings` in `app/settings/config.py`, loaded from the `.env` file at the project root.

### Environment Variables

```bash
# .env
SECRET_KEY=your-secret-key-change-in-production
DEBUG=true

# CORS
CORS_ORIGINS=["http://localhost:9527"]

# Database
DB_PATH=app_system.sqlite3

# Redis
REDIS_URL=redis://localhost:6379/0

# JWT
ACCESS_TOKEN_EXPIRE=720        # Minutes (12 hours)
REFRESH_TOKEN_EXPIRE=7         # Days
```

### Settings Class

```python
class Settings(BaseSettings):
    SECRET_KEY: str
    DEBUG: bool = True
    CORS_ORIGINS: list[str] = ["*"]
    DB_PATH: str = "app_system.sqlite3"
    REDIS_URL: str = "redis://localhost:6379/0"
    ACCESS_TOKEN_EXPIRE: int = 720
    REFRESH_TOKEN_EXPIRE: int = 7

    model_config = SettingsConfigDict(env_file=".env")
```

## Frontend Configuration

### Common (.env)

```bash
# Authentication mode: static (frontend) or dynamic (backend)
VITE_AUTH_ROUTE_MODE=dynamic

# Default home route after login
VITE_ROUTE_HOME=home

# Response code handling
VITE_SERVICE_SUCCESS_CODE=0000
VITE_SERVICE_LOGOUT_CODES=2100,2101
VITE_SERVICE_MODAL_LOGOUT_CODES=2102
VITE_SERVICE_EXPIRED_TOKEN_CODES=2103

# Icon prefixes
VITE_ICON_PREFIX=icon
VITE_ICON_LOCAL_PREFIX=icon-local
```

### Test Environment (.env.test)

```bash
VITE_SERVICE_BASE_URL=/api/v1
```

### Production Environment (.env.prod)

```bash
VITE_SERVICE_BASE_URL=/api/v1
```

## Code Quality Configuration

### Ruff (ruff.toml)

```toml
line-length = 200
select = ["E", "F", "I"]
quote-style = "double"
```

### Pyright (pyproject.toml)

```toml
[tool.pyright]
include = ["app"]
pythonVersion = "3.12"
typeCheckingMode = "standard"
```

### ESLint

Based on `@soybeanjs/eslint-config-vue` with oxlint integration.
