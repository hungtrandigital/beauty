# Local Testing Checklist

**Last Updated:** 2025-12-09  
**Environment:** Local Development (Docker)

## Prerequisites

- Docker Desktop running
- All services started: `docker-compose up -d`
- Environment variables configured in `.env`

## Service Health Checks

### Docker Services
- [ ] PostgreSQL: `docker-compose ps postgres` - Should show "healthy"
- [ ] Redis: `docker-compose ps redis` - Should show "healthy"
- [ ] CouchDB: `docker-compose ps couchdb` - Should show "healthy"
- [ ] Backend: `docker-compose ps backend` - Should show "Up"
- [ ] Frontend: `docker-compose ps frontend` - Should show "Up"

### API Health Check
- [ ] Health endpoint: `curl http://localhost:3000/api/v1/health`
  - Expected: `{"status":"ok","services":{"database":{"status":"ok"},"redis":{"status":"ok"},"couchdb":{"status":"ok"}}}`
- [ ] Database connection: Verify in health check response
- [ ] Redis connection: Verify in health check response
- [ ] CouchDB connection: Verify in health check response (optional)

## Backend API Testing

### Base URLs
- Backend API: `http://localhost:3000/api/v1`
- Swagger Docs: `http://localhost:3000/api/docs`
- Health Check: `http://localhost:3000/api/v1/health`

### Authentication Endpoints
- [ ] POST `/api/v1/auth/login` - Login with test account
- [ ] POST `/api/v1/auth/refresh` - Refresh token
- [ ] GET `/api/v1/auth/me` - Get current user (protected)

### Test Accounts
See `backend/SEED-ACCOUNTS.md` for test account credentials.

## Frontend Testing

### Base URLs
- Frontend: `http://localhost:3001`
- Login Page: `http://localhost:3001/login`
- Dashboard: `http://localhost:3001/dashboard` (after login)

### Frontend Checks
- [ ] Frontend loads at `http://localhost:3001`
- [ ] Login page accessible
- [ ] Can login with test account
- [ ] Dashboard loads after login
- [ ] Navigation works
- [ ] API calls from frontend succeed

## Database Testing

### Connection Test
```bash
docker-compose exec postgres psql -U beauty_user -d beauty_db -c "SELECT 1;"
```

### Migration Status
- [ ] All migrations applied: Check migration status
- [ ] Database schema correct: Verify tables exist

## Redis Testing

### Connection Test
```bash
docker-compose exec redis redis-cli ping
```
Expected: `PONG`

## CouchDB Testing

### Connection Test
```bash
curl http://beauty_admin:beauty_admin_password@localhost:5984/_up
```
Expected: `{"status":"ok"}`

## Integration Testing

### End-to-End Workflows
- [ ] Login flow: Login → Dashboard → Logout
- [ ] Bill creation: Create bill → Add items → Process payment
- [ ] Inventory operations: View inventory → Create import request
- [ ] Customer management: Create customer → View customer details

## Security Testing

### Authentication
- [ ] Cannot access protected endpoints without token
- [ ] Invalid token returns 401
- [ ] Expired token returns 401
- [ ] Valid token allows access

### Authorization
- [ ] Admin can access admin endpoints
- [ ] Cashier cannot access admin endpoints
- [ ] Warehouse Manager cannot access admin endpoints

### CORS
- [ ] Frontend (localhost:3001) can call backend API
- [ ] Other origins are blocked (if tested)

## Performance Testing (Local Baseline)

### Response Times
- [ ] Health check: < 100ms
- [ ] Login: < 500ms
- [ ] Dashboard load: < 1s
- [ ] API endpoints: < 500ms average

## Troubleshooting

### Common Issues

**Backend not starting:**
- Check Docker logs: `docker-compose logs backend`
- Verify environment variables in `.env`
- Check port 3000 is not in use

**Frontend not loading:**
- Check Docker logs: `docker-compose logs frontend`
- Verify port 3001 is not in use
- Check backend API is accessible

**Database connection errors:**
- Verify PostgreSQL container is running: `docker-compose ps postgres`
- Check database credentials in `.env`
- Verify network connectivity: `docker-compose exec backend ping postgres`

**Redis connection errors:**
- Verify Redis container is running: `docker-compose ps redis`
- Check Redis host/port in `.env`

## Next Steps

After all checks pass:
1. Proceed with comprehensive testing (Task 1.5)
2. Document any issues found
3. Update progress tracking

---

**Note:** This checklist is for local development environment. Production testing will have additional requirements.

