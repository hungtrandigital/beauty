# Copilot Instructions — AI-First Startup Factory

This repository is a structured template for AI agents to operate autonomously on startup projects. All agents must follow these instructions.

## Critical First Steps

1. **Read `INDEX.md`** before any action to understand the directory structure
2. **Read `0-agents/_core/global-rules.md`** for non-negotiable rules
3. **Identify your mode** from `0-agents/mode/` (ideas → plan → execution → review)

## Directory Structure Rules

| Content Type | Location | Notes |
|-------------|----------|-------|
| All source code | `3-technical/3.4-source-code/` | frontend/, backend/, tests/, db/ |
| Architecture specs | `3-technical/3.1-system-foundation/` | domain-specs, api-contracts, design-standards |
| Implementation plans | `3-technical/3.2-implementation/plans/` | Create before coding |
| Product requirements | `2-product-foundation/requirements/` | Read before implementation |
| Initial ideas/research | `1-ideas/` | Move finalized docs to proper folders |

**Never create files outside the defined structure.** If unsure, check `INDEX.md`.

## Agent Orchestration Protocol

Always end responses with the handoff block from `0-agents/workflows/orchestration-protocol.md`:

```markdown
### ORCHESTRATION HANDOFF
**Current mode**: execution | plan | ideas | review
**Task completed**: Yes / No
**Files created/modified**: [list paths]
**Next recommended agent**: @agent-name / @human
**Next task**: "[description]"
**Priority**: High / Medium / Low
```

## Mode-Specific Behavior

- **ideas** → Only research/brainstorm, output to `1-ideas/`
- **plan** → Create roadmaps/specs, output to `2-product-foundation/`, `3-technical/3.1-system-foundation/`
- **execution** → Write code in `3-technical/3.4-source-code/`, create assets
- **review** → QA only, no new features, output to `8-governance/`

## Mandatory Updates After Changes

After modifying any file, update:
- `INDEX.md` (if structure changed)
- `8-governance/changelog.md` (all changes)
- `3-technical/3.2-implementation/status/progress.md` (if code-related)

## Code Implementation Workflow

1. Read specs from `3-technical/3.1-system-foundation/architecture/`
2. Check/create implementation plan in `3-technical/3.2-implementation/plans/`
3. Implement in `3-technical/3.4-source-code/` following directory structure
4. Run tests — **never use mocks or fake data just to pass builds**
5. Delegate to code-reviewer agent before completion

## File Naming Conventions

- Use **kebab-case** for all files and folders
- Dates: `YYYY-MM-DD`
- Versioned archives: `filename.v2025-12-09.md` (only in `archives/`)

## Forbidden Actions

- ❌ Deleting files without moving to `archives/` first
- ❌ Creating files outside defined structure
- ❌ Skipping review for code/architecture changes
- ❌ Committing secrets/API keys (use `3-technical/3.3-devops/local-config/`)
- ❌ More than 2 review rejection cycles without escalating to @human

## Key Reference Files

- `0-agents/agents/*.md` — Individual agent definitions and workflows
- `0-agents/workflows/primary-workflow.md` — Default execution workflow
- `shared/templates/` — Copy templates before creating new documents
- `8-governance/decision-log.md` — Document architectural decisions (ADR format)
