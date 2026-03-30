# 使用方式

API 函数定义在 `src/service-alova/api/`，遵循 `fetchXxx` 命名规范。

```typescript
// api/auth.ts
export function fetchLogin(data: { userName: string; password: string }) {
  return request.Post<Api.Auth.LoginToken>('/auth/login', data);
}
```

## 后端响应格式

```typescript
interface BackendResponse<T> {
  code: string;   // 业务状态码（"0000" = 成功）
  msg: string;    // 响应消息
  data: T;        // 响应数据
}
```
