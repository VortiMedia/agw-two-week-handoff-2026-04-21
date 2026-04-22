# AGW Session Context — 2026-04-21

Use this file to restart AGW work in a fresh session without rehydrating from chat.

## Source Of Truth

- Public repo: `https://github.com/VortiMedia/agw-two-week-handoff-2026-04-21`
- Canonical app: `projects/agw/website-review-build/`
- Reference/archive only: `projects/agw/live-site-reference/`

## Current Best Branch

- Preview-candidate branch: `agw-integration`
- Preview-candidate SHA: `531027f972483db7c0993b91508385dd15dc516c`

This branch passed the integrated QA gate and is the best functional baseline for new AGW work.

## What Was Completed Today

### Functional / operational work

- Preserved internal quote routing through `/get-a-quote`
- Preserved GTM bootstrap and quote CTA tracking
- Preserved LeadConnector chat
- Added utility routes:
  - `/about`
  - `/contact`
  - `/privacy-policy`
  - `/terms`
  - `/accessibility`
- Expanded sitemap to include current live routes
- Added page-specific metadata for commercial, residential, and heritage
- Scoped homepage JSON-LD to homepage only
- Optimized launch-critical homepage / route / social assets

### Reports / planning artifacts produced

- booking / analytics rollout plan
- performance asset plan
- SEO migration plan
- redirect seed map
- preview QA checklist
- launch blockers master
- release-gate status
- execution board
- integration-pass report
- homepage root-cause visual audit

These exist across branch work, not necessarily all on `main`.

## Branch Map

Use these branches as reference for what was done:

- `agw-codex-impl`
  - quote route ownership + GTM + CTA tracking
  - key SHA: `c404b445479a9413545229202d685fce89146035`

- `agw-performance-pass`
  - hero / OG image optimization
  - key SHA: `ead087b`

- `agw-utility-pages`
  - launch utility pages
  - key SHA: `2bc9cbe`

- `agw-preview-blockers`
  - metadata / JSON-LD / sitemap / typography pass
  - key SHA: `6004e9902d7b6993baeed17d832817b4c0e768f1`

- `agw-integration`
  - merged integration branch built from the four code branches above
  - key SHA: `531027f972483db7c0993b91508385dd15dc516c`

- `agw-root-audit`
  - homepage root-cause visual diagnosis
  - key SHA: `25ad7e1`

## QA Status

Integrated post-merge QA on `agw-integration` passed all critical checks:

- `/get-a-quote` exists
- quote CTAs route internally first
- bridge to GHL remains intact
- GTM present
- LeadConnector chat present
- utility pages exist
- page-specific metadata exists
- homepage JSON-LD is scoped correctly
- sitemap includes current live routes
- optimized images still referenced

Operational conclusion:

- Safe for preview: `YES`
- Safe for launch: `CONDITIONAL`
  - `/about`
  - `/privacy-policy`
  - `/terms`
  - `/accessibility`
  still need final real copy/legal content before production go-live

## Homepage / Visual Reset Status

Important: the major remaining problem is visual quality, not missing plumbing.

The homepage root-cause audit concluded:

- the visual system is generic and template-like
- repeated section grammar is the core failure
- the page overuses uppercase labels / kicker texture
- the palette is underdeployed
- the CTA treatment feels SaaS-default
- the hero is too passive
- the same systemic problems also appear on commercial / residential / heritage

### Accepted diagnosis

The diagnosis is correct: this is a system problem, not one isolated bad page.

### Rejected implementation

One attempted homepage visual rebuild was explicitly rejected for still looking like low-taste AI slop. Do not use a rejected visual pass as source of truth.

### Recommended visual sequence

1. Use `agw-integration` as functional baseline
2. Use `content/agw/reports/homepage-root-cause-audit.md` from `agw-root-audit` as design diagnosis
3. Rebuild homepage first as the visual reference implementation
4. Only then propagate the new system to:
   - commercial
   - residential
   - heritage
   - service-area

## Booking / GHL Direction

Do not conflate homepage visual reset with booking architecture.

### Current booking truth

- GHL remains the appointment system of record
- Existing appointment-booked automation must remain intact
- Current calendar embed:
  - iframe URL: `https://link.agwilliamspainting.com/widget/booking/INZqRCM9fdZwZ6avSiny`
  - script: `https://link.agwilliamspainting.com/js/form_embed.js`

### Recommended V1 booking architecture

Build a custom branded intake flow on `/get-a-quote` that:

1. validates in host-controlled code
2. captures attribution fields
3. pushes explicit `dataLayer` events
4. mirror-saves validated intake to Supabase
5. reveals the existing GHL calendar as the final step

### Important booking constraints

- Do not replace GHL as booking source of truth
- Do not rely on styling the internals of the GHL iframe
- Do not fire fake booking-complete events from the host page
- Supabase is mirror/logging only in V1
- Keep the calendar inline in the final step if possible

### Recommended V1 quote-flow event names

- `quote_step_view`
- `quote_step_complete`
- `quote_validation_error`
- `quote_intake_saved`
- `quote_handoff_to_calendar`
- `quote_calendar_loaded`
- `quote_phone_click`

Use `quote_intake_saved`, not `quote_submission_success`, so mirror-save does not get confused with a booked appointment.

## Best Existing Pattern To Reuse

The best reusable reference for validation / tracking discipline is not the current AGW iframe flow. It is the host-controlled landing-page pattern already documented in the internal AGW workspace.

High-value local references:

- `/Users/claw/.openclaw/workspace-vorti-main/projects/agw-website/src/components/site-event-tracker.tsx`
- `/Users/claw/.openclaw/workspace-vorti-main/projects/agw-website/src/components/site-integrations.tsx`
- `/Users/claw/.openclaw/workspace-vorti-main/projects/agw-website/docs/pace-lessons-structure.md`
- `/Users/claw/.openclaw/workspace-vorti-main/projects/agw-website/docs/gohighlevel-booking-research-2026-04-21.md`
- `/Users/claw/.openclaw/workspace-vorti-main/reports/landing-pages-analysis.md`

These establish:

- explicit `dataLayer` events
- client + server validation discipline
- attribution capture
- host-controlled step flow
- operational rule that iframe internals are not the long-term UX answer

## What A Fresh Session Should Do Next

Choose one workstream at a time.

### If continuing functional/product work

Start from `origin/agw-integration` and implement the V1 custom quote flow:

- custom intake
- Supabase mirror save
- final-step GHL calendar handoff

### If continuing visual work

Start from `origin/agw-integration` and use `agw-root-audit` report as the design source of truth for a homepage reference rebuild.

Do not start by redesigning all pages at once.

## Fresh-Session Bootstrap

For a fresh AGW session:

1. Pull the repo fresh
2. Read:
   - `CLAUDE_CODE_CONTEXT_PRIME.md`
   - `HANDOFF_FOR_OTHER_AI.md`
   - `content/agw/agw-session-context-2026-04-21.md`
   - `content/agw/agw-production-readiness-audit-2026-04-21.md`
   - `content/agw/agw-master-handoff-notes-2026-04-21.md`
   - `content/agw/ghl-booking-and-notification-strategy-2026-04-21.md`
3. Treat `agw-integration` as the operational baseline unless a newer integrated branch exists
4. Pick one thread only:
   - visual homepage reset
   - service-page propagation
   - custom quote/GHL flow

## One-Line Status

AGW is functionally preview-ready on `agw-integration`, but still needs a real visual system reset and a host-controlled custom quote flow to stop the homepage and booking experience from feeling generic and high-friction.
