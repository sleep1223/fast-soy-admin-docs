# FastSoyAdmin 一键升级与内核化方案

本文讨论如何把 FastSoyAdmin 从“全栈后台模板”逐步演进为“可一键升级的后台开发内核”，让业务项目在升级 FastSoyAdmin 时尽量不修改原有业务代码，也不产生大量 diff 和 merge。

核心判断：

- FastSoyAdmin 可以借鉴 Django “可复用 app”的组织思想。
- 但 FastSoyAdmin 不应该变成 Django，而应该保持 FastAPI + Vue3 的 API-first、前后端一体化后台开发内核定位。
- 真正要解决的问题不是“怎么写插件”，而是“内核代码和业务代码如何物理隔离、如何约定稳定接口、如何升级时自动校验兼容性”。

## 需求背景

典型项目诉求：

> 我们用 FastSoyAdmin 做项目，很多时候希望能在升级 FastSoyAdmin 的时候，不需要修改原有的业务代码，也不需要很多 diff 和 merge。最好就是一键升级 FastSoyAdmin，其他的都不需要改。

进一步目标：

- FastSoyAdmin 作为“开发内核包”持续升级。
- 业务模块作为项目资产稳定存在。
- 前后端业务代码可以按模块开发、按模块启用、按模块发布。
- CLI 生成器、权限模型、菜单模型、系统管理、前端布局等能力随内核升级。

## 当前基础

当前仓库已经具备一些内核化基础：

- 后端通过 `app/core/autodiscover.py` 扫描 `app/business/*`。
- 业务模块通过 `models.py`、`api/`、`init_data.py` 提供模型、路由和初始化数据。
- 业务代码推荐从 `app.utils` 统一导入框架能力。
- 菜单、API、按钮、角色、数据权限已经有明确约定。
- 前端具备动态路由模式，后端可以按角色下发菜单路由。
- CLI 可以从模型生成后端 CRUD 与前端页面。

主要问题：

- 内核代码和业务代码仍在同一个源码树中。
- 后端包名仍是 `app`，业务 import 路径与内核内部路径耦合较深。
- 前端生成物会写入 `web/src/service`、`web/src/views`、`web/src/locales` 等内核项目目录。
- 升级时很难判断哪些修改属于业务、哪些修改属于内核。
- 一旦项目方修改 `app/core`、`app/system`、`web/src/router`、`web/src/store` 等内核文件，后续升级必然产生 merge 成本。

## 设计目标

目标：

1. 业务代码不修改内核源码。
2. 内核可以通过版本号升级。
3. 业务模块可以自动发现和挂载。
4. 前端业务页面、接口、类型、i18n 可以模块化接入。
5. 升级前能生成升级计划，升级后能自动检查兼容性。
6. 数据库迁移不自动破坏业务数据，所有 schema 变更可审计。

非目标：

- 不把 FastSoyAdmin 改造成 Django。
- 不牺牲 FastAPI + Vue3 的前后端分离体验。
- 不把所有复杂业务都强行塞进代码生成器。
- 不追求一次性大重构完成所有目标。

## 核心概念

### 内核

FastSoyAdmin 官方维护并可升级的部分：

- 后端核心：`core`、`system`、认证、RBAC、缓存、事件、Radar、CLI。
- 前端核心：登录、布局、路由、系统管理、权限、基础 store、基础组件。
- 生成器：根据模型生成业务 CRUD 的开发工具。
- 兼容层：业务代码允许依赖的稳定 API。

### 项目壳

具体项目拥有的部分：

- `.env` 与部署配置。
- 项目品牌配置。
- 已启用业务模块清单。
- 业务迁移。
- 项目级少量 glue code。

### 业务模块

项目真正的业务资产：

- 后端模型、schema、controller、service、api、init_data。
- 前端页面、接口 service、类型、i18n。
- 菜单、按钮、角色、数据权限声明。
- 业务种子数据与业务迁移。

## 方案总览

| 方案 | 目标形态 | 改造成本 | 升级体验 | 适用阶段 |
|---|---|---:|---:|---|
| 方案一：模板仓库 + 严格边界 | 保持单仓库，但规定内核/业务目录边界 | 低 | 中 | 短期过渡 |
| 方案二：内核包 + 项目壳 | FastSoyAdmin 作为 Python/npm 包安装 | 中高 | 高 | 推荐主线 |
| 方案三：业务模块插件包 | 每个业务模块也可独立发布 | 高 | 高 | 多项目复用 |
| 方案四：声明式生成 | 业务主要维护模型/声明，生成物可重建 | 中高 | 很高 | CRUD 密集项目 |
| 方案五：微前端 + 后端模块服务 | 业务独立服务和远程前端模块 | 很高 | 很高 | 大型组织 |

## 方案一：模板仓库 + 严格业务隔离

保留当前单仓库结构，但明确目录所有权。

内核目录：

```text
app/core/
app/system/
app/cli/
app/utils/
web/src/layouts/
web/src/router/
web/src/store/
web/src/views/manage/
web/src/views/_builtin/
```

业务目录：

```text
app/business/<module>/
web/src/views/<module>/
web/src/locales/langs/_generated/<module>/
web/src/service/api/<module>-manage.ts
web/src/typings/api/<module>-manage.d.ts
```

增加命令：

```bash
just upgrade-fastsoy
just doctor
```

`just doctor` 检查：

- 业务模块是否直接 import `app.core.*`。
- 业务模块是否直接 import `app.system.*`，白名单除外。
- 是否修改过内核目录。
- 前端业务页面是否 import 内核内部私有路径。
- 业务菜单、按钮、角色声明是否存在漂移。

优点：

- 改造最小。
- 当前项目很快可以落地。
- 能立刻减少升级冲突。

缺点：

- 仍然是模板升级，本质上不是包升级。
- 只要项目方改了内核文件，merge 成本依旧存在。
- 前端生成物仍然写入内核源码树。

适合做第一阶段治理。

## 方案二：内核包 + 项目壳

这是推荐主线。

目标是把 FastSoyAdmin 拆成可发布的后端包和前端包，项目只依赖内核版本。

### 后端包

目标包：

```text
fastsoy_admin/
├── core/
├── system/
├── cli/
├── sdk/
└── compat/
```

项目壳：

```text
project/
├── pyproject.toml
├── app/
│   ├── __init__.py
│   ├── utils.py              # 可选兼容层，转发到 fastsoy_admin.sdk
│   └── business/
│       └── crm/
├── migrations/
├── web/
└── .env
```

业务代码从稳定 SDK 导入：

```python
from fastsoy_admin.sdk import CRUDBase, CRUDRouter, SchemaBase, Success
```

兼容期保留：

```python
from app.utils import CRUDBase, CRUDRouter, SchemaBase, Success
```

后端内核负责：

- 创建 FastAPI app。
- 注册 system router。
- 注册数据库。
- 自动发现业务模块。
- 执行 init_data。
- 刷新 API、菜单、权限缓存。
- 提供 CLI。

业务模块负责：

- 暴露 `models`、`router`、`init_data`。
- 只依赖 `fastsoy_admin.sdk`。
- 不 import 内核私有模块。

### 前端包

目标包：

```text
@fast-soy/admin-core
@fast-soy/admin-kit
@fast-soy/vite-plugin
```

职责划分：

| 包 | 职责 |
|---|---|
| `@fast-soy/admin-core` | 布局、登录、路由、系统管理、权限 store |
| `@fast-soy/admin-kit` | request、hooks、通用组件、业务开发类型 |
| `@fast-soy/vite-plugin` | 扫描业务模块，汇总 views、routes、locales、services |

业务前端模块结构：

```text
web/modules/crm/
├── manifest.ts
├── service.ts
├── typings.d.ts
├── locales/
│   ├── zh-cn.ts
│   └── en-us.ts
└── views/
    └── customer/
        ├── index.vue
        └── modules/
```

业务模块声明：

```ts
export default {
  name: 'crm',
  views: import.meta.glob('./views/**/*.vue'),
  locales: {
    'zh-cn': () => import('./locales/zh-cn'),
    'en-us': () => import('./locales/en-us')
  }
};
```

内核前端通过 Vite 插件汇总所有业务模块，不再让生成器手动改 `web/src/service/api/index.ts`。

### 升级流程

命令示例：

```bash
just upgrade-fastsoy
```

内部步骤：

```bash
uv lock --upgrade-package fast-soy-admin
cd web && pnpm up @fast-soy/admin-core @fast-soy/admin-kit @fast-soy/vite-plugin
uv run fastsoy upgrade --plan
uv run fastsoy doctor
just check
```

升级命令必须输出：

- 当前内核版本。
- 目标内核版本。
- Python 包变更。
- npm 包变更。
- 数据库迁移计划。
- 业务模块兼容性检查结果。
- 需要人工处理的 breaking changes。

优点：

- 内核升级从 git merge 变成依赖升级。
- 业务代码物理上和内核分离。
- 最接近“一键升级”目标。

缺点：

- 初次拆包成本较高。
- 需要设计稳定 SDK。
- 需要改造前端模块扫描与构建流程。

## 方案三：业务模块插件包

在方案二基础上，把业务模块也做成可发布包。

后端业务包：

```text
fastsoy_crm/
├── models.py
├── schemas.py
├── controllers.py
├── services.py
├── api/
├── init_data.py
└── migrations/
```

通过 `pyproject.toml` 暴露模块入口：

```toml
[project.entry-points."fastsoy.business"]
crm = "fastsoy_crm:module"
```

前端业务包：

```text
@company/fastsoy-crm-web
```

项目启用模块：

```bash
uv add fastsoy-crm
cd web && pnpm add @company/fastsoy-crm-web
uv run fastsoy module enable crm
```

优点：

- 业务模块可跨项目复用。
- 模块可以独立版本化。
- 多团队协作边界更清晰。

缺点：

- 版本矩阵更复杂。
- 需要模块 manifest、兼容性声明、发布规范。
- 业务模块之间的依赖关系需要严格治理。

适合公司内部沉淀通用业务模块。

## 方案四：声明式开发与可重建生成物

把 CLI 生成器提升为核心能力：业务只维护模型和少量声明，生成物进入 `.generated` 或模块生成目录，默认不手改。

输入：

```text
app/business/crm/models.py
app/business/crm/module.yml
```

输出：

```text
app/business/crm/.generated/
web/modules/crm/.generated/
```

自定义逻辑放在稳定扩展点：

```text
app/business/crm/hooks.py
app/business/crm/services.py
web/modules/crm/overrides/
```

示例扩展点：

- `before_create`
- `after_create`
- `before_update`
- `after_delete`
- `custom_routes`
- `custom_columns`
- `custom_form_items`

升级后可以重新生成：

```bash
uv run fastsoy regenerate
```

优点：

- CRUD 密集项目升级体验最好。
- 生成器升级后可以重建大量样板代码。
- diff 很少。

缺点：

- 对复杂业务要求更高的扩展点设计。
- 如果扩展点不足，开发者会倾向于修改生成物，重新产生升级冲突。

## 方案五：微前端 + 后端模块服务

内核只做平台：

- 认证。
- RBAC。
- 菜单。
- 系统管理。
- 业务模块注册中心。

业务独立部署：

- 后端是独立 FastAPI 服务。
- 前端是远程模块。
- 菜单和权限通过注册接口接入平台。

优点：

- 隔离最彻底。
- 大团队可以独立发布业务。
- 内核升级几乎不影响业务服务。

缺点：

- 部署、鉴权、日志、事务、联调都更复杂。
- 不适合 FastSoyAdmin 的默认轻量开发体验。

适合大型组织，不建议作为默认路线。

## 推荐路线

推荐采用渐进式路线：

### 第一阶段：边界治理

- 明确内核目录和业务目录。
- 增加 `fastsoy doctor`。
- 禁止业务直接 import 内核私有模块。
- 把 `app.utils` 视为公开兼容层。
- 前端新增业务模块 manifest 雏形。

目标：先让项目知道“哪些代码可以升级覆盖，哪些代码不能碰”。

### 第二阶段：前端模块化

- 把业务 views、service、typings、i18n 收敛到 `web/modules/<module>`。
- 通过 Vite 插件或 `import.meta.glob` 自动收集。
- CLI 生成器改为写入业务模块目录。
- 不再手动追加 `web/src/service/api/index.ts`。

目标：前端业务不再散落进内核源码。

### 第三阶段：后端内核包

- 把 `app/core`、`app/system`、`app/cli` 抽为 `fastsoy_admin`。
- 提供 `fastsoy_admin.sdk`。
- 保留 `app.utils` 兼容入口。
- 业务模块发现从固定 `app/business/*` 扩展为项目目录 + entry points。

目标：后端升级变成 `uv lock --upgrade-package fast-soy-admin`。

### 第四阶段：一键升级命令

提供：

```bash
just upgrade-fastsoy
```

能力：

- 升级依赖。
- 生成升级计划。
- 执行兼容性扫描。
- 生成数据库迁移预览。
- 跑格式化、类型检查和测试。
- 输出需要人工处理的事项。

目标：完成“可控的一键升级”。

### 第五阶段：业务模块包化

对可复用业务模块，支持发布为独立包。

目标：FastSoyAdmin 成为可复用后台内核，业务模块成为可复用插件资产。

## 与 Django 的区别

内核化之后，FastSoyAdmin 会在“模块组织方式”上有一点像 Django app，但定位不同。

| 对比项 | Django | FastSoyAdmin 内核化后 |
|---|---|---|
| 基本定位 | 通用 Web 框架 | 全栈后台管理内核 |
| 默认前端 | 服务端模板 / Django Admin | Vue3 SPA |
| API 风格 | 可做 API，但常配合 DRF | API-first，基于 FastAPI |
| 业务模块 | Python app 为主 | 前后端一体业务模块 |
| ORM | Django ORM | Tortoise ORM |
| Schema | Form/Serializer 体系 | Pydantic Schema |
| Admin | Django Admin | Soybean Admin 风格现代管理端 |
| 权限 | Django permissions/group/user | 菜单/API/按钮三层 RBAC + data_scope |
| 路由菜单 | 后端 URL 与 Admin 配置 | 后端菜单路由下发，前端动态渲染 |
| 生成器 | 不是核心定位 | CRUD 生成是一等能力 |
| 升级目标 | 升级框架 | 升级后端内核 + 前端内核 + 生成器 + 管理端 |

一句话：

> FastSoyAdmin 可以学习 Django 的“可复用模块”思想，但不应该成为 Django。它应该是 FastAPI + Vue3 生态里的后台管理开发内核。

真正的差异在于：

- Django 解决的是通用 Web 应用组织问题。
- FastSoyAdmin 解决的是现代后台管理系统的全栈开发、权限、菜单、CRUD、动态路由、代码生成和升级问题。

## 兼容性契约

要实现一键升级，必须定义清楚哪些是公开 API，哪些是内部实现。

公开 API：

- `fastsoy_admin.sdk`
- `app.utils` 兼容层
- 业务模块 manifest
- `init_data` 声明格式
- 菜单、按钮、角色、API 权限声明格式
- CLI 命令参数
- 前端业务模块 manifest
- 前端 `admin-kit` 导出的 hooks、request、组件、类型

内部实现：

- `fastsoy_admin.core.*`
- `fastsoy_admin.system.*` 内部 controller/service 细节
- 前端 router/store/layout 内部文件路径
- 生成器内部模板实现

规则：

- 业务代码只能依赖公开 API。
- 内核可以重构内部实现。
- 内核升级必须尽量保持公开 API 兼容。
- breaking change 必须进入升级计划，并由 `fastsoy doctor` 给出定位。

## 数据库升级原则

一键升级不能等于自动改库。

建议原则：

- 内核迁移和业务迁移分开。
- 升级命令默认只生成迁移计划。
- 迁移 SQL 需要可预览。
- 破坏性迁移必须人工确认。
- 业务表默认不由内核迁移直接修改。
- 系统表结构变更必须提供兼容脚本。

推荐命令：

```bash
uv run fastsoy upgrade --plan
uv run fastsoy upgrade --apply-core-migrations
just mm
```

## 成功标准

当满足以下条件时，可以认为 FastSoyAdmin 具备“一键升级内核”的基础能力：

- 一个业务项目升级内核版本时，不需要 git merge 官方模板代码。
- 业务模块不修改 `core/system/router/store/layout` 等内核源码。
- 升级命令可以列出所有不兼容项。
- 前端业务页面由模块 manifest 自动接入。
- 后端业务模块由项目目录或 entry point 自动发现。
- 内核发布新版本后，业务项目主要通过 `uv` 和 `pnpm` 升级依赖。
- 生成器升级后，CRUD 生成物可以重建或稳定兼容。

## 结论

最现实的路线不是一步到位改成插件平台，而是：

1. 先做边界治理。
2. 再做前端业务模块化。
3. 然后抽后端和前端内核包。
4. 最后提供一键升级和业务插件发布能力。

这样既保留当前项目的开发效率，也能逐步把 FastSoyAdmin 做成真正可升级、可复用、可沉淀的后台开发内核。
