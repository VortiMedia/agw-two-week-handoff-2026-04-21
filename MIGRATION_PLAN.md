# AGW Website Migration Plan

## Non-negotiables from David
- Preserve current sitemap / URL coverage for SEO equity
- Import and respect AGW brand guidelines, including commercial one-pager rules
- Avoid imagery/layout choices that could create safety or insurance issues
- Scrape and migrate core site content instead of rewriting from scratch blindly
- Give AGW a CMS that feels easy enough for a marketing team used to WordPress
- Preserve / re-embed chatbot widget and booking workflow
- Investigate GoHighLevel calendar availability/API so booking UX can be upgraded without breaking ops

## Live-site findings already confirmed
- Current sitemap index:
  - `https://agwilliamspainting.com/post-sitemap.xml`
  - `https://agwilliamspainting.com/page-sitemap.xml`
- Current site uses:
  - Rank Math sitemap
  - Google Tag Manager (`GTM-W559QJ7C`)
  - LeadConnector / GoHighLevel widgets
  - Facebook customer chat
  - Hotjar
- Current widget scripts detected:
  - `https://widgets.leadconnectorhq.com/loader.js`
  - `https://widgets.leadconnectorhq.com/chat-widget/loader.js`

## Migration workstreams

### 1) URL + SEO preservation
- Export full sitemap inventory from existing site
- Create redirect map only where URL changes are unavoidable
- Keep high-value pages and town/service pages alive where they have search equity
- Preserve blog archive structure or map it carefully into new CMS slugs
- Rebuild metadata, schema, OG, canonicals, XML sitemap, robots
- Preserve / improve internal linking between service pages, town pages, blog posts, testimonials, and quote flow

### 2) Content migration
- Scrape page copy, service copy, blog posts, testimonial pages, warranty content, specials, location pages, portfolio pages, about/history pages
- Separate content into:
  - keep as-is
  - tighten/edit
  - consolidate
  - noindex/archive
- Flag pages that look like thin SEO leftovers or promo cruft before rebuilding them one-for-one

### 3) Brand + compliance guardrails
- Import brand book, logos, colors, typography, commercial one-pager guidance
- Create image safety rules:
  - avoid unsafe ladder imagery / risky jobsite visuals
  - avoid any photo that could conflict with insurance / safety presentation
  - prioritize grounded, premium, clean, professional project imagery
- Build a reusable media review checklist before final asset selection

### 4) CMS decision
## Recommended: Sanity
Why:
- easier editorial experience than a custom-coded dashboard for this use case
- clean media library
- structured content for pages, blog, testimonials, service areas, gallery
- preview + role-based editing
- easier to make them feel like they still have a "marketing backend"

### Proposed editable content models
- site settings
- homepage
- service page
- commercial page
- town / service area page
- blog post
- testimonial
- project / gallery item
- team member
- CTA banners / specials
- FAQ sets

### 5) Integrations
- Re-add GTM / GA4 cleanly
- Reconnect chat widget
- Reconnect Facebook chat only if still wanted
- Confirm whether Hotjar remains or gets swapped for Clarity
- Investigate GoHighLevel booking:
  - can we embed existing widget only?
  - can we pull availability via API and render a cleaner front-end booking experience?
  - what auth/account access is needed?

### 6) Booking / quote flow
- Preserve current operational intake until replacement is proven
- Build new estimate UX on frontend
- Keep backend delivery safe: email / CRM / GHL / database path confirmed before cutover
- Avoid breaking sales workflow just to make the page prettier

## Immediate next actions
1. Export full URL inventory from page + post sitemaps
2. Scrape current site content into a migration folder
3. Ingest brand guideline files David received
4. Confirm AGW access for:
   - WordPress admin / export if available
   - GTM / GA4 / Search Console
   - GoHighLevel widget or API access
   - chat widget account details
5. Define what gets rebuilt first:
   - homepage
   - core service pages
   - about/history
   - contact/quote flow
   - blog/CMS

## Questions still open
- Are we rebuilding every legacy town/specials page or pruning some of that junk?
- Is GoHighLevel the source of truth for estimates/calendar, or just a widget layer?
- Do they want blog migration 1:1, or only keep the pages with actual traffic/value?
- What exact brand rules apply separately to commercial vs residential?
- Which photos are approved / disallowed from a safety and insurance standpoint?

## My recommendation
Do not migrate the old WordPress mess one-for-one.
Preserve SEO value, yes. Preserve every ugly content decision, no.
We should keep the URL equity, salvage the useful content, and rebuild the experience like an actual premium operator site.
