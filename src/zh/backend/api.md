# API 路由

所有路由挂载在 `/api/v1/` 下。

## 认证 (`/auth`)

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/auth/login` | 登录，返回 access + refresh token |
| POST | `/auth/refresh-token` | 刷新 access token |
| GET | `/auth/getUserInfo` | 获取当前用户信息 + 角色 + 按钮 |

## 系统管理 (`/system-manage`)

### 用户

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/users/all/` | 搜索用户（分页、过滤） |
| GET | `/users/{user_id}` | 获取单个用户 |
| POST | `/users` | 创建用户 |
| PATCH | `/users/{user_id}` | 更新用户 |
| DELETE | `/users/{user_id}` | 删除用户 |
| DELETE | `/users` | 批量删除 |

### 角色

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/roles` | 获取所有启用角色 |
| POST | `/roles/all/` | 搜索角色 |
| GET/POST/PATCH/DELETE | `/roles/{role_id}` | 角色 CRUD |

### 菜单

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/menus` | 获取菜单树 |
| POST/PATCH/DELETE | `/menus/{menu_id}` | 菜单 CRUD |
| GET | `/menus/pages/` | 获取所有页面 |

## 动态路由 (`/route`)

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/routes` | 获取当前用户可访问路由 |
