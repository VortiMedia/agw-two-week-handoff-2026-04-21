# AGW Performance Asset Plan — 2026-04-21

## Branch and SHA Reviewed

| Field | Value |
|---|---|
| Branch | `origin/agw-frontend-pass` |
| SHA | `1bf969ea6bd68e8754dca038af58c70f32186f58` |
| Latest commit | Frontend production-readiness pass: font, logo, GHL widget, SEO fixes |
| Canonical app path | `projects/agw/website-review-build/` |
| Input note | `content/agw/reports/codex-review-pass-01.md` was not found on this branch; findings are based on the four input files that exist. |

---

## Summary

The current public asset directory contains **~110 MB of images** across four route pages. The biggest problems are: a 10 MB raw JPEG serving as the global OG image, a 7.9 MB JPEG as the residential page LCP candidate, two hero-grid images totaling 13.8 MB that are not tagged `priority` despite rendering above the fold, and three brand pattern PNGs averaging 1.5 MB each that are defined in `brand-assets.ts` but referenced by no route in the reviewed set.

No image in the public directory is currently exported as WebP or AVIF. Next.js `<Image>` will convert on request, but the source originals are large enough that even compressed output may exceed reasonable budgets at LCP.

---

## Top Oversized Assets

Sorted by file size, largest first. All files live under `projects/agw/website-review-build/public/`.

| # | File | Size | Dimensions | Format | Active in App |
|---|---|---|---|---|---|
| 1 | `agw-selected/service-residential.png` | 11 MB | 4032 × 3024 | PNG | No — defined in `brand-assets.ts` but not imported by any reviewed page |
| 2 | `agw-selected/service-commercial.png` | 11 MB | 4032 × 3024 | PNG | No — same as above |
| 3 | `agw-selected/hero-room.jpg` | 10 MB | 5616 × 3744 | JPEG | Yes — OG/Twitter card only (`layout.tsx:47,59`) |
| 4 | `agw-curated/residential-hero-room.jpg` | 10 MB | 5616 × 3744 | JPEG | Yes — below fold, `residential/page.tsx` service gallery |
| 5 | `agw-approved/hero-room.jpg` | 10 MB | 5616 × 3744 | JPEG | No — duplicate of `agw-selected/hero-room.jpg`; no page reference |
| 6 | `agw-curated/exterior-process.jpg` | 9 MB | 3504 × 2336 | JPEG | Yes — **above fold hero grid**, `heritage/page.tsx:116`; no `priority` flag |
| 7 | `agw-approved/painter-exterior.jpg` | 9 MB | 3504 × 2336 | JPEG | No — defined in `brand-assets.ts`; not imported by any reviewed page |
| 8 | `agw-curated/white-kitchen.jpg` | 7.9 MB | 5327 × 3504 | JPEG | Yes — **above fold, `priority`** on `residential/page.tsx:107`; also below fold on `page.tsx` |
| 9 | `agw-brand/presentation-3.jpg` | 5.2 MB | 6000 × 4500 | JPEG | No — `BRAND_IMAGES.residential`; not imported by any reviewed page |
| 10 | `agw-curated/heritage-van.jpg` | 4.8 MB | 5312 × 2988 | JPEG | Yes — **above fold, `priority`** on `heritage/page.tsx:85` |
| 11 | `agw-curated/commercial-floor.jpg` | 4.1 MB | 3456 × 2304 | JPEG | Yes — **above fold, `priority`** on `commercial/page.tsx:90`; also below fold on `page.tsx` |
| 12 | `agw-approved/floor-firehouse.jpg` | 4.1 MB | 3456 × 2304 | JPEG | No — defined in `brand-assets.ts`; not imported by any reviewed page |
| 13 | `agw-curated/residential-process.jpg` | 3.4 MB | 3504 × 2336 | JPEG | Yes — below fold, `residential/page.tsx:222` |
| 14 | `agw-approved/process-consultation.jpg` | 3.4 MB | 3504 × 2336 | JPEG | No — defined in `brand-assets.ts`; not imported by any reviewed page |
| 15 | `agw-brand/presentation-4.jpg` | 2.5 MB | 4500 × 3000 | JPEG | No — `BRAND_IMAGES.commercial`; not imported by any reviewed page |
| 16 | `agw-curated/home-hero-van.png` | 2.2 MB | 1600 × 770 | PNG | No — `AGW_CURATED_PHOTOS.homeHeroVan`; not imported by any reviewed page |
| 17 | `agw-brand/pattern-4.png` | 1.8 MB | 6975 × 4633 | PNG | No — `BRAND_PATTERNS.grid`; not imported by any reviewed page |
| 18 | `agw-brand/pattern-3.png` | 1.7 MB | 6975 × 4633 | PNG | No — `BRAND_PATTERNS.accent`; not imported by any reviewed page |
| 19 | `agw-selected/proof-exterior.jpeg` | 1.5 MB | — | JPEG | No — `AGW_SELECTED_PHOTOS.proofExterior`; not imported by any reviewed page |
| 20 | `agw-brand/pattern-1.png` | 976 KB | 6976 × 4633 | PNG | No — `BRAND_PATTERNS.hero`; not imported by any reviewed page |
| 21 | `agw-logo-lockup.png` | 152 KB | 4001 × 4000 | PNG | Yes — used in `SiteShell` nav (`AGW_BRAND.logoLockup`) on every page |

---

## Above-the-Fold Audit

The following images render before scroll on initial load. Assets marked **priority** have the Next.js `priority` prop set. Assets without it will delay LCP.

### Homepage (`/`)

| Image | Asset | Size | `priority` | Notes |
|---|---|---|---|---|
| Hero grid — exterior photo | `agw-curated/home-exterior-fairfield.jpg` | **228 KB**, 1600 × 770 | Yes | Acceptable. Only hero with `priority` on the homepage. |
| Logo in nav | `agw-logo-lockup.png` | 152 KB, 4001 × 4000 | Not set | Renders at ~200 px wide. Source is 20× oversized. |

Homepage hero is the lightest of the four pages. The hero image at 228 KB and already at a web-friendly resolution is the one standout exception across the asset set.

### Residential (`/residential`)

| Image | Asset | Size | `priority` | Notes |
|---|---|---|---|---|
| Hero — primary kitchen | `agw-curated/white-kitchen.jpg` | **7.9 MB**, 5327 × 3504 | **Yes** | Worst LCP on the site. Full-resolution Canon 5D raw above the fold. |
| Hero — interior painter | `agw-curated/interior-painter.jpg` | 256 KB, 2048 × 1365 | No | In the same hero grid. Missing `priority` flag. |
| Hero — exterior Fairfield | `agw-curated/home-exterior-fairfield.jpg` | 228 KB, 1600 × 770 | No | In the same hero grid. Missing `priority` flag. |

### Commercial (`/commercial`)

| Image | Asset | Size | `priority` | Notes |
|---|---|---|---|---|
| Hero — commercial floor | `agw-curated/commercial-floor.jpg` | **4.1 MB**, 3456 × 2304 | **Yes** | Above-fold LCP candidate; ~18× the optimized target weight. |

### Heritage (`/heritage`)

| Image | Asset | Size | `priority` | Notes |
|---|---|---|---|---|
| Hero — heritage van | `agw-curated/heritage-van.jpg` | **4.8 MB**, 5312 × 2988 | **Yes** | Above-fold LCP candidate. Samsung Galaxy S6 original at full size. |
| Hero grid — exterior process | `agw-curated/exterior-process.jpg` | **9 MB**, 3504 × 2336 | **No** | In the same above-fold hero grid. Missing `priority` flag makes LCP worse. |

---

## OG / Social Card Image

The global OG image is set in `layout.tsx:47`:

```
/agw-selected/hero-room.jpg — 10 MB, 5616 × 3744
```

**This is the single highest-risk asset for crawlers.** Social platforms (Facebook, Twitter/X, LinkedIn, iMessage) fetch OG images directly. A 10 MB JPEG will either time out, get dropped by the crawler, or produce a degraded preview. The declared dimensions in metadata (`width: 5616, height: 3744`) do not match any social card specification.

OG images should be:
- Format: JPEG or PNG
- Dimensions: 1200 × 630 (Twitter/X minimum), 1200 × 628 (Facebook/LinkedIn optimal)
- File size: under 300 KB ideally, hard ceiling at 8 MB per platform limits (but that limit exists to accommodate the format, not justify using it)

No per-page OG overrides exist for `/commercial`, `/residential`, or `/heritage`. All four pages inherit the same 10 MB global image.

---

## Recommended Optimization Order

Priority is determined by: above-fold visibility × active use × file size. Items at the top have the highest combined impact.

### Tier 1 — Fix before any public preview or launch

These affect LCP directly and are served on the first paint of active pages.

**1. Create a web-optimized OG image from `agw-selected/hero-room.jpg`**
- Target: 1200 × 630 px, JPEG, under 200 KB
- Save as: `public/agw-og/home-og.jpg`
- Update `layout.tsx` to reference it and fix the declared `width`/`height`
- Add per-page OG overrides for commercial, residential, and heritage once assets exist
- Risk: **low** — metadata-only change, no visual impact to rendered pages

**2. Export an optimized web source for `agw-curated/white-kitchen.jpg` (residential LCP)**
- Current: 7.9 MB, 5327 × 3504 JPEG
- Target: 2400 × 1600 px max, JPEG quality 82, under 400 KB
- This is the `priority` LCP image on `/residential` — the highest-impact single replacement
- Risk: **low** — same composition, new file path; update one `src` prop in `residential/page.tsx:107`

**3. Export an optimized web source for `agw-curated/heritage-van.jpg` (heritage LCP)**
- Current: 4.8 MB, 5312 × 2988 JPEG
- Target: 2400 × 1350 px, JPEG quality 82, under 350 KB
- Priority-flagged hero image on `/heritage`
- Risk: **low** — same composition, one prop update in `heritage/page.tsx:85`

**4. Export an optimized web source for `agw-curated/commercial-floor.jpg` (commercial LCP)**
- Current: 4.1 MB, 3456 × 2304 JPEG
- Target: 2400 × 1600 px, JPEG quality 82, under 350 KB
- Priority-flagged hero on `/commercial`; also used below fold on homepage
- Risk: **low** — one file, two `src` references (`commercial/page.tsx:90`, `page.tsx:335`)

**5. Add `priority` to `agw-curated/exterior-process.jpg` on `/heritage`**
- Current: 9 MB source, no `priority` flag, in the above-fold hero grid (`heritage/page.tsx:116`)
- This image is in the same viewport row as the priority-flagged `heritageVan`; omitting `priority` causes a double LCP hit
- Risk: **low** — one prop addition; no visual change
- However: the source file itself is 9 MB and needs a separate reduction (see Tier 2)

---

### Tier 2 — Address before launch, can follow Tier 1

These are active assets that are oversized but either below the fold or secondary in the hero layout.

**6. Optimize `agw-curated/residential-hero-room.jpg`**
- Current: 10 MB, 5616 × 3744 — Canon 5D original
- Used below fold in the `/residential` service gallery
- Same source file and Exif as `agw-selected/hero-room.jpg` and `agw-approved/hero-room.jpg` — all three are duplicates
- Target: 2000 × 1334 px, JPEG quality 80, under 300 KB; one canonical file should replace all three
- Risk: **medium** — confirm the three files are true duplicates before deleting; do not remove `agw-selected/hero-room.jpg` until the OG replacement (item 1) is live

**7. Optimize `agw-curated/exterior-process.jpg`**
- Current: 9 MB, 3504 × 2336 — also used in heritage hero without `priority` (see item 5)
- Target: 2400 × 1600 px, JPEG quality 82, under 350 KB
- Risk: **low** — reduce source, no behavior changes beyond file size

**8. Optimize `agw-curated/residential-process.jpg`**
- Current: 3.4 MB, 3504 × 2336 — below fold on `/residential`
- Target: 1800 × 1200 px, JPEG quality 80, under 250 KB
- Risk: **low**

**9. Resize `agw-logo-lockup.png`**
- Current: 152 KB, 4001 × 4000 PNG
- Rendered at approximately 160–200 px wide in the nav
- Target: export at 400 × 400 px (2× retina), PNG, under 20 KB, or SVG if the lockup can be vectorized
- Risk: **medium** — confirm logo renders cleanly at the reduced export before deploying; test on retina and non-retina viewports

**10. Optimize `agw-curated/white-kitchen.jpg` below-fold instance on homepage**
- The same optimized file from item 2 should replace both uses; no separate action required if item 2 is done first

---

### Tier 3 — Can wait until after launch

These are inactive assets (not rendered by any reviewed page) or secondary-impact items that do not affect LCP or OG.

**11. Remove or archive `agw-approved/hero-room.jpg`**
- 10 MB duplicate of `agw-selected/hero-room.jpg` with no page reference
- Safe to remove once item 1 is live; confirm no other route outside the reviewed set references it first

**12. Remove or archive `agw-selected/service-residential.png` and `agw-selected/service-commercial.png`**
- 11 MB each; neither is referenced by any reviewed page
- These are defined in `AGW_SELECTED_PHOTOS` in `brand-assets.ts` but never imported
- Safe candidates for deletion after confirming no other component or page references them

**13. Remove or archive `agw-approved/painter-exterior.jpg`, `agw-approved/floor-firehouse.jpg`, `agw-approved/process-consultation.jpg`**
- 9 MB, 4.1 MB, 3.4 MB respectively; none referenced in any reviewed page
- Hold until post-launch once content strategy confirms these are not slated for upcoming pages

**14. Remove or convert `agw-brand/pattern-*.png`**
- Three pattern PNGs at 976 KB, 1.7 MB, 1.8 MB; none used in any reviewed page
- At 6975 × 4633 px source, these are print assets in the web public directory
- If patterns are added to future pages, export at max 1600 px wide in WebP format

**15. Remove or archive `agw-brand/presentation-3.jpg` and `agw-brand/presentation-4.jpg`**
- 5.2 MB and 2.5 MB; these are `BRAND_IMAGES.residential` and `BRAND_IMAGES.commercial` in `brand-assets.ts`
- `BRAND_IMAGES` is not imported by any reviewed page; move to `assets/agw/` archive if needed later

**16. Confirm and remove `agw-curated/home-hero-van.png`**
- 2.2 MB PNG at 1600 × 770 for a photo — should be JPEG if used; currently unreferenced
- Safe to remove if the van photo is not planned for a page

---

## Low-Risk vs. Higher-Risk Replacements

### Low risk — metadata or single `src` prop changes

- Items 1, 2, 3, 4 — OG image and three hero LCP assets: new file, one prop update each, no layout changes
- Item 5 — add `priority` to `exterior-process.jpg` in heritage hero: one prop addition
- Items 7, 8 — below-fold image optimizations: reduced file, no prop changes required if paths are preserved

### Higher risk — require cross-checking before removal

- Item 6 — triple-duplicate hero room consolidation: confirm all three are bit-level duplicates before removing any; do not remove `agw-selected/hero-room.jpg` until the OG replacement is deployed and verified
- Item 9 — logo resize: visual QA required across mobile, tablet, and retina desktop viewports; the `object-cover` render mode in `agw-logo.tsx` means incorrect aspect ratio will crop unexpectedly
- Items 11–16 — unused asset removal: safe in principle, but require a grep across `live-site-reference/` and any un-reviewed components to confirm nothing outside the reviewed page set references them

---

## What Can Wait Until After Launch

The following items have zero impact on LCP, OG rendering, or current page performance:

- All `agw-approved/` assets not actively used (painter-exterior, floor-firehouse, process-consultation, kitchen-finish)
- All `agw-selected/` assets except the OG hero (service-residential, service-commercial, proof-exterior, proof-detail, process-door)
- All `BRAND_IMAGES` and `BRAND_PATTERNS` — no route currently imports them
- `agw-curated/home-hero-van.png`, `agw-curated/westchester-kitchen.jpg`, `agw-curated/residential-kitchen.jpg` — unreferenced
- Font file audit — `brand-kit/02-fonts/Poppins-ExtraBold.ttf` is the only weight loaded; broader font optimization is a post-launch pass

---

## Quick Reference: Critical Fixes Before Preview

| Action | File | Impact |
|---|---|---|
| Create OG image at 1200 × 630, ≤200 KB | `agw-selected/hero-room.jpg` → `agw-og/home-og.jpg` | Social card rendering on all platforms |
| Resize residential LCP to ≤400 KB | `agw-curated/white-kitchen.jpg` | Residential page LCP — highest single impact |
| Add `priority` to `exterior-process.jpg` | `heritage/page.tsx:116` | Heritage LCP — one-line fix |
| Resize heritage hero to ≤350 KB | `agw-curated/heritage-van.jpg` | Heritage LCP — alongside exterior-process |
| Resize commercial hero to ≤350 KB | `agw-curated/commercial-floor.jpg` | Commercial and homepage LCP |
