# Docker Quick Start Guide

**Project Name:** Beauty  
**All Docker services use the "beauty" prefix**

## 🚀 Quick Start

### Prerequisites
- Docker Desktop or Docker Engine 20.10+
- Docker Compose 2.0+

### Option 1: Full Stack (All Services in Docker)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Services:**
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000/api/v1
- Swagger Docs: http://localhost:3000/api/docs
- PostgreSQL: localhost:5432
- Redis: localhost:6379
- CouchDB: http://localhost:5984

### Option 2: Services Only (Run Backend/Frontend Locally)

```bash
# Start only database services
docker-compose -f docker-compose.dev.yml up -d

# Run backend locally
cd backend
npm install
npm run start:dev

# Run frontend locally (in another terminal)
cd frontend
npm install
npm run dev
```

## 📋 Container Names

All containers use the "beauty" prefix:
- `beauty-postgres` - PostgreSQL database
- `beauty-redis` - Redis cache
- `beauty-couchdb` - CouchDB for offline sync
- `beauty-backend` - NestJS backend API
- `beauty-frontend` - Next.js frontend

## 🔧 Environment Variables

Copy the example file:
```bash
cp env.example .env
```

Key variables:
- Database: `beauty_user` / `beauty_password` / `beauty_db`
- Redis: No password (dev only)
- CouchDB: `beauty_admin` / `beauty_admin_password`

## 🗄️ Database Access

```bash
# PostgreSQL
docker-compose exec postgres psql -U beauty_user -d beauty_db

# Redis
docker-compose exec redis redis-cli

# CouchDB
curl http://beauty_admin:beauty_admin_password@localhost:5984/_up
```

## 🔄 Running Migrations

```bash
# Option 1: From local backend
cd backend
npm run migration:run

# Option 2: Inside Docker container
docker-compose exec backend npm run migration:run
```

## 🧹 Clean Up

```bash
# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes (⚠️ deletes data)
docker-compose down -v
```

## 📚 More Information

See [README-DOCKER.md](./README-DOCKER.md) for detailed documentation.

