# Execution Mode — AI-First Startup Factory

**Version:** v3.0  
**Purpose:** Define the scope, activities, and workflow for Execution Mode

## Overview

Execution Mode is the implementation phase where agents create actual deliverables—code, designs, marketing assets, documentation, and other production-ready outputs. This mode focuses on building, creating, and implementing based on approved plans and specifications.

## When to Use Execution Mode

Use Execution Mode when:
- **Writing code** - Implementing features, fixing bugs, writing tests
- **Creating designs** - UI/UX designs, graphics, illustrations, brand assets
- **Writing content** - Marketing copy, documentation, blog posts
- **Building assets** - Creating marketing materials, pitch decks, social media content
- **Implementing infrastructure** - Setting up CI/CD, deployment configurations
- **Creating documentation** - Writing technical docs, user guides, API documentation

## Core Activities

### 1. Code Implementation
- **Frontend Development:** Write frontend code in `3-technical/3.4-source-code/frontend/`
- **Backend Development:** Write backend code in `3-technical/3.4-source-code/backend/`
- **Database:** Create schemas, migrations in `3-technical/3.4-source-code/db/`
- **Testing:** Write unit, integration, and E2E tests in `3-technical/3.4-source-code/tests/`
- **CI/CD:** Configure CI/CD pipelines in `.github/workflows/` or equivalent

### 2. Design & Creative
- **UI/UX Design:** Create designs in `shared/assets/ui-ux/`
- **Graphics:** Create graphics in `shared/assets/graphics/`
- **Brand Assets:** Create brand assets in `shared/assets/brand-guidelines/`
- **Marketing Creatives:** Create marketing assets in `4-marketing/creatives/`

### 3. Content Creation
- **Marketing Copy:** Write copy in `4-marketing/copy/`
- **Documentation:** Write docs in appropriate sections
- **Blog Posts:** Create content for marketing/blog

### 4. Infrastructure & DevOps
- **Deployment Config:** Create deployment configs in `3-technical/3.3-devops/`
- **Server Setup:** Document server steps in `3-technical/3.3-devops/server-steps.md`
- **Monitoring:** Set up monitoring and alerting

### 5. Documentation Updates
- **Progress Tracking:** Update `3-technical/3.2-implementation/status/progress.md`
- **Changelog:** Update `8-governance/changelog.md`
- **History:** Update implementation history in `3-technical/3.2-implementation/history/`

## Allowed Actions

✅ **You CAN:**
- Write code in `3-technical/3.4-source-code/`
- Create designs, graphics, and visual assets
- Write marketing copy and content
- Create documentation
- Configure CI/CD and deployment
- Update progress and changelog files
- Create implementation files based on approved plans

## Forbidden Actions

❌ **You CANNOT:**
- Write code without approved requirements (must have PRD or spec)
- Skip tests (all new code must have tests with ≥90% coverage)
- Commit secrets or sensitive data
- Create files outside the defined structure
- Skip code review (all code must be reviewed)
- Ignore coding standards from `development-rules.md`
- Deploy directly to production (must go through staging)
- Create designs without brand guidelines approval

## Output Locations

All Execution Mode outputs go to:
- **Source Code:** `3-technical/3.4-source-code/`
  - `frontend/` - Frontend application code
  - `backend/` - Backend application code
  - `tests/` - Test files
  - `db/` - Database files
- **Designs:** `shared/assets/ui-ux/`, `shared/assets/graphics/`
- **Marketing Assets:** `4-marketing/creatives/`, `4-marketing/copy/`
- **DevOps:** `3-technical/3.3-devops/`
- **Documentation:** Appropriate sections based on content type
- **Progress:** `3-technical/3.2-implementation/status/progress.md`
- **Changelog:** `8-governance/changelog.md`

## Mode Transition

Execution Mode typically transitions to:
- **Review Mode** - When code/designs are ready for review
- **Plan Mode** - When implementation reveals gaps in planning
- **Execution Mode** (continue) - When iterating on implementations

## Pre-Execution Checklist

Before starting execution, ensure:
- ✅ Requirements are approved and clear
- ✅ Technical specifications exist
- ✅ Architecture is defined (for code)
- ✅ Brand guidelines are available (for designs)
- ✅ Tests are planned (for code)
- ✅ Deployment process is understood

## Quality Standards

Execution Mode must meet:
- **Code Quality:** Follows coding standards, passes linting, type checking
- **Test Coverage:** ≥90% for new code
- **Accessibility:** WCAG 2.1 AA minimum (for frontend)
- **Documentation:** All code/designs are documented
- **Brand Consistency:** All designs align with brand guidelines
- **Performance:** Meets performance budgets

## Orchestration Handoff Format

When in Execution Mode, use this format:

```markdown
**Current mode**: execution  
**Task completed**: [Yes/No/Partial]  
**Feature/Epic/Asset**: [Description]

**Files created/modified**:
- `3-technical/3.4-source-code/[paths]` (for code) OR
- `shared/assets/[paths]` (for designs) OR
- `4-marketing/[paths]` (for marketing assets)
- `3-technical/3.2-implementation/status/progress.md`
- `8-governance/changelog.md`

**Tests status**: [All passing / X failing]
**Coverage**: [X% for new code] (if code)

**Next recommended agent**: @code-reviewer OR @creative-director OR @docs-guardian  
**Next task**: "[Clear task description]"  
**Priority**: [High/Medium/Low]

**Blockers/Issues**: [None / List any blockers]
```

## Success Criteria

Execution Mode is successful when:
- ✅ Code is production-ready and passes all tests
- ✅ Designs are on-brand and accessible
- ✅ All deliverables meet quality standards
- ✅ Documentation is complete and up-to-date
- ✅ Progress is tracked and changelog updated
- ✅ Code review is passed (for code)
- ✅ Creative Director approval obtained (for designs)

## Related Documents

- **[Fullstack Engineer Agent](../agents/fullstack-engineer.md)** - Primary agent for code execution
- **[UI/UX Designer Agent](../agents/ui-ux-designer.md)** - Design execution
- **[Graphics Designer Agent](../agents/graphics-designer.md)** - Graphics execution
- **[DevOps Agent](../agents/devops.md)** - Infrastructure execution
- **[Code Reviewer Agent](../agents/code-reviewer.md)** - Code review (post-execution)
- **[Development Rules](../workflows/development-rules.md)** - Code quality standards
- **[Primary Workflow](../workflows/primary-workflow.md)** - Overall workflow context
- **[Global Rules](../_core/global-rules.md)** - Repository rules and constraints

---

**Remember:** Execution Mode is about creating production-ready deliverables.  
Quality > speed. Standards > shortcuts.

