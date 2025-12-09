# Local Monitoring Guide

**Last Updated:** 2025-12-09  
**Environment:** Local Development (Docker)

## Overview

This guide explains how to monitor the Beauty Chain Management System services running locally in Docker.

## Service Health Monitoring

### Health Check Endpoint

The backend provides a health check endpoint that verifies all service connections:

```bash
curl http://localhost:3000/api/v1/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-09T14:30:00.000Z",
  "services": {
    "database": { "status": "ok" },
    "redis": { "status": "ok" },
    "couchdb": { "status": "ok" }
  }
}
```

**Status Values:**
- `ok`: Service is healthy and responding
- `error`: Service is not responding or has errors
- `degraded`: Some services are unhealthy (overall status)

### Docker Container Health

Check container health status:

```bash
# All containers
docker-compose ps

# Specific container
docker-compose ps postgres
docker-compose ps redis
docker-compose ps couchdb
docker-compose ps backend
docker-compose ps frontend
```

**Health Indicators:**
- `(healthy)`: Container health check passed
- `Up`: Container is running
- `Exited`: Container has stopped

## Log Monitoring

### View All Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
docker-compose logs -f redis
```

### View Recent Logs

```bash
# Last 100 lines
docker-compose logs --tail=100 backend

# Last 50 lines with timestamps
docker-compose logs --tail=50 -t backend
```

### Log Levels

Backend uses structured logging. Common log levels:
- `ERROR`: Critical errors requiring attention
- `WARN`: Warnings that may need investigation
- `INFO`: General information about application flow
- `DEBUG`: Detailed debugging information (development only)

## Resource Monitoring

### Container Resource Usage

```bash
# Container stats (CPU, memory, network)
docker stats

# Specific container
docker stats beauty-backend
docker stats beauty-postgres
```

### Disk Usage

```bash
# Docker volumes
docker system df

# Specific volume
docker volume inspect beauty_postgres_data
```

## Database Monitoring

### PostgreSQL Connection

```bash
# Connect to database
docker-compose exec postgres psql -U beauty_user -d beauty_db

# Check connection count
docker-compose exec postgres psql -U beauty_user -d beauty_db -c "SELECT count(*) FROM pg_stat_activity;"

# Check database size
docker-compose exec postgres psql -U beauty_user -d beauty_db -c "SELECT pg_size_pretty(pg_database_size('beauty_db'));"
```

### Redis Monitoring

```bash
# Connect to Redis CLI
docker-compose exec redis redis-cli

# Check Redis info
docker-compose exec redis redis-cli INFO

# Check memory usage
docker-compose exec redis redis-cli INFO memory

# Monitor commands in real-time
docker-compose exec redis redis-cli MONITOR
```

### CouchDB Monitoring

```bash
# Check CouchDB status
curl http://beauty_admin:beauty_admin_password@localhost:5984/_up

# Get CouchDB stats
curl http://beauty_admin:beauty_admin_password@localhost:5984/_stats

# List databases
curl http://beauty_admin:beauty_admin_password@localhost:5984/_all_dbs
```

## Application Monitoring

### Backend API Monitoring

**Swagger Documentation:**
- URL: `http://localhost:3000/api/docs`
- Test endpoints directly from Swagger UI

**API Response Times:**
```bash
# Health check timing
time curl http://localhost:3000/api/v1/health

# Login endpoint timing
time curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
```

### Frontend Monitoring

**Browser Developer Tools:**
- Open `http://localhost:3001`
- Press F12 to open DevTools
- Check Console for errors
- Check Network tab for API calls
- Check Performance tab for load times

## Troubleshooting

### Service Not Responding

1. **Check container status:**
   ```bash
   docker-compose ps
   ```

2. **Check logs for errors:**
   ```bash
   docker-compose logs [service-name]
   ```

3. **Restart service:**
   ```bash
   docker-compose restart [service-name]
   ```

4. **Rebuild and restart:**
   ```bash
   docker-compose up -d --build [service-name]
   ```

### Database Connection Issues

1. **Verify PostgreSQL is running:**
   ```bash
   docker-compose ps postgres
   ```

2. **Check PostgreSQL logs:**
   ```bash
   docker-compose logs postgres
   ```

3. **Test connection:**
   ```bash
   docker-compose exec postgres pg_isready -U beauty_user
   ```

### High Resource Usage

1. **Check resource usage:**
   ```bash
   docker stats
   ```

2. **Identify resource-heavy containers**

3. **Restart containers if needed:**
   ```bash
   docker-compose restart
   ```

4. **Check for memory leaks in application logs**

### Performance Issues

1. **Check health endpoint response time:**
   ```bash
   time curl http://localhost:3000/api/v1/health
   ```

2. **Check database query performance:**
   - Enable query logging in PostgreSQL
   - Review slow queries

3. **Check Redis cache hit rate:**
   ```bash
   docker-compose exec redis redis-cli INFO stats
   ```

## Monitoring Checklist

### Daily Checks
- [ ] All containers running: `docker-compose ps`
- [ ] Health endpoint responding: `curl http://localhost:3000/api/v1/health`
- [ ] No critical errors in logs: `docker-compose logs --tail=50`

### Weekly Checks
- [ ] Review resource usage: `docker stats`
- [ ] Check disk usage: `docker system df`
- [ ] Review application logs for patterns
- [ ] Verify backups (if configured)

## Production Monitoring (Phase 2)

For production deployment, additional monitoring will be needed:
- Application Performance Monitoring (APM): Sentry, New Relic, Datadog
- Uptime monitoring: UptimeRobot, Pingdom
- Log aggregation: CloudWatch Logs, Google Cloud Logging
- Metrics dashboards: Prometheus + Grafana
- Alerting: PagerDuty, Slack notifications

See `production-monitoring-checklist.md` for Phase 2 requirements.

---

**Note:** This guide is for local development monitoring. Production monitoring will have additional tools and requirements.

