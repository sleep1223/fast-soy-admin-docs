# Architecture

## Layered Architecture

```
Router (api/v1/)
  ↓
Controller (controllers/)
  ↓
CRUD Base (core/crud.py)
  ↓
Model (models/system/)
  ↓
Database (SQLite / PostgreSQL)
```

### Router Layer

Defines HTTP endpoints, handles request/response serialization via Pydantic schemas. Dependencies inject authentication and permission checks.

```python
@router.get("/users/{user_id}")
async def get_user(
    user_id: int,
    auth: AuthControl = Depends()      # JWT validation
):
    user = await user_controller.get(user_id)
    return Success(data=user)
```

### Controller Layer

Business logic: validation, data transformation, cross-model operations.

```python
class UserController(CRUDBase[User]):
    async def authenticate(self, username: str, password: str) -> User:
        user = await self.model.filter(user_name=username).first()
        if not user or not verify_password(password, user.password):
            raise ...
        return user
```

### CRUD Base Layer

Generic async CRUD operations shared by all controllers.

### Model Layer

Tortoise ORM models defining the database schema and relationships.

## RBAC Permission Model

```
User ←M2M→ Role ←M2M→ Menu   (Menu permissions)
                  ←M2M→ API    (API permissions)
                  ←M2M→ Button (Button permissions)
```

- **Users** are assigned one or more **Roles**
- **Roles** are granted access to **Menus** (frontend routes), **APIs** (backend endpoints), and **Buttons** (UI actions)
- The super admin role `R_SUPER` bypasses all permission checks

## Request Flow

```
Client → Nginx → FastAPI
                    ↓
              Middleware Stack
              (CORS, RequestID, Logging)
                    ↓
              Router (path matching)
                    ↓
              Dependencies
              (AuthControl → PermissionControl)
                    ↓
              Route Handler
                    ↓
              Controller → Model → Database
                    ↓
              Pydantic Response Schema
                    ↓
              JSON Response to Client
```

## Middleware Stack

Middleware executes in order for every request:

| Order | Middleware | Purpose |
|-------|-----------|---------|
| 1 | CORSMiddleware | Cross-origin request handling |
| 2 | PrettyErrorsMiddleware | Error output formatting |
| 3 | BackgroundTaskMiddleware | Background task support |
| 4 | RequestIDMiddleware | Inject X-Request-ID |
| 5 | RadarMiddleware (optional) | Request/response debugging |

## Context Variables

Python `contextvars` provide request-scoped state:

```python
from app.core.ctx import CTX_USER_ID, CTX_X_REQUEST_ID

# Set by AuthControl dependency
user_id = CTX_USER_ID.get()

# Set by RequestIDMiddleware
request_id = CTX_X_REQUEST_ID.get()
```
