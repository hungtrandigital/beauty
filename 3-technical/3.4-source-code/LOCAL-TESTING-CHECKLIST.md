# Local Testing Checklist

**Last Updated:** 2025-12-09  
**Purpose:** Comprehensive testing checklist for local development environment

## Prerequisites

- ✅ Docker services running (PostgreSQL, Redis, CouchDB)
- ✅ Backend API running at `http://localhost:3000`
- ✅ Frontend running at `http://localhost:3001`
- ✅ Database migrations run
- ✅ Admin account created

## Authentication & Authorization

### Login
- [ ] Can login with admin credentials
- [ ] Can login with cashier credentials
- [ ] Can login with warehouse manager credentials
- [ ] Invalid credentials show error message
- [ ] JWT token stored in localStorage
- [ ] Refresh token working

### Logout
- [ ] Logout clears tokens
- [ ] Logout redirects to login page
- [ ] Cannot access protected routes after logout

### Authorization
- [ ] Admin can access all routes
- [ ] Cashier can access cashier routes only
- [ ] Warehouse manager can access warehouse routes only
- [ ] Unauthorized access shows 403 error

## User Management

### Create User
- [ ] Can create new user via API
- [ ] Can create user via admin interface
- [ ] Email validation working
- [ ] Password hashing working
- [ ] User assigned to correct tenant

### Update User
- [ ] Can update user information
- [ ] Can change user role
- [ ] Can assign user to branches
- [ ] Changes saved correctly

### Deactivate User
- [ ] Can deactivate user
- [ ] Deactivated user cannot login
- [ ] Can reactivate user

## Branch Management

### Create Branch
- [ ] Can create new branch
- [ ] Branch code uniqueness enforced
- [ ] Address information saved correctly
- [ ] Branch active/inactive toggle working

### View Branches
- [ ] Can list all branches
- [ ] Can filter branches by status
- [ ] Branch information displayed correctly

## Product Management

### Create Product
- [ ] Can create product (PRODUCT type)
- [ ] Can create product (DYE type)
- [ ] Price validation working
- [ ] Image upload working (if implemented)
- [ ] Commission split validation working

### View Products
- [ ] Can list all products
- [ ] Can search products by name
- [ ] Can filter by product type
- [ ] Product details displayed correctly

## Inventory Management

### View Inventory
- [ ] Can view central warehouse inventory
- [ ] Can view branch inventory
- [ ] Can filter by location
- [ ] Low stock alerts displayed
- [ ] Inventory quantities correct

### Import Requests
- [ ] Can create import request
- [ ] Can view pending import requests
- [ ] Can approve import request
- [ ] Can reject import request
- [ ] Inventory updated after approval

### Export Requests
- [ ] Can create export request
- [ ] Can view pending export requests
- [ ] Can approve export request
- [ ] Can confirm receipt at branch
- [ ] Inventory updated after confirmation

## Bill Creation & Payment

### Create Bill
- [ ] Can create new bill
- [ ] Can add products to bill
- [ ] Can add services to bill
- [ ] Can scan customer QR code
- [ ] Can select customer manually
- [ ] Subtotal calculated correctly
- [ ] Discount applied correctly
- [ ] Total calculated correctly

### Process Payment
- [ ] Can process cash payment
- [ ] Can process card payment
- [ ] Can process multiple payment methods
- [ ] Change calculated correctly for cash
- [ ] Bill status updated to PAID
- [ ] Payment status tracked correctly

### View Bills
- [ ] Can list all bills
- [ ] Can filter bills by status
- [ ] Can search bills by number
- [ ] Can view bill details
- [ ] Bill information displayed correctly

## Customer Management

### Create Customer
- [ ] Can create new customer
- [ ] Phone number uniqueness enforced
- [ ] QR code generated automatically
- [ ] Customer saved correctly

### Search Customers
- [ ] Can search by name
- [ ] Can search by phone
- [ ] Can search by QR code
- [ ] Search results displayed correctly

### Customer Points
- [ ] Points earned on bill payment
- [ ] Points displayed correctly
- [ ] Membership tier updated automatically
- [ ] Points transaction history visible

## Promotion Engine

### Create Promotion
- [ ] Can create promotion (all 10 types)
- [ ] Promotion rules validated
- [ ] Start/end dates validated
- [ ] Promotion saved correctly

### Apply Promotion
- [ ] Promotions auto-applied to eligible bills
- [ ] Discount calculated correctly
- [ ] Promotion usage tracked
- [ ] Multiple promotions can apply

### Voucher Management
- [ ] Can create voucher codes
- [ ] Can use voucher in bill
- [ ] Voucher usage limits enforced
- [ ] Voucher expiration checked

## Reporting & Analytics

### Revenue Reports
- [ ] Can view revenue by date range
- [ ] Can view revenue by branch
- [ ] Revenue totals calculated correctly
- [ ] Charts/graphs display correctly (if implemented)

### Top Products/Services
- [ ] Can view top products
- [ ] Can view top services
- [ ] Rankings calculated correctly
- [ ] Revenue displayed correctly

### Inventory Recommendations
- [ ] Low stock alerts displayed
- [ ] Recommendations shown correctly
- [ ] Can click to create import request

### Revenue Trends
- [ ] Trend direction calculated (UP/DOWN/STABLE)
- [ ] Percentage change calculated correctly
- [ ] Comparison periods correct

## Admin Dashboard

### Dashboard Metrics
- [ ] Total users displayed
- [ ] Active users displayed
- [ ] Total branches displayed
- [ ] System health status shown
- [ ] Recent activity feed displayed

### User Management
- [ ] Can list all users
- [ ] Can search users
- [ ] Can filter by role
- [ ] Can filter by status

### Role Management
- [ ] Can view all roles
- [ ] Can create custom role
- [ ] Can update role permissions
- [ ] System roles protected

### System Settings
- [ ] Can view system settings
- [ ] Can update general settings
- [ ] Can update notification settings
- [ ] Can update security settings
- [ ] Can update business settings

### Activity Logs
- [ ] Can view activity logs
- [ ] Can filter by user
- [ ] Can filter by action type
- [ ] Can filter by date range
- [ ] Logs displayed correctly

## Frontend Pages

### Authentication
- [ ] Login page loads correctly
- [ ] Login form validation working
- [ ] Error messages displayed correctly
- [ ] Redirects to dashboard after login

### Dashboard
- [ ] Dashboard loads correctly
- [ ] Metrics displayed correctly
- [ ] Recent activity shown
- [ ] Navigation working

### Bills
- [ ] Bills list page loads
- [ ] Can create new bill
- [ ] Bill details displayed correctly
- [ ] Payment processing works

### Customers
- [ ] Customer list loads
- [ ] Search functionality works
- [ ] Customer details displayed
- [ ] Points and tier shown

### Inventory
- [ ] Inventory list loads
- [ ] Filters working
- [ ] Low stock alerts shown
- [ ] Import/export requests visible

### Reports
- [ ] Reports page loads
- [ ] Date range filtering works
- [ ] Revenue data displayed
- [ ] Charts render correctly (if implemented)

### Legal Pages
- [ ] Terms page accessible at /terms
- [ ] Privacy page accessible at /privacy
- [ ] Footer links work
- [ ] Pages display correctly

## API Endpoints

### Health Check
- [ ] GET /api/v1/health returns 200
- [ ] Database connection verified
- [ ] Redis connection verified
- [ ] CouchDB connection verified (if configured)

### Authentication
- [ ] POST /api/v1/auth/login works
- [ ] POST /api/v1/auth/refresh works
- [ ] GET /api/v1/auth/me works
- [ ] POST /api/v1/auth/logout works

### All Other Endpoints
- [ ] All CRUD endpoints working
- [ ] Validation working
- [ ] Error handling working
- [ ] Multi-tenant isolation working

## Performance

### Response Times
- [ ] API responses < 500ms (local)
- [ ] Page loads < 2 seconds
- [ ] Dashboard loads < 2 seconds
- [ ] Reports load < 3 seconds

### Database
- [ ] Queries optimized
- [ ] No N+1 query problems
- [ ] Indexes working correctly

## Security

### Authentication
- [ ] Passwords hashed (bcrypt)
- [ ] JWT tokens secure
- [ ] Refresh tokens working
- [ ] Token expiration enforced

### Authorization
- [ ] Role-based access control working
- [ ] Permission checks enforced
- [ ] Admin-only routes protected

### Data Protection
- [ ] Multi-tenant isolation working (RLS)
- [ ] SQL injection prevented
- [ ] XSS protection in place
- [ ] CORS configured correctly

## Offline Support (If Implemented)

### Offline Bill Creation
- [ ] Can create bill offline
- [ ] Bills saved locally
- [ ] Sync works when online
- [ ] Conflict resolution working

## Mobile APIs (If Tested)

### Service Browsing
- [ ] GET /api/v1/mobile/services works
- [ ] Services filtered by type
- [ ] Service details returned

### Customer QR Lookup
- [ ] GET /api/v1/mobile/customer/qr/:code works
- [ ] Customer found by QR code
- [ ] Customer data returned

### Points Display
- [ ] GET /api/v1/mobile/customer/:id/points works
- [ ] Points and tier returned
- [ ] Transaction history returned

## Browser Compatibility

### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile
- [ ] Chrome Mobile
- [ ] Safari Mobile
- [ ] Responsive design working

## Accessibility

### WCAG 2.1 AA
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Focus indicators visible
- [ ] ARIA labels present

## Documentation

### Code Documentation
- [ ] README files updated
- [ ] API documentation (Swagger) complete
- [ ] Code comments present
- [ ] Architecture documented

### User Documentation
- [ ] Setup guides complete
- [ ] Usage guides available
- [ ] Troubleshooting guides present

## Issues Found

Document any issues found during testing:

1. [Issue description]
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Severity: [Low/Medium/High/Critical]

## Test Results Summary

- **Total Tests:** [Number]
- **Passed:** [Number]
- **Failed:** [Number]
- **Blocked:** [Number]
- **Overall Status:** [Pass/Fail/Partial]

---

*Use this checklist to verify all functionality works correctly in the local environment before proceeding to cloud deployment.*
