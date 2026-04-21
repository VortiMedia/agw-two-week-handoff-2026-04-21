# Codex Impl Pass 01

- Base branch: `agw-codex-impl`
- Starting SHA: `1bf969ea6bd68e8754dca038af58c70f32186f58`

## Docs Used

- `CLAUDE_CODE_CONTEXT_PRIME.md`
- `HANDOFF_FOR_OTHER_AI.md`
- `README.md`
- `content/agw/INDEX.md`
- `content/agw/agw-production-readiness-audit-2026-04-21.md`
- `content/agw/agw-master-handoff-notes-2026-04-21.md`
- `content/agw/ghl-booking-and-notification-strategy-2026-04-21.md`
- `projects/agw/website-review-build/AGENTS.md`
- `projects/agw/website-review-build/AGENT_TASK.md`
- `projects/agw/website-review-build/design-system/MASTER.md`
- `node_modules/next/dist/docs/01-app/index.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md`
- Skills used: `frontend-design`, `kit-gsd`, `site-audit`, `Web Development`

## Issues Chosen

1. Homepage routing and CTA structure still arrived too late relative to the hero headline, especially on mobile.
2. Residential, commercial, and heritage pages did not share one hero and closing CTA grammar.
3. Trust cues were present but inconsistent, so office/warranty/licensed-and-insured proof did not carry across the full site shell.

## Files Changed

- `projects/agw/website-review-build/src/app/page.tsx`
- `projects/agw/website-review-build/src/app/residential/page.tsx`
- `projects/agw/website-review-build/src/app/commercial/page.tsx`
- `projects/agw/website-review-build/src/app/heritage/page.tsx`
- `projects/agw/website-review-build/src/components/site-shell.tsx`
- `projects/agw/website-review-build/src/components/service-page-hero.tsx`
- `projects/agw/website-review-build/src/components/service-cta-band.tsx`

## What Changed And Why

- Reworked the homepage hero so the service-lane choice appears immediately after the primary CTA instead of being deferred to a lower strip. This makes the next step clearer and keeps residential/commercial/heritage options visible earlier.
- Replaced the three service-page hero implementations with one shared `ServicePageHero` component. This gave residential, commercial, and heritage a consistent layout for headline, proof, image, and support cards while still preserving route-specific copy.
- Added a shared `ServiceCtaBand` closing section to residential, commercial, and heritage so each route now ends with the same brand-consistent conversion structure.
- Strengthened the global footer with a trust-signal band and repeated office/CTA access so the brand and trust stack stay intact after the hero.
- Ran live local screenshot QA for desktop and mobile to confirm the new page grammar held up visually.

## Intentionally Left Untouched

- `projects/agw/live-site-reference/`
- LeadConnector chat loader in `src/app/layout.tsx`
- Current quote URL and booking handoff behavior
- Any CMS, content migration, or fake intake/booking rebuild work
- Any GHL notification or calendar architecture changes

## Verification Results

- `npm install`
  - Passed under local Node `18.18.2`
  - Reported expected engine warnings because Next 16 requires Node `>=20.9.0`
- `npm run lint`
  - Passed
- `npm run build`
  - Failed under local Node `18.18.2`
  - Exact blocker: Next 16 requires Node `>=20.9.0`
- `npm install --no-save @tailwindcss/oxide-darwin-arm64@4.2.2`
  - Added the missing optional Tailwind native binding that Node 18 install skipped
- `npx -y node@20.11.1 ./node_modules/next/dist/bin/next build`
  - Passed

## Next Recommended Slice

- Tighten the homepage desktop masthead density and logo scale now that the route cards are earlier in the flow.
- Audit image crops and aspect ratios across the hero panels so residential/commercial/heritage feel even more deliberate at large desktop widths.
- If another pass is approved, add a small proof/review layer to the homepage hero without touching booking architecture.
