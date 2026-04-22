# Revised Execution Plan — 2026-04-22

**Context:** the Phase 1·0 audit (`cleanup-preservation-audit-2026-04-22.md`) proved the original plan's assumption wrong. The 10 home-dir `agw-*` folders are live git worktrees, not duplicate snapshots. Every one of the 16 branches holds unique commits absent from `main` and `agw-performance-asset-plan` — including the quote flow (+1,229 lines), utility pages (+774 lines), SEO library (+98 lines), hero image optimization (5 JPGs at 10–25× compression), homepage polish (+510 lines), GTM integration, and a live uncommitted design refresh in `/Users/david/agw-integration` (3 files, +558/−488).

Deleting branches before absorbing this code would destroy real production work.

This revised plan reorders Phase 1 to preserve every unique commit on `main`, rescues the uncommitted design refresh first, and only then runs the worktree removal + branch cleanup the original plan described. Phases 2 and 3 (flatten + design-system port) remain unchanged from the approved plan.

---

## Sequence at a glance

| Stage | What | Destructive? | Risk |
|---|---|---|---|
| 0 | Rescue uncommitted diff in `agw-integration` | no (commit only) | **high if skipped** |
| 1 | Absorb production code lineage into `main` via `agw-postmerge-qa` merge | no | low |
| 2 | Cherry-pick 10 report-only commits to `agw-preserved-work-archive` | no | low |
| 3 | Remove all 16 worktree registrations | yes (worktrees only) | low after stages 0–2 |
| 4 | Delete 15 fully-merged branches (local + origin) | yes | low after stage 1 |
| 5 | Delete cleared home-dir folders + clone | yes | low |
| 6 | Untrack `node_modules` + `.next` | reversible | none |
| 7 | Flatten codebase to single root | no (file moves) | low |
| 8 | Phase 3 — design-system port (tokens, components, responsive, verify) | no (additive) | medium |

---

## Stage 0 — Rescue the uncommitted design refresh (do FIRST)

**Location:** `/Users/david/agw-integration` (worktree for branch `agw-integration`)
**What's there:** 3 files, +558/−488, visual design refresh — ink palette `#10243a`, gradient background, tightened typography, homepage narrative restructure. Not stashed, not committed, not pushed.

**Action:** commit to the branch and push as backup. Do NOT stash — stashes are easy to lose during branch manipulation.

```bash
cd /Users/david/agw-integration
git add -A
git commit -m "wip: design refresh — ink palette, gradient background, tightened typography

Captured as a preservation commit during the 2026-04-22 cleanup.
Will be evaluated against the design-system palette in Phase 3.
Palette deviates from design-system tokens (ink #10243a vs blue-ink #002A4D)."
git push origin agw-integration
```

**Why commit instead of stash:** stashes live only in local reflog and are easy to drop during worktree removal. A commit on `agw-integration` with an origin backup is durable.

**Evaluation note:** the ink palette in this diff doesn't match the design-system tokens. Phase 3 re-aligns everything to `--agw-blue-ink #002A4D`. This diff is preserved for historical reference, not adoption.

---

## Stage 1 — Absorb production code into `main`

**Target:** bring `agw-postmerge-qa` and the current branch's reports into `main` so `main` becomes the real canonical state.

`agw-postmerge-qa` is the tip of the merged integration line — it already contains quote flow + utility pages + SEO library + performance pass + codex-impl merges, plus the post-merge QA report. It's the natural consolidation point.

```bash
cd /Users/david/agw-website

# Make sure everything is fetched and committed
git fetch --all --prune
git status
# Commit the audit + plan reports if any are still untracked on current branch
git add content/agw/reports/cleanup-preservation-audit-2026-04-22.md
git add content/agw/reports/cleanup-revised-execution-plan-2026-04-22.md
git commit -m "Add cleanup preservation audit and revised execution plan"
git push origin agw-performance-asset-plan

# Absorb via main
git checkout main
git pull --ff-only origin main

# Bring in the integration/QA line as a merge commit (preserves history)
git merge --no-ff origin/agw-postmerge-qa -m "Merge agw-postmerge-qa into main: absorb production-readiness lineage

Brings in frontend-pass, codex-impl quote route + homepage polish, utility
pages, SEO library, preview metadata fixes, performance image optimization,
and post-merge QA sign-off. Consolidates side branches into main before
cleanup."

# Bring in the recent reports from agw-performance-asset-plan
git merge --no-ff origin/agw-performance-asset-plan -m "Merge agw-performance-asset-plan into main: absorb reports

Performance asset plan, pre-cutover redirect seed map, cleanup audit,
revised execution plan."

# Verify build before pushing
npm --prefix projects/agw/website-review-build install
npm --prefix projects/agw/website-review-build run build
npm --prefix projects/agw/website-review-build run lint

git push origin main
```

**Stop condition:** if either merge produces conflicts, pause and surface them. Do not proceed to Stage 2 until `main` has the full lineage and builds clean.

**After Stage 1, `main` holds:** every committed line of code from all side branches, all reports, and builds successfully.

---

## Stage 2 — Preserve report-only commits

Cherry-pick each solo report commit onto `agw-preserved-work-archive` so the documentation survives even after its parent branch is deleted.

```bash
git checkout agw-preserved-work-archive

# Each commit listed is a single-file report, isolated from its branch's code lineage
git cherry-pick 3b2b48b   # execution board (agw-exec-board)
git cherry-pick 5173367   # production blockers audit (agw-codex-review)
git cherry-pick 8475eeb   # launch-blockers master (agw-launch-blockers-master)
git cherry-pick 0e98403   # booking analytics rollout plan (agw-ops-plan)
git cherry-pick 011f7a7   # LeadConnector chat implemented (agw-ops-plan)
git cherry-pick a19d62f   # post-merge preview candidate review (agw-postmerge-qa) — may already be on main via Stage 1; skip if so
git cherry-pick 17b78a3   # preview QA checklist (agw-preview-qa-checklist)
git cherry-pick c5cd734   # release-gate status (agw-release-gate-doc)
git cherry-pick 25ad7e1   # homepage root-cause visual diagnosis (agw-root-audit)
git cherry-pick 29c9ca2   # final read-only audit (codex/final-read-only-audit-20260421)

git push -u origin agw-preserved-work-archive
git checkout main
```

**Conflict handling:** reports are single-file additions to isolated locations, so conflicts are unlikely. If any happen, `git cherry-pick --skip` and note the skipped commit in the audit report.

---

## Stage 3 — Remove every worktree registration

Worktrees have to be deregistered before their directories can be cleaned up. `git worktree remove` both deregisters and deletes the directory in one step.

```bash
cd /Users/david/agw-website

# 10 home-dir worktrees
git worktree remove /Users/david/agw-booking-flow
git worktree remove /Users/david/agw-codex-impl
git worktree remove /Users/david/agw-codex-review
git worktree remove /Users/david/agw-integration
git worktree remove /Users/david/agw-ops-plan
git worktree remove /Users/david/agw-performance-pass
git worktree remove /Users/david/agw-postmerge-qa
git worktree remove /Users/david/agw-preview-blockers
git worktree remove /Users/david/agw-root-audit
git worktree remove /Users/david/agw-utility-pages

# 3 in .claude/worktrees/
git worktree remove .claude/worktrees/launch-blockers-wt
git worktree remove .claude/worktrees/qa-checklist
git worktree remove .claude/worktrees/redirect-seed-map

# 3 in /private/tmp/
git worktree remove /private/tmp/agw-exec-board
git worktree remove /private/tmp/agw-release-gate
git worktree remove /private/tmp/codex-final-read-only-audit

git worktree prune -v
git worktree list   # should show only the main workdir
```

**Disk reclaimed:** ~22 GB from home dir + ~6–9 GB from other worktree locations.

---

## Stage 4 — Delete fully-merged branches

After Stage 1, the side branches are merged into `main`. After Stage 2, their unique reports live on `agw-preserved-work-archive`. Safe to delete.

```bash
for b in agw-booking-flow agw-codex-impl agw-codex-review agw-exec-board \
         agw-frontend-pass agw-integration agw-launch-blockers-master \
         agw-ops-plan agw-performance-pass agw-postmerge-qa \
         agw-preview-blockers agw-preview-qa-checklist agw-release-gate-doc \
         agw-root-audit agw-utility-pages codex/final-read-only-audit-20260421; do
  echo "=== $b ==="
  # Verify fully merged into main before deleting
  if git merge-base --is-ancestor "origin/$b" main; then
    git branch -D "$b" 2>/dev/null || true
    git push origin --delete "$b" 2>/dev/null || true
    echo "deleted $b"
  else
    echo "SKIP $b — not fully in main, manual review needed"
  fi
done

git remote prune origin
git branch -a   # expect: main, agw-performance-asset-plan, agw-preserved-work-archive
```

**Keep:** `main`, `agw-performance-asset-plan` (transition until Phase 2 flatten lands on main), `agw-preserved-work-archive`.

---

## Stage 5 — Home-dir leftover cleanup

```bash
# Confirmed empty / trivial — no audit concerns
rm -rf "/Users/david/agw-site-random-shit"
rm -rf "/Users/david/agw-handoff"
rm -rf "/Users/david/untitled folder 3"

# Standalone 3.3 GB clone — verified clean by audit
rm -rf "/Users/david/agw-two-week-handoff-2026-04-21"
```

**Leave alone:** `/Users/david/untitled folder` (contains non-AGW `java/` tree) and `/Users/david/untitled folder 2` (non-AGW YouTube analysis script). Not in scope — user can sort later.

**After Stage 5, `/Users/david/` contains only:** `agw-website`, `ag-williams-painting-analysis`, `ag-williams-painting-lp`, and non-AGW projects.

---

## Stage 6 — Untrack `node_modules` and `.next` in git

```bash
cd /Users/david/agw-website

# Verify .gitignore covers them (should already — check and add if missing)
grep -E '^(node_modules|\.next)$' projects/agw/website-review-build/.gitignore

# Remove from tracking (keeps files on disk)
git rm -r --cached projects/agw/website-review-build/node_modules
git rm -r --cached projects/agw/website-review-build/.next

git commit -m "Untrack node_modules and .next from git"
git push origin main
```

History stays large — this only affects future clones and diffs.

---

## Stage 7 — Flatten to single codebase root

Move the Next.js app out of its nested `projects/agw/website-review-build/` home into the repo root. Rename `a-g-williams-design-system` to `design-system`. Enforce the naming conventions from the approved plan.

```bash
cd /Users/david/agw-website

# Move the app up
git mv projects/agw/website-review-build/src ./src
git mv projects/agw/website-review-build/public ./public
git mv projects/agw/website-review-build/package.json ./package.json
git mv projects/agw/website-review-build/package-lock.json ./package-lock.json
git mv projects/agw/website-review-build/next.config.ts ./next.config.ts
git mv projects/agw/website-review-build/tsconfig.json ./tsconfig.json
git mv projects/agw/website-review-build/postcss.config.mjs ./postcss.config.mjs
git mv projects/agw/website-review-build/eslint.config.mjs ./eslint.config.mjs
git mv projects/agw/website-review-build/.gitignore ./.gitignore  # may conflict; merge manually
# Move any remaining config/docs inside website-review-build
# (phase-0/, AGENTS.md, MIGRATION_PLAN.md, brand-kit/, etc.)

# Rename design system
git mv a-g-williams-design-system design-system

# Remove now-empty nested dirs
rm -rf projects/agw/website-review-build   # should be empty by now; verify with ls -la
rm -rf projects/agw
rm -rf projects

# Update path references in docs — ripgrep first to find them
# grep -r "projects/agw/website-review-build" --exclude-dir=node_modules --exclude-dir=.git
# grep -r "a-g-williams-design-system" --exclude-dir=node_modules --exclude-dir=.git
# Then edit in place: HANDOFF_FOR_OTHER_AI.md, README.md, AGENTS.md, MIGRATION_PLAN.md, phase-0/ docs

# Verify
rm -rf node_modules .next
npm install
npm run build
npm run lint

git add -A
git commit -m "Flatten codebase: promote website-review-build to repo root, rename design system

Single Next.js app now lives at /Users/david/agw-website/ root. Removes
the projects/agw/ nesting and the 'a-g-williams-design-system' verbose name.
Updates path references in HANDOFF_FOR_OTHER_AI, README, AGENTS, MIGRATION_PLAN,
and phase-0 docs."
git push origin main
```

**Verification checklist:**
- `ls /Users/david/agw-website/` shows the flat structure from the original plan
- `npm run build` exits 0
- `npm run lint` exits 0
- `grep -r "projects/agw/website-review-build"` returns nothing outside `.git`
- `grep -r "a-g-williams-design-system"` returns nothing outside `.git`

---

## Stage 8 — Phase 3: design-system port

Unchanged from the approved plan:
- 3A. Design tokens → `src/styles/tokens.css` + Tailwind wiring + `next/font` setup
- 3B. Component extraction from `design-system/project/ui-kit/marketing-site.html`
- 3C. Asset consolidation to `assets/agw/brand/` as single source
- 3D. Responsive + a11y polish (mobile nav, media queries, aria-labels, skip link)
- 3E. Verify build, lint, visual diff, axe, Lighthouse

One adjustment surfaced by the audit: Phase 3B now has a real existing quote flow (`quote-intake-flow.tsx` 687 lines, `quote-flow.ts` 274 lines) and utility pages (about, contact, privacy, terms, accessibility) to align to the design tokens, not rebuild from scratch. The scope is re-skinning, not re-implementing.

---

## Stop-and-check gates

I will pause for user confirmation before:

1. Stage 1 merge of `agw-postmerge-qa` → `main` (13 commits land on `main`)
2. Stage 4 branch deletion (16 branches gone from origin)
3. Stage 7 flatten commit (structural repo change, cannot unwind without effort)

Everything else runs straight through once confirmed.

---

## What success looks like

- `main` contains every unique committed line of code from the 16 side branches
- Uncommitted design refresh is committed to `agw-integration` and pushed (then branch absorbed via Stage 1 or preserved on archive)
- `agw-preserved-work-archive` holds the 10 isolated report commits
- Branches on origin: `main`, `agw-performance-asset-plan`, `agw-preserved-work-archive`
- Home directory clean; no `agw-*` worktrees, no duplicate clones
- Repo disk footprint reduced by ~22 GB home-dir + ~1.3 GB in-project + 539 MB untracked
- Single flat Next.js app at `/Users/david/agw-website/`
- `design-system/` kept as reference
- `npm run build` + `npm run lint` clean
- Phase 3 design-system port ready to start
