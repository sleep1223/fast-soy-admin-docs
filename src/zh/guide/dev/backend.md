# 后端开发

## 新建文件夹

在 app/api/v1 下新建文件夹
在 app/api/v1/__init__.py 中添加你的路由


### 定义数据结构
在 app/models/system/ 下新建文件, 并且添加到 app/models/system/__init__.py
> 如果使用的是Tortoise ORM的其他数据库, 需要添加到你在 app/settings/config.py TORTOISE_ORM 的 apps models下
> { "app_book": {"models": ["app.models.book"], "default_connection": "conn_book"} } 需要在 app/models/book/__init__.py 下能找到你定义的Tortoise ORM Model

在 app/schemas/ 下定义用于接受API请求参数的Pydantic Model
Optional 建议替换成 Annotated
``` python
from typing import Annotated
from pydantic import BaseModel, Field
from app.models.system import StatusType


class BaseApi(BaseModel):
    path: str = Field(title="请求路径", description="/api/v1/auth/login")
    method: str = Field(title="请求方法", description="GET")
    summary: Annotated[str | None, Field(description="API简介")] = None
    tags: Annotated[str | list[str] | None, Field(description="API标签")] = None
    status: Annotated[StatusType | None, Field()] = None

    class Config:
        allow_extra = True  # 允许子类添加其他字段
        populate_by_name = True  # 使用别名来接受参数
```



### 定义API
一个增删改查例子
``` python
from fastapi import APIRouter, Query
from tortoise.expressions import Q

from app.api.v1.utils import insert_log
from app.controllers import user_controller
from app.controllers.api import api_controller
from app.core.ctx import CTX_USER_ID
from app.core.dependency import DependAuth, DependPermission
from app.models.system import Api, Role
from app.models.system import LogType, LogDetailType
from app.schemas.apis import ApiCreate, ApiUpdate
from app.schemas.base import Success, SuccessExtra

router = APIRouter()


@router.get("/apis", summary="查看API列表", dependencies=[DependAuth])
async def _(
        current: int = Query(1, description="页码"),
        size: int = Query(10, description="每页数量"),
        path: str = Query(None, description="API路径"),
        summary: str = Query(None, description="API简介"),
        tags: str = Query(None, description="API模块"),
        status: str = Query(None, description="API状态"),
):
    q = Q()
    if path:
        q &= Q(path__contains=path)
    if summary:
        q &= Q(summary__contains=summary)
    if tags:
        q &= Q(tags__contains=tags.split("|"))
    if status:
        q &= Q(status__contains=status)

    user_id = CTX_USER_ID.get()  # 从请求的token获取用户id
    user_obj = await user_controller.get(id=user_id)
    user_role_objs: list[Role] = await user_obj.roles
    user_role_codes = [role_obj.role_code for role_obj in user_role_objs]
    if "R_SUPER" in user_role_codes:  # 超级管理员具有所有权限
        total, api_objs = await api_controller.list(page=current, page_size=size, search=q, order=["tags", "id"])
    else:
        api_objs: list[Api] = []
        for role_obj in user_role_objs:
            api_objs.extend([api_obj for api_obj in await role_obj.apis])

        unique_apis = list(set(api_objs))
        sorted_menus = sorted(unique_apis, key=lambda x: x.id)
        # 实现分页
        start = (current - 1) * size
        end = start + size
        api_objs = sorted_menus[start:end]
        total = len(sorted_menus)

    records = []
    for obj in api_objs:
        data = await obj.to_dict(exclude_fields=["create_time", "update_time"])
        data["tags"] = "|".join(data["tags"])
        records.append(data)
    data = {"records": records}
    await insert_log(log_type=LogType.UserLog, log_detail_type=LogDetailType.ApiGetList, by_user_id=user_obj.id)
    return SuccessExtra(data=data, total=total, current=current, size=size)


@router.get("/apis/{api_id}", summary="查看API", dependencies=[DependPermission])
async def _(api_id: int):
    api_obj = await api_controller.get(id=api_id)
    data = await api_obj.to_dict(exclude_fields=["id", "create_time", "update_time"])
    await insert_log(log_type=LogType.UserLog, log_detail_type=LogDetailType.ApiGetOne, by_user_id=0)
    return Success(data=data)



@router.post("/apis", summary="创建API", dependencies=[DependPermission])
async def _(
        api_in: ApiCreate,
):
    if isinstance(api_in.tags, str):
        api_in.tags = api_in.tags.split("|")
    new_api = await api_controller.create(obj_in=api_in)
    await insert_log(log_type=LogType.UserLog, log_detail_type=LogDetailType.ApiCreateOne, by_user_id=0)
    return Success(msg="Created Successfully", data={"created_id": new_api.id})


@router.patch("/apis/{api_id}", summary="更新API", dependencies=[DependPermission])
async def _(
        api_id: int,
        api_in: ApiUpdate,
):
    if isinstance(api_in.tags, str):
        api_in.tags = api_in.tags.split("|")
    await api_controller.update(id=api_id, obj_in=api_in)
    await insert_log(log_type=LogType.UserLog, log_detail_type=LogDetailType.ApiUpdateOne, by_user_id=0)
    return Success(msg="Update Successfully", data={"updated_id": api_id})


@router.delete("/apis/{api_id}", summary="删除API", dependencies=[DependPermission])
async def _(
        api_id: int,
):
    await api_controller.remove(id=api_id)
    await insert_log(log_type=LogType.UserLog, log_detail_type=LogDetailType.ApiDeleteOne, by_user_id=0)
    return Success(msg="Deleted Successfully", data={"deleted_id": api_id})


@router.delete("/apis", summary="批量删除API", dependencies=[DependPermission])
async def _(ids: str = Query(..., description="API ID列表, 用逗号隔开")):
    api_ids = ids.split(",")
    deleted_ids = []
    for api_id in api_ids:
        api_obj = await Api.get(id=int(api_id))
        await api_obj.delete()
        deleted_ids.append(int(api_id))
    await insert_log(log_type=LogType.UserLog, log_detail_type=LogDetailType.ApiBatchDelete, by_user_id=0)
    return Success(msg="Deleted Successfully", data={"deleted_ids": deleted_ids})


```

## 添加页面和权限
在 系统管理 - 菜单管理 添加你的页面
在 系统管理 - API管理 点击 刷新API
在 系统管理 - 角色管理 编辑 添加角色的菜单权限、按钮权限、API权限

重写刷新即可看到新增页面
