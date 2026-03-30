# 图标使用

## 静态使用

```html
<icon-mdi-emoticon />          <!-- Iconify 图标 -->
<icon-local-logo />            <!-- 本地图标 -->
```

## 动态使用

```html
<svg-icon icon="mdi:emoticon" />
<svg-icon local-icon="logo" />
```

## 渲染函数

```typescript
const { SvgIconVNode } = useSvgIconRender(SvgIcon);
const icon = SvgIconVNode({ icon: 'mdi:emoticon' });
```

## 离线模式

安装 `@iconify/json` 后完全离线使用。

## 路由图标

```typescript
meta: {
  icon: 'mdi:home',           // Iconify
  localIcon: 'custom-home'    // 本地
}
```
