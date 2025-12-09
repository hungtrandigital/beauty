# Architecture Decision Records (ADRs)

**Last Updated:** 2025-12-09

This document tracks all significant architectural, design, and technical decisions made during the project.

## ADR Format

Each ADR follows this format:
- **Status:** Proposed | Accepted | Deprecated | Superseded
- **Date:** YYYY-MM-DD
- **Context:** Why this decision is needed
- **Decision:** What was decided
- **Consequences:** Positive and negative impacts

---

## ADR-001: Permission System Revision

**Status:** Accepted  
**Date:** 2025-12-09  
**Related:** Role Permissions Revision PRD

### Context

The current permission system has broad, category-level permissions (e.g., `bills.create`, `inventory.manage`) that don't provide enough granularity for different staff roles. We need to:
- Provide more specific permissions for better security
- Support branch-scoped permissions
- Enable flexible role customization
- Support future roles (Branch Head, Staff, etc.)

### Decision

Revise the permission system to include:
1. **Granular Permissions:** Expand from 13 to 50+ specific permissions
2. **Permission Categories:** Organize permissions by feature area (BILLS, CUSTOMERS, INVENTORY, etc.)
3. **Branch Scoping:** Support branch-specific permissions (e.g., `bills.view.own` vs `bills.view.all`)
4. **Default Role Updates:** Update CASHIER and WAREHOUSE_MANAGER with revised permission sets
5. **Permission-Based Guards:** Implement permission checks at API and UI level (not just role-based)

### Consequences

**Positive:**
- Better security through principle of least privilege
- More flexible role management
- Support for future role expansion
- Clearer permission structure
- Better audit trail

**Negative:**
- More complex permission management
- Requires migration of existing roles
- More permission checks (performance consideration)
- More UI logic for permission-based rendering

**Implementation Notes:**
- Create permission constants file
- Update role defaults via migration
- Implement permission guards
- Update frontend to check permissions

---

## ADR-002: Web Application for Staff Roles

**Status:** Accepted  
**Date:** 2025-12-09  
**Related:** Web Application for Staff PRD

### Context

Staff members (Cashiers, Warehouse Managers) need web-based interfaces for their daily operations. The web application must:
- Respect the revised permission system
- Provide role-specific interfaces
- Support offline operations (for cashiers)
- Be responsive and accessible

### Decision

Build focused web application interfaces for:
1. **Cashier Interface:** Bill creation, payments, customer management
2. **Warehouse Manager Interface:** Inventory operations, requests, viewing
3. **Permission-Based UI:** Show/hide features based on user permissions
4. **Offline Support:** IndexedDB for cashier bill creation
5. **Responsive Design:** Desktop-first, tablet support, mobile browser support

### Consequences

**Positive:**
- Efficient daily operations for staff
- Better user experience than mobile-only
- Offline capability for cashiers
- Permission-based security
- Consistent with brand guidelines

**Negative:**
- Separate from admin dashboard (code duplication risk)
- Requires permission system to be complete first
- Offline sync complexity
- Multiple interfaces to maintain

**Implementation Notes:**
- Use shared design system components
- Implement permission guards at route level
- Use IndexedDB for offline storage
- Progressive Web App (PWA) features

---

*Add new ADRs below as decisions are made.*
