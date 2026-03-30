# CRUD 基类

`app/core/crud.py` 提供泛型异步 CRUD 基类，所有 Controller 继承使用。

## 接口

```python
class CRUDBase(Generic[ModelType]):
    async def get(self, id: int) -> ModelType
    async def get_or_none(self, **kwargs) -> ModelType | None
    async def list(self, page: int, page_size: int, **filters) -> tuple[int, list[ModelType]]
    async def create(self, obj_in: dict) -> ModelType
    async def update(self, id: int, obj_in: dict) -> ModelType
    async def delete(self, id: int) -> None
```

## 功能

- **分页查询**：`page`, `page_size` 参数
- **过滤**：Tortoise Q objects
- **排序**：`order_by` 参数
- **关联预加载**：`fetch_related`

## 响应封装

```python
Success(code="0000", data=item)           # 单条数据
SuccessExtra(data=items, total=100)       # 分页数据
Fail(code="2400", msg="操作失败")          # 失败响应
```

## Schema 约定

所有字段使用 camelCase 别名，与前端保持一致：

```python
class UserSchema(BaseModel):
    user_name: str = Field(alias="userName")
    nick_name: str = Field(alias="nickName")
```
