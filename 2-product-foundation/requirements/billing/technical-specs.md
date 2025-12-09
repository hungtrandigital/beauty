# Technical Specifications: Billing

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

Technical requirements and specifications for the Billing epic. This document defines APIs, database schema, offline sync, and performance requirements.

## API Endpoints

### Bills

**POST /api/bills**
- Create new bill
- Request body: `{ items: [...], customerId?, promotions?: [...] }`
- Response: `{ id, total, items, status }`

**GET /api/bills/:id**
- Get bill details
- Response: `{ id, items, total, customer, status, payments, createdAt }`

**PUT /api/bills/:id**
- Update bill (before payment)
- Request body: `{ items: [...], promotions?: [...] }`
- Response: `{ id, total, updated }`

**POST /api/bills/:id/pay**
- Process payment
- Request body: `{ payments: [{ method, amount }] }`
- Response: `{ success, change, receipt }`

### Offline Sync

**POST /api/bills/sync**
- Sync offline bills
- Request body: `{ bills: [...] }`
- Response: `{ synced: [...], conflicts: [...] }`

**GET /api/bills/sync/status**
- Get sync status
- Response: `{ pending: number, lastSync: Date }`

## Database Schema

### Bill Entity

```typescript
{
  id: string;
  tenantId: string;
  branchId: string;
  billNumber: string;
  customerId?: string;
  items: Array<{
    type: 'product' | 'service';
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  discounts: number;
  promotions: Array<{ promotionId, discount }>;
  total: number;
  status: 'draft' | 'pending' | 'paid' | 'cancelled';
  payments: Array<{
    method: 'cash' | 'card' | 'other';
    amount: number;
    timestamp: Date;
  }>;
  synced: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Offline Architecture

### PouchDB (Client-Side)

**Local Database:**
- Store bills locally when offline
- Store inventory cache
- Store customer cache
- Store promotion cache

**Sync Strategy:**
- Continuous sync when online
- Manual sync trigger
- Conflict resolution

### CouchDB (Server-Side)

**Replication:**
- Master database for all tenants
- Document-based storage
- Built-in conflict resolution
- Real-time replication

### Sync Flow

1. **Offline Bill Creation:**
   - Bill saved to PouchDB
   - Marked as `synced: false`
   - Inventory checked against cache

2. **Connection Restore:**
   - Automatic sync triggered
   - Bills replicated to CouchDB
   - Conflicts detected and resolved

3. **Conflict Resolution:**
   - Last write wins (default)
   - Manual resolution for critical conflicts
   - Notification to user if conflict

## Performance Requirements

### Response Times
- **Bill Creation API:** < 500ms
- **Payment Processing:** < 1 second
- **Promotion Application:** < 500ms
- **Offline Save:** < 100ms (local)

### Scalability
- **Concurrent Bills:** Support 100+ concurrent bill creation
- **Daily Volume:** 10,000+ bills per tenant
- **Sync Throughput:** 1000+ bills per minute

### Data Consistency
- **ACID Compliance:** All bill operations atomic
- **Offline Consistency:** Local validation before save
- **Sync Consistency:** Conflict resolution ensures consistency

## Security Requirements

### Access Control
- **Role-Based:** Cashier, Admin roles
- **Tenant Isolation:** Row-level security (RLS)
- **Audit Logging:** All bill operations logged

### Payment Security
- **Payment Data:** Encrypted at rest and in transit
- **PCI Compliance:** Follow PCI DSS guidelines
- **Audit Trail:** Complete payment history

## Integration Requirements

### Promotion Engine
- **Dependency:** Promotion system must exist
- **Integration:** Real-time promotion eligibility check
- **API:** Promotion application endpoint

### Customer Management
- **Dependency:** Customer database
- **Integration:** Customer lookup, loyalty points
- **API:** Customer information endpoint

### Inventory Management
- **Dependency:** Inventory system
- **Integration:** Real-time inventory check
- **API:** Inventory deduction on bill creation

## Related Documents

- **[Domain Specs](../../../3-technical/3.1-system-foundation/architecture/domain-specs.md)** - Domain model
- **[API Contracts](../../../3-technical/3.1-system-foundation/architecture/api-contracts/openapi.yaml)** - API specifications
- **[User Stories](user-stories.md)** - Feature requirements

---

*Technical specifications align with offline-first architecture and system design.*

