# 路由缓存

通过 Vue `<keep-alive>` 组件缓存页面状态。

## 启用

在路由 meta 中设置 `keepAlive: true`。

## 注意

- 缓存页面不会再次触发 `onMounted`，使用 `onActivated` 处理刷新逻辑
- 确保组件通过 `defineOptions` 定义了 `name`
- 关闭标签页会移除缓存
