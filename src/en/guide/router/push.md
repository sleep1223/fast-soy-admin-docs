# Router Push

The project provides the `useRouterPush` hook for type-safe route navigation.

## Usage

```typescript
import { useRouterPush } from '@/hooks/common/router';

const { routerPushByKey, toLogin, toggleLoginModule, redirectFromLogin } = useRouterPush();
```

## Methods

### routerPushByKey

Navigate by route key with full type checking:

```typescript
// Simple navigation
routerPushByKey('manage_user');

// With query parameters
routerPushByKey('manage_user', { query: { id: '123' } });

// With path parameters
routerPushByKey('user_detail', { params: { id: '456' } });
```

### toLogin

Redirect to the login page, preserving the current path for redirect after login:

```typescript
toLogin();
```

### toggleLoginModule

Switch between login modules (login, register, forgot password):

```typescript
toggleLoginModule('register');
toggleLoginModule('reset-pwd');
```

### redirectFromLogin

After successful login, redirect to the originally requested page or the default home:

```typescript
redirectFromLogin();
```

## Direct Router Usage

You can also use `vue-router` directly:

```typescript
import { useRouter } from 'vue-router';

const router = useRouter();
router.push('/manage/user');
router.push({ name: 'manage_user', query: { id: '123' } });
```
