# Product Backlog

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

This document contains the product backlog organized by epics and user stories. Features are prioritized using RICE scoring (Reach, Impact, Confidence, Effort) and tagged by category (MVP, Growth, Polish, Tech Debt).

## Prioritization Method: RICE

**RICE Formula:** (Reach × Impact × Confidence) / Effort

- **Reach:** How many users/transactions per period?
- **Impact:** How much will this impact each user? (0.25 = minimal, 0.5 = low, 1 = medium, 2 = high, 3 = massive)
- **Confidence:** How confident are we? (50% = low, 80% = medium, 100% = high)
- **Effort:** Person-months of work

## Current Quarter Focus (Q1 2025)

### Epic 1: Core Inventory Management (MVP)
**Status:** Not Started  
**Priority:** High (RICE: 240)  
**Category:** MVP

**Description:**
Core inventory management with central warehouse, branch distribution, and approval workflows. This is the foundation of the system.

**User Stories:**
- [ ] **US-1.1:** As a Warehouse Manager, I want to import products to central warehouse so that I can manage inventory centrally
  - **Acceptance Criteria:**
    - Can create import request with products and quantities
    - Import request requires approval from Admin
    - After approval, central warehouse inventory is updated
    - Import history is tracked
  - **RICE:** 240 (Reach: 50, Impact: 2, Confidence: 100%, Effort: 2)

- [ ] **US-1.2:** As a Warehouse Manager, I want to export products from central warehouse to branches so that branches have inventory
  - **Acceptance Criteria:**
    - Can create export request with products, quantities, and target branch
    - Export request requires approval from Admin
    - After approval, branch must confirm receipt
    - Inventory is updated in both central warehouse and branch
  - **RICE:** 240

- [ ] **US-1.3:** As an Admin, I want to approve import/export requests so that I can control inventory operations
  - **Acceptance Criteria:**
    - Can view pending approval requests
    - Can approve or reject requests
    - Approval notifications are sent
    - Approval history is tracked
  - **RICE:** 200

- [ ] **US-1.4:** As a Warehouse Manager, I want to view inventory across all locations so that I can track stock levels
  - **Acceptance Criteria:**
    - Can view central warehouse inventory
    - Can view branch inventory
    - Can filter by location and product
    - Low stock alerts are shown
  - **RICE:** 180

**Related Documents:**
- [Inventory Requirements](../requirements/inventory-management/)
- [Domain Specs](../../3-technical/3.1-system-foundation/architecture/domain-specs.md)

---

### Epic 2: Bill Creation & Payment (MVP)
**Status:** Not Started  
**Priority:** High (RICE: 220)  
**Category:** MVP

**Description:**
Core bill creation and payment processing with offline support. Critical for daily operations.

**User Stories:**
- [ ] **US-2.1:** As a Cashier, I want to create bills for customers so that I can process sales
  - **Acceptance Criteria:**
    - Can add products and services to bill
    - Can apply promotions
    - Can calculate total with discounts
    - Bill can be saved as draft
  - **RICE:** 220

- [ ] **US-2.2:** As a Cashier, I want to create bills offline so that I can continue working when network is down
  - **Acceptance Criteria:**
    - Bills can be created without internet connection
    - Bills are saved locally
    - Bills automatically sync when connection is restored
    - Conflict resolution for sync issues
  - **RICE:** 200

- [ ] **US-2.3:** As a Cashier, I want to process payments so that customers can pay for bills
  - **Acceptance Criteria:**
    - Can record cash payments
    - Can record card payments
    - Can record multiple payment methods
    - Payment status is updated
  - **RICE:** 180

- [ ] **US-2.4:** As a Cashier, I want to scan customer QR codes so that I can quickly identify customers
  - **Acceptance Criteria:**
    - Can scan QR code from customer app
    - Customer information is loaded
    - Customer points and membership tier are shown
  - **RICE:** 150

**Related Documents:**
- [Billing Requirements](../requirements/billing/)
- [Offline Sync Requirements](../requirements/offline-sync/)

---

### Epic 3: Product & Service Management (MVP)
**Status:** Not Started  
**Priority:** High (RICE: 200)  
**Category:** MVP

**Description:**
Product catalog and service management with pricing and commission configuration.

**User Stories:**
- [ ] **US-3.1:** As an Admin, I want to manage product catalog so that products are available for sale
  - **Acceptance Criteria:**
    - Can create products with name, prices, images
    - Can distinguish between products for sale and dye products
    - Can set customer price and staff price
    - Can configure commission splits
  - **RICE:** 200

- [ ] **US-3.2:** As an Admin, I want to manage services so that services can be sold to customers
  - **Acceptance Criteria:**
    - Can create services with name, price, images
    - Can set service type (male/female)
    - Can associate products/dye with services
    - Can configure commission splits (ratio or salary level)
  - **RICE:** 180

- [ ] **US-3.3:** As an Admin, I want to set branch-specific pricing so that different branches can have different prices
  - **Acceptance Criteria:**
    - Can set default prices for products/services
    - Can override prices per branch
    - Price changes are tracked
  - **RICE:** 120

**Related Documents:**
- [Product Management Requirements](../requirements/product-management/)

---

### Epic 4: Promotion Engine (MVP)
**Status:** Not Started  
**Priority:** Medium (RICE: 180)  
**Category:** MVP

**Description:**
Promotion system with 10 types of promotions to drive revenue.

**User Stories:**
- [ ] **US-4.1:** As an Admin, I want to create promotions so that I can drive sales
  - **Acceptance Criteria:**
    - Can create promotions with type, rules, dates
    - Supports 10 promotion types
    - Can set start and end dates
    - Promotions can be activated/deactivated
  - **RICE:** 180

- [ ] **US-4.2:** As a Cashier, I want promotions to be automatically applied to bills so that customers get discounts
  - **Acceptance Criteria:**
    - System automatically finds eligible promotions
    - Promotions are applied based on rules
    - Discount is calculated and shown
    - Promotion usage is tracked
  - **RICE:** 160

- [ ] **US-4.3:** As an Admin, I want to manage vouchers so that I can create voucher-based promotions
  - **Acceptance Criteria:**
    - Can create voucher codes
    - Can import voucher codes in bulk
    - Can set usage limits per voucher
    - Can track voucher usage
  - **RICE:** 140

**Related Documents:**
- [Promotion Requirements](../requirements/promotions/)

---

### Epic 5: Customer Management & Loyalty (MVP)
**Status:** Not Started  
**Priority:** Medium (RICE: 160)  
**Category:** MVP

**Description:**
Customer database, membership tiers, and loyalty points system.

**User Stories:**
- [ ] **US-5.1:** As a Cashier, I want to manage customers so that I can track customer information
  - **Acceptance Criteria:**
    - Can create customer records
    - Can search customers by name, phone, QR code
    - Can view customer history (bills, services)
    - Can update customer information
  - **RICE:** 160

- [ ] **US-5.2:** As a System, I want to automatically assign membership tiers based on points so that customers get appropriate benefits
  - **Acceptance Criteria:**
    - Points are calculated from bill totals
    - Membership tiers are assigned based on point thresholds
    - Tier benefits are applied automatically
  - **RICE:** 140

- [ ] **US-5.3:** As a Customer, I want to earn points from purchases so that I can redeem rewards
  - **Acceptance Criteria:**
    - Points are earned based on bill total
    - Points conversion rate is configurable
    - Points are shown in customer app
    - Points can be redeemed for services
  - **RICE:** 120

**Related Documents:**
- [Customer Management Requirements](../requirements/customer-management/)

---

### Epic 6: Multi-Location & Branch Management (MVP)
**Status:** Not Started  
**Priority:** High (RICE: 200)  
**Category:** MVP

**Description:**
Branch management and multi-location configuration.

**User Stories:**
- [ ] **US-6.1:** As an Admin, I want to manage branches so that I can configure multiple locations
  - **Acceptance Criteria:**
    - Can create branches with code, name, address
    - Can set branch-specific configurations
    - Can activate/deactivate branches
    - Branch information includes Google Maps link
  - **RICE:** 200

- [ ] **US-6.2:** As an Admin, I want to assign users to branches so that users can access branch-specific data
  - **Acceptance Criteria:**
    - Can assign users to one or more branches
    - Users can only access assigned branches
    - Branch access is enforced in API
  - **RICE:** 160

**Related Documents:**
- [Branch Management Requirements](../requirements/branch-management/)

---

### Epic 7: Reporting & Analytics (Growth)
**Status:** Not Started  
**Priority:** Medium (RICE: 140)  
**Category:** Growth

**Description:**
Reports and analytics for business insights.

**User Stories:**
- [ ] **US-7.1:** As an Admin, I want to view product sales reports so that I can analyze product performance
  - **Acceptance Criteria:**
    - Can view sales by product
    - Can filter by date range, branch
    - Can see revenue and quantity sold
    - Can export reports
  - **RICE:** 140

- [ ] **US-7.2:** As an Admin, I want to view employee performance reports so that I can track employee productivity
  - **Acceptance Criteria:**
    - Can view services performed by employee
    - Can see revenue and commission paid
    - Can filter by branch, date range
  - **RICE:** 120

**Related Documents:**
- [Reporting Requirements](../requirements/reporting/)

---

### Epic 8: Mobile App - Customer (MVP)
**Status:** Not Started  
**Priority:** Medium (RICE: 150)  
**Category:** MVP

**Description:**
Customer-facing mobile app for booking, viewing services, and loyalty points.

**User Stories:**
- [ ] **US-8.1:** As a Customer, I want to view services and prices so that I can choose services
  - **Acceptance Criteria:**
    - Can browse services by category
    - Can see service prices and images
    - Can view service details
  - **RICE:** 150

- [ ] **US-8.2:** As a Customer, I want to view my loyalty points so that I can track my rewards
  - **Acceptance Criteria:**
    - Can see current points balance
    - Can see points history
    - Can see membership tier and benefits
  - **RICE:** 120

**Related Documents:**
- [Mobile App Requirements](../requirements/mobile-app/)

---

## Backlog Items (Unprioritized)

### Feature Requests
- Advanced analytics and forecasting
- Marketing automation
- Third-party integrations (accounting, payment gateways)
- Multi-currency support
- Advanced reporting with custom dashboards

### Technical Debt
- Performance optimization for large datasets
- Database query optimization
- Caching strategy improvements
- Test coverage improvements

## Prioritization

**Current Sprint Focus:**
- Epic 1: Core Inventory Management (US-1.1, US-1.2, US-1.3)
- Epic 2: Bill Creation & Payment (US-2.1, US-2.2)
- Epic 3: Product & Service Management (US-3.1, US-3.2)

**Next Sprint:**
- Epic 2: Bill Creation & Payment (US-2.3, US-2.4)
- Epic 4: Promotion Engine (US-4.1, US-4.2)
- Epic 5: Customer Management & Loyalty (US-5.1)

## Related Documents

- **[Product Overview](../2.1-product-overview.md)** - Product vision and goals
- **[Requirements](../requirements/)** - Detailed PRDs
- **[Implementation Plans](../../3-technical/3.2-implementation/plans/plan.md)** - Technical implementation plans
- **[Progress Tracking](../../3-technical/3.2-implementation/status/progress.md)** - Implementation status

---

*Update this backlog regularly as new features are identified and priorities change.*
