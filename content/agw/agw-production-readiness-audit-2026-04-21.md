# AGW Production Readiness Audit — 2026-04-21

Audited repo: `/Users/david/agw-website`

## Bottom Line

This repo is **not production-ready** for the full AGW rebuild. What exists today is a **phase-0 marketing preview** that compiles cleanly, but it is still a static brochure app with no CMS, no booking implementation, no GHL integration, no migrated SEO surface, and no canonical source-of-truth project.

If you want the blunt version:

- the visual direction work is real
- the production architecture is mostly still a plan
- the repo structure is currently working against the project

## Executive Scorecard

| Area | Status | Notes |
| --- | --- | --- |
| Frontend build health | Partial pass | `lint` passes; `build` passes under Node 20.11.1 |
| Visual direction | Good enough for preview | Stronger than the old draft, still not final art direction |
| CMS readiness | Fail | No CMS, no models, no editorial workflow |
| Booking / GHL readiness | Fail | No booking UI or GHL integration code exists |
| Quote flow | Fail | CTAs still hand off to the legacy WordPress quote page |
| SEO migration readiness | Fail | Legacy inventory has 455 URLs; new sitemap exposes 4 pages |
| Content migration readiness | Fail | No migrated blog, service-area, testimonial, or collection content |
| Analytics / tracking readiness | Fail | GTM / Hotjar / chat are documented but not implemented |
| Repo hygiene | Poor | Duplicate apps, checked-in `node_modules`, checked-in `.next`, heavy asset duplication |
| Launch readiness | No-go | Needs architecture, content, integrations, and repo cleanup first |

## Scope And Method

I reviewed:

- all non-generated source and config files in `projects/agw/live-site-reference/`
- all non-generated source and config files in `projects/agw/website-review-build/`
- AGW docs under `content/agw/`
- AGW asset docs under `assets/agw/`
- the brand reference doc at [AGW_Website_Brand_Reference.docx](/Users/david/agw-website/AGW_Website_Brand_Reference.docx)
- deployment metadata, migration notes, and preview-state files

I also validated the current review build:

- `npm run lint` in `projects/agw/website-review-build` passed
- `npm run build` failed under local Node `18.18.2` because Next 16 requires Node `>=20.9.0`
- `npx -y node@20.11.1 ./node_modules/next/dist/bin/next build` passed

I did **not** manually inspect `node_modules/` or `.next/` file-by-file because those are generated/vendor surfaces, not authored project logic. I did count and size them because they are part of the repo hygiene problem.

## What The Repo Actually Contains

### Active AGW surfaces

- `projects/agw/live-site-reference/`
  - 68 non-generated files
  - one snapshot of the app
- `projects/agw/website-review-build/`
  - 99 non-generated files
  - second snapshot of the app plus `brand-kit/`, extra public assets, and preview docs
- `content/agw/`
  - previous audit docs and revision log
- `assets/agw/`
  - canonical brand files, photos, proposals, screenshots, and archive material

### Size reality

- whole repo: `3.3G`
- `assets/agw/`: `1.5G`
- `projects/agw/website-review-build/`: `670M`
- checked-in `projects/agw/website-review-build/node_modules/`: `463M`
- checked-in `projects/agw/website-review-build/.next/`: `76M`

### App reality

The authored application surface is small:

- `website-review-build/src/`: 16 files
- `live-site-reference/src/`: 16 files
- current route surface: `/`, `/commercial`, `/residential`, `/heritage`, plus `robots.txt` and `sitemap.xml`

That is a preview site, not a rebuilt production platform.

## Critical Findings

### 1. There is no CMS implementation yet

The project docs clearly intend a CMS-first rebuild. The current app is still a static hand-authored site.

Evidence:

- The migration plan says AGW needs a CMS and recommends Sanity in [MIGRATION_PLAN.md](/Users/david/agw-website/projects/agw/website-review-build/MIGRATION_PLAN.md:3) through [MIGRATION_PLAN.md](/Users/david/agw-website/projects/agw/website-review-build/MIGRATION_PLAN.md:73).
- The generated build brief expects structured editable content and lead capture in [AGENT_TASK.md](/Users/david/agw-website/projects/agw/website-review-build/AGENT_TASK.md:58).
- The actual app data is hardcoded in [site-data.ts](/Users/david/agw-website/projects/agw/website-review-build/src/lib/site-data.ts:1).
- I searched `src/` for forms, route handlers, server actions, and CMS usage and found none.

Impact:

- no marketing team editing workflow
- no content modeling for services, towns, testimonials, gallery, blog, FAQ sets, or site settings
- no preview/content draft workflow
- no production-ready content backend

### 2. There is no real booking or GHL integration yet

The docs repeatedly say the site needs to preserve or upgrade the GoHighLevel / LeadConnector workflow. The app currently does not implement that.

Evidence:

- GoHighLevel and widgets are called out as migration requirements in [MIGRATION_PLAN.md](/Users/david/agw-website/projects/agw/website-review-build/MIGRATION_PLAN.md:9), [MIGRATION_PLAN.md](/Users/david/agw-website/projects/agw/website-review-build/MIGRATION_PLAN.md:19), and [MIGRATION_PLAN.md](/Users/david/agw-website/projects/agw/website-review-build/MIGRATION_PLAN.md:75).
- The only quote destination in code is the legacy WordPress quote URL in [site-data.ts](/Users/david/agw-website/projects/agw/website-review-build/src/lib/site-data.ts:3).
- Homepage, residential, commercial, and heritage CTAs all link to that external quote URL, for example [page.tsx](/Users/david/agw-website/projects/agw/website-review-build/src/app/page.tsx:98), [residential/page.tsx](/Users/david/agw-website/projects/agw/website-review-build/src/app/residential/page.tsx:63), and [commercial/page.tsx](/Users/david/agw-website/projects/agw/website-review-build/src/app/commercial/page.tsx:47).
- No LeadConnector script, no GHL calendar embed, no API client, no booking widget wrapper, no webhook receiver, and no availability logic exist in `src/`.

Impact:

- the new site cannot own the quote/booking experience yet
- the "custom calendar" work has not started in code
- cutover would still depend on the old WordPress quote path

### 3. SEO migration is not implemented

The repo contains a legacy URL inventory, but the new app only publishes four marketing pages.

Evidence:

- The migration plan says preserve sitemap/URL coverage and rebuild metadata and redirects in [MIGRATION_PLAN.md](/Users/david/agw-website/projects/agw/website-review-build/MIGRATION_PLAN.md:28).
- The current migration inventory contains `455` URLs in `projects/agw/website-review-build/migration-url-inventory.txt`.
- The current sitemap only emits four pages in [sitemap.ts](/Users/david/agw-website/projects/agw/website-review-build/src/app/sitemap.ts:3).

Impact:

- massive SEO surface area is still missing
- no redirect map is implemented
- no town/service page strategy is in code
- no blog migration exists
- no structured content architecture exists to support search recovery

### 4. The repo has no canonical app source of truth

There are two AGW app trees that are clearly related but not identical.

Evidence:

- The project index itself describes `live-site-reference/` and `website-review-build/` as separate snapshots in [projects/agw/README.md](/Users/david/agw-website/projects/agw/README.md:5).
- `diff -rq` shows multiple source differences across `src/app`, `src/components`, and `src/lib`.
- The live snapshot and review build diverge in layout, logo handling, brand assets, header/mobile shell, and page composition.

Concrete examples:

- [layout.tsx](/Users/david/agw-website/projects/agw/website-review-build/src/app/layout.tsx:81) contains hash-scroll behavior that the live snapshot does not.
- [brand-assets.ts](/Users/david/agw-website/projects/agw/website-review-build/src/lib/brand-assets.ts:34) adds the real lockup and curated asset groups that the live snapshot does not have.
- [site-shell.tsx](/Users/david/agw-website/projects/agw/website-review-build/src/components/site-shell.tsx:70) uses a mobile menu, while the live snapshot had a different shell structure.

Impact:

- unclear deployment target
- high regression risk
- duplicated maintenance
- audit findings can drift depending on which tree someone edits

### 5. The repo itself says this is a preview, not launch-ready

This matters because the repo contains enough deployment metadata to fool someone into thinking it already shipped.

Evidence:

- [deploy-state.json](/Users/david/agw-website/projects/agw/website-review-build/phase-0/deploy-state.json:2) sets `deliveryContract` to `direction-check-preview`.
- [deploy-state.json](/Users/david/agw-website/projects/agw/website-review-build/phase-0/deploy-state.json:13) explicitly says: `Direction-check preview only. Do not treat this as production launch proof.`
- [REVIEW_PACKAGE.md](/Users/david/agw-website/projects/agw/website-review-build/phase-0/REVIEW_PACKAGE.md:10) says the preview is for look/feel/trust/estimate direction, not final copy or final imagery.

Impact:

- nobody should treat the current preview as a launch candidate
- production work is still ahead, not behind

## High Findings

### 6. Brand direction is internally inconsistent across the repo

There are three different brand systems in play:

1. The brand reference doc says the website palette is `#0063B0`, `#6CBBE8`, `#F9F8F2`, `#595953`, with **Playfair Display** for headings and **Poppins** for body/UI.
2. The generated design-system doc says `#0B1F33`, gold accent `#D6B36A`, **Plus Jakarta Sans**, and **Inter** in [design-system/MASTER.md](/Users/david/agw-website/projects/agw/website-review-build/design-system/MASTER.md:16) through [design-system/MASTER.md](/Users/david/agw-website/projects/agw/website-review-build/design-system/MASTER.md:42).
3. The actual app uses the website blue palette, but the display font is an `Iowan Old Style` fallback stack and only one local Poppins weight is loaded in [layout.tsx](/Users/david/agw-website/projects/agw/website-review-build/src/app/layout.tsx:6) and [globals.css](/Users/david/agw-website/projects/agw/website-review-build/src/app/globals.css:17).

Impact:

- no trusted design source of truth
- typography implementation does not match the brand reference
- future design passes can easily drift again

### 7. Repo hygiene is poor enough to slow down real production work

This is one of the biggest practical problems in the repo.

Evidence:

- checked-in `node_modules/` and `.next/` inside `website-review-build`
- duplicated large assets across `assets/agw/`, `public/agw-approved/`, `public/agw-curated/`, `public/agw-selected/`, and `public/agw-brand/`
- several public assets are very large:
  - `public/agw-selected/service-residential.png` is `10.8 MB`
  - `public/agw-selected/service-commercial.png` is `10.8 MB`
  - `public/agw-selected/hero-room.jpg` is `10.1 MB`

Impact:

- slower repo operations
- noisier diffs
- higher deploy/storage overhead
- harder asset governance

### 8. Analytics, chat, and tracking are planned but absent

The migration docs reference GTM, chat, Hotjar, and Facebook chat, but the app code does not wire any of them back in.

Evidence:

- Tracking and widgets are listed in [MIGRATION_PLAN.md](/Users/david/agw-website/projects/agw/website-review-build/MIGRATION_PLAN.md:16) through [MIGRATION_PLAN.md](/Users/david/agw-website/projects/agw/website-review-build/MIGRATION_PLAN.md:24).
- I searched the app source for GTM, Hotjar, Clarity, Facebook chat, and LeadConnector widget code and found none in `src/`.

Impact:

- launch analytics would be incomplete
- operational chat continuity would break
- attribution and intake visibility would be weaker than the current site

### 9. Content migration has not started in code

The intended rebuild needs service pages, town pages, blog posts, testimonials, gallery items, FAQ sets, and settings. The current app has four hand-authored pages and hardcoded arrays.

Evidence:

- Proposed models are listed in [MIGRATION_PLAN.md](/Users/david/agw-website/projects/agw/website-review-build/MIGRATION_PLAN.md:62).
- The app content is static arrays in [site-data.ts](/Users/david/agw-website/projects/agw/website-review-build/src/lib/site-data.ts:15) and page-level constants in [page.tsx](/Users/david/agw-website/projects/agw/website-review-build/src/app/page.tsx:14).

Impact:

- no scalable content platform
- no real migration progress from WordPress sprawl into structured content

## Medium Findings

### 10. The README and environment story are misleading

The project README is still the default `create-next-app` placeholder in [README.md](/Users/david/agw-website/projects/agw/website-review-build/README.md:1), while the actual environment requires Next 16 and Node `>=20.9.0`.

Impact:

- new contributors will get the wrong setup instructions
- local build failures are more likely

### 11. Placeholder environment variables exist but are unused

The env template lists Supabase, dashboard auth, Google Places, and Formspree in [.env.example](/Users/david/agw-website/projects/agw/website-review-build/.env.example:1), but those values are not referenced anywhere in app code.

Impact:

- false sense that backend groundwork is already in place
- extra decision debt later

### 12. Logo rendering is fragile

The review build switched to a raster lockup and renders it with `object-cover` in [agw-logo.tsx](/Users/david/agw-website/projects/agw/website-review-build/src/components/agw-logo.tsx:17).

Impact:

- the logo can crop or scale awkwardly instead of fitting cleanly
- this is the wrong default behavior for a brand lockup

### 13. SEO metadata is only the minimum shell

There is some metadata and JSON-LD in [layout.tsx](/Users/david/agw-website/projects/agw/website-review-build/src/app/layout.tsx:20), plus the sitemap and robots files, but the richer SEO scope promised in [AGENT_TASK.md](/Users/david/agw-website/projects/agw/website-review-build/AGENT_TASK.md:68) is not implemented.

Missing or incomplete:

- collection-level metadata for town/service/blog content
- FAQ schema pages
- breadcrumb schema
- review schema
- redirect strategy
- legacy-page preservation

### 14. Performance work is incomplete

The build works, but the current asset strategy is still rough.

Evidence:

- many public images are multi-megabyte originals
- above-the-fold pages use several `priority` images
- the generated task expected `quality={100}` and more deliberate image handling in [AGENT_TASK.md](/Users/david/agw-website/projects/agw/website-review-build/AGENT_TASK.md:91)

Impact:

- unnecessary image weight in source control
- unclear final performance budget

## What Is Good

This is not all bad. There is a usable base to build from.

- The review build compiles and type-checks cleanly under a supported Node runtime.
- `site-data.ts` centralizes a lot of the current static messaging and routing.
- The review build looks materially more mature than the issues described in the prior audit.
- The review build appears to have addressed the dead `Service Area` anchor by adding a real section id in [page.tsx](/Users/david/agw-website/projects/agw/website-review-build/src/app/page.tsx:454).
- The review build also moved closer to real AGW assets by adding a lockup image and curated photo set in [brand-assets.ts](/Users/david/agw-website/projects/agw/website-review-build/src/lib/brand-assets.ts:34).

That means the repo is not a throwaway. It just is not the finished system yet.

## Recommended Canonical Direction

Use `projects/agw/website-review-build/` as the **single canonical app** going forward.

Why:

- it is the newer branch of the two
- it contains the extra brand/public asset work
- it includes the preview-state docs that match current reality
- it already fixes some issues that existed in the earlier snapshot

What to do with `live-site-reference/`:

- archive it as a dated snapshot if you want the forensic history
- stop treating it as an editable peer app
- do not let both trees continue to drift

## Recommended Execution Order

### Phase 1. Repo cleanup and source-of-truth reset

- pick `website-review-build/` as canonical
- archive or remove `live-site-reference/` from active development
- remove checked-in `node_modules/` and `.next/`
- move any still-needed `brand-kit/` assets into canonical `assets/agw/` if they are not already represented there
- replace the default README with real setup and runtime notes

### Phase 2. Lock brand and content system decisions

- treat [AGW_Website_Brand_Reference.docx](/Users/david/agw-website/AGW_Website_Brand_Reference.docx) as the real brand source, not `design-system/MASTER.md`
- reconcile fonts, palette, and component rules into one implementation spec
- define the actual content model set for:
  - site settings
  - homepage
  - service pages
  - commercial/residential hubs
  - town/service-area pages
  - blog posts
  - testimonials
  - projects/gallery
  - FAQ sets
  - CTA/promotions

### Phase 3. Build the CMS before more hand-authored pages

- stand up Sanity if that is still the choice
- wire preview mode
- model content types
- migrate homepage and hub pages first
- then migrate the search-value pages

### Phase 4. Decide the quote / booking architecture

You need one explicit decision here:

1. short-term safe path
   - keep the existing GHL / LeadConnector / WordPress intake path
   - embed or link it cleanly
   - preserve operations first

2. upgraded path
   - confirm API access and source-of-truth ownership in GHL
   - build a custom calendar / scheduling UI only after that is proven
   - implement fallback behavior so ops never break

Do not build a fake custom booking front end before the backend path is confirmed.

### Phase 5. SEO migration and redirect mapping

- classify the 455 legacy URLs
- decide keep / merge / redirect / noindex / drop
- build collection-driven service/town/blog pages
- create a redirect map before cutover
- expand sitemap and metadata generation from content models

### Phase 6. Launch hardening

- GTM / GA4
- chat widget
- optional Hotjar or Clarity
- accessibility pass
- content QA
- performance pass
- production smoke tests
- rollback plan

## Practical Next Step List

If I were driving this tomorrow, I would do these in order:

1. Freeze `live-site-reference/` and declare `website-review-build/` canonical.
2. Remove repo junk: checked-in `node_modules/`, checked-in `.next/`, duplicate assets that should live only in `assets/agw/`.
3. Replace the default README with real setup instructions and Node version requirements.
4. Write the real brand implementation spec based on the brand reference doc.
5. Stand up the CMS schema and preview flow.
6. Decide whether GHL remains the system of record for estimates/calendar.
7. Build the quote flow around that decision.
8. Start the SEO migration from the 455-URL inventory.

## Final Assessment

This codebase is **salvageable and useful**, but only if you stop treating the current review build like it is already the final platform.

Right now it is:

- a decent phase-0 frontend preview
- a useful asset/document archive
- a partial migration notebook

Right now it is **not**:

- a CMS rebuild
- a booking system
- an SEO migration
- a production-ready repo

The main thing to fix first is not color or spacing. It is **source-of-truth, architecture, and operational path**. Once that is locked, the design work has a real platform to land on.
