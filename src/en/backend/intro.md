# Backend Overview

The backend is built with **FastAPI**, using a layered, modular architecture. Code is split into "system modules" and "business modules" with a strict one-way dependency: business modules are auto-discovered at startup and never import each other.

## Tech stack

| Tech | Purpose |
|------|---------|
| [FastAPI](https://fastapi.tiangolo.com/) ≥ 0.121 | Async web framework |
| [Pydantic v2](https://docs.pydantic.dev/) | Request / response validation & serialization |
| [Tortoise ORM](https://tortoise.github.io) ≥ 0.25 | Async ORM (vendored copy at `/tortoise-orm/`) |
| [Tortoise built-in migrations](https://tortoise.github.io/migration.html) | Manual (not auto-run at startup) |
| [Redis](https://redis.io/) | Cache (fastapi-cache2) + multi-worker init lock + RBAC hot data |
| [Argon2](https://argon2-cffi.readthedocs.io/) | Password hashing |
| [PyJWT](https://pyjwt.readthedocs.io/) | JWT |
| [Sqids](https://sqids.org/) | Public-facing resource ID encoding (no exposed auto-increment ints) |
| [Granian](https://github.com/emmett-framework/granian) | ASGI server (with `X-Forwarded-*` proxy reconciliation) |
| Radar (in-house) | Request / SQL / exception dashboard implemented with reference to fastapi-radar; lives under `app/system/radar/` |
| [fastapi-guard](https://fastapi-guard.com/) | Rate limit / auto-ban |
| [Ruff](https://docs.astral.sh/ruff/) | Lint + format (line 200, double-quote) |
| [basedpyright](https://github.com/DetachHead/basedpyright) | Static typing (standard mode) |

## Top-level layout

```
app/
├── __init__.py            # FastAPI app factory, lifespan, multi-worker init coordination
├── core/                  # Framework infrastructure (business uses it via app.utils)
│   ├── autodiscover.py    # business module discovery (models / api / init_data / standalone DB)
│   ├── base_model.py      # BaseModel / AuditMixin / TreeMixin / enums
│   ├── base_schema.py     # SchemaBase / PageQueryBase / Success / Fail / SuccessExtra
│   ├── code.py            # All response codes
│   ├── config.py          # APP_SETTINGS (pydantic-settings + DB_URL → TORTOISE_ORM)
│   ├── crud.py            # CRUDBase + get_db_conn
│   ├── router.py          # CRUDRouter factory + SearchFieldConfig
│   ├── ctx.py             # ContextVars (CTX_USER_ID / CTX_ROLE_CODES / ...)
│   ├── dependency.py      # DependAuth / DependPermission / require_buttons / require_roles
│   ├── data_scope.py      # row-level data scope
│   ├── cache.py           # Redis cache (role permissions, constant routes, token_version)
│   ├── soft_delete.py     # SoftDeleteMixin (transparent deleted_at IS NULL)
│   ├── sqids.py           # int ↔ sqid string
│   ├── state_machine.py   # lightweight FSM
│   ├── events.py          # in-process event bus (emit/on)
│   ├── exceptions.py      # BizError + global exception handlers
│   ├── middlewares.py     # request id / background tasks / pretty errors
│   └── types.py           # Int16/32/64 / SqidId / SqidPath
├── system/                # Built-in modules (auth, RBAC, users, menus, APIs, dictionary, monitoring)
│   ├── api/               # routes: auth/users/roles/menus/apis/route/dictionary/health
│   ├── controllers/       # CRUDBase subclasses
│   ├── services/          # multi-model orchestration (auth/captcha/user/init_helper/monitor)
│   ├── models/            # admin.py (User/Role/Menu/Api/Button) + dictionary.py
│   ├── schemas/           # admin/users/login/dictionary
│   ├── radar/             # In-house Radar monitoring (request/SQL/exception/instrumentation)
│   ├── security.py        # Argon2 + JWT helpers
│   └── init_data.py       # System menus / roles / users / dictionary seeds
├── business/              # Business modules (autodiscovered)
│   └── hr/                # reference: employees / departments / tags
├── cli/                   # Code generators (init / gen / gen-web / initdb)
└── utils/                 # Stable import facade for business code (re-exports core/system)
```

## Layering

```
HTTP request
    │
    ▼
api/        ← FastAPI routes: thin HTTP adapter, validate + call service/controller + return Success/Fail
    │
    ▼
services/   ← multi-model orchestration, transactions, cache, audit logs, FSM
    │
    ▼
controllers/ ← CRUDBase subclasses, single-resource CRUD + build_search
    │
    ▼
models / schemas
    Tortoise models + Pydantic schemas
```

| Layer | Responsibility | Anti-pattern |
|---|---|---|
| `api/` | URL wiring, dependencies (auth), thin call to service/controller | business rules, cross-model, transactions |
| `services/` | transactions, cross-model, Redis, FSM, audit, cross-module events | HTTP (Request/Response) |
| `controllers/` | `XxxController(CRUDBase)`, `build_search` | multi-model side effects |
| `models/` | columns, indexes, relations, mixins | business validation |
| `schemas/` | `XxxCreate / XxxUpdate / XxxSearch`, field-level validation | cross-resource logic |

## system / business one-way dependency

- `app.system.*` does not know about `app.business.*` — only autodiscover wires up business `init()` and `router` at startup.
- Business modules **must not reverse-import** each other or `app.system.*` internals (except the few system services that are explicitly exposed). Cross-module communication goes through the [event bus](/en/backend/core/events).
- The recommended business import facade is [`app.utils`](/en/backend/utils) — the stable public surface.

## Startup flow

`app/__init__.py` `lifespan`:

1. Init Redis (`app.state.redis`) and the fastapi-cache2 backend
2. Delete leftover init lock from previous run, enter `_run_init_data`:
   - With multiple workers, contend for leader via Redis `SET NX EX`; non-leaders wait for `_INIT_DONE_KEY`
   - Leader runs in order: `init_menus` → `refresh_api_list` (FastAPI routes ↔ Api table reconciliation) → `init_users` → each business module's `init_data.init()` → `refresh_all_cache`
3. Start in-house Radar monitoring and fastapi-guard
4. yield (app ready)
5. Shutdown: stop radar, close Redis

For details see [Startup init & reconciliation](/en/backend/init-data).

## Where to next

- [Architecture](/en/backend/architecture) — middleware stack, lifecycle, layer responsibilities
- [Development guide](/en/backend/development) — build a business module from scratch using the CLI
- [API conventions](/en/backend/api) / [Response codes](/en/backend/codes) — enforced rules
- [HR module](/en/backend/business/hr) — full reference implementation of a business module
