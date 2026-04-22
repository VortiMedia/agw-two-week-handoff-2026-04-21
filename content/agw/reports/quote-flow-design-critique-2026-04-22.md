# Quote Flow Design Critique — 2026-04-22

Current state of `/get-a-quote` after porting the custom intake from
`agw-preserved-booking-flow`. The **behavior** is correct (host-owned
validation, dataLayer events, Supabase mirror, GHL handoff) — the
**visual layer** needs full rebuild in Phase 3B.

Location: `src/components/quote-intake-flow.tsx` (918 lines) + the
enclosing `src/app/get-a-quote/page.tsx`.

## What's wrong

### Bloated
- 918-line component, no section extraction — hero text, progress chrome, step shells, field components, review screen, GHL handoff, and error states all live in one file
- Every step renders inline legal copy, inline help text, and inline reassurance panels
- 5 steps where 2–3 would convert better (project type → basics → schedule handoff)
- Dense "nextSteps" and "assurances" blocks on the landing view compete with the CTA

### Not conversion-focused
- No visible progress bar / step indicator until deep in the flow
- CTA copy is generic ("Continue") — no forward-leaning benefit framing
- No trust anchor near the primary CTA (license number, warranty badge, star rating)
- No social proof on the intake page (testimonial snippet, review count, "trusted by X homeowners")
- Validation errors are inline but visually weak — easy to miss, no summary at submit
- No mobile-optimized field types (phone should trigger numeric keyboard, email should trigger email keyboard — these may be correct inputmode-wise but need audit)
- No autofocus on the first field of each step
- Final GHL handoff is visually indistinguishable from the intake — reads as "another form" instead of "we got you, just pick a time"

### Unresponsive
- Fixed-width grid assumptions inherited from the old nested-path build
- No mobile hamburger on the surrounding site shell for context (separate Phase 3D work)
- Field labels and help text stack awkwardly at <640px
- Step buttons overflow on small viewports
- No `@container` queries for card-internal responsiveness

### Unstylized
- Uses pre-design-system styles from the old implementation
- No Playfair Display headlines, no Poppins UI type
- No `--agw-blue` / `--agw-celeste` / `--agw-ivory` tokens — uses ad-hoc Tailwind utilities
- No warm shadows, no proper radii, no branded spacing rhythm
- Looks generic — nothing about it says "A.G. Williams, est. 1906"

## What good looks like (reference)

`design-system/project/ui-kit/marketing-site.html` estimate-form section
(search for `.estimate` and `.form-grid` in that file). Specifically:

- Two-column layout: left column sells the transaction (eyebrow, display headline with italic blue `<em>`, 3 pillars with icons), right column is the form card
- Form card sits on ivory surface with `--shadow-md`, radius `--radius-md` (8px)
- "We reply in 24 hrs" pill at the top-right of the form — reassurance tied to a promise
- Field grid: 2-column at desktop, 1-column at mobile, `.field.full` spans for addresses and messages
- Chip picker for project-type / scope — tactile, visible state, no hidden radios
- Submit CTA is the only primary button on the page, tight hit area, hover lift
- Disclaimer copy sits under the CTA in 12–13px Poppins — present but not heavy

## Rebuild priorities when Phase 3B reaches this component

1. **Shrink to 2 steps** — (a) project + contact, (b) GHL calendar. The current 5-step flow is justified only if it demonstrably improves qualification; V1 doesn't need to prove that.
2. **Make the progress state obvious** — 2-dot step indicator, labeled, at the top of the form card
3. **Put trust anchors next to the CTA** — license numbers (NY HIC #11842, CT HIC.0649371), 5-year warranty badge, 4.9★ rating, not stacked at the page footer
4. **Token-only styling** — every color, radius, shadow, font resolves to a `--agw-*` variable or font-family alias from `next/font`
5. **Split the file** — `QuoteIntakeShell`, `StepProjectType`, `StepContact`, `StepHandoff`, `QuoteTrustRow`, `QuoteFieldError`, `QuoteProgress` — each a tested unit under 200 lines
6. **Mobile-first** — design the 375px breakpoint first, then scale up
7. **Keep the dataLayer contract identical** — no event renames, no payload shape drift. Analytics must continue uninterrupted.
8. **Keep the Supabase mirror contract identical** — same table, same fields, same lifecycle states. Backend untouched.

## Do not touch during re-skin

- `src/lib/quote-flow.ts` — validation, attribution, event contract (pure, reuse as-is)
- `src/app/api/quote-intake/route.ts` — server validation and Supabase mirror (backend logic, stable)
- GHL embed ID, booking URL, and handoff sequence
- DataLayer event names and payload shape

The re-skin is a visual + UX rebuild of `quote-intake-flow.tsx` only.
