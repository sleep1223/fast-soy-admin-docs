---
layout: home

hero:
  name: FastSoyAdmin
  text: Full-Stack Admin Template
  tagline: FastAPI + Vue3 + TypeScript + NaiveUI + UnoCSS
  image:
    src: /logo.svg
    alt: FastSoyAdmin
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/intro
    - theme: alt
      text: View on GitHub
      link: https://github.com/sleep1223/fast-soy-admin
    - theme: alt
      text: Live Preview
      link: https://fast-soy-admin.sleep0.de/

features:
  - icon: "\U0001F916"
    title: AI-Native Workflow
    details: Ships with CLAUDE.md and llms.txt / llms-full.md so Claude Code / Cursor / Copilot get the full architecture, layering rules and API conventions up front — agents produce code that matches project conventions out of the box.
  - icon: "\U0001F680"
    title: End-to-End CLI Codegen
    details: make cli-init scaffolds the module, make cli-gen-all turns a Tortoise model into full backend (schemas / controllers / api) + frontend (views / service / typings / i18n) CRUD in one shot.
  - icon: "\U0001F9E9"
    title: Autodiscovered Modules
    details: Drop a package into app/business/&lt;name&gt;/ and routes, models and init data register themselves. Modules are decoupled; cross-module talk goes via the event bus, with optional per-module databases.
  - icon: "\U0001F512"
    title: Three-Tier RBAC + data_scope
    details: Menu / API / button checks plus row-level all / department / self / custom data scope. Button enforcement lives in services, never in UI alone.
  - icon: "\U0001F4C1"
    title: Dynamic Routing
    details: Menus, APIs and buttons are owned by the backend; routes are issued per role at login. The frontend doesn't maintain permission distribution logic.
  - icon: "\U0001F4E1"
    title: Radar Tracing
    details: Built-in /manage/radar/* panel for real-time request / SQL / exception / permission-deny logs, with fastapi-guard rate limiting and IP banning out of the box.
  - icon: "\U0001F9EA"
    title: End-to-End Type Safety
    details: basedpyright (standard) on the backend, vue-tsc on the frontend; generator i18n keys land in App.I18n.GeneratedPages via declaration merging so every $t is statically checked.
  - icon: "\U0001F433"
    title: One-Command Docker
    details: Docker Compose pre-wires Nginx + FastAPI + Redis. docker compose up -d and you're live; multi-worker startup is serialized by a Redis leader lock.
---

## Screenshots

![Home - Chinese](/screenshots/home-zh.png)

![Home - English](/screenshots/home-en.png)

![Radar - Dashboard](/screenshots/radar-dashboard.png)

![Radar - Requests](/screenshots/radar-requests.png)

![Radar - SQL](/screenshots/radar-sql.png)

![Radar - Exceptions](/screenshots/radar-exceptions.png)
