# 动态路由

## 静态路由模式

设置 `VITE_AUTH_ROUTE_MODE=static`，前端定义路由，通过 `roles` 字段过滤。

## 动态路由模式

设置 `VITE_AUTH_ROUTE_MODE=dynamic`，从后端 API `GET /route/routes` 获取路由。

### 工作流程

1. 用户登录获取 JWT
2. 前端调用 `GET /route/routes`
3. 后端根据用户角色 → 角色菜单 → 构建路由树
4. 前端动态注册路由
5. 从路由树生成菜单

超级管理员 `R_SUPER` 拥有所有路由的访问权限。
