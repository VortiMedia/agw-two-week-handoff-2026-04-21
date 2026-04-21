# AGW Redirect Seed Map — Pre-Cutover Minimum Set

**Prepared:** 2026-04-21  
**Reviewed branch:** `origin/agw-frontend-pass`  
**Starting SHA:** `1bf969ea6bd68e8754dca038af58c70f32186f58`  
**Commit message:** Frontend production-readiness pass: font, logo, GHL widget, SEO fixes  

**Source inputs:**
- `content/agw/reports/seo-migration-plan-2026-04-21.md`
- `projects/agw/website-review-build/migration-url-inventory.txt` (455 URLs)
- `projects/agw/website-review-build/src/app/sitemap.ts`
- App routes under `projects/agw/website-review-build/src/app/`

---

## Current Live Routes (4 pages)

| Route | Exists |
|---|---|
| `/` | Yes |
| `/commercial` | Yes |
| `/residential` | Yes |
| `/heritage` | Yes |

**No redirect infrastructure exists.** `next.config.js` has no `redirects()` array. Every legacy URL not in this set returns 404 at cutover.

---

## Redirect Priority Key

| Priority | Meaning |
|---|---|
| **P1** | Deploy at or before DNS cutover — these are blockers |
| **P2** | Target page must also be built; redirect should deploy with the page |
| **P3** | Low organic risk; redirect to nearest hub to prevent 404 |
| **P4** | Defer to post-launch content audit (blog batch) |

---

## P1 — Deploy Before Cutover (Destination Already Exists)

These redirects point to existing live routes. No new pages required. Implement in `next.config.js` `redirects()` immediately.

### Commercial hub and entry points

| Old URL | New URL | Notes |
|---|---|---|
| `/commercial-services/` | `/commercial` | Primary hub redirect; high link equity |
| `/insured-commercial-painting-contractor/` | `/commercial` | Likely linked from off-site directories |

### Residential hub and entry points

| Old URL | New URL | Notes |
|---|---|---|
| `/home-services/` | `/residential` | Primary hub redirect; high link equity |
| `/financing-residential-projects/` | `/residential` | Redirect until `/residential#financing` anchor exists |
| `/residential-painting-warranty/` | `/residential` | Redirect until `/residential#warranty` anchor exists |
| `/painting-clients/` | `/residential` | Client resource hub → nearest service hub |
| `/painting-clients/residential-interior-painting-checklist/` | `/residential` | Checklist content not yet built |
| `/painting-clients/residential-exterior-painting-checklist/` | `/residential` | Checklist content not yet built |
| `/painting-clients/residential-power-washing-checklist/` | `/residential` | Checklist content not yet built |
| `/painting-clients/residential-concrete-floor-coatings-checklist/` | `/residential` | Checklist content not yet built |
| `/painting-clients/residential-concrete-floor-coatings-post-care/` | `/residential` | Checklist content not yet built |

### Commercial service sub-pages (interim → hub)

Destinations (`/commercial/[service]`) do not exist yet. Redirect to hub now; update to sub-page URLs in Phase A.

| Old URL | New URL | Notes |
|---|---|---|
| `/commercial-services/commercial-interior-painting/` | `/commercial` | Update to `/commercial/interior-painting` in Phase A |
| `/commercial-services/commercial-exterior-painting/` | `/commercial` | Update to `/commercial/exterior-painting` in Phase A |
| `/commercial-services/commercial-floor-coatings/` | `/commercial` | Update to `/commercial/floor-coatings` in Phase A |
| `/commercial-services/industrial-floor-coatings/` | `/commercial` | Update to `/commercial/industrial-floor-coatings` in Phase A |
| `/commercial-services/commercial-power-washing/` | `/commercial` | Update to `/commercial/power-washing` in Phase A |

### Residential service sub-pages (interim → hub)

Destinations (`/residential/[service]`) do not exist yet. Redirect to hub now; update to sub-page URLs in Phase A.

| Old URL | New URL | Notes |
|---|---|---|
| `/home-services/home-interior-painting/` | `/residential` | Update to `/residential/interior-painting` in Phase A |
| `/home-services/home-exterior-painting/` | `/residential` | Update to `/residential/exterior-painting` in Phase A |
| `/home-services/home-cabinet-refinishing/` | `/residential` | Update to `/residential/cabinet-refinishing` in Phase A |
| `/home-services/home-wallpaper-installation/` | `/residential` | Update to `/residential/wallpaper` in Phase A |
| `/home-services/home-power-washing/` | `/residential` | Update to `/residential/power-washing` in Phase A |
| `/home-services/home-concrete-floor-coatings/` | `/residential` | Update to `/residential/floor-coatings` in Phase A |
| `/home-services/home-decorative-custom/` | `/residential` | Update to `/residential/decorative-custom` in Phase A |
| `/home-services/home-painter-4a-day/` | `/residential` | Update to `/residential/painter-for-a-day` in Phase A |
| `/home-services/concrete-coating-color-options/` | `/residential` | Color options content → parent service page |

### Town / local pages (interim → residential hub)

All 35 town pages currently redirect to `/residential` as a holding target. The permanent destination is `/[town-slug]` once Phase B pages are built. The URL scheme (`/[town-slug]` vs `/local/[town-slug]`) must be decided before Phase B — **open decision, owner: David.**

| Old URL | New URL | Notes |
|---|---|---|
| `/local-painting-property-improvement/` | `/residential` | Local hub → residential hub |
| `/local-painting-property-improvement/residential-painter-armonk-ny/` | `/residential` | Phase B target: `/armonk-ny` |
| `/local-painting-property-improvement/residential-painter-ardsley-ny/` | `/residential` | Phase B target: `/ardsley-ny` |
| `/local-painting-property-improvement/residential-painter-banksville-ny/` | `/residential` | Phase B target: `/banksville-ny` |
| `/local-painting-property-improvement/residential-painter-bedford-ny/` | `/residential` | Phase B target: `/bedford-ny` |
| `/local-painting-property-improvement/residential-painter-briarcliff-manor/` | `/residential` | Phase B target: `/briarcliff-manor-ny` |
| `/local-painting-property-improvement/residential-painter-bronxville-ny/` | `/residential` | Phase B target: `/bronxville-ny` |
| `/local-painting-property-improvement/residential-painter-chappaqua/` | `/residential` | Phase B target: `/chappaqua-ny` |
| `/local-painting-property-improvement/residential-painter-in-coscob-ct/` | `/residential` | Phase B target: `/coscob-ct` |
| `/local-painting-property-improvement/residential-painter-in-darien-ct/` | `/residential` | Phase B target: `/darien-ct` |
| `/local-painting-property-improvement/residential-painter-dobbs-ferry/` | `/residential` | Phase B target: `/dobbs-ferry-ny` |
| `/local-painting-property-improvement/residential-painter-eastchester-ny/` | `/residential` | Phase B target: `/eastchester-ny` |
| `/local-painting-property-improvement/residential-painter-in-greenwich-ct/` | `/residential` | Phase B target: `/greenwich-ct` — high value |
| `/local-painting-property-improvement/residential-painter-harrison-ny/` | `/residential` | Phase B target: `/harrison-ny` |
| `/local-painting-property-improvement/residential-painter-hartsdale-ny/` | `/residential` | Phase B target: `/hartsdale-ny` |
| `/local-painting-property-improvement/residential-painter-hastings-on-hudson/` | `/residential` | Phase B target: `/hastings-on-hudson-ny` |
| `/local-painting-property-improvement/residential-painter-hawthorne-ny/` | `/residential` | Phase B target: `/hawthorne-ny` |
| `/local-painting-property-improvement/residential-painter-irvington-ny/` | `/residential` | Phase B target: `/irvington-ny` |
| `/local-painting-property-improvement/residential-painter-larchmont-ny/` | `/residential` | Phase B target: `/larchmont-ny` |
| `/local-painting-property-improvement/residential-painter-in-mamaroneck/` | `/residential` | Phase B target: `/mamaroneck-ny` |
| `/local-painting-property-improvement/residential-painter-mt-pleasant/` | `/residential` | Phase B target: `/mount-pleasant-ny` |
| `/local-painting-property-improvement/residential-painter-in-mt-vernon/` | `/residential` | Phase B target: `/mount-vernon-ny` |
| `/local-painting-property-improvement/residential-painter-in-new-canaan/` | `/residential` | Phase B target: `/new-canaan-ct` |
| `/local-painting-property-improvement/residential-painter-new-rochelle/` | `/residential` | Phase B target: `/new-rochelle-ny` |
| `/local-painting-property-improvement/residential-painter-in-oldgreenwich-ct/` | `/residential` | Phase B target: `/old-greenwich-ct` |
| `/local-painting-property-improvement/residential-painter-pleasantville/` | `/residential` | Phase B target: `/pleasantville-ny` |
| `/local-painting-property-improvement/residential-painter-pound-ridge/` | `/residential` | Phase B target: `/pound-ridge-ny` |
| `/local-painting-property-improvement/residential-painter-in-riverside-ct/` | `/residential` | Phase B target: `/riverside-ct` |
| `/local-painting-property-improvement/residential-painter-rye-brook-ny/` | `/residential` | Phase B target: `/rye-brook-ny` |
| `/local-painting-property-improvement/residential-painter-in-rye-ny/` | `/residential` | Phase B target: `/rye-ny` |
| `/local-painting-property-improvement/residential-painter-scarsdale-ny/` | `/residential` | Phase B target: `/scarsdale-ny` |
| `/local-painting-property-improvement/residential-painter-in-stamford-ct/` | `/residential` | Phase B target: `/stamford-ct` |
| `/local-painting-property-improvement/residential-painter-thornwood-ny/` | `/residential` | Phase B target: `/thornwood-ny` |
| `/local-painting-property-improvement/residential-painter-tuckahoe-ny/` | `/residential` | Phase B target: `/tuckahoe-ny` |
| `/local-painting-property-improvement/residential-painter-valhalla-ny/` | `/residential` | Phase B target: `/valhalla-ny` |
| `/local-painting-property-improvement/residential-painter-white-plains/` | `/residential` | Phase B target: `/white-plains-ny` — high value |

### Utility / conversion dead-ends

| Old URL | New URL | Notes |
|---|---|---|
| `/thank-you-landing/` | `/` | No conversion tracking page planned pre-launch |
| `/contact-us/thank-you-from-contact-form/` | `/` | Will update to `/thank-you` once that page exists |
| `/bill-pay-confirmation/` | `/` | Confirmation state; redirect to home |
| `/pay-my-bill-online/` | `/` | Update to GHL payment link once David confirms URL |

### Specials and promotions (all low SEO value)

| Old URL | New URL | Notes |
|---|---|---|
| `/specials/` | `/` | No promotions hub planned pre-launch |
| `/specials/neighborhood-specials/` | `/` | |
| `/specials/welcome-wagon-specials/` | `/` | |
| `/specials/video-specials/` | `/` | |
| `/specials/jobsite-mailer-specials/` | `/` | |
| `/specials/email-blast-specials/` | `/` | |
| `/specials/direct-mail-specials/` | `/` | |
| `/specials/direct-advantage-specials/` | `/` | |
| `/specials/clipper-specials/` | `/` | |
| `/specials/bcw-specials/` | `/` | |
| `/specials/fumns-specials/` | `/` | |
| `/specials/facebook-concrete-floor-coatings/` | `/residential` | Has a service intent signal; send to residential |
| `/specials/armonk-art-show-2025/` | `/` | Event-specific; noindex or redirect |
| `/specials/room-makeover-raffle/` | `/` | Event-specific; noindex or redirect |
| `/williams_wagon/` | `/` | |
| `/customer_referral_rewards_program/` | `/` | |
| `/events-get-in-touch/` | `/` | Will update to `/contact` once that page exists |

### About / company (interim → home)

These pages need to be built eventually (Phase D), but for cutover they must not 404. The temporary target is `/` until the destination pages exist.

| Old URL | New URL | Notes |
|---|---|---|
| `/about-us/` | `/` | Build `/about` in Phase D; update redirect then |
| `/about-us/company-history/` | `/` | Build `/about#history` in Phase D |
| `/about-us/meet-the-team-painting-experts/` | `/` | Build `/about#team` in Phase D |
| `/about-us/testimonials/` | `/` | Build `/testimonials` in Phase D |
| `/about-us/news-and-press/` | `/` | Build `/blog` in Phase C |
| `/about-us/careers/` | `/` | Build `/careers` in Phase D |
| `/about-us/careers/job-application/` | `/` | Build `/careers/apply` in Phase D |
| `/about-us/careers/hiring-commercial-sales/` | `/` | 301 → `/careers` once built |
| `/portfolio-archive/` | `/` | Build `/portfolio` in Phase D |
| `/portfolio-archive/commercial-portfolio/` | `/commercial` | Closest live destination |

### Blog hub (no blog route exists yet)

| Old URL | New URL | Notes |
|---|---|---|
| `/blog/` | `/` | Redirect to home until `/blog` route is built in Phase C |

---

## P2 — Redirect + Build (Target Page Required Pre-Launch)

These redirects cannot resolve correctly until the destination page is built. All six should be built and deployed together with their redirects before or at cutover. Each is a legal or primary conversion requirement.

| Old URL | New URL | Build status | Priority rationale |
|---|---|---|---|
| `/about-us/` | `/about` | **Not built** | Primary trust and brand page |
| `/contact-us/` | `/contact` | **Not built** | Primary lead capture — SEO and direct traffic |
| `/get-a-quote/` | `/contact` (interim) | **Not built** | Primary CTA destination — confirm GHL or form target |
| `/privacy-policy-statement/` | `/privacy-policy` | **Not built** | Legal requirement; no valid site without this |
| `/terms-of-use-statement/` | `/terms` | **Not built** | Legal requirement |
| `/accessibility/` | `/accessibility` | **Not built** | ADA / legal requirement |

> **Note on `/get-a-quote/`:** The permanent destination depends on an open decision — GHL embed, contact form, or custom booking page. Until resolved, redirect to `/contact`. Owner: David.

---

## P4 — Blog Post Redirects (Defer to Phase C)

**356 individual blog posts are excluded from this seed map.** Their redirect disposition depends on a content audit (keep, merge, or drop) that must precede any migration. Migrating posts without a content audit risks carrying low-quality content into the new CMS and diluting crawl budget.

**Known drop candidates** (redirect → `/` immediately if crawled before Phase C):

| URL | Reason |
|---|---|
| `/blog/2019/08/test-2/` | Test post; no content value |
| `/blog/2019/08/test-3/` | Test post; no content value |
| `/blog/2020/07/test-test-test/` | Test post; no content value |
| `/blog/2019/04/hello-world/` | Default WP placeholder |
| `/blog/2020/06/due-to-the-covid-19-outbreak-we-are-temporarily-closed/` | Expired event-specific notice |

All other blog posts should remain on the WordPress origin (or be served a 404 from the new origin) until the Phase C audit determines their fate. Do not redirect 356 posts to `/blog` blindly — that degrades the blog hub's crawl signal.

---

## Pages That Need Rebuilding (Not Redirect-Only)

These pages require net-new content on the new site. A redirect alone is insufficient — the redirect just prevents a 404 until the page is live.

| Page | New URL | Phase | Blocking cutover? |
|---|---|---|---|
| Contact | `/contact` | Pre-launch | **Yes** |
| About | `/about` | Pre-launch | **Yes** |
| Quote / CTA | `/contact` or GHL | Pre-launch | **Yes** |
| Privacy Policy | `/privacy-policy` | Pre-launch | **Yes (legal)** |
| Terms of Use | `/terms` | Pre-launch | **Yes (legal)** |
| Accessibility | `/accessibility` | Pre-launch | **Yes (legal/ADA)** |
| Commercial service sub-pages (5) | `/commercial/[service]` | Phase A | No — hub redirect covers interim |
| Residential service sub-pages (9) | `/residential/[service]` | Phase A | No — hub redirect covers interim |
| Town pages (35) | `/[town-slug]` | Phase B | No — hub redirect covers interim |
| Blog hub | `/blog` | Phase C | No |
| Blog posts (~80–120 kept) | `/blog/[slug]` | Phase C | No |
| About sub-pages, portfolio, careers | Various | Phase D | No |

---

## Redirect Count Summary

| Group | Count | P-level |
|---|---|---|
| Commercial hub + entry points | 2 | P1 |
| Residential hub + entry points | 9 | P1 |
| Commercial service sub-pages | 5 | P1 |
| Residential service sub-pages | 9 | P1 |
| Town / local pages (hub + 35) | 36 | P1 |
| Utility / conversion pages | 4 | P1 |
| Specials + promotions | 16 | P1 |
| About / company (interim) | 10 | P1 |
| Blog hub (interim) | 1 | P1 |
| **P1 total** | **92** | |
| Legal + conversion pages (build + redirect) | 6 | P2 |
| **P2 total** | **6** | |
| Blog posts (defer) | 356 | P4 |
| Blog drop candidates (immediate) | 5 | P4 |
| **Grand total** | **454** | |

---

## Implementation Notes

**Implementation path:** Add all P1 and P2 redirects to `next.config.js` `redirects()` array. Do not use the Vercel dashboard for redirects — keep them in version control so they are reviewable, testable, and portable.

**Two-step update pattern for service and town pages:** P1 redirects for these point to hub pages (`/residential`, `/commercial`) as interim targets. When Phase A and B pages are built, update each redirect's `destination` to the new sub-page URL. The `source` does not change. This avoids any additional redirect chain for users who bookmarked or linked legacy service URLs.

**Smoke test checklist before DNS cutover:**
- [ ] All P1 redirects return HTTP 301
- [ ] No redirect chains longer than one hop
- [ ] All P2 pages return HTTP 200
- [ ] `sitemap.xml` includes all live pages (at minimum the 4 current + 6 new P2 pages)
- [ ] `/robots.txt` does not disallow new routes
- [ ] No legacy WordPress paths appear in the new sitemap

---

## Open Decisions Blocking Phase A and B

| Decision | Owner | Blocking what |
|---|---|---|
| Town URL scheme: `/[town-slug]` vs `/local/[town-slug]` | David | Phase B page builds and permanent redirect targets |
| `/get-a-quote/` permanent destination (GHL embed, contact form, or booking) | David | P2 redirect destination and page build |
| `/pay-my-bill-online/` GHL payment link URL | David | P1 redirect destination |
| Blog URL scheme: keep `/blog/YYYY/MM/slug` or flatten to `/blog/slug` | David | Phase C redirect strategy |
