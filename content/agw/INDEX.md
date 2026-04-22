# AGW Inventory

> **HISTORICAL SNAPSHOT (2026-04-07 to 2026-04-21).** Superseded by the 2026-04-22 consolidation — folder paths referenced below (`projects/agw/live-site-reference/`, `website-review-build/`) no longer exist. For the current layout, see `README.md` and `HANDOFF_FOR_OTHER_AI.md`. For what changed, see `content/agw/reports/cleanup-revised-execution-plan-2026-04-22.md`.

Scope: everything AGW-related that was active or imported into this repo for the `2026-04-07` through `2026-04-21` window.

## What Was Consolidated

- Imported the live AGW site source into `projects/agw/live-site-reference/`
- Moved the AGW review build out of `tmp/` into `./`
- Moved loose root AGW screenshots into `assets/agw/screenshots/2026-04-17-to-2026-04-20/`
- Moved AGW QA renders and state JSON into `artifacts/agw/qa/`
- Moved AGW audit source folders out of `tmp/` into `artifacts/agw/`
- Renamed artifact buckets so they read like archives instead of tmp spillover

## Canonical Layout

- `projects/agw/`
  - `live-site-reference/` — production-oriented source snapshot
  - `website-review-build/` — review build and phase package

- `assets/agw/`
  - `brand/` — logos, icons, fonts, patterns, guidelines, stationery
  - `docs/` — proposal PDFs and related AGW docs
  - `photos/` — raw, curated, and selected image sets
  - `screenshots/2026-04-17-to-2026-04-20/` — exported review screenshots that had been loose at repo root
  - `inbox/` — drop staging

- `artifacts/agw/`
  - `audit/` — formal audit outputs that were already under `artifacts/agw-audit`
  - `source-renders/` — source screenshots used for AGW audit work
  - `source-renders-small/` — smaller audit render set
  - `asset-review/` — brand/asset review images
  - `patch-files/` — AGW patch exports
  - `qa/` — iteration captures like `agw-home-mobile-final2.png`, `agw-service-area-rootfix.png`, and `agw-state-update.json`

- `content/agw/`
  - `agw-site-audit-2026-04-17.md`
  - `agw-production-readiness-audit-2026-04-21.md`
  - `agw-master-handoff-notes-2026-04-21.md`
  - `agw-session-context-2026-04-21.md`
  - `ghl-booking-and-notification-strategy-2026-04-21.md`
  - `round-1-feedback-revision-log.md`
  - `INDEX.md`

## Counts

These are current file counts after consolidation:

- `projects/agw/live-site-reference/` — 144 files
- `./` — 157 files
- `assets/agw/` — 719 files
- `artifacts/agw/` — 79 files
- `content/agw/` — 3 files

## Key Files From The Last Two Weeks

- Review docs
  - `content/agw/agw-site-audit-2026-04-17.md`
  - `content/agw/agw-production-readiness-audit-2026-04-21.md`
  - `content/agw/agw-master-handoff-notes-2026-04-21.md`
  - `content/agw/agw-session-context-2026-04-21.md`
  - `content/agw/ghl-booking-and-notification-strategy-2026-04-21.md`
  - `content/agw/round-1-feedback-revision-log.md`

- Review screenshots moved from repo root
  - `assets/agw/screenshots/2026-04-17-to-2026-04-20/agw-live-desktop-final.png`
  - `assets/agw/screenshots/2026-04-17-to-2026-04-20/agw-live-mobile-final.png`
  - `assets/agw/screenshots/2026-04-17-to-2026-04-20/agw-home-desktop-new.png`
  - `assets/agw/screenshots/2026-04-17-to-2026-04-20/agw-home-mobile-new.png`

- QA outputs moved from `tmp/`
  - `artifacts/agw/qa/agw-home-desktop-qa.png`
  - `artifacts/agw/qa/agw-home-mobile-qa.png`
  - `artifacts/agw/qa/agw-commercial-qa-pass2.png`
  - `artifacts/agw/qa/agw-service-area-final2.png`
  - `artifacts/agw/qa/agw-state-update.json`

- Imported source trees
  - `projects/agw/live-site-reference/src/`
  - `./src/`

## External Source Note

The live-site snapshot was copied from:

- `/Users/claw/.openclaw/workspace-vorti-main/projects/agw-website`

I did not find additional AGW files touched in the last two weeks under `/Users/claw/.openclaw/workspace-mika/projects/agw-rebuild`, so nothing from that tree was imported.

## Current Handoff State

- GitHub repo is live and public
- `./` is the canonical app for future implementation passes
- `projects/agw/live-site-reference/` should be treated as reference/archive unless explicitly needed
- Root handoff instructions now live in `HANDOFF_FOR_OTHER_AI.md`
