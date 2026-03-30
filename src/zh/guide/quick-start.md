# 快速开始

## 环境准备

| 工具 | 版本 |
|------|------|
| Git | - |
| Python | >= 3.12 |
| Node.js | >= 20.0.0 |
| uv | 最新 |
| pnpm | >= 10.5 |

## 获取代码

```bash
git clone https://github.com/sleep1223/fast-soy-admin.git
cd fast-soy-admin
```

## 方式一：Docker 部署（推荐）

```bash
docker compose up -d
```

访问 `http://localhost:1880`，服务包括：
- **Nginx** (:1880) — 前端 + API 代理
- **FastAPI** (:9999) — 后端 API
- **Redis** (:6379) — 缓存

更新代码后重新部署：

```bash
docker compose down && docker compose up -d
```

## 方式二：本地开发

### 后端

```bash
# 安装依赖
uv sync

# 启动后端（端口 9999）
uv run python run.py
```

### 前端

```bash
# 安装依赖
cd web && pnpm install

# 启动开发服务器（端口 9527）
pnpm dev
```

## 项目结构

```
fast-soy-admin/
├── app/                       # 后端 (FastAPI)
│   ├── __init__.py            # App 工厂，中间件注册，启动钩子
│   ├── api/v1/                # API 路由
│   │   ├── auth/              # 认证（登录、刷新令牌）
│   │   ├── route/             # 动态路由管理
│   │   └── system_manage/     # 系统管理（用户、角色、菜单）
│   ├── controllers/           # 业务逻辑层
│   ├── models/system/         # Tortoise ORM 模型
│   ├── schemas/               # Pydantic 请求/响应模型
│   ├── core/                  # 核心模块
│   ├── settings/config.py     # 环境配置
│   └── utils/                 # 工具函数
├── web/                       # 前端 (Vue3)
│   ├── src/
│   │   ├── views/             # 页面组件
│   │   ├── service-alova/     # HTTP 客户端 + API 接口
│   │   ├── store/modules/     # Pinia 状态管理
│   │   ├── router/            # Elegant Router + 路由守卫
│   │   ├── layouts/           # 布局组件
│   │   ├── components/        # 可复用组件
│   │   ├── locales/           # 国际化 (zh-CN, en-US)
│   │   └── hooks/             # Vue 组合式函数
│   └── packages/              # 内部 monorepo 包
├── deploy/                    # Docker 部署配置
├── migrations/                # 数据库迁移 (Aerich)
└── docker-compose.yml         # Docker Compose 编排
```

## 代码检查

```bash
# 后端
ruff check app/               # lint
ruff format app/               # format
pyright app                    # 类型检查
pytest tests/ -v               # 测试

# 前端
cd web
pnpm lint                     # ESLint + oxlint
pnpm typecheck                # vue-tsc 类型检查
```
