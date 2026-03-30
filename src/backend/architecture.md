# 架构

## 分层架构

```
Router (api/v1/) → Controller (controllers/) → CRUD Base (core/crud.py) → Model (models/)
```

### 路由层

定义 HTTP 端点，通过 Pydantic Schema 处理请求/响应序列化。依赖注入实现认证与权限检查。

### Controller 层

业务逻辑：校验、数据转换、跨模型操作。

### CRUD 基类层

所有 Controller 共享的通用异步 CRUD 操作。

### 模型层

Tortoise ORM 模型，定义数据库表结构和关联关系。

## RBAC 权限模型

```
User ←M2M→ Role ←M2M→ Menu   (菜单权限)
                  ←M2M→ API    (接口权限)
                  ←M2M→ Button (按钮权限)
```

- **用户** 被分配一个或多个 **角色**
- **角色** 被授权访问 **菜单**（前端路由）、**API**（后端接口）和 **按钮**（UI 操作）
- 超级管理员角色 `R_SUPER` 跳过所有权限检查

## 中间件栈

| 顺序 | 中间件 | 作用 |
|------|--------|------|
| 1 | CORSMiddleware | 跨域请求处理 |
| 2 | PrettyErrorsMiddleware | 错误输出美化 |
| 3 | BackgroundTaskMiddleware | 后台任务支持 |
| 4 | RequestIDMiddleware | 注入 X-Request-ID |
| 5 | RadarMiddleware（可选） | 请求/响应调试 |
