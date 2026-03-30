# 代理

## 开发环境

Vite 开发服务器代理 API 请求到后端，避免跨域问题。

## 生产环境

Nginx 反向代理 `/api/*` 到 FastAPI 后端。

```nginx
location /api/ {
    proxy_pass http://app:9999;
}
```
