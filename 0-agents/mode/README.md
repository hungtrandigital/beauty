# Agent Modes — AI-First Startup Factory

**Version:** v3.0

## Overview

Agent Modes define the operational context and scope of work for AI agents in the factory. Each mode has specific activities, allowed actions, and output locations. Agents must operate within the appropriate mode based on their current task.

## The Seven Modes

### 0. [Chat Mode](chat.md) (Default)
**Purpose:** General conversation, Q&A, informal discussion  
**When:** Casual chat, questions, clarifications, no specific task  
**Output:** None (conversation only, except `shared/context/current-scope.md`)

### 1. [Ideas Mode](ideas.md)
**Purpose:** Exploration, research, validation, and early-stage analysis  
**When:** Starting new projects, conducting research, validating business cases  
**Output:** `1-ideas/`, business cases, initial plans

### 2. [Plan Mode](plan.md)
**Purpose:** Strategic planning, requirements, architecture, specifications  
**When:** Creating roadmaps, writing requirements, designing architecture, planning strategies  
**Output:** `2-product-foundation/`, `3-technical/3.1-system-foundation/`, `4-marketing/go-to-market.md`, `5-financing/plans.md`, brand guidelines

### 3. [Execution Mode](execution.md)
**Purpose:** Strategic/creative execution - designs, marketing assets, content  
**When:** Creating designs, writing marketing copy, creating creative assets  
**Output:** `shared/assets/`, `4-marketing/copy/`, `4-marketing/creatives/`, `5-financing/pitches/visuals/`

### 4. [Code Mode](code.md)
**Purpose:** Technical implementation - code, tests, infrastructure  
**When:** Writing code, writing tests, configuring CI/CD, setting up infrastructure  
**Output:** `3-technical/3.4-source-code/`, `3-technical/3.3-devops/`

### 5. [Review Mode](review.md)
**Purpose:** Quality assurance, validation, compliance checking  
**When:** Reviewing code, designs, documentation, conducting retrospectives  
**Output:** Review reports, retrospectives, quality assessments

### 6. [Fix Mode](fix.md)
**Purpose:** Issue resolution, bug fixes, problem-solving  
**When:** Fixing bugs, resolving issues, addressing problems  
**Output:** Fixed code, updated tests, changelog entries

## Mode Selection

Agents should select the appropriate mode based on:
- **Task Type:** What type of work is being done?
- **Current Phase:** Where is the project in its lifecycle?
- **Deliverable Type:** What is being created or reviewed?

## Mode Transitions

Modes typically transition in this flow:

```
Chat Mode (Default)
     │
     ├─→ Ideas Mode → Plan Mode → Execution Mode → Review Mode
     │                        │         │              ↓
     │                        │         └─→ Code Mode ─┘
     │                        │              │
     │                        └──────────────┘
     │        ↑                                        ↓
     │        └────────────────────────────────────────┘
     │
     ├─→ Fix Mode (can enter from any mode for issue resolution)
     │        │
     │        ├─→ Code Mode (if fix requires significant work)
     │        └─→ Review Mode (after fix is complete)
     │
     └─→ Any Mode (when user requests structured work)
```

- **Chat → Any Mode:** When user requests file creation, modification, or structured work
- **Ideas → Plan:** When ideas are validated and ready for planning
- **Plan → Execution:** When creative/strategic plans are ready (brand guidelines, marketing strategy, pitch deck outline)
- **Plan → Code:** When technical plans are ready for implementation (ONLY after ALL technical documents are created)
- **Execution → Review:** When creative assets are ready for Creative Director approval
- **Execution → Code:** When designs are ready for frontend implementation
- **Code → Review:** When code is ready for Code Reviewer
- **Review → Code:** When reviews require code fixes
- **Review → Execution:** When reviews require design/content fixes
- **Review → Plan:** When reviews reveal planning gaps
- **Any → Fix:** When issues need resolution
- **Fix → Code:** When fix requires significant code work
- **Fix → Execution:** When fix requires design/content work
- **Fix → Review:** When fix is complete and needs review
- **Any → Ideas:** When gaps require research
- **Any → Chat:** When conversation is needed or task is complete

## Mode Rules

### General Rules
- ✅ Agents must operate within the appropriate mode
- ✅ Mode must be declared in orchestration handoff
- ✅ Mode determines allowed actions and output locations
- ✅ Mode transitions should be logical and documented

### Mode-Specific Rules
- See individual mode documentation for specific rules:
  - [Chat Mode Rules](chat.md#allowed-actions) - Default mode for conversation
  - [Ideas Mode Rules](ideas.md#allowed-actions)
  - [Plan Mode Rules](plan.md#allowed-actions)
  - [Execution Mode Rules](execution.md#allowed-actions) - Strategic/creative execution
  - [Code Mode Rules](code.md#allowed-actions) - Technical execution
  - [Review Mode Rules](review.md#forbidden-actions)
  - [Fix Mode Rules](fix.md#allowed-actions) - Issue resolution

## Orchestration Handoff

All agents must declare their current mode in the orchestration handoff:

```markdown
**Current mode**: [chat|ideas|plan|execution|code|review|fix]
```

**Note:** Chat Mode is the default mode when no specific task is requested. Agents should use Chat Mode for general conversation and transition to structured modes when the user requests file creation, modification, or structured work.

## Related Documents

- **[Global Rules](../_core/global-rules.md)** - Repository-wide rules including mode definitions
- **[Primary Workflow](../workflows/primary-workflow.md)** - Overall workflow that uses modes
- **[Orchestration Protocol](../workflows/orchestration-protocol.md)** - How agents coordinate
- **[Agent Definitions](../agents/)** - Individual agent configurations

## Quick Reference

| Mode | Primary Activities | Output Location | Typical Agents |
|------|-------------------|-----------------|----------------|
| **Chat** (Default) | Conversation, Q&A, scope finalization | None (conversation only, except `shared/context/current-scope.md`) | Any agent |
| **Ideas** | Research, validation, business cases | `1-ideas/` | Market Research, Business Analyst |
| **Plan** | Requirements, architecture, strategies, brand guidelines | `2-product-foundation/`, `3-technical/3.1-system-foundation/`, `4-marketing/go-to-market.md` | Product Strategist, System Architecture, Creative Director |
| **Execution** | Designs, marketing assets, content, creative deliverables | `shared/assets/`, `4-marketing/copy/`, `4-marketing/creatives/` | UI/UX Designer, Graphics Designer, Marketing Expert |
| **Code** | Code, tests, infrastructure, technical docs | `3-technical/3.4-source-code/`, `3-technical/3.3-devops/` | Fullstack Engineer, DevOps |
| **Review** | Code review, QA, retrospectives | Review reports, `8-governance/` | Code Reviewer, Creative Director, Docs Guardian |
| **Fix** | Bug fixes, issue resolution, problem-solving | `3-technical/3.4-source-code/` (fixes), changelog | Fullstack Engineer |

---

**Remember:** Modes define what you can do, not who you are.  
Choose the right mode for the task at hand.

