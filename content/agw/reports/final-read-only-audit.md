# AGW Final Read-Only Audit

## Branch / SHA Reviewed

- Worktree branch: `codex/final-read-only-audit-20260421`
- Base branch used for review: `agw-release-gate-doc`
- Reviewed SHA: `c404b445479a9413545229202d685fce89146035`
- Canonical app path: `projects/agw/website-review-build/`

## Top 5 Remaining Risks

### 1. The new quote route owns the first click, but it still does not own intake or routing

Severity: `critical`

Files involved:

- `projects/agw/website-review-build/src/app/get-a-quote/page.tsx`
- `projects/agw/website-review-build/src/lib/site-data.ts`
- `content/agw/reports/codex-impl-pass-02-quote-and-gtm.md`

What is still wrong:

- `src/lib/site-data.ts:12-15` defines one shared live booking destination, `GHL_BOOKING_URL`, with no residential/commercial split.
- `src/app/get-a-quote/page.tsx:63-82` gives the user one primary action: `Continue to Booking`, which sends every lead straight to that single live GHL URL.
- `src/app/get-a-quote/page.tsx:16-38` talks about residential walkthroughs, commercial consultations, and office support, but the page does not actually collect project type, county, or any intake data before handoff.
- `src/lib/site-data.ts:141-150` makes the `/get-a-quote` shell CTA set point to the same live booking URL, so once the user lands on the bridge route there is still only one downstream path.
- The implementation report explicitly notes this pass is a compact bridge and does not add a real intake or booking rebuild in `content/agw/reports/codex-impl-pass-02-quote-and-gtm.md:28-31` and `:52-58`.

Risk:

- AGW now owns the first CTA click, but it still does not own the qualification step that determines whether the lead belongs in residential, commercial, or a specialty lane.
- Conversion measurement still stops at the bridge click; there is no in-app intake state, no abandonment state after intent is known, and no structured route decision before the live calendar.
- This keeps the biggest product risk from earlier passes partially open, just in a safer wrapper.

What to fix next:

- Add a minimal intake step on `/get-a-quote` that captures project type and service area before revealing the next step.
- Route residential and commercial users into the right booking handoff instead of one undifferentiated live URL.
- Emit at least `intake_submitted` and `booking_handoff_started` events after the user commits to a lane.

### 2. The launch surface is still far too small for a real cutover

Severity: `critical`

Files involved:

- `projects/agw/website-review-build/src/app/page.tsx`
- `projects/agw/website-review-build/src/app/commercial/page.tsx`
- `projects/agw/website-review-build/src/app/residential/page.tsx`
- `projects/agw/website-review-build/src/app/heritage/page.tsx`
- `projects/agw/website-review-build/src/app/get-a-quote/page.tsx`
- `projects/agw/website-review-build/src/app/sitemap.ts`
- `projects/agw/website-review-build/next.config.ts`
- `projects/agw/website-review-build/src/lib/site-data.ts`
- `content/agw/reports/launch-blockers-master.md`

What is still wrong:

- The current route footprint under `src/app/` is still only five pages: home, commercial, residential, heritage, and get-a-quote.
- `src/app/sitemap.ts:6-31` publishes only four URLs and omits `/get-a-quote`, while also excluding every utility and legal destination called out in the master launch blockers document.
- `next.config.ts:3-5` contains no `redirects()` implementation at all.
- `src/lib/site-data.ts:44-50` and `:37-42` still define the visible nav/footer surface as only the four brochure routes plus the quote path.
- `content/agw/reports/launch-blockers-master.md:133-164` still expects a minimum redirect map and core utility pages before launch, and none of that work exists in this reviewed branch state.

Risk:

- This branch is previewable, but it is not launchable without stranding a large legacy URL footprint and shipping an obviously incomplete site map.
- The lack of redirects and missing utility targets means a cutover would create avoidable 404s, weak trust coverage, and legal page gaps.
- Even the new `/get-a-quote` route is absent from the sitemap, so the current search-discovery surface understates the actual route set.

What to fix next:

- Add the minimum launch-day pages first: `/about`, `/contact`, `/privacy-policy`, `/terms`, and `/accessibility`.
- Implement `redirects()` in `next.config.ts` from the agreed legacy URL set.
- Expand `src/app/sitemap.ts` to include every launch-day route, including `/get-a-quote`.

### 3. Homepage JSON-LD is still injected on every route

Severity: `high`

Files involved:

- `projects/agw/website-review-build/src/app/layout.tsx`
- `projects/agw/website-review-build/src/lib/site-data.ts`
- `projects/agw/website-review-build/src/app/page.tsx`
- `projects/agw/website-review-build/src/app/commercial/page.tsx`
- `projects/agw/website-review-build/src/app/residential/page.tsx`
- `projects/agw/website-review-build/src/app/heritage/page.tsx`
- `projects/agw/website-review-build/src/app/get-a-quote/page.tsx`

What is still wrong:

- `src/lib/site-data.ts:431-448` defines one `HOMEPAGE_JSON_LD` object with a generic `PaintingContractor` payload.
- `src/app/layout.tsx:115-120` injects that schema globally from the root layout, so it runs on every page, not only the homepage.
- None of the route files under `src/app/` adds route-specific schema or scopes structured data locally.

Risk:

- Commercial, residential, heritage, and quote-route pages all advertise the same homepage-level structured data block, regardless of page intent.
- That weakens page-level semantic clarity just when the site already has a very small launch surface.
- This is not fatal for preview, but it is still a concrete SEO-quality defect in the current branch.

What to fix next:

- Move the current `HOMEPAGE_JSON_LD` script out of `layout.tsx` and into `src/app/page.tsx`.
- Add route-specific schema only where it is justified and accurate.
- Keep the global layout free of homepage-only structured data.

### 4. Critical imagery and the global social card still point at 4-10 MB originals

Severity: `high`

Files involved:

- `projects/agw/website-review-build/src/lib/brand-assets.ts`
- `projects/agw/website-review-build/src/app/layout.tsx`
- `projects/agw/website-review-build/src/app/page.tsx`
- `projects/agw/website-review-build/src/app/commercial/page.tsx`
- `projects/agw/website-review-build/src/app/residential/page.tsx`
- `projects/agw/website-review-build/src/app/heritage/page.tsx`
- `projects/agw/website-review-build/public/agw-selected/hero-room.jpg`
- `projects/agw/website-review-build/public/agw-curated/white-kitchen.jpg`
- `projects/agw/website-review-build/public/agw-curated/heritage-van.jpg`
- `projects/agw/website-review-build/public/agw-curated/commercial-floor.jpg`
- `projects/agw/website-review-build/public/agw-curated/exterior-process.jpg`
- `projects/agw/website-review-build/public/agw-curated/residential-hero-room.jpg`

What is still wrong:

- `src/app/layout.tsx:61-75` still uses `/agw-selected/hero-room.jpg` as the global OG/Twitter image; the current file is `10,539,387` bytes.
- `src/app/residential/page.tsx:73-76` points the residential hero media to `white-kitchen.jpg`; the current file is `8,327,389` bytes.
- `src/app/heritage/page.tsx:52-55` points the heritage hero media to `heritage-van.jpg`; the current file is `4,997,049` bytes.
- `src/app/commercial/page.tsx:48-51` points the commercial hero media to `commercial-floor.jpg`; the current file is `4,249,990` bytes.
- `src/app/page.tsx:273-278` and `:325-330` still use large curated originals in prominent homepage image slots.
- `src/lib/brand-assets.ts:56-68` still maps the live route surfaces to these full-size original assets.

Risk:

- The most visible route assets are still much heavier than they need to be, which keeps LCP and mobile payload risk open even after the quote/GTM fixes landed.
- The OG/Twitter image is especially wasteful because it is a single shared asset referenced by every page.
- This is one of the clearest remaining technical risks because it affects both user experience and launch credibility immediately.

What to fix next:

- Generate optimized web variants for every above-the-fold route image and a separately sized social card image.
- Repoint the app to those optimized assets without changing the layout or design structure.
- Remove duplicate originals only after references are normalized to one canonical asset set.

### 5. Sub-pages still inherit homepage-biased social metadata

Severity: `medium`

Files involved:

- `projects/agw/website-review-build/src/app/layout.tsx`
- `projects/agw/website-review-build/src/app/commercial/page.tsx`
- `projects/agw/website-review-build/src/app/residential/page.tsx`
- `projects/agw/website-review-build/src/app/heritage/page.tsx`
- `projects/agw/website-review-build/src/app/get-a-quote/page.tsx`

What is still wrong:

- `src/app/layout.tsx:53-76` defines one homepage-oriented `openGraph` and `twitter` block with URL `/` and the shared home description/image.
- The route files for commercial, residential, heritage, and get-a-quote only define `title`, `description`, and `alternates.canonical` in `commercial/page.tsx:14-21`, `residential/page.tsx:19-26`, `heritage/page.tsx:15-22`, and `get-a-quote/page.tsx:7-14`.
- No route-specific `openGraph` or `twitter` overrides exist for those pages.

Risk:

- Social previews and route-level metadata are still biased toward the homepage experience instead of the actual page being shared.
- That dilutes commercial/residential page positioning at exactly the routes where differentiated messaging matters most.
- This is less urgent than the cutover and image risks, but it is still a real product-quality gap in the reviewed branch.

What to fix next:

- Add page-level `openGraph` and `twitter` blocks for commercial, residential, heritage, and get-a-quote.
- Set the route-specific URL, title, description, and image intentionally rather than inheriting the homepage defaults.

## What Is Safe To Leave Alone

- The `QUOTE_URL = "/get-a-quote"` change in `src/lib/site-data.ts:10` is the right direction and should stay.
- GTM bootstrap in `src/app/layout.tsx:97-114` and delegated CTA click tracking in `:149-185` are a solid base; refine the event contract rather than replacing this wiring.
- LeadConnector chat centralization in `src/app/layout.tsx:187-192` is safe to leave as-is while the intake path is expanded.
- Page-level canonical/title/description blocks on `commercial/page.tsx`, `residential/page.tsx`, `heritage/page.tsx`, and `get-a-quote/page.tsx` are directionally correct; extend them instead of backing them out.
- The current header/footer CTA rewiring in `src/components/site-shell.tsx` is worth keeping; the next pass should improve the quote-route internals, not reopen the CTA ownership change.

## Review Notes

- This was a read-only audit of the current quote/GTM branch state at `c404b44`.
- Earlier critical gaps around external quote ownership and missing GTM are considered closed for this pass and are not repeated as open blockers here.
