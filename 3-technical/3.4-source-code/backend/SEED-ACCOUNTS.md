# Database Seed Accounts

**Last Updated:** 2025-12-09

## Overview

The database has been seeded with test data for development and testing purposes.

## Admin Accounts

### Tenant 1: Vu Tri Barbershop
- **Email:** `admin@vutri.local`
- **Password:** `Admin123!`
- **Role:** ADMIN
- **Name:** System Administrator

### Tenant 2: Beauty Chain Demo
- **Email:** `admin@beauty.local`
- **Password:** `Admin123!`
- **Role:** ADMIN
- **Name:** Demo Administrator

## Cashier Accounts

### Tenant 1: Vu Tri Barbershop
- **Email:** `cashier@vutri.local`
- **Password:** `Cashier123!`
- **Role:** CASHIER
- **Name:** Nguyen Van A

### Tenant 2: Beauty Chain Demo
- **Email:** `cashier@beauty.local`
- **Password:** `Cashier123!`
- **Role:** CASHIER
- **Name:** Demo Cashier

## Warehouse Manager

### Tenant 1: Vu Tri Barbershop
- **Email:** `warehouse@vutri.local`
- **Password:** `Warehouse123!`
- **Role:** WAREHOUSE_MANAGER
- **Name:** Tran Thi B

## Seed Data Summary

- **Tenants:** 2
  - Vu Tri Barbershop (slug: `vutri-barbershop`)
  - Beauty Chain Demo (slug: `beauty-chain-demo`)

- **Users:** 5
  - 2 Admins
  - 2 Cashiers
  - 1 Warehouse Manager

- **Branches:** 3
  - VT001: Vu Tri - Quan 1
  - VT002: Vu Tri - Quan 3
  - BC001: Beauty Chain - Main Branch

- **Products:** 3
  - Pomade Premium (PRODUCT)
  - Hair Dye - Black (DYE)
  - Shampoo Professional (PRODUCT)

- **Services:** 3
  - Haircut - Male (MALE)
  - Haircut - Female (FEMALE)
  - Hair Dye Service (BOTH)

- **Customers:** 3
  - Le Van C (0901234567)
  - Pham Thi D (0901234568)
  - Hoang Van E (0901234569)

## Running the Seed Script

To re-seed the database:

```bash
cd backend
npm run seed
```

Or with custom environment variables:

```bash
DATABASE_USER=beauty_user \
DATABASE_PASSWORD=beauty_password \
DATABASE_NAME=beauty_db \
DATABASE_HOST=localhost \
JWT_SECRET=dev-secret \
JWT_REFRESH_SECRET=dev-refresh-secret \
NODE_ENV=development \
npm run seed
```

## Security Note

⚠️ **These are default development credentials. Change all passwords in production!**

