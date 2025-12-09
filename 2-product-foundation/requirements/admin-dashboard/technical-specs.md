# Technical Specifications: Admin Dashboard & System Management

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

Technical requirements and specifications for the Admin Dashboard & System Management epic. This document defines APIs, database schema, frontend components, and performance requirements. All UI implementations must use design system components.

## Frontend Requirements

### Design System Compliance

**MANDATORY:** All frontend code must:
- Use design system components from `shared/assets/ui-ux/design-system/`
- Follow brand guidelines from `shared/assets/brand-guidelines/`
- Use design tokens for colors, spacing, typography
- Support Vietnamese language
- Meet WCAG 2.1 AA accessibility standards

**Component Library:**
- Framework: Next.js 14+ with Tailwind CSS
- UI Library: shadcn/ui (customizable, accessible)
- Styling: Tailwind CSS with design tokens

### Frontend Page Structure

**See [Frontend Views & Actions](frontend-views-actions.md) for complete page specifications.**

**Route Structure:**
```
/admin
├── /dashboard          - Admin dashboard overview
├── /users              - User management list
│   ├── /new            - Create new user
│   └── /[id]           - View/Edit user details
├── /roles              - Role & permission management
│   ├── /new            - Create new role
│   └── /[id]           - View/Edit role details
├── /settings            - System settings
│   ├── /general        - General settings
│   ├── /notifications   - Notification settings
│   ├── /security        - Security settings
│   └── /business        - Business settings
├── /organization        - Organization/Tenant settings
└── /activity            - Activity logs & system logs
```

**Page Components:**
- `/admin/dashboard` - Dashboard with metrics and activity feed
- `/admin/users` - User list with search, filters, and actions
- `/admin/users/new` - Create user form
- `/admin/users/[id]` - Edit user form with activity tab
- `/admin/roles` - Role list
- `/admin/roles/new` - Create role form with permission selection
- `/admin/roles/[id]` - Edit role form
- `/admin/settings` - Settings with category tabs
- `/admin/organization` - Organization profile and settings
- `/admin/activity` - Activity logs with filters and export

### Key UI Components

**From Design System:**
- Tables (for user lists, logs)
- Forms (for user creation, settings)
- Cards (for dashboard widgets, role display)
- Buttons (for actions)
- Navigation (for admin menu)
- Filters and Search (for data filtering)
- Status Indicators (for user status, system health)
- Tabs (for settings categories, user details)
- Dialogs (for confirmations)
- Toasts (for notifications)

## API Endpoints

### User Management

**GET /api/admin/users**
- List all users with filters
- Query params: `role?`, `branchId?`, `status?`, `search?`, `page?`, `limit?`
- Response: `{ users: [...], total, page, limit }`
- Auth: Admin only

**POST /api/admin/users**
- Create new user
- Request body: `{ name, email, phone, role, branchIds: [] }`
- Response: `{ id, name, email, role, createdAt }`
- Auth: Admin only

**GET /api/admin/users/:id**
- Get user details
- Response: `{ id, name, email, phone, role, branches, status, createdAt }`
- Auth: Admin only

**PUT /api/admin/users/:id**
- Update user
- Request body: `{ name?, email?, phone?, role?, branchIds?: [] }`
- Response: `{ success, user }`
- Auth: Admin only

**DELETE /api/admin/users/:id**
- Deactivate user (soft delete)
- Response: `{ success }`
- Auth: Admin only

**POST /api/admin/users/:id/reactivate**
- Reactivate deactivated user
- Response: `{ success, user }`
- Auth: Admin only

### Role & Permission Management

**GET /api/admin/roles**
- List all roles
- Response: `{ roles: [{ id, name, permissions: [] }] }`
- Auth: Admin only

**GET /api/admin/roles/:id**
- Get role details with permissions
- Response: `{ id, name, permissions: [...], description }`
- Auth: Admin only

**POST /api/admin/roles**
- Create custom role
- Request body: `{ name, permissions: [], description? }`
- Response: `{ id, name, permissions }`
- Auth: Admin only

**PUT /api/admin/roles/:id**
- Update role permissions
- Request body: `{ permissions: [] }`
- Response: `{ success, role }`
- Auth: Admin only

**GET /api/admin/permissions**
- List all available permissions
- Response: `{ permissions: [{ id, name, description, category }] }`
- Auth: Admin only

### System Settings

**GET /api/admin/settings**
- Get all system settings
- Response: `{ settings: { general: {...}, notifications: {...}, security: {...}, business: {...} } }`
- Auth: Admin only

**PUT /api/admin/settings/general**
- Update general settings
- Request body: `{ organizationName?, logo?, timezone?, language? }`
- Response: `{ success, settings }`
- Auth: Admin only

**PUT /api/admin/settings/notifications**
- Update notification settings
- Request body: `{ emailEnabled?, smsEnabled?, emailTemplates?: {...} }`
- Response: `{ success, settings }`
- Auth: Admin only

**PUT /api/admin/settings/security**
- Update security settings
- Request body: `{ passwordPolicy?, sessionTimeout?, twoFactorEnabled? }`
- Response: `{ success, settings }`
- Auth: Admin only

**PUT /api/admin/settings/business**
- Update business settings
- Request body: `{ currency?, dateFormat?, timeFormat?, language? }`
- Response: `{ success, settings }`
- Auth: Admin only

### Organization/Tenant Settings

**GET /api/admin/organization**
- Get organization profile
- Response: `{ id, name, address, contactInfo, logo, settings }`
- Auth: Admin only

**PUT /api/admin/organization**
- Update organization profile
- Request body: `{ name?, address?, contactInfo?, logo? }`
- Response: `{ success, organization }`
- Auth: Admin only

**POST /api/admin/organization/logo**
- Upload organization logo
- Request: multipart/form-data with image file
- Response: `{ success, logoUrl }`
- Auth: Admin only

### System Activity & Logs

**GET /api/admin/activity**
- Get activity log
- Query params: `userId?`, `actionType?`, `dateFrom?`, `dateTo?`, `page?`, `limit?`
- Response: `{ activities: [...], total, page, limit }`
- Auth: Admin only

**GET /api/admin/logs**
- Get system logs
- Query params: `level?`, `dateFrom?`, `dateTo?`, `search?`, `page?`, `limit?`
- Response: `{ logs: [...], total, page, limit }`
- Auth: Admin only

**GET /api/admin/logs/export**
- Export logs as CSV
- Query params: `level?`, `dateFrom?`, `dateTo?`
- Response: CSV file download
- Auth: Admin only

### Admin Dashboard

**GET /api/admin/dashboard/metrics**
- Get dashboard metrics
- Response: `{ users: { total, active, inactive }, branches: { total, active }, activity: { today, thisWeek }, systemHealth: { status, uptime } }`
- Auth: Admin only

**GET /api/admin/dashboard/activity**
- Get recent activity feed
- Query params: `limit?` (default: 10)
- Response: `{ activities: [...] }`
- Auth: Admin only

## Database Schema

### User Entity (Extended)

```typescript
{
  id: string;
  tenantId: string;
  name: string;
  email: string;
  phone?: string;
  role: 'ADMIN' | 'CASHIER' | 'WAREHOUSE_MANAGER';
  branchIds: string[];
  status: 'ACTIVE' | 'INACTIVE';
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Role Entity

```typescript
{
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  permissions: string[];
  isSystem: boolean; // System roles cannot be deleted
  createdAt: Date;
  updatedAt: Date;
}
```

### SystemSettings Entity

```typescript
{
  id: string;
  tenantId: string;
  category: 'GENERAL' | 'NOTIFICATIONS' | 'SECURITY' | 'BUSINESS';
  settings: Record<string, any>;
  updatedBy: string;
  updatedAt: Date;
}
```

### Organization Entity

```typescript
{
  id: string;
  name: string;
  address?: Address;
  contactInfo?: ContactInfo;
  logo?: string;
  settings: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
```

### ActivityLog Entity

```typescript
{
  id: string;
  tenantId: string;
  userId: string;
  actionType: string;
  resourceType: string;
  resourceId?: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}
```

## Performance Requirements

### Response Times
- User list load: < 2 seconds
- Dashboard load: < 2 seconds
- Settings save: < 1 second
- Activity log load: < 3 seconds
- Log export: < 10 seconds

### Scalability
- Support 1000+ users per tenant
- Support 100+ branches per tenant
- Activity log retention: 90 days
- System log retention: 30 days

## Security Requirements

### Access Control
- All endpoints require Admin role
- Tenant isolation enforced
- Audit trail for all admin operations
- Sensitive data masked in logs

### Data Protection
- Passwords never logged
- Email addresses masked in activity logs (except for admins)
- IP addresses logged for security audit
- All changes tracked with user and timestamp

## Frontend Implementation Guidelines

### Component Usage

**User Management:**
```typescript
// Use design system Table component
import { Table } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

// Follow design system patterns
// Use brand colors: Deep Navy for primary, Teal for actions
// Use Inter font with proper typography scale
```

**Dashboard:**
```typescript
// Use design system Dashboard Widgets
import { DashboardWidget } from '@/components/dashboard/widget'
import { Grid } from '@/components/ui/grid'

// Follow design system layout patterns
// Use design tokens for spacing and colors
```

### Design Guidelines Reference

**Must Follow:**
- [Brand Guidelines](../../../shared/assets/brand-guidelines/README.md)
- [Design System](../../../shared/assets/ui-ux/design-system/README.md)
- [Color Palette](../../../shared/assets/brand-guidelines/color-palette.md)
- [Typography](../../../shared/assets/brand-guidelines/typography.md)

## Frontend Implementation Details

### File Structure

**Next.js App Router Structure:**
```
frontend/src/app/admin/
├── layout.tsx              - Admin layout with navigation
├── dashboard/
│   └── page.tsx            - Dashboard page
├── users/
│   ├── page.tsx            - User list page
│   ├── new/
│   │   └── page.tsx        - Create user page
│   └── [id]/
│       └── page.tsx        - Edit user page
├── roles/
│   ├── page.tsx            - Role list page
│   ├── new/
│   │   └── page.tsx        - Create role page
│   └── [id]/
│       └── page.tsx        - Edit role page
├── settings/
│   ├── page.tsx            - Settings index (redirects to general)
│   ├── general/
│   │   └── page.tsx        - General settings
│   ├── notifications/
│   │   └── page.tsx        - Notification settings
│   ├── security/
│   │   └── page.tsx        - Security settings
│   └── business/
│       └── page.tsx        - Business settings
├── organization/
│   └── page.tsx            - Organization settings
└── activity/
    └── page.tsx            - Activity logs
```

**Component Structure:**
```
frontend/src/components/admin/
├── dashboard/
│   ├── dashboard-widgets.tsx
│   ├── metrics-card.tsx
│   └── activity-feed.tsx
├── users/
│   ├── user-list.tsx
│   ├── user-form.tsx
│   ├── user-filters.tsx
│   └── user-table.tsx
├── roles/
│   ├── role-list.tsx
│   ├── role-form.tsx
│   └── permission-selector.tsx
├── settings/
│   ├── settings-tabs.tsx
│   ├── general-settings-form.tsx
│   ├── notification-settings-form.tsx
│   ├── security-settings-form.tsx
│   └── business-settings-form.tsx
├── organization/
│   ├── organization-form.tsx
│   └── logo-upload.tsx
└── activity/
    ├── activity-log-table.tsx
    ├── activity-filters.tsx
    └── log-export-button.tsx
```

### API Integration

**API Client Structure:**
```typescript
// frontend/src/lib/api/admin.ts
export const adminApi = {
  users: {
    list: (filters) => GET('/api/admin/users', filters),
    get: (id) => GET(`/api/admin/users/${id}`),
    create: (data) => POST('/api/admin/users', data),
    update: (id, data) => PUT(`/api/admin/users/${id}`, data),
    deactivate: (id) => DELETE(`/api/admin/users/${id}`),
    reactivate: (id) => POST(`/api/admin/users/${id}/reactivate`),
  },
  roles: {
    list: () => GET('/api/admin/roles'),
    get: (id) => GET(`/api/admin/roles/${id}`),
    create: (data) => POST('/api/admin/roles', data),
    update: (id, data) => PUT(`/api/admin/roles/${id}`, data),
    delete: (id) => DELETE(`/api/admin/roles/${id}`),
  },
  permissions: {
    list: () => GET('/api/admin/permissions'),
  },
  settings: {
    get: () => GET('/api/admin/settings'),
    updateGeneral: (data) => PUT('/api/admin/settings/general', data),
    updateNotifications: (data) => PUT('/api/admin/settings/notifications', data),
    updateSecurity: (data) => PUT('/api/admin/settings/security', data),
    updateBusiness: (data) => PUT('/api/admin/settings/business', data),
  },
  organization: {
    get: () => GET('/api/admin/organization'),
    update: (data) => PUT('/api/admin/organization', data),
    uploadLogo: (file) => POST('/api/admin/organization/logo', file),
  },
  activity: {
    list: (filters) => GET('/api/admin/activity-logs', filters),
    export: (filters) => GET('/api/admin/logs/export', filters),
  },
  dashboard: {
    metrics: () => GET('/api/admin/dashboard'),
    activity: (limit) => GET('/api/admin/dashboard/activity', { limit }),
  },
};
```

### State Management

**Recommended Approach:**
- React Server Components for data fetching (Next.js 14+)
- React Query / SWR for client-side data fetching and caching
- Form state: React Hook Form with Zod validation
- Global state: Context API or Zustand (if needed)

### Form Validation

**Validation Schema (Zod):**
```typescript
// Example: User form validation
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Tên là bắt buộc'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().optional(),
  role: z.enum(['ADMIN', 'CASHIER', 'WAREHOUSE_MANAGER']),
  branchIds: z.array(z.string()).optional(),
  password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
});
```

### Error Handling

**Error Handling Pattern:**
- API errors: Toast notifications with Vietnamese messages
- Form validation: Inline error messages
- Network errors: Retry mechanism with user feedback
- 401/403 errors: Redirect to login or show access denied
- Missing endpoints: Show "Tính năng này đang được phát triển" message instead of error

### Progressive Development

**For Incomplete Features:**
- When API endpoint not available: Show development message
- When component not implemented: Use Empty State component
- Standard message: "Tính năng này đang được phát triển"
- Optional description: "Chúng tôi đang làm việc để mang tính năng này đến với bạn sớm nhất."
- Maintain page structure and navigation
- Use consistent styling across all development messages

**Component:**
```tsx
// Reusable component for under development state
import { EmptyState } from '@/components/ui/empty-state'

export function UnderDevelopment() {
  return (
    <EmptyState
      title="Tính năng này đang được phát triển"
      description="Chúng tôi đang làm việc để mang tính năng này đến với bạn sớm nhất."
      icon={<ConstructionIcon />}
    />
  )
}
```

### Loading States

**Loading Patterns:**
- Skeleton screens for page loads
- Button loading states for actions
- Progress indicators for long operations
- Optimistic updates where appropriate

## Related Documents

- **[Frontend Views & Actions](frontend-views-actions.md)** - Complete page specifications and UI details
- **[User Stories](user-stories.md)** - Feature requirements
- **[Success Metrics](success-metrics.md)** - Success criteria
- **[Domain Specs](../../../3-technical/3.1-system-foundation/architecture/domain-specs.md)** - Domain model

---

*All frontend implementations must use design system components and follow brand guidelines. See frontend-views-actions.md for detailed page specifications.*

