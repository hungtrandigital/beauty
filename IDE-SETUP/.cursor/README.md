# Cursor IDE Templates

This directory contains Cursor IDE templates for the AI-First Startup Factory.

## Contents
- `settings.json` — Workspace settings template
- `rules/` — Cursor rules (global)
- `commands/` — Slash commands (/chat (default), /ideas, /plan, /execution, /code, /review, /fix)
- `MODES.md` — Quick reference for all available modes
- `../.cursorrules` — Template to copy to project root when using Cursor

## How to use (per project)
1. Copy `IDE-SETUP/.cursor` into your project root `.cursor`
2. Copy `IDE-SETUP/.cursorrules` to project root as `.cursorrules`
3. (Optional) Adjust `settings.json` for your workspace

## Notes
- Commands align with modes in `0-agents/mode/*.md`
- Rules align with `0-agents/_core/global-rules.md`
- Keep code under `3-technical/3.4-source-code/`
