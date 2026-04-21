# AGW Preview QA Checklist — 2026-04-21

**Purpose:** Manual acceptance checklist for the AGW phase-0 preview. Complete all items in one pass before approving or rejecting the preview.  
**Reviewer:** ___________________________  
**Date reviewed:** ___________________________  
**Preview URL:** ___________________________

---

## Branch and SHA Reviewed

| Field | Value |
|---|---|
| Branch | `origin/agw-frontend-pass` |
| SHA | `1bf969ea6bd68e8754dca038af58c70f32186f58` |
| Commit message | Frontend production-readiness pass: font, logo, GHL widget, SEO fixes |
| Canonical app path | `projects/agw/website-review-build/` |

---

## How to Use This Checklist

Mark each item **Pass**, **Fail**, or **N/A**. Record notes in the Notes column for any Fail. A single Fail in a Blocker item is sufficient to reject the preview. Non-blocker Fails should be listed in the signoff section as known issues.

**Severity key:**
- **B** — Blocker. Must pass before the preview is shared with the client.
- **H** — High. Should pass; document and schedule a fix if not.
- **M** — Medium. Document if failing; acceptable to share preview with a noted caveat.

---

## 1. Quote-Flow Checks

Verify on each of the four pages that every CTA reaches the correct destination and behaves correctly.

**Expected quote destination:** `https://agwilliamspainting.com/get-a-quote/`  
*(Note: this is the legacy WordPress quote URL — it is the intended destination until a native quote flow is built.)*

### 1.1 Homepage (`/`)

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 1.1.1 | B | Top strip "Get a Quote" link resolves to `https://agwilliamspainting.com/get-a-quote/` | | |
| 1.1.2 | B | Header "Get a Quote" button resolves to the same URL | | |
| 1.1.3 | B | Header secondary "Call Pelham Office" link dials `tel:+19147382860` | | |
| 1.1.4 | B | Footer "Get a Quote" CTA resolves to the quote URL | | |
| 1.1.5 | H | All four CTA destinations open without a 404 or redirect loop | | |
| 1.1.6 | M | CTA buttons render in Lapis Lazuli brand blue with legible white label text | | |

### 1.2 Commercial (`/commercial`)

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 1.2.1 | B | Top strip "Commercial Consultation" link resolves to the quote URL | | |
| 1.2.2 | B | Header "Commercial Consultation" button resolves to the quote URL | | |
| 1.2.3 | B | Header secondary "Call Main Office" link dials `tel:+18002271906` | | |
| 1.2.4 | B | Footer "Request a Commercial Consultation" CTA resolves to the quote URL | | |

### 1.3 Residential (`/residential`)

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 1.3.1 | B | Top strip "Residential Walkthrough" link resolves to the quote URL | | |
| 1.3.2 | B | Header "Residential Walkthrough" button resolves to the quote URL | | |
| 1.3.3 | B | Header secondary "Call Main Office" link dials `tel:+18002271906` | | |
| 1.3.4 | B | Footer "Schedule a Residential Walkthrough" CTA resolves to the quote URL | | |

### 1.4 Heritage (`/heritage`)

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 1.4.1 | B | Top strip "Get a Quote" link resolves to the quote URL | | |
| 1.4.2 | B | Header "Get a Quote" button resolves to the quote URL | | |
| 1.4.3 | B | Header secondary "Call Pelham Office" link dials `tel:+19147382860` | | |
| 1.4.4 | B | Footer "Get a Quote" CTA resolves to the quote URL | | |

### 1.5 Navigation and Footer Links

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 1.5.1 | B | Primary nav "Commercial" → `/commercial` loads correctly | | |
| 1.5.2 | B | Primary nav "Residential" → `/residential` loads correctly | | |
| 1.5.3 | B | Primary nav "Heritage" → `/heritage` loads correctly | | |
| 1.5.4 | H | Primary nav "Service Area" → `/#service-area` scrolls to the correct section on the homepage | | |
| 1.5.5 | H | Footer "Home" → `/` loads correctly | | |
| 1.5.6 | H | Logo in header links back to `/` from all sub-pages | | |

---

## 2. GTM / Event Checks

> **Context:** GTM and GA4 are not yet implemented in this build. The production readiness audit confirms no GTM container script, no `dataLayer`, and no event tracking exist in `src/`. These checks confirm the *current* state and flag what is missing for stakeholder visibility.

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 2.1 | M | Open browser DevTools → Network. Confirm no GTM request fires (`googletagmanager.com`). Document result either way. | | |
| 2.2 | M | Confirm `window.dataLayer` is undefined in the browser console on all four pages | | |
| 2.3 | M | Confirm no GA4 measurement ID (`G-XXXXXXXX`) appears in page source or Network requests | | |
| 2.4 | M | Confirm no Hotjar or Microsoft Clarity script loads (`hotjar.com`, `clarity.ms`) | | |
| 2.5 | H | Document which tracking integrations are absent so the handoff notes are accurate: GTM ☐ / GA4 ☐ / Hotjar ☐ / Clarity ☐ | | |
| 2.6 | M | Verify no console errors related to analytics or tracking scripts fire on page load | | |

> **Expected result:** All of 2.1–2.4 should confirm absent. This is not a failure — it is the known state. The Fail condition is if tracking fires unexpectedly and writes to unintended properties.

---

## 3. Chat Checks

> **Context:** The LeadConnector (GHL) chat widget loads via `strategy="lazyOnload"` in `layout.tsx`. Widget ID: `699ca6733303b66fe5e9d99c`. The booking strategy doc specifies this widget must load on all pages and must not break the existing customer-care notification chain.

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 3.1 | B | Chat widget bubble appears on all four pages (/, /commercial, /residential, /heritage) | | |
| 3.2 | B | Widget loads without a console error | | |
| 3.3 | B | Chat widget ID in the rendered HTML matches `699ca6733303b66fe5e9d99c` (inspect `data-widget-id` attribute) | | |
| 3.4 | B | Clicking the chat bubble opens the LeadConnector chat window correctly | | |
| 3.5 | H | Chat bubble does not obscure the primary CTA button on desktop viewport (1280px wide) | | |
| 3.6 | H | Chat bubble does not obscure the primary CTA button on mobile viewport (390px wide) | | |
| 3.7 | H | Chat widget loads after the page is interactive — it should not block or delay the initial paint | | |
| 3.8 | M | Chat window closes cleanly without leaving orphaned overlay elements in the DOM | | |
| 3.9 | M | Confirm that a test message through the widget appears in the GHL inbox (smoke test, requires GHL access) | | |

---

## 4. Metadata and Schema Checks

> **Context:** Per the SEO migration plan, three known structural issues exist in this build: (1) sub-pages inherit root metadata and report `canonical: "/"`, (2) `HOMEPAGE_JSON_LD` fires on all four pages instead of only the homepage, and (3) the OG image is 10 MB at non-standard dimensions. These are documented blockers for the production cutover but are expected in the preview build. Check their current state and confirm nothing new has regressed.

### 4.1 Page Titles and Descriptions

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 4.1.1 | H | `/` — browser tab and `<title>` reads "A.G. Williams Painting \| Commercial and Residential Painting Since 1906" | | |
| 4.1.2 | H | `/commercial` — confirm whether it has a unique title or inherits the homepage title. Document result. | | |
| 4.1.3 | H | `/residential` — same check. Document result. | | |
| 4.1.4 | H | `/heritage` — same check. Document result. | | |
| 4.1.5 | H | No page renders a blank `<title>` | | |

### 4.2 Canonical Tags

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 4.2.1 | H | `/` — `<link rel="canonical">` points to `https://agwilliamspainting.com/` | | |
| 4.2.2 | H | `/commercial` — inspect canonical. Expected failure: may still point to `/`. Document actual value. | | |
| 4.2.3 | H | `/residential` — same check. Document actual value. | | |
| 4.2.4 | H | `/heritage` — same check. Document actual value. | | |

### 4.3 Open Graph / Social Card

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 4.3.1 | H | OG image tag (`og:image`) is present on all four pages | | |
| 4.3.2 | H | OG image path is `/agw-selected/hero-room.jpg` (confirm it matches the declared path in `layout.tsx`) | | |
| 4.3.3 | M | OG image URL is reachable (returns 200) on the preview domain | | |
| 4.3.4 | M | Note: declared OG dimensions are 5616 × 3744 — this does not match social card specs (1200 × 630). Flag as known pre-launch issue. | | |
| 4.3.5 | H | `og:title` and `og:description` are present and non-empty on all four pages | | |
| 4.3.6 | M | Twitter card tags (`twitter:card`, `twitter:title`, `twitter:image`) are present on all four pages | | |

### 4.4 JSON-LD Structured Data

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 4.4.1 | H | `<script type="application/ld+json">` is present in the page source on all four pages | | |
| 4.4.2 | H | The JSON-LD block on `/` includes `"@type": "PaintingContractor"` with `name`, `url`, `telephone`, and `address` fields populated | | |
| 4.4.3 | H | Confirm whether `HOMEPAGE_JSON_LD` fires on `/commercial`, `/residential`, and `/heritage`. Expected: it does (known bug). Document actual result. | | |
| 4.4.4 | M | Validate JSON-LD on `/` using Google's Rich Results Test or a JSON parser — confirm no syntax errors | | |
| 4.4.5 | M | Phone number in JSON-LD matches `(800) 227-1906` | | |
| 4.4.6 | M | Address in JSON-LD reads "411 Fifth Avenue, Pelham, NY 10803" | | |

### 4.5 Robots and Sitemap

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 4.5.1 | H | `https://[preview-domain]/robots.txt` returns a 200 and includes `Allow: /` | | |
| 4.5.2 | H | `https://[preview-domain]/sitemap.xml` returns a 200 | | |
| 4.5.3 | M | Sitemap contains exactly four URLs: `/`, `/commercial`, `/residential`, `/heritage` | | |

---

## 5. Hero Image and Performance Checks

> **Context:** The performance asset plan identifies several high-risk LCP assets. The items below are the Tier 1 issues — those directly affecting above-the-fold load on each page.

### 5.1 Homepage (`/`)

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 5.1.1 | H | Hero image (`home-exterior-fairfield.jpg`, ~228 KB) loads visibly without a long delay | | |
| 5.1.2 | H | Hero image has `priority` prop — verify in Network tab that it is fetched as high-priority, not lazy-loaded | | |
| 5.1.3 | M | Logo (`agw-logo-lockup.png`) renders without cropping or aspect-ratio distortion at desktop width | | |
| 5.1.4 | M | Logo renders without cropping or distortion at mobile width (390px) | | |

### 5.2 Residential (`/residential`)

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 5.2.1 | B | Hero image (`white-kitchen.jpg`) renders correctly — no broken image, no layout shift | | |
| 5.2.2 | B | Note LCP time in DevTools Performance panel or Lighthouse. Flag if LCP exceeds 4s (source file is 7.9 MB — this is expected to be slow until optimized). | | |
| 5.2.3 | H | Second hero image (`interior-painter.jpg`) loads without a broken state | | |
| 5.2.4 | H | Third hero image (`home-exterior-fairfield.jpg`) loads without a broken state | | |

### 5.3 Commercial (`/commercial`)

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 5.3.1 | B | Hero image (`commercial-floor.jpg`) renders correctly — no broken image, no layout shift | | |
| 5.3.2 | H | Note LCP time. Flag if LCP exceeds 4s (source file is 4.1 MB). | | |
| 5.3.3 | M | Page is usable (not blocked) while hero image finishes loading | | |

### 5.4 Heritage (`/heritage`)

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 5.4.1 | B | Primary hero image (`heritage-van.jpg`) renders correctly | | |
| 5.4.2 | B | Secondary hero image (`exterior-process.jpg`) renders correctly | | |
| 5.4.3 | H | Note LCP time. Flag if LCP exceeds 4s (van: 4.8 MB, exterior-process: 9 MB). | | |
| 5.4.4 | H | `exterior-process.jpg` is in the above-fold hero grid. Confirm it loads — it currently lacks the `priority` prop, so it may be deprioritized by the browser. Note any visible delay compared to the van image. | | |

### 5.5 General Performance

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 5.5.1 | H | No image renders as a broken placeholder (alt text showing instead of image) on any page | | |
| 5.5.2 | H | No cumulative layout shift (CLS) is visible during page load on any page | | |
| 5.5.3 | M | Fonts (Playfair Display for headings, Poppins/ExtraBold for UI) render correctly and do not flash a fallback stack visibly | | |
| 5.5.4 | M | Run Lighthouse on `/` in Chrome DevTools. Record Performance score. Acceptable threshold for preview: ≥50. | | |

---

## 6. Mobile Checks

> **Context:** The site uses a `<details>/<summary>` mobile menu pattern. The top info strip is hidden on mobile (`hidden md:block`). The mobile header shows a "Call" button and a "Menu" toggle. The viewport meta includes `viewportFit: "cover"` for iOS safe-area handling.

### 6.1 Layout and Navigation

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 6.1.1 | B | Test at 390 × 844 (iPhone 14 viewport). All four pages load without horizontal scroll. | | |
| 6.1.2 | B | Mobile "Menu" toggle opens the nav panel on all four pages | | |
| 6.1.3 | B | Mobile nav panel shows: Commercial, Residential, Heritage, Service Area links | | |
| 6.1.4 | B | Mobile nav panel CTA button label is correct per page: "Get a Quote" (/, /heritage), "Consultation" (/commercial), "Walkthrough" (/residential) | | |
| 6.1.5 | B | Mobile nav panel phone number is `(800) 227-1906` (main office) | | |
| 6.1.6 | H | Mobile "Call" button in header triggers a phone call intent (test link href, not required to complete call) | | |
| 6.1.7 | H | Mobile menu panel closes when a nav link is tapped (or on a subsequent menu click) | | |
| 6.1.8 | H | Top info strip (eyebrow + message) is not visible on mobile — confirm it is hidden, not just collapsed | | |

### 6.2 CTA and Touch Targets

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 6.2.1 | B | All CTA buttons on mobile have a minimum tap target of approximately 44 × 44 px | | |
| 6.2.2 | H | "Call" button in mobile header is clearly tappable and does not overlap the logo or menu toggle | | |
| 6.2.3 | H | Hero CTA buttons on each page are fully visible above the fold on mobile without scrolling | | |
| 6.2.4 | H | Chat widget bubble on mobile does not cover the hero CTA or the mobile primary CTA | | |

### 6.3 iOS-Specific Checks

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 6.3.1 | H | On Safari / iOS, the sticky header respects the safe-area-inset-top (`env(safe-area-inset-top)`) — no content is clipped behind the notch | | |
| 6.3.2 | H | `viewport-fit=cover` is set and confirmed in page source | | |
| 6.3.3 | M | Hash-link navigation (e.g., `/#service-area`) scrolls to the correct position on Safari — the layout.tsx hash-scroll polyfill is present and should handle this | | |

### 6.4 Responsive Layout

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 6.4.1 | H | Test at tablet width (768px). Nav is still in mobile/hamburger mode — confirm desktop nav is hidden and mobile menu is visible | | |
| 6.4.2 | H | Test at 1024px. Desktop nav (`lg:flex`) is visible. Mobile menu (`lg:hidden`) is hidden. | | |
| 6.4.3 | M | Footer grid renders in a single column on mobile, two columns at sm, and three columns at lg | | |
| 6.4.4 | M | Service area list in footer is visible and readable at all breakpoints | | |

---

## 7. Content and Brand Checks

| # | Sev | Check | Pass / Fail / N/A | Notes |
|---|---|---|---|---|
| 7.1 | H | AGW logo lockup is present in both the header and footer on all four pages | | |
| 7.2 | H | Logo is legible and not cropped, blurred, or mis-tinted | | |
| 7.3 | H | Phone number displayed in the top strip and footer is accurate: `(800) 227-1906` (main), `(914) 738-2860` (Pelham) | | |
| 7.4 | H | Office address in footer reads "411 Fifth Avenue, Pelham, NY 10803" | | |
| 7.5 | M | Service area list in footer includes all four counties: Westchester, Fairfield, Rockland, Putnam | | |
| 7.6 | M | "Since 1906" trust signal appears on the homepage | | |
| 7.7 | M | 5-year warranty language appears on the residential page or homepage | | |
| 7.8 | M | No placeholder text (`Lorem ipsum`, `[insert]`, `TBD`) is visible on any page | | |
| 7.9 | M | No broken or 404 internal links in the primary nav or footer | | |

---

## 8. Pass / Fail Signoff

### Summary Counts

| Severity | Total Checked | Pass | Fail | N/A |
|---|---|---|---|---|
| Blocker (B) | | | | |
| High (H) | | | | |
| Medium (M) | | | | |
| **Total** | | | | |

### Blocker Failures (must be zero to approve)

List any Blocker items that failed. If none, write "None."

| # | Item | Description | Assigned to | Target fix date |
|---|---|---|---|---|
| | | | | |

### High / Medium Failures (known issues)

List any High or Medium items that failed. These are acceptable for preview but must be tracked.

| # | Item | Description | Priority | Notes |
|---|---|---|---|---|
| | | | | |

### Pre-Existing Known Issues

The following issues are documented in the source reports and are **expected** in this preview. They are not grounds for rejection but should be confirmed present and noted.

| Known issue | Expected state | Confirmed |
|---|---|---|
| `/commercial`, `/residential`, `/heritage` inherit homepage metadata and canonical | All three report `canonical: "/"` | ☐ |
| `HOMEPAGE_JSON_LD` fires on all four pages | Present on sub-pages (incorrect but known) | ☐ |
| OG image (`hero-room.jpg`) is 10 MB at 5616 × 3744 | Unoptimized — social card rendering degraded | ☐ |
| Residential hero (`white-kitchen.jpg`) is 7.9 MB with `priority` | LCP will be slow; optimization deferred to pre-launch | ☐ |
| Heritage `exterior-process.jpg` (9 MB) lacks `priority` prop | LCP compounded with van image; one-line fix deferred | ☐ |
| GTM, GA4, Hotjar not implemented | Confirmed absent — tracking added in a future pass | ☐ |
| All quote CTAs point to legacy WordPress URL | Expected; native quote flow not yet built | ☐ |

---

### Final Decision

| Decision | Reviewer | Date |
|---|---|---|
| ☐ **Approved** — zero blockers, all known issues confirmed | | |
| ☐ **Approved with conditions** — zero blockers; conditions listed above | | |
| ☐ **Rejected** — one or more blocker failures; see list above | | |

**Reviewer signature:** ___________________________

**Notes:**

