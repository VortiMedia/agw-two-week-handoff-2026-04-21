# AGW Release-Gate Status — 2026-04-21

**Document type:** Release-gate decision — single source of truth for merge and launch sequencing  
**Prepared:** 2026-04-21  
**Branch reviewed:** `agw-codex-impl`  
**SHA reviewed:** `c404b445479a9413545229202d685fce89146035`  
**Commit message:** AGW pass: quote route ownership and GTM  
**Canonical app path:** `projects/agw/website-review-build/`

**Source documents:**
- `content/agw/reports/codex-impl-pass-02-quote-and-gtm.md`
- `content/agw/reports/launch-blockers-master.md`
- `content/agw/reports/performance-asset-plan.md`
- `content/agw/reports/seo-migration-plan-2026-04-21.md`
- `content/agw/reports/preview-qa-checklist.md`
- `content/agw/reports/redirect-seed-map.md`

---

## Current Build State in One Sentence

GTM and quote-route ownership landed in this pass; all other launch blockers — image optimization, per-page SEO metadata, utility pages, redirect infrastructure, and the full intake booking flow — remain open.

---

## Safe to Merge Now

The following changes from `c404b44` are isolated, tested, and have no unsatisfied dependencies. They can merge to the integration branch immediately.

| Item | What was delivered | Source commit |
|---|---|---|
| **GTM bootstrap** | `GTM-W559QJ7C` script + `noscript` fallback added to `layout.tsx`; verified in build | c404b44 |
| **Internal quote route** | `/get-a-quote/page.tsx` bridge page; routes users from the new app to the existing GHL booking URL (`INZqRCM9fdZwZ6avSiny`) without breaking the production calendar | c404b44 |
| **`QUOTE_URL` → `/get-a-quote`** | `src/lib/site-data.ts` constant updated; safe because the bridge page exists in this same commit | c404b44 |
| **`tracked-link.tsx` component** | Shared CTA component for internal and external tracked links | c404b44 |
| **Delegated CTA event tracking** | `layout.tsx` listener pushes `cta_click` events from `data-cta-*` attributes to `window.dataLayer`; wired on all primary CTA surfaces | c404b44 |
| **`quote_route_view` event** | Fires on bridge page load for separate funnel measurement | c404b44 |
| **Centralized constants** | `GTM-W559QJ7C` and LeadConnector widget ID `699ca6733303b66fe5e9d99c` moved to `site-data.ts`; no hard-coded duplicates | c404b44 |

**Merge constraints for this set:**
- `QUOTE_URL` change and the `/get-a-quote` page must land together. They are in the same commit — do not cherry-pick one without the other.
- The bridge page routes to the **production GHL booking URL**. Do not change that URL without first confirming the GHL calendar clone (L1) is in place.

---

## Must Finish Before Preview

The following items block a credible stakeholder review. None require backend work. All are isolated, low-risk changes with no interdependencies — they can be worked in parallel.

### P1 — Above-fold image optimization

**Severity:** Critical — current LCP assets are 5–10 MB originals on every page above the fold.

| Action | Current file | Target spec | Code location |
|---|---|---|---|
| Create OG image | `agw-selected/hero-room.jpg` (10 MB, 5616 × 3744) | 1200 × 630 px, JPEG, ≤200 KB → `public/agw-og/home-og.jpg` | `layout.tsx:47,59` — update path and declared dimensions |
| Optimize residential LCP | `agw-curated/white-kitchen.jpg` (7.9 MB) | 2400 × 1600 px, JPEG q82, ≤400 KB | `residential/page.tsx:107` — one `src` prop |
| Optimize heritage primary LCP | `agw-curated/heritage-van.jpg` (4.8 MB) | 2400 × 1350 px, JPEG q82, ≤350 KB | `heritage/page.tsx:85` — one `src` prop |
| Optimize commercial LCP | `agw-curated/commercial-floor.jpg` (4.1 MB) | 2400 × 1600 px, JPEG q82, ≤350 KB | `commercial/page.tsx:90` and `page.tsx:335` — two `src` props |
| Add `priority` flag | `agw-curated/exterior-process.jpg` (9 MB, no `priority`) | One prop addition; size reduction deferred to L10 | `heritage/page.tsx:116` |

### P2 — Per-page metadata

**Severity:** Critical — all three sub-pages currently self-report `canonical: "/"` and display the homepage title. Google sees three thin duplicate pages.

Each of `commercial/page.tsx`, `residential/page.tsx`, and `heritage/page.tsx` needs:

```tsx
export const metadata: Metadata = {
  title: "<Page-specific title> | A.G. Williams Painting",
  description: "<Page-specific description>",
  alternates: { canonical: "/<route>" },
  openGraph: { title: "...", url: "/<route>", image: "...", description: "..." },
};
```

### P3 — JSON-LD scoping

**Severity:** High — `HOMEPAGE_JSON_LD` is rendered in `layout.tsx` and fires on every page. Move the `<script type="application/ld+json">` block from `layout.tsx` into `app/page.tsx` only.

### P4 — Typography

**Severity:** Medium — `layout.tsx` loads only `Poppins-ExtraBold.ttf`. The body stack falls back to system fonts; Playfair Display is referenced in `globals.css` but not loaded. Load Playfair Display (display/headings) and Poppins Regular + SemiBold (body/UI); update `globals.css` accordingly. Disregard `design-system/MASTER.md` — it references Plus Jakarta Sans and Inter, which conflict with brand direction.

---

## Must Finish Before Launch

All items below are required before DNS cutover. They are sequenced by dependency — earlier items unblock later ones.

### Sequenced Execution Order

```
[GHL admin — start immediately, no code dependency]
L1   Clone production GHL calendar (INZqRCM9fdZwZ6avSiny)
     → All booking integration work tests against the clone first
     → Production calendar must not be touched until clone path verified

[Code — can start in parallel with L1]
L11  Repo hygiene
     → Remove projects/agw/website-review-build/node_modules/ (463 MB) from git
     → Remove projects/agw/website-review-build/.next/ (76 MB) from git
     → Add both to .gitignore

L4   LeadConnector chat widget
     → Depends on: L3 (GTM) — DONE in c404b44
     → Add <Script strategy="afterInteractive"> with widget ID 699ca6733303b66fe5e9d99c
       to layout.tsx end of <body>; never load synchronously in <head>

L5   Complete /get-a-quote booking flow
     → Depends on: L1 (test against cloned calendar URL, not production)
     → Bridge page from c404b44 is an acceptable interim for preview
     → Full launch requires: IntakeForm component (name, phone, email, project type,
       service county), GhlCalendarEmbed component (iframe + form_embed.js),
       and the page wired as Step 1 → Step 2
     → Do NOT wrap GHL iframe in an HTML <form>; do NOT apply overflow: hidden
       or fixed height to the iframe wrapper

L6   Complete dataLayer wiring
     → Depends on: L3 (DONE), L5 (intake form must exist)
     → c404b44 covers cta_click on all CTA surfaces
     → Still needed: intake_submitted (in IntakeForm on submit) and
       appointment_booked (postMessage listener on GhlCalendarEmbed)

L8   Build core utility pages
     → Required before L7 (redirects must resolve to real pages)
     → Required pages: /about, /contact, /privacy-policy, /terms, /accessibility
     → /about and /contact are also primary trust and lead-capture destinations

L7   Deploy minimum redirect map
     → Depends on: L5 (/get-a-quote exists), L8 (utility pages exist as 301 targets)
     → Implement in next.config.js redirects() — not the Vercel dashboard
     → P1 redirects (92 entries): commercial hub, residential hub, service sub-pages
       (interim → hub), all 35 town pages (interim → /residential), utility dead-ends,
       specials/promotions, about pages (interim → /), blog hub (interim → /)
     → P2 redirects (6 entries): /about-us/, /contact-us/, /get-a-quote/,
       /privacy-policy-statement/, /terms-of-use-statement/, /accessibility/
     → Full seed map: content/agw/reports/redirect-seed-map.md

L9   Expand sitemap
     → Depends on: L8 (all launch-day pages must exist before adding to sitemap)
     → Add every page live at cutover to src/app/sitemap.ts
     → Add a comment flagging that this must be converted to dynamic generation
       once the CMS is in place

L10  Tier 2 image optimization (active below-fold assets)
     → Depends on: P1 (Tier 1 done first; confirm paths before Tier 2)
     → exterior-process.jpg: 9 MB → 2400 × 1600 px, ≤350 KB
     → residential-hero-room.jpg: 10 MB → 2000 × 1334 px, ≤300 KB
       (confirm it is a true duplicate of hero-room.jpg before removing originals)
     → residential-process.jpg: 3.4 MB → 1800 × 1200 px, ≤250 KB
     → agw-logo-lockup.png: 152 KB, 4001 × 4000 px → 400 × 400 px, ≤20 KB or SVG
       (QA on retina and non-retina before deploying)

[GHL admin — after L5 and L6 are verified in staging]
L12  Configure intake-submitted GHL workflow
     → Triggered by intake_submitted event from IntakeForm
     → Must be a new, independent workflow — do not modify the existing
       appointment-booked automation
```

### Dependency Map

```
L1 (GHL calendar clone)
  └─► L5 (complete booking route — test against clone)
        └─► L6 (intake_submitted + appointment_booked events)
              └─► L12 (GHL intake workflow — GHL admin)

GTM / L3 (DONE in c404b44)
  └─► L4 (chat widget)
  └─► L6 (dataLayer events)

L5 + L8 (booking page + utility pages exist)
  └─► L7 (redirect map — 301 targets must exist before deploying redirects)
        └─► L9 (sitemap — expand after all pages are confirmed live)

P1 (Tier 1 images done)
  └─► L10 (Tier 2 images — confirm paths before Tier 2 replacements)
```

**Critical constraint:** Do not change the production GHL calendar URL (`INZqRCM9fdZwZ6avSiny`) until the clone path is tested end-to-end. The existing appointment-booked automation must not be interrupted.

---

## Recommended Merge Order

| Order | Branch / work unit | Depends on | Safe to start |
|---|---|---|---|
| 1 | `agw-codex-impl` (c404b44) — GTM + quote route + CTA tracking | Nothing | **Now** |
| 2 | P1 image optimization | Nothing | **Now** (parallel) |
| 3 | P2 per-page metadata | Nothing | **Now** (parallel) |
| 4 | P3 JSON-LD scoping | Nothing | **Now** (parallel) |
| 5 | P4 typography | Nothing | **Now** (parallel) |
| 6 | L11 repo hygiene | Nothing | **Now** (parallel) |
| 7 | L1 GHL calendar clone | Nothing (GHL admin) | **Now** (parallel) |
| 8 | L4 LeadConnector widget | L3 ✓ (done) | After step 1 merges |
| 9 | L5 complete booking flow | L1 | After L1 |
| 10 | L6 complete dataLayer events | L3 ✓, L5 | After step 9 |
| 11 | L8 utility pages | Nothing | Can start now |
| 12 | L7 redirect map | L5, L8 | After steps 9, 11 |
| 13 | L9 sitemap | L8 | After step 11 |
| 14 | L10 Tier 2 image optimization | P1 | After step 2 |
| 15 | L12 GHL intake workflow | L5, L6 verified | After steps 9, 10 |

---

## Post-Launch Backlog (Not Launch-Blocking)

| Phase | Scope | Starts |
|---|---|---|
| Post-A | Service sub-pages: 5 `/commercial/[service]` + 9 `/residential/[service]` pages, 301 redirects updated from hub to sub-page, per-page metadata, Service schema | Weeks 1–3 |
| Post-B | 35 town pages (`/[town-slug]`), localized metadata, LocalBusiness + Service schema with geo, breadcrumb schema, 301 redirects updated from hub | Weeks 2–6 |
| Post-C | Blog migration: GA4-driven content audit first, then CMS migration of ~80–120 kept posts, dynamic sitemap, Article schema | Weeks 4–12 |
| Post-D | /about, /about/team, /testimonials, /careers, /portfolio, /clients, phase-D redirects | Weeks 4–8 |
| Post-E | Unused asset cleanup (agw-approved/, unreferenced brand PNGs) | After launch |
| Post-F | Analytics enhancements (Hotjar/Clarity, GA4 funnel setup) | After 2 weeks of post-launch data |
| Post-G | CMS buildout (Sanity) — required for Post-B town pages and Post-C blog | Decision needed now |

---

## Open Decisions Required

These must be resolved before the dependent phase can start. None block the current merge or preview.

| Decision | Owner | Blocks |
|---|---|---|
| Town URL scheme: `/[town-slug]` vs `/local/[town-slug]` | David | Post-B page builds and permanent redirect destinations |
| Blog URL scheme: keep `/blog/YYYY/MM/slug` or flatten to `/blog/slug` | David | Post-C redirect strategy |
| CMS platform: Sanity confirmed? | David | Post-B and Post-C content model design |
| Which blog posts to keep vs. drop — requires GA4 traffic data | David + SEO | Post-C audit |
| `/get-a-quote/` permanent destination: GHL embed, contact form, or custom booking | David | L5 full build spec and L7 P2 redirect destination |
| `/pay-my-bill-online/` — GHL payment link URL | David | L7 P1 redirect destination |
| Facebook customer chat: preserve, replace, or drop? | David + client | Post-F scope |
| GHL intake data pattern: contact custom fields vs. calendar modal Forms tab | David + operations | L12 GHL workflow design |

---

## Final Go / No-Go Criteria

### Preview go/no-go

All four conditions must be met before sharing a preview URL with the client:

- [ ] **P1** — All five Tier 1 image changes complete: OG image ≤200 KB, residential/heritage/commercial LCP assets ≤400 KB each, `priority` flag added to `exterior-process.jpg`
- [ ] **P2** — Unique `export const metadata` with correct `canonical` present on `/commercial`, `/residential`, and `/heritage`
- [ ] **P3** — `HOMEPAGE_JSON_LD` removed from `layout.tsx`; present only in `app/page.tsx`
- [ ] **GTM** — GTM preview mode confirms container `GTM-W559QJ7C` fires on all four pages (verified via c404b44)

P4 (typography) and the LeadConnector widget (L4) are high-value but do not block preview approval.

### Launch go/no-go

All twelve conditions must be confirmed before DNS cutover:

- [ ] L1 — GHL calendar clone verified end-to-end in staging; production calendar untouched
- [ ] L4 — LeadConnector widget loads on all pages; widget ID `699ca6733303b66fe5e9d99c` confirmed in rendered HTML
- [ ] L5 — `/get-a-quote` page delivers full intake flow (IntakeForm → GhlCalendarEmbed); tested against cloned calendar
- [ ] L6 — All three dataLayer events confirmed in GTM preview: `cta_click`, `intake_submitted`, `appointment_booked`
- [ ] L7 — All 92 P1 redirects return HTTP 301; no redirect chains longer than one hop; all 6 P2 redirect destinations return HTTP 200
- [ ] L8 — `/about`, `/contact`, `/privacy-policy`, `/terms`, `/accessibility` all return HTTP 200
- [ ] L9 — `sitemap.xml` includes all live pages at cutover (minimum: 4 existing + 6 utility pages)
- [ ] L10 — Tier 2 below-fold images optimized; no image in the active page set exceeds 1 MB
- [ ] L11 — `node_modules/` and `.next/` removed from git history; `.gitignore` updated
- [ ] L12 — GHL intake-submitted workflow active and tested in staging; independent of appointment-booked workflow
- [ ] P1 — All Tier 1 image optimizations confirmed (prerequisite for preview, reconfirm at launch)
- [ ] P2 / P3 — Per-page metadata and JSON-LD scoping confirmed (prerequisite for preview, reconfirm at launch)

**Hard blocker:** Do not issue a DNS cutover instruction until every item above is checked. A single unchecked item — particularly L7 (redirect map) or L8 (utility pages) — will cause immediate, measurable traffic loss from the 455-URL legacy surface.
