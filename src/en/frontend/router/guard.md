# Route Guards

Every navigation goes through guards in `web/src/router/guard/`: auth → dynamic route loading → permission check → progress bar / title side effects.

## Guard chain

```
beforeEach (route.ts)
   │
   ├─ initRoute(to)                 # first entry: fetch user-info / user-routes / constant-routes, mount routes
   ├─ already logged in but going to /login → return to root
   ├─ meta.constant=true → pass
   ├─ not logged in → /login?redirect=<original url>
   ├─ logged in but meta.roles mismatch → /403
   └─ otherwise → handleRouteSwitch (cache update / tab push / multi-tab dedup)

beforeEach (progress.ts)            # start NProgress
afterEach  (progress.ts)            # finish NProgress
afterEach  (title.ts)               # document.title = i18n(meta.title)
```

Source: [src/router/guard/](../../../web/src/router/guard/).

## Files

| File | Responsibility |
|---|---|
| `route.ts` | auth, dynamic route loading, permission check, tab management |
| `progress.ts` | NProgress |
| `title.ts` | sync `document.title` (with i18n) |
| `index.ts` | wires the above into the router |

## Flow chart

```
                  ┌─────────────────┐
navigation ─────→ │  meta.constant?  │ ─Yes→ pass
                  └────────┬────────┘
                           │No
                           ▼
                  ┌─────────────────┐
                  │  logged in?      │ ─No→  /login?redirect=...
                  └────────┬────────┘
                           │Yes
                           ▼
                  ┌─────────────────┐
                  │  routes loaded?  │ ─No→  GET /user-routes, mount
                  └────────┬────────┘
                           │Yes
                           ▼
                  ┌─────────────────┐
                  │  meta.roles ⊂?  │ ─No→  /403
                  └────────┬────────┘
                           │Yes
                           ▼
                       pass + tab push
```

## Constant routes

`meta.constant=true` skips all auth checks. Common cases:

| Route | Use |
|---|---|
| `login` | login |
| `403 / 404 / 500` | error pages |
| `home` | home (typically requires login — `home` is NOT constant) |

The backend writes `Menu.constant=True` rows into Redis `constant_routes` via `load_constant_routes`; the frontend fetches once at startup.

## meta.roles (static mode only)

Only when `VITE_AUTH_ROUTE_MODE=static` does `meta.roles` apply — intersect with the user's current roles.

```typescript
meta: { roles: ['R_ADMIN', 'R_HR_ADMIN'] }
```

In dynamic mode `meta.roles` is ignored (the backend already filtered).

## Tab and multiTab handling

`handleRouteSwitch`:

- `meta.multiTab=true` and the query is different → open a new tab
- otherwise → reuse the existing tab with the same routeName
- `meta.fixedIndexInTab` set → pin tab to that index

See `src/store/modules/tab/`.

## Custom guards

Need extra init after login (load dictionaries / user prefs)? Add it inside `route.ts`'s `initRoute`. **Don't** add a separate `router.beforeEach` — easy to clash with existing guards' execution order.

## Debug

```typescript
router.beforeEach((to, from) => {
  console.log('navigation', { from: from.fullPath, to: to.fullPath, meta: to.meta });
});
```

Add after `createRouter`. Remove in production.

## See also

- [Dynamic routes](/en/frontend/router/dynamic)
- [Router push](/en/frontend/router/push)
- Backend: [Auth](/en/backend/auth)
