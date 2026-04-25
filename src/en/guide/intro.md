# Introduction

[FastSoyAdmin](https://github.com/sleep1223/fast-soy-admin) is an out-of-the-box full-stack admin template.

- **Frontend** — based on [SoybeanAdmin](https://github.com/soybeanjs/soybean-admin), Vue3 + Vite7 + TypeScript + Pinia + UnoCSS + Naive UI
- **Backend** — FastAPI + Pydantic v2 + Tortoise ORM + Redis, layered as "system + business" with autodiscovered business modules

The repo is a monorepo: `/app` is the backend, `/web` is the frontend, `/deploy` is Docker / Nginx.

## Highlights

- **Full-stack** — end-to-end type safety, unified response format (camelCase)
- **Complete RBAC** — three permission layers (menu / API / button) + row-level `data_scope`, strict frontend / backend separation
- **Dynamic routing** — routes delivered per role at runtime; the frontend doesn't maintain permission distribution logic
- **Autodiscovered business modules** — drop a folder in `app/business/<x>/` and routes / models / init data register themselves; modules are mutually decoupled
- **Code generators** — `make cli-init / cli-gen / cli-gen-web` end-to-end from a model to frontend + backend CRUD
- **Redis-accelerated** — role permissions / constant routes / token_version cached, falls back to DB on outage
- **State machine / event bus / Sqid IDs** — framework-level primitives
- **Production-ready** — in-house Radar tracing + [fastapi-guard](https://fastapi-guard.com/) rate limit + multi-worker init lock
- **Docker one-shot deploy** — Nginx + FastAPI + Redis

## How to read these docs

| Goal | Start here |
|---|---|
| Get the project running | [Quick start](/en/guide/quick-start) |
| Add a new business module (most common) | [Development guide](/en/backend/development) (CLI end-to-end) |
| Understand backend architecture / autodiscover / RBAC | [Backend / Intro](/en/backend/intro) → [Architecture](/en/backend/architecture) |
| Understand frontend routing / requests / theme | [Frontend / Intro](/en/frontend/intro) |
| Pre-PR conventions | [Standard / Backend](/en/standard/backend) + [Vue style](/en/standard/vue) + [Naming](/en/standard/naming) |
| Deploy | [Deployment](/en/backend/deployment) |
| Troubleshoot | [FAQ](/en/faq/) |

## Architecture overview

```
┌─────────────────────────────────────────────────┐
│                    Nginx (:1880)                 │
│        Static assets + /api/* reverse proxy      │
├─────────────────────┬───────────────────────────┤
│   Frontend (:9527)   │     Backend (:9999)        │
│   Vue3 + Vite7       │     FastAPI                │
│                      │                            │
│   Views              │     api/  (system/business)│
│     ↓                │       ↓                    │
│   Pinia Store        │     services/              │
│     ↓                │       ↓                    │
│   Service (Alova)    │     controllers (CRUDBase) │
│     ↓                │       ↓                    │
│   HTTP request ──────┼──→  /api/v1/*              │
│                      │       ↓                    │
│                      │     Tortoise / Redis       │
└─────────────────────┴───────────────────────────┘
```

## Resources

- [Live preview](https://fast-soy-admin.sleep0.de/)
- [GitHub](https://github.com/sleep1223/fast-soy-admin)
- [API docs (Apidog)](https://fast-soy-admin.apidog.io)
- [SoybeanAdmin (frontend upstream)](https://github.com/soybeanjs/soybean-admin)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Tortoise ORM](https://tortoise.github.io)
