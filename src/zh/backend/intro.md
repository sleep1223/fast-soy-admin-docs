# 后端简介

后端基于 **FastAPI** 构建，采用分层架构：Router → Controller → CRUD/Model。

## 技术栈

| 技术 | 说明 |
|------|------|
| [FastAPI](https://fastapi.tiangolo.com/) | 高性能异步 Web 框架 |
| [Pydantic v2](https://docs.pydantic.dev/) | 数据校验与序列化 |
| [Tortoise ORM](https://tortoise.github.io) | Python 异步 ORM |
| [Aerich](https://github.com/tortoise/aerich) | Tortoise 数据库迁移 |
| [Redis](https://redis.io/) | 缓存层（fastapi-cache2） |
| [Argon2](https://argon2-cffi.readthedocs.io/) | 安全密码哈希 |
| [PyJWT](https://pyjwt.readthedocs.io/) | JWT 令牌创建与验证 |
| [Ruff](https://docs.astral.sh/ruff/) | Python 代码检查与格式化 |
| [Pyright](https://microsoft.github.io/pyright/) | 静态类型检查 |

## 目录结构

```
app/
├── __init__.py            # App 工厂，中间件注册，启动钩子
├── api/v1/                # API 路由（按业务域分组）
│   ├── auth/              # 认证（登录、令牌刷新）
│   ├── route/             # 动态路由管理
│   └── system_manage/     # 用户、角色、菜单 CRUD
├── controllers/           # 业务逻辑层
├── models/system/         # Tortoise ORM 模型
├── schemas/               # Pydantic 请求/响应模型
├── core/                  # 核心模块
│   ├── init_app.py        # 数据库、异常、路由注册
│   ├── dependency.py      # AuthControl, PermissionControl
│   ├── crud.py            # 通用 CRUD 基类
│   ├── code.py            # 业务响应码
│   ├── exceptions.py      # 自定义异常处理
│   ├── middlewares.py     # 请求日志、后台任务
│   └── ctx.py             # 上下文变量
├── settings/config.py     # 环境配置 (pydantic-settings)
└── utils/                 # 工具函数（安全、通用）
```

## 快速开始

```bash
uv sync                    # 安装依赖
uv run python run.py       # 启动开发服务器 (:9999)

ruff check app/            # 代码检查
ruff format app/           # 代码格式化
pyright app                # 类型检查
pytest tests/ -v           # 运行测试
```

## 启动流程

1. 注册 Tortoise ORM（数据库连接 + 模型发现）
2. 注册 Aerich（数据库迁移）
3. 注册异常处理器
4. 挂载 API 路由（/api/v1）
5. 注册中间件
6. 启动钩子：自动注册 API 到数据库（用于 RBAC）
