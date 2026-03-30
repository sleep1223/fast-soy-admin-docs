# 创建路由

在 `src/views/` 目录下创建新的 `.vue` 文件即可自动生成路由。

## 步骤

1. 在 `src/views/` 中创建文件夹和 `index.vue`
2. 重启开发服务器后路由自动生成
3. 在生成的路由文件中配置 meta 信息

## 隐藏路由

不需要在菜单中显示的详情页：

```typescript
meta: {
  title: '用户详情',
  hideInMenu: true,
  activeMenu: 'manage_user'
}
```
