# Domain Specifications

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

This document defines the domain model using Domain-Driven Design (DDD) principles. It describes entities, value objects, aggregates, bounded contexts, and domain events for the Barbershop/Beauty Chain Management System.

## Bounded Contexts

### 1. Inventory Management Context

**Purpose:** Manages products, inventory, and warehouse operations across multiple locations.

**Key Concepts:**
- Products (for sale vs. dye products)
- Central warehouse
- Branch inventory
- Import/Export operations
- Approval workflows

### 2. Sales & Billing Context

**Purpose:** Handles bill creation, payments, and customer transactions.

**Key Concepts:**
- Bills/Invoices
- Payments
- Customers
- Services
- Offline bill management

### 3. Promotion & Loyalty Context

**Purpose:** Manages promotions, vouchers, and customer loyalty programs.

**Key Concepts:**
- Promotions (10 types)
- Vouchers
- Points/Loyalty
- Membership tiers

### 4. Multi-Location Management Context

**Purpose:** Manages branches, locations, and organizational structure.

**Key Concepts:**
- Branches
- Central warehouse
- Branch-specific configurations
- Multi-tenant isolation

### 5. User & Access Control Context

**Purpose:** Manages users, roles, permissions, and authentication.

**Key Concepts:**
- Users
- Roles (Admin, Cashier, Warehouse Manager, custom roles)
- Permissions (granular, 50+ permissions)
- Authentication
- Permission-based access control
- Branch-scoped permissions

## Core Entities

### Product Entity

```typescript
Product {
  id: UUID
  tenantId: UUID
  name: string
  type: 'PRODUCT' | 'DYE'
  customerPrice: Money
  staffPrice: Money
  images: string[]
  commissionSplit: CommissionSplit
  isActive: boolean
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Business Rules:**
- Products must belong to a tenant
- Product type determines inventory tracking (separate for products vs. dye)
- Commission split must be defined for products sold to staff

### Branch Entity

```typescript
Branch {
  id: UUID
  tenantId: UUID
  code: string
  name: string
  hotline: string
  address: Address
  googleMapsUrl: string
  parkingInfo: string
  isActive: boolean
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Business Rules:**
- Branch code must be unique within tenant
- Branch must have address and contact information
- Branch can have branch-specific pricing for services

### Inventory Entity

```typescript
Inventory {
  id: UUID
  tenantId: UUID
  productId: UUID
  locationType: 'CENTRAL_WAREHOUSE' | 'BRANCH'
  locationId: UUID // branchId or 'CENTRAL'
  quantity: number
  reservedQuantity: number
  availableQuantity: number // calculated: quantity - reservedQuantity
  lastUpdated: DateTime
}
```

**Business Rules:**
- Inventory must track quantity, reserved, and available separately
- Available quantity cannot be negative
- Inventory updates must be atomic

### Bill Entity

```typescript
Bill {
  id: UUID
  tenantId: UUID
  branchId: UUID
  billNumber: string
  customerId: UUID | null
  items: BillItem[]
  subtotal: Money
  discount: Money
  total: Money
  paymentStatus: 'PENDING' | 'PARTIAL' | 'PAID'
  payments: Payment[]
  status: 'DRAFT' | 'CONFIRMED' | 'CANCELLED'
  isOffline: boolean
  syncedAt: DateTime | null
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Business Rules:**
- Bills can be created offline and synced later
- Bill number must be unique within tenant
- Total = subtotal - discount
- Payment status updates based on payments

### Promotion Entity

```typescript
Promotion {
  id: UUID
  tenantId: UUID
  type: PromotionType // 10 types
  name: string
  description: string
  rules: PromotionRules
  startDate: DateTime
  endDate: DateTime
  isActive: boolean
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Promotion Types:**
1. Invoice discount
2. Invoice gift
3. Invoice product discount
4. Invoice voucher gift
5. Purchase discount
6. Purchase gift
7. Purchase voucher gift
8. Discount by invoice amount
9. Gift by invoice amount
10. Product discount by invoice amount

### User Entity

```typescript
User {
  id: UUID
  tenantId: UUID
  email: string
  name: string
  password: string (hashed)
  role: UserRole | UUID  // System role or custom role ID
  branchIds: UUID[]  // Branches user is assigned to
  isActive: boolean
  lastLoginAt: DateTime | null
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Business Rules:**
- Users must belong to a tenant
- Email must be unique within tenant
- Users can be assigned to multiple branches
- Inactive users cannot log in
- Role determines base permissions

### Role Entity

```typescript
Role {
  id: UUID
  tenantId: UUID
  name: string
  description: string | null
  permissions: Permission[]  // Array of permission IDs
  isSystem: boolean  // System roles cannot be deleted
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Business Rules:**
- Roles must belong to a tenant
- Role name must be unique within tenant
- System roles (ADMIN, CASHIER, WAREHOUSE_MANAGER) cannot be deleted
- Roles must have at least one permission
- Permission changes affect all users with that role

### Permission Value Object

```typescript
Permission {
  id: string  // e.g., 'bills.create', 'inventory.view.own'
  name: string  // e.g., 'Create Bills', 'View Own Branch Inventory'
  category: PermissionCategory  // BILLS, CUSTOMERS, INVENTORY, etc.
  description: string
  scope: 'GLOBAL' | 'BRANCH'  // Global or branch-scoped permission
}
```

**Permission Categories:**
- BILLS (create, update, view, delete, print, approve)
- PAYMENTS (process, view, refund, approve)
- CUSTOMERS (create, view, update, delete, search)
- INVENTORY (view, view.own, manage, approve, adjust, view.history, delete)
- PRODUCTS (view, create, update, delete, view.details)
- SERVICES (view, create, update, delete, track)
- PROMOTIONS (view, create, update, delete, apply)
- REPORTS (view, view.own, view.all, view.sales, view.inventory, view.staff, export)
- BRANCHES (view, view.own, manage, manage.own, view.inventory)
- USERS (create, view, update, delete, view.own)
- SETTINGS (view, manage, manage.own)
- REQUESTS (create, view, view.own, approve, cancel)

**Business Rules:**
- Permissions are predefined constants (not user-created)
- Branch-scoped permissions (e.g., `bills.view.own`) limit access to user's assigned branches
- Global permissions (e.g., `bills.view.all`) allow access across all branches
- Permission checks are enforced at API and UI level

## Value Objects

### Money Value Object

```typescript
Money {
  amount: number
  currency: 'VND'
  
  // Methods
  add(other: Money): Money
  subtract(other: Money): Money
  multiply(factor: number): Money
  compare(other: Money): number
}
```

**Business Rules:**
- All monetary values use VND currency
- Money operations must maintain currency consistency

### Address Value Object

```typescript
Address {
  street: string
  ward: string
  district: string
  city: string
  country: string
  postalCode: string | null
  googleMapsUrl: string | null
}
```

### CommissionSplit Value Object

```typescript
CommissionSplit {
  type: 'RATIO' | 'SALARY_LEVEL'
  ratio?: number // if type is RATIO
  salaryLevel?: string // if type is SALARY_LEVEL
  splits: CommissionSplitDetail[]
}
```

### BranchScope Value Object

```typescript
BranchScope {
  branchIds: UUID[]  // Specific branches user can access
  scopeType: 'OWN' | 'ALL'  // Own branches only or all branches
}
```

**Business Rules:**
- Used for branch-scoped permissions
- `OWN` scope limits to user's assigned branches
- `ALL` scope allows access to all branches (requires global permission)

## Aggregates

### Inventory Aggregate

**Root Entity:** Inventory

**Entities:**
- Inventory (root)
- InventoryTransaction (child)

**Business Rules:**
- Inventory updates must go through transactions
- Transactions are immutable (append-only)
- Inventory quantity is calculated from transactions

**Invariants:**
- Available quantity >= 0
- Quantity = sum of all transaction quantities

### Bill Aggregate

**Root Entity:** Bill

**Entities:**
- Bill (root)
- BillItem (child)
- Payment (child)

**Business Rules:**
- Bill items cannot be modified after confirmation
- Payments must not exceed bill total
- Bill status transitions: DRAFT → CONFIRMED → (CANCELLED)

**Invariants:**
- Total = sum(item.total) - discount
- Payment sum <= total

### ImportExport Aggregate

**Root Entity:** ImportExportRequest

**Entities:**
- ImportExportRequest (root)
- Approval (child)
- Items (child)

**Business Rules:**
- Import/Export requires approval workflow
- Items cannot be modified after approval
- Branch confirmation required for exports

**Invariants:**
- Approval status: PENDING → APPROVED → CONFIRMED (for exports)
- Items quantity > 0

### Role-Permission Aggregate

**Root Entity:** Role

**Entities:**
- Role (root)
- Permission (value objects, referenced by ID)

**Business Rules:**
- Permissions are immutable value objects
- Role permissions are stored as array of permission IDs
- Permission changes to role affect all users with that role
- System roles have default permissions that can be customized per tenant

**Invariants:**
- Role must have at least one permission
- System roles cannot be deleted
- Permission IDs must be valid (from predefined permission list)

### User-Permission Aggregate (Derived)

**Root Entity:** User

**Derived From:**
- User.role → Role.permissions
- User.branchIds → BranchScope

**Business Rules:**
- User permissions are derived from their role
- Branch scope is determined from user's assigned branches
- Permission checks combine role permissions with branch scope
- Permission changes take effect immediately (no caching required for security)

**Invariants:**
- User must have a valid role
- User must be assigned to at least one branch (unless admin)
- Permission checks must validate both permission and branch scope

## Domain Events

### Inventory Events

**InventoryUpdated**
```typescript
{
  eventType: 'InventoryUpdated'
  inventoryId: UUID
  productId: UUID
  locationId: UUID
  previousQuantity: number
  newQuantity: number
  transactionId: UUID
  timestamp: DateTime
}
```

**LowStockAlert**
```typescript
{
  eventType: 'LowStockAlert'
  inventoryId: UUID
  productId: UUID
  locationId: UUID
  currentQuantity: number
  threshold: number
  timestamp: DateTime
}
```

### Bill Events

**BillCreated**
```typescript
{
  eventType: 'BillCreated'
  billId: UUID
  branchId: UUID
  customerId: UUID | null
  total: Money
  isOffline: boolean
  timestamp: DateTime
}
```

**BillPaid**
```typescript
{
  eventType: 'BillPaid'
  billId: UUID
  branchId: UUID
  customerId: UUID | null
  total: Money
  pointsEarned: number
  timestamp: DateTime
}
```

**BillSynced**
```typescript
{
  eventType: 'BillSynced'
  billId: UUID
  branchId: UUID
  wasOffline: boolean
  timestamp: DateTime
}
```

### Approval Events

**ApprovalRequested**
```typescript
{
  eventType: 'ApprovalRequested'
  requestId: UUID
  requestType: 'IMPORT' | 'EXPORT' | 'ADJUSTMENT'
  requestedBy: UUID
  timestamp: DateTime
}
```

**ApprovalApproved**
```typescript
{
  eventType: 'ApprovalApproved'
  requestId: UUID
  approvedBy: UUID
  timestamp: DateTime
}
```

### Permission Events

**PermissionDenied**
```typescript
{
  eventType: 'PermissionDenied'
  userId: UUID
  permission: string
  resource: string
  action: string
  timestamp: DateTime
}
```

**RolePermissionsUpdated**
```typescript
{
  eventType: 'RolePermissionsUpdated'
  roleId: UUID
  tenantId: UUID
  previousPermissions: string[]
  newPermissions: string[]
  updatedBy: UUID
  timestamp: DateTime
}
```

**UserRoleChanged**
```typescript
{
  eventType: 'UserRoleChanged'
  userId: UUID
  tenantId: UUID
  previousRoleId: UUID
  newRoleId: UUID
  changedBy: UUID
  timestamp: DateTime
}
```

## Domain Services

### InventoryService

**Responsibilities:**
- Calculate available inventory
- Reserve inventory for pending operations
- Release reserved inventory
- Check stock availability

**Methods:**
- `reserveInventory(productId, locationId, quantity): Promise<void>`
- `releaseInventory(productId, locationId, quantity): Promise<void>`
- `getAvailableQuantity(productId, locationId): Promise<number>`
- `checkLowStock(productId, locationId, threshold): Promise<boolean>`

### PromotionService

**Responsibilities:**
- Apply promotions to bills
- Calculate discounts
- Validate promotion rules
- Track promotion usage

**Methods:**
- `applyPromotions(bill, availablePromotions): Promise<Bill>`
- `calculateDiscount(bill, promotion): Money`
- `validatePromotionRules(bill, promotion): boolean`
- `trackPromotionUsage(promotionId, billId): Promise<void>`

### CommissionCalculationService

**Responsibilities:**
- Calculate commission splits
- Apply commission rules (ratio or salary level)
- Distribute commissions to employees

**Methods:**
- `calculateCommission(service, employee, splitType): Money`
- `distributeCommissions(bill, employees): Promise<Commission[]>`

### OfflineSyncService

**Responsibilities:**
- Sync offline bills when connection restored
- Resolve conflicts
- Queue sync operations

**Methods:**
- `syncOfflineBills(branchId): Promise<SyncResult>`
- `resolveConflict(localBill, serverBill): Bill`
- `queueSyncOperation(operation): Promise<void>`

### PermissionService

**Responsibilities:**
- Check user permissions
- Resolve user permissions from role
- Validate branch scope for permissions
- Cache permission checks for performance

**Methods:**
- `getUserPermissions(userId): Promise<Permission[]>`
- `hasPermission(userId, permission, resource?): Promise<boolean>`
- `checkPermission(userId, permission, branchId?): Promise<boolean>`
- `validateBranchScope(userId, branchId, permission): Promise<boolean>`

**Business Rules:**
- Permission checks must be fast (< 10ms)
- Permissions are cached in memory (invalidated on role changes)
- Branch scope validation is required for branch-scoped permissions
- Permission denials are logged for audit

### RoleService

**Responsibilities:**
- Manage roles and permissions
- Assign permissions to roles
- Validate permission sets
- Update default role permissions

**Methods:**
- `createRole(name, permissions): Promise<Role>`
- `updateRolePermissions(roleId, permissions): Promise<Role>`
- `getRolePermissions(roleId): Promise<Permission[]>`
- `validatePermissions(permissions): boolean`
- `updateDefaultRolePermissions(roleName, permissions): Promise<void>`

**Business Rules:**
- System roles can have default permissions customized per tenant
- Custom roles can be created with any valid permission combination
- Permission changes to role affect all users with that role immediately
- All permission changes are logged for audit

## Business Rules

### Inventory Rules

1. **Stock Availability:** Available quantity = quantity - reserved quantity
2. **Negative Stock Prevention:** Cannot reduce inventory below 0
3. **Reservation Expiry:** Reserved inventory expires after 24 hours if not confirmed
4. **Import Approval:** All imports to central warehouse require approval
5. **Export Approval:** All exports from central warehouse require approval + branch confirmation

### Bill Rules

1. **Offline Bills:** Bills can be created offline and must sync when online
2. **Bill Numbering:** Bill numbers are sequential per branch per day
3. **Payment Validation:** Payments cannot exceed bill total
4. **Points Calculation:** Points earned = bill total / points conversion rate
5. **Promotion Application:** Only one promotion per bill (or multiple if rules allow)

### Promotion Rules

1. **Promotion Validity:** Promotions must be active and within date range
2. **Promotion Types:** 10 distinct promotion types with different rules
3. **Voucher Usage:** Vouchers have usage limits and expiration dates
4. **Promotion Stacking:** Rules determine if promotions can be combined

### Multi-Tenancy Rules

1. **Tenant Isolation:** All data must be filtered by tenant_id
2. **Tenant Context:** Tenant is determined from subdomain or JWT token
3. **Cross-Tenant Prevention:** No data can be accessed across tenants

### Permission Rules

1. **Permission Validation:** All API endpoints must check permissions (not just roles)
2. **Branch Scope:** Branch-scoped permissions limit access to user's assigned branches
3. **Permission Inheritance:** User permissions are derived from their role
4. **Permission Changes:** Permission changes to role affect all users immediately
5. **Audit Trail:** All permission checks (denials) and changes are logged
6. **Performance:** Permission checks must be cached and fast (< 10ms)
7. **Security:** Backend always validates permissions (never trust frontend)

## Data Flow

### Inventory Import Flow

```
1. Warehouse Manager creates Import Request
2. System creates ImportExportRequest (status: PENDING)
3. System emits ApprovalRequested event
4. Admin reviews and approves
5. System updates status to APPROVED
6. System updates Central Warehouse inventory
7. System emits InventoryUpdated event
8. System emits ApprovalApproved event
```

### Bill Creation Flow (Offline)

```
1. Cashier creates bill offline
2. System saves bill locally (IndexedDB/SQLite)
3. System marks bill as isOffline: true
4. When connection restored:
   a. System syncs bill to server
   b. System applies promotions
   c. System updates customer points
   d. System emits BillSynced event
```

### Promotion Application Flow

```
1. Cashier creates bill with items
2. System retrieves active promotions
3. PromotionService applies eligible promotions
4. System calculates discounts
5. System updates bill total
6. System tracks promotion usage
7. System emits PromotionApplied event
```

## Related Documents

- **[Market Research](../../../1-ideas/1.1-market-research/summaries.md)** - Source of domain requirements
- **[Product Requirements](../../../2-product-foundation/requirements/)** - PRDs that inform domain specs
- **[API Contracts](api-contracts/)** - API definitions for domain services
- **[System Design](../design-standards/system-design.md)** - System architecture
- **[Implementation Plan](../../3.2-implementation/plans/plan.md)** - Implementation details and sprint plans

---

*This document should be updated as domain model evolves based on product requirements and business needs.*
