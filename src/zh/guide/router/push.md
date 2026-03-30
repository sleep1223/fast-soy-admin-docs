# 路由跳转

通过 `useRouterPush` Hook 提供类型安全的路由导航。

```typescript
const { routerPushByKey, toLogin, redirectFromLogin } = useRouterPush();

routerPushByKey('manage_user');           // 按 key 跳转
routerPushByKey('user_detail', { params: { id: '1' } }); // 带参数
toLogin();                                // 跳转登录
redirectFromLogin();                      // 登录后重定向
```
