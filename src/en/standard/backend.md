# Backend Style

## Python Code Style

### Formatting

Enforced by Ruff:

- Line length: 200 characters
- Double quotes for strings
- Sorted imports (isort)

```python
# Good
from app.controllers.user import user_controller
from app.schemas.base import Success, SuccessExtra

# Bad - wrong quote style
from app.controllers.user import user_controller
```

### Type Annotations

All functions should have type annotations. Enforced by Pyright in standard mode.

```python
# Good
async def get_user(user_id: int) -> User:
    return await User.get(id=user_id)

# Good - Optional types
async def find_user(username: str) -> User | None:
    return await User.filter(user_name=username).first()
```

### API Route Style

```python
# Use Pydantic schemas for request/response
@router.post("/users")
async def create_user(
    body: UserCreateSchema,
    auth: AuthControl = Depends(),
) -> Success:
    user = await user_controller.create(body.model_dump())
    return Success(data=UserSchema.model_validate(user))
```

### Response Pattern

Always use the standard response wrappers:

```python
# Single item
return Success(data=item)

# Paginated list
return SuccessExtra(data=items, total=total, current=page, size=page_size)

# Error
return Fail(code=CodeEnum.FAIL, msg="Operation failed")
```

### Schema Style

Use camelCase aliases for frontend compatibility:

```python
class UserSchema(BaseModel):
    id: int
    user_name: str = Field(alias="userName")
    nick_name: str = Field(alias="nickName")
    status_type: int = Field(alias="status")

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True
    )
```

## Ruff Commands

```bash
ruff check app/              # Lint
ruff check app/ --fix        # Lint and auto-fix
ruff format app/             # Format
```

## Pyright Commands

```bash
pyright app                  # Type check
pyright app --watch          # Watch mode
```
