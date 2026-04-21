# AGW Performance Pass Implementation

## Worktree Used

- `/Users/david/agw-performance-pass`
- Branch: `agw-performance-pass`

## Starting SHA

- `c404b445479a9413545229202d685fce89146035`

## Requested Inputs

Read successfully:

- `projects/agw/website-review-build/src/lib/brand-assets.ts`
- `projects/agw/website-review-build/src/app/layout.tsx`

Requested report files were not present in this worktree:

- `content/agw/reports/performance-asset-plan.md`
- `content/agw/reports/launch-blockers-master.md`
- `content/agw/reports/preview-qa-checklist.md`

Work proceeded from the canonical app, the referenced asset wiring, and the existing AGW readiness/handoff docs already present in `content/agw/`.

## Assets Changed

- `projects/agw/website-review-build/public/agw-selected/hero-room.jpg`
  - approx `10M` -> `130K`
  - `5616x3744` -> `1600x1067`
  - reason: OG image source was far larger than required for launch
- `projects/agw/website-review-build/public/agw-curated/white-kitchen.jpg`
  - approx `7.9M` -> `205K`
  - `5327x3504` -> `2000x1316`
  - reason: residential hero image source was oversized for the rendered slot
- `projects/agw/website-review-build/public/agw-curated/heritage-van.jpg`
  - approx `4.8M` -> `348K`
  - `5312x2988` -> `2000x1125`
  - reason: heritage hero image source was oversized for the rendered slot
- `projects/agw/website-review-build/public/agw-curated/exterior-process.jpg`
  - approx `9.0M` -> `353K`
  - `3504x2336` -> `2000x1333`
  - reason: launch-critical curated asset compressed in place for lower transfer cost
- `projects/agw/website-review-build/public/agw-curated/commercial-floor.jpg`
  - approx `4.1M` -> `466K`
  - `3456x2304` -> `2000x1333`
  - reason: commercial hero image source was oversized for the rendered slot

All five JPGs were rewritten in place with smaller source dimensions, stripped metadata, 4:2:0 chroma subsampling, and progressive JPEG output to reduce launch payload without changing asset names or layout wiring.

## Code Touched

- `projects/agw/website-review-build/src/components/service-page-hero.tsx`
  - removed the explicit `quality={100}` override from the shared service hero `<Image />`
  - result: residential, heritage, and commercial hero images now use Next.js default image quality instead of forcing maximum JPEG quality on launch-visible hero requests

No quote flow, GTM, booking, or redirect code was changed.

## Verification Results

- `cd projects/agw/website-review-build && npm install`
  - completed successfully under the shell default Node `18.18.2`
  - emitted engine warnings because Next 16 and some dependencies prefer Node 20+
- `npm run lint`
  - passed
- `npx -y node@20.11.1 ./node_modules/next/dist/bin/next build`
  - first attempt failed because the Node 18 install skipped Tailwind's optional native `@tailwindcss/oxide` binding
  - reran install under Node 20 using:
    - `npx -y node@20.11.1 /usr/local/lib/node_modules/npm/bin/npm-cli.js install`
  - reran build after that
  - passed

## Outcome

This pass stayed performance-only:

- no route structure changed
- no layout intent changed
- no asset paths changed
- launch-visible OG and service-hero images now ship at materially smaller source sizes
- shared service hero delivery no longer forces maximum JPEG quality
