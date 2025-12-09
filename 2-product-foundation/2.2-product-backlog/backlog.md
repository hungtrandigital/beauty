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
**Status:** ✅ Complete  
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
**Status:** ✅ Complete  
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
**Status:** ✅ Complete  
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
**Status:** ✅ Complete  
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
**Status:** ✅ Complete  
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
**Status:** ✅ Complete  
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
**Status:** ✅ Complete  
**Priority:** Medium (RICE: 140)  
**Category:** Growth

**Description:**
Reports and analytics for business insights, including smart recommendations based on system logic (not AI).

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

- [ ] **US-7.3:** As a Chain Owner, I want to receive inventory recommendations so that I know when to refill products
  - **Acceptance Criteria:**
    - System shows "Refill [Product Name]" when stock is low
    - Shows current stock level and recommended quantity
    - Can click to create import/export request directly
    - Recommendations appear on dashboard
  - **RICE:** 180 (Reach: 50, Impact: 2, Confidence: 100%, Effort: 1.5)
  - **Category:** Growth

- [ ] **US-7.4:** As a Chain Owner, I want to see revenue trend recommendations so that I can understand business performance
  - **Acceptance Criteria:**
    - System shows "Revenue is up X% this week" or "Revenue is down X% this week"
    - Shows comparison period (week-over-week, month-over-month)
    - Visual indicators (up/down arrows, colors)
    - Can click to see detailed breakdown
  - **RICE:** 200 (Reach: 50, Impact: 2, Confidence: 100%, Effort: 1.5)
  - **Category:** Growth

- [ ] **US-7.5:** As a Chain Owner, I want to see top product/service recommendations so that I can focus on what's selling
  - **Acceptance Criteria:**
    - System shows "Top selling product: [Product Name]" with quantity
    - System shows "Top revenue service: [Service Name]" with revenue
    - Shows time period (this week, this month)
    - Can click to see detailed sales data
    - Visual indicators (icons, colors)
  - **RICE:** 160 (Reach: 50, Impact: 2, Confidence: 100%, Effort: 1.5)
  - **Category:** Growth

- [ ] **US-7.6:** As a Chain Owner, I want to see revenue source breakdown so that I know which products/services drive revenue
  - **Acceptance Criteria:**
    - System shows "Revenue breakdown: X% from products, Y% from services"
    - Shows top revenue sources with percentages
    - Can filter by branch, date range
    - Visual charts (simple pie chart or bar chart)
    - Simple, clear language (no technical jargon)
  - **RICE:** 150 (Reach: 50, Impact: 2, Confidence: 80%, Effort: 2)
  - **Category:** Growth

**Design Requirements:**
- Recommendations must be simple and clear (no jargon)
- Visual indicators (arrows, colors, icons)
- Actionable (can click to take action)
- Context-aware (based on actual business data)
- Vietnamese language
- Mobile-friendly (responsive design)

**Related Documents:**
- [Reporting Requirements](../requirements/reporting/)
- [Target Audience Insights](../../1-ideas/1.1-market-research/reports/target-audience-insights-2025-12.md) - User preference for recommendations

---

### Epic 8: Mobile App - Customer (MVP)
**Status:** ✅ Complete (Backend APIs)  
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

### Epic 9: Admin Dashboard & System Management (MVP)
**Status:** ✅ Complete  
**Priority:** High (RICE: 200)  
**Category:** MVP

**Description:**
Admin dashboard and system management features for administrators to manage users, roles, permissions, system settings, and organizational configuration. All UI components must follow design guidelines and use design system components.

**User Stories:**
- [ ] **US-9.1:** As an Admin, I want to manage users (create, edit, deactivate) so that I can control who has access to the system
  - **Acceptance Criteria:**
    - Can view list of all users with search and filters
    - Can create new users with name, email, phone, role, branch assignment
    - Can edit existing user information
    - Can deactivate/reactivate users
    - UI uses design system components (tables, forms, buttons)
    - UI follows brand color palette and typography
    - All text in Vietnamese
  - **RICE:** 200

- [ ] **US-9.2:** As an Admin, I want to manage roles and permissions so that I can control what users can do in the system
  - **Acceptance Criteria:**
    - Can view all roles and their permissions
    - Can create custom roles with specific permissions
    - Can edit role permissions
    - Can assign roles to users
    - UI uses design system components (cards, checkboxes, forms)
    - All text in Vietnamese
  - **RICE:** 180

- [ ] **US-9.3:** As an Admin, I want to configure system settings so that I can customize the system for my organization
  - **Acceptance Criteria:**
    - Can configure general settings (organization name, logo, timezone)
    - Can configure notification settings (email, SMS)
    - Can configure security settings (password policy, session timeout)
    - Can configure business settings (currency, date format, language)
    - UI uses design system components (forms, tabs, cards)
    - All text in Vietnamese
  - **RICE:** 160

- [ ] **US-9.4:** As an Admin, I want to manage organization/tenant settings so that I can configure my organization's profile
  - **Acceptance Criteria:**
    - Can view and edit organization profile (name, address, contact info)
    - Can upload organization logo
    - Can configure organization-specific settings
    - UI uses design system components (forms, image upload)
    - All text in Vietnamese
  - **RICE:** 140

- [ ] **US-9.5:** As an Admin, I want to view system activity and logs so that I can monitor system usage and troubleshoot issues
  - **Acceptance Criteria:**
    - Can view activity log with filters (date, user, action type)
    - Can view system logs (errors, warnings, info)
    - Can search logs by keyword
    - Can export logs for analysis
    - UI uses design system components (tables, filters, search)
    - All text in Vietnamese
  - **RICE:** 120

- [ ] **US-9.6:** As an Admin, I want to view an admin dashboard with key metrics so that I can quickly understand system status and activity
  - **Acceptance Criteria:**
    - Can view dashboard with key metrics (users, branches, activity)
    - Can see recent activity feed
    - Can see system health indicators
    - Can see quick action buttons
    - UI uses design system Dashboard Widgets
    - Dashboard loads quickly (< 2 seconds)
    - All text in Vietnamese
  - **RICE:** 180

**Design Requirements:**
- **MANDATORY:** All UI must follow [Brand Guidelines](../../shared/assets/brand-guidelines/README.md) and [Design System](../../shared/assets/ui-ux/design-system/README.md)
- Use design system components (buttons, forms, cards, tables, navigation)
- Follow brand color palette (Deep Navy, Teal, Gold)
- Use Inter font with proper typography scale
- Apply "Confident Efficiency" mood and "Helpful Professional" tone
- Support Vietnamese language throughout
- Meet WCAG 2.1 AA accessibility standards

**Related Documents:**
- [Admin Dashboard Requirements](../requirements/admin-dashboard/)
- [Brand Guidelines](../../shared/assets/brand-guidelines/README.md)
- [Design System](../../shared/assets/ui-ux/design-system/README.md)

---

### Epic 10: Web Application for Staff, Branch Head & Customer (MVP)
**Status:** ✅ Complete  
**Priority:** High (RICE: 220)  
**Category:** MVP

**Description:**
Web-based interfaces for Staff (Cashiers, Warehouse Managers), Branch Head (Branch Managers), and Customers. This provides web access to system features that complement the mobile app (Epic 8) and admin dashboard (Epic 9). All UI components must follow design guidelines and use design system components. This is web-based (responsive), not native mobile apps.

**User Stories:**
- [ ] **US-10.1:** As a Cashier (Staff), I want to create and manage bills using the web interface so that I can process customer transactions efficiently
  - **Acceptance Criteria:**
    - Can create new bills with products and services
    - Can apply promotions automatically or manually
    - Can scan customer QR code to load customer information
    - Can process payments (cash, card, multiple methods)
    - Works offline (bills saved locally, sync when online)
    - UI uses design system components (forms, buttons, tables)
    - All text in Vietnamese
    - Responsive design (works on desktop, tablet, mobile browsers)
  - **RICE:** 240

- [ ] **US-10.2:** As a Cashier (Staff), I want to manage customers using the web interface so that I can create and update customer information during transactions
  - **Acceptance Criteria:**
    - Can search customers by name, phone, or QR code
    - Can create new customer records
    - Can view customer details (history, points, membership tier)
    - Can update customer information
    - UI uses design system components (forms, search, tables)
    - All text in Vietnamese
    - Responsive design
  - **RICE:** 200

- [ ] **US-10.3:** As a Warehouse Manager (Staff), I want to manage inventory operations using the web interface so that I can handle import/export requests and view inventory
  - **Acceptance Criteria:**
    - Can create import requests for central warehouse
    - Can create export requests from central warehouse to branches
    - Can view central warehouse and branch inventory
    - Can see low stock alerts
    - UI uses design system components (forms, tables, filters)
    - All text in Vietnamese
    - Responsive design
  - **RICE:** 220

- [ ] **US-10.4:** As a Branch Head, I want to view branch dashboard and reports using the web interface so that I can monitor branch performance and make informed decisions
  - **Acceptance Criteria:**
    - Can view branch dashboard with key metrics (revenue, bills, customers, inventory)
    - Can view revenue reports (daily, weekly, monthly)
    - Can view product sales and service revenue reports
    - Can filter reports by date range
    - Can export reports
    - UI uses design system Dashboard Widgets
    - All text in Vietnamese
    - Responsive design
  - **RICE:** 200

- [ ] **US-10.5:** As a Branch Head, I want to monitor staff performance using the web interface so that I can track employee productivity and commission
  - **Acceptance Criteria:**
    - Can view staff performance reports (services performed, revenue, commission)
    - Can filter by staff member, date range
    - Can view staff commission breakdown
    - Can see top performers
    - UI uses design system Table components
    - All text in Vietnamese
    - Responsive design
  - **RICE:** 160

- [ ] **US-10.6:** As a Customer, I want to browse services and book appointments using the web interface so that I can view services and schedule appointments from my computer
  - **Acceptance Criteria:**
    - Can browse services by category
    - Can view service details (name, price, images, description)
    - Can view service availability
    - Can book appointments for services
    - Can view my appointment history
    - UI uses design system components (cards, forms, buttons)
    - All text in Vietnamese
    - Responsive design (mobile-friendly)
  - **RICE:** 180

- [ ] **US-10.7:** As a Customer, I want to view my loyalty points and promotions using the web interface so that I can track my rewards and see available promotions
  - **Acceptance Criteria:**
    - Can view current points balance
    - Can view points history (earned, redeemed)
    - Can view membership tier and benefits
    - Can view available promotions and details
    - UI uses design system components (cards, badges, lists)
    - All text in Vietnamese
    - Responsive design
  - **RICE:** 150

**Design Requirements:**
- **MANDATORY:** All UI must follow [Brand Guidelines](../../shared/assets/brand-guidelines/README.md) and [Design System](../../shared/assets/ui-ux/design-system/README.md)
- Use design system components (buttons, forms, cards, tables, navigation)
- Follow brand color palette (Deep Navy, Teal, Gold)
- Use Inter font with proper typography scale
- Apply "Confident Efficiency" mood and "Helpful Professional" tone
- Support Vietnamese language throughout
- Meet WCAG 2.1 AA accessibility standards
- Responsive design (desktop, tablet, mobile browsers)
- Progressive Web App (PWA) support

**Technical Requirements:**
- Next.js 14+ with TypeScript
- Tailwind CSS with design tokens
- shadcn/ui component library
- Offline capability (for staff)
- Real-time updates
- PWA support

**Related Documents:**
- [Web Application Requirements](../requirements/web-application/)
- [Brand Guidelines](../../shared/assets/brand-guidelines/README.md)
- [Design System](../../shared/assets/ui-ux/design-system/README.md)
- [Mobile App Requirements](../requirements/mobile-app/) - Epic 8 (complementary mobile app)
- [Admin Dashboard Requirements](../requirements/admin-dashboard/) - Epic 9 (admin features)

---

## Backlog Items (Unprioritized)

### Feature Requests
- Advanced analytics and forecasting
- Marketing automation
- Third-party integrations (accounting, payment gateways)
- Multi-currency support
- Advanced reporting with custom dashboards

### Recently Added Features (Based on User Research)
- **Smart Recommendations (Epic 7):** System logic-based recommendations for inventory alerts, revenue trends, and top performers. See [Feature Idea](../1-ideas/feature-idea-smart-recommendations.md) for details.

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
