# Introduction

[FastSoyAdmin](https://github.com/sleep1223/fast-soy-admin) is an out-of-the-box full-stack admin template. The frontend is built on [SoybeanAdmin](https://github.com/soybeanjs/soybean-admin) with Vue3, Vite7, TypeScript, Pinia and UnoCSS. The backend uses FastAPI, Pydantic v2 and Tortoise ORM, accelerated by Redis caching.

## Features

- **Full-Stack Tech Stack**: Backend FastAPI + Pydantic v2 + Tortoise ORM, Frontend Vue3 + Vite7 + TypeScript + Pinia + UnoCSS
- **Complete RBAC Permission System**: Role-based access control at menu, API and button level
- **Redis Cache Acceleration**: Integrated fastapi-cache2 + Redis for fast API responses
- **Clean Project Structure**: pnpm monorepo management, backend layered architecture (Router → Controller → CRUD/Model)
- **Strict Code Standards**: Frontend ESLint + oxlint; Backend Ruff + Pyright
- **Full TypeScript Coverage**: Strict type checking across the stack
- **Rich Theme Configuration**: Multiple theme schemes deeply integrated with UnoCSS
- **Internationalization**: vue-i18n multi-language support (Chinese / English)
- **Rich Pages & Components**: Built-in error pages, ECharts, AntV, VChart visualizations
- **Mobile Responsive**: Responsive layout with mobile support
- **Docker One-Click Deploy**: Nginx + FastAPI + Redis via Docker Compose

## Tech Stack

### Backend

| Technology | Version | Description |
|-----------|---------|-------------|
| Python | >= 3.12 | Runtime |
| FastAPI | >= 0.121 | Web framework |
| Pydantic | v2 | Data validation & serialization |
| Tortoise ORM | >= 0.25 | Async ORM |
| Aerich | >= 0.9 | Database migrations |
| Redis | - | Cache (fastapi-cache2) |
| Argon2 | - | Password hashing |
| PyJWT | - | JWT tokens |

### Frontend

| Technology | Version | Description |
|-----------|---------|-------------|
| Vue | 3.5 | Frontend framework |
| Vite | 7 | Build tool |
| TypeScript | 5.9 | Type system |
| Naive UI | 2.44 | Component library |
| Pinia | 3 | State management |
| UnoCSS | 66+ | Atomic CSS |
| Alova | - | HTTP client |
| Elegant Router | 0.3 | File routing |
| vue-i18n | 11 | Internationalization |

## Architecture

```
┌─────────────────────────────────────────────────┐
│                    Nginx (:1880)                 │
│         Static assets + /api/* proxy             │
├─────────────────────┬───────────────────────────┤
│   Frontend (:9527)  │     Backend (:9999)        │
│   Vue3 + Vite7      │     FastAPI                │
│                     │                            │
│   Views             │     Router (api/v1/)       │
│     ↓               │       ↓                    │
│   Store (Pinia)     │     Controller             │
│     ↓               │       ↓                    │
│   Service (Alova)   │     CRUD / Model           │
│     ↓               │       ↓                    │
│   HTTP Request ─────┼──→  API Endpoint           │
│                     │       ↓                    │
│                     │     SQLite / Redis          │
└─────────────────────┴───────────────────────────┘
```

## Links

- [Live Preview](https://fast-soy-admin.sleep0.de/)
- [GitHub Repository](https://github.com/sleep1223/fast-soy-admin)
- [API Documentation (Apifox)](https://apifox.com/apidoc/shared-7cd78102-46eb-4701-88b1-3b49c006504b)
- [SoybeanAdmin (Frontend Upstream)](https://github.com/soybeanjs/soybean-admin)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Tortoise ORM](https://tortoise.github.io)
