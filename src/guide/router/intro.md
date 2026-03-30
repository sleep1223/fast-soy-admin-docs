# 系统路由

本系统路由基于插件 [Elegant Router](https://github.com/soybeanjs/elegant-router)。详细用法请参考插件文档。

::: danger
由于使用了 `<Transition>` 标签支持页面切换动画，`.vue` 文件的 `template` 中只能有一个根元素，不能使用注释或纯文本。
:::

## 自动生成

启动项目后，插件自动扫描 `src/views/` 目录生成 `src/router/elegant` 目录中的路由文件。

> [!IMPORTANT]
> 路由是文件的副产品——删除文件即删除路由。只有 `component` 和 `meta` 信息可以手动修改。

## RouteMeta 属性

```typescript
interface RouteMeta {
  title: string;                  // 路由标题
  i18nKey?: App.I18n.I18nKey;    // 国际化 key（设置后忽略 title）
  roles?: string[];               // 允许访问的角色（空 = 无限制）
  keepAlive?: boolean;            // 是否缓存
  constant?: boolean;             // 常量路由（无需登录）
  icon?: string;                  // Iconify 图标
  localIcon?: string;             // 本地 SVG 图标
  order?: number;                 // 菜单排序
  hideInMenu?: boolean;           // 在菜单中隐藏
  activeMenu?: RouteKey;          // 激活的菜单项
  multiTab?: boolean;             // 多标签页
  fixedIndexInTab?: number;       // 固定标签页顺序
  query?: { key: string; value: string }[];
}
```

图标来源：[icones.js.org](https://icones.js.org/)
