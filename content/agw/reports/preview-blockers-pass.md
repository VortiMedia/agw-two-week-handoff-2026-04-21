# Preview Blockers Pass

## Worktree

- `/Users/david/agw-preview-blockers`
- Branch: `agw-preview-blockers`

## Starting SHA

- `c404b445479a9413545229202d685fce89146035`

## Metadata Changes

- Added `projects/agw/website-review-build/src/lib/seo.ts` to centralize page-metadata generation and the live-route inventory used by the sitemap.
- Expanded per-page metadata for:
  - `projects/agw/website-review-build/src/app/commercial/page.tsx`
  - `projects/agw/website-review-build/src/app/residential/page.tsx`
  - `projects/agw/website-review-build/src/app/heritage/page.tsx`
- Each of those pages now has route-specific:
  - canonical path
  - description
  - keyword set tied to the actual page topic
  - Open Graph title, description, URL, and route-relevant image
  - Twitter title, description, and large-image card
- Also aligned `projects/agw/website-review-build/src/app/get-a-quote/page.tsx` to the same metadata helper so the live quote bridge route no longer depends on layout defaults.

## Schema Scoping Changes

- Removed homepage-only JSON-LD injection from `projects/agw/website-review-build/src/app/layout.tsx`.
- Added the existing `PaintingContractor` JSON-LD only to `projects/agw/website-review-build/src/app/page.tsx`.
- Kept the schema content truthful to the current preview surface:
  - company identity
  - Pelham address
  - phone
  - four-county service area
  - current homepage positioning

## Sitemap Changes

- Replaced the hard-coded sitemap list in `projects/agw/website-review-build/src/app/sitemap.ts` with the shared live-route inventory from `src/lib/seo.ts`.
- Sitemap now includes every live route in the preview app:
  - `/`
  - `/commercial`
  - `/residential`
  - `/heritage`
  - `/get-a-quote`
- Updated sitemap `lastModified` to `2026-04-21T00:00:00.000Z` to match this pass.

## Typography Changes

- Locked the app shell to the web brand pairing described by the AGW website brand reference and `claude-design` web tokens:
  - `Playfair Display` for display/headings
  - `Poppins` for body copy and UI
- Replaced the previous one-weight local Poppins setup plus legacy serif fallbacks in `projects/agw/website-review-build/src/app/layout.tsx`.
- Updated typography tokens in `projects/agw/website-review-build/src/app/globals.css` so the rendered type system matches the AGW web direction more closely:
  - display stack now resolves to Playfair
  - body/UI stack now resolves to Poppins
  - headline weights and line-height loosened to fit the brand reference
  - body copy, labels, buttons, and FAQ headings now use Poppins-based sizing and weight rules instead of the heavier placeholder treatment

## Verification Results

- `cd projects/agw/website-review-build`
- `npm install`
  - Passed under local Node `18.18.2`
  - Reported expected engine warnings because Next 16 and some dependencies prefer Node 20+
- `npm run lint`
  - Passed
- `npx -y node@20.11.1 ./node_modules/next/dist/bin/next build`
  - First run failed because the optional Tailwind native package was missing:
    - `@tailwindcss/oxide-darwin-arm64`
  - Installed the missing binding with:
    - `npm install --no-save @tailwindcss/oxide-darwin-arm64@4.2.2`
  - Re-ran the Node 20 build
  - Passed

## Files Changed

- `content/agw/reports/preview-blockers-pass.md`
- `projects/agw/website-review-build/src/app/commercial/page.tsx`
- `projects/agw/website-review-build/src/app/get-a-quote/page.tsx`
- `projects/agw/website-review-build/src/app/globals.css`
- `projects/agw/website-review-build/src/app/heritage/page.tsx`
- `projects/agw/website-review-build/src/app/layout.tsx`
- `projects/agw/website-review-build/src/app/page.tsx`
- `projects/agw/website-review-build/src/app/residential/page.tsx`
- `projects/agw/website-review-build/src/app/sitemap.ts`
- `projects/agw/website-review-build/src/lib/seo.ts`
