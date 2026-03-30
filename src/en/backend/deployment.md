# Deployment

## Docker Compose (Recommended)

The project includes a complete Docker Compose configuration for production deployment.

### Quick Deploy

```bash
git clone https://github.com/sleep1223/fast-soy-admin
cd fast-soy-admin
docker compose up -d
```

### Services

| Service | Port | Description |
|---------|------|-------------|
| nginx | 1880 | Frontend + API reverse proxy |
| app | 9999 | FastAPI backend |
| redis | 6379 | Cache layer |

### Architecture

```
Internet → Nginx (:1880)
              ├── Static files (frontend build)
              └── /api/* → FastAPI (:9999)
                              └── Redis (:6379)
```

### Update & Redeploy

```bash
git pull
docker compose down && docker compose up -d
```

### View Logs

```bash
docker compose logs -f          # All services
docker compose logs -f app      # Backend only
docker compose logs -f nginx    # Nginx only
```

## Docker Files

### Backend Dockerfile (`deploy/app.Dockerfile`)

Multi-stage build:
1. **Dependencies stage**: Install Python dependencies with uv
2. **Runtime stage**: Copy dependencies and application code

### Frontend Dockerfile (`deploy/web.Dockerfile`)

Multi-stage build:
1. **Dependencies stage**: Install Node.js dependencies with pnpm
2. **Build stage**: Build the Vue3 application
3. **Serve stage**: Copy build output to Nginx

### Nginx Configuration (`deploy/web.conf`)

```nginx
server {
    listen 80;

    # Serve frontend static files
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to backend
    location /api/ {
        proxy_pass http://app:9999;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## Manual Deployment

### Backend

```bash
# Install dependencies
uv sync --no-dev

# Start with uvicorn
uvicorn app:app --host 0.0.0.0 --port 9999 --workers 4
```

### Frontend

```bash
cd web
pnpm install
pnpm build
# Copy dist/ to your web server
```

### Nginx Configuration (Manual)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    root /path/to/web/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API proxy
    location /api/ {
        proxy_pass http://127.0.0.1:9999;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Redis Setup

Redis is required for caching. Install or use Docker:

```bash
# Docker
docker run -d --name redis -p 6379:6379 redis:latest

# Or install locally
# macOS
brew install redis && brew services start redis

# Ubuntu
sudo apt install redis-server && sudo systemctl start redis
```

Configure the Redis URL in `.env`:

```bash
REDIS_URL=redis://localhost:6379/0
```
