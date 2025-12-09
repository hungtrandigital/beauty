# Cursor Modes Reference

Quick reference for all available modes in the AI-First Startup Factory.

## Available Modes

### `/chat` (Default)
**Purpose:** General conversation, Q&A, idea finalization  
**Use when:** Casual chat, questions, finalizing scope before structured work  
**Output:** None (conversation only, except `shared/context/current-scope.md`)

### `/ideas`
**Purpose:** Research, validation, early-stage analysis  
**Use when:** Starting new projects, conducting research, validating business cases  
**Output:** `1-ideas/` (reports, summaries, business cases)

### `/plan`
**Purpose:** Strategic planning, requirements, architecture, specifications  
**Use when:** Creating roadmaps, writing requirements, designing architecture  
**Output:** `2-product-foundation/`, `3-technical/3.1-system-foundation/`, `4-marketing/`, `5-financing/`

### `/execution`
**Purpose:** Strategic/creative execution - designs, marketing assets, content  
**Use when:** Creating designs, writing marketing copy, creating creative assets  
**Output:** `shared/assets/`, `4-marketing/copy/`, `4-marketing/creatives/`, `5-financing/pitches/visuals/`

### `/code`
**Purpose:** Technical implementation - code, tests, infrastructure  
**Use when:** Writing code, writing tests, configuring CI/CD, setting up infrastructure  
**Output:** `3-technical/3.4-source-code/`, `3-technical/3.3-devops/`

### `/review`
**Purpose:** Quality assurance, validation, compliance checking  
**Use when:** Reviewing code, designs, documentation, conducting retrospectives  
**Output:** Review reports, retrospectives, quality assessments

### `/fix`
**Purpose:** Issue resolution, bug fixes, problem-solving  
**Use when:** Fixing bugs, resolving issues, addressing problems  
**Output:** Fixed code in `3-technical/3.4-source-code/`, updated tests, changelog entries

### `/boost`
**Purpose:** Project initialization and structure setup (one-time)  
**Use when:** Initial project setup, restructuring messy codebase, migration to Factory structure  
**Output:** Complete directory structure, migrated files, updated references

## Mode Selection Guide

| Task Type | Recommended Mode | Alternative |
|-----------|-----------------|-------------|
| General questions | `/chat` | - |
| Finalize project scope | `/chat` | - |
| Market research | `/ideas` | - |
| Create requirements | `/plan` | - |
| Design architecture | `/plan` | - |
| Initialize project | `/boost` | - |
| Create designs | `/execution` | - |
| Write marketing copy | `/execution` | - |
| Write code | `/code` | - |
| Fix bugs | `/fix` | `/code` (if extensive) |
| Review code | `/review` | - |
| Review documentation | `/review` | - |

## Mode Transitions

```
Chat Mode (Default)
     │
     ├─→ Boost Mode (one-time initialization)
     │        │
     │        └─→ Chat (after structure is ready)
     │
     ├─→ Ideas → Plan → Execution → Review
     │                │      │          ↓
     │                │      └─→ Code ─┘
     │                │           │
     │                └───────────┘
     │        ↑                        ↓
     │        └────────────────────────┘
     │
     ├─→ Fix Mode (can enter from any mode)
     │        │
     │        ├─→ Code (if extensive)
     │        └─→ Review (after fix)
     │
     └─→ Any Mode (when user requests structured work)
```

## Quick Commands

- `/chat` - Start conversation or finalize scope
- `/boost` - Project initialization and structure setup (one-time)
- `/ideas` - Research and validation
- `/plan` - Planning and specifications
- `/execution` - Strategic/creative execution (designs, marketing, content)
- `/code` - Technical implementation (code, tests, infrastructure)
- `/review` - Quality assurance
- `/fix` - Bug fixes and issue resolution

## Related Files

- Mode definitions: `0-agents/mode/*.md`
- Agent definitions: `0-agents/agents/*.md`
- Global rules: `0-agents/_core/global-rules.md`
- Command details: `.cursor/commands/*.md`

