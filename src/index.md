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
  - icon: "\U0001F680"
    title: 全栈方案
    details: FastAPI 后端 + Vue3 前端，完整的端到端解决方案，统一响应格式与类型安全。
  - icon: "\U0001F512"
    title: RBAC 权限
    details: 基于角色的访问控制，支持菜单、接口和按钮级别权限。JWT 认证，自动刷新令牌。
  - icon: "\U0001F3A8"
    title: 主题系统
    details: 丰富的主题配置，与 UnoCSS 深度集成，支持暗黑模式和多种布局方案。
  - icon: "\U0001F4C1"
    title: 动态路由
    details: 菜单、API、按钮权限由后端统一管理，用户登录后按角色动态下发路由，RBAC 全链路贯通。
  - icon: "\U0001F30F"
    title: 国际化
    details: 内置 vue-i18n 多语言支持（中文 / English），易于扩展更多语言。
  - icon: "\U0001F4E6"
    title: Redis 缓存
    details: 集成 fastapi-cache2 + Redis，加速 API 响应，高效数据缓存。
  - icon: "\U0001F433"
    title: Docker 部署
    details: Docker Compose 一键部署，Nginx + FastAPI + Redis，开箱即用。
  - icon: "\U0001F9F9"
    title: 代码质量
    details: 前端 ESLint + oxlint，后端 Ruff + basedpyright，全栈严格类型检查。
---
