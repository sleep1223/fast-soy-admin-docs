# 数据模型

所有 ORM 模型基于 Tortoise ORM，定义在 `app/models/system/admin.py`。

## User（用户）

| 字段 | 类型 | 说明 |
|------|------|------|
| user_name | str | 用户名（唯一） |
| password | str | 密码（Argon2 哈希） |
| nick_name | str | 昵称 |
| gender | GenderType | 性别 |
| email | str | 邮箱 |
| phone | str | 手机号 |
| last_login | datetime | 最后登录时间 |
| status_type | StatusType | 状态（启用/禁用） |

关联：`by_user_roles` — 用户 ↔ 角色（多对多）

## Role（角色）

| 字段 | 类型 | 说明 |
|------|------|------|
| role_name | str | 角色名称 |
| role_code | str | 角色编码（唯一，如 R_SUPER） |
| description | str | 描述 |
| status_type | StatusType | 状态 |

关联：
- `by_role_menus` — 角色 ↔ 菜单
- `by_role_apis` — 角色 ↔ API
- `by_role_buttons` — 角色 ↔ 按钮
- `by_role_home` — 角色默认首页

## Menu（菜单）

| 字段 | 类型 | 说明 |
|------|------|------|
| menu_name | str | 菜单名称 |
| route_path | str | 前端路由路径 |
| component | str | 前端组件路径 |
| parent_id | int | 父级 ID |
| icon | str | 图标 |
| i18n_key | str | 国际化 Key |
| constant | bool | 常量路由 |
| hide_in_menu | bool | 菜单中隐藏 |
| keep_alive | bool | 缓存 |

## Api（接口）

| 字段 | 类型 | 说明 |
|------|------|------|
| api_path | str | 接口路径 |
| api_method | str | HTTP 方法 |
| summary | str | 接口描述 |
| status_type | StatusType | 状态 |

启动时自动从 FastAPI 路由注册到数据库。

## Button（按钮）

| 字段 | 类型 | 说明 |
|------|------|------|
| button_code | str | 按钮编码 |
| button_desc | str | 按钮描述 |
| status_type | StatusType | 状态 |

## 数据库

- 默认：SQLite (`app_system.sqlite3`)
- ORM：Tortoise ORM
- 迁移：Aerich
- 缓存：Redis (fastapi-cache2)
