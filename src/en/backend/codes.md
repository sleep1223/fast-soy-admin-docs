# Response Codes

All APIs return a unified format: `{"code": "xxxx", "msg": "...", "data": ...}`

Response codes are defined in `app/core/code.py`.

## 0000 — Success

| Code | Constant | Description |
|------|----------|-------------|
| `0000` | `SUCCESS` | Request successful |

## 1xxx — System Errors

Automatically caught by framework exception handlers.

| Code | Constant | Description |
|------|----------|-------------|
| `1000` | `INTERNAL_ERROR` | Uncaught internal exception |
| `1100` | `INTEGRITY_ERROR` | Database constraint violation (unique, foreign key) |
| `1101` | `NOT_FOUND` | Record does not exist |
| `1200` | `REQUEST_VALIDATION` | Request parameter validation failed |
| `1201` | `RESPONSE_VALIDATION` | Response serialization failed |

## 2xxx — Business Logic Errors

### 21xx — Authentication

| Code | Constant | Description | Frontend Action |
|------|----------|-------------|-----------------|
| `2100` | `INVALID_TOKEN` | Token invalid / missing / decode failed | Redirect to login |
| `2101` | `INVALID_SESSION` | Token type wrong / user not found | Redirect to login |
| `2102` | `ACCOUNT_DISABLED` | Account is disabled | Modal confirm, then logout |
| `2103` | `TOKEN_EXPIRED` | Token has expired | Auto-refresh token |

### 22xx — Authorization

| Code | Constant | Description | Frontend Action |
|------|----------|-------------|-----------------|
| `2200` | `API_DISABLED` | API endpoint is disabled | Show error message |
| `2201` | `PERMISSION_DENIED` | RBAC permission denied | Show error message |

### 23xx — Resource Conflict

| Code | Constant | Description |
|------|----------|-------------|
| `2300` | `DUPLICATE_RESOURCE` | Duplicate resource (username, role code, etc.) |

### 24xx — General Business Failure

| Code | Constant | Description |
|------|----------|-------------|
| `2400` | `FAIL` | General business failure |

## 3xxx — Reserved

Reserved for future framework extensions.

## 4000-9999 — User-Defined

For custom business logic. The frontend will **not** auto-display error messages for these codes — callers must handle them explicitly.

## Exception Handlers

Defined in `app/core/exceptions.py`:

| Exception | Code | Description |
|-----------|------|-------------|
| `IntegrityError` | `1100` | Database constraint violation |
| `DoesNotExist` | `1101` | Record not found |
| `RequestValidationError` | `1200` | Pydantic validation failed |
| `ResponseValidationError` | `1201` | Response serialization failed |
| Uncaught exceptions | `1000` | Internal server error |

## Frontend Environment Variables

```bash
VITE_SERVICE_SUCCESS_CODE=0000
VITE_SERVICE_LOGOUT_CODES=2100,2101
VITE_SERVICE_MODAL_LOGOUT_CODES=2102
VITE_SERVICE_EXPIRED_TOKEN_CODES=2103
```
