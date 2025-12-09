# Ideas Mode — AI-First Startup Factory

**Version:** v3.0  
**Purpose:** Define the scope, activities, and workflow for Ideas Mode

## Overview

Ideas Mode is the initial phase of the project lifecycle where agents explore, research, validate, and synthesize ideas before they become formal plans. This mode focuses on discovery, validation, and early-stage analysis without committing to specific implementations.

## When to Use Ideas Mode

Use Ideas Mode when:
- **Starting a new project or feature** - Exploring initial concepts and possibilities
- **Conducting market research** - Gathering data, analyzing competitors, understanding market needs
- **Validating business cases** - Creating financial models, unit economics, TAM/SAM/SOM calculations
- **Brainstorming solutions** - Generating ideas without constraints
- **Early-stage planning** - Creating initial plans that will later be refined (e.g., initial financing plan, initial go-to-market plan)

## Core Activities

### 1. Research & Discovery
- **Market Research:** Conduct comprehensive market analysis, competitor research, customer interviews
- **Data Collection:** Gather quantitative and qualitative data from various sources
- **Trend Analysis:** Identify market trends, opportunities, and threats
- **Customer Validation:** Understand customer pain points, needs, and willingness to pay

### 2. Business Analysis
- **Financial Modeling:** Create unit economics models (CAC, LTV, payback period, gross margin)
- **Market Sizing:** Calculate TAM/SAM/SOM with sources and methodology
- **Competitive Analysis:** Build competitor matrices, feature comparisons, positioning analysis
- **Risk Assessment:** Identify and document risks in `8-governance/risk-register.md`

### 3. Initial Planning
- **Initial Financing Plan:** Create early-stage financial projections in `1-ideas/1.2-initial-financing-plan.md`
- **Initial Go-to-Market Plan:** Draft early GTM strategy in `1-ideas/1.3-initial-go-to-market-plan.md`
- **Business Cases:** Write business cases for major initiatives with go/no-go recommendations

### 4. Documentation
- **Research Reports:** Document findings in `1-ideas/1.1-market-research/reports/`
- **Summaries:** Maintain executive summaries in `1-ideas/1.1-market-research/summaries.md`
- **Business Cases:** Create business case documents in `1-ideas/business-case-[feature-or-product].md`

## Allowed Actions

✅ **You CAN:**
- Create and modify files in `1-ideas/` directory
- Conduct research and gather data
- Create financial models and business cases
- Update `8-governance/risk-register.md` with identified risks
- Create initial plans (will be moved to final locations later)
- Use web search (if authorized) for market research
- Generate ideas and brainstorm solutions

## Forbidden Actions

❌ **You CANNOT:**
- Create detailed product requirements (use Plan Mode)
- Write code or technical specifications (use Execution Mode)
- Create final marketing plans (initial only, final goes to `4-marketing/`)
- Create final financing plans (initial only, final goes to `5-financing/`)
- Make final go/no-go decisions (only recommendations)
- Skip research validation (all claims must have sources)

## Output Locations

All Ideas Mode outputs go to:
- **Market Research:** `1-ideas/1.1-market-research/`
  - `reports/` - Detailed research reports
  - `summaries.md` - Executive summaries
  - `resources/` - Reference materials
- **Business Cases:** `1-ideas/business-case-[feature-or-product].md`
- **Initial Plans:** 
  - `1-ideas/1.2-initial-financing-plan.md` (→ final: `5-financing/plans.md`)
  - `1-ideas/1.3-initial-go-to-market-plan.md` (→ final: `4-marketing/go-to-market.md`)
- **Risks:** `8-governance/risk-register.md`

## Mode Transition

Ideas Mode typically transitions to:
- **Plan Mode** - When ideas are validated and ready for detailed planning
- **Review Mode** - When research needs validation or quality check

## Orchestration Handoff Format

When in Ideas Mode, use this format:

```markdown
**Current mode**: ideas  
**Task completed**: [Yes/No/Partial]  
**Research/Analysis Topic**: [Description]

**Files created/modified**:
- `1-ideas/1.1-market-research/[files]`
- `1-ideas/business-case-[name].md`
- `8-governance/risk-register.md`

**Key Findings**:
- [Finding 1]
- [Finding 2]

**Next recommended agent**: @product-strategist OR @business-analyst  
**Next task**: "[Clear task description]"  
**Priority**: [High/Medium/Low]

**Blockers/Issues**: [None / List any blockers]
```

## Success Criteria

Ideas Mode is successful when:
- ✅ All research is properly documented with sources
- ✅ Business cases have clear go/no-go recommendations
- ✅ Financial models are accurate and validated
- ✅ Risks are identified and documented
- ✅ Initial plans are created and ready for refinement
- ✅ Data supports product strategy decisions

## Related Documents

- **[Market Research Agent](../agents/market-research.md)** - Primary agent for Ideas Mode
- **[Business Analyst Agent](../agents/business-analyst.md)** - Business case creation
- **[Primary Workflow](../workflows/primary-workflow.md)** - Overall workflow context
- **[Global Rules](../_core/global-rules.md)** - Repository rules and constraints

---

**Remember:** Ideas Mode is about exploration and validation.  
Don't commit to implementations yet—that's for Plan and Execution modes.

