# Agent Modes — AI-First Startup Factory

**Version:** v3.0

## Overview

Agent Modes define the operational context and scope of work for AI agents in the factory. Each mode has specific activities, allowed actions, and output locations. Agents must operate within the appropriate mode based on their current task.

## The Four Modes

### 1. [Ideas Mode](ideas.md)
**Purpose:** Exploration, research, validation, and early-stage analysis  
**When:** Starting new projects, conducting research, validating business cases  
**Output:** `1-ideas/`, business cases, initial plans

### 2. [Plan Mode](plan.md)
**Purpose:** Strategic planning, requirements, architecture, specifications  
**When:** Creating roadmaps, writing requirements, designing architecture  
**Output:** `2-product-foundation/`, `3-technical/3.1-system-foundation/`, `4-marketing/`, `5-financing/`

### 3. [Execution Mode](execution.md)
**Purpose:** Implementation, creation, building deliverables  
**When:** Writing code, creating designs, building assets  
**Output:** `3-technical/3.4-source-code/`, `shared/assets/`, `4-marketing/creatives/`

### 4. [Review Mode](review.md)
**Purpose:** Quality assurance, validation, compliance checking  
**When:** Reviewing code, designs, documentation, conducting retrospectives  
**Output:** Review reports, retrospectives, quality assessments

## Mode Selection

Agents should select the appropriate mode based on:
- **Task Type:** What type of work is being done?
- **Current Phase:** Where is the project in its lifecycle?
- **Deliverable Type:** What is being created or reviewed?

## Mode Transitions

Modes typically transition in this flow:

```
Ideas Mode → Plan Mode → Execution Mode → Review Mode
     ↑                                        ↓
     └────────────────────────────────────────┘
```

- **Ideas → Plan:** When ideas are validated and ready for planning
- **Plan → Execution:** When plans are approved and ready for implementation
- **Execution → Review:** When deliverables are ready for review
- **Review → Execution:** When reviews require fixes
- **Review → Plan:** When reviews reveal planning gaps
- **Any → Ideas:** When gaps require research

## Mode Rules

### General Rules
- ✅ Agents must operate within the appropriate mode
- ✅ Mode must be declared in orchestration handoff
- ✅ Mode determines allowed actions and output locations
- ✅ Mode transitions should be logical and documented

### Mode-Specific Rules
- See individual mode documentation for specific rules:
  - [Ideas Mode Rules](ideas.md#allowed-actions)
  - [Plan Mode Rules](plan.md#allowed-actions)
  - [Execution Mode Rules](execution.md#allowed-actions)
  - [Review Mode Rules](review.md#forbidden-actions)

## Orchestration Handoff

All agents must declare their current mode in the orchestration handoff:

```markdown
**Current mode**: [ideas|plan|execution|review]
```

## Related Documents

- **[Global Rules](../_core/global-rules.md)** - Repository-wide rules including mode definitions
- **[Primary Workflow](../workflows/primary-workflow.md)** - Overall workflow that uses modes
- **[Orchestration Protocol](../workflows/orchestration-protocol.md)** - How agents coordinate
- **[Agent Definitions](../agents/)** - Individual agent configurations

## Quick Reference

| Mode | Primary Activities | Output Location | Typical Agents |
|------|-------------------|-----------------|----------------|
| **Ideas** | Research, validation, business cases | `1-ideas/` | Market Research, Business Analyst |
| **Plan** | Requirements, architecture, roadmaps | `2-product-foundation/`, `3-technical/3.1-system-foundation/` | Product Strategist, System Architecture |
| **Execution** | Code, designs, assets | `3-technical/3.4-source-code/`, `shared/assets/` | Fullstack Engineer, UI/UX Designer, Graphics Designer |
| **Review** | Code review, QA, retrospectives | Review reports, `8-governance/` | Code Reviewer, Docs Guardian |

---

**Remember:** Modes define what you can do, not who you are.  
Choose the right mode for the task at hand.

