# Docker Setup for Local Development

**Last Updated:** 2025-01-XX

## Overview

This guide explains how to set up and run the Beauty Chain Management System locally using Docker and Docker Compose. All Docker services are named with the "beauty" prefix.

## Prerequisites

- **Docker:** 20.10+ (Docker Desktop or Docker Engine)
- **Docker Compose:** 2.0+ (included with Docker Desktop)
- **Node.js:** 20+ (for running backend locally, if not using Docker)

## Quick Start

### Option 1: Docker Compose (Recommended for Full Stack)

This option runs all services (PostgreSQL, Redis, CouchDB, Backend, Frontend) in Docker:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

### Option 2: Docker Compose for Services Only

This option runs only database services (PostgreSQL, Redis, CouchDB) in Docker, while you run the backend and frontend locally:

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

## Services

All services use the "beauty" prefix in their container names and network.

### PostgreSQL Database

- **Container:** `beauty-postgres`
- **Port:** 5432
- **User:** `beauty_user`
- **Password:** `beauty_password`
- **Database:** `beauty_db`
- **Connection String:** `postgresql://beauty_user:beauty_password@localhost:5432/beauty_db`

### Redis Cache

- **Container:** `beauty-redis`
- **Port:** 6379
- **No password** (development only)
- **Connection:** `redis://localhost:6379`

### CouchDB (Offline Sync)

- **Container:** `beauty-couchdb`
- **Port:** 5984
- **User:** `beauty_admin`
- **Password:** `beauty_admin_password`
- **URL:** `http://beauty_admin:beauty_admin_password@localhost:5984`

### Backend API

- **Container:** `beauty-backend`
- **Port:** 3000
- **API:** `http://localhost:3000/api/v1`
- **Swagger Docs:** `http://localhost:3000/api/docs`

### Frontend (Next.js)

- **Container:** `beauty-frontend`
- **Port:** 3001
- **URL:** `http://localhost:3001`

## Environment Variables

### Quick Setup

Copy the example environment file:

```bash
cp env.example .env
```

Then edit `.env` with your specific values.

### For Backend (when running locally)

Create `backend/.env` file or use the root `env.example`:

```env
# Database Configuration (Docker)
DATABASE_URL=postgresql://beauty_user:beauty_password@localhost:5432/beauty_db
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=beauty_user
DATABASE_PASSWORD=beauty_password
DATABASE_NAME=beauty_db

# Redis Configuration (Docker)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# CouchDB Configuration (Docker)
COUCHDB_HOST=localhost
COUCHDB_PORT=5984
COUCHDB_USER=beauty_admin
COUCHDB_PASSWORD=beauty_admin_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_REFRESH_EXPIRES_IN=7d

# Application Configuration
NODE_ENV=development
PORT=3000
API_PREFIX=/api/v1

# Security
BCRYPT_ROUNDS=10
```

### For Backend (when running in Docker)

The backend container uses environment variables from `docker-compose.yml`. You can override them by creating a `.env` file or setting them in `docker-compose.override.yml`.

### For Frontend (when running locally)

Create `frontend/.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

## Database Migrations

### Running Migrations

When using Docker, you can run migrations in two ways:

**Option 1: Run migrations from local backend**

```bash
# Start services
docker-compose -f docker-compose.dev.yml up -d

# Run migrations from local backend
cd backend
npm run migration:run
```

**Option 2: Run migrations inside Docker container**

```bash
# Start all services
docker-compose up -d

# Run migrations in backend container
docker-compose exec backend npm run migration:run
```

## Common Commands

### Start Services

```bash
# Start all services in background
docker-compose up -d

# Start and view logs
docker-compose up

# Start only database services
docker-compose -f docker-compose.dev.yml up -d
```

### Stop Services

```bash
# Stop services (keep data)
docker-compose down

# Stop and remove volumes (delete data)
docker-compose down -v
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f postgres
docker-compose logs -f redis
```

### Database Access

```bash
# Connect to PostgreSQL
docker-compose exec postgres psql -U beauty_user -d beauty_db

# Or using local psql
psql -h localhost -U beauty_user -d beauty_db
```

### Redis Access

```bash
# Connect to Redis CLI
docker-compose exec redis redis-cli

# Or using local redis-cli
redis-cli -h localhost -p 6379
```

### Rebuild Containers

```bash
# Rebuild backend container
docker-compose build backend

# Rebuild and restart
docker-compose up -d --build backend
```

## Troubleshooting

### Port Already in Use

If ports 5432, 6379, or 3000 are already in use:

1. **Stop existing services:**
   ```bash
   # Stop local PostgreSQL
   sudo service postgresql stop  # Linux
   # or
   brew services stop postgresql  # macOS
   
   # Stop local Redis
   sudo service redis-server stop  # Linux
   # or
   brew services stop redis  # macOS
   ```

2. **Or change ports in docker-compose.yml:**
   ```yaml
   ports:
     - "5433:5432"  # Use 5433 instead of 5432
   ```

### Database Connection Issues

1. **Check if PostgreSQL is running:**
   ```bash
   docker-compose ps
   ```

2. **Check PostgreSQL logs:**
   ```bash
   docker-compose logs postgres
   ```

3. **Verify connection:**
   ```bash
   docker-compose exec postgres pg_isready -U beauty_user
   ```

### Reset Database

```bash
# Stop and remove volumes
docker-compose down -v

# Start fresh
docker-compose up -d
```

### Backend Not Starting

1. **Check backend logs:**
   ```bash
   docker-compose logs backend
   ```

2. **Verify environment variables:**
   ```bash
   docker-compose exec backend env
   ```

3. **Rebuild backend:**
   ```bash
   docker-compose build --no-cache backend
   docker-compose up -d backend
   ```

## Development Workflow

### Recommended Setup

1. **Start database services:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Run backend locally** (for hot reload and debugging):
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

3. **Run migrations:**
   ```bash
   cd backend
   npm run migration:run
   ```

4. **Access services:**
   - Frontend: `http://localhost:3001`
   - Backend API: `http://localhost:3000/api/v1`
   - Swagger Docs: `http://localhost:3000/api/docs`
   - PostgreSQL: `localhost:5432`
   - Redis: `localhost:6379`
   - CouchDB: `http://localhost:5984`

## Production Considerations

⚠️ **Important:** The Docker setup in this repository is for **local development only**. For production:

- Use managed database services (AWS RDS, Google Cloud SQL)
- Use managed Redis (AWS ElastiCache, Google Cloud Memorystore)
- Use proper secrets management (AWS Secrets Manager, HashiCorp Vault)
- Use production-grade Docker images and configurations
- Implement proper security practices (no default passwords, SSL/TLS, etc.)

## Related Documents

- **[Backend README](../backend/README.md)** - Backend setup and configuration
- **[Infrastructure Design](../../3.1-system-foundation/infrastructure.md)** - Production infrastructure
- **[Server Steps](../../3.3-devops/server-steps.md)** - Production deployment

---

*This Docker setup is optimized for local development. For production deployment, see the infrastructure documentation.*

