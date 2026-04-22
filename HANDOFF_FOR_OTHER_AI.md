# AGW Handoff For Other AI

This repository is the GitHub handoff point for the A.G. Williams Painting Company website. GitHub is the source of truth; do not keep parallel local app copies drifting apart.

## Repo

- Repository: `https://github.com/VortiMedia/agw-two-week-handoff-2026-04-21`
- Base branch: `main`
- Last major checkpoint: `1e9234f` — flatten + consolidation (2026-04-22)

## Layout (flat, single Next.js app at the repo root)

```
/
├── src/                  Next.js 16 / React 19 app
├── public/               static assets served by the app
├── design-system/        north-star design reference (tokens, HTML prototype, fonts, icons, logos) — NOT app source
├── content/agw/          reports, audits, strategy docs
├── assets/agw/           canonical brand assets (fonts, logos, icons, patterns, photos)
├── artifacts/            audit captures + QA renders (reference only)
├── brand-kit/            brand-kit snapshot used during brand-pass work
├── phase-0/              preview deploy state + locks
├── skills/               reference copy of custom skill bundles
└── package.json, next.config.ts, tsconfig.json, etc.
```

`artifacts/`, `design-system/`, `content/`, `assets/`, `brand-kit/`, `phase-0/`, and `skills/` are explicitly excluded from TypeScript and ESLint by `tsconfig.json` and `eslint.config.mjs`. They are reference material, not app source.

## First Rules

1. Clone or pull fresh before starting a pass.
2. The entire app lives at the repo root — there is no nested `projects/` or `website-review-build/` path anymore.
3. `design-system/project/ui-kit/marketing-site.html` is the north-star design. The Next.js app has NOT yet been re-skinned to match it (Phase 3 of the consolidation plan).
4. Branch for each implementation pass; merge back after verification; delete the branch after merge.
5. Push often.

## Runtime

- Node: `>=20.9.0` (Next.js 16 requirement). Use `nvm use` with the `.nvmrc`.
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build` (verify clean before committing)
- Lint: `npm run lint`

## Pull fresh

```bash
git clone https://github.com/VortiMedia/agw-two-week-handoff-2026-04-21.git
cd agw-two-week-handoff-2026-04-21
nvm use
npm install
npm run build
```

## Working-branch pattern

```bash
git checkout -b agw-next-pass
# do work
git add .
git commit -m "Describe the change"
git push -u origin agw-next-pass
# open PR or merge back to main after verification
```

## Branches on origin

- `main` — canonical, production-readiness lineage + design-system reference
- `agw-preserved-work-archive` — 9 historical report commits (execution board, launch-blockers master, QA checklists, audits, release-gate doc, booking analytics, final read-only audit)
- `agw-preserved-integration-design-refresh` — the ink-palette design refresh (historical; not adopted)
- `agw-preserved-booking-flow` — full custom quote intake flow implementation (687-line React form, API route, validation library) recovered from deleted `agw-booking-flow`; not currently on `main`

## Important files

- `content/agw/agw-production-readiness-audit-2026-04-21.md` — the audit that framed this workstream
- `content/agw/agw-master-handoff-notes-2026-04-21.md` — master handoff notes
- `content/agw/ghl-booking-and-notification-strategy-2026-04-21.md` — GHL booking constraints
- `content/agw/reports/cleanup-preservation-audit-2026-04-22.md` — what was preserved during the 2026-04-22 consolidation
- `content/agw/reports/cleanup-revised-execution-plan-2026-04-22.md` — the executed plan
- `CLAUDE_CODE_CONTEXT_PRIME.md` — Claude Code onboarding
- `AGW_Website_Brand_Reference.docx` — brand authority
- `design-system/project/ui-kit/marketing-site.html` — north-star design prototype
- `design-system/project/colors_and_type.css` — design tokens

## GHL strategy

Read `content/agw/ghl-booking-and-notification-strategy-2026-04-21.md` before changing anything about booking.

Short version:

- Safest V1 is `custom intake step -> GHL calendar embed as final step`.
- Do not literally wrap the calendar iframe inside a native HTML form.
- Keep GHL as source of truth for the appointment in V1.
- Protect the existing customer-care notification automation.
- Clone the calendar before changing production booking behavior.

## Customer-care constraint

Do not disrupt booking notifications.

If booking flow changes:

- preserve the current GHL appointment-booked automation until replacement is proven safe
- add a separate intake-submitted notification path if a custom form is added before the calendar
- confirm what customer care needs to see in the appointment view versus contact custom fields

## Recommended next pass

1. Read the production-readiness audit.
2. Read the master handoff notes.
3. Read the GHL booking strategy doc.
4. Read the cleanup revised execution plan and cleanup audit.
5. Proceed with Phase 3 of the consolidation plan: port the north-star design into the Next.js app (tokens → components → responsive + a11y → verify).
