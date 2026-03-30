# Proxy

## Development Proxy

In development, the Vite dev server proxies API requests to the backend to avoid CORS issues.

Configure the proxy in `vite.config.ts` based on the environment variable `VITE_SERVICE_BASE_URL`.

Example proxy configuration:

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9999',
        changeOrigin: true
      }
    }
  }
});
```

## Production Proxy

In production, Nginx handles the reverse proxy:

```nginx
# deploy/web.conf
location /api/ {
    proxy_pass http://app:9999;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

## Environment Variables

```bash
# .env.test (development)
VITE_SERVICE_BASE_URL=/api/v1

# .env.prod (production)
VITE_SERVICE_BASE_URL=/api/v1
```

The frontend always calls `/api/v1/...`, and the proxy layer forwards to the actual backend.
