# Auth & RBAC

## JWT Authentication

| Setting | Value |
|---------|-------|
| Algorithm | HS256 |
| Access Token | 12 hours |
| Refresh Token | 7 days |
| Password Hash | Argon2 |

### Login Flow

```
POST /auth/login
  → Validate username + password (Argon2 verify)
  → Check account status (not disabled)
  → Generate access_token (12h) + refresh_token (7d)
  → Return tokens to frontend
```

### Token Refresh Flow

```
POST /auth/refresh-token
  → Validate refresh_token signature
  → Verify token type is "refresh"
  → Check user still exists and is active
  → Generate new access_token
  → Return new token
```

### Token Payload

```json
{
  "sub": "access",           // "access" or "refresh"
  "user_id": 1,
  "exp": 1735689600
}
```

## RBAC Permission Control

Implemented as FastAPI dependencies in `app/core/dependency.py`.

### AuthControl

Validates authentication on every protected request:

1. Extract `Bearer <token>` from Authorization header
2. Decode JWT and validate signature
3. Check token type is "access"
4. Query user from database
5. Verify user is not disabled
6. Store `user_id` in context variable

```python
@router.get("/users")
async def get_users(auth: AuthControl = Depends()):
    # auth validates the JWT automatically
    ...
```

### PermissionControl

Validates RBAC permissions after authentication:

1. Get current user's roles
2. If role is `R_SUPER` → **allow** (skip all checks)
3. Get all APIs associated with user's roles
4. Match current request `method + path` against role's APIs
5. If API is disabled → return `2200` (API disabled)
6. If no match → return `2201` (permission denied)
7. If matched and enabled → **allow**

```python
@router.delete("/users/{user_id}")
async def delete_user(
    user_id: int,
    auth: AuthControl = Depends(),
    perm: PermissionControl = Depends()
):
    # Both auth and permission are checked
    ...
```

## Super Admin

The role with code `R_SUPER` has unrestricted access:
- Bypasses all API permission checks
- Has access to all routes
- Can manage all users, roles, and menus

## Button-Level Permissions

Buttons are permission codes sent to the frontend in `getUserInfo`:

```json
{
  "buttons": ["B_USER_ADD", "B_USER_EDIT", "B_USER_DELETE"]
}
```

The frontend conditionally renders buttons based on these codes.

## Password Security

Passwords are hashed using Argon2 (recommended by OWASP):

```python
from app.utils.security import hash_password, verify_password

hashed = hash_password("user_password")
is_valid = verify_password("user_password", hashed)
```
