# Custom Booking Flow Pass

Date: 2026-04-21

## Starting Point

- Worktree: `/Users/david/agw-booking-flow`
- Branch: `agw-booking-flow`
- Starting SHA for this implementation pass: `141cbeb8cf21101b7358c873d0f379acf3f19028`

## Files Changed In This Pass

- `content/agw/reports/custom-booking-flow-reference.md`
- `content/agw/reports/custom-booking-flow-pass.md`
- `projects/agw/website-review-build/src/app/get-a-quote/page.tsx`
- `projects/agw/website-review-build/src/components/quote-intake-flow.tsx`
- `projects/agw/website-review-build/src/lib/quote-flow.ts`
- `projects/agw/website-review-build/src/app/api/quote-intake/route.ts`

## Flow Structure

- `/get-a-quote` is now a branded AGW intake and booking flow instead of a thin bridge page.
- Step order is:
  - `project_details`
  - `contact_details`
  - `project_notes`
  - `book_consultation`
- The final booking step keeps the GHL calendar inline inside the flow.
- Pelham office fallback stays visible on-page and inside the intake shell.

## Validation Added

- Host-controlled validation runs before every step transition.
- Full-form validation runs again before the mirror save and calendar handoff.
- Implemented required fields:
  - `full_name`
  - `email`
  - `phone`
  - `town`
  - `project_type`
- Implemented normalization:
  - trim all text fields
  - lowercase and trim `email`
  - normalize `phone` to a sane US display format after digit cleanup
- Implemented controlled-value validation for:
  - `project_type`
  - `property_type`
  - `timeline`
- `property_type`, `timeline`, and `notes` stay optional in V1, but junk values are rejected.
- Calendar handoff stays blocked until the full intake validates and the mirror save succeeds.

## Event Contract Added

- Added explicit quote-flow events through the existing `agw-integration` `window.agwPushEvent` baseline:
  - `quote_step_view`
  - `quote_step_complete`
  - `quote_validation_error`
  - `quote_intake_saved`
  - `quote_handoff_to_calendar`
  - `quote_calendar_loaded`
  - `quote_phone_click`
- `quote_intake_saved` now represents only the successful Supabase mirror-save milestone.
- No fake booked-appointment event was introduced in V1.

## Attribution Fields Captured

- Captured once on first client render and carried through save + tracking:
  - `utm_source`
  - `utm_medium`
  - `utm_campaign`
  - `utm_content`
  - `utm_term`
  - `page_url`
  - `submission_time`
  - `lead_source`

## Mirror Save And GHL Handoff

- Added `POST /api/quote-intake` to mirror the normalized intake to Supabase before booking.
- Supabase remains a mirror/logging layer only and does not replace GHL as the appointment system of record.
- Added `calendar_handoff_status` to the mirror record lifecycle:
  - initial save: `pending`
  - first iframe load: `loaded`
- Added `PATCH /api/quote-intake` so the inline calendar load updates the existing mirror record.
- Kept the same production GHL booking URL:
  - `https://link.agwilliamspainting.com/widget/booking/INZqRCM9fdZwZ6avSiny`
- Kept the same GHL embed script:
  - `https://link.agwilliamspainting.com/js/form_embed.js`
- The flow does not prefill or attempt to control the GHL iframe internals.
- The flow does not redirect or open a new window by default.

## Verification Results

- `cd projects/agw/website-review-build && npm install`
  - passed on local default Node `18.18.2`
  - produced expected engine warnings because Next `16.2.3` targets Node 20+
- `npm run lint`
  - passed
- `npx -y node@20.11.1 ./node_modules/next/dist/bin/next build`
  - passed

## Outcome

- `/get-a-quote` now owns intake validation, attribution capture, mirror-save, and milestone tracking in host-controlled code.
- The live appointment still books through the current GHL calendar backend, which keeps the current appointment automation path intact.
