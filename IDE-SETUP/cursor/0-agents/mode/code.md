# Code Mode — AI-First Startup Factory

**Version:** v3.0  
**Purpose:** Define the scope, activities, and workflow for Code Mode (technical implementation)

## Overview

Code Mode is the technical implementation phase where agents write code, create tests, configure infrastructure, and build technical systems based on approved technical specifications. This mode focuses exclusively on technical work—code, tests, CI/CD, and infrastructure.

**Command:** Use `/code` in Cursor IDE to activate this mode.

**Agency Type:** Technical Agency

**Note:** For creative/strategic deliverables (designs, marketing assets, content), use Execution Mode instead.

## When to Use Code Mode

Use Code Mode when:
- **Writing code** - Implementing features, fixing bugs, writing tests
- **Writing tests** - Unit tests, integration tests, E2E tests
- **Implementing infrastructure** - Setting up CI/CD, deployment configurations
- **Configuring DevOps** - Server setup, monitoring, alerting
- **Writing technical documentation** - API docs, technical guides, code documentation
- **Database work** - Creating schemas, migrations, database code

**Note:** For designs, marketing assets, content, or creative deliverables, use Execution Mode instead.

## Core Activities

### 0. Read Current Scope (ALWAYS START HERE)

**Before starting any implementation:**
1. **Read `shared/context/current-scope.md`** - Understand finalized scope and context
2. **Verify implementation aligns with scope** - Ensure you understand project type, audience, and goals
3. **If scope is unclear or missing:**
   - Ask user to finalize scope in Chat Mode first
   - Or ask clarifying questions before proceeding

**Action:** Always read scope first, then implement according to the finalized context.

### 1. Code Implementation
- **Frontend Development:** Write frontend code in `3-technical/3.4-source-code/frontend/`
  - Implement UI based on designs from Execution Mode
  - Follow brand guidelines and design system
- **Backend Development:** Write backend code in `3-technical/3.4-source-code/backend/`
- **Database:** Create schemas, migrations in `3-technical/3.4-source-code/db/`
- **API Implementation:** Implement APIs based on contracts from Plan Mode

### 2. Testing
- **Unit Tests:** Write unit tests in `3-technical/3.4-source-code/tests/unit/`
- **Integration Tests:** Write integration tests in `3-technical/3.4-source-code/tests/integration/`
- **E2E Tests:** Write E2E tests in `3-technical/3.4-source-code/tests/e2e/`
- **Test Coverage:** Ensure ≥90% coverage for new code

### 3. Infrastructure & DevOps
- **CI/CD:** Configure CI/CD pipelines in `.github/workflows/` or equivalent
- **Deployment Config:** Create deployment configs in `3-technical/3.3-devops/`
- **Server Setup:** Document server steps in `3-technical/3.3-devops/server-steps.md`
- **Monitoring:** Set up monitoring and alerting

### 4. Technical Documentation
- **API Documentation:** Write API documentation
- **Technical Guides:** Write technical guides and how-tos
- **Code Documentation:** Write code comments and inline documentation

### 5. Documentation Updates
- **Progress Tracking:** Update `3-technical/3.2-implementation/status/progress.md`
- **Changelog:** Update `8-governance/changelog.md`
- **History:** Update implementation history in `3-technical/3.2-implementation/history/`

## Allowed Actions

✅ **You CAN:**
- **Read `shared/context/current-scope.md`** - Always read scope before starting implementation
- **Read designs from Execution Mode** - Review UI/UX designs before implementing frontend
- Write code in `3-technical/3.4-source-code/`
- Write tests (unit, integration, E2E)
- Configure CI/CD and deployment
- Configure infrastructure and DevOps
- Write technical documentation
- Update progress and changelog files
- Create implementation files based on approved technical specifications

## Forbidden Actions

❌ **You CANNOT:**
- Write code without approved requirements (must have PRD or spec)
- Skip tests (all new code must have tests with ≥90% coverage)
- Commit secrets or sensitive data
- Create files outside the defined structure
- Skip code review (all code must be reviewed)
- Ignore coding standards from `development-rules.md`
- Deploy directly to production (must go through staging)
- Create designs, graphics, or visual assets (use Execution Mode)
- Write marketing copy or content (use Execution Mode)
- Create brand assets (use Execution Mode)
- **Skip documentation** - All projects must have complete documentation
- **Hardcode versions** - Use minimum requirements (e.g., "Node.js 18+" not "Node.js 18.5.2")
- **Hardcode credentials** - Use environment variables, add security warnings
- **Skip `.env.example`** - If project uses environment variables, `.env.example` is mandatory

## Output Locations

All Code Mode outputs go to:
- **Source Code:** `3-technical/3.4-source-code/`
  - `frontend/` - Frontend application code
  - `backend/` - Backend application code
  - `tests/` - Test files (unit, integration, E2E)
  - `db/` - Database files, schemas, migrations
- **Infrastructure:** `3-technical/3.3-devops/`
  - Deployment configs
  - Server setup documentation
  - CI/CD configurations
- **Technical Documentation:** Appropriate technical documentation sections
- **Progress:** `3-technical/3.2-implementation/status/progress.md`
- **Changelog:** `8-governance/changelog.md`

**Note:** Designs, marketing assets, and creative deliverables go to Execution Mode outputs.

## Mode Transition

Code Mode typically transitions to:
- **Review Mode** - When code is ready for Code Reviewer
- **Execution Mode** - When code needs design assets or creative direction
- **Plan Mode** - When implementation reveals gaps in planning
- **Code Mode** (continue) - When iterating on implementations

## Pre-Execution Checklist

Before starting code implementation, ensure:
- ✅ Requirements are approved and clear
- ✅ ALL technical specifications exist (from Plan Mode)
- ✅ Architecture is defined
- ✅ API contracts are defined
- ✅ Coding standards are defined
- ✅ Tests are planned
- ✅ Deployment process is understood
- ✅ Designs are available (from Execution Mode, if implementing frontend)

## Quality Standards

Code Mode must meet:
- **Code Quality:** Follows coding standards, passes linting, type checking
- **Test Coverage:** ≥90% for new code
- **Accessibility:** WCAG 2.1 AA minimum (for frontend - when implementing designs)
- **Documentation (10-Year Maintainability):**
  - ✅ `README.md` exists and is complete (no hardcoded versions, security warnings)
  - ✅ `.env.example` exists if project uses environment variables (MANDATORY)
  - ✅ No hardcoded credentials in documentation
  - ✅ Language consistency (English for technical docs)
  - ✅ Environment variables documented with explanations
  - ✅ Version flexibility (minimum requirements, not hardcoded)
  - ✅ Links validated and working
  - ✅ Examples are current and functional
- **Design Implementation:** Frontend code accurately implements designs from Execution Mode
- **Performance:** Meets performance budgets

## Orchestration Handoff Format

When in Code Mode, use this format:

```markdown
**Current mode**: code  
**Task completed**: [Yes/No/Partial]  
**Feature/Epic/Asset**: [Description]

**Files created/modified**:
- `3-technical/3.4-source-code/[paths]` (code)
- `3-technical/3.3-devops/[paths]` (infrastructure)
- `3-technical/3.2-implementation/status/progress.md`
- `8-governance/changelog.md`

**Tests status**: [All passing / X failing]
**Coverage**: [X% for new code]

**Design Implementation**: [Yes/No - Implemented designs from Execution Mode]

**Next recommended agent**: @code-reviewer OR @docs-guardian  
**Next task**: "[Clear task description]"  
**Priority**: [High/Medium/Low]

**Blockers/Issues**: [None / List any blockers]
```

## Success Criteria

Code Mode is successful when:
- ✅ Code is production-ready and passes all tests
- ✅ Test coverage ≥90% for new code
- ✅ Code accurately implements designs (if frontend)
- ✅ All technical deliverables meet quality standards
- ✅ Documentation is complete and up-to-date
- ✅ Progress is tracked and changelog updated
- ✅ Code review is passed

## Related Documents

- **[Fullstack Engineer Agent](../agents/fullstack-engineer.md)** - Primary agent for code execution
- **[DevOps Agent](../agents/devops.md)** - Infrastructure execution
- **[Code Reviewer Agent](../agents/code-reviewer.md)** - Code review (post-execution)
- **[Execution Mode](execution.md)** - Creates designs and creative assets that Code Mode implements
- **[Plan Mode](plan.md)** - Creates technical specifications that Code Mode implements
- **[Development Rules](../workflows/development-rules.md)** - Code quality standards
- **[Primary Workflow](../workflows/primary-workflow.md)** - Overall workflow context
- **[Global Rules](../_core/global-rules.md)** - Repository rules and constraints

---

**Remember:** Code Mode is about creating production-ready technical deliverables.  
Quality > speed. Standards > shortcuts. Code only—designs and content go to Execution Mode.

