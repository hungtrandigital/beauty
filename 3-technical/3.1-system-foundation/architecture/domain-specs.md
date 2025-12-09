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
- Roles (Admin, Cashier, Warehouse Manager)
- Permissions
- Authentication

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
- **[Implementation Domain Specs](../../3.2-implementation/domain-specs.md)** - Implementation-specific details

---

*This document should be updated as domain model evolves based on product requirements and business needs.*
