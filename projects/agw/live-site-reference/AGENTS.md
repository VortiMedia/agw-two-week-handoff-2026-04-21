<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## AGW Phase 0 Delivery Contract
- This repo's review milestone is a direction-check preview, not a production launch.
- `.vercel/project.json` proves linkage only. Do not treat it as proof that a live preview exists.
- Use `python3 /Users/claw/.openclaw/workspace-vorti-main/scripts/agw_phase0_preview.py` for Phase 0 deploys.
- The source of truth for current preview state is `phase-0/deploy-state.json`.
- The send-ready artifact for sister/client review is `phase-0/REVIEW_PACKAGE.md`.
- Never say the preview shipped unless `phase-0/deploy-state.json` contains `status = "preview_ready"` and a concrete `previewUrl`.
