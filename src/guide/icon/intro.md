# Icon System

The project supports two types of icons: **Iconify** (remote/offline SVG icon sets) and **local SVG** icons.

## Iconify Icons

[Iconify](https://iconify.design/) provides 100,000+ icons from popular icon sets. Icons are loaded as SVG, rendered inline.

Browse icons at [icones.js.org](https://icones.js.org/).

## Local SVG Icons

Custom SVG icons stored in `src/assets/svg-icon/` are bundled with the project and available offline.

## How It Works

1. **unplugin-icons**: Auto-imports Iconify icons as Vue components
2. **vite-plugin-svg-icons**: Bundles local SVGs into a sprite
3. **@iconify/vue**: Provides the `<Icon>` component for dynamic rendering

## Prefix Configuration

```
VITE_ICON_PREFIX=icon               # Iconify icon prefix
VITE_ICON_LOCAL_PREFIX=icon-local   # Local icon prefix
```
