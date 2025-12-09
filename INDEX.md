# Full Directory Tree

This file provides a complete directory listing with hyperlinks for quick navigation. Generate an updated version using `tree -a > INDEX.md` or similar tools.

## Directory Structure

```
factory/
├── README.md
├── INDEX.md
├── 0-agents/
│   ├── _core/
│   │   ├── global-rules.md
│   │   └── hpo.md
│   ├── agents/
│   │   ├── boost.md
│   │   ├── business-analyst.md
│   │   ├── code-reviewer.md
│   │   ├── creative-director.md
│   │   ├── devops.md
│   │   ├── docs-guardian.md
│   │   ├── fullstack-engineer.md
│   │   ├── graphics-designer.md
│   │   ├── market-research.md
│   │   ├── marketing-expert.md
│   │   ├── product-strategist.md
│   │   ├── system-architecture.md
│   │   ├── ui-ux-designer.md
│   │   └── skills/
│   ├── mode/
│   │   ├── chat.md
│   │   ├── boost.md
│   │   ├── code.md
│   │   ├── execution.md
│   │   ├── ideas.md
│   │   ├── plan.md
│   │   ├── review.md
│   │   └── fix.md
│   └── workflows/
│       ├── creative.md
│       ├── development-rules.md
│       ├── development.md
│       ├── documentation-management.md
│       ├── financing.md
│       ├── marketing.md
│       ├── orchestration-protocol.md
│       └── primary-workflow.md
├── 1-ideas/
│   ├── README.md
│   ├── 1.1-market-research/
│   │   ├── README.md
│   │   ├── reports/
│   │   ├── summaries.md
│   │   ├── templates/
│   │   └── resources/
│   ├── 1.2-initial-financing-plan.md
│   └── 1.3-initial-go-to-market-plan.md
├── 2-product-foundation/
│   ├── README.md
│   ├── 2.1-product-overview.md
│   ├── 2.2-product-backlog/
│   │   └── backlog.md
│   └── requirements/
├── 3-technical/
│   ├── README.md
│   ├── 3.1-system-foundation/
│   │   ├── infrastructure.md
│   │   ├── architecture/
│   │   │   ├── domain-specs.md
│   │   │   └── api-contracts/
│   │   └── design-standards/
│   │       ├── coding-standards.md
│   │       └── system-design.md
│   ├── 3.2-implementation/
│   │   ├── README.md
│   │   ├── status/
│   │   │   └── progress.md
│   │   ├── history/
│   │   │   ├── epics/
│   │   │   └── history.log.md
│   │   └── plans/
│   │       ├── epics/
│   │       ├── plan.md
│   │       └── plan-overview.md
│   ├── 3.3-devops/
│   │   ├── README.md
│   │   ├── local-config/
│   │   └── server-steps.md
│   └── 3.4-source-code/
│       ├── README.md
│       ├── frontend/
│       ├── backend/
│       ├── tests/
│       └── db/
├── 4-marketing/
│   ├── README.md
│   ├── go-to-market.md
│   ├── channels/
│   ├── personas.md
│   └── performance/
├── 5-financing/
│   ├── README.md
│   ├── plans.md
│   ├── pitches/
│   └── projections/
├── 6-operations/
│   ├── README.md
│   ├── team-structure.md
│   ├── legal/
│   │   ├── README.md
│   │   ├── compliance/
│   │   ├── contracts/
│   │   ├── regulatory/
│   │   └── policies/
│   ├── hr/
│   │   ├── README.md
│   │   ├── policies/
│   │   ├── onboarding/
│   │   ├── performance/
│   │   ├── benefits/
│   │   └── templates/
│   └── vendor-contracts/
│       ├── README.md
│       ├── active/
│       ├── templates/
│       ├── evaluations/
│       └── renewals/
├── 7-operations-monitoring/
│   ├── README.md
│   ├── system-monitoring/
│   ├── marketing-analytics.md
│   └── incident-response.md
├── 8-governance/
│   ├── README.md
│   ├── project-versions.md
│   ├── changelog.md
│   ├── decision-log.md
│   ├── risk-register.md
│   └── quarterly-retrospective/
│       ├── README.md
│       └── q4-2025.md
├── shared/
│   ├── README.md
│   ├── templates/
│   └── assets/
└── archives/
    └── README.md
```

## Quick Links

### AI Agents & Workflows
- [0-agents/](0-agents/README.md) - AI agent configurations and workflows
- [Core Rules](0-agents/_core/global-rules.md)
- [Primary Workflow](0-agents/workflows/primary-workflow.md)
- [Workflows](0-agents/workflows/)
- [Modes](0-agents/mode/)
- [Agents](0-agents/agents/) - All agent definitions

### Ideas & Research
- [1-ideas/README.md](1-ideas/README.md)
- [Market Research](1-ideas/1.1-market-research/README.md)
- [Initial Financing Plan](1-ideas/1.2-initial-financing-plan.md) → [Final: 5-financing/plans.md](5-financing/plans.md)
- [Initial Go-to-Market Plan](1-ideas/1.3-initial-go-to-market-plan.md) → [Final: 4-marketing/go-to-market.md](4-marketing/go-to-market.md)

### Product
- [Product Foundation](2-product-foundation/README.md)
- [Product Overview](2-product-foundation/2.1-product-overview.md)
- [Product Backlog](2-product-foundation/2.2-product-backlog/backlog.md)

### Technical
- [Technical Overview](3-technical/README.md)
- [System Foundation](3-technical/3.1-system-foundation/)
- [Implementation](3-technical/3.2-implementation/README.md)
- [DevOps](3-technical/3.3-devops/README.md)
- [Source Code](3-technical/3.4-source-code/README.md)

### Marketing & Finance
- [Marketing](4-marketing/README.md)
- [Financing](5-financing/README.md)

### Operations
- [Operations](6-operations/README.md) - Team, legal, HR, vendors
- [Operations & Monitoring](7-operations-monitoring/README.md) - System monitoring

### Governance
- [Governance](8-governance/README.md) - Versions, decisions, risks, retrospectives
- [Project Versions](8-governance/project-versions.md)
- [Changelog](8-governance/changelog.md)
- [Decision Log](8-governance/decision-log.md)
- [Risk Register](8-governance/risk-register.md)
- [Quarterly Retrospectives](8-governance/quarterly-retrospective/README.md)

### Shared Resources
- [Shared Templates](shared/README.md)
- [Archives](archives/README.md)

---

*Regenerate this file periodically using: `tree -a > INDEX.md`*

