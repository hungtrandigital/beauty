# 3.4 Source Code

## Overview

This directory contains the source code for the project, organized by component type.

## Directory Structure

- **[frontend/](frontend/)** - Frontend application code
- **[backend/](backend/)** - Backend application code
- **[tests/](tests/)** - Test code and test utilities
- **[db/](db/)** - Database schemas, migrations, and seeds

## Docker Setup (Recommended)

The easiest way to get started is using Docker. All services are named with the "beauty" prefix.

### Quick Start

```bash
# Start all services (PostgreSQL, Redis, CouchDB, Backend, Frontend)
docker-compose up -d

# Or start only database services (run backend/frontend locally)
docker-compose -f docker-compose.dev.yml up -d
```

**📚 Documentation:**
- [Docker Quick Start Guide](./DOCKER-QUICK-START.md) - Quick reference
- [Docker Setup Guide](./README-DOCKER.md) - Detailed documentation

**🚀 Helper Scripts:**
- Linux/Mac: `./docker-start.sh`
- Windows: `docker-start.bat`

### Services

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:3000/api/v1
- **Swagger Docs:** http://localhost:3000/api/docs
- **PostgreSQL:** localhost:5432
- **Redis:** localhost:6379
- **CouchDB:** http://localhost:5984

## Build Instructions

### Prerequisites
- **Docker:** 20.10+ (recommended)
- **Node.js:** 20+ (if running locally)
- **PostgreSQL:** 15+ (if not using Docker)
- **Redis:** 7+ (if not using Docker)

### Environment Setup

1. Copy environment file:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` with your configuration

### Running Locally (Without Docker)

1. **Start database services:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Backend:**
   ```bash
   cd backend
   npm install
   npm run migration:run
   npm run start:dev
   ```

3. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Code Organization

### Frontend
- *Framework and structure*
- *Key directories*

### Backend
- *Framework and structure*
- *Key directories*

### Testing
- *Testing framework*
- *Test organization*
- *Running tests*

## Development Workflow

1. *Development workflow steps*
2. *Branching strategy*
3. *Code review process*

## Related Documents

- **[Coding Standards](../3.1-system-foundation/design-standards/coding-standards.md)** - Code standards
- **[System Design](../3.1-system-foundation/design-standards/system-design.md)** - Architecture
- **[Implementation](../3.2-implementation/README.md)** - Implementation details

---

*This directory contains the actual source code. See technical documentation for architecture and design details.*

