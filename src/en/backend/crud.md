# CRUD Base

The generic CRUD base class in `app/core/crud.py` provides reusable async database operations for all controllers.

## CRUDBase

```python
class CRUDBase(Generic[ModelType]):
    model: Type[ModelType]

    async def get(self, id: int) -> ModelType
    async def get_or_none(self, **kwargs) -> ModelType | None
    async def list(self, page: int, page_size: int, **filters) -> tuple[int, list[ModelType]]
    async def create(self, obj_in: dict) -> ModelType
    async def update(self, id: int, obj_in: dict) -> ModelType
    async def delete(self, id: int) -> None
```

## Features

### Pagination

```python
total, users = await user_controller.list(page=1, page_size=10)
```

### Filtering

Uses Tortoise ORM Q objects for complex queries:

```python
total, users = await user_controller.list(
    page=1,
    page_size=10,
    user_name__contains="admin",
    status_type=1
)
```

### Ordering

```python
total, users = await user_controller.list(
    page=1,
    page_size=10,
    order_by=["-created_at"]
)
```

### Prefetching Relations

```python
user = await user_controller.get(id=1)
await user.fetch_related("by_user_roles")
```

## Controller Examples

### UserController

```python
class UserController(CRUDBase[User]):
    model = User

    async def authenticate(self, username: str, password: str) -> User:
        user = await self.model.filter(user_name=username).first()
        if not user or not verify_password(password, user.password):
            raise HTTPException(...)
        return user

    async def get_by_username(self, username: str) -> User | None:
        return await self.model.filter(user_name=username).first()

    async def update_roles(self, user_id: int, role_ids: list[int]):
        user = await self.get(user_id)
        await user.by_user_roles.clear()
        roles = await Role.filter(id__in=role_ids)
        await user.by_user_roles.add(*roles)
```

### RoleController

```python
class RoleController(CRUDBase[Role]):
    model = Role

    async def get_by_code(self, code: str) -> Role | None:
        return await self.model.filter(role_code=code).first()

    async def update_apis_by_code(self, code: str, api_ids: list[int]):
        role = await self.model.filter(role_code=code).first()
        await role.by_role_apis.clear()
        apis = await Api.filter(id__in=api_ids)
        await role.by_role_apis.add(*apis)
```

## Response Wrappers

Defined in `app/schemas/base.py`:

```python
class Success(BaseModel):
    code: str = "0000"
    msg: str = "OK"
    data: Any = None

class Fail(BaseModel):
    code: str = "2400"
    msg: str = "Operation failed"
    data: Any = None

class SuccessExtra(BaseModel):
    """Paginated success response"""
    code: str = "0000"
    msg: str = "OK"
    data: Any = None
    total: int = 0
    current: int = 1
    size: int = 10
```

### Usage in Routes

```python
@router.get("/users/{user_id}")
async def get_user(user_id: int):
    user = await user_controller.get(user_id)
    return Success(data=UserSchema.from_orm(user))

@router.post("/users/all/")
async def list_users(params: UserSearchParams):
    total, users = await user_controller.list(
        page=params.current,
        page_size=params.size
    )
    return SuccessExtra(data=users, total=total, current=params.current, size=params.size)
```

## Pydantic Schema Conventions

All schemas use camelCase aliases for frontend compatibility:

```python
class UserSchema(BaseModel):
    user_name: str = Field(alias="userName")
    nick_name: str = Field(alias="nickName")
    status_type: int = Field(alias="status")

    model_config = ConfigDict(populate_by_name=True)
```
