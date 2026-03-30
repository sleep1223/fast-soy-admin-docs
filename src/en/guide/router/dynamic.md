# Dynamic Route

FastSoyAdmin supports two route permission modes:

## Static Route Mode

Set `VITE_AUTH_ROUTE_MODE=static` in `.env`.

Routes are defined in the frontend. The `roles` field in route meta controls access:

```typescript
{
  name: 'manage_user',
  path: '/manage/user',
  meta: {
    title: 'User Management',
    roles: ['R_SUPER', 'R_ADMIN']  // Only these roles can access
  }
}
```

If `roles` is empty or not set, the route is accessible to all authenticated users.

## Dynamic Route Mode

Set `VITE_AUTH_ROUTE_MODE=dynamic` in `.env`.

Routes are fetched from the backend API `GET /api/v1/route/routes`. The backend returns only the routes the current user has permission to access, based on their roles.

### How It Works

1. User logs in and receives a JWT token
2. Frontend calls `GET /route/routes` with the token
3. Backend checks user's roles → role's menus → builds route tree
4. Frontend receives the route tree and registers routes dynamically
5. Menu is generated from the route tree

### Backend Route Response Format

```json
{
  "code": "0000",
  "data": {
    "home": "home",
    "routes": [
      {
        "name": "manage",
        "path": "/manage",
        "component": "layout.base",
        "meta": {
          "title": "manage",
          "i18nKey": "route.manage",
          "icon": "carbon:cloud-service-management",
          "order": 9
        },
        "children": [
          {
            "name": "manage_user",
            "path": "/manage/user",
            "component": "view.manage_user",
            "meta": {
              "title": "manage_user",
              "i18nKey": "route.manage_user",
              "icon": "ic:round-manage-accounts"
            }
          }
        ]
      }
    ]
  }
}
```

### Super Admin

The role `R_SUPER` bypasses all permission checks and has access to all routes.
