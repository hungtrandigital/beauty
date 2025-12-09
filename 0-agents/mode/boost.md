# Boost Mode — AI-First Startup Factory

**Version:** v3.0  
**Purpose:** Define the scope, activities, and workflow for Boost Mode (project initialization)

## Overview

Boost Mode is a one-time initialization mode for setting up a new project or reorganizing an existing messy codebase into the Factory template structure. This mode creates the complete directory structure, analyzes existing files, migrates them to correct locations, and applies naming conventions.

**Command:** Use `/boost` in Cursor IDE to activate this mode.

**When to Use:** Only for initial project setup or major restructuring. Not for regular development work.

## When to Use Boost Mode

Use Boost Mode when:
- **Initial project setup** - Setting up a new project from scratch
- **Project restructuring** - Reorganizing a messy codebase into Factory structure
- **Migration** - Moving files from scattered locations to proper structure
- **Structure compliance** - Ensuring project follows Factory directory structure

**DO NOT use Boost Mode for:**
- Regular development work
- Adding new features
- Daily file operations
- Code changes

## Core Activities

### 0. Read Current State (ALWAYS START HERE)

**Before starting any boost operations:**
1. **Read `INDEX.md`** - Understand the complete target structure
2. **Scan current codebase** - Identify existing files and structure
3. **Check if `0-agents/` exists** - This directory should already exist and must NOT be modified
4. **Identify scattered files** - Find files in wrong locations

**Action:** Always understand current state before creating structure or migrating files.

### 1. Create Directory Structure

**Action:**
1. Read `INDEX.md` to understand complete target structure
2. Create all required directories and subdirectories as defined in `INDEX.md`
3. Create all required `README.md` files with proper routing content
4. Create placeholder files as needed (e.g., `project-versions.md`, `changelog.md`)

**Important:**
- **DO NOT** modify or move anything in `0-agents/` directory
- **DO NOT** overwrite existing files without user confirmation
- Create directories even if they will be empty initially

**Output:**
- List all directories created
- List all README.md files created
- Confirm structure matches target in `INDEX.md`

### 2. Analyze Current Codebase

**Action:**
1. Scan entire codebase (excluding `0-agents/`, `.git/`, `node_modules/`, build artifacts)
2. Identify all files and their current locations
3. Categorize files by type:
   - **Code files:** Source code (`.js`, `.ts`, `.py`, `.tsx`, `.jsx`, etc.)
   - **Documentation:** Markdown files, text files, docs
   - **Configuration:** Config files (`.json`, `.yaml`, `.toml`, `.env`, etc.)
   - **Assets:** Images, fonts, media files
   - **Tests:** Test files
   - **Database:** SQL files, migrations, seeds

4. For each file, determine:
   - **Current location**
   - **Proposed target location** (based on content analysis and `INDEX.md`)
   - **Proposed new filename** (if renaming needed to follow naming conventions)
   - **Reasoning** for the placement

**Output:** Create detailed analysis report with tables for each file category.

### 3. User Confirmation for Uncertain Items

**Action:**
1. Present analysis report to user
2. Highlight files in "Uncertain Files" category
3. For each uncertain file:
   - Show file content preview (first 10-20 lines)
   - Ask: "Where should this file go?"
   - Provide 2-3 suggested options with reasoning
   - Wait for user confirmation before proceeding

**Output:**
- List of files requiring user decision
- User's decisions recorded

### 4. Create Migration Plan

**Action:**
1. Create detailed migration plan based on analysis and user confirmations
2. Group operations by type:
   - **Move operations:** Files to move to new locations
   - **Rename operations:** Files to rename (following naming conventions)
   - **Refactor operations:** Files that need content updates (e.g., update links)
   - **Create operations:** New files to create (e.g., missing README.md)

3. Check for conflicts:
   - Will moving/renaming break any imports/references?
   - Are there duplicate files?
   - Will this overwrite existing files?

4. Present migration plan to user for approval before executing

**Output:** Detailed migration plan with phases and potential issues.

### 5. Execute Migration

**Action:**
1. Execute migration plan step by step
2. For each operation:
   - **Before moving:** Check if target exists, ask user if overwrite needed
   - **Move/Rename:** Perform the file operation
   - **Update references:** Fix imports, links, and references in affected files
   - **Verify:** Check that the file is in the correct location

3. Handle special cases:
   - **Code files:** Update import paths in all affected files
   - **Documentation:** Update cross-references and links
   - **Configuration:** Ensure paths in config files are updated
   - **Tests:** Move test files alongside their source files

**Important:**
- **DO NOT** delete files - only move/rename them
- **DO NOT** modify file contents unless necessary for path updates
- **DO** create backup notes of original locations (in a migration log)

### 6. Apply Naming Conventions

**Action:**
Ensure all files follow naming conventions:

**Documentation Files (Markdown):**
- Use **kebab-case**: `product-overview.md`, `go-to-market.md`
- Use descriptive names: `initial-financing-plan.md` not `plan.md`
- Version indicators: `initial-*` for early versions, final versions in proper sections

**Code Files:**
- **Frontend:** PascalCase for components (`Button.tsx`), camelCase for utilities (`apiClient.ts`)
- **Backend:** camelCase for files (`userService.ts`, `database.ts`)
- **Tests:** Match source file name with `.test.` or `.spec.` suffix

**Directory Names:**
- **kebab-case:** `market-research/`, `product-backlog/`
- **Numbered prefixes:** `1-ideas/`, `2-product-foundation/`, `3-technical/`

**Output:**
- List of files renamed to comply with conventions
- List of files that couldn't be renamed (with reasons)

### 7. Update Cross-References

**Action:**
1. Scan all markdown files for broken links
2. Update relative paths in:
   - README.md files
   - Documentation files
   - Code comments (if they reference docs)

3. Update import statements in code files if paths changed
4. Update `INDEX.md` if structure changed

**Output:**
- List of files with updated links
- List of broken links that couldn't be auto-fixed (require manual review)

### 8. Generate Final Report

**Action:**
Create comprehensive final report with:
- Summary (total files analyzed, moved, renamed, created, references updated)
- Directory structure created
- Files migrated (by category)
- Naming convention updates
- Reference updates
- Issues & warnings
- Next steps
- Verification checklist

**Output:** Complete migration report saved to `8-governance/changelog.md` or appropriate location.

## Allowed Actions

✅ **You CAN:**
- **Read `INDEX.md`** - Always read to understand target structure
- Create directory structure as defined in `INDEX.md`
- Create README.md files with proper routing
- Analyze existing files and categorize them
- Move files to correct locations
- Rename files to follow naming conventions
- Update import paths and links
- Create migration reports
- Ask user for confirmation when uncertain

## Forbidden Actions

❌ **You CANNOT:**
- Modify or move anything in `0-agents/` directory
- Delete files (only move/rename)
- Modify file contents unless updating paths/links
- Overwrite existing files without user confirmation
- Skip user confirmation for uncertain files
- Proceed without migration plan approval
- Modify `.git/` or version control files
- Delete `.gitignore` or other root config files

## Output Locations

Boost Mode outputs go to:
- **Directory Structure:** All directories as defined in `INDEX.md`
- **Migration Report:** `8-governance/changelog.md` or dedicated migration log
- **Files:** Moved to correct locations according to `INDEX.md` structure

## Mode Transition

Boost Mode typically transitions to:
- **Chat Mode** - When boost is complete and user needs guidance
- **Ideas Mode** - When structure is ready and user wants to start ideation
- **Plan Mode** - When structure is ready and user wants to start planning

**After Boost:**
- Project structure is complete
- All files are in correct locations
- Naming conventions are applied
- References are updated
- Ready for normal development workflow

## Pre-Boost Checklist

Before starting boost, ensure:
- ✅ `INDEX.md` exists or you understand target structure
- ✅ `0-agents/` directory exists (will not be modified)
- ✅ User understands this is a one-time setup operation
- ✅ User is ready to review and approve migration plan

## Success Criteria

Boost Mode is successful when:
- ✅ All required directories exist (matching `INDEX.md`)
- ✅ All README.md files created with proper routing
- ✅ All files are in appropriate locations
- ✅ All files follow naming conventions
- ✅ All references/links are updated and working
- ✅ No files were lost or deleted
- ✅ User has clear report of all changes
- ✅ Project structure matches target structure in `INDEX.md`

## Orchestration Handoff Format

When in Boost Mode, use this format:

```markdown
**Current mode**: boost  
**Task completed**: [Yes/No/Partial]  
**Phase**: [Structure Creation / Analysis / Migration / Naming / References / Complete]

**Directories created**: [List]
**Files analyzed**: [Count]
**Files moved**: [Count]
**Files renamed**: [Count]
**References updated**: [Count]

**Next recommended agent**: @docs-guardian (to verify structure) OR transition to Chat Mode  
**Next task**: "[Clear task description]"  
**Priority**: [High/Medium/Low]

**Blockers/Issues**: [None / List any blockers or files requiring user decision]
```

## Related Documents

- **[Boost Agent](../agents/boost.md)** - Primary agent for boost operations
- **[INDEX.md](../../INDEX.md)** - Target directory structure reference
- **[Docs Guardian Agent](../agents/docs-guardian.md)** - Structure verification (post-boost)
- **[Global Rules](../_core/global-rules.md)** - Repository rules and constraints

---

**Remember:** Boost Mode is a one-time setup operation.  
When in doubt, ask the user. Better to ask than to make a wrong assumption.

