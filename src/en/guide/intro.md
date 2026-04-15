# Introduction

[FastSoyAdmin](https://github.com/sleep1223/fast-soy-admin) is an out-of-the-box full-stack admin template. The frontend is built on [SoybeanAdmin](https://github.com/soybeanjs/soybean-admin) with Vue3, Vite7, TypeScript, Pinia and UnoCSS. The backend is built with FastAPI, Pydantic v2 and Tortoise ORM, accelerated by Redis caching.

## Features

- **Full-stack stack**: FastAPI + Pydantic v2 + Tortoise ORM on the backend; Vue3 + Vite7 + TypeScript + Pinia + UnoCSS on the frontend
- **Complete permission model**: RBAC with strict frontend / backend separation; the backend re-checks API and button permissions
- **Row-level data scope**: `all` / `department` / `self` per role; multiple roles fall back to the most permissive
- **Redis-accelerated**: fastapi-cache2 + Redis for hot permission data, constant routes, and per-module business caches
- **Modular layout**: pnpm monorepo for the frontend; the backend is split into `app/system/` (built-in) and `app/business/<x>/` (autodiscovered modules)
- **Strict code quality**: ESLint + oxlint + simple-git-hooks on the frontend; Ruff + basedpyright on the backend
- **TypeScript-first**: strict typing throughout
- **Theme system**: built-in light/dark + multiple layouts, deeply integrated with UnoCSS
- **i18n**: vue-i18n (zh-CN / en-US), easy to extend
- **Rich pages & components**: built-in error pages, ECharts / AntV / VChart visualizations
- **Mobile responsive**
- **One-command Docker deploy**: Nginx + FastAPI + Redis

## Tech Stack

### Backend

| Tech | Version | Purpose |
|------|---------|---------|
| Python | ≥ 3.12 | Runtime |
| FastAPI | ≥ 0.121 | Web framework |
| Pydantic | v2 | Validation & serialization |
| Tortoise ORM | ≥ 0.25 | Async ORM (a vendored copy lives at `/tortoise-orm/`) |
| Tortoise migrations | built-in | Manual `tortoise makemigrations` / `migrate` |
| Redis | — | Cache (fastapi-cache2) + multi-worker init lock |
| Argon2 | — | Password hashing |
| PyJWT | — | JWT signing |
| Sqids | — | Public-facing resource ID encoding |
| Granian | — | ASGI server with `X-Forwarded-*` proxy support |
| fastapi-radar | — | Built-in request / SQL / exception dashboard |
| fastapi-guard | — | Rate-limit + auto-ban |

### Frontend

| Tech | Version | Purpose |
|------|---------|---------|
| Vue | 3.5 | UI framework |
| Vite | 7 | Build tool |
| TypeScript | 5.9 | Type system |
| Naive UI | 2.44 | Component library |
| Pinia | 3 | State management |
| UnoCSS | 66+ | Atomic CSS |
| Alova | — | HTTP client |
| vue-router | 4 | Dynamic routing (server-issued) |
| vue-i18n | 11 | Internationalization |

## Architecture

```
┌─────────────────────────────────────────────────┐
│                    Nginx (:1880)                 │
│   Static asset hosting + /api/* reverse-proxy   │
├─────────────────────┬───────────────────────────┤
│   Frontend (:9527)  │     Backend (:9999)        │
│   Vue3 + Vite7      │     FastAPI                │
│                     │                            │
│   Views             │     api/  (system/business)│
│     ↓               │       ↓                    │
│   Pinia Store       │     services/              │
│     ↓               │       ↓                    │
│   Service (Alova)   │     controllers (CRUDBase) │
│     ↓               │       ↓                    │
│   HTTP request ─────┼──→  /api/v1/*              │
│                     │       ↓                    │
│                     │     Tortoise / Redis       │
└─────────────────────┴───────────────────────────┘
```

## Module boundaries (backend)

- `app/core/` — framework infrastructure (no business logic)
- `app/system/` — built-in modules (auth, RBAC, users, menus, APIs, dictionary, monitoring)
- `app/business/<x>/` — business modules, **auto-discovered** at startup
- `app/utils/` — the stable import facade for business code (re-exports the common subset of core/system)

`system → business` is one-way: system never imports business. Business modules also never import each other — cross-module communication goes through the [Event bus](/en/backend/core/events).

## Resources

- [Live preview](https://fast-soy-admin.sleep0.de/)
- [GitHub](https://github.com/sleep1223/fast-soy-admin)
- [API docs (Apifox)](https://apifox.com/apidoc/shared-7cd78102-46eb-4701-88b1-3b49c006504b)
- [SoybeanAdmin (frontend upstream)](https://github.com/soybeanjs/soybean-admin)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Tortoise ORM](https://tortoise.github.io)
