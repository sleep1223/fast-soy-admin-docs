# Backend Introduction

The backend is built with **FastAPI** and follows a layered architecture: Router → Controller → CRUD/Model.

## Tech Stack

| Technology | Description |
|-----------|-------------|
| [FastAPI](https://fastapi.tiangolo.com/) | High-performance async web framework |
| [Pydantic v2](https://docs.pydantic.dev/) | Data validation and serialization |
| [Tortoise ORM](https://tortoise.github.io) | Async ORM for Python |
| [Aerich](https://github.com/tortoise/aerich) | Database migrations for Tortoise |
| [Redis](https://redis.io/) | Cache layer via fastapi-cache2 |
| [Argon2](https://argon2-cffi.readthedocs.io/) | Secure password hashing |
| [PyJWT](https://pyjwt.readthedocs.io/) | JWT token creation and validation |
| [Loguru](https://loguru.readthedocs.io/) | Structured logging |
| [uv](https://docs.astral.sh/uv/) | Fast Python package manager |
| [Ruff](https://docs.astral.sh/ruff/) | Python linter and formatter |
| [Pyright](https://microsoft.github.io/pyright/) | Static type checker |

## Directory Structure

```
app/
├── __init__.py            # App factory, middleware, startup hooks
├── api/v1/                # API routers (grouped by domain)
│   ├── auth/              # Authentication (login, token refresh)
│   ├── route/             # Dynamic route management
│   └── system_manage/     # Users, roles, menus CRUD
├── controllers/           # Business logic layer
│   ├── user.py            # UserController
│   ├── role.py            # RoleController
│   ├── menu.py            # MenuController
│   └── api.py             # ApiController
├── models/system/         # Tortoise ORM models
│   ├── admin.py           # User, Role, Menu, Api, Button
│   └── utils.py           # Base model, enums
├── schemas/               # Pydantic request/response schemas
│   ├── base.py            # Success, Fail, SuccessExtra wrappers
│   ├── users.py           # User schemas
│   ├── admin.py           # Admin schemas
│   └── login.py           # Login/JWT schemas
├── core/                  # Core modules
│   ├── init_app.py        # DB, exceptions, router registration
│   ├── dependency.py      # AuthControl, PermissionControl
│   ├── crud.py            # Generic CRUD base class
│   ├── code.py            # Business response codes
│   ├── exceptions.py      # Custom exception handlers
│   ├── middlewares.py      # Request logging, background tasks
│   ├── ctx.py             # Context variables
│   └── redis.py           # Redis connection
├── settings/config.py     # Pydantic Settings (.env)
├── utils/
│   ├── security.py        # Password hashing, JWT
│   └── tools.py           # Utility functions
├── monitor/               # System monitoring APIs
└── radar/                 # Request/response debugger
```

## Quick Start

```bash
# Install dependencies
uv sync

# Start development server (port 9999)
uv run python run.py

# Code quality checks
ruff check app/            # Lint
ruff format app/           # Format
pyright app                # Type check
pytest tests/ -v           # Tests
```

## Startup Flow

1. Register Tortoise ORM (database connection + model discovery)
2. Register Aerich (database migrations)
3. Register exception handlers
4. Mount API routers at `/api/v1`
5. Register middleware stack
6. Auto-register API endpoints to database (for RBAC)
