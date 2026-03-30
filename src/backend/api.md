# API Routes

All API routes are mounted under `/api/v1/`.

## Authentication (`/auth`)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/login` | Authenticate user, return access + refresh tokens |
| POST | `/auth/refresh-token` | Refresh access token using refresh token |
| GET | `/auth/getUserInfo` | Get current user info with roles and buttons |

### Login Request

```json
POST /api/v1/auth/login
{
  "userName": "admin",
  "password": "admin123"
}
```

### Login Response

```json
{
  "code": "0000",
  "msg": "OK",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

## System Management (`/system-manage`)

### Users

| Method | Path | Description |
|--------|------|-------------|
| POST | `/system-manage/users/all/` | Search users (paginated, with filters) |
| GET | `/system-manage/users/{user_id}` | Get single user |
| POST | `/system-manage/users` | Create user |
| PATCH | `/system-manage/users/{user_id}` | Update user |
| DELETE | `/system-manage/users/{user_id}` | Delete user |
| DELETE | `/system-manage/users` | Batch delete (ids array) |

### Roles

| Method | Path | Description |
|--------|------|-------------|
| GET | `/system-manage/roles` | Get all enabled roles |
| POST | `/system-manage/roles/all/` | Search roles (paginated) |
| GET | `/system-manage/roles/{role_id}` | Get single role |
| POST | `/system-manage/roles` | Create role |
| PATCH | `/system-manage/roles/{role_id}` | Update role + permissions |
| DELETE | `/system-manage/roles/{role_id}` | Delete role |

### Menus

| Method | Path | Description |
|--------|------|-------------|
| GET | `/system-manage/menus` | Get menu tree |
| POST | `/system-manage/menus` | Create menu |
| PATCH | `/system-manage/menus/{menu_id}` | Update menu |
| DELETE | `/system-manage/menus/{menu_id}` | Delete menu |
| GET | `/system-manage/menus/pages/` | Get all pages (for component selection) |

## Dynamic Routes (`/route`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/route/routes` | Get accessible routes for current user (RBAC filtered) |

### Route Response

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
        "children": [...]
      }
    ]
  }
}
```

## Pagination Format

Paginated endpoints return:

```json
{
  "code": "0000",
  "msg": "OK",
  "data": [
    { "id": 1, "userName": "admin", ... }
  ],
  "total": 100,
  "current": 1,
  "size": 10
}
```

## Authentication Header

All authenticated endpoints require:

```
Authorization: Bearer <access_token>
```
