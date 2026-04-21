# AGW Execution Board

**Compiled:** 2026-04-21  
**Branch reviewed:** `agw-performance-asset-plan` → `agw-exec-board`  
**SHA at time of compilation:** `553985dc5f6c7238a8392e7bf745a5153f041b51`  
**Sources consolidated:** codex-review-pass-01, booking-analytics-rollout-plan, codex-impl-pass-02-quote-and-gtm, performance-asset-plan, seo-migration-plan-2026-04-21, launch-blockers-master, redirect-seed-map, preview-qa-checklist

---

## Done

| Item | Branch / Commit | Notes |
|---|---|---|
| LeadConnector chat widget live | `agw-frontend-pass` | Widget ID `699ca6733303b66fe5e9d99c`, `strategy="lazyOnload"` |
| GTM bootstrap in `layout.tsx` | `agw-codex-impl` | Container `GTM-W559QJ7C`; `noscript` fallback included |
| Internal `/get-a-quote` route | `agw-codex-impl` | Bridge page owns first quote step; hands off to GHL calendar |
| `QUOTE_URL` → internal route | `agw-codex-impl` | All CTAs (`SHELL_ACTIONS`, heroes, service bands) repointed |
| `TrackedLink` + dataLayer events | `agw-codex-impl` | CTA click events wired on nav, footer, hero, service bands |
| `quote_route_view` event on load | `agw-codex-impl` | Bridge page measurable separately from marketing pages |
| Font, logo, GHL widget, SEO pass | `agw-frontend-pass` | Per commit message: production-readiness fixes pass |
| Homepage hero image acceptable | `performance-asset-plan` | `home-exterior-fairfield.jpg` at 228 KB — no action needed |

---

## Next

Items below can start immediately. No backend dependencies. Assign one owner per row.

### Tier P — Before next stakeholder preview

| # | Action | File / Location | Owner | Dep |
|---|---|---|---|---|
| P1 | Create OG image: export `hero-room.jpg` → `agw-og/home-og.jpg`, 1200 × 630 px, JPEG ≤200 KB; update path + declared dimensions in `layout.tsx:47,59` | `agw-selected/hero-room.jpg` | Image editor | None |
| P2 | Optimize residential LCP: `white-kitchen.jpg` → 2400 × 1600 px, JPEG q82, ≤400 KB; update `residential/page.tsx:107` | `agw-curated/white-kitchen.jpg` | Image editor | None |
| P3 | Optimize heritage LCP: `heritage-van.jpg` → 2400 × 1350 px, JPEG q82, ≤350 KB; update `heritage/page.tsx:85` | `agw-curated/heritage-van.jpg` | Image editor | None |
| P4 | Optimize commercial LCP: `commercial-floor.jpg` → 2400 × 1600 px, JPEG q82, ≤350 KB; update `commercial/page.tsx:90` and `page.tsx:335` | `agw-curated/commercial-floor.jpg` | Image editor | None |
| P5 | Add `priority` prop to `exterior-process.jpg` in heritage hero grid | `heritage/page.tsx:116` — one prop addition | Dev | None |
| P6 | Add per-page `export const metadata` blocks to commercial, residential, heritage — unique `title`, `description`, `alternates.canonical` | `commercial/page.tsx`, `residential/page.tsx`, `heritage/page.tsx` | Dev | None |
| P7 | Move `HOMEPAGE_JSON_LD` `<script>` block from `layout.tsx` to `app/page.tsx` only | `layout.tsx` → `page.tsx` | Dev | None |
| P8 | Load Playfair Display + Poppins (Regular + SemiBold) weights; update `globals.css` to match | `layout.tsx`, `globals.css` | Dev | None |

### Tier L — Before production cutover (sequenced)

| # | Action | Owner | Dep |
|---|---|---|---|
| L1 | Clone production GHL calendar in GHL admin; all booking integration tests run against clone — never touch `INZqRCM9fdZwZ6avSiny` directly until end-to-end verified | David (GHL admin) | None — start now |
| L2 | Remove `node_modules/` (463 MB) and `.next/` (76 MB) from version control; add both to `.gitignore` | Dev | None — start now |
| L3 | Build `/get-a-quote` page with real intake form (`IntakeForm`: name, phone, email, project type, county) + `GhlCalendarEmbed` iframe; test against L1 clone; do not wrap iframe in an HTML `<form>` | Dev | L1 |
| L4 | Wire `intake_submitted` dataLayer push on intake form submission; test in GTM Preview mode | Dev | L3 |
| L5 | Build core utility pages: `/about`, `/contact`, `/privacy-policy`, `/terms`, `/accessibility` — minimum viable content; these are 301 targets, not just stubs | Dev | None |
| L6 | Implement P1 redirect map in `next.config.js` `redirects()` — 92 P1 redirects (hub, service sub-pages, towns, utility, specials, about, blog hub); keep in version control, not Vercel dashboard | Dev | L5 (targets must exist) |
| L7 | Expand `sitemap.ts` to include all launch-day pages (4 current + 6 utility + any Phase A pages) | Dev | L5 |
| L8 | Create intake-submitted GHL workflow (independent of existing appointment-booked automation — do not modify existing workflow) | David (GHL admin) | L4 verified |
| L9 | Tier 2 image optimization: `exterior-process.jpg` (9 MB → ≤350 KB), `residential-hero-room.jpg` (10 MB → ≤300 KB, confirm it's a true duplicate of `hero-room.jpg` before removing originals), `residential-process.jpg` (3.4 MB → ≤250 KB), `agw-logo-lockup.png` (4001 px → 400 px, QA on retina) | Image editor | P1–P4 done first |

---

## Later

Post-launch backlog in priority order. None of these block cutover.

| Phase | Scope | Rough timing |
|---|---|---|
| **A — Service sub-pages** | 14 pages: `/commercial/[service]` (5) + `/residential/[service]` (9); per-page metadata + `Service` schema; update P1 interim redirects to point to new URLs | Weeks 1–3 post-launch |
| **B — Town pages** | 35 local pages (e.g., `/armonk-ny`, `/greenwich-ct`); localized metadata, `LocalBusiness` + `Service` schema; 301s from all legacy `/local-painting-property-improvement/…` URLs; CMS-driven route preferred | Weeks 2–6 post-launch |
| **C — Blog migration** | GA4 content audit first (keep ~80–120 of 356 posts); then CMS migration for keepers; 301s for drops/merges; immediate 301 → `/` for 5 known test/junk posts | Weeks 4–12 post-launch |
| **D — About, portfolio, careers, client resources** | `/about`, `/about/team`, `/testimonials`, `/careers`, `/portfolio`, legal pages (already at L5); 301s from legacy paths | Weeks 4–8 post-launch |
| **E — Unused asset cleanup** | Remove `agw-approved/hero-room.jpg` (10 MB duplicate), `service-residential.png` + `service-commercial.png` (11 MB each), all `agw-brand/pattern-*.png`, `agw-brand/presentation-*.jpg` — verify no un-reviewed component references them first | Post-launch, after content audit |
| **F — Analytics enhancements** | Facebook chat (confirm with client: preserve or drop), Hotjar or Clarity (add after 2 weeks of data), GA4 funnel reports and conversion goals | 2+ weeks post-launch |
| **G — CMS buildout** | Sanity (if confirmed): model site settings, service pages, town pages, blog, testimonials, gallery, FAQ, promotions; wire preview mode; unlocks Phase B + C | Parallel to Phase A–B |
| **H — Abandonment follow-up** | Timed re-engagement sequence for intake-not-booked leads (beyond L8 immediate notification) | After 30 days of intake data |

---

## Open Decisions

These are blocking or will create rework if decided after work begins. Owner is David unless noted.

| Decision | Blocking | Priority |
|---|---|---|
| `/get-a-quote/` permanent destination — GHL embed, custom intake form, or booking URL? Interim bridge exists; permanent UX needs a call | L3 final UX, Phase A sub-page CTAs | **Now** |
| `/pay-my-bill-online/` GHL payment link URL — needed to complete P1 redirect map | L6 (one P1 redirect is incomplete without this) | **Before L6** |
| Town URL scheme: `/[town-slug]` or `/local/[town-slug]`? — cannot build Phase B pages or finalize permanent redirect targets without this | Phase B, permanent town redirect destinations | Before Phase B |
| Blog URL scheme: keep `/blog/YYYY/MM/slug` or flatten to `/blog/slug`? — affects Phase C redirect strategy | Phase C | Before Phase C |
| CMS platform: Sanity confirmed? — affects content model design for service pages (Phase A) and town pages (Phase B) | Phase G and Phase A/B structure | Before Phase A begins |
| Which blog posts to keep vs. drop — requires GA4 data pull from live site before cutover | Phase C | Before Phase C |
| Facebook customer chat: preserve, replace, or drop? | Post-F | Before Post-F |
| GHL intake data pattern: contact custom fields (Pattern A) vs. calendar modal Forms tab (Pattern B) — must decide before L8 workflow is built | L8 GHL workflow | Before L8 |

---

## Dependencies at a Glance

```
L1 (clone GHL calendar)
  └─► L3 (intake form + calendar embed — test against clone)
        └─► L4 (intake_submitted dataLayer event)
              └─► L8 (GHL intake workflow — after event verified)

L5 (utility pages built)
  └─► L6 (redirect map — 301 targets must exist)
        └─► L7 (sitemap — expand after all pages live)

Tier P images (P1–P4)
  └─► L9 (Tier 2 images — do Tier 1 first, confirm paths)

Critical constraint: do not merge the QUOTE_URL change without the /get-a-quote page deployed.
Critical constraint: do not touch production GHL calendar URL until clone path is verified end-to-end.
```
