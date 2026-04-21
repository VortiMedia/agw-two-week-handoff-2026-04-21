# AGW Frontend Review Pass 01

## Branch / SHA Reviewed

- Branch: `agw-codex-review`
- Reviewed SHA: `1bf969ea6bd68e8754dca038af58c70f32186f58`
- Review target state: `origin/agw-frontend-pass`

## Docs Used

- `CLAUDE_CODE_CONTEXT_PRIME.md`
- `HANDOFF_FOR_OTHER_AI.md`
- `content/agw/agw-production-readiness-audit-2026-04-21.md`
- `content/agw/ghl-booking-and-notification-strategy-2026-04-21.md`
- `projects/agw/website-review-build/AGENTS.md`
- `projects/agw/website-review-build/design-system/MASTER.md`

## Top 5 Findings

### 1. Primary conversion still exits the app and bypasses the agreed V1 booking path

Severity: `critical`

Files involved:

- `projects/agw/website-review-build/src/lib/site-data.ts`
- `projects/agw/website-review-build/src/components/site-shell.tsx`
- `projects/agw/website-review-build/src/app/page.tsx`
- `projects/agw/website-review-build/src/app/commercial/page.tsx`
- `projects/agw/website-review-build/src/app/residential/page.tsx`
- `projects/agw/website-review-build/src/app/heritage/page.tsx`

What is wrong:

- `QUOTE_URL` is still hardcoded to `https://agwilliamspainting.com/get-a-quote/` in `src/lib/site-data.ts:5`.
- Header, footer, and route CTAs are all routed to that external WordPress quote path through `SHELL_ACTIONS` in `src/lib/site-data.ts:63-121`.
- The homepage hero CTA points to the same external flow in `src/app/page.tsx:98-107`.
- Commercial, residential, and heritage CTAs also leave the app in `src/app/commercial/page.tsx:47-56`, `src/app/commercial/page.tsx:262-268`, `src/app/residential/page.tsx:63-72`, `src/app/residential/page.tsx:205-214`, and `src/app/heritage/page.tsx:41-50`.
- Footer CTA output is centralized in `src/components/site-shell.tsx:161-163`, so every route ends the same way.

Risk:

- This branch cannot own the intake experience, the calendar step, or abandonment tracking.
- It directly conflicts with the documented V1 rollout of `custom intake step -> GHL calendar embed as final booking step`.
- Any frontend conversion improvements on the new branch stop at the moment the user clicks the main CTA.

Exact next fix:

- Add one internal estimate route in the canonical app.
- Repoint all primary CTAs to that route.
- Keep GHL as the booking source of truth by embedding a cloned calendar as the final step after intake, not by replacing the backend first.

### 2. Tracking is incomplete: chat is wired, but GTM/GA4 and CTA measurement are still absent

Severity: `high`

Files involved:

- `projects/agw/website-review-build/src/app/layout.tsx`
- `projects/agw/website-review-build/src/components/site-shell.tsx`
- `projects/agw/website-review-build/src/app/page.tsx`
- `projects/agw/website-review-build/src/app/commercial/page.tsx`
- `projects/agw/website-review-build/src/app/residential/page.tsx`
- `projects/agw/website-review-build/src/app/heritage/page.tsx`
- `projects/agw/website-review-build/phase-0/PHASE0_LOCK.md`

What is wrong:

- The only third-party production integration mounted in app code is the LeadConnector chat loader in `src/app/layout.tsx:126-131`.
- The phase lock explicitly calls for `GTM-W559QJ7C` in `phase-0/PHASE0_LOCK.md:29`, but there is no GTM bootstrap anywhere under `src/`.
- High-value CTA surfaces in `src/components/site-shell.tsx:111-116`, `src/app/page.tsx:98-107`, `src/app/commercial/page.tsx:47-56`, `src/app/residential/page.tsx:63-72`, and `src/app/heritage/page.tsx:41-50` are plain links with no measurement layer.

Risk:

- Launching this branch would preserve chat but lose clean attribution and conversion instrumentation.
- There is no reliable way to measure hero CTA clicks, route CTA clicks, intake starts, calendar starts, or booked appointments from the new frontend.
- That makes it hard to validate whether the new UX improves or harms lead flow.

Exact next fix:

- Add GTM in `layout.tsx` using the locked container.
- Standardize `dataLayer` events for header CTA, hero CTA, route CTA, intake submitted, calendar started, and booking completed.
- Land the event contract before or alongside the new intake route so conversion changes are measurable.

### 3. The SEO migration surface is still far too small for a real cutover

Severity: `high`

Files involved:

- `projects/agw/website-review-build/src/app/sitemap.ts`
- `projects/agw/website-review-build/src/app/layout.tsx`
- `projects/agw/website-review-build/migration-url-inventory.txt`
- `projects/agw/website-review-build/src/app/commercial/page.tsx`
- `projects/agw/website-review-build/src/app/residential/page.tsx`
- `projects/agw/website-review-build/src/app/heritage/page.tsx`

What is wrong:

- `migration-url-inventory.txt` contains `455` legacy URLs, but `src/app/sitemap.ts:6-31` only publishes four pages.
- The current route surface under `src/app/` is only `/`, `/commercial`, `/residential`, and `/heritage`.
- Structured data is also still minimal: `src/app/layout.tsx:91-96` injects one global `PaintingContractor` block for every route, but there is no page-specific schema for the key service pages.

Risk:

- A real domain cutover from the legacy site to this branch would collapse a large amount of indexed surface area.
- The branch has no visible redirect map, no service-area landing set, and no page-level structured data strategy for the most commercial pages.
- This is still preview-grade SEO coverage, not launch-grade SEO coverage.

Exact next fix:

- Build the redirect map from `migration-url-inventory.txt`.
- Ship the minimum retained SEO set before launch: redirect coverage plus the highest-value legacy service/location pages.
- Add page-level schema for the core service routes once the route set is stable.

### 4. Key pages still depend on oversized image assets that are hostile to production LCP

Severity: `high`

Files involved:

- `projects/agw/website-review-build/src/lib/brand-assets.ts`
- `projects/agw/website-review-build/src/app/commercial/page.tsx`
- `projects/agw/website-review-build/src/app/residential/page.tsx`
- `projects/agw/website-review-build/src/app/heritage/page.tsx`
- `projects/agw/website-review-build/src/app/layout.tsx`
- `projects/agw/website-review-build/public/agw-curated/white-kitchen.jpg`
- `projects/agw/website-review-build/public/agw-curated/heritage-van.jpg`
- `projects/agw/website-review-build/public/agw-curated/commercial-floor.jpg`
- `projects/agw/website-review-build/public/agw-selected/hero-room.jpg`

What is wrong:

- `src/lib/brand-assets.ts:38-69` points route surfaces at large JPG and PNG assets without a normalized optimized set.
- The residential hero uses `AGW_CURATED_PHOTOS.whiteKitchen` in `src/app/residential/page.tsx:106-113`; that file is about `8.3 MB`.
- The heritage hero uses `AGW_CURATED_PHOTOS.heritageVan` in `src/app/heritage/page.tsx:84-91`; that file is about `5.0 MB`.
- The commercial hero uses `AGW_CURATED_PHOTOS.commercialFloor` in `src/app/commercial/page.tsx:89-96`; that file is about `4.2 MB`.
- The global OG image in `src/app/layout.tsx:55-69` still points at `/agw-selected/hero-room.jpg`, which is about `10.5 MB`.
- The repo also holds duplicate copies of the same hero image in `public/agw-selected/hero-room.jpg`, `public/agw-curated/residential-hero-room.jpg`, and `public/agw-approved/hero-room.jpg`.

Risk:

- These files are too heavy for route-critical imagery on mobile and will make LCP fragile.
- The duplication also increases deploy weight and makes asset governance messy.
- Even with `next/image`, the source payload is unnecessarily expensive.

Exact next fix:

- Produce an optimized web set for all above-the-fold images in WebP or AVIF plus one separately optimized OG image.
- Repoint the route surfaces to the optimized assets.
- Remove duplicated alternates after references are normalized so the app has one canonical photo set.

### 5. Typography is still not locked to one real brand system

Severity: `medium`

Files involved:

- `projects/agw/website-review-build/src/app/layout.tsx`
- `projects/agw/website-review-build/src/app/globals.css`
- `projects/agw/website-review-build/design-system/MASTER.md`

What is wrong:

- `src/app/layout.tsx:16-28` only loads `Poppins-ExtraBold.ttf` as `--font-ui`.
- `src/app/globals.css:17-19` defines Playfair for display, but the main body stack in `src/app/globals.css:36-47` falls back to `"Avenir Next", "Helvetica Neue", "Segoe UI", sans-serif`.
- UI labels are styled with `var(--font-ui)` in `src/app/globals.css:89-93`, but body copy is not using an approved AGW body font at all.
- The generated design doc still points to `Plus Jakarta Sans` and `Inter` in `design-system/MASTER.md:37-42`, which conflicts with the brand usage in the app and the broader AGW brand direction.

Risk:

- The production site will render with different body typography depending on platform instead of a controlled brand system.
- The branch looks closer to brand than earlier passes, but it is still not a stable source of truth for typography.
- Additional passes can drift again because the app and the design doc are still describing different systems.

Exact next fix:

- Choose one approved web typography system.
- Load the actual body weights that the app uses instead of only the extra-bold UI face.
- Update the design-system doc only after the shipped font stack and the implemented CSS match.

## Recommended Next Fix Order

1. Internalize the quote/intake flow and keep GHL as the final booking step on a cloned calendar.
2. Add GTM and a minimal `dataLayer` event contract for all critical CTA and booking states.
3. Build redirect coverage and the minimum retained SEO route set from `migration-url-inventory.txt`.
4. Optimize the above-the-fold image set and remove duplicate photo variants after references are stable.
5. Lock typography to one approved system and then reconcile the design-system docs.

## What Should Not Be Touched Yet

- Do not replace the current live GHL booking backend until the cloned calendar path is tested end-to-end.
- Do not remove the existing appointment-booked automation or assume customer-care notifications can be rebuilt later.
- Do not edit `projects/agw/live-site-reference/`; keep `projects/agw/website-review-build/` as the only app under active review.
- Do not start a broad visual rewrite before the conversion path, tracking, and booking handoff are defined.
- Do not regenerate or “clean up” the design system first; lock the implemented brand decisions in the app before changing the docs.

## Verification Notes

- Requested file index and targeted source search were completed.
- `site-audit` static pass returned clean for framework-level issues.
- `npm run lint` and `npm run build` could not run in this review worktree because `eslint` and `next` were not installed locally in `projects/agw/website-review-build/`.
