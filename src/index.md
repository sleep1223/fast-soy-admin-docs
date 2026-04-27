---
layout: home

hero:
  name: FastSoyAdmin
  text: 全栈后台管理模板
  tagline: FastAPI + Vue3 + TypeScript + NaiveUI + UnoCSS
  image:
    src: /logo.svg
    alt: FastSoyAdmin
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/intro
    - theme: alt
      text: GitHub
      link: https://github.com/sleep1223/fast-soy-admin
    - theme: alt
      text: 在线预览
      link: https://fast-soy-admin.sleep0.de/

features:
  - icon: "\U0001F916"
    title: AI 驱动开发
    details: 仓库内置 CLAUDE.md 与 llms.txt / llms-full.md，把架构约定、分层职责、API 规范一次喂给 Claude Code / Cursor / Copilot，AI 直接按项目规范产出代码。
  - icon: "\U0001F680"
    title: CLI 端到端生成
    details: make cli-init 起骨架，make cli-gen-all 从 Tortoise 模型一键产出前后端 CRUD（schemas / controllers / api + views / service / typings / i18n）。
  - icon: "\U0001F9E9"
    title: 业务模块自动发现
    details: app/business/&lt;name&gt;/ 放进去就自动注册路由、模型与初始化数据；模块互不耦合，跨模块走事件总线，可按模块独立分库。
  - icon: "\U0001F512"
    title: 三层 RBAC + 行级权限
    details: 菜单 / API / 按钮三层鉴权，叠加 all / department / self / custom 行级 data_scope；按钮校验下沉到 service，杜绝"前端隐藏即安全"。
  - icon: "\U0001F4C1"
    title: 动态路由
    details: 菜单、API、按钮权限由后端统一管理，用户登录后按角色实时下发路由，前端不维护权限分发逻辑。
  - icon: "\U0001F4E1"
    title: Radar 全栈追踪
    details: 内置 /manage/radar/* 面板，实时查看请求 / SQL / 异常 / 权限拒绝日志；fastapi-guard 限流 + IP 封禁开箱即用。
  - icon: "\U0001F9EA"
    title: 全栈类型安全
    details: 后端 basedpyright（standard）+ 前端 vue-tsc，i18n 键经 declaration merging 注入 App.I18n.GeneratedPages，$t 调用静态可校验。
  - icon: "\U0001F433"
    title: Docker 一键部署
    details: Docker Compose 编排好 Nginx + FastAPI + Redis，docker compose up -d 即可上线，多 worker 启动有 Redis leader 锁协调。
---

## 界面预览

![首页-中文](/screenshots/home-zh.png)

![首页-英文](/screenshots/home-en.png)

![性能监控-仪表盘](/screenshots/radar-dashboard.png)

![性能监控-请求列表](/screenshots/radar-requests.png)

![性能监控-SQL查询](/screenshots/radar-sql.png)

![性能监控-异常列表](/screenshots/radar-exceptions.png)
