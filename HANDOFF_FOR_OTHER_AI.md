# AGW Handoff For Other AI

This repository is the GitHub handoff point for the A.G. Williams workstream. Use GitHub as the source of truth and do not keep parallel local app copies drifting apart.

## Repo

- Repository: `https://github.com/VortiMedia/agw-two-week-handoff-2026-04-21`
- Base branch: `main`
- Previous confirmed checkpoint before this handoff note: `2ef73085e1c9d8159fdd64a337d81fc3fc50e746`

## First Rules

1. Clone or pull the GitHub repo fresh.
2. Treat `projects/agw/website-review-build/` as the canonical app.
3. Treat `projects/agw/live-site-reference/` as archive/reference unless explicitly needed.
4. Do not edit both app copies in parallel.
5. Push often so handoff between systems stays clean.

## Pull Fresh

```bash
git clone https://github.com/VortiMedia/agw-two-week-handoff-2026-04-21.git
cd agw-two-week-handoff-2026-04-21
git checkout main
git pull origin main
```

## Working Branch Rule

```bash
git checkout -b agw-next-pass
```

Use a branch for each implementation pass and merge back after verification.

## Important Files

- `CLAUDE_CODE_CONTEXT_PRIME.md`
- `content/agw/agw-production-readiness-audit-2026-04-21.md`
- `content/agw/agw-master-handoff-notes-2026-04-21.md`
- `content/agw/ghl-booking-and-notification-strategy-2026-04-21.md`
- `AGW_Website_Brand_Reference.docx`
- `claude-design/`
- `projects/agw/website-review-build/`
- `skills/`

## Canonical App

- Canonical app: `projects/agw/website-review-build/`
- Purpose: active implementation base for the next production-readiness pass
- `live-site-reference/` is useful for comparison, content recovery, and production reference only

## What Has Already Been Decided

- GitHub should be the handoff point between machines and models.
- `website-review-build` is the app to build on.
- `live-site-reference` should not be evolved in parallel.
- AGW brand authority comes from `AGW_Website_Brand_Reference.docx` plus the `claude-design/` bundle and brand assets already placed in the repo.
- The current GHL booking/calendar automation should not be broken just to improve front-end UX.

## GHL Strategy

Read `content/agw/ghl-booking-and-notification-strategy-2026-04-21.md` before changing booking.

Short version:

- Safest V1 is `custom intake step -> GHL calendar embed as final step`
- Do not literally wrap the calendar iframe inside a native HTML form
- Keep GHL as source of truth for the appointment in V1
- Protect the existing customer-care notification automation
- Clone the calendar before changing production booking behavior

## Customer Care Constraint

Do not disrupt booking notifications.

If booking flow changes:

- preserve the current GHL appointment-booked automation until replacement is proven safe
- add a separate intake-submitted notification path if a custom form is added before the calendar
- confirm what customer care needs to see in the appointment view versus contact custom fields

## Skills Bundle

The `skills/` folder in this repo is the uploaded copy of the local custom skills bundle from the OpenClaw environment. Use it as reference material for how the build system has been structured across projects.

## Recommended Next Pass

1. Read the production-readiness audit.
2. Read the master handoff notes.
3. Read the GHL booking strategy doc.
4. Normalize brand usage inside `website-review-build`.
5. Consolidate repo duplication only where safe.
6. Execute the next production-readiness pass on the canonical app.

## Commit / Push Pattern

```bash
git add .
git commit -m "Describe the change"
git push -u origin agw-next-pass
```
