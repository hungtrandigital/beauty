# Technical Specifications: Web Application for Staff, Branch Head & Customer

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

Technical requirements and specifications for the Web Application epic. This document defines APIs, database schema, frontend architecture, and performance requirements. All UI implementations must use design system components.

## Frontend Requirements

### Design System Compliance

**MANDATORY:** All frontend code must:
- Use design system components from `shared/assets/ui-ux/design-system/`
- Follow brand guidelines from `shared/assets/brand-guidelines/`
- Use design tokens for colors, spacing, typography
- Support Vietnamese language
- Meet WCAG 2.1 AA accessibility standards
- Be responsive (desktop, tablet, mobile browsers)

### Technology Stack

**Framework:**
- Next.js 14+ (React framework)
- TypeScript
- Tailwind CSS with design tokens
- shadcn/ui component library

**Features:**
- Server-Side Rendering (SSR) for performance
- Progressive Web App (PWA) support
- Offline capability (Service Workers for staff)
- Real-time updates (WebSockets or polling)

### Key UI Components

**From Design System:**
- Tables (for reports, lists, history)
- Forms (for bill creation, customer management, booking)
- Cards (for services, promotions, dashboard widgets)
- Buttons (for actions)
- Navigation (role-based navigation)
- Filters and Search (for data filtering)
- Status Indicators (for bill status, inventory levels)
- Dashboard Widgets (for Branch Head dashboard)

## API Endpoints

### Staff Interface APIs

**Bill Management:**
- `GET /api/staff/bills` - List bills with filters
- `POST /api/staff/bills` - Create new bill
- `GET /api/staff/bills/:id` - Get bill details
- `PUT /api/staff/bills/:id` - Update bill
- `POST /api/staff/bills/:id/payment` - Process payment
- `POST /api/staff/bills/:id/print` - Print bill
- `GET /api/staff/bills/offline` - Get offline bills (for sync)

**Customer Management:**
- `GET /api/staff/customers` - Search customers
- `POST /api/staff/customers` - Create customer
- `GET /api/staff/customers/:id` - Get customer details
- `PUT /api/staff/customers/:id` - Update customer
- `GET /api/staff/customers/:id/history` - Get customer history

**Inventory Operations (Warehouse Manager):**
- `POST /api/staff/inventory/import-requests` - Create import request
- `POST /api/staff/inventory/export-requests` - Create export request
- `GET /api/staff/inventory/central-warehouse` - View central warehouse inventory
- `GET /api/staff/inventory/branches/:branchId` - View branch inventory

### Branch Head Interface APIs

**Dashboard:**
- `GET /api/branch-head/dashboard/metrics` - Get dashboard metrics
- `GET /api/branch-head/dashboard/revenue` - Get revenue data
- `GET /api/branch-head/dashboard/activity` - Get recent activity

**Reports:**
- `GET /api/branch-head/reports/revenue` - Revenue reports
- `GET /api/branch-head/reports/products` - Product sales reports
- `GET /api/branch-head/reports/services` - Service revenue reports
- `GET /api/branch-head/reports/staff` - Staff performance reports
- `GET /api/branch-head/reports/export` - Export reports

### Customer Interface APIs

**Services:**
- `GET /api/customer/services` - Browse services
- `GET /api/customer/services/:id` - Get service details
- `GET /api/customer/services/availability` - Check service availability

**Booking:**
- `POST /api/customer/bookings` - Create booking
- `GET /api/customer/bookings` - List bookings
- `GET /api/customer/bookings/:id` - Get booking details
- `DELETE /api/customer/bookings/:id` - Cancel booking

**Loyalty:**
- `GET /api/customer/loyalty/points` - Get points balance
- `GET /api/customer/loyalty/history` - Get points history
- `GET /api/customer/loyalty/tier` - Get membership tier
- `GET /api/customer/promotions` - Get available promotions

## Database Schema

### Bill Entity (Extended for Web)

```typescript
{
  id: string;
  tenantId: string;
  branchId: string;
  customerId?: string;
  items: BillItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentStatus: 'PENDING' | 'PAID' | 'PARTIAL';
  payments: Payment[];
  status: 'DRAFT' | 'CONFIRMED' | 'CANCELLED';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  syncedAt?: Date; // For offline sync
  isOffline: boolean;
}
```

### Booking Entity

```typescript
{
  id: string;
  tenantId: string;
  branchId: string;
  customerId: string;
  serviceId: string;
  scheduledAt: Date;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Performance Requirements

### Response Times
- Page load (initial): < 3 seconds
- Page load (cached): < 1 second
- Bill creation: < 2 seconds
- Dashboard load: < 2 seconds
- Report generation: < 5 seconds
- Service browsing: < 2 seconds

### Scalability
- Support 1000+ concurrent users per tenant
- Support offline mode for 100+ bills
- Real-time updates with < 1 second latency
- PWA offline support for 7 days

### Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Offline Capability

### Staff Offline Features
- Bill creation (saved locally)
- Customer search (cached data)
- Offline bill sync when online
- Conflict resolution for sync

### PWA Features
- Service Worker for offline support
- App manifest for installable PWA
- Push notifications (future)
- Background sync

## Security Requirements

### Access Control
- Role-based access control (RBAC)
- Tenant isolation enforced
- Branch-level access control
- Session management

### Data Protection
- HTTPS only
- Secure authentication (JWT)
- CSRF protection
- XSS prevention
- Input validation

## Frontend Implementation Guidelines

### Component Usage

**Staff Bill Creation:**
```typescript
// Use design system Form components
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'

// Follow design system patterns
// Use brand colors: Deep Navy for primary, Teal for actions
// Use Inter font with proper typography scale
// Responsive grid system
```

**Branch Head Dashboard:**
```typescript
// Use design system Dashboard Widgets
import { DashboardWidget } from '@/components/dashboard/widget'
import { Grid } from '@/components/ui/grid'

// Follow design system layout patterns
// Use design tokens for spacing and colors
```

**Customer Service Browsing:**
```typescript
// Use design system Card components
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Follow brand guidelines for customer-facing interface
// Mobile-first responsive design
```

### Responsive Design

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Responsive Patterns:**
- Mobile-first approach
- Flexible grid system
- Touch-friendly interactions
- Optimized images

### PWA Implementation

**Service Worker:**
- Cache static assets
- Cache API responses
- Offline fallback pages
- Background sync

**App Manifest:**
- App name and icons
- Theme colors (brand colors)
- Display mode
- Start URL

## Design Guidelines Reference

**Must Follow:**
- [Brand Guidelines](../../../shared/assets/brand-guidelines/README.md)
- [Design System](../../../shared/assets/ui-ux/design-system/README.md)
- [Color Palette](../../../shared/assets/brand-guidelines/color-palette.md)
- [Typography](../../../shared/assets/brand-guidelines/typography.md)
- [UI/UX Mood & Tone](../../../shared/assets/brand-guidelines/ui-ux-mood-tone.md)

## Related Documents

- **[User Stories](user-stories.md)** - Feature requirements
- **[Success Metrics](success-metrics.md)** - Success criteria
- **[Domain Specs](../../../3-technical/3.1-system-foundation/architecture/domain-specs.md)** - Domain model

---

*All frontend implementations must use design system components and follow brand guidelines. This is web-based (responsive), not native mobile apps.*

