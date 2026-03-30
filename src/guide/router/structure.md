# Route Structure

Routes are automatically generated from the file structure in `src/views/`. There are several types of route structures.

## Single-Level Route

A single page with the base layout.

**File structure:**

```
views/
└── about/
    └── index.vue
```

**Generated route:**

```typescript
{
  name: 'about',
  path: '/about',
  component: 'layout.base$view.about',
  meta: { title: 'about' }
}
```

## Secondary Route

A parent route with child pages.

**File structure:**

```
views/
└── manage/
    ├── index.vue        // Optional parent page
    └── user/
        └── index.vue    // Child page
```

**Generated route:**

```typescript
{
  name: 'manage',
  path: '/manage',
  component: 'layout.base',
  children: [
    {
      name: 'manage_user',
      path: '/manage/user',
      component: 'view.manage_user',
      meta: { title: 'manage_user' }
    }
  ]
}
```

## Multi-Level Route

For deeply nested routes, use underscore `_` to avoid excessive folder nesting.

**File structure:**

```
views/
└── manage_user_detail/
    └── index.vue
```

This maps to the path `/manage/user/detail`.

## Parameter Route

Use bracket syntax `[param]` for dynamic segments.

**File structure:**

```
views/
└── user/
    └── [id].vue
```

**Generated route:**

```typescript
{
  name: 'user',
  path: '/user/:id',
  component: 'view.user',
  props: true
}
```

## Custom Route

Routes like root `/` and 404 are declared in `src/router/routes/builtin.ts`.
