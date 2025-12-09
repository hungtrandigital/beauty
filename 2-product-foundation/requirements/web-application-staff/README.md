# Product Requirements: Web Application for Staff Roles

**Last Updated:** 2025-12-09  
**Version:** 2.0  
**Epic:** Web Application for Staff, Warehouse Manager, and Cashier

## Overview

This PRD defines requirements for web-based interfaces specifically for Staff roles (Cashiers, Warehouse Managers, and future Staff roles). This is a focused implementation of the web application that provides role-specific interfaces based on revised permissions.

## Business Context

Staff members need web-based access to perform their daily operations:
- **Cashiers:** Need efficient bill creation, payment processing, and customer management
- **Warehouse Managers:** Need inventory management, import/export operations, and stock tracking
- **Future Staff Roles:** Service providers, general staff with limited access

The web application must respect the revised permission system and provide appropriate interfaces for each role.

## Design Guidelines Compliance

**MANDATORY:** All UI components must follow:
- **[Brand Guidelines](../../../shared/assets/brand-guidelines/README.md)** - Colors, typography, UI/UX mood & tone
- **[Design System](../../../shared/assets/ui-ux/design-system/README.md)** - Components, design tokens, patterns
- **UI Mood:** "Confident Efficiency" - Professional, trustworthy, clear
- **UI Tone:** "Helpful Professional" - Supportive, clear, respectful
- **Accessibility:** WCAG 2.1 AA minimum compliance
- **Vietnamese Language:** All UI text in Vietnamese
- **Permission-Based UI:** Show/hide features based on user permissions

## User Roles & Interfaces

### Cashier Interface
**Primary Permissions:** bills.*, customers.*, payments.*, promotions.view, products.view, services.view

**Key Features:**
- Bill creation and management
- Payment processing (cash, card, mixed, partial)
- Customer management (create, search, view history)
- QR code scanning for customer identification
- Promotion application
- Offline bill creation with auto-sync
- Bill history and printing

### Warehouse Manager Interface
**Primary Permissions:** inventory.*, products.view, branches.view, reports.view.inventory

**Key Features:**
- Inventory import/export request creation
- Inventory viewing (central warehouse, branches, consolidated)
- Low stock alerts
- Inventory history and reports
- Request status tracking
- Inventory adjustment requests

### Staff Interface (Future)
**Primary Permissions:** services.view, services.track, customers.view, bills.view (read-only), reports.view.own

**Key Features:**
- Service tracking
- Customer information viewing
- Own performance reports
- Bill viewing (read-only)

## User Stories

### Cashier User Stories

#### US-WEB-1: Cashier - Bill Creation (Web)
**As a** Cashier  
**I want to** create bills using the web interface  
**So that** I can process customer transactions efficiently

**Acceptance Criteria:**
- [ ] Can create new bills with products and services
- [ ] Can add/remove items with quantity selection
- [ ] Can scan customer QR code to auto-load customer info
- [ ] Can search and select customers
- [ ] System automatically applies eligible promotions
- [ ] Can manually apply/remove promotions
- [ ] Can save bills as draft
- [ ] Can edit unpaid bills
- [ ] UI shows real-time total with discounts
- [ ] UI uses design system components
- [ ] Works offline (saves locally, syncs when online)
- [ ] Permission check: `bills.create` required

**RICE Score:** 240

#### US-WEB-2: Cashier - Payment Processing (Web)
**As a** Cashier  
**I want to** process payments using the web interface  
**So that** customers can complete their transactions

**Acceptance Criteria:**
- [ ] Can process cash payments with change calculation
- [ ] Can process card payments
- [ ] Can process mixed payments (cash + card)
- [ ] Can process partial payments
- [ ] System calculates change automatically
- [ ] Can print receipts
- [ ] Payment history is tracked
- [ ] UI shows payment status clearly
- [ ] Permission check: `payments.process` required

**RICE Score:** 220

#### US-WEB-3: Cashier - Customer Management (Web)
**As a** Cashier  
**I want to** manage customers using the web interface  
**So that** I can create and update customer information during transactions

**Acceptance Criteria:**
- [ ] Can search customers by name, phone, QR code
- [ ] Can create new customers
- [ ] Can view customer details (points, tier, history)
- [ ] Can update customer information
- [ ] Can view customer bill history
- [ ] UI uses design system search and form components
- [ ] Permission checks: `customers.create`, `customers.view`, `customers.update`

**RICE Score:** 200

### Warehouse Manager User Stories

#### US-WEB-4: Warehouse Manager - Inventory Operations (Web)
**As a** Warehouse Manager  
**I want to** manage inventory operations using the web interface  
**So that** I can handle import/export requests efficiently

**Acceptance Criteria:**
- [ ] Can create import requests for central warehouse
- [ ] Can create export requests to branches
- [ ] Can create return requests from branches
- [ ] Can view pending approval requests
- [ ] Can cancel pending requests
- [ ] System validates available quantities
- [ ] UI shows request status clearly
- [ ] Permission checks: `inventory.manage`, `requests.create`

**RICE Score:** 240

#### US-WEB-5: Warehouse Manager - Inventory Viewing (Web)
**As a** Warehouse Manager  
**I want to** view inventory across all locations using the web interface  
**So that** I can track stock levels and make informed decisions

**Acceptance Criteria:**
- [ ] Can view central warehouse inventory
- [ ] Can view branch inventory (all branches)
- [ ] Can view consolidated inventory
- [ ] Can filter by location, product, stock level
- [ ] Can search products
- [ ] Low stock alerts are prominently displayed
- [ ] Real-time inventory updates
- [ ] UI uses design system table and filter components
- [ ] Permission check: `inventory.view` required

**RICE Score:** 220

#### US-WEB-6: Warehouse Manager - Inventory History (Web)
**As a** Warehouse Manager  
**I want to** view inventory history using the web interface  
**So that** I can track all inventory operations

**Acceptance Criteria:**
- [ ] Can view import/export history
- [ ] Can view adjustment history
- [ ] Can filter by date, location, product, operation type
- [ ] Can export history reports
- [ ] UI shows detailed operation information
- [ ] Permission check: `inventory.view.history` required

**RICE Score:** 180

## Technical Requirements

### Permission-Based Access Control

**Backend:**
- All endpoints must check permissions (not just roles)
- Permission checks at controller level
- Branch-scoped permissions where applicable
- Return 403 Forbidden for unauthorized access

**Frontend:**
- Permission-based route guards
- Permission-based UI rendering (show/hide components)
- Permission-based action enabling/disabling
- Clear error messages for permission denials

### API Endpoints

**Cashier Endpoints:**
- `POST /api/bills` - Create bill (requires `bills.create`)
- `PUT /api/bills/:id` - Update bill (requires `bills.update`)
- `GET /api/bills` - List bills (requires `bills.view`, branch-scoped)
- `POST /api/bills/:id/payments` - Process payment (requires `payments.process`)
- `GET /api/customers` - Search customers (requires `customers.view`)
- `POST /api/customers` - Create customer (requires `customers.create`)
- `GET /api/customers/:id/qr` - Get customer by QR (requires `customers.view`)

**Warehouse Manager Endpoints:**
- `POST /api/inventory/imports` - Create import request (requires `inventory.manage`)
- `POST /api/inventory/exports` - Create export request (requires `inventory.manage`)
- `GET /api/inventory` - View inventory (requires `inventory.view`)
- `GET /api/inventory/history` - View history (requires `inventory.view.history`)
- `POST /api/inventory/adjustments` - Create adjustment (requires `inventory.adjust`)

### Offline Support

**Cashier Offline Features:**
- Bill creation works offline
- Bills saved to IndexedDB
- Auto-sync when connection restored
- Conflict resolution
- Offline indicator in UI

**Warehouse Manager:**
- Inventory viewing (read-only) works offline (cached data)
- Request creation requires online connection

### Responsive Design

- Desktop-first design (primary use case)
- Tablet support (for mobile cashier stations)
- Mobile browser support (limited features)
- Touch-friendly for tablet use

## Design Requirements

### UI Components

**Cashier Interface:**
- Bill creation form (design system Form components)
- Product/service selection (design system Cards/List)
- Customer search/selection (design system Search component)
- Payment processing modal (design system Modal)
- Bill history table (design system Table)
- QR scanner integration

**Warehouse Manager Interface:**
- Request creation forms (design system Form components)
- Inventory tables (design system Table with filters)
- Status indicators (design system Badges)
- Low stock alerts (design system Alerts)
- History timeline (design system Timeline component)

### Navigation

**Cashier Navigation:**
- Dashboard (quick stats)
- Bills (create, history)
- Customers (search, create, view)
- Reports (own branch only)

**Warehouse Manager Navigation:**
- Dashboard (inventory overview, alerts)
- Inventory (view, create requests)
- Requests (pending, history)
- Reports (inventory reports)

### Permission-Based UI

- Navigation items shown/hidden based on permissions
- Action buttons enabled/disabled based on permissions
- Error messages for permission denials
- Empty states for features without permission

## Success Metrics

**Cashier:**
- Bill creation time: < 3 minutes
- Payment processing time: < 30 seconds
- Customer search: < 5 seconds
- 90%+ of cashiers use web interface daily

**Warehouse Manager:**
- Request creation time: < 5 minutes
- Inventory view load: < 2 seconds
- 80%+ of warehouse managers use web interface daily

**Overall:**
- Zero permission-related errors
- 100% permission compliance
- < 1% error rate for web operations

## Out of Scope

- Admin dashboard features (separate epic)
- Customer web interface (separate epic)
- Branch Head interface (future epic)
- Mobile native apps (this is web-based)
- Advanced analytics (separate epic)

## Related Documents

- **[Role Permissions Revision](../role-permissions-revision/)** - Permission definitions
- **[Web Application (Original)](../web-application/)** - Original web app PRD
- **[Billing Requirements](../billing/)** - Bill management requirements
- **[Inventory Management Requirements](../inventory-management/)** - Inventory requirements
- **[Design System](../../../shared/assets/ui-ux/design-system/README.md)** - UI components

---

*This PRD defines web application requirements for Staff roles with permission-based access control.*
