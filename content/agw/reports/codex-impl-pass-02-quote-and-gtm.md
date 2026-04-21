# Codex Impl Pass 02: Quote Route And GTM

## Worktree Used

- `/Users/david/agw-codex-impl`
- Branch: `agw-codex-impl`

## Starting SHA

- `5f5bc8497f662d81c9cf1e85b0e776b257068d83`

## Files Changed

- `projects/agw/website-review-build/src/app/commercial/page.tsx`
- `projects/agw/website-review-build/src/app/get-a-quote/page.tsx`
- `projects/agw/website-review-build/src/app/heritage/page.tsx`
- `projects/agw/website-review-build/src/app/layout.tsx`
- `projects/agw/website-review-build/src/app/page.tsx`
- `projects/agw/website-review-build/src/app/residential/page.tsx`
- `projects/agw/website-review-build/src/components/service-cta-band.tsx`
- `projects/agw/website-review-build/src/components/service-page-hero.tsx`
- `projects/agw/website-review-build/src/components/site-shell.tsx`
- `projects/agw/website-review-build/src/components/tracked-link.tsx`
- `projects/agw/website-review-build/src/lib/site-data.ts`

## Internal Quote-Route Changes

- Replaced the exported sitewide `QUOTE_URL` with the internal app route `/get-a-quote`.
- Added a new `src/app/get-a-quote/page.tsx` bridge page so the AGW app owns the first quote step instead of sending users straight to the legacy WordPress quote page.
- Kept the bridge route compact and operationally safe: the page explains the handoff, then sends users into the existing live GHL booking flow rather than pretending the intake/calendar rebuild is finished.
- Added a `quote_route_view` data-layer event on route load so the bridge page can be measured separately from the rest of the site.

## GTM Changes

- Added Google Tag Manager bootstrap to `src/app/layout.tsx` using the locked container ID `GTM-W559QJ7C`.
- Added the standard GTM `noscript` iframe fallback in the app shell body.
- Centralized GTM and LeadConnector constants in `src/lib/site-data.ts` so the app shell uses documented IDs instead of hard-coded duplicates.

## CTA/Data-Layer Changes

- Added `src/components/tracked-link.tsx` so tracked internal and external CTAs can share one implementation.
- Added delegated click instrumentation in `src/app/layout.tsx` that pushes CTA events into `window.dataLayer` from `data-cta-*` attributes.
- Wired primary quote CTA surfaces to emit trackable events:
  - site shell top strip, desktop header, mobile menu, footer CTA, and footer quote links
  - homepage hero quote CTA
  - homepage lower quote CTA
  - shared service-page hero primary CTA
  - shared service-page closing CTA band primary CTA
  - residential mid-page walkthrough CTA
  - internal quote-route handoff CTA

## Booking-Safety Notes

- LeadConnector chat loader and widget ID were preserved and moved to constants only; the widget behavior was not removed or replaced.
- The app now owns the first quote click, but the actual booking handoff still goes to the existing AGW booking URL:
  - `https://link.agwilliamspainting.com/widget/booking/INZqRCM9fdZwZ6avSiny`
- This pass does not replace GHL calendar behavior, appointment notifications, or customer-care automation.
- No fake intake system, calendar rebuild, or API-backed booking flow was added in this slice.

## Verification Results

- `npm install`
  - Succeeded on the local default runtime (`node v18.18.2`) with engine warnings from packages that prefer Node 20+.
- `npm run lint`
  - Passed.
- Build verification used an explicit Node 20 runtime because the shell default is below the required Next.js version.
  - Command used: `npx -y node@20.11.1 ./node_modules/next/dist/bin/next build`
  - Result: passed.

## Next Recommended Pass

- Define the final internal quote bridge UX more tightly around residential vs. commercial routing, then decide whether the next step should stay a simple GHL handoff or move into a real custom intake that writes safely into the existing booking/notification chain.
