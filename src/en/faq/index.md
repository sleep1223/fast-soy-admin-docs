# FAQ

## Frontend

### Environment file changes not taking effect

After modifying `.env`, `.env.test`, or `.env.prod`, you must restart the Vite dev server for changes to take effect.

### Route not showing in menu

Check if the route meta has `hideInMenu: true` set. Remove it to show the route in the menu.

### Static route vs dynamic route

- **Static** (`VITE_AUTH_ROUTE_MODE=static`): All routes defined in frontend, filtered by `roles` field
- **Dynamic** (`VITE_AUTH_ROUTE_MODE=dynamic`): Routes fetched from backend API, filtered by RBAC

### CORS / Cross-origin errors in development

The Vite dev server proxies requests to avoid CORS. Make sure the proxy is configured correctly in `vite.config.ts`. The backend also has `CORSMiddleware` — check `CORS_ORIGINS` in `.env`.

### 404 errors in production

Ensure Nginx is configured with `try_files $uri $uri/ /index.html` to support Vue Router's history mode.

### Multiple root elements error

`.vue` file templates must have only one root element because the project uses `<Transition>` for page animations.

### How to add a new page

1. Create a new folder + `index.vue` in `src/views/`
2. Restart dev server (routes auto-generate)
3. Configure route meta in the transform file
4. If using dynamic routes, add the route in the backend menu management

### How to add a new API endpoint

1. Create a function in `service-alova/api/`
2. Define types in `typings/api.d.ts`
3. Use in components or stores

## Backend

### Database migration errors

```bash
# Reset migrations
rm -rf migrations/
aerich init-db
```

### Redis connection refused

Ensure Redis is running:

```bash
# Check status
redis-cli ping
# Should return: PONG

# Start Redis (macOS)
brew services start redis

# Start Redis (Docker)
docker run -d -p 6379:6379 redis:latest
```

### API auto-registration not working

API endpoints are registered to the database on application startup. Restart the backend to re-register:

```bash
uv run python run.py
```

### Password reset

Currently there's no built-in password reset flow. To reset a user's password, update it directly in the database or via the API with admin credentials.

### How to switch from SQLite to PostgreSQL

1. Install the PostgreSQL driver: `uv add asyncpg`
2. Update `DB_PATH` in `.env` to a PostgreSQL connection string
3. Update the Tortoise ORM config in `app/settings/`
4. Run `aerich init-db` to initialize the new database

### How to add a new API endpoint

1. Create a new route function in `app/api/v1/`
2. Create a controller method if needed
3. Define Pydantic schemas in `app/schemas/`
4. Restart the server — the API is auto-registered for RBAC
5. Assign the API to roles in the admin panel

## Docker

### Build fails

Check that Docker and Docker Compose are installed and up to date:

```bash
docker --version
docker compose version
```

### How to access the database in Docker

```bash
# Copy the SQLite database out
docker compose cp app:/app/app_system.sqlite3 ./

# Or exec into the container
docker compose exec app bash
```

### How to view backend logs

```bash
docker compose logs -f app
```
