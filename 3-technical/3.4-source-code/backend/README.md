# Barbershop/Beauty Chain Management System - Backend

**Version:** 1.0.0  
**Last Updated:** 2025-12-09

## Overview

Backend API server for the Barbershop/Beauty Chain Management System (SaaS). Built with NestJS, PostgreSQL, and Redis.

## Prerequisites

- **Node.js:** 20+ (LTS recommended)
- **PostgreSQL:** 15+
- **Redis:** 7+
- **npm/pnpm/yarn:** Latest stable version

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your configuration:
   - Database connection details
   - Redis connection details
   - JWT secrets (use strong, random secrets in production)
   - AWS credentials (if using AWS services)

**⚠️ Security Warning:** Never commit `.env` file to version control. Always use `.env.example` as a template.

## Installation

```bash
# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The API will be available at `http://localhost:3000` (or the port specified in `.env`).

## API Documentation

Once the server is running, Swagger documentation is available at:
- `http://localhost:3000/api/docs` (development)
- `http://localhost:3000/api/docs` (production)

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## Code Quality

```bash
# Linting
npm run lint

# Type checking
npm run typecheck

# Format code
npm run format
```

## Project Structure

```
src/
├── auth/              # Authentication module
├── users/             # User management module
├── tenants/           # Multi-tenant management
├── common/            # Shared utilities, guards, decorators
├── config/            # Configuration files
└── main.ts           # Application entry point
```

## Database Migrations

Database migrations are managed through TypeORM. See `db/` directory for migration files.

## Security

- JWT-based authentication with refresh tokens
- Row-Level Security (RLS) for multi-tenant data isolation
- Input validation using class-validator
- Security linting with eslint-plugin-security
- Dependency scanning with npm audit

## Related Documentation

- [Coding Standards](../../3.1-system-foundation/design-standards/coding-standards.md)
- [System Design](../../3.1-system-foundation/design-standards/system-design.md)
- [Domain Specifications](../../3.1-system-foundation/architecture/domain-specs.md)
- [API Contracts](../../3.1-system-foundation/architecture/api-contracts/)

---

*For detailed architecture and design decisions, see the technical documentation in `3-technical/3.1-system-foundation/`.*

