# Quick Start

This document will help you start the project from scratch.

## Environment Preparation

Make sure your environment meets the following requirements:

| Tool | Version |
|------|---------|
| Git | - |
| Python | >= 3.12 |
| Node.js | >= 20.0.0 |
| uv | latest |
| pnpm | >= 10.5 |

## Get the Code

```bash
git clone https://github.com/sleep1223/fast-soy-admin.git
cd fast-soy-admin
```

## Method 1: Docker Deployment (Recommended)

```bash
docker compose up -d
```

Visit `http://localhost:1880`. Services include:
- **Nginx** (:1880) — Frontend + API proxy
- **FastAPI** (:9999) — Backend API
- **Redis** (:6379) — Cache

Update and redeploy:

```bash
docker compose down && docker compose up -d
```

## Method 2: Local Development

### Backend Setup

```bash
# Install dependencies
uv sync

# Start backend server (port 9999)
uv run python run.py
```

### Frontend Setup

```bash
# Install dependencies
cd web && pnpm install

# Start dev server (port 9527)
pnpm dev
```

## VSCode Plugins

Recommended plugins for development:

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) — Vue language service
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) — Code checking
- [UnoCSS](https://marketplace.visualstudio.com/items?itemName=antfu.unocss) — UnoCSS hints
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) — Icon preview
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally) — i18n plugin
- [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) — Python support
- [Ruff](https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff) — Python linting
- [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) — Python type checking

## Project Structure

```
fast-soy-admin/
├── app/                       # Backend (FastAPI)
│   ├── __init__.py            # App factory, middleware, startup hooks
│   ├── api/v1/                # API routers
│   │   ├── auth/              # Authentication (login, token refresh)
│   │   ├── route/             # Dynamic route management
│   │   └── system_manage/     # System management (users, roles, menus)
│   ├── controllers/           # Business logic layer
│   ├── models/system/         # Tortoise ORM models
│   ├── schemas/               # Pydantic request/response schemas
│   ├── core/                  # Core modules (init, auth, CRUD, middleware)
│   ├── settings/config.py     # Environment configuration
│   └── utils/                 # Utilities (security, tools)
├── web/                       # Frontend (Vue3)
│   ├── src/
│   │   ├── views/             # Page components
│   │   ├── service-alova/     # HTTP client + API endpoints
│   │   ├── store/modules/     # Pinia state management
│   │   ├── router/            # Elegant Router + guards
│   │   ├── layouts/           # Layout components
│   │   ├── components/        # Reusable components
│   │   ├── locales/           # i18n (zh-CN, en-US)
│   │   ├── hooks/             # Vue composables
│   │   └── typings/           # TypeScript declarations
│   └── packages/              # Internal monorepo packages
├── deploy/                    # Docker deployment configs
├── migrations/                # Database migrations (Aerich)
├── docker-compose.yml         # Docker Compose orchestration
├── pyproject.toml             # Backend dependencies
└── run.py                     # Backend entry point
```

## npm / Python Scripts

### Frontend (web/)

```json
{
  "dev": "vite --mode test",              // Dev server
  "build": "vite build --mode prod",      // Production build
  "lint": "oxlint --fix && eslint --fix .",// Lint and fix
  "typecheck": "vue-tsc --noEmit"         // Type check
}
```

### Backend

```bash
uv run python run.py          # Start server
ruff check app/               # Lint
ruff format app/              # Format
pyright app                   # Type check
pytest tests/ -v              # Run tests
```
