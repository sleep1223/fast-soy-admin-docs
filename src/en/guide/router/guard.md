# Router Guard

Router guards control page access based on authentication and permissions.

## Guard Flow

```
Navigation triggered
  ↓
Is it a constant route? (e.g., login, 404)
  YES → Allow access
  NO  ↓
Is user logged in?
  NO  → Redirect to login page
  YES ↓
Are dynamic routes loaded?
  NO  → Load routes from backend → Redirect
  YES ↓
Does user have permission?
  NO  → Redirect to 403 page
  YES → Allow access
```

## Guard Files

Located in `src/router/guard/`:

### route.ts

Main guard logic handling authentication, dynamic route loading, and permission checks.

### progress.ts

Shows NProgress loading bar during page transitions.

### title.ts

Syncs the document title with the current route's `title` or `i18nKey`.

## Constant Routes

Routes with `constant: true` in meta bypass all authentication checks. Used for:

- Login page
- Error pages (403, 404, 500)
- Public pages

```typescript
meta: {
  title: 'Login',
  constant: true
}
```
