# User Stories: Web Application for Staff, Branch Head & Customer

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Design Guidelines Reference

**All UI implementations must follow:**
- **[Brand Guidelines](../../../shared/assets/brand-guidelines/README.md)**
- **[Design System](../../../shared/assets/ui-ux/design-system/README.md)**
- **UI Mood:** "Confident Efficiency"
- **UI Tone:** "Helpful Professional"
- **Language:** Vietnamese

## Staff Interface User Stories

### US-10.1: Staff - Bill Creation and Management (Web)

**As a** Cashier (Staff)  
**I want to** create and manage bills using the web interface  
**So that** I can process customer transactions efficiently

**Acceptance Criteria:**
- [ ] Can create new bills with products and services
- [ ] Can add products/services to bill with quantity selection
- [ ] Can apply promotions automatically or manually
- [ ] Can scan customer QR code to load customer information
- [ ] Can process payments (cash, card, multiple methods)
- [ ] Can save bills as draft
- [ ] Can view bill history with filters (date, customer, status)
- [ ] Can print bills
- [ ] Works offline (bills saved locally, sync when online)
- [ ] UI uses design system components (forms, buttons, tables)
- [ ] UI follows brand color palette and typography
- [ ] All text in Vietnamese
- [ ] Responsive design (works on desktop, tablet, mobile browsers)
- [ ] Accessible (keyboard navigation, screen reader support)

**Business Rules:**
- Bills must have at least one item (product or service)
- Customer is optional (can create bill for walk-in customers)
- Promotions are applied automatically based on rules
- Offline bills sync automatically when connection is restored
- Payment status is tracked

**Design Requirements:**
- Use design system Form components for bill creation
- Use design system Table component for bill history
- Use design system Button components for actions
- Follow color palette (Deep Navy for primary, Teal for actions)
- Use Inter font with proper typography scale
- Apply "Confident Efficiency" mood - clear, organized layout
- Responsive grid system for different screen sizes

**Success Criteria:**
- Bill creation: < 3 minutes per bill
- Zero errors in bill data
- 100% of cashiers can create bills successfully

**RICE Score:** 240 (Reach: 100, Impact: 2, Confidence: 100%, Effort: 3)

---

### US-10.2: Staff - Customer Management (Web)

**As a** Cashier (Staff)  
**I want to** manage customers using the web interface  
**So that** I can create and update customer information during transactions

**Acceptance Criteria:**
- [ ] Can search customers by name, phone, or QR code
- [ ] Can create new customer records
- [ ] Can view customer details (history, points, membership tier)
- [ ] Can update customer information
- [ ] Can view customer bill history
- [ ] Can view customer service history
- [ ] UI uses design system components (forms, search, tables)
- [ ] UI follows brand guidelines for layout and spacing
- [ ] All text in Vietnamese
- [ ] Responsive design

**Business Rules:**
- Customer phone numbers must be unique
- Customer information is shared across all branches
- Customer history shows all transactions across branches

**Design Requirements:**
- Use design system Search component
- Use design system Form components for customer creation/edit
- Use design system Table component for customer list
- Follow design system spacing and layout guidelines
- Apply "Helpful Professional" tone - clear, supportive

**Success Criteria:**
- Customer search: < 5 seconds
- Customer creation: < 2 minutes
- Zero errors in customer data

**RICE Score:** 200 (Reach: 100, Impact: 2, Confidence: 100%, Effort: 2)

---

### US-10.3: Warehouse Manager - Inventory Operations (Web)

**As a** Warehouse Manager (Staff)  
**I want to** manage inventory operations using the web interface  
**So that** I can handle import/export requests and view inventory

**Acceptance Criteria:**
- [ ] Can create import requests for central warehouse
- [ ] Can create export requests from central warehouse to branches
- [ ] Can view pending approval requests
- [ ] Can view central warehouse inventory
- [ ] Can view branch inventory
- [ ] Can see low stock alerts
- [ ] Can filter inventory by location, product, stock level
- [ ] UI uses design system components (forms, tables, filters)
- [ ] UI follows design system layout patterns
- [ ] All text in Vietnamese
- [ ] Responsive design

**Business Rules:**
- Import/export requests require admin approval
- Inventory quantities are real-time
- Low stock alerts are configurable per product

**Design Requirements:**
- Use design system Form components for requests
- Use design system Table component for inventory lists
- Use design system Filter components
- Use design system Status Indicators for stock levels
- Follow design system spacing and layout guidelines
- Apply "Confident Efficiency" mood - organized, clear

**Success Criteria:**
- Request creation: < 5 minutes
- Inventory view load: < 2 seconds
- Zero errors in inventory operations

**RICE Score:** 220 (Reach: 50, Impact: 2, Confidence: 100%, Effort: 2.5)

---

## Branch Head Interface User Stories

### US-10.4: Branch Head - Branch Dashboard and Reports (Web)

**As a** Branch Head  
**I want to** view branch dashboard and reports using the web interface  
**So that** I can monitor branch performance and make informed decisions

**Acceptance Criteria:**
- [ ] Can view branch dashboard with key metrics (revenue, bills, customers, inventory)
- [ ] Can view revenue reports (daily, weekly, monthly)
- [ ] Can view product sales reports for branch
- [ ] Can view service revenue reports for branch
- [ ] Can filter reports by date range
- [ ] Can export reports
- [ ] UI uses design system Dashboard Widgets
- [ ] UI uses design system Table components for reports
- [ ] UI follows brand guidelines for data visualization
- [ ] All text in Vietnamese
- [ ] Responsive design

**Business Rules:**
- Dashboard shows branch-specific data only
- Reports can be filtered by date range
- Data updates in real-time or near real-time

**Design Requirements:**
- Use design system Dashboard Widgets component
- Use design system Grid System for layout
- Use design system Table component for reports
- Follow brand color palette for metrics
- Apply "Confident Efficiency" mood - clear, organized
- Use design system Typography for metric display

**Success Criteria:**
- Dashboard load time: < 2 seconds
- Report generation: < 5 seconds
- 100% of branch heads use dashboard daily

**RICE Score:** 200 (Reach: 30, Impact: 2, Confidence: 100%, Effort: 3)

---

### US-10.5: Branch Head - Staff Performance Monitoring (Web)

**As a** Branch Head  
**I want to** monitor staff performance using the web interface  
**So that** I can track employee productivity and commission

**Acceptance Criteria:**
- [ ] Can view staff performance reports (services performed, revenue, commission)
- [ ] Can filter by staff member, date range
- [ ] Can view staff commission breakdown
- [ ] Can see top performers
- [ ] UI uses design system Table components
- [ ] UI follows design system for data display
- [ ] All text in Vietnamese
- [ ] Responsive design

**Business Rules:**
- Performance data is branch-specific
- Commission calculations are based on configured rules
- Data is aggregated by staff member

**Design Requirements:**
- Use design system Table component
- Use design system Filter components
- Follow color palette for performance indicators
- Apply "Confident Efficiency" mood

**Success Criteria:**
- Report load time: < 3 seconds
- 100% of branch heads can access performance data

**RICE Score:** 160 (Reach: 30, Impact: 2, Confidence: 90%, Effort: 2)

---

## Customer Interface User Stories

### US-10.6: Customer - Service Browsing and Booking (Web)

**As a** Customer  
**I want to** browse services and book appointments using the web interface  
**So that** I can view services and schedule appointments from my computer

**Acceptance Criteria:**
- [ ] Can browse services by category
- [ ] Can view service details (name, price, images, description)
- [ ] Can view service availability
- [ ] Can book appointments for services
- [ ] Can view my appointment history
- [ ] Can cancel appointments (if allowed)
- [ ] UI uses design system components (cards, forms, buttons)
- [ ] UI follows brand guidelines for customer-facing interface
- [ ] All text in Vietnamese
- [ ] Responsive design (mobile-friendly)
- [ ] Accessible and user-friendly

**Business Rules:**
- Services are branch-specific
- Appointment booking requires customer account
- Cancellation policies apply based on business rules

**Design Requirements:**
- Use design system Card components for service display
- Use design system Form components for booking
- Use design system Button components
- Follow brand color palette
- Apply "Helpful Professional" tone - friendly, clear
- Mobile-first responsive design

**Success Criteria:**
- Service browsing: < 2 seconds to load
- Booking completion: < 3 minutes
- 30%+ of customers use web interface

**RICE Score:** 180 (Reach: 200, Impact: 1.5, Confidence: 90%, Effort: 3)

---

### US-10.7: Customer - Loyalty Points and Promotions (Web)

**As a** Customer  
**I want to** view my loyalty points and promotions using the web interface  
**So that** I can track my rewards and see available promotions

**Acceptance Criteria:**
- [ ] Can view current points balance
- [ ] Can view points history (earned, redeemed)
- [ ] Can view membership tier and benefits
- [ ] Can view available promotions
- [ ] Can view promotion details and terms
- [ ] Can view voucher codes (if applicable)
- [ ] UI uses design system components (cards, badges, lists)
- [ ] UI follows brand guidelines for customer interface
- [ ] All text in Vietnamese
- [ ] Responsive design
- [ ] Visual and engaging design

**Business Rules:**
- Points are earned from bill totals
- Membership tier is based on total points
- Promotions are active and applicable to customer

**Design Requirements:**
- Use design system Card components for points display
- Use design system Badge components for membership tier
- Use design system List components for history
- Follow brand color palette (Gold for points, Teal for promotions)
- Apply "Helpful Professional" tone - encouraging, clear
- Visual design that highlights rewards

**Success Criteria:**
- Points view load: < 2 seconds
- 30%+ of customers view points via web
- Zero errors in points display

**RICE Score:** 150 (Reach: 200, Impact: 1.5, Confidence: 90%, Effort: 2)

---

## Design Guidelines Summary

**All UI implementations must:**
1. Use design system components (buttons, forms, cards, tables, navigation)
2. Follow brand color palette (Deep Navy, Teal, Gold)
3. Use Inter font with proper typography scale
4. Apply "Confident Efficiency" mood
5. Use "Helpful Professional" tone
6. Support Vietnamese language
7. Meet WCAG 2.1 AA accessibility standards
8. Be responsive (desktop, tablet, mobile browsers)
9. Support Progressive Web App (PWA) features

**Reference Documents:**
- [Brand Guidelines](../../../shared/assets/brand-guidelines/README.md)
- [Design System](../../../shared/assets/ui-ux/design-system/README.md)
- [Color Palette](../../../shared/assets/brand-guidelines/color-palette.md)
- [Typography](../../../shared/assets/brand-guidelines/typography.md)
- [UI/UX Mood & Tone](../../../shared/assets/brand-guidelines/ui-ux-mood-tone.md)

---

*All user stories must be implemented following design guidelines and using design system components. This is web-based (responsive), not native mobile apps.*


