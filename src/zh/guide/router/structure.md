# 路由结构

路由从 `src/views/` 目录的文件结构自动生成。

## 一级路由

`views/about/index.vue` → `/about`

## 二级路由

`views/manage/user/index.vue` → `/manage/user`

## 多级路由

用下划线 `_` 避免过深嵌套：`views/manage_user_detail/index.vue` → `/manage/user/detail`

## 参数路由

`views/user/[id].vue` → `/user/:id`

## 自定义路由

根路由 `/` 和 404 在 `src/router/routes/builtin.ts` 中声明。
