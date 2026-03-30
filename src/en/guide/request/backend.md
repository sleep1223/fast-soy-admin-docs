# Connect Backend

## Token Handling

The request interceptor automatically adds the JWT token to every request:

```typescript
onRequest(config) {
  const token = localStg.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}
```

## Token Refresh

When the backend returns code `2103` (token expired), the frontend automatically:

1. Calls `POST /auth/refresh-token` with the refresh token
2. Receives a new access token
3. Retries the original failed request with the new token

This process is transparent to the user.

## Error Handling

Backend error codes are mapped to frontend actions:

| Code | Action |
|------|--------|
| `0000` | Success — extract data |
| `2100`, `2101` | Redirect to login page |
| `2102` | Show modal, then logout |
| `2103` | Auto-refresh token and retry |
| Others | Show error message |

## Backend Response Contract

All APIs follow the standard response format:

```json
{
  "code": "0000",
  "msg": "OK",
  "data": { ... }
}
```

For paginated data:

```json
{
  "code": "0000",
  "msg": "OK",
  "data": { "records": [...] },
  "total": 100,
  "current": 1,
  "size": 10
}
```

## Adding New APIs

1. Define the API function in `service-alova/api/`:

```typescript
export function fetchUserList(params: Api.SystemManage.UserSearchParams) {
  return request.Post<Api.SystemManage.UserList>('/system-manage/users/all/', params);
}
```

2. Define TypeScript types in `typings/api.d.ts`

3. Use in components or stores
