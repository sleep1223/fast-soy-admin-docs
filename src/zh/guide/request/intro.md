# 请求

## 环境配置

- `VITE_SERVICE_SUCCESS_CODE`：成功码（默认 `0000`）
- `VITE_SERVICE_LOGOUT_CODES`：需登出的码（`2100,2101`）
- `VITE_SERVICE_MODAL_LOGOUT_CODES`：弹窗登出码（`2102`）
- `VITE_SERVICE_EXPIRED_TOKEN_CODES`：刷新 Token 码（`2103`）
- `VITE_SERVICE_BASE_URL`：请求基础地址（`/api/v1`）

## 请求函数

- **`createRequest`**：返回 Axios 响应数据
- **`createFlatRequest`**：包装为 `{ data, error }` 格式

## 请求选项

```typescript
interface RequestOption {
  onRequest: (config) => config;               // 请求拦截（加 Token）
  isBackendSuccess: (response) => boolean;     // 判断业务成功
  onBackendFail: (response, instance) => void; // 业务失败处理
  transformBackendResponse: (response) => any; // 响应转换
  onError: (error) => void;                    // 错误处理
}
```
