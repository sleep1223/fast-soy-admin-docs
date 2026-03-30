# Route Creation

## Creating a Route Page

To create a new route, simply create a new `.vue` file in the `src/views/` directory.

### Steps

1. Create a new folder and `index.vue` file in `src/views/`
2. The route is automatically generated after the dev server restarts
3. Add route meta information in the generated route file

### Example: Creating a Dashboard Page

```
src/views/
└── dashboard/
    └── index.vue
```

```vue
<script setup lang="ts">
import { defineOptions } from 'vue';

defineOptions({ name: 'DashboardPage' });
</script>

<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>
```

The route meta can be configured in `src/router/elegant/transform.ts`:

```typescript
{
  name: 'dashboard',
  path: '/dashboard',
  meta: {
    title: 'Dashboard',
    i18nKey: 'route.dashboard',
    icon: 'mdi:view-dashboard',
    order: 1
  }
}
```

## Creating Nested Routes

Create nested folders:

```
src/views/
└── manage/
    └── user/
        └── index.vue     // /manage/user
    └── role/
        └── index.vue     // /manage/role
```

## Creating Hidden Routes

For detail pages that shouldn't appear in the menu:

```typescript
meta: {
  title: 'User Detail',
  hideInMenu: true,
  activeMenu: 'manage_user'  // Highlights "User" menu item
}
```
