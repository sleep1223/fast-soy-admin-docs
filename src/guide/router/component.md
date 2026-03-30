# Route Component

Each route maps to a component through the `component` field. The Elegant Router plugin uses a specific format to define this mapping.

## Component Types

### Layout Component

Layout wraps the page with the global header, sidebar, tabs, and footer.

```typescript
component: 'layout.base'    // BaseLayout — full layout
component: 'layout.blank'   // BlankLayout — empty wrapper
```

### View Component

Actual page content rendered inside the layout.

```typescript
component: 'view.about'           // views/about/index.vue
component: 'view.manage_user'     // views/manage/user/index.vue
```

### Mixed Component

Combines layout and view in one declaration using `$` separator:

```typescript
component: 'layout.base$view.about'
// Equivalent to: layout = BaseLayout, view = views/about/index.vue
```

## Usage in Route Declaration

**Single page (layout + view):**

```typescript
{
  name: 'about',
  path: '/about',
  component: 'layout.base$view.about'
}
```

**Parent with children:**

```typescript
{
  name: 'manage',
  path: '/manage',
  component: 'layout.base',      // Parent only has layout
  children: [
    {
      name: 'manage_user',
      path: '/manage/user',
      component: 'view.manage_user'  // Child has view only
    }
  ]
}
```
