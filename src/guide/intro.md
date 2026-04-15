# 简介

[FastSoyAdmin](https://github.com/sleep1223/fast-soy-admin) 是一套开箱即用的全栈后台管理模板。前端基于 [SoybeanAdmin](https://github.com/soybeanjs/soybean-admin) 构建，采用 Vue3、Vite7、TypeScript、Pinia 和 UnoCSS。后端采用 FastAPI、Pydantic v2 和 Tortoise ORM，并通过 Redis 加速接口响应。

## 特性

- **全栈技术栈**：后端 FastAPI + Pydantic v2 + Tortoise ORM，前端 Vue3 + Vite7 + TypeScript + Pinia + UnoCSS
- **完整的权限体系**：基于 RBAC 模型，前后端角色权限严格分离，后端对 API 和按钮级别进行二次鉴权
- **Redis 缓存加速**：集成 fastapi-cache2 + Redis，有效提升接口响应速度
- **清晰的项目结构**：pnpm monorepo 管理，后端分层架构（Router → Controller → CRUD/Model）
- **严格的代码规范**：前端 ESLint + oxlint + simple-git-hooks；后端 Ruff + basedpyright
- **TypeScript 全覆盖**：支持严格类型检查
- **丰富的主题配置**：内置多套主题方案，与 UnoCSS 深度集成
- **国际化支持**：vue-i18n 多语言方案（中文 / English）
- **丰富的页面与组件**：内置异常页面，集成 ECharts、AntV、VChart 等可视化库
- **移动端适配**：响应式布局
- **Docker 一键部署**：Nginx + FastAPI + Redis

## 技术栈

### 后端

| 技术 | 版本 | 说明 |
|------|------|------|
| Python | >= 3.12 | 运行环境 |
| FastAPI | >= 0.121 | Web 框架 |
| Pydantic | v2 | 数据校验与序列化 |
| Tortoise ORM | >= 0.25 | 异步 ORM |
| Tortoise ORM | >= 1.0 | 内置数据库迁移 |
| Redis | - | 缓存（fastapi-cache2） |
| Argon2 | - | 密码哈希 |
| PyJWT | - | JWT 令牌 |

### 前端

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.5 | 前端框架 |
| Vite | 7 | 构建工具 |
| TypeScript | 5.9 | 类型系统 |
| Naive UI | 2.44 | 组件库 |
| Pinia | 3 | 状态管理 |
| UnoCSS | 66+ | 原子化 CSS |
| Alova | - | HTTP 客户端 |
| vue-router | 4 | 动态路由（按角色下发） |
| vue-i18n | 11 | 国际化 |

## 架构概览

```
┌─────────────────────────────────────────────────┐
│                    Nginx (:1880)                 │
│         静态资源服务 + /api/* 反向代理            │
├─────────────────────┬───────────────────────────┤
│   前端 (:9527)       │     后端 (:9999)          │
│   Vue3 + Vite7      │     FastAPI                │
│                     │                            │
│   Views             │     Router (api/v1/)       │
│     ↓               │       ↓                    │
│   Store (Pinia)     │     Controller             │
│     ↓               │       ↓                    │
│   Service (Alova)   │     CRUD / Model           │
│     ↓               │       ↓                    │
│   HTTP Request ─────┼──→  API Endpoint           │
│                     │       ↓                    │
│                     │     SQLite / Redis          │
└─────────────────────┴───────────────────────────┘
```

## 相关链接

- [在线预览](https://fast-soy-admin.sleep0.de/)
- [GitHub 仓库](https://github.com/sleep1223/fast-soy-admin)
- [API 文档 (Apifox)](https://apifox.com/apidoc/shared-7cd78102-46eb-4701-88b1-3b49c006504b)
- [SoybeanAdmin（前端上游）](https://github.com/soybeanjs/soybean-admin)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Tortoise ORM](https://tortoise.github.io)
