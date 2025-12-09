# Fix Mode — AI-First Startup Factory

**Version:** v3.0  
**Purpose:** Define the scope, activities, and workflow for Fix Mode (issue resolution)

## Overview

Fix Mode is a specialized mode for analyzing and fixing issues—both small quick fixes and complex hard issues. This mode focuses on problem-solving, debugging, and resolution. Use Fix Mode when you need to fix bugs, resolve issues, or address problems that require attention.

## When to Use Fix Mode

Use Fix Mode when:
- **Fixing bugs** - Resolving code bugs, errors, or failures
- **Small issues** - Quick fixes that don't require full planning cycle
- **Hard issues** - Complex problems that need systematic debugging and subagent coordination
- **Emergency fixes** - Critical issues that need immediate resolution
- **User-reported issues** - Issues reported by users that need investigation and fix
- **Test failures** - Fixing failing tests or CI/CD issues
- **Performance issues** - Quick performance optimizations or fixes

## Issue Classification

Before starting, classify the issue:

### Fast Fix (Small Issues)
**Characteristics:**
- Simple, isolated problem
- Clear root cause
- Quick solution (< 30 minutes)
- No major architecture changes
- Single file or small scope

**Workflow:** Use Fast Fix workflow (simplified)

### Hard Fix (Complex Issues)
**Characteristics:**
- Complex, multi-faceted problem
- Unclear root cause
- Requires investigation and planning
- May involve multiple files or systems
- Needs architectural consideration

**Workflow:** Use Hard Fix workflow (with subagents)

## Core Activities

### 0. Read Current Scope (ALWAYS START HERE)

**Before starting any fix:**
1. **Read `shared/context/current-scope.md`** - Understand project context
2. **Read relevant technical documents:**
   - `3-technical/3.1-system-foundation/infrastructure.md` - Tech stack
   - `3-technical/3.1-system-foundation/design-standards/coding-standards.md` - Code standards
   - `0-agents/workflows/development-rules.md` - Development rules
3. **Understand the issue** - Read error messages, logs, user reports

**Action:** Always understand context before fixing.

### 1. Understand the Issue

**If user provides screenshots or videos:**
- Describe the issue in detail based on visual information
- Ensure description helps predict root causes easily
- Note any visual patterns, error messages, or UI issues visible

**Question Everything:**
- Use `AskUserQuestion` tool to ask probing questions
- Clarify constraints, objectives, and true requirements
- Ask 1 question at a time, wait for answer before next question
- Don't assume - clarify until 100% certain

**Action:** Fully understand the issue before proceeding.

### 2. Classify Issue: Fast or Hard

**Fast Fix Criteria:**
- Simple, isolated problem
- Clear solution path
- Single file or small scope
- No major dependencies

**Hard Fix Criteria:**
- Complex, multi-faceted
- Unclear root cause
- Multiple files/systems involved
- Needs investigation and planning

**Action:** Classify issue and choose appropriate workflow.

## Fast Fix Workflow (Small Issues)

### 1. Find Root Cause
- Activate `debugging` skill from `0-agents/agents/skills/debugging/` for systematic debugging
- Activate `problem-solving` skill if needed
- Read error messages, logs, and code carefully
- Trace backward through call stack to find root cause
- Document findings

### 2. Implement Fix
- Start implementing fix based on root cause analysis
- Make minimal, focused changes
- Follow coding standards from `development-rules.md` and `coding-standards.md`
- Write code directly in `3-technical/3.4-source-code/`

### 3. Test Fix
- Run tests using project's package manager (check `infrastructure.md` for commands)
- Ensure fix works and doesn't break existing functionality
- Verify edge cases if applicable

### 4. Iterate if Needed
- If issues or failed tests, repeat from step 1 (find root cause)
- Continue until fix is complete and tests pass

### 5. Report Results
- Summarize changes briefly
- Explain what was fixed and how
- Guide user to verify the fix
- Suggest next steps (review, commit, etc.)

## Hard Fix Workflow (Complex Issues)

### 1. Find Root Cause (Deep Investigation)
- Activate `debugging` skill from `0-agents/agents/skills/debugging/` for systematic debugging
- Activate `sequential-thinking` skill from `0-agents/agents/skills/sequential-thinking/` to break complex problems into sequential thought steps
- Activate `problem-solving` skill from `0-agents/agents/skills/problem-solving/` to tackle the issues
- Read error messages, logs, and code carefully
- Trace backward through call stack to find root cause
- Document findings and analysis

### 2. Research (If Needed)
- If root cause is unclear, use web search (if available) to research similar issues
- Check `1-ideas/1.1-market-research/` for existing research
- Gather information about similar issues, solutions, best practices
- Document research findings

### 3. Create Implementation Plan
- Create implementation plan in `3-technical/3.2-implementation/plans/[fix-name].md`
- Plan should include:
  - Root cause analysis summary
  - Solution approach
  - Step-by-step implementation
  - Testing strategy
  - Risk assessment
- Or consult with @system-architecture or @product-strategist if fix affects architecture

### 4. Implement Fix (Step by Step)
- Transition to Code Mode if fix requires significant implementation
- Or implement directly in Fix Mode for focused fixes
- Follow the implementation plan
- Make changes incrementally
- Test after each major change
- Write code in `3-technical/3.4-source-code/`

### 5. Test and Verify
- Run tests using project's package manager (check `infrastructure.md` for commands)
- Ensure fix works and doesn't break existing functionality
- Verify edge cases and error scenarios
- Check test coverage (should be ≥90% for new code)

### 6. Request Review (If Significant)
- If fix is significant, request @code-reviewer to review
- Or transition to Review Mode for comprehensive review

### 7. Final Report
- Report back to user with summary of changes
- Explain everything briefly (sacrifice grammar for concision)
- Guide user to get started and suggest next steps
- List any unresolved questions at the end (if any)
- Ask user if they want to commit and push to git repository
  - If yes, provide git commands or let user commit manually

## Allowed Actions

✅ **You CAN:**
- **Read `shared/context/current-scope.md`** - Always read scope before starting
- Debug and analyze issues
- **Activate skills from `0-agents/agents/skills/`:**
  - `debugging` - Systematic debugging framework
  - `problem-solving` - Problem-solving techniques
  - `sequential-thinking` - Sequential thought process
  - Other relevant skills as needed
- Make code changes to fix issues in `3-technical/3.4-source-code/`
- Write tests to verify fixes
- Run tests using project's package manager
- Update documentation if fix affects it
- Update changelog after fixes
- Request @code-reviewer for review if fix is significant
- Transition to Code Mode if fix requires extensive implementation
- Transition to Review Mode for comprehensive review

## Forbidden Actions

❌ **You CANNOT:**
- **Skip understanding the issue** - Always clarify and understand before fixing
- **Make assumptions** - Ask questions if unclear
- **Skip testing** - All fixes must be tested
- **Skip root cause analysis** - Always find root cause, not just symptoms
- **Create technical debt** - Fix properly, don't create shortcuts
- **Ignore coding standards** - Follow `development-rules.md` and `coding-standards.md`
- **Skip documentation updates** - Update docs if fix affects them
- **Deploy without review** - Critical fixes should be reviewed (use Review Mode)

## Output Locations

Fix Mode outputs go to:
- **Code Fixes:** `3-technical/3.4-source-code/` (modified files)
- **Test Files:** `3-technical/3.4-source-code/tests/` (new or updated tests)
- **Documentation:** Appropriate sections if fix affects documentation
- **Changelog:** `8-governance/changelog.md` (document the fix)
- **Progress:** `3-technical/3.2-implementation/status/progress.md` (if applicable)

## Mode Transition

Fix Mode can transition to:
- **Code Mode** - When fix requires significant code work
- **Execution Mode** - When fix requires design or content work
- **Review Mode** - When fix is complete and needs review (especially for critical fixes)
- **Plan Mode** - When fix reveals planning gaps or architectural issues
- **Chat Mode** - When fix is complete and user needs guidance

**After Fix:**
- **Fast Fix:** Usually transitions to Review Mode or Chat Mode
- **Hard Fix:** May transition to Code Mode (for code fixes) or Execution Mode (for design/content fixes) if implementation is extensive, then Review Mode

## Orchestration Handoff Format

When in Fix Mode, use this format:

```markdown
### ORCHESTRATION HANDOFF

**Current mode**: fix  
**Task completed**: [Yes/No/Partial]  
**Issue Type**: [Fast Fix / Hard Fix]  
**Issue Description**: [Brief description of issue fixed]

**Root Cause**: [What was the root cause?]

**Files modified**:
- `3-technical/3.4-source-code/[paths]` (e.g., `frontend/components/Button.tsx`, `backend/routes/user.py`)
- `3-technical/3.4-source-code/tests/[test-paths]` (if tests added/updated)
- `8-governance/changelog.md`

**Fix Summary**:
- [What was fixed]
- [How it was fixed]
- [Testing performed]

**Next recommended agent**: 
- @code-reviewer (if fix is significant)
- @fullstack-engineer (if more work needed)
- @human (if fix is complete and verified)

**Next task**: "[Clear task description]"  
**Priority**: [Critical/High/Medium/Low]

**Blockers/Issues**: [None / List any blockers or unresolved questions]
```

## Success Criteria

Fix Mode is successful when:
- ✅ Root cause is identified (not just symptoms)
- ✅ Fix is implemented correctly
- ✅ Tests pass and verify the fix
- ✅ No new issues introduced
- ✅ Code follows standards
- ✅ Documentation updated (if needed)
- ✅ Changelog updated
- ✅ User can verify the fix works

## Related Documents

- **[Fullstack Engineer Agent](../agents/fullstack-engineer.md)** - Implementation context
- **[Code Reviewer Agent](../agents/code-reviewer.md)** - For reviewing fixes
- **[Development Rules](../workflows/development-rules.md)** - Code standards to follow
- **[Coding Standards](../../3-technical/3.1-system-foundation/design-standards/coding-standards.md)** - Project-specific standards
- **[Global Rules](../_core/global-rules.md)** - Repository rules and constraints

---

**Remember:** Fix Mode is for problem-solving.  
Fast fixes should be fast. Hard fixes should be thorough.  
Always find the root cause, not just the symptoms.

