# Plan Mode — AI-First Startup Factory

**Version:** v3.0  
**Purpose:** Define the scope, activities, and workflow for Plan Mode

## Overview

Plan Mode is the strategic planning phase where agents create detailed roadmaps, specifications, and architectural designs based on validated ideas. This mode focuses on translating validated concepts into actionable plans, requirements, and technical specifications without writing code.

## When to Use Plan Mode

Use Plan Mode when:
- **Creating product roadmaps** - Prioritizing features, defining backlogs, setting timelines
- **Writing requirements** - Creating PRDs, user stories, acceptance criteria
- **Designing architecture** - Creating system architecture, domain models, API contracts
- **Planning implementations** - Creating implementation plans, technical specifications
- **Strategic planning** - Defining go-to-market strategies, marketing plans, financial projections

## Core Activities

### 1. Product Planning
- **Product Overview:** Create or update `2-product-foundation/2.1-product-overview.md`
- **Backlog Management:** Prioritize and manage `2-product-foundation/2.2-product-backlog/backlog.md`
- **Requirements:** Write detailed PRDs in `2-product-foundation/requirements/`
- **User Stories:** Create user stories with acceptance criteria (Given-When-Then)

### 2. Technical Planning
- **System Architecture:** Design system architecture in `3-technical/3.1-system-foundation/system-design.md`
- **Domain Modeling:** Create domain specs using DDD in `3-technical/3.1-system-foundation/architecture/domain-specs.md`
- **API Contracts:** Define API contracts in `3-technical/3.1-system-foundation/architecture/api-contracts/`
- **Infrastructure:** Plan infrastructure in `3-technical/3.1-system-foundation/infrastructure.md`
- **Implementation Plans:** Create plans in `3-technical/3.2-implementation/plans/`

### 3. Marketing & Business Planning
- **Go-to-Market Strategy:** Create or update `4-marketing/go-to-market.md`
- **Marketing Channels:** Plan marketing channels and campaigns
- **Financial Planning:** Create detailed financial plans in `5-financing/plans.md`
- **Pitch Decks:** Plan pitch deck structure and content

### 4. Architecture Decision Records (ADRs)
- **Document Decisions:** Create ADRs in `8-governance/decision-log.md`
- **Status Tracking:** Mark ADRs as proposed | accepted | deprecated | superseded

## Allowed Actions

✅ **You CAN:**
- Create and modify files in `2-product-foundation/`, `3-technical/3.1-system-foundation/`, `4-marketing/`, `5-financing/`
- Create product requirements, user stories, acceptance criteria
- Design system architecture, domain models, API contracts
- Create implementation plans and technical specifications
- Update backlogs and roadmaps
- Create ADRs for architectural decisions
- Plan marketing strategies and financial projections

## Forbidden Actions

❌ **You CANNOT:**
- Write code in `3-technical/3.4-source-code/` (use Execution Mode)
- Skip requirement validation (all requirements must be clear and actionable)
- Create vague specifications ("make it better" → rejected)
- Make technical decisions without ADRs (for major changes)
- Skip backlog prioritization (use ICE/RICE/WSJF)
- Create requirements without success metrics

## Output Locations

All Plan Mode outputs go to:
- **Product Planning:** `2-product-foundation/`
  - `2.1-product-overview.md` - Product vision and overview
  - `2.2-product-backlog/backlog.md` - Prioritized backlog
  - `requirements/[feature-name]/` - Detailed requirements
- **Technical Planning:** `3-technical/3.1-system-foundation/`
  - `system-design.md` - System architecture
  - `architecture/domain-specs.md` - Domain model
  - `architecture/api-contracts/` - API contracts
  - `infrastructure.md` - Infrastructure design
- **Implementation Plans:** `3-technical/3.2-implementation/plans/`
- **Marketing Plans:** `4-marketing/go-to-market.md`
- **Financial Plans:** `5-financing/plans.md`
- **ADRs:** `8-governance/decision-log.md`

## Mode Transition

Plan Mode typically transitions to:
- **Execution Mode** - When plans are ready for implementation
- **Review Mode** - When plans need validation or quality check
- **Ideas Mode** - When plans reveal gaps that need research

## Orchestration Handoff Format

When in Plan Mode, use this format:

```markdown
**Current mode**: plan  
**Task completed**: [Yes/No/Partial]  
**Product/Feature/Architecture**: [Description]

**Files created/modified**:
- `2-product-foundation/[files]` OR
- `3-technical/3.1-system-foundation/[files]` OR
- `4-marketing/[files]` OR
- `5-financing/[files]`
- `8-governance/decision-log.md` (if ADR created)

**Next recommended agent**: @fullstack-engineer OR @system-architecture OR @ui-ux-designer  
**Next task**: "[Clear task description based on plan]"  
**Priority**: [High/Medium/Low]

**Blockers/Issues**: [None / List any blockers]
```

## Success Criteria

Plan Mode is successful when:
- ✅ All requirements are clear, actionable, and have success metrics
- ✅ Backlog is prioritized and manageable (≤30 active items)
- ✅ System architecture is documented with diagrams
- ✅ API contracts are complete and versioned
- ✅ Domain model accurately reflects business requirements
- ✅ Implementation plans are detailed and feasible
- ✅ All major decisions are documented as ADRs

## Related Documents

- **[Product Strategist Agent](../agents/product-strategist.md)** - Primary agent for product planning
- **[System Architecture Agent](../agents/system-architecture.md)** - Primary agent for technical planning
- **[Marketing Expert Agent](../agents/marketing-expert.md)** - Marketing planning
- **[Primary Workflow](../workflows/primary-workflow.md)** - Overall workflow context
- **[Global Rules](../_core/global-rules.md)** - Repository rules and constraints

---

**Remember:** Plan Mode is about creating actionable specifications.  
Don't write code yet—that's for Execution Mode.

