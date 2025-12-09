# Orchestration Protocol — AI-First Startup Factory (v2.1)

This file defines exactly how multiple AI agents (or multiple instances of the same agent) coordinate with each other inside this repository.  
All agents must obey this protocol without exception.

## Core Principles

1. One source of truth → the repository file system + INDEX.md
2. Zero surprise → never modify a file that another agent is currently working on
3. Explicit handoff → always end your output with a clear next agent + next task
4. No infinite loops → maximum 2 review cycles per task before escalating to human

## Supported Orchestration Patterns

### 1. Sequential Chaining (default & safest)
Use when output of step N is required as input for step N+1.

Common chains:
- Market Research → Product Strategist → Product Overview → Domain Specs → System Architecture → Implementation
- Idea → Business Analyst → Product Strategist → Backlog → Fullstack Engineer → Code Reviewer → DevOps
- Creative Brief → UI/UX Designer → Graphics Designer → Frontend Engineer

Execution rule:
[Agent A] completes → writes summary + file links → explicitly calls:
"Next agent: @product-strategist, please take over using the outputs above."

### 2. Parallel Execution (high productivity)
Use when tasks are independent and can run simultaneously.

Allowed parallel tracks:
- Frontend Engineer + Backend Engineer (different folders)
- UI/UX Designer + Copywriter + Marketing Expert
- Multiple unrelated backlog items
- iOS Engineer ↔ Android Engineer ↔ Web Engineer

Coordination rules:
- Before starting parallel work, create a file coordination-plan.md inside the relevant folder stating:
  - Which agents run in parallel
  - Integration/merge point
  - Shared files (if any)
- All parallel agents must check this file first
- Final merge is done by a designated “Integration Agent” (usually Fullstack Engineer or DevOps)

### 3. Review & Approval Loops
Every execution or parallel track must end with a review cycle:

Executor → Code Reviewer / Docs Guardian / Marketing Expert
          ↓
If approved → merge + update progress.md + changelog.md
If rejected → return to Executor with clear feedback → max 2 cycles → escalate to human

### 4. Escalation to Human
Trigger escalation when:
- More than 2 review rejections
- Conflicting instructions from different agents
- Decision required outside defined scope (pricing, legal, partnership, etc.)
- Risk register entry needed

Escalation format:

@human — ESCALATION REQUIRED
Issue: [brief description]
Options considered: [A, B, C]
Recommendation: [agent’s choice]
Please reply with final decision.

### 5. Agent Handoff Template (must use exactly)

At the end of every agent response, include this block:
```markdown
### ORCHESTRATION HANDOFF

**Current mode**: execution | plan | ideas | review  
**Task completed**: Yes / No  
**Files created/modified**:
- path/to/file1.md
- path/to/file2.ts

**Next recommended agent**: @fullstack-engineer / @marketing-expert / @human  
**Next task**: "Implement user authentication flow according to newly created domain-specs.md"  
**Priority**: High / Medium / Low
```markdown
### 6. Forbidden Patterns (will be rejected)
- Two agents editing the same file simultaneously
- Skipping review step for code or architecture changes
- Creating files outside the defined folder structure
- Deleting files without moving them to archives/ first

### 7. Example Full Workflow (Feature Development)

1. @product-strategist → writes requirements/user-stories
2. @system-architecture → creates domain-specs.md + api-contracts/
3. @fullstack-engineer → implements in 3.4-source-code/
4. Parallel: @ui-ux-designer works on Figma → assets/
5. @code-reviewer → reviews PR/diff
6. @devops → deploys staging
7. @human → final approval → production

Respect this protocol at all times.  
Violation will cause the Docs Guardian agent to revert your changes and notify human.