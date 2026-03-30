# Naming Conventions

## Frontend

| Type | Convention | Example |
|------|-----------|---------|
| Files & directories | kebab-case | `demo-page/`, `user-list.vue` |
| Vue components | PascalCase | `AppProvider`, `UserList` |
| Icon components | kebab-case | `icon-mdi-emoticon` |
| Functions | camelCase | `getUser()`, `handleSubmit()` |
| Constants | UPPER_SNAKE_CASE | `MAX_COUNT`, `API_BASE_URL` |
| CSS classes | kebab-case | `.container-item`, `.user-card` |
| Request functions | fetchXxx prefix | `fetchUserList()`, `fetchLogin()` |
| Hook functions | useXxx prefix | `useTable()`, `useRouterPush()` |
| Type definitions | PascalCase | `UserInfo`, `RouteConfig` |
| Enum values | PascalCase | `GenderType.Male` |

## Backend

| Type | Convention | Example |
|------|-----------|---------|
| Files & directories | snake_case | `user.py`, `system_manage/` |
| Classes | PascalCase | `UserController`, `RoleSchema` |
| Functions & methods | snake_case | `get_user()`, `create_role()` |
| Variables | snake_case | `user_name`, `role_code` |
| Constants | UPPER_SNAKE_CASE | `SECRET_KEY`, `R_SUPER` |
| API paths | kebab-case | `/system-manage/users` |
| Model fields | snake_case | `user_name`, `status_type` |
| Schema aliases | camelCase | `userName`, `statusType` |

## Route Naming

| Type | Convention | Example |
|------|-----------|---------|
| Route key | snake_case with underscores | `manage_user`, `manage_role` |
| Route path | kebab-case | `/manage/user`, `/manage/role` |
| i18n key | dot-separated | `route.manage_user` |
