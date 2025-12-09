# Missing Features Delivery Plan

**Date:** 2025-12-09  
**Status:** Ready for Implementation  
**Priority:** High  
**Version:** 1.0

## Overview

This plan outlines the delivery strategy for critical missing features identified in the code-plan sync review. These features are required for customer delivery and must be implemented before production launch.

## Executive Summary

**Critical Gaps Identified:**
1. **Print Bills** - CRITICAL (Missing from code, required for daily operations)
2. **Admin Approval UI** - CRITICAL (Backend complete, frontend missing)
3. **Image Upload** - MEDIUM (Backend partial, frontend missing)
4. **Branch Head User Guide** - LOW (Missing documentation)

**Estimated Total Effort:** 5.5 days  
**Recommended Timeline:** 1-2 weeks  
**Dependencies:** None (can be implemented in parallel)

---

## Feature 1: Print Bills Functionality

**Priority:** CRITICAL  
**Effort:** 1 day  
**Sprint:** Sprint 5 or Sprint 7  
**Status:** Not Started

### Requirements Reference
- Epic 2 (Billing): US-2.3, US-2.5
- Epic 10 (Web Application): US-10.1
- Technical Specs: `POST /api/staff/bills/:id/print`
- Role Permissions: `bills.print`

### Implementation Tasks

#### Backend (If needed)
- [ ] Verify print endpoint exists or create `POST /api/bills/:id/print`
- [ ] Return bill data in print-friendly format
- [ ] Add print permission check

#### Frontend
- [ ] Create bill detail page (`/dashboard/bills/[id]/page.tsx`)
  - Display full bill information
  - Show bill items, payments, customer info
  - Display bill number, date, totals
- [ ] Add print button to bills list page
  - Button in actions column
  - Opens bill detail in print view
- [ ] Add print button to bill detail page
  - Prominent print button
  - Triggers browser print dialog
- [ ] Implement print functionality
  - Use `window.print()` API
  - Handle print event
  - Show print preview
- [ ] Create print-friendly CSS
  - Hide navigation and UI elements when printing
  - Optimize layout for A4 paper
  - Include company logo and details
  - Format bill items table
  - Show totals clearly
- [ ] Add reprint functionality
  - Allow reprinting from bill history
  - Show print history (optional)

### Design Requirements
- Follow brand guidelines (Deep Navy, Teal, Gold)
- Use design system Button component
- Print layout optimized for standard receipt printers
- Vietnamese language support
- Include all required bill information

### Acceptance Criteria
- [ ] Can print bills from bills list page
- [ ] Can print bills from bill detail page
- [ ] Print output includes all bill information
- [ ] Print layout is optimized for A4/receipt paper
- [ ] Works on Chrome, Firefox, Safari, Edge
- [ ] Print button visible and accessible
- [ ] Can reprint bills from history

### Testing Checklist
- [ ] Test print on Chrome
- [ ] Test print on Firefox
- [ ] Test print on Safari
- [ ] Test print on Edge
- [ ] Test print preview
- [ ] Verify all bill data appears in print
- [ ] Test with different bill sizes (1 item, 10+ items)
- [ ] Test with customer and without customer
- [ ] Test with promotions applied
- [ ] Test with multiple payment methods

### Files to Create/Modify
- `frontend/src/app/dashboard/bills/[id]/page.tsx` (new)
- `frontend/src/app/dashboard/bills/page.tsx` (modify - add print button)
- `frontend/src/app/globals.css` (modify - add print styles)
- `frontend/src/components/bills/print-button.tsx` (new, optional)

---

## Feature 2: Admin Approval Workflow UI

**Priority:** CRITICAL  
**Effort:** 2 days  
**Sprint:** Sprint 4  
**Status:** Backend Complete, Frontend Missing

### Requirements Reference
- Epic 1 (Inventory): US-1.3
- Acceptance Criteria: View requests, approve/reject, filters, history

### Implementation Tasks

#### Frontend Pages
- [ ] Create import/export requests list page (`/dashboard/inventory/requests/page.tsx`)
  - Display all pending requests
  - Show request type (import/export)
  - Show request status (pending, approved, rejected)
  - Show requester, date, products, quantities
  - Add filters (type, status, date range)
  - Add search functionality

#### Request Details Modal
- [ ] Create request details modal component
  - Show full request information
  - Display products and quantities
  - Show requester information
  - Show request date and notes
  - Show approval history (if any)

#### Approval Actions
- [ ] Add approve button with confirmation
  - Confirmation dialog before approval
  - Success notification after approval
  - Refresh requests list after approval
- [ ] Add reject button with reason input
  - Modal with reason textarea
  - Validation (reason required)
  - Success notification after rejection
  - Refresh requests list after rejection

#### Filters and Search
- [ ] Implement request type filter (import/export/all)
- [ ] Implement status filter (pending/approved/rejected/all)
- [ ] Implement date range filter
- [ ] Implement search by requester name or request ID

#### Approval History
- [ ] Display approval history for each request
  - Who approved/rejected
  - When approved/rejected
  - Rejection reason (if rejected)

#### Notifications
- [ ] Show success notification after approval
- [ ] Show success notification after rejection
- [ ] Show error notification if approval fails
- [ ] Update request status in real-time

### Design Requirements
- Follow brand guidelines and design system
- Use design system Table, Button, Modal components
- Use status badges (pending, approved, rejected)
- Responsive design (desktop, tablet)
- Vietnamese language support
- Accessible (keyboard navigation, screen readers)

### Acceptance Criteria
- [ ] Admin can view all pending requests in one place
- [ ] Admin can see request details (products, quantities, requester)
- [ ] Admin can approve requests with one click
- [ ] Admin can reject requests with reason
- [ ] Admin can filter requests by type, status, date
- [ ] Admin can see approval history
- [ ] Approval notifications are shown
- [ ] Requests list updates after approval/rejection

### Testing Checklist
- [ ] Test viewing pending import requests
- [ ] Test viewing pending export requests
- [ ] Test approving import request
- [ ] Test rejecting import request with reason
- [ ] Test approving export request
- [ ] Test rejecting export request with reason
- [ ] Test filters (type, status, date)
- [ ] Test search functionality
- [ ] Test approval history display
- [ ] Test error handling (network errors, validation errors)
- [ ] Test responsive design

### Files to Create/Modify
- `frontend/src/app/dashboard/inventory/requests/page.tsx` (new)
- `frontend/src/components/inventory/request-details-modal.tsx` (new)
- `frontend/src/components/inventory/approve-reject-buttons.tsx` (new)
- `frontend/src/app/dashboard/inventory/page.tsx` (modify - add link to requests)
- `frontend/src/components/layout/sidebar.tsx` (modify - add requests link for admin)

---

## Feature 3: Image Upload Functionality

**Priority:** MEDIUM  
**Effort:** 2 days  
**Sprint:** Sprint 2  
**Status:** Backend Partial (fields exist, no upload endpoint), Frontend Missing

### Requirements Reference
- Epic 3 (Product Management): Image upload with success metrics
- Epic 9 (Admin Dashboard): Image upload component
- Technical Specs: AWS S3 or local storage

### Implementation Tasks

#### Backend
- [ ] Create file upload endpoint (`POST /api/upload/image`)
  - Accept multipart/form-data
  - Validate file type (jpg, png, webp)
  - Validate file size (max 5MB)
  - Generate unique filename
  - Save to storage (S3 or local for dev)
  - Return image URL
- [ ] Add file upload service
  - Handle file validation
  - Handle file storage
  - Handle error cases
- [ ] Add image deletion endpoint (optional)
- [ ] Configure storage (S3 for production, local for dev)

#### Frontend
- [ ] Create image upload component (from design system)
  - File input with drag-and-drop
  - Image preview before upload
  - Upload progress indicator
  - Error handling
  - Multiple image support
- [ ] Add upload UI to product creation form
  - Image upload section
  - Preview uploaded images
  - Remove image option
- [ ] Add upload UI to service creation form
  - Same as product form
- [ ] Add upload UI to product edit form
  - Show existing images
  - Allow adding new images
  - Allow removing images
- [ ] Add upload UI to service edit form
  - Same as product edit

### Design Requirements
- Follow design system Image Upload component patterns
- Support drag-and-drop
- Show upload progress
- Show image preview
- Error messages for invalid files
- Vietnamese language support
- Accessible (keyboard navigation)

### Acceptance Criteria
- [ ] Can upload images for products
- [ ] Can upload images for services
- [ ] Can preview images before upload
- [ ] Can upload multiple images
- [ ] Can remove uploaded images
- [ ] File type validation (jpg, png, webp)
- [ ] File size validation (max 5MB)
- [ ] Upload success rate: 99%+
- [ ] Upload time: < 10 seconds per image

### Testing Checklist
- [ ] Test uploading single image
- [ ] Test uploading multiple images
- [ ] Test drag-and-drop upload
- [ ] Test file type validation (reject invalid types)
- [ ] Test file size validation (reject > 5MB)
- [ ] Test image preview
- [ ] Test removing images
- [ ] Test upload progress indicator
- [ ] Test error handling (network errors, server errors)
- [ ] Test with different image formats (jpg, png, webp)

### Files to Create/Modify
- `backend/src/upload/upload.controller.ts` (new)
- `backend/src/upload/upload.service.ts` (new)
- `backend/src/upload/upload.module.ts` (new)
- `backend/src/upload/dto/upload-image.dto.ts` (new)
- `frontend/src/components/ui/image-upload.tsx` (new)
- `frontend/src/app/dashboard/products/new/page.tsx` (modify - add upload)
- `frontend/src/app/dashboard/products/[id]/edit/page.tsx` (modify - add upload)
- `frontend/src/app/dashboard/services/new/page.tsx` (modify - add upload)
- `frontend/src/app/dashboard/services/[id]/edit/page.tsx` (modify - add upload)

---

## Feature 4: Branch Head User Guide

**Priority:** LOW  
**Effort:** 0.5 days  
**Sprint:** Sprint 14  
**Status:** Missing

### Requirements Reference
- User guides exist for Admin, Cashier, Warehouse Manager
- Branch Head guide missing

### Implementation Tasks

#### Documentation
- [ ] Create `branch-head.html` user guide
  - Introduction to Branch Head role
  - Branch dashboard usage
  - Revenue reports viewing
  - Staff performance monitoring
  - Branch-specific reports
  - Export reports functionality
  - Tips and best practices
- [ ] Add bilingual support (Vietnamese and English)
  - Language toggle
  - All content in both languages
- [ ] Follow existing guide structure
  - Same layout as other guides
  - Same styling (use `styles.css`)
  - Same navigation structure

#### Integration
- [ ] Add link to `index.html`
  - Add Branch Head card
  - Link to `branch-head.html`
  - Update navigation menu

### Design Requirements
- Match existing guide design
- Use same stylesheet (`styles.css`)
- Bilingual support (Vietnamese/English)
- Responsive design
- Print-friendly

### Acceptance Criteria
- [ ] Branch Head guide exists (`branch-head.html`)
- [ ] Guide covers all Branch Head features
- [ ] Guide is bilingual (Vietnamese/English)
- [ ] Guide is linked from index page
- [ ] Guide follows same structure as other guides

### Testing Checklist
- [ ] Test guide displays correctly
- [ ] Test language toggle
- [ ] Test all links work
- [ ] Test responsive design
- [ ] Test print functionality
- [ ] Review content accuracy

### Files to Create/Modify
- `6-operations/user-guides/branch-head.html` (new)
- `6-operations/user-guides/index.html` (modify - add link)

---

## Implementation Timeline

### Week 1: Critical Features
**Days 1-2:** Admin Approval UI (2 days)  
**Day 3:** Print Bills (1 day)

### Week 2: Medium Priority
**Days 4-5:** Image Upload (2 days)  
**Day 5 (afternoon):** Branch Head Guide (0.5 days)

**Total:** 5.5 days (can be done in 1-2 weeks depending on team size)

### Parallel Implementation
- Print Bills and Admin Approval UI can be done in parallel (different developers)
- Image Upload can start after Sprint 2 backend is ready
- Branch Head Guide can be done anytime

---

## Dependencies

### Print Bills
- **Dependencies:** None (backend APIs ready)
- **Blocks:** Customer delivery (critical for daily operations)

### Admin Approval UI
- **Dependencies:** Backend approval endpoints (✅ Complete)
- **Blocks:** Admin workflow (critical for inventory management)

### Image Upload
- **Dependencies:** Storage configuration (S3 or local)
- **Blocks:** Product/service catalog completeness

### Branch Head Guide
- **Dependencies:** None
- **Blocks:** Documentation completeness

---

## Success Metrics

### Print Bills
- ✅ 100% of bills can be printed
- ✅ Print time: < 2 seconds
- ✅ Print works on all major browsers
- ✅ User satisfaction: Can print bills easily

### Admin Approval UI
- ✅ 100% of approval requests visible in UI
- ✅ Approval time: < 30 seconds per request
- ✅ Zero approval errors
- ✅ Admin satisfaction: Can approve/reject easily

### Image Upload
- ✅ 99%+ upload success rate
- ✅ Upload time: < 10 seconds per image
- ✅ 95%+ of products/services have images
- ✅ User satisfaction: Can upload images easily

### Branch Head Guide
- ✅ Guide exists and is accessible
- ✅ Guide covers all Branch Head features
- ✅ Guide is bilingual

---

## Risk Assessment

### High Risk
- **Print Bills:** Browser compatibility issues
  - **Mitigation:** Test on all major browsers, use standard print API
- **Admin Approval UI:** Complex state management
  - **Mitigation:** Use React Query for server state, proper error handling

### Medium Risk
- **Image Upload:** Storage configuration complexity
  - **Mitigation:** Start with local storage, migrate to S3 later
- **Image Upload:** Large file uploads
  - **Mitigation:** Implement file size limits, progress indicators

### Low Risk
- **Branch Head Guide:** Content accuracy
  - **Mitigation:** Review with Branch Head users, update regularly

---

## Related Documents

- [Code-Plan Sync Review](../reviews/code-plan-sync-review-2025-12-09.md)
- [Implementation Plan](plan.md)
- [Progress Status](../status/progress.md)
- [Product Backlog](../../../2-product-foundation/2.2-product-backlog/backlog.md)
- [User Guides](../../../6-operations/user-guides/README.md)

---

**Next Steps:**
1. Review and approve this plan
2. Assign tasks to developers
3. Start implementation with critical features first
4. Track progress in `progress.md`
5. Update plan as tasks are completed

---

*This plan ensures all critical missing features are delivered before customer launch.*

