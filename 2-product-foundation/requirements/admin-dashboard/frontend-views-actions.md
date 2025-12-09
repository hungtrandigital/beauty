# Frontend Views & Actions: Admin Dashboard

**Last Updated:** 2025-01-XX  
**Version:** 1.0  
**Epic:** Epic 9 - Admin Dashboard & System Management

## Overview

This document defines all frontend views (pages) and actions (CRUD operations) for the Admin Dashboard. Each view includes detailed UI specifications, component requirements, and action flows. All implementations must follow design guidelines and use design system components.

## Design Guidelines Compliance

**MANDATORY:** All views must:
- Use design system components from `shared/assets/ui-ux/design-system/`
- Follow brand guidelines from `shared/assets/brand-guidelines/`
- Use design tokens for colors, spacing, typography
- Support Vietnamese language
- Meet WCAG 2.1 AA accessibility standards
- Apply "Confident Efficiency" mood and "Helpful Professional" tone

## Progressive Development Pattern

**For incomplete features/actions:** When a view or action is not yet implemented, display a clear message in Vietnamese indicating the feature is under development.

**Standard Message:**
- **Vietnamese:** "Tính năng này đang được phát triển"
- **English:** "This feature is under development"

**Implementation Pattern:**
- Use design system Empty State or Alert component
- Display message prominently but not intrusively
- Maintain page structure and navigation
- Allow users to navigate away easily
- Use consistent styling across all "under development" messages

**When to Use:**
- Backend API endpoint not yet available
- Frontend component not yet implemented
- Feature planned but not in current phase
- Action button/link that will be implemented later

**Example Implementation:**
```tsx
// For incomplete pages/views
<EmptyState
  title="Tính năng này đang được phát triển"
  description="Chúng tôi đang làm việc để mang tính năng này đến với bạn sớm nhất."
  icon={<ConstructionIcon />}
/>

// For incomplete actions/buttons
<Button disabled>
  Tính năng này đang được phát triển
</Button>
```

## Admin Pages Structure

### Route Structure

```
/admin
├── /dashboard          - Admin dashboard overview
├── /users              - User management
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

## Page Specifications

### 1. Admin Dashboard (`/admin/dashboard`)

**Purpose:** Overview of system status, key metrics, and quick actions.

**Layout:**
- Header with page title "Tổng quan"
- Grid layout with dashboard widgets
- Recent activity feed
- Quick action buttons

**Components:**
- Dashboard Widgets (from design system)
- Grid System (from design system)
- Activity Feed component
- Button components for quick actions

**Metrics Display:**
- Total Users (with active/inactive breakdown)
- Total Branches (with active count)
- Today's Activity Count
- This Week's Activity Count
- System Health Status
- System Uptime

**Actions:**
- View metrics (read-only)
- Navigate to user management
- Navigate to settings
- View recent activity
- Refresh dashboard data

**API Endpoints:**
- `GET /api/admin/dashboard` - Get dashboard metrics
- `GET /api/admin/dashboard/activity` - Get recent activity

**Progressive Development:**
- If metrics API not available: Show "Tính năng này đang được phát triển" message
- If activity feed not available: Show placeholder with development message
- Maintain page structure and navigation even when data unavailable

**Design Requirements:**
- Use design system Dashboard Widgets
- Follow brand color palette (Deep Navy for primary, Teal for metrics)
- Use Inter font with proper typography scale
- Responsive grid layout
- Loading states for async data

---

### 2. User Management List (`/admin/users`)

**Purpose:** View and manage all users in the system.

**Layout:**
- Header with page title "Quản lý người dùng" and "Tạo người dùng" button
- Search bar and filters
- Data table with user list
- Pagination controls

**Components:**
- Table component (from design system)
- Search component (from design system)
- Filter components (from design system)
- Button components
- Badge components for status
- Pagination component

**Table Columns:**
- Name (with avatar if available)
- Email
- Phone
- Role (with badge)
- Branches (comma-separated list)
- Status (Active/Inactive badge)
- Last Login (formatted date)
- Actions (Edit, Deactivate/Reactivate buttons)

**Filters:**
- Role filter (dropdown)
- Branch filter (multi-select)
- Status filter (Active/Inactive/All)
- Search by name, email, phone

**Actions:**
- View user list (with pagination)
- Search users
- Filter users
- Navigate to create user (`/admin/users/new`)
- Navigate to edit user (`/admin/users/[id]`)
- Deactivate user (with confirmation)
- Reactivate user (with confirmation)
- Export user list (future)

**API Endpoints:**
- `GET /api/admin/users` - List users with filters
- `DELETE /api/admin/users/:id` - Deactivate user
- `POST /api/admin/users/:id/reactivate` - Reactivate user

**Design Requirements:**
- Use design system Table component
- Follow design system spacing and typography
- Status badges use brand colors (Teal for active, Gray for inactive)
- Responsive table (horizontal scroll on mobile)
- Empty state when no users found

---

### 3. Create User (`/admin/users/new`)

**Purpose:** Create a new user account.

**Layout:**
- Header with page title "Tạo người dùng mới" and back button
- Form with user fields
- Action buttons (Save, Cancel)

**Components:**
- Form components (from design system)
- Input components (text, email, phone, select)
- Button components
- Card component for form container
- Alert component for validation errors

**Form Fields:**
- Name (required, text input)
- Email (required, email input with validation)
- Phone (optional, phone input with format validation)
- Role (required, select dropdown with roles)
- Branches (multi-select, required if role is not Admin)
- Password (required, password input with strength indicator)
- Confirm Password (required, password input)

**Actions:**
- Create user (with validation)
- Cancel (navigate back to user list)
- Validate form fields
- Show validation errors

**API Endpoints:**
- `POST /api/admin/users` - Create new user

**Design Requirements:**
- Use design system Form components
- Follow form layout patterns from design system
- Show inline validation errors
- Password strength indicator
- Success toast notification after creation
- Redirect to user list after successful creation

---

### 4. Edit User (`/admin/users/[id]`)

**Purpose:** View and edit user details.

**Layout:**
- Header with page title "Chỉnh sửa người dùng" and back button
- Tabs: "Thông tin", "Hoạt động"
- Form with user fields (in Info tab)
- Activity log table (in Activity tab)

**Components:**
- Form components (from design system)
- Tabs component (from design system)
- Table component for activity log
- Button components
- Card component

**Form Fields:**
- Name (required, text input)
- Email (required, email input, read-only if user has logged in)
- Phone (optional, phone input)
- Role (required, select dropdown)
- Branches (multi-select)
- Status (Active/Inactive toggle)
- Created At (read-only, formatted date)
- Last Login (read-only, formatted date or "Chưa đăng nhập")

**Activity Tab:**
- Table showing user activity log
- Columns: Date, Action, Resource, Details
- Pagination

**Actions:**
- Update user (with validation)
- Deactivate/Reactivate user (with confirmation)
- Cancel (navigate back to user list)
- View activity log
- Navigate to activity log page with user filter

**API Endpoints:**
- `GET /api/admin/users/:id` - Get user details
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Deactivate user
- `POST /api/admin/users/:id/reactivate` - Reactivate user
- `GET /api/admin/activity-logs?userId=:id` - Get user activity

**Design Requirements:**
- Use design system Tabs component
- Form follows design system patterns
- Read-only fields clearly indicated
- Status toggle uses design system Switch component
- Activity log uses design system Table component

---

### 5. Role Management List (`/admin/roles`)

**Purpose:** View and manage roles and permissions.

**Layout:**
- Header with page title "Quản lý vai trò" and "Tạo vai trò" button
- List of roles (cards or table)
- Each role shows permissions

**Components:**
- Card components (from design system) or Table component
- Button components
- Badge components for system roles
- Permission list component

**Role Display:**
- Role name
- Description
- System role indicator (badge for system roles)
- Permission count
- Actions (Edit, Delete - disabled for system roles)

**Actions:**
- View role list
- Navigate to create role (`/admin/roles/new`)
- Navigate to edit role (`/admin/roles/[id]`)
- Delete custom role (with confirmation, disabled for system roles)

**API Endpoints:**
- `GET /api/admin/roles` - List all roles
- `DELETE /api/admin/roles/:id` - Delete role

**Design Requirements:**
- Use design system Card components for role display
- System roles clearly marked with badge
- Permission count displayed prominently
- Responsive grid layout

---

### 6. Create Role (`/admin/roles/new`)

**Purpose:** Create a custom role with specific permissions.

**Layout:**
- Header with page title "Tạo vai trò mới" and back button
- Form with role fields
- Permission selection (grouped by category)
- Action buttons

**Components:**
- Form components (from design system)
- Checkbox components (from design system)
- Card components for permission groups
- Button components

**Form Fields:**
- Role Name (required, text input)
- Description (optional, textarea)
- Permissions (required, checkbox groups by category):
  - Users (create, update, delete, view)
  - Bills (create, update, delete, view)
  - Inventory (manage, approve, view)
  - Products (manage, view)
  - Services (manage, view)
  - Promotions (manage, view)
  - Customers (manage, view)
  - Reports (view)
  - Settings (manage, view)

**Actions:**
- Create role (with validation)
- Select/Deselect all permissions in category
- Cancel (navigate back to role list)
- Validate form (at least one permission required)

**API Endpoints:**
- `GET /api/admin/permissions` - Get all available permissions
- `POST /api/admin/roles` - Create new role

**Design Requirements:**
- Use design system Form components
- Permission groups in Card components
- Checkboxes follow design system patterns
- Clear visual hierarchy for permission categories
- Success toast and redirect after creation

---

### 7. Edit Role (`/admin/roles/[id]`)

**Purpose:** View and edit role permissions.

**Layout:**
- Header with page title "Chỉnh sửa vai trò" and back button
- Form with role fields (read-only for system roles)
- Permission selection (same as create)
- Action buttons

**Components:**
- Form components (from design system)
- Checkbox components (from design system)
- Card components
- Button components
- Alert component (if system role, show read-only message)

**Form Fields:**
- Role Name (read-only for system roles)
- Description (editable)
- Permissions (editable, same structure as create)

**Actions:**
- Update role (with validation, disabled for system roles)
- Cancel (navigate back to role list)
- View permission descriptions

**API Endpoints:**
- `GET /api/admin/roles/:id` - Get role details
- `PUT /api/admin/roles/:id` - Update role

**Design Requirements:**
- System roles clearly marked as read-only
- Permission selection same as create page
- Success toast after update

---

### 8. System Settings (`/admin/settings`)

**Purpose:** Configure system settings organized by category.

**Layout:**
- Header with page title "Cài đặt hệ thống"
- Tabs for categories: General, Notifications, Security, Business
- Form for each category
- Save button for each category

**Components:**
- Tabs component (from design system)
- Form components (from design system)
- Input components (text, number, select, switch, textarea)
- Button components
- Card components for setting groups

**Settings Categories:**

#### General Settings (`/admin/settings/general`)
- Organization Name (text input)
- Logo Upload (image upload component)
- Timezone (select dropdown)
- Language (select dropdown, default: Vietnamese)

#### Notification Settings (`/admin/settings/notifications`)
- Email Notifications (switch)
- SMS Notifications (switch)
- Email Templates (textarea for custom templates)

#### Security Settings (`/admin/settings/security`)
- Password Policy (select: Basic/Medium/Strong)
- Session Timeout (number input, minutes)
- Two-Factor Authentication (switch, disabled for MVP)

#### Business Settings (`/admin/settings/business`)
- Currency (select dropdown, default: VND)
- Date Format (select: DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD)
- Time Format (select: 12h, 24h)
- Language (select, default: Vietnamese)

**Actions:**
- View settings (load current values)
- Update settings per category
- Save settings (with confirmation)
- Reset to defaults (with confirmation)

**API Endpoints:**
- `GET /api/admin/settings` - Get all settings
- `PUT /api/admin/settings/general` - Update general settings
- `PUT /api/admin/settings/notifications` - Update notification settings
- `PUT /api/admin/settings/security` - Update security settings
- `PUT /api/admin/settings/business` - Update business settings

**Design Requirements:**
- Use design system Tabs component
- Settings grouped in Card components
- Form fields follow design system patterns
- Save button shows loading state
- Success toast after save
- Confirmation dialog for critical settings

---

### 9. Organization Settings (`/admin/organization`)

**Purpose:** Manage organization/tenant profile and settings.

**Layout:**
- Header with page title "Thông tin tổ chức"
- Form with organization fields
- Logo upload section
- Action buttons

**Components:**
- Form components (from design system)
- Image Upload component (from design system)
- Input components
- Button components
- Card component

**Form Fields:**
- Organization Name (required, text input)
- Address (textarea)
- Contact Information:
  - Phone (text input)
  - Email (email input)
  - Website (url input, optional)
- Logo (image upload with preview)
- Subscription/Billing Info (read-only, if applicable)

**Actions:**
- View organization profile
- Update organization information
- Upload logo (with preview and crop if needed)
- Save changes (with confirmation)

**API Endpoints:**
- `GET /api/admin/organization` - Get organization profile
- `PUT /api/admin/organization` - Update organization
- `POST /api/admin/organization/logo` - Upload logo

**Progressive Development:**
- If organization endpoints not available: Show "Tính năng này đang được phát triển" message
- Use Empty State component with development message
- Maintain page structure and navigation

**Design Requirements:**
- Use design system Form components
- Logo upload follows design system Image Upload patterns
- Form validation for required fields
- Success toast after save

---

### 10. Activity Logs (`/admin/activity`)

**Purpose:** View system activity logs and audit trail.

**Layout:**
- Header with page title "Nhật ký hoạt động"
- Filters (date range, user, action type, resource type)
- Data table with activity logs
- Pagination controls
- Export button

**Components:**
- Table component (from design system)
- Filter components (from design system)
- Date picker component (from design system)
- Button components
- Badge components for action types
- Pagination component

**Table Columns:**
- Timestamp (formatted date/time)
- User (name with link to user details)
- Action Type (badge with color coding)
- Resource Type (badge)
- Resource ID (link if applicable)
- Details (expandable row for full details)
- IP Address (optional, for security actions)

**Filters:**
- Date Range (from/to date pickers)
- User (select dropdown)
- Action Type (multi-select)
- Resource Type (multi-select)
- Search (text input for details)

**Actions:**
- View activity logs (with pagination)
- Filter logs
- Search logs
- Export logs (CSV download)
- View log details (expandable row)
- Navigate to related resource (if applicable)

**API Endpoints:**
- `GET /api/admin/activity-logs` - Get activity logs with filters
- `GET /api/admin/logs/export` - Export logs as CSV

**Design Requirements:**
- Use design system Table component
- Action type badges use color coding (Create=Green, Update=Blue, Delete=Red, etc.)
- Expandable rows for details
- Date pickers follow design system patterns
- Export button shows loading state during export
- Empty state when no logs found

---

## Reusable Components

### Under Development Component

**Purpose:** Display consistent message when features are not yet implemented.

**Component:** `UnderDevelopment` or use design system `EmptyState`

**Props:**
```typescript
interface UnderDevelopmentProps {
  title?: string; // Default: "Tính năng này đang được phát triển"
  description?: string; // Default: "Chúng tôi đang làm việc để mang tính năng này đến với bạn sớm nhất."
  icon?: ReactNode; // Optional icon (e.g., ConstructionIcon)
}
```

**Usage:**
```tsx
import { UnderDevelopment } from '@/components/admin/under-development'

// For incomplete pages
export default function OrganizationPage() {
  // If API not available
  if (!organizationApiAvailable) {
    return <UnderDevelopment />
  }
  
  // ... rest of component
}

// Or use EmptyState directly
import { EmptyState } from '@/components/ui/empty-state'

<EmptyState
  title="Tính năng này đang được phát triển"
  description="Chúng tôi đang làm việc để mang tính năng này đến với bạn sớm nhất."
  icon={<ConstructionIcon />}
/>
```

**Styling:**
- Use design system Empty State component
- Follow brand color palette
- Use Inter font
- Maintain consistent spacing

---

## Common UI Patterns

### Navigation

**Admin Navigation Menu:**
- Dashboard
- Users
- Roles
- Settings
- Organization
- Activity Logs

**Navigation Component:**
- Use design system Navigation component
- Active state indication
- Responsive (collapsible on mobile)
- Icon support

### Data Tables

**Common Table Features:**
- Sortable columns
- Pagination
- Row selection (if needed)
- Actions column
- Empty states
- Loading states

**Table Component:**
- Use design system Table component
- Responsive (horizontal scroll on mobile)
- Accessible (keyboard navigation)

### Forms

**Common Form Patterns:**
- Field labels in Vietnamese
- Required field indicators (*)
- Inline validation errors
- Help text for complex fields
- Success/error toast notifications
- Loading states on submit

**Form Component:**
- Use design system Form components
- Follow form layout patterns
- Consistent spacing and typography

### Modals & Dialogs

**Confirmation Dialogs:**
- Used for destructive actions (delete, deactivate)
- Clear action description
- Cancel and Confirm buttons
- Follow design system Dialog component

**Action Modals:**
- Used for quick actions without navigation
- Follow design system Modal component

### Loading States

**Page Loading:**
- Skeleton screens for data tables
- Loading spinner for forms
- Progress indicators for long operations

**Component Loading:**
- Button loading states
- Form submission loading
- Data fetch loading

### Error Handling

**Error States:**
- Inline form validation errors
- Toast notifications for API errors
- Error pages for critical failures
- Empty states with helpful messages

**Error Components:**
- Use design system Alert component
- Use design system Toast component
- Clear error messages in Vietnamese

---

## Responsive Design

### Mobile (< 768px)
- Collapsible navigation menu
- Stacked form layouts
- Horizontal scroll for tables
- Full-width buttons
- Simplified filters

### Tablet (768px - 1024px)
- Side navigation (collapsible)
- Two-column form layouts
- Responsive table with horizontal scroll
- Filter sidebar

### Desktop (> 1024px)
- Full navigation sidebar
- Multi-column layouts
- Full table display
- Side-by-side filters

---

## Accessibility Requirements

### Keyboard Navigation
- All interactive elements keyboard accessible
- Tab order follows visual flow
- Skip links for main content
- Focus indicators visible

### Screen Reader Support
- Semantic HTML elements
- ARIA labels for icons and buttons
- Form field labels properly associated
- Table headers properly associated
- Status announcements for dynamic content

### Color Contrast
- All text meets WCAG 2.1 AA contrast ratios
- Status indicators use icons + color
- Error states use icons + color

---

## Performance Requirements

### Page Load Times
- Dashboard: < 2 seconds
- User list: < 2 seconds
- Settings page: < 1 second
- Activity logs: < 3 seconds

### Interaction Response
- Form submission: < 1 second
- Table pagination: < 500ms
- Filter application: < 500ms
- Search: < 300ms (debounced)

### Optimization
- Lazy load activity logs
- Paginate large lists
- Debounce search inputs
- Cache settings data
- Optimize images (logo uploads)

---

## Related Documents

- **[User Stories](user-stories.md)** - Feature requirements
- **[Technical Specs](technical-specs.md)** - API and technical requirements
- **[Design System](../../../shared/assets/ui-ux/design-system/README.md)** - Component library
- **[Brand Guidelines](../../../shared/assets/brand-guidelines/README.md)** - Design guidelines

---

*All frontend views must be implemented following this specification, using design system components and following brand guidelines.*
