# GHL Booking And Notification Strategy

Date: 2026-04-21

This is the current booking strategy note for AGW so the next implementation pass does not accidentally break operations.

## Current Inputs

### Chat widget

```html
<script src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" data-widget-id="699ca6733303b66fe5e9d99c"></script>
```

### Form embed currently in use

- Form ID: `QJKUxOOQI1YWHYNSsN5F`
- Base link host: `https://link.agwilliamspainting.com`

### Calendar embed currently in use

```html
<iframe src="https://link.agwilliamspainting.com/widget/booking/INZqRCM9fdZwZ6avSiny" style="width: 100%;border:none;overflow: hidden;" scrolling="no" id="INZqRCM9fdZwZ6avSiny_1776804477635"></iframe><br><script src="https://link.agwilliamspainting.com/js/form_embed.js" type="text/javascript"></script>
```

Permanent link:

- `https://link.agwilliamspainting.com/widget/booking/INZqRCM9fdZwZ6avSiny`

## Recommended V1

Use a two-step flow:

1. custom intake step
2. GHL calendar embed as final booking step

That means:

- build the custom UX for the intake form
- keep GHL handling the actual appointment booking
- keep the current booking automation safe while the new front-end is introduced

## What Not To Do

- do not literally nest the calendar iframe inside a native HTML form
- do not remove the calendar-side form from production without testing the whole booking chain on a cloned calendar
- do not assume the host page can visually fix the calendar/form iframe internals with ordinary CSS

## Notification Strategy

The customer-care team already has an appointment automation that is easy to recreate, but the safer move is not to recreate it first.

Protect the current automation by:

- keeping the same GHL calendar backend
- keeping the same appointment-booked trigger in V1
- testing on a cloned calendar before changing production behavior

## Suggested Ops Model

### Booked appointment path

- keep existing GHL automation for appointment-booked notifications
- confirm customer care still receives all appointment details they use today

### Intake submitted but not booked path

- create a separate internal notification path from the custom intake form
- this catches leads who submit intake but abandon before booking

### Abandonment follow-up

- if custom intake is submitted and no booking happens within the chosen window, trigger internal follow-up or automated reminder

## Important Visibility Constraint

If customer care needs form answers visible inside the appointment modal’s Forms tab in GHL, that feature is tied to GHL custom forms attached to calendars.

That means there are two workable patterns:

### Pattern A: safer operationally

- custom site intake writes to contact custom fields
- booking still happens via GHL calendar
- notifications pull from contact fields and appointment details

### Pattern B: more native to GHL appointment modal

- use a minimal GHL custom booking form attached to the calendar
- rely on GHL’s built-in form visibility inside appointment details
- custom site form may still exist, but the calendar-side form remains important

## Best Rollout

1. clone the production calendar
2. attach changes to the cloned calendar first
3. test custom intake to contact-field write
4. test calendar booking through the cloned calendar
5. verify the existing internal appointment automation still fires correctly
6. verify what customer care can see in the booked appointment
7. only then decide whether to reduce or remove the calendar-side form

## Why This Strategy Won

- it improves UX without forcing a full API booking rebuild first
- it preserves the safest part of the current operations flow
- it gives room for a later API-backed booking UI if needed
- it avoids breaking customer-care notifications during the design pass
