# Technical Specifications: Inventory Management

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

Technical requirements and specifications for the Inventory Management epic. This document defines APIs, database schema, integrations, and performance requirements.

## API Endpoints

### Import Requests

**POST /api/inventory/import-requests**
- Create new import request
- Request body: `{ products: [{ productId, quantity }], notes?: string }`
- Response: `{ id, status, createdAt }`

**GET /api/inventory/import-requests**
- List import requests (with filters)
- Query params: `status`, `dateFrom`, `dateTo`
- Response: `{ requests: [...], total, page }`

**GET /api/inventory/import-requests/:id**
- Get import request details
- Response: `{ id, products, status, requester, createdAt, approvedAt, approver }`

**POST /api/inventory/import-requests/:id/approve**
- Approve import request (Admin only)
- Response: `{ success, inventoryUpdated }`

**POST /api/inventory/import-requests/:id/reject**
- Reject import request (Admin only)
- Request body: `{ reason: string }`
- Response: `{ success }`

### Export Requests

**POST /api/inventory/export-requests**
- Create new export request
- Request body: `{ branchId, products: [{ productId, quantity }], notes?: string }`
- Response: `{ id, status, createdAt }`

**GET /api/inventory/export-requests**
- List export requests (with filters)
- Query params: `status`, `branchId`, `dateFrom`, `dateTo`
- Response: `{ requests: [...], total, page }`

**POST /api/inventory/export-requests/:id/approve**
- Approve export request (Admin only)
- Response: `{ success, inventoryUpdated }`

**POST /api/inventory/export-requests/:id/confirm-receipt**
- Confirm receipt at branch (Branch Manager)
- Response: `{ success, inventoryUpdated }`

### Inventory Viewing

**GET /api/inventory/central-warehouse**
- Get central warehouse inventory
- Query params: `productId?`, `lowStock?`
- Response: `{ products: [{ productId, name, quantity, lowStock }] }`

**GET /api/inventory/branches/:branchId**
- Get branch inventory
- Query params: `productId?`, `lowStock?`
- Response: `{ products: [{ productId, name, quantity, lowStock }] }`

**GET /api/inventory/all-locations**
- Get inventory across all locations
- Query params: `productId?`, `location?`
- Response: `{ centralWarehouse: [...], branches: [{ branchId, products: [...] }] }`

## Database Schema

### ImportRequest Entity

```typescript
{
  id: string;
  tenantId: string;
  requesterId: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  products: Array<{ productId: string; quantity: number }>;
  notes?: string;
  approvedAt?: Date;
  approverId?: string;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### ExportRequest Entity

```typescript
{
  id: string;
  tenantId: string;
  requesterId: string;
  branchId: string;
  status: 'pending' | 'approved' | 'rejected' | 'confirmed' | 'cancelled';
  products: Array<{ productId: string; quantity: number }>;
  notes?: string;
  approvedAt?: Date;
  approverId?: string;
  confirmedAt?: Date;
  confirmerId?: string;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Inventory Entity

```typescript
{
  id: string;
  tenantId: string;
  productId: string;
  locationType: 'central_warehouse' | 'branch';
  branchId?: string;
  quantity: number;
  lowStockThreshold: number;
  lastUpdated: Date;
}
```

## Business Logic

### Approval Workflow

1. **Request Creation:**
   - Warehouse Manager creates request
   - System validates: product exists, quantities valid
   - Request status: 'pending'

2. **Approval:**
   - Admin reviews request
   - Admin approves or rejects
   - If approved: inventory updated, status: 'approved'
   - If rejected: status: 'rejected', reason stored

3. **Confirmation (Export only):**
   - Branch Manager confirms receipt
   - Inventory updated at branch
   - Status: 'confirmed'

### Inventory Updates

**Import Approval:**
- Central warehouse inventory increased
- Audit log entry created
- Notification sent to requester

**Export Approval:**
- Central warehouse inventory decreased (reserved)
- Branch inventory increased (pending confirmation)
- Audit log entry created

**Export Confirmation:**
- Branch inventory confirmed
- Audit log entry created
- Notification sent to requester

## Performance Requirements

### Response Times
- **API Response:** < 500ms (p95)
- **Inventory View Load:** < 2 seconds
- **Real-Time Updates:** < 1 second latency

### Scalability
- **Concurrent Users:** Support 100+ warehouse managers
- **Request Volume:** 1000+ requests/day
- **Inventory Items:** 10,000+ products per tenant

### Data Consistency
- **ACID Compliance:** All inventory operations atomic
- **Real-Time Sync:** Inventory updates visible immediately
- **Conflict Resolution:** Prevent negative inventory

## Security Requirements

### Access Control
- **Role-Based:** Warehouse Manager, Admin roles
- **Tenant Isolation:** Row-level security (RLS)
- **Audit Logging:** All operations logged

### Data Protection
- **Encryption:** Data at rest and in transit
- **Backup:** Daily automated backups
- **Recovery:** Point-in-time recovery capability

## Integration Requirements

### Product Management
- **Dependency:** Product catalog must exist
- **Integration:** Product CRUD operations
- **Validation:** Products must exist before import/export

### Notification System
- **Approval Notifications:** Email/SMS to requester
- **Low Stock Alerts:** Real-time notifications
- **System Notifications:** In-app notifications

## Related Documents

- **[Domain Specs](../../../3-technical/3.1-system-foundation/architecture/domain-specs.md)** - Domain model
- **[API Contracts](../../../3-technical/3.1-system-foundation/architecture/api-contracts/openapi.yaml)** - API specifications
- **[User Stories](user-stories.md)** - Feature requirements

---

*Technical specifications align with system architecture and coding standards.*

