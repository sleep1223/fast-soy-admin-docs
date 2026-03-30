# Icon Usage

## Static Usage (Auto-import)

### Iconify Icons

Use the format `<icon-{collection}-{name}>`:

```html
<icon-mdi-emoticon />
<icon-carbon-user />
<icon-ic-round-settings />
```

### Local Icons

Use the format `<icon-local-{name}>`:

```html
<icon-local-logo />
<icon-local-custom-icon />
```

Local icons must be placed in `src/assets/svg-icon/`.

## Dynamic Usage (SvgIcon Component)

For icons determined at runtime:

```html
<!-- Iconify icon -->
<svg-icon icon="mdi:emoticon" />

<!-- Local icon -->
<svg-icon local-icon="logo" />

<!-- With size and color -->
<svg-icon icon="mdi:emoticon" class="text-24px text-primary" />
```

## Render Function

For programmatic rendering (e.g., in table columns or menu items):

```typescript
import { useSvgIconRender } from '@/hooks/common/icon';
import SvgIcon from '@/components/custom/svg-icon.vue';

const { SvgIconVNode } = useSvgIconRender(SvgIcon);

// Create icon VNode
const icon = SvgIconVNode({ icon: 'mdi:emoticon' });
const localIcon = SvgIconVNode({ localIcon: 'logo' });
```

## Offline Mode

Install `@iconify/json` for fully offline Iconify icons:

```bash
pnpm add -D @iconify/json
```

This downloads the complete icon dataset locally, so no network requests are needed at runtime.

## Usage in Route Meta

```typescript
meta: {
  icon: 'mdi:home',           // Iconify icon in menu
  // or
  localIcon: 'custom-home'    // Local icon in menu
}
```
