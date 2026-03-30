# System Theme

The system theme implementation consists of two parts: the component library theme configuration (Naive UI) and the UnoCSS theme configuration. A unified set of theme variables controls both.

## Principle

1. Define theme configuration variables (colors, layout parameters, etc.)
2. Generate component library theme variables from these configurations
3. Generate CSS variables and pass them to UnoCSS

## Theme Structure

```
src/theme/
├── settings.ts    # Default theme configuration and override configuration
└── vars.ts        # CSS variables corresponding to theme tokens
```

## Theme Colors

The system provides five semantic colors, each with a palette of 10 shades:

- **Primary** — Main brand color
- **Info** — Informational elements
- **Success** — Success states
- **Warning** — Warning states
- **Error** — Error states

## Dark Mode

Dark mode is activated by adding `class="dark"` to the `<html>` element. The theme system automatically generates corresponding dark mode colors.

## Layout Modes

The project supports multiple layout modes:

- **Vertical** — Sidebar on the left, content on the right
- **Horizontal** — Top navigation, content below
- **Mix** — Combined sidebar and top navigation
