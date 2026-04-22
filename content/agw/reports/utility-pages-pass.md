# AGW Utility Pages Pass

- Starting SHA: `c404b445479a9413545229202d685fce89146035`
- Canonical app: `projects/agw/website-review-build`

## Pages created

- `src/app/contact/page.tsx`
- `src/app/about/page.tsx`
- `src/app/privacy-policy/page.tsx`
- `src/app/terms/page.tsx`
- `src/app/accessibility/page.tsx`

## Reusable components touched

- `src/components/site-shell.tsx`
  - added footer utility-page links so the new routes are reachable from every page
- `src/components/utility-page-shell.tsx`
  - new shared placeholder-page template used by all five utility routes

## Supporting app changes

- `src/lib/site-data.ts`
  - extended `SitePath`
  - added top-strip and shell-action content for the new utility routes
  - added footer and utility link data
- `src/app/sitemap.ts`
  - added the utility routes to the generated sitemap

## Known copy gaps

- `contact`
  - final office hours and any response-time commitments are still missing
  - no approved department-specific routing copy was available
- `about`
  - full history/about narrative, leadership copy, and archival proof points are still pending
- `privacy-policy`
  - final legal review is still needed
  - vendor-specific disclosures, retention windows, and request-handling language are still missing
- `terms`
  - final legal/business terms, limitation language, and effective-date details are still missing
- `accessibility`
  - formal accessibility statement and audit-backed conformance language are still pending the planned hardening pass
- Inputs requested in the task but not present in this checkout:
  - `content/agw/reports/redirect-seed-map.md`
  - `content/agw/reports/launch-blockers-master.md`

## Verification results

- `npm install`
  - passed
  - expected engine warnings appeared because the repo default runtime is Node `18.18.2` while Next `16.2.3` requires Node `>=20.9.0`
- `npm run lint`
  - passed
- `npx -y node@20.11.1 ./node_modules/next/dist/bin/next build`
  - passed
  - build initially failed because `npm install` under Node 18 skipped Tailwind's native optional package
  - installed `@tailwindcss/oxide-darwin-arm64@4.2.2` with `npm install --no-save` and reran the required build successfully

## Result

- launch-blocking utility routes now exist in the canonical app
- each route uses brand-consistent placeholder copy without pretending final legal/business content is complete
- the routes are linked in the global footer and included in the sitemap
