# 简介

[FastSoyAdmin](https://github.com/sleep1223/fast-soy-admin) 是一套开箱即用的全栈后台管理模板。

- **前端**：基于 [SoybeanAdmin](https://github.com/soybeanjs/soybean-admin)，Vue3 + Vite7 + TypeScript + Pinia + UnoCSS + Naive UI
- **后端**：FastAPI + Pydantic v2 + Tortoise ORM + Redis，按"系统模块 + 业务模块"分层、业务模块自动发现

整个仓库是 monorepo：根目录下 `/app` 是后端，`/web` 是前端，`/deploy` 是 Docker / Nginx。

## 特性

- **全栈** — 端到端类型安全，统一响应格式（camelCase）
- **完整 RBAC** — 菜单 / API / 按钮三层权限 + 行级 `data_scope`，前后端严格分离
- **动态路由** — 路由按角色由后端实时下发，前端不维护权限分发逻辑
- **业务模块自动发现** — `app/business/<x>/` 放进去就自动注册路由、模型、初始化数据；模块互相不耦合
- **代码生成器** — `make cli-init / cli-gen / cli-gen-web` 端到端从模型生成前后端 CRUD
- **Redis 加速** — 角色权限 / 常量路由 / token_version 全部走缓存，故障时降级到数据库
- **状态机 / 事件总线 / Sqids ID** — 框架级基础设施
- **生产可用** — fastapi-radar 全栈追踪 + fastapi-guard 限流 + 多 worker 启动锁
- **Docker 一键部署** — Nginx + FastAPI + Redis

## 文档怎么读

| 你的目标 | 建议入口 |
|---|---|
| 把项目跑起来 | [快速开始](./quick-start.md) |
| 加一个业务模块（最常见） | [开发指南](../backend/development.md)（CLI 端到端） |
| 理解后端架构 / 自动发现 / RBAC | [后端 / 简介](../backend/intro.md) → [架构](../backend/architecture.md) |
| 理解前端路由 / 请求 / 主题 | [前端 / 简介](../frontend/intro.md) |
| 提交前需要遵守哪些约定 | [规范 / 后端](../standard/backend.md) + [Vue 风格](../standard/vue.md) + [命名](../standard/naming.md) |
| 部署 | [部署](../backend/deployment.md) |
| 报错怎么办 | [常见问题](../faq/) |

## 架构总览

```
┌─────────────────────────────────────────────────┐
│                    Nginx (:1880)                 │
│         静态资源服务 + /api/* 反向代理            │
├─────────────────────┬───────────────────────────┤
│   前端 (:9527)       │     后端 (:9999)          │
│   Vue3 + Vite7      │     FastAPI                │
│                     │                            │
│   Views             │     api/  (system/business)│
│     ↓               │       ↓                    │
│   Pinia Store       │     services/              │
│     ↓               │       ↓                    │
│   Service (Alova)   │     controllers (CRUDBase) │
│     ↓               │       ↓                    │
│   HTTP 请求 ────────┼──→  /api/v1/*              │
│                     │       ↓                    │
│                     │     Tortoise / Redis       │
└─────────────────────┴───────────────────────────┘
```

## 链接

- [在线预览](https://fast-soy-admin.sleep0.de/)
- [GitHub 仓库](https://github.com/sleep1223/fast-soy-admin)
- [API 文档 (Apifox)](https://apifox.com/apidoc/shared-7cd78102-46eb-4701-88b1-3b49c006504b)
- [SoybeanAdmin（前端上游）](https://github.com/soybeanjs/soybean-admin)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Tortoise ORM](https://tortoise.github.io)
