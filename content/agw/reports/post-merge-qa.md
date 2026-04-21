# Post-Merge QA: Preview Candidate Review

**Branch:** `agw-integration`
**SHA:** `531027f972483db7c0993b91508385dd15dc516c`
**Reviewed:** 2026-04-21
**Reviewer:** QA pass (post-merge worktree `agw-postmerge-qa`)

---

## Critical Check Results

| Check | Status | Notes |
|---|---|---|
| `/get-a-quote` exists | **PASS** | `src/app/get-a-quote/page.tsx` present; builds to static `/get-a-quote` |
| Primary quote CTAs route internally first | **PASS** | All `SHELL_ACTIONS.headerPrimaryHref` entries across all routes resolve to `QUOTE_URL` (`/get-a-quote`) |
| Bridge hands off to existing GHL flow | **PASS** | `/get-a-quote` primary CTA targets `GHL_BOOKING_URL` (`link.agwilliamspainting.com/widget/booking/INZqRCM9fdZwZ6avSiny`); office and customer-care process left intact |
| GTM present | **PASS** | `layout.tsx` lines 89–97: `beforeInteractive` bootstrap script with container ID `GTM-W559QJ7C`; noscript iframe present |
| LeadConnector chat present | **PASS** | `layout.tsx` lines 173–178: `lazyOnload` script with widget ID `699ca6733303b66fe5e9d99c` |
| `/contact` exists | **PASS** | Page present with page-specific metadata |
| `/about` exists | **PASS** | Page present with page-specific metadata |
| `/privacy-policy` exists | **PASS** | Page present with page-specific metadata |
| `/terms` exists | **PASS** | Page present with page-specific metadata |
| `/accessibility` exists | **PASS** | Page present with page-specific metadata |
| Sub-pages have page-specific metadata | **PASS** | All 9 sub-pages export unique `title`, `description`, and `canonical` path via `buildPageMetadata` or inline `metadata` export |
| Homepage JSON-LD scoped to homepage only | **PASS** | `HOMEPAGE_JSON_LD` imported and rendered exclusively in `src/app/page.tsx`; no other page references it |
| Sitemap includes all current live routes | **PASS** | `src/lib/seo.ts` `LIVE_ROUTES` covers all 10 routes: `/`, `/commercial`, `/residential`, `/heritage`, `/get-a-quote`, `/about`, `/contact`, `/privacy-policy`, `/terms`, `/accessibility`; `sitemap.ts` generates directly from this array |
| Optimized images still referenced | **PASS** | `AGW_CURATED_PHOTOS` and `AGW_LIVE_ASSETS` from `brand-assets.ts` remain in use across all pages with `next/image` |

---

## Build and Type Verification

| Step | Result |
|---|---|
| `npm install` | Clean — 0 vulnerabilities |
| TypeScript check (via `next build`) | **PASS** — completed in 1518ms with no errors |
| `next build` | **PASS** — 15 static pages generated, no errors or warnings |

**Build output (confirmed routes):**

```
○ /
○ /about
○ /accessibility
○ /commercial
○ /contact
○ /get-a-quote
○ /heritage
○ /privacy-policy
○ /residential
○ /terms
○ /_not-found
○ /robots.txt
○ /sitemap.xml
```

**Lint note:** `npm run lint` exited with `sh: eslint: command not found` in the QA shell environment. This is an environmental path artifact — the TypeScript compiler via `next build` passed cleanly, and no type errors were found. This is not a code blocker, but the lint step should be re-run in a clean `npm run` context before any merge to `main`.

---

## Remaining Blockers

**None that block preview deployment.**

The following are known, intentional placeholder states that require action before a production launch:

1. **`/about`** — Launch placeholder. Final company story and history copy not yet approved for production.
2. **`/privacy-policy`** — Draft copy. Vendor-specific disclosure language and data-retention details still pending legal finalization.
3. **`/terms`** — Draft copy. Business-specific language and final legal review still pending.
4. **`/accessibility`** — Provides a contact path for accessibility support but does not yet include an audit-backed conformance statement.

These pages exist intentionally so launch does not ship without routable utility URLs. They are not blockers for preview.

---

## Verdict

| Gate | Decision |
|---|---|
| **Safe for preview** | **YES** |
| **Safe for launch** | **CONDITIONAL** — code and routing are launch-ready; `about`, `privacy-policy`, `terms`, and `accessibility` pages require content and legal finalization before production go-live |

---

## Next Recommended Pass

1. **Legal and copy finalization pass** — Resolve draft content on `/privacy-policy`, `/terms`, and `/about`. Replace placeholder copy with approved production text.
2. **Accessibility hardening pass** — Commission or complete a WCAG conformance review and replace the placeholder statement on `/accessibility` with an audit-backed accessibility statement.
3. **Re-run `npm run lint`** — Execute in a clean shell session to confirm ESLint passes with no warnings before merging to `main`.
4. **Preview smoke test** — Deploy to Vercel preview URL and manually verify the quote CTA chain end-to-end: homepage CTA → `/get-a-quote` → GHL booking widget loads correctly.
