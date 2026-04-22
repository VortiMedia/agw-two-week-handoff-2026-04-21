# Custom Booking Flow Reference

Date: 2026-04-21

## Reusable Landing-Page Pattern Being Copied

The AGW quote rebuild uses the same practical landing-page pattern that already proved safer elsewhere:

- host-owned multi-step intake instead of a raw embedded form
- validation controlled in site code before progression
- explicit `dataLayer` events for real milestones instead of vague passive tracking
- attribution captured once and carried through the flow
- downstream handoff kept operationally conservative

In this pattern, the site owns the intake, pacing, validation, attribution, and milestone tracking. GHL still owns the appointment record.

## Validation Contract

Required fields:

- `full_name`
- `email`
- `phone`
- `town`
- `project_type`

Normalization rules:

- trim text fields
- lowercase and trim `email`
- normalize `phone` to a sane US display value after digit cleanup
- reject invalid option values for controlled select/radio fields

Behavior rules:

- block step progression on current-step validation failure
- block mirror save until the full intake validates
- keep the calendar hidden until the mirror save succeeds
- show readable inline validation errors

## DataLayer Contract

Required events:

- `quote_step_view`
- `quote_step_complete`
- `quote_validation_error`
- `quote_intake_saved`
- `quote_handoff_to_calendar`
- `quote_calendar_loaded`
- `quote_phone_click`

Expected payload shape:

- always include page context from the host tracker
- include `step_name` on step-based events
- include useful non-PII routing fields when available:
  `project_type`, `property_type`, `timeline`, `town`, `has_notes`, `lead_source`, `utm_*`

Important naming rule:

- `quote_intake_saved` means the validated intake was mirrored successfully
- it does not mean an appointment was booked

## Attribution Fields

Captured once on first client render and carried through the flow:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `page_url`
- `submission_time`
- `lead_source`

The site carries these fields through mirror save and quote-flow events. V1 does not try to push them into the GHL iframe.

## Safe GHL Handoff Strategy

V1 handoff sequence:

1. validate the full intake in host-controlled code
2. mirror save the normalized payload to Supabase
3. fire `quote_intake_saved`
4. fire `quote_handoff_to_calendar`
5. switch to the final booking step
6. render the inline GHL calendar embed
7. when the iframe loads, update `calendar_handoff_status` to `loaded`
8. fire `quote_calendar_loaded`

Operational guardrails:

- keep the same production GHL calendar URL
- keep the same GHL embed script
- keep GHL as the appointment source of truth
- do not attempt to style iframe internals as the core solution
- do not introduce a fake booking-complete event in V1

## Mirror-Save Layer

Supabase is used only as a mirror/logging layer in V1.

Mirror-save goals:

- preserve abandonment visibility between intake completion and booking
- support debugging and attribution analysis
- provide a host-controlled save milestone before calendar handoff

Lifecycle field:

- `calendar_handoff_status`
  - default: `pending`
  - update to `loaded` when the calendar iframe loads
  - reserve any future `completed` state for a later pass with a trustworthy booking confirmation signal

## Intentionally Deferred

- writing intake fields into GHL contact custom fields
- changing or removing any remaining calendar-side form dependency inside GHL
- API-backed custom booking or availability control
- internal backup notifications for intake-only leads
- booked-appointment confirmation tracking from the host page
- any attempt to treat Supabase as the appointment system of record
