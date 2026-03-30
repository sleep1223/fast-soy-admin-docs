# 认证与权限

## JWT 认证

| 设置 | 值 |
|------|------|
| 算法 | HS256 |
| Access Token | 12 小时 |
| Refresh Token | 7 天 |
| 密码哈希 | Argon2 |

### 登录流程

```
POST /auth/login
  → 验证用户名 + 密码（Argon2）
  → 检查账号状态
  → 生成 access_token + refresh_token
  → 返回令牌
```

### Token 刷新

```
POST /auth/refresh-token
  → 验证 refresh_token 签名
  → 确认 token 类型为 refresh
  → 生成新的 access_token
  → 返回新令牌
```

## RBAC 权限控制

### AuthControl

1. 从 Header 提取 Bearer Token
2. 解码 JWT 获取 user_id
3. 查询数据库验证用户存在且启用
4. 将 user_id 存入上下文变量

### PermissionControl

1. 获取当前用户的所有角色
2. 超级管理员 `R_SUPER` 直接放行
3. 获取角色关联的所有 API
4. 匹配当前请求的 method + path
5. 检查 API 状态（停用返回 2200）
6. 无匹配返回 2201（权限不足）

## 按钮权限

按钮编码通过 `getUserInfo` 接口返回给前端，前端根据编码条件渲染按钮。
