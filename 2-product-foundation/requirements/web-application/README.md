# Product Requirements: Web Application for Staff, Branch Head & Customer

**Last Updated:** 2025-12-09  
**Version:** 1.0  
**Epic:** Epic 10 - Web Application for Staff, Branch Head & Customer

## Overview

This PRD defines requirements for web-based interfaces for Staff (Cashiers, Warehouse Managers), Branch Head (Branch Managers), and Customers. This epic provides web access to system features that complement the mobile app (Epic 8) and admin dashboard (Epic 9). All UI components must follow the design guidelines and design system.

## Business Context

Different user roles need web-based access to system features:
- **Staff (Cashiers, Warehouse Managers):** Need web interface for daily operations (bills, inventory, customer management)
- **Branch Head:** Need web interface for branch management, reports, and oversight
- **Customers:** Need web interface for viewing services, promotions, loyalty points, and booking (complement to mobile app)

## Design Guidelines Compliance

**MANDATORY:** All UI components must follow:
- **[Brand Guidelines](../../../shared/assets/brand-guidelines/README.md)** - Colors, typography, UI/UX mood & tone
- **[Design System](../../../shared/assets/ui-ux/design-system/README.md)** - Components, design tokens, patterns
- **UI Mood:** "Confident Efficiency" - Professional, trustworthy, clear
- **UI Tone:** "Helpful Professional" - Supportive, clear, respectful
- **Accessibility:** WCAG 2.1 AA minimum compliance
- **Vietnamese Language:** All UI text in Vietnamese

## User Roles & Interfaces

### Staff Interface (Cashiers & Warehouse Managers)
- Bill creation and management
- Customer management
- Inventory operations (for Warehouse Managers)
- Service tracking
- Payment processing

### Branch Head Interface
- Branch dashboard with key metrics
- Branch reports and analytics
- Staff performance monitoring
- Branch inventory overview
- Customer management for branch

### Customer Interface (Web)
- Service browsing and viewing
- Promotion viewing
- Loyalty points and membership tier
- Booking/appointment scheduling
- Bill history

## User Stories

See [user-stories.md](user-stories.md) for detailed user stories with acceptance criteria.

**Key User Stories:**
- US-10.1: Staff - Bill creation and management (web)
- US-10.2: Staff - Customer management (web)
- US-10.3: Warehouse Manager - Inventory operations (web)
- US-10.4: Branch Head - Branch dashboard and reports
- US-10.5: Branch Head - Staff performance monitoring
- US-10.6: Customer - Service browsing and booking (web)
- US-10.7: Customer - Loyalty points and promotions (web)

## Success Metrics

See [success-metrics.md](success-metrics.md) for detailed metrics.

**Key Metrics:**
- Staff task completion: < 3 minutes per task
- Branch Head dashboard load: < 2 seconds
- Customer web interface usage: 30%+ of customers
- Web interface adoption: 80%+ of staff using web daily
- Error rate: < 1% for web operations

## Technical Requirements

See [technical-specs.md](technical-specs.md) for detailed technical specifications.

**Key Requirements:**
- Responsive web design (desktop, tablet, mobile)
- Multi-tenant architecture with role-based access
- Real-time updates for collaborative features
- Offline capability (for staff - bill creation)
- Progressive Web App (PWA) support

## Design Requirements

**UI/UX (Must Follow Design Guidelines):**
- Use design system components (buttons, forms, cards, tables, navigation)
- Follow color palette (Deep Navy #1A2B4A, Teal #00A8A8, Gold #D4AF37)
- Use Inter font with proper typography scale
- Apply "Confident Efficiency" mood - clear, organized, professional
- Vietnamese language throughout
- Mobile-responsive design (responsive web, not mobile app)
- Accessible (WCAG 2.1 AA)

**Key UI Components:**
- Dashboard widgets (for Branch Head)
- Data tables (for reports, lists)
- Forms (for bill creation, customer management)
- Navigation (role-based navigation)
- Status indicators and badges

**User Flows:**
- Staff bill creation flow
- Customer service browsing flow
- Branch Head dashboard flow
- Inventory operations flow

## Out of Scope

See [out-of-scope.md](out-of-scope.md) for items explicitly out of scope.

**Not Included:**
- Mobile app features (separate epic - Epic 8)
- Admin dashboard features (separate epic - Epic 9)
- Advanced analytics (separate epic - Epic 7)
- Native mobile apps (this is web-based)

## Related Documents

- **[Product Backlog](../../2.2-product-backlog/backlog.md)** - Epic 10 user stories
- **[Domain Specs](../../../3-technical/3.1-system-foundation/architecture/domain-specs.md)** - Technical domain model
- **[Brand Guidelines](../../../shared/assets/brand-guidelines/README.md)** - Design guidelines
- **[Design System](../../../shared/assets/ui-ux/design-system/README.md)** - UI components and patterns
- **[Mobile App Requirements](../mobile-app/)** - Epic 8 (complementary mobile app)
- **[Implementation Plan](../../../3-technical/3.2-implementation/plans/plan.md)** - Sprint planning

---

*This PRD provides detailed requirements for Web Application interfaces. All UI development must follow design guidelines and use design system components. This is web-based (responsive), not native mobile apps.*

