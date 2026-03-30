# Request Usage

## API File Structure

API functions are defined in `src/service-alova/api/`:

```
service-alova/
├── api/
│   ├── auth.ts            # Authentication APIs
│   ├── system-manage.ts   # System management APIs
│   └── route.ts           # Dynamic route APIs
├── request/
│   ├── index.ts           # Request instance creation
│   └── shared.ts          # Shared request utilities
└── mocks/                 # Mock data for development
```

## Defining API Functions

API functions follow the `fetchXxx` naming convention:

```typescript
// api/auth.ts
import { request } from '../request';

/** Login */
export function fetchLogin(data: { userName: string; password: string }) {
  return request.Post<Api.Auth.LoginToken>('/auth/login', data);
}

/** Get user info */
export function fetchGetUserInfo() {
  return request.Get<Api.Auth.UserInfo>('/auth/getUserInfo');
}

/** Refresh token */
export function fetchRefreshToken(data: { refreshToken: string }) {
  return request.Post<Api.Auth.LoginToken>('/auth/refresh-token', data);
}
```

## Using in Components

```vue
<script setup lang="ts">
import { fetchLogin } from '@/service-alova/api';

async function handleLogin() {
  const { data, error } = await fetchLogin({
    userName: 'admin',
    password: 'admin123'
  });

  if (!error) {
    // Login success, data contains token
    console.log(data);
  }
}
</script>
```

## Backend Response Format

All FastSoyAdmin backend APIs return a unified format:

```typescript
interface BackendResponse<T = any> {
  code: string;   // Business status code ("0000" = success)
  msg: string;    // Response message
  data: T;        // Response data
}
```

The request layer automatically extracts the `data` field when `code === "0000"`.
