# Custom Booking Flow Pass

## Starting SHA

- `531027f972483db7c0993b91508385dd15dc516c`

## Files Changed

- `projects/agw/website-review-build/src/app/get-a-quote/page.tsx`
- `projects/agw/website-review-build/src/app/api/quote-intake/route.ts`
- `projects/agw/website-review-build/src/components/quote-intake-flow.tsx`
- `projects/agw/website-review-build/src/lib/quote-flow.ts`
- `projects/agw/website-review-build/src/lib/site-data.ts`
- `content/agw/reports/custom-booking-flow-pass.md`

## Flow Structure

- Rebuilt `/get-a-quote` from a thin bridge page into a branded AGW intake experience with strong copy, reassurance panels, and a hosted multi-step form.
- Flow steps:
  - `contact`: name, email, phone
  - `project`: town, project type, property type
  - `details`: timeline, notes
  - `booking`: final embedded GHL calendar step
- Added visible progress state with numbered step cards and active/completed status so users can tell where they are in the quote path.
- Kept Pelham office fallback visible inside the page and inside the form shell so the quote lane can still route safely when a project needs clarification before booking.
- Updated `/get-a-quote` shell CTAs to continue into the custom quote flow on-page instead of bypassing straight into the live booking URL.

## Validation Logic

- Added shared quote-flow utilities in `src/lib/quote-flow.ts` so client and server use the same option sets, normalization rules, and validation rules.
- Client validation runs before every step transition.
- Server validation runs again in `POST /api/quote-intake` before the calendar handoff step opens.
- Normalization implemented:
  - email: trim + lowercase
  - phone: strip non-digits and normalize valid US numbers to `(###) ###-####`
  - text inputs: trim + collapse repeated whitespace
- Validation implemented:
  - required name with length bounds
  - required valid email
  - required 10-digit phone
  - required town with length bounds
  - required allowed-value selection for project type, property type, and timeline
  - optional notes capped at 1,200 characters
- Validation errors are rendered inline and also surfaced through a top-level error banner when the server blocks the handoff.

## GTM / DataLayer Events Added

- Events are pushed through the existing host-controlled tracker contract in `layout.tsx` using `window.agwPushEvent` with a dataLayer fallback.
- Added or preserved these quote-flow events:
  - `quote_route_view`
  - `quote_step_view`
  - `quote_step_complete`
  - `quote_validation_error`
  - `quote_handoff_to_calendar`
  - `quote_calendar_loaded`
- Event payloads intentionally avoid raw PII.
- Quote analytics payloads only include non-sensitive routing context such as:
  - project type
  - property type
  - timeline
  - whether notes are present
  - whether a town value is present

## GHL Handoff Design

- The final step still uses the current production GHL booking URL:
  - `https://link.agwilliamspainting.com/widget/booking/INZqRCM9fdZwZ6avSiny`
- The current GHL embed script is still used on the final step:
  - `https://link.agwilliamspainting.com/js/form_embed.js`
- The custom intake does not attempt to style the internals of the iframe as the primary UX strategy.
- The custom intake does not replace GHL as the booking system of record.
- The final step also includes a direct new-tab fallback to the same live booking URL in case the embed fails on a specific browser/session.
- This design preserves the existing appointment-booked automation because the actual appointment continues to be created through the same GHL calendar backend.

## What Was Intentionally Deferred

- Writing custom intake answers into GHL contact custom fields or appointment metadata
- Intake-submitted-but-not-booked notifications
- Abandonment follow-up automation
- Any cloned-calendar operational rollout/testing in GHL itself
- Removing any remaining calendar-side workflow form dependencies inside GHL
- Styling or reverse engineering iframe internals

## Verification Results

- `cd projects/agw/website-review-build && npm install`
  - passed on local default Node `18.18.2`
  - produced expected engine warnings because Next `16.2.3` targets Node 20+
- `npm run lint`
  - passed
- `npx -y node@20.11.1 ./node_modules/next/dist/bin/next build`
  - first run failed because Tailwind optional native binding was missing
- `npm install --no-save @tailwindcss/oxide-darwin-arm64@4.2.2`
  - passed
- `npx -y node@20.11.1 ./node_modules/next/dist/bin/next build`
  - passed

## Outcome

- `/get-a-quote` is now a branded custom intake flow rather than a bridge CTA page.
- Validation is controlled in host-owned client and server code.
- Meaningful quote-flow analytics events now exist.
- The final step safely hands off into the current live GHL calendar path without changing booking system ownership or appointment-booked automation.
