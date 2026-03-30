# Route Cache

Route caching uses Vue's `<keep-alive>` component to preserve page state when navigating away.

## Enable Cache

Set `keepAlive: true` in the route meta:

```typescript
{
  name: 'manage_user',
  path: '/manage/user',
  meta: {
    title: 'User Management',
    keepAlive: true
  }
}
```

## How It Works

- When a page has `keepAlive: true`, its component instance is cached when you navigate away
- When you return to the page, the cached instance is restored instead of re-creating
- The cache is tied to the component `name`, so ensure your component has a name defined via `defineOptions`

```vue
<script setup lang="ts">
defineOptions({ name: 'ManageUserPage' });
</script>
```

## Notes

- Cached pages won't trigger `onMounted` again on return. Use `onActivated` for refresh logic
- Pages with `keepAlive` appear in the route store's cache list
- Closing a tab removes the page from the cache
