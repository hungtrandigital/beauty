# API Contracts

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

This directory contains API contract definitions for the Barbershop/Beauty Chain Management System. All API contracts are defined using OpenAPI 3.0 specification.

## API Contract Structure

### Versioning Strategy
- **URL Versioning:** `/api/v1/`, `/api/v2/`
- **Breaking Changes:** New version required
- **Non-Breaking Changes:** Same version, backward compatible

### Contract Files
- `openapi.yaml` - Main OpenAPI specification
- `schemas/` - Reusable schema definitions
- `endpoints/` - Endpoint-specific contracts

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/logout` - User logout

### Bills
- `GET /api/v1/bills` - List bills
- `POST /api/v1/bills` - Create bill
- `GET /api/v1/bills/:id` - Get bill
- `PUT /api/v1/bills/:id` - Update bill
- `POST /api/v1/bills/:id/pay` - Process payment

### Inventory
- `GET /api/v1/inventory` - List inventory
- `POST /api/v1/inventory/import` - Import products
- `POST /api/v1/inventory/export` - Export products
- `GET /api/v1/inventory/:productId` - Get product inventory

### Products
- `GET /api/v1/products` - List products
- `POST /api/v1/products` - Create product
- `GET /api/v1/products/:id` - Get product
- `PUT /api/v1/products/:id` - Update product

### Promotions
- `GET /api/v1/promotions` - List promotions
- `POST /api/v1/promotions` - Create promotion
- `POST /api/v1/promotions/apply` - Apply promotion to bill

### Sync
- `POST /api/v1/sync/bills` - Sync offline bills
- `GET /api/v1/sync/status` - Get sync status

### Permissions (New)
- `GET /api/v1/admin/permissions` - List all available permissions
- `GET /api/v1/users/me/permissions` - Get current user permissions
- `GET /api/v1/admin/roles/:id/permissions` - Get role permissions
- `PUT /api/v1/admin/roles/:id/permissions` - Update role permissions

**Note:** Permission endpoints require appropriate permissions. See [Role Permissions Revision PRD](../../../../2-product-foundation/requirements/role-permissions-revision/) for details.

## Related Documents

- **[Domain Specs](../domain-specs.md)** - Domain model
- **[System Design](../../design-standards/system-design.md)** - System architecture
- **[Infrastructure](../../infrastructure.md)** - Infrastructure details

---

*API contracts are defined in OpenAPI 3.0 format. See individual contract files for detailed specifications.*

