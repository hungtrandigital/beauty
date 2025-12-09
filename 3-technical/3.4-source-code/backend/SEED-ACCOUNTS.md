# Seed Accounts for Local Development

**Last Updated:** 2025-12-09

## Overview

This document describes how to create seed accounts for local development and testing.

## Auto-Create Admin (Quick Start)

For quick local setup, use the auto-create script:

```bash
cd backend
npm run script:create-admin-auto
```

This creates:
- **Tenant:** Default Tenant
- **Admin User:**
  - Email: `admin@localhost`
  - Password: `admin123`
  - Role: ADMIN

⚠️ **Warning:** Change the default password in production!

## Interactive Admin Creation

For custom admin creation:

```bash
cd backend
npm run script:create-admin
```

This will prompt you for:
- Tenant selection
- Email
- Name
- Password

## Manual Creation via API

You can also create accounts via the API:

### 1. Create Tenant

```bash
POST http://localhost:3000/api/v1/tenants
Content-Type: application/json
Authorization: Bearer <admin-token>

{
  "name": "My Barbershop",
  "domain": "mybarbershop"
}
```

### 2. Create Admin User

```bash
POST http://localhost:3000/api/v1/users
Content-Type: application/json
Authorization: Bearer <admin-token>

{
  "email": "admin@mybarbershop.com",
  "name": "Admin User",
  "password": "secure-password",
  "role": "ADMIN",
  "tenantId": "<tenant-id>"
}
```

## Default Test Accounts

For local testing, you can create these accounts:

### Admin Account
- Email: `admin@localhost`
- Password: `admin123`
- Role: ADMIN

### Cashier Account
- Email: `cashier@localhost`
- Password: `cashier123`
- Role: CASHIER

### Warehouse Manager Account
- Email: `warehouse@localhost`
- Password: `warehouse123`
- Role: WAREHOUSE_MANAGER

## Scripts

Add these to `package.json`:

```json
{
  "scripts": {
    "script:create-admin-auto": "ts-node src/scripts/create-admin-auto.ts",
    "script:create-admin": "ts-node src/scripts/create-admin.ts"
  }
}
```

## Security Notes

- Default passwords are for **local development only**
- Never use default passwords in production
- Change all default passwords before deployment
- Use strong, unique passwords in production

---

*Seed accounts are for local development and testing only.*
