# AGW SEO Migration Plan — 2026-04-21

**Prepared by:** Technical SEO Lead  
**Canonical app:** `projects/agw/website-review-build/`  
**Scope:** Route gap analysis and phased migration plan for the AGW WordPress-to-Next.js migration

---

## Situation Summary

The new Next.js build currently publishes **4 pages** and emits a **4-entry sitemap**. The legacy WordPress site has **455 indexed URLs** across services, towns, blog posts, utility pages, and promotional content. That is a **451-URL gap** with no redirect infrastructure in place.

The site cannot cut over to the new domain without a concrete plan for this surface area. Without it, the migration will cause immediate, measurable organic traffic loss and lead flow disruption.

---

## Current Route Surface

| Route | Status | sitemap.ts entry | Per-page metadata |
|---|---|---|---|
| `/` | Live | Yes (priority 1.0) | Yes (root layout.tsx) |
| `/commercial` | Live | Yes (priority 0.9) | No — inherits root |
| `/residential` | Live | Yes (priority 0.9) | No — inherits root |
| `/heritage` | Live | Yes (priority 0.8) | No — inherits root |
| `robots.txt` | Live (generated) | — | — |
| `sitemap.xml` | Live (generated) | — | — |

**Root metadata issues:**

- `layout.tsx` injects `HOMEPAGE_JSON_LD` as a `<script type="application/ld+json">` on every page in the app — this is incorrect. The homepage JSON-LD (LocalBusiness schema) fires on `/commercial`, `/residential`, and `/heritage` as well.
- The root `alternates.canonical` is set to `"/"` in `layout.tsx`. Sub-pages will inherit this and self-report as canonicalized to the homepage.
- There are no `export const metadata` or `generateMetadata` exports in `commercial/page.tsx`, `residential/page.tsx`, or `heritage/page.tsx`. Until those exist, Google sees three thin pages with duplicate metadata and incorrect canonicals pointing to `/`.

---

## Legacy URL Inventory — Classified

**Total legacy URLs: 455**

### Category breakdown

| Category | Count | SEO value | Migration priority |
|---|---|---|---|
| Blog posts (individual) | 356 | Medium–High (long tail, some evergreen) | Phase 3 |
| Town / local pages | 36 (35 towns + hub) | High (local pack signals) | Phase 2 |
| Residential service sub-pages | 11 | High | Phase 2 |
| Commercial service sub-pages | 6 | High | Phase 2 |
| About / company pages | 8 | Medium | Phase 3 |
| Specials / promotions | 15 | Low–Medium | Phase 4 |
| Client resources / checklists | 6 | Low (trust signals) | Phase 4 |
| Core utility pages | 10 | Medium (UX / trust) | Phase 2 |
| Portfolio | 2 | Medium | Phase 3 |
| Blog hub | 1 | Medium | Phase 3 |

---

### Core utility pages (10)

| Legacy URL | Disposition |
|---|---|
| `/about-us/` | Build `/about` — high trust signal, needed pre-launch |
| `/get-a-quote/` | Map to new quote/CTA flow — needed pre-launch |
| `/contact-us/` | Build `/contact` — needed pre-launch |
| `/privacy-policy-statement/` | Build `/privacy-policy` — legal requirement |
| `/terms-of-use-statement/` | Build `/terms` — legal requirement |
| `/accessibility/` | Build `/accessibility` — ADA / legal |
| `/pay-my-bill-online/` | Redirect to GHL payment link or build `/pay` |
| `/thank-you-landing/` | 301 → `/` or build conversion tracking page |
| `/contact-us/thank-you-from-contact-form/` | 301 → `/thank-you` |
| `/bill-pay-confirmation/` | 301 → `/` |

---

### Commercial service sub-pages (6)

All currently under `/commercial-services/…`. New architecture should use `/commercial/[service]`.

| Legacy URL | Suggested new URL | Disposition |
|---|---|---|
| `/commercial-services/` | `/commercial` | 301 redirect |
| `/commercial-services/commercial-interior-painting/` | `/commercial/interior-painting` | Build + 301 |
| `/commercial-services/commercial-exterior-painting/` | `/commercial/exterior-painting` | Build + 301 |
| `/commercial-services/commercial-floor-coatings/` | `/commercial/floor-coatings` | Build + 301 |
| `/commercial-services/industrial-floor-coatings/` | `/commercial/industrial-floor-coatings` | Build + 301 |
| `/commercial-services/commercial-power-washing/` | `/commercial/power-washing` | Build + 301 |
| `/insured-commercial-painting-contractor/` | `/commercial` | 301 redirect |

---

### Residential service sub-pages (11)

All currently under `/home-services/…`. New architecture should use `/residential/[service]`.

| Legacy URL | Suggested new URL | Disposition |
|---|---|---|
| `/home-services/` | `/residential` | 301 redirect |
| `/home-services/home-interior-painting/` | `/residential/interior-painting` | Build + 301 |
| `/home-services/home-exterior-painting/` | `/residential/exterior-painting` | Build + 301 |
| `/home-services/home-cabinet-refinishing/` | `/residential/cabinet-refinishing` | Build + 301 |
| `/home-services/home-wallpaper-installation/` | `/residential/wallpaper` | Build + 301 |
| `/home-services/home-power-washing/` | `/residential/power-washing` | Build + 301 |
| `/home-services/home-concrete-floor-coatings/` | `/residential/floor-coatings` | Build + 301 |
| `/home-services/home-decorative-custom/` | `/residential/decorative-custom` | Build + 301 |
| `/home-services/home-painter-4a-day/` | `/residential/painter-for-a-day` | Build + 301 |
| `/home-services/concrete-coating-color-options/` | `/residential/floor-coatings` | 301 → parent |
| `/financing-residential-projects/` | `/residential#financing` or `/financing` | Build or 301 |
| `/residential-painting-warranty/` | `/residential#warranty` or `/warranty` | Build or 301 |

---

### Town / local pages (36)

These are among the highest-value pages in the legacy site for local pack ranking. The new URL scheme should use `/[town]` or `/local/[town]`.

**Hub:** `/local-painting-property-improvement/` → 301 to `/residential` or a new `/local` hub

**35 town pages — all follow the pattern `/local-painting-property-improvement/residential-painter-[town]/`:**

Armonk NY, Ardsley NY, Banksville NY, Bedford NY, Briarcliff Manor NY, Bronxville NY, Chappaqua NY, Coscob CT, Darien CT, Dobbs Ferry NY, Eastchester NY, Greenwich CT, Harrison NY, Hartsdale NY, Hastings-on-Hudson NY, Hawthorne NY, Irvington NY, Larchmont NY, Mamaroneck NY, Mt. Pleasant NY, Mt. Vernon NY, New Canaan CT, New Rochelle NY, Old Greenwich CT, Pleasantville NY, Pound Ridge NY, Riverside CT, Rye Brook NY, Rye NY, Scarsdale NY, Stamford CT, Thornwood NY, Tuckahoe NY, Valhalla NY, White Plains NY

**Suggested new URL pattern:** `/[town-name-state]` (e.g., `/armonk-ny`, `/greenwich-ct`)

**Disposition:** All 35 need content-driven pages with localized metadata, breadcrumb schema, and 301 redirects from legacy URLs.

---

### Blog (357 URLs)

**Hub:** `/blog/` → keep at `/blog` (301 from exact match)

**356 individual posts** spanning 2010–2025. URL pattern: `/blog/YYYY/MM/slug/`

**Suggested new URL pattern:** Keep `/blog/YYYY/MM/slug/` for backward compatibility, or migrate to `/blog/[slug]` and 301 the dated paths.

**Content audit needed before migration:**

| Bucket | Criteria | Approximate count | Action |
|---|---|---|---|
| Keep + migrate | Evergreen, unique, traffic-generating | ~80–120 (estimate) | Full CMS migration |
| Merge or thin | Redundant, near-duplicate topics | ~60–80 (estimate) | Consolidate, 301 to winner |
| Noindex or drop | Low-quality test posts, event-specific with no search value | ~20–40 (estimate) | noindex or 301 → `/blog` |

Notable candidates for immediate culling: `/blog/2019/08/test-2/`, `/blog/2019/08/test-3/`, `/blog/2020/07/test-test-test/`, `/blog/2019/04/hello-world/`, `/blog/2020/06/due-to-the-covid-19-outbreak-we-are-temporarily-closed/`

---

### About, portfolio, and client resources (16)

| Category | Legacy URL | Disposition |
|---|---|---|
| About | `/about-us/company-history/` | Build `/about#history` or `/about/history` |
| About | `/about-us/meet-the-team-painting-experts/` | Build `/about#team` or `/about/team` |
| About | `/about-us/testimonials/` | Build `/about/testimonials` or `/testimonials` |
| About | `/about-us/news-and-press/` | Map to `/blog` or build `/press` |
| Careers | `/about-us/careers/` | Build `/careers` |
| Careers | `/about-us/careers/job-application/` | Build `/careers/apply` or embed GHL form |
| Careers | `/about-us/careers/hiring-commercial-sales/` | Build `/careers/commercial-sales` or 301 → `/careers` |
| Portfolio | `/portfolio-archive/` | Build `/portfolio` |
| Portfolio | `/portfolio-archive/commercial-portfolio/` | Build `/portfolio/commercial` |
| Clients | `/painting-clients/` | Build `/clients` or absorb into service pages |
| Clients | `/painting-clients/residential-interior-painting-checklist/` | Build or 301 → residential page |
| Clients | `/painting-clients/residential-exterior-painting-checklist/` | Build or 301 → residential page |
| Clients | `/painting-clients/residential-power-washing-checklist/` | Build or 301 → service page |
| Clients | `/painting-clients/residential-concrete-floor-coatings-checklist/` | Build or 301 → service page |
| Clients | `/painting-clients/residential-concrete-floor-coatings-post-care/` | Build or 301 → service page |

---

### Specials and promotions (15)

Most specials pages are transient. They carry minimal evergreen search value but may have inbound links.

| URL | Disposition |
|---|---|
| `/specials/` | 301 → homepage or build `/promotions` |
| `/specials/armonk-art-show-2025/` | noindex — event-specific |
| `/specials/neighborhood-specials/` | 301 → `/promotions` or homepage |
| `/specials/room-makeover-raffle/` | noindex — event-specific |
| `/specials/welcome-wagon-specials/` | 301 → homepage |
| `/specials/video-specials/` | 301 → homepage |
| `/specials/jobsite-mailer-specials/` | 301 → homepage |
| `/specials/facebook-concrete-floor-coatings/` | 301 → `/residential/floor-coatings` |
| `/specials/email-blast-specials/` | 301 → homepage |
| `/specials/direct-mail-specials/` | 301 → homepage |
| `/specials/direct-advantage-specials/` | 301 → homepage |
| `/specials/clipper-specials/` | 301 → homepage |
| `/specials/bcw-specials/` | 301 → homepage |
| `/specials/fumns-specials/` | 301 → homepage |
| `/williams_wagon/` | 301 → homepage |
| `/customer_referral_rewards_program/` | Build `/referral` or 301 → homepage |
| `/events-get-in-touch/` | 301 → `/contact` |
| `/pay-my-bill-online/` | 301 → payment link |

---

## Part 1: Launch-Critical SEO Work

These must be complete before any production cutover. None require content migration or CMS work — they are structural fixes to the existing 4-page app.

### L1. Fix per-page metadata

**Problem:** `/commercial`, `/residential`, and `/heritage` inherit root `layout.tsx` metadata. All three report `canonical: "/"` and display homepage titles.

**Fix needed in each page file:**

```tsx
// commercial/page.tsx — add before the component
export const metadata: Metadata = {
  title: "Commercial Painting Contractor | A.G. Williams Painting",
  description:
    "Commercial interior and exterior painting, fireproofing, and floor coatings across Westchester, Fairfield, Rockland, and Putnam. Serving businesses since 1906.",
  alternates: { canonical: "/commercial" },
  openGraph: {
    title: "Commercial Painting Contractor | A.G. Williams Painting",
    url: "/commercial",
    // … image, description
  },
};
```

Repeat the pattern for `/residential` and `/heritage` with page-specific titles, descriptions, and canonical values.

**Priority:** Blocker.

---

### L2. Fix JSON-LD scoping

**Problem:** `HOMEPAGE_JSON_LD` is rendered inside `layout.tsx` body — it fires on every page. Google sees LocalBusiness structured data on the `/commercial` and `/residential` pages too, which is technically incorrect (it should only appear on the homepage or a dedicated contact/about page).

**Fix:** Move the homepage JSON-LD `<script>` block out of `layout.tsx` and into `app/page.tsx` only. Each sub-page that needs its own schema (e.g., a Service schema for `/commercial`) should declare it locally.

**Priority:** Blocker.

---

### L3. Expand sitemap before cutover

**Problem:** `sitemap.ts` is a static array of 4 entries. At launch, any new pages added (about, contact, etc.) will not appear in the sitemap until they are manually added.

**Fix for launch:** Add every page that will be live at cutover to the sitemap array before launch. Add a comment flagging that this file must be updated or converted to dynamic generation once the CMS is in place.

**Future fix:** When the CMS is live, convert `sitemap.ts` to a dynamic function that pulls from Sanity.

**Priority:** Must complete before launch.

---

### L4. Deploy a minimum redirect map at cutover

**Problem:** No redirect infrastructure exists. If the new site replaces WordPress, every URL not in the 4-page set returns 404.

**Minimum redirect set required at cutover** — these are the highest-traffic non-blog pages most likely to have inbound links and search impressions:

| From (legacy) | To (new) | Type |
|---|---|---|
| `/home-services/` | `/residential` | 301 |
| `/commercial-services/` | `/commercial` | 301 |
| `/local-painting-property-improvement/` | `/residential` | 301 |
| `/about-us/` | `/about` (or `/#about`) | 301 |
| `/contact-us/` | `/contact` | 301 |
| `/get-a-quote/` | New quote destination | 301 |
| `/blog/` | `/blog` | 301 |
| `/privacy-policy-statement/` | `/privacy-policy` | 301 |
| `/terms-of-use-statement/` | `/terms` | 301 |
| `/about-us/testimonials/` | `/testimonials` or `/#testimonials` | 301 |
| `/about-us/company-history/` | `/about#history` | 301 |
| `/portfolio-archive/` | `/portfolio` | 301 |

**Implementation path:** Next.js `next.config.js` `redirects()` array is sufficient for the initial set. Do not use Vercel dashboard redirects if the count will grow — keep them in version control.

**Priority:** Blocker for cutover.

---

### L5. Verify robots.ts allows the correct surface

Current `robots.ts` allows all user agents including AI crawlers with `allow: "/"` and no disallow rules. This is correct for a marketing site. No changes needed.

Confirm that `Disallow:` rules from the WordPress `robots.txt` (if any applied to `/wp-admin/`, `/wp-content/`, etc.) do not need to be preserved — they should not apply to a Next.js app.

**Priority:** Verify, no change expected.

---

## Part 2: Post-Launch Migration Work

These are sequenced by SEO value and complexity. None should block launch, but the delay clock starts at cutover — every week without redirects or replacement pages is a week of ranking signal loss.

### Phase A — Service sub-pages (weeks 1–3 post-launch)

**Scope:** ~17 new pages  
**Why first:** These are directly linked from the homepage CTAs and the `/commercial` and `/residential` hubs. They have the highest commercial intent.

Deliverables:
- `/commercial/[service]` — 5 commercial service pages
- `/residential/[service]` — 9 residential service pages
- 301 redirects from all legacy `/commercial-services/…` and `/home-services/…` URLs
- Per-page metadata: unique title, description, canonical
- Service schema (Schema.org `Service`) on each page
- Add to `sitemap.ts`

---

### Phase B — Town / local pages (weeks 2–6 post-launch)

**Scope:** 35 town pages + 1 hub  
**Why second:** Town pages drive local pack visibility and are the strongest local-intent lead source. These have been live for years and have accumulated citation and link equity.

Deliverables:
- `/[town-slug]` pages (e.g., `/armonk-ny`, `/greenwich-ct`) — 35 pages
- `/local` hub page or redirect to `/residential`
- Localized metadata: `"Residential Painting in [Town], [State] | A.G. Williams"`
- LocalBusiness or Service schema with geo coordinates and service area
- Breadcrumb schema
- 301 redirects from all `/local-painting-property-improvement/residential-painter-[town]/` URLs
- Add to `sitemap.ts`

**Note:** These pages require a content template. Either build them statically or use a CMS-driven dynamic route (`/[town]/page.tsx` with `generateStaticParams`). The CMS path is strongly preferred because 35 near-duplicate static files are difficult to maintain.

---

### Phase C — Blog (weeks 4–12 post-launch)

**Scope:** 356 posts  
**Why third:** The blog is a large long-tail asset. It carries search value but requires a content audit before migration. Migrating junk posts wastes CMS time and dilutes crawl budget.

Deliverables:
1. **Content audit** — classify all 356 posts into keep, merge, or drop buckets (can be done in a spreadsheet before CMS is live)
2. **CMS blog schema** — `Post` content type with title, slug, date, body, category, author, SEO overrides
3. **Dynamic route** — `/blog/[slug]/page.tsx` with `generateStaticParams` from Sanity
4. **URL strategy decision:** Either keep `/blog/YYYY/MM/slug` (zero-redirect-cost) or migrate to flat `/blog/slug` and add dated-pattern redirects
5. **301 redirects** for dropped/merged posts → canonical survivor or `/blog` hub
6. **Article schema** on each migrated post
7. Expand `sitemap.ts` to pull from Sanity (dynamic)

**Estimated keep bucket:** ~80–120 posts after audit. The blog runs back to 2010; posts from 2012–2016 that are not ranking and have no inbound links should be dropped or redirected, not migrated.

---

### Phase D — About, portfolio, careers, and client resources (weeks 4–8 post-launch)

**Scope:** ~16 pages  
**Why fourth:** These are trust and conversion pages, not primary search-entry points. They matter for bounce reduction and brand credibility but are less likely to be driving organic leads directly.

Deliverables:
- `/about` — company history, founding story, leadership
- `/about/team` — team bios
- `/testimonials` — structured review display with Review schema
- `/careers` and `/careers/[role]`
- `/portfolio` and `/portfolio/commercial`
- `/clients` or embedded checklist content on service pages
- `/privacy-policy`, `/terms`, `/accessibility`
- 301 redirects from all legacy `/about-us/…`, `/painting-clients/…`, `/portfolio-archive/…`

---

### Phase E — Specials, promotions, and utility pages (ongoing)

Most specials pages should be redirected, not rebuilt. Active promotions should live as a section of the homepage or a lightweight `/promotions` page, not as standalone indexed pages per campaign.

**Recommendation:** Redirect all `/specials/…` URLs to the homepage or to a `/promotions` landing page. Add a `noindex` rule for any promotional pages that are intended only for paid or direct traffic, not organic search.

---

## Structured Data Roadmap

| Page type | Schema type | Launch priority |
|---|---|---|
| Homepage | `LocalBusiness` | Fix scoping now (L2) |
| Commercial hub | `Service` | Phase A |
| Residential hub | `Service` | Phase A |
| Service sub-pages | `Service` | Phase A |
| Town pages | `LocalBusiness` + `Service` with geo | Phase B |
| Blog posts | `Article` | Phase C |
| Testimonials | `Review` / `AggregateRating` | Phase D |
| Heritage / about | `Organization` + `AboutPage` | Phase D |
| FAQ content | `FAQPage` | Phase D (if FAQ content exists) |
| Breadcrumbs | `BreadcrumbList` | All pages, Phase A onward |

---

## Sitemap Expansion Roadmap

| Phase | Entries added | Total entries |
|---|---|---|
| Current | 4 | 4 |
| Launch (L3) | +3–6 core pages | ~7–10 |
| Phase A | +17 service pages | ~27 |
| Phase B | +36 town pages | ~63 |
| Phase C | +kept blog posts (~100) | ~163 |
| Phase D | +16 about/portfolio pages | ~179 |

Convert `sitemap.ts` from a static array to a dynamic function once the CMS is live. Sanity provides a GROQ query path that can enumerate all published documents.

---

## Redirect Map — Full Pre-Cutover Checklist

Before any production DNS change, confirm these redirects are deployed and smoke-tested:

- [ ] All `/home-services/…` → `/residential/[service]` (or hub if sub-page not yet built)
- [ ] All `/commercial-services/…` → `/commercial/[service]` (or hub)
- [ ] All `/local-painting-property-improvement/…` → `/[town-slug]` (or `/residential` as fallback)
- [ ] `/about-us/` → `/about`
- [ ] `/about-us/company-history/` → `/about#history`
- [ ] `/about-us/testimonials/` → `/testimonials`
- [ ] `/about-us/meet-the-team-painting-experts/` → `/about#team`
- [ ] `/about-us/news-and-press/` → `/blog`
- [ ] `/about-us/careers/` → `/careers`
- [ ] `/about-us/careers/job-application/` → `/careers/apply`
- [ ] `/about-us/careers/hiring-commercial-sales/` → `/careers`
- [ ] `/contact-us/` → `/contact`
- [ ] `/contact-us/thank-you-from-contact-form/` → `/thank-you`
- [ ] `/get-a-quote/` → new quote destination
- [ ] `/privacy-policy-statement/` → `/privacy-policy`
- [ ] `/terms-of-use-statement/` → `/terms`
- [ ] `/accessibility/` → `/accessibility`
- [ ] `/portfolio-archive/` → `/portfolio`
- [ ] `/portfolio-archive/commercial-portfolio/` → `/portfolio/commercial`
- [ ] `/painting-clients/` → `/residential` (or `/clients` if built)
- [ ] All `/painting-clients/…` checklists → relevant service pages
- [ ] `/blog/` → `/blog`
- [ ] All `/specials/…` → `/` or `/promotions`
- [ ] `/williams_wagon/` → `/`
- [ ] `/events-get-in-touch/` → `/contact`
- [ ] `/customer_referral_rewards_program/` → `/`
- [ ] `/pay-my-bill-online/` → payment destination
- [ ] `/bill-pay-confirmation/` → `/`
- [ ] `/thank-you-landing/` → `/`
- [ ] `/financing-residential-projects/` → `/residential#financing`
- [ ] `/residential-painting-warranty/` → `/residential#warranty`
- [ ] `/insured-commercial-painting-contractor/` → `/commercial`

Blog redirects should be handled as a batch after the content audit determines which posts are being migrated, merged, or dropped.

---

## Open Decisions Required

| Decision | Owner | Needed by |
|---|---|---|
| Town URL scheme: `/[town-slug]` vs `/local/[town-slug]` vs `/residential/[town-slug]` | David | Before Phase B |
| Blog URL scheme: keep `/blog/YYYY/MM/slug` or flatten to `/blog/slug` | David | Before Phase C |
| CMS platform confirmed (Sanity assumed) | David | Before Phase A (content model design) |
| Which blog posts to keep vs. drop — requires traffic data from GA4 | David / SEO | Before Phase C |
| `/get-a-quote/` destination on new site (GHL embed, contact form, or custom booking) | David | Before launch (L4) |
| Whether `/clients` checklist content lives as standalone pages or absorbs into service pages | David | Before Phase D |
