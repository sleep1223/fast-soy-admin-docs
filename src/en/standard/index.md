# Code Standards

FastSoyAdmin follows strict code standards for both frontend and backend to ensure consistency and maintainability.

## Frontend Standards

- Based on [SoybeanJS ESLint Config](https://github.com/soybeanjs/eslint-config)
- ESLint + oxlint for linting
- simple-git-hooks for pre-commit checks
- Conventional Commits for commit messages
- vue-tsc for TypeScript type checking

## Backend Standards

- [Ruff](https://docs.astral.sh/ruff/) for linting and formatting
- [Pyright](https://microsoft.github.io/pyright/) for type checking
- Line length: 200 characters
- Double quotes for strings
- Rules: E (pycodestyle), F (pyflakes), I (isort)

## Gate Checks

Always run these checks before submitting code:

### Backend

```bash
ruff check app/        # Lint
ruff format app/       # Format
pyright app            # Type check
pytest tests/ -v       # Tests
```

### Frontend

```bash
cd web
pnpm lint              # ESLint + oxlint
pnpm typecheck         # vue-tsc type check
```
