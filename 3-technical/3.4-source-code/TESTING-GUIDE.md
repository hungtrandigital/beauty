# Testing Guide

**Last Updated:** 2025-12-09

## Overview

This guide provides instructions for comprehensive testing of the Barbershop Management System in the local development environment.

## Prerequisites

1. **Start Docker services:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Run database migrations:**
   ```bash
   cd backend
   npm run migration:run
   ```

3. **Create admin account:**
   ```bash
   npm run script:create-admin-auto
   ```

4. **Start backend:**
   ```bash
   npm run start:dev
   ```

5. **Start frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

## Testing Approach

### 1. Manual Testing

Use the [Local Testing Checklist](LOCAL-TESTING-CHECKLIST.md) to systematically test all features.

### 2. API Testing

Use Swagger UI at `http://localhost:3000/api/docs` or tools like Postman/Insomnia.

### 3. Automated Testing

Run unit and E2E tests:

```bash
# Backend unit tests
cd backend
npm run test

# Backend E2E tests
npm run test:e2e

# Frontend tests (if implemented)
cd frontend
npm run test
```

## Test Scenarios

### Scenario 1: Complete Bill Creation Flow

1. Login as cashier
2. Navigate to "Tạo hóa đơn mới"
3. Scan customer QR code (or select customer)
4. Add products to bill
5. Add services to bill
6. Verify subtotal, discount, total
7. Process payment (cash)
8. Verify bill status updated
9. Verify customer points earned

### Scenario 2: Inventory Import/Export Flow

1. Login as warehouse manager
2. Create import request
3. Login as admin
4. Approve import request
5. Verify inventory updated
6. Create export request (central to branch)
7. Approve export request
8. Confirm receipt at branch
9. Verify inventory updated

### Scenario 3: Promotion Application

1. Login as admin
2. Create promotion (INVOICE_DISCOUNT)
3. Login as cashier
4. Create bill with eligible amount
5. Verify promotion auto-applied
6. Verify discount calculated
7. Verify promotion usage tracked

### Scenario 4: Reporting

1. Login as branch head
2. Navigate to reports
3. Select date range
4. View revenue report
5. View top products
6. View top services
7. Verify data accuracy

## Common Issues & Solutions

### Issue: Cannot connect to database
**Solution:** Verify Docker services are running: `docker ps`

### Issue: Migration errors
**Solution:** Check database connection and ensure migrations are run in order

### Issue: CORS errors
**Solution:** Verify CORS configuration in `backend/src/main.ts` allows `localhost:3001`

### Issue: JWT token expired
**Solution:** Use refresh token endpoint or login again

## Test Data

### Test Tenant
- Name: Default Tenant
- Domain: localhost

### Test Users
- Admin: admin@localhost / admin123
- Cashier: cashier@localhost / cashier123 (create manually)
- Warehouse Manager: warehouse@localhost / warehouse123 (create manually)

### Test Products
Create via API or admin interface:
- Product A: 100,000 VND
- Product B: 200,000 VND
- Dye Product: 150,000 VND

### Test Services
Create via API or admin interface:
- Haircut: 50,000 VND
- Hair Wash: 30,000 VND
- Styling: 80,000 VND

## Performance Testing

### Load Testing (Optional)
Use tools like Apache Bench or k6:

```bash
# Test health endpoint
ab -n 1000 -c 10 http://localhost:3000/api/v1/health
```

### Response Time Targets
- API endpoints: < 500ms (local)
- Page loads: < 2 seconds
- Dashboard: < 2 seconds
- Reports: < 3 seconds

## Security Testing

### Authentication
- Test invalid credentials
- Test expired tokens
- Test refresh token flow

### Authorization
- Test role-based access
- Test permission checks
- Test multi-tenant isolation

### Input Validation
- Test SQL injection attempts
- Test XSS attempts
- Test invalid data formats

## Reporting Test Results

Document test results in:
- `LOCAL-TESTING-CHECKLIST.md` - Mark completed items
- `TESTING-GUIDE.md` - Document issues found
- Update `progress.md` with test completion status

## Next Steps

After local testing is complete:
1. Fix any issues found
2. Update documentation
3. Proceed to Phase 2: Cloud Deployment

---

*Comprehensive testing ensures system reliability before deployment.*

