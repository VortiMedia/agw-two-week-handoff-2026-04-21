# AGW Launch Blockers — Master Execution Document

**Prepared:** 2026-04-21  
**Branch reviewed:** `origin/agw-frontend-pass`  
**SHA reviewed:** `1bf969ea6bd68e8754dca038af58c70f32186f58`  
**Canonical app path:** `projects/agw/website-review-build/`

**Sources consolidated:**
- `content/agw/reports/codex-review-pass-01.md` (agw-codex-review SHA 5173367)
- `content/agw/reports/booking-analytics-rollout-plan.md` (agw-ops-plan SHA 0e98403)
- `content/agw/reports/performance-asset-plan.md`
- `content/agw/reports/seo-migration-plan-2026-04-21.md`
- `content/agw/agw-production-readiness-audit-2026-04-21.md`

---

## Current State in One Sentence

The build compiles and looks preview-ready, but it is a four-page static brochure: every primary CTA exits to the legacy WordPress quote page, GTM and GHL are absent from the codebase, above-fold images are 5–10 MB originals, and sub-pages broadcast incorrect canonicals pointing to the homepage.

---

## 1. Must Fix Before Next Preview

These block a credible stakeholder review. All are low-risk, isolated changes with no dependency on backend work.

### P1. Optimize above-fold LCP images
**Severity:** Critical for UX and preview credibility  
**Dependency:** None — isolated asset + prop changes

| Action | Current file | Target spec | Code location |
|---|---|---|---|
| Create OG image | `agw-selected/hero-room.jpg` (10 MB) | 1200 × 630 px, JPEG, ≤200 KB → save as `public/agw-og/home-og.jpg` | `layout.tsx:47,59` — update path and declared dimensions |
| Optimize residential LCP | `agw-curated/white-kitchen.jpg` (7.9 MB) | 2400 × 1600 px, JPEG q82, ≤400 KB | `residential/page.tsx:107` — one `src` prop |
| Optimize heritage LCP | `agw-curated/heritage-van.jpg` (4.8 MB) | 2400 × 1350 px, JPEG q82, ≤350 KB | `heritage/page.tsx:85` — one `src` prop |
| Optimize commercial LCP | `agw-curated/commercial-floor.jpg` (4.1 MB) | 2400 × 1600 px, JPEG q82, ≤350 KB | `commercial/page.tsx:90` and `page.tsx:335` — two `src` props |
| Add `priority` flag | `agw-curated/exterior-process.jpg` (9 MB, no flag) | One prop addition | `heritage/page.tsx:116` |

Note: `exterior-process.jpg` itself still needs a size reduction (Tier 2), but the `priority` flag fix is a one-liner that should land immediately.

### P2. Fix per-page metadata (canonical and title)
**Severity:** Critical — all three sub-pages self-report canonical as `"/"`  
**Dependency:** None

`/commercial`, `/residential`, and `/heritage` inherit root `layout.tsx` metadata with no page-level overrides. Each page needs an `export const metadata` block with a unique `title`, `description`, and `alternates.canonical`.

```tsx
// commercial/page.tsx
export const metadata: Metadata = {
  title: "Commercial Painting Contractor | A.G. Williams Painting",
  description: "Commercial interior and exterior painting, fireproofing, and floor coatings across Westchester, Fairfield, Rockland, and Putnam. Serving businesses since 1906.",
  alternates: { canonical: "/commercial" },
  openGraph: { title: "...", url: "/commercial" },
};
```

Repeat for `/residential` and `/heritage` with page-specific copy.

### P3. Fix JSON-LD scoping
**Severity:** High — Google sees `LocalBusiness` structured data on every page  
**Dependency:** None

`HOMEPAGE_JSON_LD` is declared in `layout.tsx` and fires on every route. Move the `<script type="application/ld+json">` block out of `layout.tsx` and into `app/page.tsx` only. Service pages that need schema declare it locally.

### P4. Lock typography to the brand system
**Severity:** Medium — affects brand consistency during review  
**Dependency:** None

`layout.tsx` loads only `Poppins-ExtraBold.ttf`. The body stack falls back to system fonts. `globals.css` references Playfair Display but it is not loaded locally. Load the correct weights (Playfair Display for display/headings, Poppins Regular and SemiBold for body/UI) and update `globals.css` to match. Ignore `design-system/MASTER.md` — it references Plus Jakarta Sans and Inter, which conflict with brand direction.

---

## 2. Must Fix Before Launch

These are blockers for production cutover. They include both backend wiring and structural SEO work. None of the items in this section can safely land in an undefined order — see Section 4 for sequencing.

### L1. Clone the production GHL calendar (GHL admin — no code)
**Severity:** Critical prerequisite for all booking work  
**Dependency:** Must complete before L3–L6

Create a cloned test calendar in GHL. All booking integration work (L3–L6) must test against the clone first. The production calendar URL (`INZqRCM9fdZwZ6avSiny`) must not be touched until the clone path is verified end-to-end.

### L2. Replace `QUOTE_URL` with internal route
**Severity:** Critical — currently every CTA exits the app  
**Dependency:** L3 (the `/get-a-quote` page) must be deployed before or simultaneously

**File:** `src/lib/site-data.ts:5`  
**Change:** `QUOTE_URL = "/get-a-quote"`  
**Risk:** Deploy the booking page (L5) before merging this constant change. If the page is missing, all CTAs hit a 404.

### L3. Add GTM to `layout.tsx`
**Severity:** Critical — no attribution data without this  
**Dependency:** None (GHL admin steps can follow)

**File:** `src/app/layout.tsx`  
Add standard GTM `<script>` snippet (container `GTM-W559QJ7C`) at the top of `<body>`. Add the `<noscript>` iframe fallback immediately after. Verify GTM Preview mode fires before wiring events (L6).

### L4. Add LeadConnector chat widget
**Severity:** High — current site has chat; removing it breaks continuity  
**Dependency:** L3 (GTM should be in place first)

**File:** `src/app/layout.tsx` — end of `<body>`, before closing tag  
Use `<Script strategy="afterInteractive">` with the LeadConnector loader and widget ID `699ca6733303b66fe5e9d99c`. Never load synchronously in `<head>`.

### L5. Build the booking route and components
**Severity:** Critical — the new site cannot own intake without this  
**Dependency:** L1 (cloned calendar), L2 (internal route must exist when QUOTE_URL changes)

Three new files:

| File | Purpose |
|---|---|
| `src/components/ghl-calendar-embed.tsx` | Renders GHL calendar `<iframe>` and `form_embed.js` script. Test against cloned calendar URL first. |
| `src/components/intake-form.tsx` | Controlled form: name, phone, email, project type, service county. On submit: push `intake_submitted` to `window.dataLayer`, then reveal `GhlCalendarEmbed`. |
| `src/app/get-a-quote/page.tsx` | Step 1: `IntakeForm`. Step 2: `GhlCalendarEmbed`. Canonical: `/get-a-quote`. |

Do not wrap the GHL calendar iframe in an HTML `<form>` element. Do not apply `overflow: hidden` or fixed height to the iframe wrapper.

### L6. Wire GTM dataLayer events
**Severity:** High — required for conversion measurement  
**Dependency:** L3 (GTM), L5 (intake form and calendar component)

Events required at launch:

| User action | dataLayer event | Where wired |
|---|---|---|
| Header / hero CTA click | `cta_click` | `site-shell.tsx`, `page.tsx` |
| Intake form submit | `intake_submitted` | `intake-form.tsx` |
| GHL calendar booking confirmed | `appointment_booked` | postMessage listener on `ghl-calendar-embed.tsx` |

Configure triggers and GA4 tags in GTM admin after the code events are live.

### L7. Deploy minimum redirect map
**Severity:** Critical for cutover — without this, 451 legacy URLs return 404  
**Dependency:** L5 (`/get-a-quote` must exist before redirecting `/get-a-quote/`)

Implement in `next.config.js` `redirects()`, not the Vercel dashboard. Minimum set before DNS cutover:

| From (legacy) | To (new) |
|---|---|
| `/home-services/` | `/residential` |
| `/commercial-services/` | `/commercial` |
| `/local-painting-property-improvement/` | `/residential` |
| `/about-us/` | `/about` |
| `/contact-us/` | `/contact` |
| `/get-a-quote/` | `/get-a-quote` |
| `/blog/` | `/blog` |
| `/privacy-policy-statement/` | `/privacy-policy` |
| `/terms-of-use-statement/` | `/terms` |
| `/about-us/testimonials/` | `/testimonials` |
| `/about-us/company-history/` | `/about#history` |
| `/portfolio-archive/` | `/portfolio` |

### L8. Build minimum core utility pages
**Severity:** High — legal, trust, and redirect targets  
**Dependency:** L7 (redirects point to these destinations)

Required at cutover: `/about`, `/contact`, `/privacy-policy`, `/terms`, `/accessibility`. These must exist before the redirect map goes live or the 301s land on missing pages.

### L9. Expand sitemap to cover all launch-day pages
**Severity:** High — new pages not in sitemap will not be indexed promptly  
**Dependency:** L8 (pages must exist before adding to sitemap)

Add every page that will be live at cutover to `src/app/sitemap.ts`. Convert to a dynamic function once the CMS is in place.

### L10. Tier 2 image optimization (active below-fold assets)
**Severity:** High for performance; does not block cutover but should land before GA traffic hits the new build  
**Dependency:** P1 (Tier 1 images should be done first)

| File | Current size | Target |
|---|---|---|
| `agw-curated/exterior-process.jpg` | 9 MB | 2400 × 1600 px, ≤350 KB |
| `agw-curated/residential-hero-room.jpg` | 10 MB | 2000 × 1334 px, ≤300 KB (confirm duplicate of `hero-room.jpg` before removing originals) |
| `agw-curated/residential-process.jpg` | 3.4 MB | 1800 × 1200 px, ≤250 KB |
| `agw-logo-lockup.png` | 152 KB, 4001 × 4000 px | 400 × 400 px, ≤20 KB PNG or SVG — QA on retina and non-retina before deploying |

### L11. Repo hygiene: remove checked-in build artifacts
**Severity:** Medium-High — slows builds, inflates deploy, creates diff noise  
**Dependency:** None

- Remove `projects/agw/website-review-build/node_modules/` (463 MB) from version control
- Remove `projects/agw/website-review-build/.next/` (76 MB)
- Freeze `projects/agw/live-site-reference/` — declare `website-review-build/` canonical and stop editing the reference snapshot
- Add both to `.gitignore` before the next commit

### L12. Configure intake-submitted GHL workflow (GHL admin — no code)
**Severity:** High — required for lead notification on intake-not-booked drop-off  
**Dependency:** L5 (intake form must exist), L6 (intake_submitted event must fire)

Create a separate GHL workflow triggered by the intake submission. This must be entirely independent of the existing appointment-booked automation. Do not modify the existing appointment-booked workflow.

---

## 3. Post-Launch Backlog

These are real requirements but do not block the production cutover. The delay clock starts at launch — prioritize Phase A and B quickly to limit organic traffic loss.

### Post-A: Service sub-pages — weeks 1–3
~17 pages: `/commercial/[service]` (5 pages) and `/residential/[service]` (9 pages), plus 301 redirects from all legacy `/commercial-services/…` and `/home-services/…` URLs. Add per-page metadata and `Service` schema. Highest commercial-intent content after the hub pages.

### Post-B: Town / local pages — weeks 2–6
35 town pages (e.g., `/armonk-ny`, `/greenwich-ct`) plus a hub redirect from `/local-painting-property-improvement/`. Add localized metadata, `LocalBusiness` + `Service` schema with geo, breadcrumb schema, and 301 redirects from all legacy town URLs. Requires URL scheme decision (see Open Decisions below). CMS-driven route strongly preferred over 35 static files.

### Post-C: Blog migration — weeks 4–12
Content audit first: classify all 356 posts into keep (~80–120), merge, or drop buckets using GA4 traffic data. Only then begin CMS migration. Dropped/merged posts get 301 redirects. Notable junk to noindex immediately: `/blog/2019/08/test-2/`, `/blog/2020/07/test-test-test/`, `/blog/2020/06/due-to-the-covid-19-outbreak-…/`.

### Post-D: About, portfolio, careers, client resources — weeks 4–8
`/about`, `/about/team`, `/testimonials`, `/careers`, `/careers/[role]`, `/portfolio`, `/portfolio/commercial`, legal pages already built at launch (L8). 301 redirects from `/about-us/…`, `/painting-clients/…`, `/portfolio-archive/…`.

### Post-E: Unused asset cleanup
Remove or archive: `agw-approved/hero-room.jpg` (10 MB duplicate), `agw-selected/service-residential.png` and `service-commercial.png` (11 MB each, unreferenced), all `agw-brand/pattern-*.png` (print-resolution PNGs in the web public directory), `agw-brand/presentation-3.jpg` and `presentation-4.jpg`. Verify no un-reviewed component references these before deletion.

### Post-F: Analytics enhancements
Facebook customer chat — confirm with client whether to preserve or drop before implementing. Hotjar or Microsoft Clarity — add after at least two weeks of post-launch data. GA4 funnel reports, audience segments, and conversion goals — configure once data exists.

### Post-G: CMS buildout
Stand up Sanity (if confirmed). Model content types: site settings, homepage, service pages, commercial/residential hubs, town pages, blog posts, testimonials, gallery, FAQ sets, promotions. Wire preview mode. This unlocks CMS-driven town pages (Post-B) and blog migration (Post-C).

### Post-H: Abandonment follow-up automation
Timed re-engagement sequence for leads who submit intake but do not book. Useful but not required at launch — the intake-submitted workflow (L12) handles the immediate notification.

---

## 4. Recommended Execution Order

Steps within each tier should run in the order listed. Tiers P and L can run in parallel across different developers where noted.

```
TIER P — Before next preview (no backend dependencies, can start immediately)
  P1  Image optimization — create optimized asset set (image editor work)
  P2  Per-page metadata — add export const metadata to commercial, residential, heritage
  P3  JSON-LD scoping — move HOMEPAGE_JSON_LD from layout.tsx to page.tsx
  P4  Typography — load Playfair Display + Poppins weights, update globals.css

TIER L — Before launch (must be sequenced as shown)
  L1  Clone GHL calendar                   [GHL admin, no code — unblock now]
  L11 Repo hygiene                          [remove node_modules/.next from git]
  L3  GTM bootstrap in layout.tsx
  L4  LeadConnector chat widget             [after L3]
  L5  Build /get-a-quote page + components  [test against L1 clone]
  L2  Replace QUOTE_URL → "/get-a-quote"    [deploy L5 first, then merge this]
  L6  Wire dataLayer events                 [after L3 and L5]
  L8  Build core utility pages              [/about, /contact, /privacy-policy, /terms, /accessibility]
  L7  Minimum redirect map                  [after L5 and L8 exist as targets]
  L9  Expand sitemap                        [after L8]
  L10 Tier 2 image optimization             [parallel with L3–L9]
  L12 Configure intake GHL workflow         [GHL admin — after L5 and L6 are verified]
```

---

## 5. Dependencies Map

```
L1 (GHL calendar clone)
  └─► L5 (booking route — test against clone)
        └─► L2 (replace QUOTE_URL — needs page to exist)
        └─► L6 (dataLayer events — need intake form)
              └─► L12 (GHL workflow — needs intake_submitted event)

L3 (GTM)
  └─► L4 (chat widget)
  └─► L6 (dataLayer events)

L5 + L8 (booking page + utility pages exist)
  └─► L7 (redirect map — 301 targets must exist)
        └─► L9 (sitemap — expand after all pages are in place)

P1 (Tier 1 images optimized)
  └─► L10 (Tier 2 images — do Tier 1 first, confirm paths before Tier 2)
```

**Critical constraint:** Do not merge the `QUOTE_URL` change (L2) before the `/get-a-quote` page is deployed (L5). Doing so will send all CTA clicks to a 404.

**Critical constraint:** Do not touch the production GHL calendar URL until the cloned calendar path is tested end-to-end. The existing appointment-booked automation must never be interrupted.

---

## 6. Open Decisions Required

These must be resolved before the dependent work can start.

| Decision | Needed by | Owner |
|---|---|---|
| Town URL scheme: `/[town-slug]` vs `/local/[town-slug]` | Before Post-B | David |
| Blog URL scheme: keep `/blog/YYYY/MM/slug` or flatten to `/blog/slug` | Before Post-C | David |
| CMS platform: Sanity confirmed? | Before Post-G (and Post-A/B content model design) | David |
| Which blog posts to keep vs. drop — requires GA4 traffic data | Before Post-C | David + SEO |
| Facebook customer chat: preserve, replace, or drop? | Before Post-F | David + client |
| GHL pattern for intake data: contact custom fields (Pattern A) vs calendar modal Forms tab (Pattern B) | Before L12 | David + operations |
