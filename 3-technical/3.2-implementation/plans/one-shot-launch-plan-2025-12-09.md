# One-Shot Launch Plan - Local First, Then Cloud Deployment

**Date:** 2025-12-09  
**Status:** Ready for Execution  
**Mode:** Plan → Code/Execution (Parallel)  
**Goal:** Complete local machine setup and testing first, then prepare for cloud deployment later

## Overview

This is a **comprehensive one-shot execution plan** that focuses on **local machine completion first** for testing and verification. Cloud deployment will be a separate phase later.

**Phase 1 (Current):** Complete local setup, testing, and documentation  
**Phase 2 (Later):** Cloud deployment to AWS or other hosting provider

Every task includes:
- Complete requirements
- Documentation tracking requirements
- Progress update requirements
- Changelog entry requirements
- ADR requirements (if applicable)

**AI Factory will execute all tasks and maintain full documentation as defined in the process.**

## Execution Strategy

**Phase 1: Local Machine Completion (Current)**
- Complete all setup, testing, and verification on local machine
- All tasks execute in parallel where dependencies allow
- Full documentation tracking maintained throughout

**Phase 2: Cloud Deployment (Later)**
- Separate phase for cloud deployment
- Will be planned after Phase 1 completion
- Can choose AWS or other hosting provider

**Single Prompt Execution:**
Execute all Phase 1 tasks in parallel, with each agent maintaining documentation as they work.

**Documentation Requirements:**
- Every task completion → Update `3-technical/3.2-implementation/status/progress.md`
- Every change → Update `8-governance/changelog.md`
- Every decision → Update `8-governance/decision-log.md` (if ADR needed)
- Every risk → Update `8-governance/risk-register.md` (if identified)
- Every file created → Document in appropriate location

## Phase 1: Local Machine Completion (Execute in Parallel)

**Goal:** Complete setup, testing, and verification on local machine before cloud deployment.

### Task 1.1: Local Environment Verification & Optimization
**Assigned Agent:** `@devops`  
**Priority:** Critical  
**Documentation:** Required

#### Requirements
1. **Verify Docker Setup**
   - Ensure all Docker services running correctly
   - Verify PostgreSQL, Redis, CouchDB containers healthy
   - Verify backend and frontend containers running
   - Test all service connections

2. **Verify Local Development Environment**
   - Test backend API at `http://localhost:3000/api/v1`
   - Test frontend at `http://localhost:3001`
   - Verify Swagger docs at `http://localhost:3000/api/docs`
   - Test database connections
   - Test Redis connections

3. **Optimize Local Configuration**
   - Review and optimize Docker Compose configuration
   - Ensure proper volume mounts for development
   - Verify hot reload working for backend and frontend
   - Check resource usage and optimize if needed

4. **Create Local Testing Checklist**
   - Document all local endpoints to test
   - Create test scenarios for each feature
   - Document expected behaviors

5. **Environment Variables Verification**
   - Verify all required environment variables set
   - Document any missing variables
   - Create `.env.local` template if needed

#### Acceptance Criteria
- ✅ All Docker services running and healthy
- ✅ Backend API accessible and responding
- ✅ Frontend accessible and loading correctly
- ✅ Database connections working
- ✅ Redis connections working
- ✅ All environment variables configured
- ✅ Local testing checklist created

#### Documentation Requirements
**MUST UPDATE:**
- `3-technical/3.2-implementation/status/progress.md` - Add "Local Environment Verification" section
- `8-governance/changelog.md` - Add entry under `[Unreleased]` → `### Added - Local Environment Setup`
- `3-technical/3.4-source-code/README-DOCKER.md` - Update with any optimizations
- Create/update: `3-technical/3.4-source-code/LOCAL-TESTING-CHECKLIST.md` - Local testing guide

**Documentation Format:**
```markdown
### Local Environment Verification (2025-12-09)
- Docker services: All running and healthy
- Backend API: http://localhost:3000/api/v1 (verified)
- Frontend: http://localhost:3001 (verified)
- Database: PostgreSQL connected (verified)
- Redis: Connected (verified)
- CouchDB: Connected (verified)
- Environment variables: All configured
- Local testing checklist: Created
```

#### Technical Specifications
- Docker Compose: All services in `docker-compose.yml`
- Backend: NestJS on port 3000
- Frontend: Next.js on port 3001
- Database: PostgreSQL 15 on port 5432
- Redis: Redis 7 on port 6379
- CouchDB: CouchDB 3.3 on port 5984

#### Dependencies
None - Can start immediately

#### Reference Documents
- `3-technical/3.4-source-code/README-DOCKER.md`
- `3-technical/3.4-source-code/docker-compose.yml`
- `3-technical/3.4-source-code/DOCKER-QUICK-START.md`

---

### Task 1.2: Local Security & Configuration
**Assigned Agent:** `@fullstack-engineer`  
**Priority:** High  
**Documentation:** Required

#### Requirements
1. **Verify Local Security Configuration**
   - Verify JWT secrets are set in local `.env`
   - Verify JWT secrets are strong (not default values)
   - Document secret generation method for future production use
   - Ensure `.env` is in `.gitignore`

2. **Verify CORS Configuration**
   - Check `backend/src/main.ts` CORS settings
   - Ensure `localhost:3001` is allowed for local development
   - Document CORS configuration for production (will need update later)

3. **Verify Environment Variables**
   - Check all required variables in `.env`
   - Verify no secrets hardcoded in code
   - Document all required environment variables
   - Create comprehensive `.env.example` if needed

4. **Local Development Best Practices**
   - Verify development vs production configurations
   - Document local development security practices
   - Create security checklist for local development

5. **Prepare for Production (Documentation Only)**
   - Document what will need to change for production
   - Create production security checklist (for Phase 2)
   - Document production deployment security requirements

#### Acceptance Criteria
- ✅ Local JWT secrets configured and strong
- ✅ CORS configured for local development
- ✅ All environment variables documented
- ✅ `.env` properly gitignored
- ✅ Local security practices documented
- ✅ Production security checklist created (for Phase 2)

#### Documentation Requirements
**MUST UPDATE:**
- `3-technical/3.2-implementation/status/progress.md` - Add "Local Security Configuration" section
- `8-governance/changelog.md` - Add entry under `[Unreleased]` → `### Security`
- `3-technical/3.4-source-code/README-DOCKER.md` - Document local security practices
- Create/update: `3-technical/3.3-devops/production-security-checklist.md` - For Phase 2

**Documentation Format:**
```markdown
### Local Security Configuration (2025-12-09)
- Local JWT secrets: Configured and verified strong
- CORS: Configured for localhost:3001 (development)
- Environment variables: All documented and verified
- .env: Properly gitignored
- Local security practices: Documented
- Production security checklist: Created for Phase 2
```

#### Technical Specifications
- JWT secrets: Should be strong even for local (use `openssl rand -base64 32`)
- CORS: Allow `http://localhost:3001` for local development
- Environment variables: All in `.env` file, not in code
- `.gitignore`: Must include `.env`

#### Dependencies
Task 1.1 (needs local environment running)

#### Reference Documents
- `3-technical/3.4-source-code/backend/src/auth/auth.service.ts`
- `3-technical/3.4-source-code/backend/src/main.ts`
- `3-technical/3.4-source-code/env.example`

---

### Task 1.3: Legal & Compliance Documents
**Assigned Agent:** `@docs-guardian`  
**Priority:** High  
**Documentation:** Required

#### Requirements
1. **Create Terms of Service**
   - Use standard SaaS Terms of Service template
   - Customize with company information
   - Include: Service description, user obligations, liability limitations, termination
   - Save to: `6-operations/legal/terms-of-service.md`

2. **Create Privacy Policy**
   - Use standard SaaS Privacy Policy template
   - Customize with company information
   - Include: Data collection, usage, storage, user rights, GDPR compliance
   - Save to: `6-operations/legal/privacy-policy.md`

3. **Add Legal Pages to Frontend**
   - Create: `3-technical/3.4-source-code/frontend/src/app/terms/page.tsx`
   - Create: `3-technical/3.4-source-code/frontend/src/app/privacy/page.tsx`
   - Add footer links to both pages
   - Ensure pages are accessible and properly formatted
   - Test pages load correctly on localhost

4. **Update Legal Documentation**
   - Update `6-operations/legal/README.md` to reference new documents
   - Document legal compliance status

#### Acceptance Criteria
- ✅ Terms of Service document created
- ✅ Privacy Policy document created
- ✅ Legal pages added to frontend
- ✅ Footer links to legal pages
- ✅ Pages accessible at `http://localhost:3001/terms` and `/privacy`
- ✅ Documents are complete and professional

#### Documentation Requirements
**MUST UPDATE:**
- `3-technical/3.2-implementation/status/progress.md` - Add "Legal Documents" section
- `8-governance/changelog.md` - Add entry under `[Unreleased]` → `### Added - Legal & Compliance`
- `6-operations/legal/README.md` - Update with new documents
- Create/update: `6-operations/legal/terms-of-service.md`
- Create/update: `6-operations/legal/privacy-policy.md`

**Documentation Format:**
```markdown
### Legal & Compliance (2025-12-09)
- Created Terms of Service document
- Created Privacy Policy document
- Added legal pages to frontend (/terms, /privacy)
- Added footer links to legal pages
- Pages verified accessible on localhost
- Documents follow standard SaaS templates, customized for project
```

#### Technical Specifications
- Terms of Service: Standard SaaS template, customized
- Privacy Policy: Standard SaaS template, GDPR-compliant
- Frontend pages: Next.js pages, accessible, responsive
- Footer: Links to both legal pages
- Local testing: Verify pages load at localhost URLs

#### Dependencies
None - Can execute in parallel

#### Reference Documents
- Standard SaaS Terms of Service template
- Standard SaaS Privacy Policy template
- `6-operations/legal/README.md`

---

### Task 1.4: Local Monitoring & Health Checks
**Assigned Agent:** `@devops`  
**Priority:** High  
**Documentation:** Required

#### Requirements
1. **Configure Health Check Endpoints**
   - Add `/api/v1/health` endpoint to backend (if not exists)
   - Check database connection
   - Check Redis connection
   - Check CouchDB connection (optional)
   - Return health status with service statuses
   - Test endpoint at `http://localhost:3000/api/v1/health`

2. **Setup Local Logging**
   - Verify structured logging is working
   - Configure log levels for local development
   - Ensure logs are readable and useful
   - Document logging configuration

3. **Create Local Monitoring Guide**
   - Document how to monitor services locally
   - Document how to check service health
   - Document how to view logs
   - Create troubleshooting guide

4. **Prepare Production Monitoring (Documentation Only)**
   - Document what monitoring will be needed for production
   - Create production monitoring checklist (for Phase 2)
   - Document Sentry/UptimeRobot setup requirements (for Phase 2)

#### Acceptance Criteria
- ✅ Health check endpoint exists and responding
- ✅ Health check verifies all service connections
- ✅ Local logging configured and working
- ✅ Local monitoring guide created
- ✅ Production monitoring checklist created (for Phase 2)

#### Documentation Requirements
**MUST UPDATE:**
- `3-technical/3.2-implementation/status/progress.md` - Add "Local Monitoring Setup" section
- `8-governance/changelog.md` - Add entry under `[Unreleased]` → `### Added - Monitoring`
- `7-operations-monitoring/README.md` - Document local monitoring
- Create/update: `7-operations-monitoring/local-monitoring-guide.md` - Local monitoring guide
- Create/update: `7-operations-monitoring/production-monitoring-checklist.md` - For Phase 2

**Documentation Format:**
```markdown
### Local Monitoring & Health Checks (2025-12-09)
- Health check endpoint: /api/v1/health (verified working)
- Health check verifies: Database, Redis, CouchDB connections
- Local logging: Configured and verified
- Local monitoring guide: Created
- Production monitoring checklist: Created for Phase 2
```

#### Technical Specifications
- Health check: `/api/v1/health` endpoint
- Health checks: Database, Redis, CouchDB (optional)
- Logging: Structured logs for local development
- Monitoring: Docker logs, service health checks

#### Dependencies
Task 1.1 (needs local environment running)

#### Reference Documents
- `7-operations-monitoring/README.md`
- `3-technical/3.4-source-code/README-DOCKER.md`

---

### Task 1.5: Comprehensive Local Testing & Validation
**Assigned Agent:** `@code-reviewer`  
**Priority:** Critical  
**Documentation:** Required

#### Requirements
1. **End-to-End Testing (Local)**
   - Test authentication flow on localhost
   - Test login with seeded accounts
   - Test bill creation workflow
   - Test inventory operations
   - Test customer management
   - Test reporting features
   - Test admin dashboard
   - Test all user roles (Admin, Cashier, Warehouse Manager)

2. **API Testing (Local)**
   - Test all API endpoints at `http://localhost:3000/api/v1`
   - Verify all responses correct
   - Check error handling
   - Test authentication endpoints
   - Test protected endpoints
   - Verify Swagger docs at `/api/docs`

3. **Frontend Testing (Local)**
   - Test all pages load at `http://localhost:3001`
   - Test login page
   - Test dashboard pages
   - Test navigation
   - Test forms and inputs
   - Test responsive design
   - Test error states

4. **Integration Testing**
   - Test frontend-backend integration
   - Test database operations
   - Test Redis caching (if applicable)
   - Test multi-tenant isolation

5. **Security Testing (Local)**
   - Verify authentication works
   - Verify authorization works
   - Test JWT token validation
   - Test CORS configuration
   - Check for common vulnerabilities
   - Verify no sensitive data exposed

6. **Performance Testing (Local)**
   - Test response times
   - Test database query performance
   - Identify any performance bottlenecks
   - Document performance baseline

#### Acceptance Criteria
- ✅ All core workflows functional on localhost
- ✅ All API endpoints working correctly
- ✅ Frontend pages loading and functional
- ✅ All user roles tested and working
- ✅ Authentication and authorization working
- ✅ No critical bugs found
- ✅ Performance acceptable for local testing
- ✅ Test results documented

#### Documentation Requirements
**MUST UPDATE:**
- `3-technical/3.2-implementation/status/progress.md` - Add "Local Testing Complete" section
- `8-governance/changelog.md` - Add entry under `[Unreleased]` → `### Testing`
- Create/update: `3-technical/3.2-implementation/reviews/local-testing-2025-12-09.md` - Document comprehensive test results
- Update: `3-technical/3.4-source-code/LOCAL-TESTING-CHECKLIST.md` - Complete testing checklist

**Documentation Format:**
```markdown
### Local Testing & Validation (2025-12-09)
- End-to-end testing: All core workflows functional
- API testing: All endpoints responding correctly (localhost:3000)
- Frontend testing: All pages loading correctly (localhost:3001)
- Integration testing: Frontend-backend integration verified
- Security testing: Authentication and authorization working
- Performance testing: Baseline established
- Test results documented in: local-testing-2025-12-09.md
- Status: READY FOR LOCAL USE
```

#### Technical Specifications
- Testing environment: Localhost (Docker)
- Backend URL: `http://localhost:3000/api/v1`
- Frontend URL: `http://localhost:3001`
- Testing tools: Browser, Postman/curl, Swagger UI
- Test accounts: Use seeded accounts from `SEED-ACCOUNTS.md`

#### Dependencies
Tasks 1.1, 1.2, 1.3, 1.4 (all must be complete)

#### Reference Documents
- `3-technical/3.4-source-code/backend/SEED-ACCOUNTS.md`
- API documentation at `http://localhost:3000/api/docs`
- `3-technical/3.4-source-code/LOCAL-TESTING-CHECKLIST.md`

---

### Task 1.6: Local Completion & Documentation
**Assigned Agent:** `@fullstack-engineer`  
**Priority:** Critical  
**Documentation:** Required

#### Requirements
1. **Verify Local Admin Account**
   - Verify admin account creation works locally
   - Test admin login on localhost
   - Verify admin can access admin dashboard
   - Document admin account setup process

2. **Verify Local Tenant Setup**
   - Test tenant creation via API or admin interface
   - Verify tenant isolation works
   - Test multi-tenant scenarios
   - Document tenant setup process

3. **Complete Local Documentation**
   - Update all README files with local setup instructions
   - Document all local endpoints
   - Document all local test accounts
   - Create comprehensive local usage guide

4. **Create Cloud Deployment Preparation (For Phase 2)**
   - Document what will be needed for cloud deployment
   - Create cloud deployment checklist (for Phase 2)
   - Document AWS/cloud provider requirements (for Phase 2)
   - Create deployment guide template (for Phase 2)

5. **Final Local Verification**
   - Verify all systems operational on localhost
   - Verify all documentation complete
   - Verify all tests passing
   - Create local completion summary

#### Acceptance Criteria
- ✅ Local admin account verified and working
- ✅ Local tenant setup verified and working
- ✅ All local documentation complete
- ✅ Cloud deployment preparation documented (for Phase 2)
- ✅ All local systems verified operational
- ✅ Local completion summary created

#### Documentation Requirements
**MUST UPDATE:**
- `3-technical/3.2-implementation/status/progress.md` - Add "Local Completion" section, mark as "Local Setup Complete"
- `8-governance/changelog.md` - Add entry under `[Unreleased]` → `### Added - Local Completion`
- `3-technical/3.4-source-code/README.md` - Update with local setup completion
- `3-technical/3.4-source-code/README-DOCKER.md` - Update with any improvements
- Create/update: `3-technical/3.4-source-code/LOCAL-COMPLETION-SUMMARY.md` - Local completion summary
- Create/update: `3-technical/3.3-devops/cloud-deployment-checklist.md` - For Phase 2

**Documentation Format:**
```markdown
### Local Completion (2025-12-09)
- Local admin account: Verified and working
- Local tenant setup: Verified and working
- All local documentation: Complete
- Cloud deployment preparation: Documented for Phase 2
- All local systems: Verified operational
- Local completion summary: Created
- Status: LOCAL SETUP COMPLETE - READY FOR CLOUD DEPLOYMENT (Phase 2)
```

#### Technical Specifications
- Admin creation: Use `create-admin-auto.ts` or `create-admin.ts` script
- Tenant creation: Via API or admin interface
- Local URLs: Backend `localhost:3000`, Frontend `localhost:3001`
- Documentation: All local setup and usage documented

#### Dependencies
Tasks 1.1-1.5 (all must be complete)

#### Reference Documents
- `3-technical/3.4-source-code/backend/src/scripts/create-admin-auto.ts`
- `3-technical/3.4-source-code/backend/src/scripts/create-admin.ts`
- `3-technical/3.4-source-code/backend/SEED-ACCOUNTS.md`

---

## One-Shot Execution Prompt

**For AI Factory - Execute All Phase 1 Tasks in Parallel (Local Machine):**

```
Execute the complete local machine completion plan as defined in:
3-technical/3.2-implementation/plans/one-shot-launch-plan-2025-12-09.md

Phase 1: Local Machine Completion
Goal: Complete setup, testing, and verification on local machine before cloud deployment

Requirements:
1. Execute all Phase 1 tasks (1.1-1.6) following the exact specifications
2. All work is on LOCAL MACHINE (localhost) - no cloud deployment yet
3. For each task completion:
   - Update 3-technical/3.2-implementation/status/progress.md
   - Update 8-governance/changelog.md
   - Create/update any required documentation files
   - Add ADR to 8-governance/decision-log.md if new decisions made
4. Maintain full documentation tracking as specified in each task
5. Execute tasks in parallel where dependencies allow
6. Mark tasks complete only when all acceptance criteria met
7. Document any issues or blockers encountered
8. For Phase 2 preparation: Document cloud deployment requirements (but don't deploy yet)

Assigned Agents:
- @devops: Tasks 1.1 (Local Environment), 1.4 (Local Monitoring)
- @fullstack-engineer: Tasks 1.2 (Local Security), 1.6 (Local Completion)
- @docs-guardian: Task 1.3 (Legal Documents)
- @code-reviewer: Task 1.5 (Local Testing)

Local Environment:
- Backend: http://localhost:3000/api/v1
- Frontend: http://localhost:3001
- Database: localhost:5432 (Docker)
- Redis: localhost:6379 (Docker)
- All services running via Docker Compose

Start execution now.
```

## Documentation Tracking Summary

### Files That MUST Be Updated

**Progress Tracking:**
- `3-technical/3.2-implementation/status/progress.md` - After each task

**Changelog:**
- `8-governance/changelog.md` - After each task completion

**Decision Log:**
- `8-governance/decision-log.md` - If new architectural decisions made

**Risk Register:**
- `8-governance/risk-register.md` - If risks identified during execution

**New Documentation Files (Phase 1):**
- `3-technical/3.4-source-code/LOCAL-TESTING-CHECKLIST.md` - Local testing guide
- `3-technical/3.4-source-code/LOCAL-COMPLETION-SUMMARY.md` - Local completion summary
- `7-operations-monitoring/local-monitoring-guide.md` - Local monitoring guide
- `6-operations/legal/terms-of-service.md` - Terms of Service
- `6-operations/legal/privacy-policy.md` - Privacy Policy
- `3-technical/3.2-implementation/reviews/local-testing-2025-12-09.md` - Local test results

**New Documentation Files (Phase 2 - For Later):**
- `3-technical/3.3-devops/cloud-deployment-checklist.md` - Cloud deployment checklist
- `3-technical/3.3-devops/production-deployment.md` - Production deployment process
- `3-technical/3.3-devops/production-security-checklist.md` - Production security checklist
- `7-operations-monitoring/production-monitoring-checklist.md` - Production monitoring checklist

## Success Criteria

**Phase 1 (Local) is successful when:**
- ✅ All Phase 1 tasks complete
- ✅ All acceptance criteria met
- ✅ All documentation updated
- ✅ All systems operational on localhost
- ✅ All local testing passed
- ✅ Legal documents in place
- ✅ Local security configured
- ✅ Cloud deployment preparation documented (for Phase 2)

## Post-Phase 1

After Phase 1 completion:
- Update `8-governance/project-versions.md` with local completion milestone
- Update `8-governance/changelog.md` with Phase 1 completion entry
- Mark completion date in `3-technical/3.2-implementation/status/progress.md`
- Create Phase 2 plan for cloud deployment (when ready)
- Begin Phase 2 (Cloud Deployment) planning when ready to deploy

---

**Current mode:** plan  
**Task completed:** Plan created  
**Files created:**
- `3-technical/3.2-implementation/plans/one-shot-launch-plan-2025-12-09.md`

**Next recommended agent:** @devops, @fullstack-engineer, @docs-guardian, @code-reviewer (execute in parallel)  
**Next task:** Execute Phase 1 tasks (Local Machine Completion) as specified in one-shot-launch-plan-2025-12-09.md  
**Priority:** Critical

**Blockers/Issues:** None

