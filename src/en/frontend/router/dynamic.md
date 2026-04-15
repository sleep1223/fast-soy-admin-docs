# Dynamic Routes

FastSoyAdmin uses **dynamic routing** by default: menus / route meta are delivered by the backend per role and mounted into vue-router after login. This is safer and more flexible than the "frontend-defined + roles meta filter" static mode.

## Mode selection

```dotenv
# web/.env
VITE_AUTH_ROUTE_MODE=dynamic       # default; recommended
# VITE_AUTH_ROUTE_MODE=static      # only for simple cases without back-office mgmt
```

| Mode | Route source | Permission filter | Suitable |
|---|---|---|---|
| `dynamic` | backend `GET /api/v1/route/user-routes` | backend pre-filters | standard back-office |
| `static` | frontend `views/` + `meta.roles` | frontend filters using `userInfo.roles` | simple / offline demo |

::: warning Static mode isn't safe
In `static` mode, "permission" is just UI hiding — direct URL access still renders. Backend APIs must reject. Use `dynamic` in production with the backend's `DependPermission`.
:::

## Workflow

```
┌──────────────────────────────────────────────────┐
│ 1. POST /api/v1/auth/login                        │
│ 2. Save token + refreshToken in localStorage     │
│ 3. GET /api/v1/auth/user-info                    │
│      → roles, buttons, mustChangePassword         │
│ 4. GET /api/v1/route/constant-routes              │
│      → public routes (login / 403 / 404 / 500 / home) │
│ 5. GET /api/v1/route/user-routes                  │
│      → menu tree visible to current user + home   │
│ 6. Frontend transforms and mounts to vue-router   │
│ 7. Navigate to home or `redirect` query           │
└──────────────────────────────────────────────────┘
```

Implementation in [src/router/guard/route.ts](../../../web/src/router/guard/route.ts) and backend [RBAC](/en/backend/rbac).

## How the backend decides visible routes

- At startup the leader worker writes each role's `menu_ids` to Redis `role:{code}:menus`
- On `GET /user-routes`:
  - `R_SUPER` → all `constant=False` menus
  - others → union of the user's roles' `menu_ids`, then back-fill parents
- Convert to a tree and return; frontend mounts to router

## Where route meta comes from

| meta | Source |
|---|---|
| `title` / `i18nKey` | `Menu.menu_name` / `Menu.i18n_key` |
| `icon` / `localIcon` | `Menu.icon` + `Menu.icon_type` |
| `order` | `Menu.order` |
| `keepAlive` / `multiTab` / `hideInMenu` / `activeMenu` | same-named backend fields |
| `constant` | `Menu.constant` (public route) |
| `href` | `Menu.href` (external link) |
| `component` | `Menu.component` (e.g. `view.manage_user`) |

## Force-refresh dynamic routes

After admin changes roles / menus, to take effect **immediately** for the user:

```typescript
import { useRouteStore } from '@/store/modules/route';

const routeStore = useRouteStore();
await routeStore.initAuthRoute();    // re-fetch and remount
```

Or have the user re-login.

::: tip Backend cache impact
Route data comes from Redis (loaded at startup). After backend CUD, you must call `load_role_permissions(redis, role_code=...)` to incrementally refresh — otherwise the frontend still fetches stale data. See backend [Cache](/en/backend/cache).
:::

## Super admin

`R_SUPER` has every non-constant menu + every button + `data_scope=all`. Any `R_SUPER` user after login:

- Route tree = `Menu.filter(constant=False)`
- Buttons = `Button.all()`
- API checks bypassed

## See also

- [Route structure](/en/guide/router/structure)
- [Route guard](/en/guide/router/guard)
- Backend: [Auth](/en/backend/auth) / [RBAC](/en/backend/rbac)
