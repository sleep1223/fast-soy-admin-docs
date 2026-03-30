# Theme Configuration

## Configuration File

Theme settings are defined in `src/theme/settings.ts`:

```typescript
export const themeSettings: App.Theme.ThemeSetting = {
  themeScheme: 'light',           // 'light' | 'dark' | 'auto'
  themeColor: '#646cff',          // Primary color
  otherColor: {
    info: '#2080f0',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d'
  },
  isInfoFollowPrimary: false,     // Info color follows primary
  layout: {
    mode: 'vertical',             // Layout mode
    scrollMode: 'content'         // Scroll mode
  },
  page: {
    animate: true,                // Page transition animation
    animateMode: 'fade-slide'     // Animation mode
  },
  header: {
    height: 56,
    breadcrumb: { visible: true }
  },
  tab: {
    visible: true,
    cache: true,
    height: 44,
    mode: 'chrome'                // Tab style
  },
  fixedHeaderAndTab: true,
  sider: {
    inverted: false,
    width: 220,
    collapsedWidth: 64,
    mixWidth: 90,
    mixCollapsedWidth: 64,
    mixChildMenuWidth: 200
  },
  footer: {
    visible: true,
    fixed: false,
    height: 48
  }
};
```

## Override Settings

Use `overrideThemeSettings` to apply version-specific overrides without resetting user preferences:

```typescript
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {
  // Override specific settings here
};
```

## Storage

- **Development**: Changes are applied immediately
- **Production**: Settings are cached in `localStorage` and persist across sessions
