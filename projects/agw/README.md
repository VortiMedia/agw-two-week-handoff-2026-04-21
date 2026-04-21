# AGW Project Index

This folder is the clean handoff point for the A.G. Williams work that was active during the `2026-04-07` to `2026-04-21` window.

## Structure

- `live-site-reference/`
  - Snapshot of the live AGW site source pulled from `/Users/claw/.openclaw/workspace-vorti-main/projects/agw-website`
  - Build caches and local-only directories were excluded on import
  - Use this when you want the production-oriented source tree that the April 17 audit references

- `website-review-build/`
  - The AGW Next.js review build that had been living in `tmp/agw-website-test`
  - Build junk was stripped out so this is readable and easier to track
  - Includes the phase-0 review package, brand kit, and the review-oriented app source

## Related Material In This Repo

- `assets/agw/`
  - Canonical AGW brand assets, photo sets, proposals, and screenshots

- `artifacts/agw/`
  - Audit captures, QA exports, patch files, and raw review outputs

- `content/agw/`
  - Written AGW docs including the site audit, revision log, and dated inventory

## Fast Path

If you only need the useful stuff:

1. Start with `content/agw/INDEX.md`
2. Use `projects/agw/live-site-reference/` for the production source snapshot
3. Use `projects/agw/website-review-build/` for the review build and phase artifacts
4. Use `assets/agw/screenshots/2026-04-17-to-2026-04-20/` for the exported review screenshots
5. Use `artifacts/agw/qa/` for the iteration-by-iteration QA renders
