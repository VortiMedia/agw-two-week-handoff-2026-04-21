# Cleanup Preservation Audit — 2026-04-22

Generated as Phase 1·0 of the consolidation plan at `/Users/david/.claude/plans/this-current-site-is-swift-rocket.md`. Read-only audit. Every deletion candidate evaluated for unique work before disposition.

## Summary

- Home-dir folders audited: 16 (4 clear to delete, 0 need absorption, 12 need manual review — all 10 `agw-*` code folders are **live git worktrees**, not duplicate clones)
- Branches audited: 16 (0 clear to delete, 0 need absorption, 16 need manual review — every branch contains substantive unique commits not present on `main` or `agw-performance-asset-plan`)
- Worktrees audited: 3 (3 clean, 0 dirty). Plus 3 additional worktrees found in `/private/tmp/` that the plan did not list
- Preservation branch: `agw-preserved-work-archive` **created** off `main` (commit `da2d594`), not yet pushed

Top-line verdict: **The plan materially underestimates what exists.** The 10 home-dir `agw-*` folders are not 2 GB duplicate snapshots — they are git worktrees of the `agw-website` repo, each checked out to a different branch. The 539 MB of `node_modules` + `.next` per worktree explains the footprint. More important: `main` and `agw-performance-asset-plan` are missing the entire frontend production-readiness lineage (`1bf969e` and all descendants). Deleting the 16 branches as the plan's default path would lose real code: the quote flow, utility pages, SEO library, performance image optimization, service-page polish, and GTM integration are all on those branches and nowhere else.

## Home-directory folders

| Path | Is git? | Uncommitted | Stashes | Unpushed commits | Size | Disposition | Notes |
|------|---------|-------------|---------|-------------------|------|-------------|-------|
| agw-booking-flow | worktree | 0 | 0 | 0 | 2.2 G | manual_review | Worktree on `agw-booking-flow`; HEAD matches origin |
| agw-codex-impl | worktree | 0 | 0 | 0 | 2.4 G | manual_review | Worktree on `agw-codex-impl`; HEAD matches origin |
| agw-codex-review | worktree | 0 | 0 | 0 | 1.8 G | manual_review | Worktree on `agw-codex-review`; HEAD matches origin |
| agw-integration | worktree | **3 files** | 0 | 0 | 2.3 G | **manual_review** | Worktree on `agw-integration`; HEAD matches origin but has substantive uncommitted visual refresh — see below |
| agw-ops-plan | worktree | 0 | 0 | 0 | 1.8 G | manual_review | Worktree on `agw-ops-plan`; HEAD matches origin |
| agw-performance-pass | worktree | 0 | 0 | 0 | 2.2 G | manual_review | Worktree on `agw-performance-pass`; HEAD matches origin |
| agw-postmerge-qa | worktree | 0 | 0 | 0 | 2.5 G | manual_review | Worktree on `agw-postmerge-qa`; HEAD matches origin |
| agw-preview-blockers | worktree | 0 | 0 | 0 | 2.3 G | manual_review | Worktree on `agw-preview-blockers`; HEAD matches origin |
| agw-root-audit | worktree | 0 | 0 | 0 | 1.8 G | manual_review | Worktree on `agw-root-audit`; HEAD matches origin |
| agw-utility-pages | worktree | 0 | 0 | 0 | 2.3 G | manual_review | Worktree on `agw-utility-pages`; HEAD matches origin |
| agw-two-week-handoff-2026-04-21 | separate clone | 0 | 0 | 0 | 3.3 G | manual_review | Separate clone of same remote, currently on `agw-frontend-pass`; has additional branches locally |
| agw-site-random-shit | no | — | — | — | 8 K | **delete** | Only contains `.DS_Store` |
| agw-handoff | no | — | — | — | 16 K | **delete** | Empty `projects/agw/` shell, zero files |
| untitled folder | no | — | — | — | 36 K | manual_review | Contains `java/` directory from Jul 2025 — not AGW |
| untitled folder 2 | no | — | — | — | 4 K | manual_review | Contains `youtube-analysis-runner.sh` from Feb 2025 — not AGW |
| untitled folder 3 | no | — | — | — | 0 B | **delete** | Fully empty |

**Critical correction to the plan:** the plan describes the 10 `agw-*` code folders as "duplicate handoff snapshots" that can be deleted once verified clean. They are not snapshots — they are `git worktree` checkouts of `/Users/david/agw-website/`, each bound to a named branch. Confirmed by `git worktree list`:

```
/Users/david/agw-booking-flow             fcd0a84 [agw-booking-flow]
/Users/david/agw-codex-impl               c404b44 [agw-codex-impl]
/Users/david/agw-codex-review             5173367 [agw-codex-review]
/Users/david/agw-integration              531027f [agw-integration]
/Users/david/agw-ops-plan                 011f7a7 [agw-ops-plan]
/Users/david/agw-performance-pass         ead087b [agw-performance-pass]
/Users/david/agw-postmerge-qa             a19d62f [agw-postmerge-qa]
/Users/david/agw-preview-blockers         6004e99 [agw-preview-blockers]
/Users/david/agw-root-audit               25ad7e1 [agw-root-audit]
/Users/david/agw-utility-pages            2bc9cbe [agw-utility-pages]
```

Deleting these folders with `rm -rf` is safe **as long as** the branches they point at are preserved in git first. The correct cleanup order is:

1. Decide the fate of each branch (absorb or archive) per the branch audit below.
2. Run `git worktree remove <path>` for each folder (cleans the worktree registration).
3. Only then delete any residual directory.

### Detailed findings for folders with unique work

- **agw-integration:** three uncommitted files vs `HEAD` — NOT pushed, NOT stashed, would be lost if the worktree is removed without commit. The diff represents a substantive design refresh (261-line CSS edit, 777-line page.tsx rewrite, FAQ component simplification), net +558/-488 lines. It introduces a new ink-based color palette (`#10243a`), radial/linear background gradients, tightened typography, and a restructured homepage narrative (hero checks, credibility points, etc.). **Recommendation: before touching this worktree, either commit the changes to `agw-integration` or `git stash -u`.** This is the single largest risk in the whole cleanup.

- **agw-two-week-handoff-2026-04-21:** standalone clone (not a worktree of `agw-website`). Currently on `agw-frontend-pass`. Its origin is the same repo. No uncommitted work, no stashes. During the audit fetch it pulled in two additional tracking refs (`agw-utility-pages`, `codex/final-read-only-audit-20260421`) that were already in the main repo — so no unique content here.

- **untitled folder, untitled folder 2:** non-AGW scratch files from early 2025. Not relevant to this project. Keep or delete at user's discretion.

## Branches

Every one of the 16 branches has unique commits relative to both `main` and `agw-performance-asset-plan`. There is **no branch clear to delete** from the commit history alone. Commit shorthand and net line counts below.

| Branch | Unique vs main | Unique vs current | Disposition | Notes |
|--------|----------------|-------------------|-------------|-------|
| agw-booking-flow | 14 | 14 | manual_review | Adds custom quote flow + inherits all frontend lineage |
| agw-codex-impl | 4 | 4 | manual_review | Quote route + GTM + homepage polish (shared base for most branches) |
| agw-codex-review | 3 | 3 | manual_review | Production blockers audit report + frontend base |
| agw-exec-board | 3 | 1 | **absorb_to_archive_branch** | 1 unique commit over current branch: `3b2b48b` execution-board report (109 lines, doc only) |
| agw-frontend-pass | 2 | 2 | manual_review | The foundational `1bf969e` (frontend readiness) + `3cce3d4` (context prime). Every other branch below depends on these |
| agw-integration | 12 | 12 | manual_review | Integration line merging preview-blockers, utility-pages, performance-pass, codex-impl |
| agw-launch-blockers-master | 3 | 3 | manual_review | Launch-blockers master report + frontend base |
| agw-ops-plan | 2 | 2 | **absorb_to_archive_branch** | Booking analytics + LeadConnector rollout plan docs only |
| agw-performance-pass | 5 | 5 | manual_review | OG/hero image optimization (5 JPG re-encodes, 10–25× size reduction) + frontend base |
| agw-postmerge-qa | 13 | 13 | manual_review | QA report + full integration lineage |
| agw-preview-blockers | 5 | 5 | manual_review | SEO lib + sitemap + preview metadata fixes + frontend base |
| agw-preview-qa-checklist | 3 | 3 | **absorb_to_archive_branch** | Preview QA checklist doc + frontend base |
| agw-release-gate-doc | 5 | 5 | manual_review | Release-gate doc + frontend/quote-route lineage |
| agw-root-audit | 12 | 12 | manual_review | Homepage root-cause audit report + integration lineage |
| agw-utility-pages | 5 | 5 | manual_review | About/contact/privacy/terms/accessibility pages + frontend base |
| codex/final-read-only-audit-20260421 | 5 | 5 | manual_review | Final audit report + frontend/quote-route lineage |

### Detailed findings for branches with unique commits

All commits below are **absent from both `main` and `agw-performance-asset-plan`**. Subjects are quoted verbatim.

**agw-frontend-pass (base of almost everything else)**
- `3cce3d4 | Add Claude Code context prime for AGW frontend handoff | 2 files | +213/-0`
- `1bf969e | Frontend production-readiness pass: font, logo, GHL widget, SEO fixes | 5 files | +29/-14`

**agw-codex-impl (homepage + service pages + quote route)**
- `5f5bc84 | AGW pass: homepage and service-page production polish | 8 files | +510/-419`
- `c404b44 | AGW pass: quote route ownership and GTM | 12 files | +524/-29`

**agw-performance-pass**
- `ead087b | AGW pass: optimize OG and hero assets | 7 files | +82/-1` (5 hero/curated JPGs re-encoded: e.g. `commercial-floor.jpg` 4.2 MB → 478 KB; `hero-room.jpg` 10.5 MB → 133 KB)

**agw-preview-blockers**
- `6004e99 | AGW pass: fix preview metadata schema and type | 10 files | +290/-93` (introduces `src/lib/seo.ts`, 98 lines)

**agw-utility-pages**
- `2bc9cbe | AGW pass: add launch utility pages | 10 files | +774/-2` (about, accessibility, contact, privacy-policy, terms, utility-page-shell)

**agw-booking-flow**
- `141cbeb | AGW pass: custom quote flow with validation tracking and safe GHL handoff | 6 files | +1,199/-42` (includes new `quote-intake-flow.tsx` 687 lines, `quote-flow.ts` 274 lines)
- `fcd0a84 | AGW pass: custom quote flow with landing-page validation and safe GHL handoff | 6 files | +1,229/-533`

**agw-integration (merges of the above)**
- `531027f | AGW integrate quote route, performance, utility pages, and preview blockers | 1 file | +80/-0`
- `52cd024 | Merge origin/agw-preview-blockers into agw-integration | 10 files | +315/-123`
- `98d0982 | Merge origin/agw-utility-pages into agw-integration | 10 files | +774/-2`
- `8066889 | Merge origin/agw-performance-pass into agw-integration | 7 files | +82/-1`
- `71cfb3b | Merge origin/agw-codex-impl into agw-integration | 13 files | +1,028/-442`

**Report-only branches (safe to absorb into `agw-preserved-work-archive` once the code lineage is settled):**
- `agw-codex-review: 5173367 | production blockers audit | 1 file | +202`
- `agw-exec-board: 3b2b48b | execution board | 1 file | +109`
- `agw-launch-blockers-master: 8475eeb | launch-blockers master | 1 file | +290`
- `agw-ops-plan: 0e98403 | booking analytics rollout plan | 1 file | +234`; `011f7a7 | mark LeadConnector chat implemented | 1 file | +12/-12`
- `agw-postmerge-qa: a19d62f | post-merge preview candidate review | 1 file | +90`
- `agw-preview-qa-checklist: 17b78a3 | preview QA checklist | 1 file | +345`
- `agw-release-gate-doc: c5cd734 | release-gate status document | 1 file | +269`
- `agw-root-audit: 25ad7e1 | homepage root-cause visual diagnosis | 1 file | +333`
- `codex/final-read-only-audit-20260421: 29c9ca2 | final read-only audit | 1 file | +190`

Disposition recommendation for the branch set:
1. **Code-bearing branches** (`agw-frontend-pass`, `agw-codex-impl`, `agw-performance-pass`, `agw-preview-blockers`, `agw-utility-pages`, `agw-booking-flow`, `agw-integration`): treat the work as a candidate base for Phase 2/3. Either cherry-pick into `main` (or a new consolidation branch), or fully absorb `agw-integration` since it already merges most of the pieces. Do not delete until the chosen code has landed on `main`.
2. **Report-only branches**: cherry-pick the single report file onto `agw-preserved-work-archive` (keeps the text, loses the frontend-base parent commits which are duplicated anyway), then delete the original branches.
3. **Special case `agw-codex-review`, `agw-postmerge-qa`, `agw-root-audit`, `agw-release-gate-doc`, `codex/final-read-only-audit-20260421`**: these carry both the frontend code lineage and a unique report. Once #1 has absorbed the code, cherry-pick the unique report commits to `agw-preserved-work-archive` and delete.

## Worktrees

| Worktree | Parent branch | Clean? | Stashes | Disposition | Notes |
|----------|---------------|--------|---------|-------------|-------|
| launch-blockers-wt | agw-launch-blockers-master | yes | 0 | ready for `git worktree remove` after branch decision | HEAD 8475eeb |
| qa-checklist | agw-preview-qa-checklist | yes | 0 | ready for `git worktree remove` after branch decision | HEAD 17b78a3 |
| redirect-seed-map | detached at 1bf969e | yes | 0 | ready for `git worktree remove` now | Detached HEAD; the actual redirect seed map report `553985d` lives on `agw-performance-asset-plan`, so nothing unique here |

**Not mentioned in the plan but discovered during audit**, three additional worktrees live in `/private/tmp/`:

- `/private/tmp/agw-exec-board` → `agw-exec-board` (3b2b48b)
- `/private/tmp/agw-release-gate` → `agw-release-gate-doc` (c5cd734)
- `/private/tmp/codex-final-read-only-audit` → `codex/final-read-only-audit-20260421` (29c9ca2)

Because `/private/tmp/` is volatile on macOS (wiped on reboot), these should be removed with `git worktree remove` to deregister them from the repo. Their branches are covered by the branch audit above.

## Recommended actions for the user

1. **Before doing anything else: commit or stash the uncommitted diff in `/Users/david/agw-integration`**. It contains a meaningful design refresh that will silently disappear if the worktree is removed. Command (run from that folder): `git add -A && git commit -m "wip: design refresh — ink palette, gradient background, tightened typography"` OR `git stash push -u -m "agw-integration design refresh 2026-04-22"`.

2. **Decide the target for the code lineage.** The plan assumes `main` is current. It is not: the entire `1bf969e → 5f5bc84 → c404b44 → …` production-readiness chain is absent from both `main` and `agw-performance-asset-plan`. Before Phase 1A/1C proceeds, pick one of:
   - (a) Fast-forward `main` (or a new branch) to `agw-integration` or `agw-postmerge-qa` so the code is preserved before deleting the side branches.
   - (b) Cherry-pick the specific commits you want to keep onto `main` (messier, higher chance of losing context).
   Recommendation: (a) via `agw-postmerge-qa`, which already represents the merged end state plus QA sign-off.

3. **Cherry-pick report-only commits into `agw-preserved-work-archive`** (already created). One commit per branch:
   ```
   3b2b48b  5173367  8475eeb  0e98403  011f7a7  a19d62f  17b78a3  c5cd734  25ad7e1  29c9ca2
   ```

4. **Only after 1–3**: run `git worktree remove` on each of the 10 home-dir worktrees, the 3 `.claude/worktrees/` entries, and the 3 `/private/tmp/` entries. Then `git branch -D` / `git push origin --delete` the consolidated branches.

5. **Delete with no prep needed** (confirmed zero value): `/Users/david/agw-site-random-shit`, `/Users/david/agw-handoff`, `/Users/david/untitled folder 3`.

6. Leave `agw-two-week-handoff-2026-04-21` for later: it is a full 3.3 GB clone, but it is clean and shares remote with everything else. Safe to delete once the remote is confirmed authoritative for all branches the user wants to keep.

## Clear-to-delete manifest

These items are confirmed clear to delete with no preservation needed:

- `/Users/david/agw-site-random-shit` (8 K, only `.DS_Store`)
- `/Users/david/agw-handoff` (16 K, empty shell)
- `/Users/david/untitled folder 3` (0 B, empty)
- Worktree registration for `.claude/worktrees/redirect-seed-map` (detached HEAD at `1bf969e`, clean, nothing unique — the named report already lives on `agw-performance-asset-plan`)

No branches are clear to delete. Every one of the 16 branches carries commits absent from `main` and `agw-performance-asset-plan`.

## Requires decision

- `/Users/david/agw-integration` — uncommitted design refresh (3 files, +558/-488). Commit or stash before worktree removal.
- `main` and `agw-performance-asset-plan` are missing the frontend production-readiness lineage (`1bf969e` onward). Choose the absorption path (fast-forward vs cherry-pick) before any branch deletion runs.
- 10 home-dir `agw-*` worktrees — safe to `git worktree remove` once their branches are either consolidated into `main` or archived on `agw-preserved-work-archive`. Expected reclaim: ~22 GB.
- `/Users/david/agw-two-week-handoff-2026-04-21` — 3.3 GB standalone clone, no unique commits. Safe to delete whenever.
- 3 `/private/tmp/` worktrees — deregister with `git worktree remove`; tmp dir will clear itself on reboot.
- Two `untitled folder*` entries contain non-AGW personal scratch files (a `java/` tree and a YouTube analysis shell script). Keep or discard at user's discretion — not in scope for AGW cleanup.
- `agw-preserved-work-archive` branch was created from `main` (`da2d594`) but has not been pushed. Push when ready: `git push -u origin agw-preserved-work-archive`.
