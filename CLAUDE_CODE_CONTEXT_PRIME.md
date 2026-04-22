# Claude Code Context Prime

Use this when Claude Code on the MacBook should take over AGW frontend work from the latest GitHub state.

## Source Of Truth

- Repo: `https://github.com/VortiMedia/agw-two-week-handoff-2026-04-21`
- Branch: `main`
- Current confirmed upstream base commit: `da2d5946bd9e52baccceec51f8b69dce59368c13`

## Mission

Claude Code should own the next frontend implementation pass for A.G. Williams using the latest GitHub state, the uploaded local skills bundle, and the AGW handoff docs.

The work happens in the flat Next.js app at the repo root.

`projects/agw/live-site-reference/` no longer exists — it was deleted in the 2026-04-22 consolidation (see `content/agw/reports/cleanup-revised-execution-plan-2026-04-22.md`). Nothing parallel to build against anymore.

## Pull Fresh

```bash
git clone https://github.com/VortiMedia/agw-two-week-handoff-2026-04-21.git
cd agw-two-week-handoff-2026-04-21
git checkout main
git pull origin main
git rev-parse HEAD
```

Confirm that `HEAD` is at least:

```bash
da2d5946bd9e52baccceec51f8b69dce59368c13
```

## Branch Rule

Do not work directly on `main`.

```bash
git checkout -b agw-frontend-pass
```

## Files To Read First

Read these before touching code:

1. `HANDOFF_FOR_OTHER_AI.md`
2. `content/agw/agw-production-readiness-audit-2026-04-21.md`
3. `content/agw/agw-master-handoff-notes-2026-04-21.md`
4. `content/agw/ghl-booking-and-notification-strategy-2026-04-21.md`
5. `AGW_Website_Brand_Reference.docx`
6. `./AGENTS.md`
7. `./AGENT_TASK.md`
8. `./phase-0/PHASE0_LOCK.md`
9. `./design-system/MASTER.md`

## Skills To Load First

These are the highest-value local skills for the frontend pass:

1. `skills/frontend-design-3/SKILL.md`
2. `skills/kit-gsd/SKILL.md`
3. `skills/site-audit/SKILL.md`
4. `skills/site-builder/SKILL.md`
5. `skills/web/SKILL.md`

Use these as needed after the first set:

- `skills/cloudflare-deploy/SKILL.md`
- `skills/nextjs-deploy/SKILL.md`

## Quick Repo Index

Run this once after pulling fresh:

```bash
git ls-files > /tmp/agw-git-ls-files.txt
rg -n "GTM|gtm|LeadConnector|HighLevel|booking|calendar|chat|quote|hero|brand|site-data|brand-assets" .
find ./src -maxdepth 3 -type f | sort
find ./public -maxdepth 3 -type f | sort
```

## Canonical App Index

Run these in the repo root:

```bash
find ./src/app -maxdepth 2 -type f | sort
find ./src/components -maxdepth 2 -type f | sort
find ./src/lib -maxdepth 2 -type f | sort
```

Current high-signal files in the canonical app:

- `./src/app/layout.tsx`
- `./src/app/page.tsx`
- `./src/app/commercial/page.tsx`
- `./src/app/residential/page.tsx`
- `./src/app/heritage/page.tsx`
- `./src/app/globals.css`
- `./src/components/site-shell.tsx`
- `./src/lib/site-data.ts`
- `./src/lib/brand-assets.ts`

## Frontend Priorities

Claude Code should focus on frontend quality and production-readiness, not random repo cleanup.

Priority order:

1. tighten the homepage and section hierarchy
2. improve residential/commercial/heritage page quality and consistency
3. make brand usage coherent across typography, patterns, logo handling, and image selection
4. prep the custom intake plus GHL calendar end-step strategy without breaking current ops assumptions
5. improve CTA and conversion-path clarity
6. preserve SEO-safe structure and AGW trust stack

## Booking Constraint

Do not break the booking backend.

Current strategy:

- custom intake flow first
- GHL calendar embed as final step
- protect the current customer-care notification workflow

Read:

- `content/agw/ghl-booking-and-notification-strategy-2026-04-21.md`

## Brand Constraint

Use:

- `AGW_Website_Brand_Reference.docx`
- `design-system/` (north-star reference: tokens, HTML prototype, fonts, icons, logos)
- `brand-kit/`
- `public/agw-brand/`
- `assets/agw/brand/`

Do not invent a disconnected design language if the repo already has the brand system.

## Safe Working Pattern

1. read docs
2. load skills
3. inspect app tree
4. name concrete visual or UX failures
5. patch the canonical app only
6. run verification
7. commit and push branch

## Verification

From repo root:

```bash
cd .
npm install
npm run lint
npm run build
```

If visual QA is needed:

```bash
npm run dev
```

## Commit Pattern

```bash
git add .
git commit -m "Describe the frontend pass"
git push -u origin agw-frontend-pass
```

## Copy-Paste Prompt For Claude Code

```text
Use https://github.com/VortiMedia/agw-two-week-handoff-2026-04-21 as source of truth.
Start from main at commit da2d5946bd9e52baccceec51f8b69dce59368c13 or newer if main has advanced again.
Read HANDOFF_FOR_OTHER_AI.md first.
Then read:
- content/agw/agw-production-readiness-audit-2026-04-21.md
- content/agw/agw-master-handoff-notes-2026-04-21.md
- content/agw/ghl-booking-and-notification-strategy-2026-04-21.md
- AGW_Website_Brand_Reference.docx
- ./AGENTS.md
- ./AGENT_TASK.md
- ./phase-0/PHASE0_LOCK.md
- ./design-system/MASTER.md

Load these skills from the repo:
- skills/frontend-design-3/SKILL.md
- skills/kit-gsd/SKILL.md
- skills/site-audit/SKILL.md
- skills/site-builder/SKILL.md
- skills/web/SKILL.md

The repo root is the Next.js app — no nested project directories.
Run git ls-files and index the app before coding.
Then execute the next frontend production-readiness pass without breaking the current GHL booking/backend assumptions.
Keep GitHub as handoff source of truth and push all work to a branch.
```
