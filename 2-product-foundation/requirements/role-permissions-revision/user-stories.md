# User Stories: Role Permissions Revision

**Last Updated:** 2025-12-09  
**Version:** 1.0

## User Stories

### US-PERM-1: Admin - View Expanded Permission List

**As an** Admin  
**I want to** view the expanded list of granular permissions  
**So that** I can understand all available permissions for role configuration

**Acceptance Criteria:**
- [ ] Can view all permissions organized by category
- [ ] Can see permission descriptions in Vietnamese
- [ ] Can see which permissions are required for specific features
- [ ] UI shows permission categories clearly
- [ ] Can search/filter permissions

**RICE Score:** 160

---

### US-PERM-2: Admin - Update Default Role Permissions

**As an** Admin  
**I want to** update default permissions for CASHIER and WAREHOUSE_MANAGER roles  
**So that** these roles have appropriate access based on their functions

**Acceptance Criteria:**
- [ ] Can view current default permissions for system roles
- [ ] Can update CASHIER role permissions
- [ ] Can update WAREHOUSE_MANAGER role permissions
- [ ] System validates permission changes
- [ ] Changes apply to all users with that role
- [ ] Permission changes are logged for audit
- [ ] UI shows permission matrix for clarity

**Business Rules:**
- ADMIN role cannot be modified
- System roles (CASHIER, WAREHOUSE_MANAGER) can be customized per tenant
- Permission changes take effect immediately
- All changes are logged

**RICE Score:** 200

---

### US-PERM-3: Admin - Create Custom Role with Granular Permissions

**As an** Admin  
**I want to** create custom roles with specific permission sets  
**So that** I can create roles like "Branch Head" or "Staff" with appropriate access

**Acceptance Criteria:**
- [ ] Can create new custom role
- [ ] Can select permissions from expanded permission list
- [ ] Can select permissions by category
- [ ] Can see permission descriptions
- [ ] System validates that role has at least one permission
- [ ] Can assign branch scope to permissions (if applicable)
- [ ] UI uses design system components (checkboxes, forms)
- [ ] All text in Vietnamese

**RICE Score:** 180

---

### US-PERM-4: System - Permission-Based Access Control

**As a** System  
**I want to** enforce permissions at API and UI level  
**So that** users can only access features they have permission for

**Acceptance Criteria:**
- [ ] Backend checks permissions for all API endpoints
- [ ] Returns 403 Forbidden for unauthorized access
- [ ] Frontend checks permissions before showing UI elements
- [ ] Navigation items hidden based on permissions
- [ ] Action buttons disabled based on permissions
- [ ] Clear error messages for permission denials
- [ ] Permission checks are performant (< 10ms overhead)

**RICE Score:** 240

---

### US-PERM-5: User - View My Permissions

**As a** User  
**I want to** view my current permissions  
**So that** I understand what I can and cannot do in the system

**Acceptance Criteria:**
- [ ] Can view my permissions in user profile
- [ ] Permissions shown by category
- [ ] Clear indication of what each permission allows
- [ ] UI uses design system components
- [ ] All text in Vietnamese

**RICE Score:** 120

---

### US-PERM-6: Admin - Permission Matrix View

**As an** Admin  
**I want to** view a permission matrix showing all roles and permissions  
**So that** I can easily understand the permission structure

**Acceptance Criteria:**
- [ ] Can view matrix of roles vs. permissions
- [ ] Matrix shows which permissions each role has
- [ ] Can filter by role or permission category
- [ ] Matrix is easy to read and understand
- [ ] Can export matrix as CSV/PDF
- [ ] UI uses design system Table component

**RICE Score:** 140

---

## Implementation Priority

1. **High Priority:**
   - US-PERM-4: Permission-Based Access Control (foundational)
   - US-PERM-2: Update Default Role Permissions (enables revised permissions)

2. **Medium Priority:**
   - US-PERM-1: View Expanded Permission List (needed for role management)
   - US-PERM-3: Create Custom Role (enables flexibility)

3. **Low Priority:**
   - US-PERM-5: View My Permissions (nice to have)
   - US-PERM-6: Permission Matrix View (nice to have)

---

*All user stories must be implemented following design guidelines and using design system components.*
