# Product Requirements: Role Permissions Revision

**Last Updated:** 2025-12-09  
**Version:** 1.0  
**Epic:** Permission System Enhancement

## Overview

This PRD defines requirements for revising and expanding the role-based permission system to provide granular access control for Staff, Cashier, and Warehouse Manager roles. This enhancement will enable more flexible role management and better security through principle of least privilege.

## Business Context

The current permission system has basic role definitions but needs refinement to:
- Provide granular permissions for different staff roles
- Support more flexible role assignments
- Enable better security through least privilege access
- Support future role expansion (e.g., Branch Head, Service Provider)
- Allow custom role creation with specific permission sets

## Current State

### Current Roles
- **ADMIN** - Full system access (system role, cannot be modified)
- **CASHIER** - Basic bill management and payments
- **WAREHOUSE_MANAGER** - Basic inventory management

### Current Permission Categories
- USERS (create, update, delete)
- BILLS (create, update)
- INVENTORY (manage, approve)
- PRODUCTS (manage)
- SERVICES (manage)
- PROMOTIONS (manage)
- CUSTOMERS (manage)
- REPORTS (view)
- SETTINGS (manage)

## Goals

1. **Define Granular Permissions** - Break down broad permissions into specific actions
2. **Revise Default Role Permissions** - Update CASHIER and WAREHOUSE_MANAGER with appropriate permissions
3. **Add New Permissions** - Add missing permissions for complete functionality
4. **Support Branch-Specific Access** - Enable branch-scoped permissions
5. **Document Permission Matrix** - Clear documentation of who can do what

## User Roles & Revised Permissions

### 1. Admin (ADMIN)
**Status:** System role, cannot be modified  
**Access:** Full system access

**Permissions:**
- All permissions in all categories
- Can manage users, roles, and permissions
- Can configure system settings
- Can view all reports across all branches
- Can approve all requests

### 2. Cashier (CASHIER)
**Status:** System role, can be customized per tenant  
**Primary Function:** Bill creation, payment processing, customer management

**Revised Permissions:**

**BILLS:**
- ✅ `bills.create` - Create new bills
- ✅ `bills.update` - Update unpaid bills
- ✅ `bills.view` - View bills (own branch)
- ✅ `bills.delete` - Delete unpaid bills (own branch)
- ✅ `bills.print` - Print bills and receipts
- ❌ `bills.approve` - Cannot approve bills (not needed)
- ❌ `bills.view.all` - Cannot view all branches' bills

**CUSTOMERS:**
- ✅ `customers.create` - Create new customers
- ✅ `customers.view` - View customer information
- ✅ `customers.update` - Update customer information
- ✅ `customers.search` - Search customers
- ❌ `customers.delete` - Cannot delete customers

**PAYMENTS:**
- ✅ `payments.process` - Process payments (cash, card, mixed)
- ✅ `payments.view` - View payment history
- ❌ `payments.refund` - Cannot process refunds (requires approval)

**PROMOTIONS:**
- ✅ `promotions.view` - View available promotions
- ✅ `promotions.apply` - Apply promotions to bills
- ❌ `promotions.manage` - Cannot create/edit promotions

**PRODUCTS & SERVICES:**
- ✅ `products.view` - View product catalog
- ✅ `services.view` - View service catalog
- ❌ `products.manage` - Cannot manage products
- ❌ `services.manage` - Cannot manage services

**REPORTS:**
- ✅ `reports.view.own` - View own branch reports (sales, revenue)
- ❌ `reports.view.all` - Cannot view all branches' reports

**INVENTORY:**
- ✅ `inventory.view` - View inventory levels (own branch)
- ❌ `inventory.manage` - Cannot manage inventory
- ❌ `inventory.approve` - Cannot approve inventory requests

**BRANCH:**
- ✅ `branch.view.own` - View own branch information
- ❌ `branch.manage` - Cannot manage branch settings

### 3. Warehouse Manager (WAREHOUSE_MANAGER)
**Status:** System role, can be customized per tenant  
**Primary Function:** Inventory management, import/export operations

**Revised Permissions:**

**INVENTORY:**
- ✅ `inventory.view` - View inventory (all locations)
- ✅ `inventory.manage` - Create import/export requests
- ✅ `inventory.view.history` - View inventory history
- ✅ `inventory.adjust` - Create inventory adjustment requests
- ❌ `inventory.approve` - Cannot approve requests (Admin only)
- ❌ `inventory.delete` - Cannot delete inventory records

**PRODUCTS:**
- ✅ `products.view` - View product catalog
- ✅ `products.view.details` - View product details (prices, images)
- ❌ `products.manage` - Cannot create/edit products
- ❌ `products.delete` - Cannot delete products

**BRANCHES:**
- ✅ `branches.view` - View all branches
- ✅ `branches.view.inventory` - View branch inventory levels
- ❌ `branches.manage` - Cannot manage branch settings

**REPORTS:**
- ✅ `reports.view.inventory` - View inventory reports
- ✅ `reports.view.imports` - View import/export reports
- ❌ `reports.view.sales` - Cannot view sales reports
- ❌ `reports.view.all` - Cannot view all reports

**REQUESTS:**
- ✅ `requests.create` - Create import/export requests
- ✅ `requests.view.own` - View own requests
- ✅ `requests.cancel` - Cancel pending requests
- ❌ `requests.approve` - Cannot approve requests

**BILLS & CUSTOMERS:**
- ❌ `bills.*` - No access to bills
- ❌ `customers.*` - No access to customers

### 4. Staff (New Role - Optional)
**Status:** Custom role (can be created)  
**Primary Function:** Service providers, general staff

**Proposed Permissions:**

**SERVICES:**
- ✅ `services.view` - View service catalog
- ✅ `services.track` - Track services performed
- ❌ `services.manage` - Cannot manage services

**CUSTOMERS:**
- ✅ `customers.view` - View customer information
- ❌ `customers.create` - Cannot create customers
- ❌ `customers.update` - Cannot update customers

**REPORTS:**
- ✅ `reports.view.own` - View own performance reports
- ❌ `reports.view.all` - Cannot view all reports

**BILLS:**
- ✅ `bills.view` - View bills (read-only, own branch)
- ❌ `bills.create` - Cannot create bills
- ❌ `bills.update` - Cannot update bills

### 5. Branch Head (New Role - Future)
**Status:** Custom role (can be created)  
**Primary Function:** Branch management and oversight

**Proposed Permissions:**

**BRANCH:**
- ✅ `branch.view.own` - View own branch information
- ✅ `branch.manage.own` - Manage own branch settings
- ❌ `branch.manage.all` - Cannot manage other branches

**REPORTS:**
- ✅ `reports.view.own` - View own branch reports
- ✅ `reports.view.staff` - View staff performance reports
- ❌ `reports.view.all` - Cannot view all branches' reports

**STAFF:**
- ✅ `staff.view.own` - View own branch staff
- ✅ `staff.performance.view` - View staff performance
- ❌ `staff.manage` - Cannot create/edit staff

**INVENTORY:**
- ✅ `inventory.view.own` - View own branch inventory
- ❌ `inventory.manage` - Cannot manage inventory

**BILLS:**
- ✅ `bills.view.own` - View own branch bills
- ✅ `bills.approve` - Approve bills (if configured)
- ❌ `bills.create` - Cannot create bills

## New Permission Categories

### Expanded Permission List

**BILLS:**
- `bills.create` - Create bills
- `bills.update` - Update bills
- `bills.view` - View bills (own branch)
- `bills.view.all` - View all bills (all branches)
- `bills.delete` - Delete bills
- `bills.print` - Print bills/receipts
- `bills.approve` - Approve bills (for approval workflows)

**PAYMENTS:**
- `payments.process` - Process payments
- `payments.view` - View payment history
- `payments.refund` - Process refunds
- `payments.approve` - Approve refunds

**CUSTOMERS:**
- `customers.create` - Create customers
- `customers.view` - View customers
- `customers.update` - Update customers
- `customers.delete` - Delete customers
- `customers.search` - Search customers

**INVENTORY:**
- `inventory.view` - View inventory
- `inventory.view.own` - View own branch inventory
- `inventory.manage` - Create import/export requests
- `inventory.approve` - Approve inventory requests
- `inventory.adjust` - Create adjustment requests
- `inventory.view.history` - View inventory history
- `inventory.delete` - Delete inventory records

**PRODUCTS:**
- `products.view` - View products
- `products.create` - Create products
- `products.update` - Update products
- `products.delete` - Delete products
- `products.view.details` - View product details

**SERVICES:**
- `services.view` - View services
- `services.create` - Create services
- `services.update` - Update services
- `services.delete` - Delete services
- `services.track` - Track services performed

**PROMOTIONS:**
- `promotions.view` - View promotions
- `promotions.create` - Create promotions
- `promotions.update` - Update promotions
- `promotions.delete` - Delete promotions
- `promotions.apply` - Apply promotions to bills

**REPORTS:**
- `reports.view` - View reports (general)
- `reports.view.own` - View own branch reports
- `reports.view.all` - View all branches' reports
- `reports.view.sales` - View sales reports
- `reports.view.inventory` - View inventory reports
- `reports.view.staff` - View staff performance reports
- `reports.export` - Export reports

**BRANCHES:**
- `branches.view` - View branches
- `branches.view.own` - View own branch
- `branches.manage` - Manage branches
- `branches.manage.own` - Manage own branch
- `branches.view.inventory` - View branch inventory

**USERS:**
- `users.create` - Create users
- `users.view` - View users
- `users.update` - Update users
- `users.delete` - Delete users
- `users.view.own` - View own profile

**SETTINGS:**
- `settings.view` - View settings
- `settings.manage` - Manage system settings
- `settings.manage.own` - Manage own branch settings

**REQUESTS:**
- `requests.create` - Create requests
- `requests.view` - View requests
- `requests.view.own` - View own requests
- `requests.approve` - Approve requests
- `requests.cancel` - Cancel requests

## Permission Matrix

| Permission | Admin | Cashier | Warehouse Manager | Staff | Branch Head |
|------------|-------|---------|------------------|-------|-------------|
| **BILLS** |
| bills.create | ✅ | ✅ | ❌ | ❌ | ❌ |
| bills.update | ✅ | ✅ | ❌ | ❌ | ❌ |
| bills.view | ✅ | ✅ (own) | ❌ | ✅ (own, read) | ✅ (own) |
| bills.delete | ✅ | ✅ (own) | ❌ | ❌ | ❌ |
| bills.print | ✅ | ✅ | ❌ | ❌ | ✅ |
| **CUSTOMERS** |
| customers.create | ✅ | ✅ | ❌ | ❌ | ❌ |
| customers.view | ✅ | ✅ | ❌ | ✅ | ✅ |
| customers.update | ✅ | ✅ | ❌ | ❌ | ❌ |
| customers.delete | ✅ | ❌ | ❌ | ❌ | ❌ |
| **INVENTORY** |
| inventory.view | ✅ | ✅ (own) | ✅ | ❌ | ✅ (own) |
| inventory.manage | ✅ | ❌ | ✅ | ❌ | ❌ |
| inventory.approve | ✅ | ❌ | ❌ | ❌ | ❌ |
| inventory.adjust | ✅ | ❌ | ✅ | ❌ | ❌ |
| **PRODUCTS** |
| products.view | ✅ | ✅ | ✅ | ✅ | ✅ |
| products.manage | ✅ | ❌ | ❌ | ❌ | ❌ |
| **SERVICES** |
| services.view | ✅ | ✅ | ✅ | ✅ | ✅ |
| services.manage | ✅ | ❌ | ❌ | ❌ | ❌ |
| services.track | ✅ | ✅ | ❌ | ✅ | ✅ |
| **PROMOTIONS** |
| promotions.view | ✅ | ✅ | ❌ | ❌ | ✅ |
| promotions.apply | ✅ | ✅ | ❌ | ❌ | ❌ |
| promotions.manage | ✅ | ❌ | ❌ | ❌ | ❌ |
| **REPORTS** |
| reports.view.own | ✅ | ✅ | ❌ | ✅ | ✅ |
| reports.view.all | ✅ | ❌ | ❌ | ❌ | ❌ |
| reports.view.inventory | ✅ | ❌ | ✅ | ❌ | ❌ |
| **BRANCHES** |
| branches.view | ✅ | ✅ (own) | ✅ | ✅ (own) | ✅ (own) |
| branches.manage | ✅ | ❌ | ❌ | ❌ | ✅ (own) |

## Implementation Requirements

### Backend Changes

1. **Permission Enum/Constants**
   - Expand permission list in `admin.controller.ts`
   - Create permission constants file
   - Add permission validation helpers

2. **Role Defaults**
   - Update default permissions for CASHIER role
   - Update default permissions for WAREHOUSE_MANAGER role
   - Create migration to update existing roles

3. **Permission Guards**
   - Create permission-based guards (not just role-based)
   - Add permission checks to controllers
   - Support branch-scoped permissions

4. **API Endpoints**
   - `GET /api/admin/permissions` - List all permissions (enhanced)
   - `GET /api/admin/roles/:id/permissions` - Get role permissions
   - `PUT /api/admin/roles/:id/permissions` - Update role permissions
   - `GET /api/users/me/permissions` - Get current user permissions

### Frontend Changes

1. **Permission Management UI**
   - Permission selection interface for role creation/editing
   - Permission matrix visualization
   - Branch-scope selection

2. **Permission-Based UI**
   - Show/hide UI elements based on permissions
   - Disable actions based on permissions
   - Permission-aware navigation

## Success Metrics

- **Permission Granularity:** 50+ specific permissions (vs. current 13)
- **Role Flexibility:** 100% of roles can be customized
- **Security:** Zero unauthorized access incidents
- **Adoption:** 90%+ of tenants customize roles within 30 days

## Out of Scope

- Multi-tenant permission inheritance
- Time-based permissions (temporary access)
- Resource-level permissions (permission per product/service)
- Permission delegation

## Related Documents

- **[Admin Dashboard Requirements](../admin-dashboard/)** - Role management UI
- **[Web Application Requirements](../web-application/)** - Permission-based UI
- **[Domain Specs](../../../3-technical/3.1-system-foundation/architecture/domain-specs.md)** - Permission domain model

---

*This PRD defines the revised permission system for better access control and security.*
