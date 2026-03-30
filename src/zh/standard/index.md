# 代码规范

## 前端

- 基于 SoybeanJS ESLint 配置
- ESLint + oxlint 检查
- simple-git-hooks 预提交检查
- vue-tsc 类型检查

## 后端

- Ruff 代码检查与格式化
- Pyright 类型检查
- 行宽 200，双引号

## 检查命令

```bash
# 后端
ruff check app/ && ruff format app/ && pyright app

# 前端
cd web && pnpm lint && pnpm typecheck
```
