# Request

## Multiple Request Environments

The project uses environment files to configure different backend addresses:

- `.env` — Common configuration
- `.env.test` — Test environment
- `.env.prod` — Production environment

## Configuration

Configuration items in `.env`:

- `VITE_SERVICE_SUCCESS_CODE`: Success code from backend (default: `0000`)
- `VITE_SERVICE_LOGOUT_CODES`: Codes that trigger logout (e.g., `2100,2101`)
- `VITE_SERVICE_MODAL_LOGOUT_CODES`: Codes that trigger modal logout (e.g., `2102`)
- `VITE_SERVICE_EXPIRED_TOKEN_CODES`: Codes that trigger token refresh (e.g., `2103`)

Configuration items in `.env.test` / `.env.prod`:

- `VITE_SERVICE_BASE_URL`: Base URL for requests (default: `/api/v1`)
- `VITE_OTHER_SERVICE_BASE_URL`: Base URL for other services

## Request Functions

### createRequest

Returns Axios response data directly (with optional transformation):

```typescript
const { request } = createRequest({
  baseURL: '/api/v1'
});

const data = await request({ url: '/users', method: 'GET' });
```

### createFlatRequest

Wraps the response in a flat object with error handling:

```typescript
const { request } = createFlatRequest({
  baseURL: '/api/v1'
});

const { data, error } = await request({ url: '/users', method: 'GET' });
if (error) {
  // Handle error
}
```

## Request Options

```typescript
interface RequestOption<ResponseData = any> {
  /** Modify request config before sending (e.g., add token header) */
  onRequest: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  /** Determine if backend response indicates success */
  isBackendSuccess: (response: AxiosResponse<ResponseData>) => boolean;
  /** Handle backend business failure (e.g., token expiration) */
  onBackendFail: (response: AxiosResponse<ResponseData>, instance: AxiosInstance) => Promise<void>;
  /** Transform backend response data */
  transformBackendResponse(response: AxiosResponse<ResponseData>): any;
  /** Handle request errors */
  onError: (error: AxiosError<ResponseData>) => void;
}
```
