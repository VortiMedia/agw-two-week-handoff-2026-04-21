# AGW Booking, Analytics & Notification Rollout Plan
*Generated: 2026-04-21 | Branch: agw-ops-plan*

---

## 1. Current State — Code

The canonical app (`projects/agw/website-review-build/`) contains no booking UI, no GHL integration, no GTM snippet, no LeadConnector chat widget, and no analytics instrumentation of any kind. The following is a complete inventory of what the code actually does today:

**Quote / booking destination**
- `src/lib/site-data.ts` line 5: `QUOTE_URL = "https://agwilliamspainting.com/get-a-quote/"` — a hard-coded external URL pointing at the legacy WordPress quote page.
- Every CTA across the app (`SHELL_ACTIONS`, `FOOTER_LINKS`) resolves to this constant. No booking widget, iframe, or form component exists in `src/`.

**Scripts in `layout.tsx`**
- Lines 81–114 contain exactly two inline scripts: a JSON-LD `PaintingContractor` schema block and a hash-scroll behavior helper. Neither touches GTM, analytics, or any third-party widget.
- No `<Script>` tags, no `dangerouslySetInnerHTML` wiring to any external service, no `useEffect` loading pattern for chat or tracking.

**Components / shell**
- `site-shell.tsx` renders nav, header CTAs, footer, and service area list. No iframe, no embed slot, no chat widget mount point.
- No booking page, booking route, or calendar component exists under `src/app/` or `src/components/`.

**GHL / LeadConnector**
- Zero references in `src/`. No loader script, no widget ID, no calendar iframe, no `form_embed.js`.

**Analytics / tracking**
- Zero references in `src/`. GTM container `GTM-W559QJ7C` is documented in `MIGRATION_PLAN.md` as a live-site fact but is not present in the new app's code.

**Summary:** The current build is a static marketing preview. Every user who clicks a CTA leaves the new Next.js app and lands on the legacy WordPress quote page.

---

## 2. Current State — Docs

The strategy documentation is consistent and detailed. Key facts extracted from the three primary docs:

**GHL booking strategy** (`content/agw/ghl-booking-and-notification-strategy-2026-04-21.md`)

| Asset | Value |
|---|---|
| Chat widget loader | `https://widgets.leadconnectorhq.com/loader.js` |
| Chat widget ID | `699ca6733303b66fe5e9d99c` |
| Calendar embed URL | `https://link.agwilliamspainting.com/widget/booking/INZqRCM9fdZwZ6avSiny` |
| Calendar iframe ID | `INZqRCM9fdZwZ6avSiny_1776804477635` |
| GHL form embed script | `https://link.agwilliamspainting.com/js/form_embed.js` |
| GHL form ID | `QJKUxOOQI1YWHYNSsN5F` |
| GHL link host | `https://link.agwilliamspainting.com` |

Recommended V1 architecture: custom intake step → GHL calendar embed as final step. GHL remains the system of record for appointment creation. Do not wrap the calendar iframe inside a native HTML form.

**Analytics and tracking** (`projects/agw/website-review-build/MIGRATION_PLAN.md`, lines 18–24)

Live site currently runs:
- Google Tag Manager: container `GTM-W559QJ7C`
- LeadConnector / GoHighLevel widgets
- Facebook customer chat
- Hotjar

These must be re-implemented in the new build before launch.

**Notification and operational constraints** (`HANDOFF_FOR_OTHER_AI.md`, `agw-master-handoff-notes-2026-04-21.md`)

- The existing GHL appointment-booked automation must not be broken.
- A separate intake-submitted notification path is needed for leads who abandon before booking.
- Customer care needs to see appointment details; the choice between contact custom fields and GHL's native appointment modal Forms tab is still open.

**Production readiness** (`content/agw/agw-production-readiness-audit-2026-04-21.md`)

The audit explicitly flags analytics, chat, and booking as failing categories. All three are documented, none are implemented.

---

## 3. What Is Missing

| Gap | Doc Intent | Code Reality |
|---|---|---|
| GTM container | `GTM-W559QJ7C` must be added to new app | Absent from all files in `src/` |
| LeadConnector chat widget | Preserve widget ID `699ca6733303b66fe5e9d99c` | Absent from `layout.tsx` and all components |
| GHL calendar embed | Embed `INZqRCM9fdZwZ6avSiny` as booking step | No iframe, no script, no booking route |
| Custom intake form | Capture fields before calendar step | No form component exists |
| Intake-submitted event | Push a GTM/dataLayer event on intake submit | No tracking code, no event layer |
| Appointment-booked event | GTM event on successful GHL booking | No postMessage listener, no dataLayer push |
| `form_embed.js` loader | Required for GHL calendar iframe resize behavior | Absent |
| Facebook customer chat | Listed in migration plan as live-site widget | No implementation decision; unresolved |
| Hotjar | Listed in migration plan as live-site service | No implementation decision; unresolved |
| Intake-submitted notification (GHL) | Separate GHL workflow for intake-but-not-booked leads | Not configured (GHL side) |
| Contact custom fields | Pattern A requires writing intake data to GHL contact fields | No API client, no webhook handler |
| Calendar clone (test environment) | Strategy doc requires testing on cloned calendar first | Not created (GHL side) |

The critical path gap is that `QUOTE_URL` in `site-data.ts` still points at the old WordPress quote page. Nothing else can progress until that constant is replaced with a real booking route or a properly embedded GHL flow.

---

## 4. Files to Change Next

All paths are relative to `projects/agw/website-review-build/`.

| File | Change Needed |
|---|---|
| `src/lib/site-data.ts` | Replace `QUOTE_URL` (line 5) with an internal route (e.g., `/get-a-quote`) once the booking page exists; or temporarily point to the GHL calendar URL directly |
| `src/app/layout.tsx` | Add GTM `<script>` tags (noscript fallback + main loader) in `<body>` immediately after opening tag, before existing inline scripts (lines 80–83 region) |
| `src/app/layout.tsx` | Add LeadConnector chat widget `<script>` tag at end of `<body>` (after line 115, before `</body>`) |
| `src/app/get-a-quote/page.tsx` | New file — intake form page; renders custom intake step followed by GHL calendar iframe |
| `src/components/ghl-calendar-embed.tsx` | New file — isolated component that renders the GHL calendar `<iframe>` and the `form_embed.js` `<Script>` tag; keeps iframe logic out of page files |
| `src/components/intake-form.tsx` | New file — controlled intake form (name, phone, email, project type, service area); fires `intake_submitted` dataLayer event on submit; does not wrap or interfere with the GHL calendar |

---

## 5. Recommended Implementation Order

Steps must be completed sequentially. Do not skip ahead.

1. **Clone the production GHL calendar** (GHL admin, not code)
   — Required before any booking changes reach production. All steps 5–8 test against the clone.

2. **Replace `QUOTE_URL` with a placeholder internal route**
   — File: `src/lib/site-data.ts`, line 5
   — Change: `QUOTE_URL = "/get-a-quote"`
   — Effect: CTAs now route internally. The booking page can be built without breaking anything live.

3. **Add GTM to `layout.tsx`**
   — File: `src/app/layout.tsx`, lines 80–86 region
   — Add standard GTM `<script>` snippet (container `GTM-W559QJ7C`) at top of `<body>`; add `<noscript>` iframe fallback immediately after
   — Verify GTM container fires in Preview mode before proceeding

4. **Add LeadConnector chat widget to `layout.tsx`**
   — File: `src/app/layout.tsx`, end of `<body>` before closing tag (~line 116)
   — Add `<Script strategy="afterInteractive">` block with the LeadConnector loader and widget ID `699ca6733303b66fe5e9d99c`
   — Confirm chat widget appears and connects in staging

5. **Build `ghl-calendar-embed.tsx`**
   — File: `src/components/ghl-calendar-embed.tsx` (new)
   — Renders the GHL calendar `<iframe>` with `src="https://link.agwilliamspainting.com/widget/booking/INZqRCM9fdZwZ6avSiny"` and the `form_embed.js` `<Script>` tag
   — Do not wrap in a `<form>` element
   — Test against cloned calendar URL first

6. **Build `intake-form.tsx`**
   — File: `src/components/intake-form.tsx` (new)
   — Fields: name, phone, email, project type (commercial/residential), service county
   — On submit: push `{ event: "intake_submitted", ... }` to `window.dataLayer`; show the `GhlCalendarEmbed` component in the next step
   — Validate in code; do not rely on browser defaults

7. **Build `src/app/get-a-quote/page.tsx`**
   — File: `src/app/get-a-quote/page.tsx` (new)
   — Step 1: renders `IntakeForm`
   — Step 2: after submission, renders `GhlCalendarEmbed`
   — Page metadata: canonical `/get-a-quote`, title "Get a Quote | A.G. Williams Painting"

8. **Wire GTM events in GTM container** (GTM admin, not code)
   — Create trigger: Custom Event, event name `intake_submitted`
   — Create trigger: postMessage or timer listening for GHL booking confirmation (see Section 6)
   — Create GA4 events: `intake_submitted`, `appointment_booked`
   — Test in GTM Preview against cloned calendar

9. **Configure intake-submitted GHL workflow** (GHL admin, not code)
   — Trigger: contact field write from intake submission (Pattern A) or a webhook from the Next.js route handler
   — Action: internal notification to customer care with intake details
   — Keep entirely separate from the existing appointment-booked automation

10. **Switch cloned calendar to production calendar after verification**
    — File: `src/components/ghl-calendar-embed.tsx`
    — Update `src` URL to production calendar ID once testing is complete

---

## 6. Event & Notification Flow

### Event layer

| User action | GTM event | GA4 event | Who receives it |
|---|---|---|---|
| Loads `/get-a-quote` | `page_view` (automatic) | `page_view` | Analytics only |
| Submits intake form | `intake_submitted` (dataLayer push) | `intake_submitted` | Analytics + GHL workflow |
| Completes GHL calendar booking | `appointment_booked` (postMessage from iframe) | `appointment_booked` | Analytics + existing GHL automation |
| Abandons after intake but before booking | Timeout / session-end trigger in GTM | — | GHL intake-submitted workflow handles follow-up |

### Notification flow

```
User submits intake form
    │
    ├─► dataLayer.push({ event: "intake_submitted" })
    │       └─► GTM fires intake_submitted tag → GA4
    │
    ├─► Write contact fields to GHL via webhook/API (Pattern A)
    │       └─► GHL workflow: intake-submitted automation fires
    │               └─► Internal notification to customer care (intake details only)
    │
    └─► IntakeForm shows GhlCalendarEmbed (step 2)
            │
            └─► User books appointment in GHL calendar iframe
                    │
                    ├─► GHL fires existing appointment-booked automation (unchanged)
                    │       └─► Customer care receives full appointment notification (current behavior preserved)
                    │
                    └─► iframe postMessage → GTM detects booking completion
                            └─► GTM fires appointment_booked tag → GA4
```

**Key constraint:** The intake-submitted and appointment-booked paths are entirely separate. The existing appointment-booked automation is never modified until a tested replacement is proven.

---

## 7. Rollback Risks & Operational Hazards

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| GHL calendar iframe stops firing appointment-booked trigger after page changes | Medium | High — customer care loses notifications | Always test against cloned calendar before touching production calendar URL; verify automation in GHL after any iframe URL change |
| `QUOTE_URL` is changed before `/get-a-quote` page is deployed | High (easy mistake) | High — all CTAs go to a 404 | Deploy the page before merging the `site-data.ts` change; or keep a temporary redirect at that route |
| LeadConnector script blocks page render | Low | Medium — site feels slow | Load with `strategy="afterInteractive"` in Next.js `<Script>`; never in `<head>` synchronously |
| GTM container fires on the wrong domain during staging | Medium | Low — pollutes analytics | Use GTM's built-in environment variables or a separate container ID for staging |
| Intake form validation is skipped or weak | Medium | Medium — junk leads in GHL | Validate required fields in code before submission; block submit on empty phone/email |
| CSS from the host page unintentionally hides GHL iframe | Medium | High — user cannot book | Use the GHL-provided `form_embed.js` for iframe resize; do not apply `overflow: hidden` or fixed height to the iframe wrapper |
| Intake-submitted GHL workflow fires duplicate notifications | Low | Medium — customer care confusion | Use GHL's contact deduplication; test workflow against a real contact before enabling |
| Calendar clone is never switched to production | Low | Low — new intake flow, old calendar URL in prod | Track the clone-to-production cutover as a blocking step; do not treat the deploy as done until this is confirmed |

---

## 8. What Can Wait Until After Launch

The following items are real requirements but do not block the core booking and analytics path. Defer until after V1 is live and operational.

- **Facebook customer chat** — Listed in the migration plan as a live-site widget; no active decision to preserve or replace it. Confirm with the client before implementing. Deferring does not affect booking or core analytics.

- **Hotjar or Microsoft Clarity** — Useful for session replay and heatmaps but not required for launch. Add after the first month of traffic data is available.

- **API-backed custom booking UI** — Replacing the GHL calendar iframe with a fully custom scheduling UI requires confirmed GHL API access, availability endpoint testing, and a proven backend path. This is a Phase 2 decision, not a V1 requirement.

- **GHL appointment modal Forms tab visibility** — Whether customer care needs intake answers visible inside the GHL appointment modal (Pattern B) versus contact custom fields (Pattern A) is an open operational question. Pattern A is sufficient for V1 and does not require restructuring the calendar-side form.

- **CMS integration for booking page copy** — The `/get-a-quote` page can be hand-authored in V1. CMS-driven content management for that page belongs in Phase 3 (CMS buildout).

- **Abandonment follow-up automation** — The intake-submitted GHL workflow in step 9 above handles the notification path. A timed abandonment follow-up sequence (e.g., 24-hour reminder if no appointment is booked) is a useful enhancement but is not required for launch.

- **GA4 conversion funnels and dashboard configuration** — GA4 events can be collected from day one with basic setup. Custom funnel reports, audience segments, and conversion goals can be configured once at least two weeks of post-launch data exists.
