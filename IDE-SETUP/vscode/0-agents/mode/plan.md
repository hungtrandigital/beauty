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

### 0. Read Current Scope (ALWAYS START HERE)

**Before starting any planning:**
1. **Read `shared/context/current-scope.md`** - Understand finalized scope and context
2. **Verify scope aligns with planning** - Ensure you understand project type, audience, and goals
3. **If scope is unclear or missing:**
   - Ask user to finalize scope in Chat Mode first
   - Or ask clarifying questions and update `shared/context/current-scope.md` with user confirmation
4. **If planning reveals scope issues:**
   - Ask user about discrepancies
   - Update `shared/context/current-scope.md` with user confirmation

**Action:** Always read scope first, then plan according to the finalized context.

### 1. Product Planning
- **Product Overview:** Create or update `2-product-foundation/2.1-product-overview.md` (aligned with scope)
- **Backlog Management:** Prioritize and manage `2-product-foundation/2.2-product-backlog/backlog.md`
- **Requirements:** Write detailed PRDs in `2-product-foundation/requirements/`
- **User Stories:** Create user stories with acceptance criteria (Given-When-Then)

### 2. Technical Planning (MANDATORY - Never Skip)

**CRITICAL:** All technical documents in `3-technical/3.1-system-foundation/` MUST be created or updated before transitioning to Code Mode.

**Tech Stack Selection:**
- **Who selects:** @system-architecture agent
- **When:** First step in technical planning (before creating other documents)
- **How:** 
  - Check `shared/context/current-scope.md` for tech stack preferences
  - Check requirements for tech stack constraints
  - Select appropriate tech stack based on project requirements
  - Document in `infrastructure.md` and create ADR for tech stack decision

**Required Technical Documents Checklist:**
- ✅ **`infrastructure.md`** - **START HERE:** Tech stack selection, cloud providers, regions, scaling strategy, cost estimates
- ✅ **`architecture/domain-specs.md`** - Domain model using DDD (entities, aggregates, bounded contexts, events)
- ✅ **`architecture/api-contracts/`** - API contract definitions (OpenAPI, GraphQL, tRPC, REST, gRPC - based on tech stack)
- ✅ **`design-standards/system-design.md`** - System architecture with C4 model diagrams (Mermaid)
- ✅ **`design-standards/coding-standards.md`** - Code quality standards, patterns, conventions

**If any document is missing:**
- **DO NOT proceed to Code Mode**
- **Create the missing documents first**
- **Use @system-architecture agent** to ensure all technical documents are complete

**Technical Planning Activities:**
- **System Architecture:** Design system architecture in `3-technical/3.1-system-foundation/design-standards/system-design.md`
- **Domain Modeling:** Create domain specs using DDD in `3-technical/3.1-system-foundation/architecture/domain-specs.md`
- **API Contracts:** Define API contracts in `3-technical/3.1-system-foundation/architecture/api-contracts/`
- **Infrastructure:** Plan infrastructure in `3-technical/3.1-system-foundation/infrastructure.md`
- **Coding Standards:** Define coding standards in `3-technical/3.1-system-foundation/design-standards/coding-standards.md`
- **Implementation Plans:** Create plans in `3-technical/3.2-implementation/plans/`

### 3. Marketing & Business Planning
- **Go-to-Market Strategy:** Create or update `4-marketing/go-to-market.md` (strategy only)
- **Marketing Planning:** Plan marketing channels, campaigns, and content strategy
  - Plan what campaigns to run, when, and on which channels
  - Plan content topics and themes (not actual content)
  - Note: Actual marketing copy, creatives, and content are created in Execution Mode
- **Financial Planning:** Create detailed financial plans in `5-financing/plans.md`
- **Pitch Deck Planning:** Plan pitch deck structure, outline, key messages, and slide flow
  - Create pitch deck outline in `5-financing/pitches/outline.md` (if needed)
  - Define key messages and value propositions
  - Plan slide structure and flow
  - Note: Actual pitch deck visuals are created in Execution Mode

### 4. Creative & Brand Planning
- **Brand Guidelines:** Creative Director creates brand guidelines in `shared/assets/brand-guidelines/`
  - Color palette, typography, motion principles, brand voice
  - This is foundational planning (like architecture)
  - Note: Actual brand assets and visual identity elements are created in Execution Mode
- **Creative Direction:** Plan creative direction and visual identity strategy
  - Note: Actual designs, graphics, and creative assets are created in Execution Mode

### 5. Architecture Decision Records (ADRs)
- **Document Decisions:** Create ADRs in `8-governance/decision-log.md`
- **Status Tracking:** Mark ADRs as proposed | accepted | deprecated | superseded

## Allowed Actions

✅ **You CAN:**
- **Read `shared/context/current-scope.md`** - Always read scope before starting planning
- **Update `shared/context/current-scope.md`** - If planning reveals scope issues, ask user and update scope
- Create and modify files in `2-product-foundation/`, `3-technical/3.1-system-foundation/`, `4-marketing/`, `5-financing/`
- Create product requirements, user stories, acceptance criteria
- Design system architecture, domain models, API contracts
- Create implementation plans and technical specifications
- Update backlogs and roadmaps
- Create ADRs for architectural decisions
- Plan marketing strategies and financial projections

## Forbidden Actions

❌ **You CANNOT:**
- Write code in `3-technical/3.4-source-code/` (use Code Mode)
- Create actual designs, graphics, or visual assets (use Execution Mode)
- Write actual marketing copy or content (use Execution Mode)
- Create pitch deck visuals or slides (use Execution Mode)
- Create brand assets beyond guidelines (use Execution Mode)
- **Skip technical documents** - All required documents in `3-technical/3.1-system-foundation/` MUST be created
- **Transition to Code Mode** without completing technical planning checklist
- **Transition to Execution Mode** without brand guidelines (for creative work)
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
- **Technical Planning:** `3-technical/3.1-system-foundation/` (ALL REQUIRED)
  - `infrastructure.md` - Infrastructure design (cloud, scaling, cost, tech stack)
  - `design-standards/system-design.md` - System architecture with diagrams
  - `architecture/domain-specs.md` - Domain model (DDD)
  - `architecture/api-contracts/` - API contracts (OpenAPI, GraphQL, tRPC, etc.)
  - `design-standards/coding-standards.md` - Code quality standards and conventions
- **Implementation Plans:** `3-technical/3.2-implementation/plans/`
- **Marketing Plans:** `4-marketing/go-to-market.md`
- **Financial Plans:** `5-financing/plans.md`
- **ADRs:** `8-governance/decision-log.md`

## Mode Transition

Plan Mode typically transitions to:
- **Execution Mode** - When creative/strategic plans are ready (brand guidelines, marketing strategy, pitch deck outline)
- **Code Mode** - When technical plans are ready for implementation (ONLY after ALL technical documents are created)
- **Review Mode** - When plans need validation or quality check
- **Ideas Mode** - When plans reveal gaps that need research

**Before transitioning to Execution Mode:**
- ✅ Brand guidelines exist (for creative work)
- ✅ Marketing strategy is defined (for marketing deliverables)
- ✅ Product requirements are clear (for design work)
- ✅ Pitch deck outline exists (for pitch deck visuals)

**Before transitioning to Code Mode:**
- ✅ Verify ALL technical documents in `3-technical/3.1-system-foundation/` are created and populated
- ✅ If any document is missing, create it before transitioning

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
- ✅ **ALL technical documents in `3-technical/3.1-system-foundation/` are created:**
  - ✅ `infrastructure.md` exists and is populated
  - ✅ `architecture/domain-specs.md` exists and is populated
  - ✅ `architecture/api-contracts/` contains API contracts
  - ✅ `design-standards/system-design.md` exists with architecture diagrams
  - ✅ `design-standards/coding-standards.md` exists and is populated
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

**Remember:** Plan Mode is about creating actionable specifications and strategies.  
- Don't write code yet—that's for Code Mode.
- Don't create actual designs, copy, or visuals yet—that's for Execution Mode.

