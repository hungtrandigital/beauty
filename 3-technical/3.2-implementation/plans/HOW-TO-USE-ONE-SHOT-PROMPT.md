# How to Use the One-Shot Execution Prompt

**Date:** 2025-12-09  
**Purpose:** Guide for executing Phase 1 tasks using the one-shot prompt

## What is a One-Shot Prompt?

A **one-shot prompt** is a single, comprehensive prompt that instructs AI agents to execute multiple tasks in parallel while maintaining full documentation tracking. Instead of executing tasks one-by-one, you can trigger all Phase 1 tasks at once.

## How to Use It

### Step 1: Copy the Prompt

The one-shot prompt is located in:
```
3-technical/3.2-implementation/plans/one-shot-launch-plan-2025-12-09.md
```

**Quick Copy:** Scroll to the "One-Shot Execution Prompt" section (around line 532) and copy the entire code block.

### Step 2: Paste in Cursor Chat

1. Open Cursor IDE
2. Open the Chat panel (usually `Cmd+L` or `Ctrl+L`)
3. Paste the entire prompt
4. Press Enter

### Step 3: What Happens Next

The AI will:
- ✅ Execute all 6 Phase 1 tasks in parallel (where dependencies allow)
- ✅ Update progress.md after each task
- ✅ Update changelog.md after each task
- ✅ Create/update all required documentation files
- ✅ Maintain full documentation tracking

## The One-Shot Prompt (Ready to Copy)

Here's the complete prompt you can copy and paste:

```
Execute the complete local machine completion plan as defined in:
3-technical/3.2-implementation/plans/one-shot-launch-plan-2025-12-09.md

Phase 1: Local Machine Completion
Goal: Complete setup, testing, and verification on local machine before cloud deployment

Requirements:
1. Execute all Phase 1 tasks (1.1-1.6) following the exact specifications
2. All work is on LOCAL MACHINE (localhost) - no cloud deployment yet
3. For each task completion:
   - Update 3-technical/3.2-implementation/status/progress.md
   - Update 8-governance/changelog.md
   - Create/update any required documentation files
   - Add ADR to 8-governance/decision-log.md if new decisions made
4. Maintain full documentation tracking as specified in each task
5. Execute tasks in parallel where dependencies allow
6. Mark tasks complete only when all acceptance criteria met
7. Document any issues or blockers encountered
8. For Phase 2 preparation: Document cloud deployment requirements (but don't deploy yet)

Assigned Agents:
- @devops: Tasks 1.1 (Local Environment), 1.4 (Local Monitoring)
- @fullstack-engineer: Tasks 1.2 (Local Security), 1.6 (Local Completion)
- @docs-guardian: Task 1.3 (Legal Documents)
- @code-reviewer: Task 1.5 (Local Testing)

Local Environment:
- Backend: http://localhost:3000/api/v1
- Frontend: http://localhost:3001
- Database: localhost:5432 (Docker)
- Redis: localhost:6379 (Docker)
- All services running via Docker Compose

Start execution now.
```

## Alternative: Execute Individual Tasks

If you prefer to execute tasks one at a time, you can use these prompts:

### Task 1.1: Local Environment Verification
```
Execute Task 1.1 from one-shot-launch-plan-2025-12-09.md
Assigned to: @devops
```

### Task 1.2: Local Security & Configuration
```
Execute Task 1.2 from one-shot-launch-plan-2025-12-09.md
Assigned to: @fullstack-engineer
Note: Depends on Task 1.1 completion
```

### Task 1.3: Legal & Compliance Documents
```
Execute Task 1.3 from one-shot-launch-plan-2025-12-09.md
Assigned to: @docs-guardian
Note: Can execute in parallel with other tasks
```

### Task 1.4: Local Monitoring & Health Checks
```
Execute Task 1.4 from one-shot-launch-plan-2025-12-09.md
Assigned to: @devops
Note: Depends on Task 1.1 completion
```

### Task 1.5: Comprehensive Local Testing
```
Execute Task 1.5 from one-shot-launch-plan-2025-12-09.md
Assigned to: @code-reviewer
Note: Depends on Tasks 1.1-1.4 completion
```

### Task 1.6: Local Completion & Documentation
```
Execute Task 1.6 from one-shot-launch-plan-2025-12-09.md
Assigned to: @fullstack-engineer
Note: Depends on Tasks 1.1-1.5 completion
```

## Prerequisites

Before executing the one-shot prompt, ensure:

1. ✅ **Docker is running**
   ```bash
   docker ps
   ```

2. ✅ **All Docker services are up**
   ```bash
   docker-compose ps
   # or
   docker-compose up -d
   ```

3. ✅ **Backend is accessible**
   - Test: `curl http://localhost:3000/api/v1` or open in browser

4. ✅ **Frontend is accessible**
   - Test: Open `http://localhost:3001` in browser

5. ✅ **Plan document exists**
   - Verify: `3-technical/3.2-implementation/plans/one-shot-launch-plan-2025-12-09.md`

## Expected Execution Time

- **Task 1.1:** ~15-30 minutes
- **Task 1.2:** ~15-20 minutes
- **Task 1.3:** ~20-30 minutes
- **Task 1.4:** ~20-30 minutes
- **Task 1.5:** ~30-60 minutes (comprehensive testing)
- **Task 1.6:** ~15-20 minutes

**Total:** Approximately 2-3 hours for all tasks (executed in parallel where possible)

## Monitoring Progress

After executing the prompt, monitor progress:

1. **Check progress.md:**
   ```
   3-technical/3.2-implementation/status/progress.md
   ```

2. **Check changelog.md:**
   ```
   8-governance/changelog.md
   ```

3. **Check for new files:**
   - `3-technical/3.4-source-code/LOCAL-TESTING-CHECKLIST.md`
   - `3-technical/3.4-source-code/LOCAL-COMPLETION-SUMMARY.md`
   - `7-operations-monitoring/local-monitoring-guide.md`
   - `6-operations/legal/terms-of-service.md`
   - `6-operations/legal/privacy-policy.md`
   - `3-technical/3.2-implementation/reviews/local-testing-2025-12-09.md`

## Troubleshooting

### If tasks fail:

1. **Check Docker services:**
   ```bash
   docker-compose logs
   ```

2. **Verify environment variables:**
   ```bash
   cat .env
   ```

3. **Check backend logs:**
   ```bash
   docker-compose logs backend
   ```

4. **Check frontend logs:**
   ```bash
   docker-compose logs frontend
   ```

### If documentation is missing:

- The AI should create all required files automatically
- If files are missing, check the task's "Documentation Requirements" section
- Manually create missing files if needed

## Success Indicators

Phase 1 is complete when:

- ✅ All 6 tasks show completion in `progress.md`
- ✅ All acceptance criteria met (check each task)
- ✅ All documentation files created/updated
- ✅ `changelog.md` has entries for all tasks
- ✅ Local systems verified operational
- ✅ Status shows "LOCAL SETUP COMPLETE"

## Next Steps After Phase 1

Once Phase 1 is complete:

1. Review all created documentation
2. Verify all local systems working
3. Test all features locally
4. Plan Phase 2 (Cloud Deployment) when ready

---

**Quick Start:** Copy the prompt above, paste in Cursor chat, and press Enter!

