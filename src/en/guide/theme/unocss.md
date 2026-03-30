# UnoCSS Theme

Theme tokens are injected into UnoCSS configuration, allowing you to use theme colors directly in class names.

## Color Classes

```html
<!-- Text color -->
<span class="text-primary">Primary text</span>
<span class="text-success">Success text</span>
<span class="text-warning">Warning text</span>
<span class="text-error">Error text</span>

<!-- Background color -->
<div class="bg-primary">Primary background</div>
<div class="bg-primary-100">Light primary background</div>

<!-- Border color -->
<div class="border border-primary">Primary border</div>
```

## Color Palette

Each theme color generates a palette of 10 shades (50-900):

```html
<div class="bg-primary-50">Lightest</div>
<div class="bg-primary-100">Lighter</div>
<div class="bg-primary-200">Light</div>
<div class="bg-primary-300">...</div>
<div class="bg-primary-400">...</div>
<div class="bg-primary-500">Base</div>
<div class="bg-primary-600">...</div>
<div class="bg-primary-700">Dark</div>
<div class="bg-primary-800">Darker</div>
<div class="bg-primary-900">Darkest</div>
```

## Dark Mode

UnoCSS dark mode uses the `class` strategy. When `<html class="dark">` is present:

```html
<!-- Automatically switches to dark mode colors -->
<div class="bg-white dark:bg-dark">Adaptive background</div>
```

## Configuration

UnoCSS preset is defined in `web/packages/uno-preset/`, which reads theme tokens and generates the utility classes.
