# Agent Execution Rules (ACP Template)

## Copy this file to the root of any repo that Codex ACP will work in.

## Mutation-first workflow

You are running in a non-interactive ACP session. You cannot ask questions. Act decisively.

**Follow this order strictly:**

1. Read only the files you need to edit (max 3 reads before first edit)
2. Make the edits
3. Build/test to verify
4. Report what you changed

**Do NOT:**
- Explore the full repo structure before editing
- List or audit unrelated files
- Narrate your reasoning about the codebase layout
- Map out the working tree or summarize what you found
- Ask for clarification — you won't get a response
- Worry about pre-existing uncommitted changes — they are intentional

## Dirty working tree

This repo often has uncommitted local changes. That is normal. Do not comment on, audit, or hesitate due to existing uncommitted changes. Edit only the files relevant to your task.

## File discovery

Use `rg --files` or `find` for file lookups. Do not read every file in a directory to understand the project — existing docs (CLAUDE.md, README) already have context.

## Output format

Keep your final message under 10 lines:
- What files you changed
- What you changed in each
- Build pass/fail
- Blockers (only if you literally cannot complete the task)
