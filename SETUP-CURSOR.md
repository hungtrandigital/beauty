# Setup Guide for Cursor IDE

**Version:** v1.0  
**Purpose:** Quick setup guide to use this AI-First Startup Factory template in Cursor IDE

## Quick Setup (3 Steps)

### 1. Open Repository in Cursor

```bash
# Option 1: Open from Cursor
File → Open Folder → Select factory directory

# Option 2: Command line
cursor /path/to/factory
```

### 2. Verify Configuration Files

The following files should already exist:
- ✅ `.cursorrules` - Main rules file for Cursor AI
- ✅ `.cursor/settings.json` - Workspace settings
- ✅ `SETUP-CURSOR.md` - This file

If missing, they are included in the repository.

### 3. Start Using

Cursor AI will now understand the factory structure. You can start working immediately!

## Using Factory Agents in Cursor

### Method 1: Direct Agent Reference (Recommended)

When asking Cursor to do something, reference the agent:

```
@fullstack-engineer Please implement the user authentication feature 
following the workflow in 0-agents/agents/fullstack-engineer.md
```

```
@product-strategist Help me prioritize the backlog using ICE scoring
```

### Method 2: Mode-Based Work

Specify the mode you're working in:

```
I'm in execution mode. Please help me implement the dashboard feature. 
Follow 0-agents/mode/execution.md
```

```
I'm in plan mode. Help me create the API contracts for the user service.
```

### Method 3: Context Loading

Load agent context first, then work:

```
Read 0-agents/agents/code-reviewer.md and review the code in 
3-technical/3.4-source-code/frontend/components/Button.tsx
```

## Recommended Cursor Settings

Add these to your Cursor User Settings (Cmd/Ctrl + , → Settings):

```json
{
  "cursor.chat.model": "claude-sonnet-4.5",
  "cursor.chat.maxTokens": 8192,
  "cursor.chat.contextWindow": "large",
  "cursor.chat.enableCodebaseIndexing": true
}
```

## Common Workflows

### Starting a New Feature

1. **Load Product Requirements:**
   ```
   Read 2-product-foundation/requirements/[feature-name]/ and 
   help me understand what needs to be built
   ```

2. **Follow Agent Workflow:**
   ```
   @fullstack-engineer Following your workflow, help me implement 
   the [feature-name] feature
   ```

3. **Review Before Completion:**
   ```
   @code-reviewer Please review the changes I just made
   ```

### Code Review

```
@code-reviewer Review all files in 3-technical/3.4-source-code/frontend/components/
Focus on: code quality, test coverage, accessibility
```

### Documentation Updates

```
@docs-guardian Check if INDEX.md and all README files are up to date
```

### Architecture Planning

```
@system-architecture Help me design the architecture for [feature-name].
Read the requirements in 2-product-foundation/requirements/[feature-name]/
```

## Best Practices

### ✅ DO:

1. **Always reference agent files** when asking Cursor to work on specific tasks
2. **Specify the mode** you're working in (ideas/plan/execution/review)
3. **Ask Cursor to read INDEX.md** first if unsure about structure
4. **Use orchestration handoff** format when completing tasks
5. **Verify file locations** before creating new files
6. **Read agent workflows** before starting complex tasks

### ❌ DON'T:

1. **Don't create files outside defined structure** - Always check INDEX.md first
2. **Don't skip agent workflows** - They ensure quality and consistency
3. **Don't ignore mode definitions** - They define what you can/cannot do
4. **Don't modify 0-agents/** without understanding impact
5. **Don't skip code review** for code changes

## Troubleshooting

### Cursor doesn't follow structure

**Solution:**
```
Read .cursorrules and 0-agents/_core/global-rules.md
Then help me [your task] following the factory structure
```

### Files created in wrong location

**Solution:**
```
Read INDEX.md and move the files I just created to the correct locations
```

### Agent workflow not followed

**Solution:**
```
Read 0-agents/agents/[agent-name].md and follow the exact workflow 
for [your task]
```

### Cursor doesn't understand the context

**Solution:**
```
Read the following files to understand the project context:
- INDEX.md
- 2-product-foundation/2.1-product-overview.md
- 3-technical/3.1-system-foundation/infrastructure.md
```

## Quick Reference

### Agent Files Location
- All agents: `0-agents/agents/*.md`
- Modes: `0-agents/mode/*.md`
- Workflows: `0-agents/workflows/*.md`
- Global rules: `0-agents/_core/global-rules.md`

### Key Directories
- Code: `3-technical/3.4-source-code/`
- Product: `2-product-foundation/`
- Technical specs: `3-technical/3.1-system-foundation/`
- Marketing: `4-marketing/`
- Ideas: `1-ideas/`
- Governance: `8-governance/`

### Navigation
- **INDEX.md** - Complete directory tree with links
- **README.md** - Project overview and quick navigation
- **0-agents/README.md** - Agent and workflow overview

## Next Steps

1. ✅ Repository opened in Cursor
2. ✅ Configuration files verified
3. 📖 Read `0-agents/README.md` to understand available agents
4. 📖 Read `INDEX.md` to understand directory structure
5. 🚀 Start using agents for your tasks!

## Support

If you encounter issues:
1. Check `.cursorrules` is in the root directory
2. Verify you're referencing agent files correctly
3. Read `0-agents/_core/global-rules.md` for repository rules
4. Check `INDEX.md` for directory structure

---

**Remember:** This factory is designed for 20-year projects.  
Follow the structure. Use the agents. Maintain quality.

