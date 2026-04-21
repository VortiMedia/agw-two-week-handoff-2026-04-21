# AGW Website Revision Log

Prepared for: A.G. Williams Painting  
Prepared by: Kit  
Date: 2026-04-16  
Reference preview: `https://agw-website-gyqqw528k-david-matys-projects.vercel.app`

## Purpose

This document converts PJ's April 16, 2026 round-one feedback into a production revision brief for the next AGW build pass.

It is intended to:

- record what was flagged
- identify what is already confirmed on the live preview
- define the revision work needed before the next client-safe review
- keep the real-logo / real-assets swap tied to the design pass instead of bolted on later

## Source Inputs

- PJ feedback memo dated April 16, 2026
- Live preview review of `/` and `/commercial`
- Local real logo asset at [ag-williams-logo.jpg](/Users/claw/.openclaw/workspace-kit/assets/ag-williams-logo.jpg)
- Prior uploaded AGW brand kit context already recovered in MemoryRouter:
  - logo package
  - icon package
  - Poppins font files
  - brand reference PDFs
  - risky imagery already flagged for manual approval

## Current Build Status

Confirmed live:

- Homepage is live
- Commercial page is live at `/commercial`

Confirmed gap:

- Residential page draft referenced in feedback is not currently live at `/residential`
- Current preview still contains internal strategy language and placeholder copy on live pages
- Real AGW logo is not yet applied in the current preview

## Revision Summary

The current draft has the right broad direction, but it still reads like a strategy prototype instead of a client-ready website. The next pass should focus on four things first:

1. replace placeholder brand treatment with the real AGW identity
2. tighten hierarchy and font weights across the entire site
3. remove internal/scoping copy so every section reads as customer-facing
4. resolve structural issues on the commercial and residential flows before deeper content refinements

## Site-Wide Revisions

### 1. Typography Weight Correction

Issue:

- Body copy is rendering too heavy across the site
- This is especially visible in paragraph copy, service descriptions, footer links, and FAQs

Revision:

- Step all default body copy down to `400` or `500`
- Reserve `600+` for headings, labels, and actual emphasis only
- Audit paragraph, list, footer, accordion, and CTA support text styles globally instead of fixing page by page

Priority: High

### 2. Brand Color Standardization

Approved palette from client feedback:

- Primary: `#0063b0`
- Secondary: `#6CBBE8`
- White accent: `#f9f8f2`
- Gray accent: `#595953`

Revision:

- Normalize all blues, grays, and off-whites to this set
- Remove any accidental gray drift in footer and body text
- Rework bullet + text pairings so contrast feels deliberate rather than decorative

Priority: High

### 3. Top Callout Strip Logic

Issue:

- Generic service-area line is using premium space above the nav

Revision:

- Residential pages: show `5-year warranty`
- Commercial pages: show `Licensed & insured`
- Keep geography elsewhere on-page, not in the highest-attention strip

Priority: High

### 4. Real Asset Swap

Issue:

- Current draft is still operating without the full real AGW visual system applied

Revision:

- Replace placeholder mark with the real AGW logo
- Pull approved icons and fonts from the uploaded asset set
- Use only approved photography / brand-reference materials
- Exclude any image that implies unsafe ladder use, sketchy jobsite behavior, or insurance-risk visuals unless explicitly approved

Priority: High

## Homepage Revisions

### 1. Remove Strategy-Layer Copy

Confirmed on live preview:

- Sections still use internal framing like:
  - `The homepage should move high-intent visitors quickly.`
  - `The conversion layer should be clean.`
  - `The richer proof should be waiting one click deeper.`

Revision:

- Rewrite all internal planning language into customer-facing copy
- Keep the strategic intent, but never expose planning notes in production

Priority: Critical

### 2. Trust Signal Handling

Confirmed on live preview:

- Homepage currently stacks multiple trust signals into one compressed line

Revision:

- Preserve trust signals, but distribute them with better spacing and hierarchy
- Avoid visual compression that makes them read like metadata

Priority: Medium

## Commercial Page Revisions

### 1. Hero Section

Client feedback:

- H1 is too large
- Duplicate `Schedule Your Walkthrough` CTA appears twice
- Remaining hero buttons should be centered

Revision:

- Reduce H1 scale so it leads rather than dominates
- Remove redundant CTA instance
- Center remaining CTA group to match downstream layout logic

Priority: High

### 2. "Where AGW Should Feel Strong" Box

Client feedback:

- Keep as-is

Revision:

- Preserve structure and emphasis
- Only refine typography and brand styling if needed

Priority: Low

### 3. Service Lines Section

Confirmed on live preview:

- Heading hierarchy is oversized
- Body copy remains too heavy
- Placeholder/scoping tone still appears in heading and body copy

Revision:

- Reduce section heading size
- Tighten spacing between section heading, subheads, and body copy
- Rewrite all service-line intro copy into production language
- Replace blue-bullet / gray-text combination with a cleaner brand pairing, likely:
  - bullet/icon in `#0063b0`
  - text in `#595953` only if contrast remains strong enough on the chosen background
  - otherwise use darker body copy with blue used as accent only

Priority: High

### 4. Thought Leadership / Editorial Placeholder Content

Confirmed on live preview:

- Repeated placeholder language appears under future article ideas:
  - `Each topic can become a future case study...`

Revision:

- Replace with real teaser copy or remove section until content exists
- Do not expose future-content scaffolding on client review links

Priority: Critical

## Residential Page Revisions

### 1. Route Availability

Confirmed on live preview:

- `/residential` currently returns `404`

Revision:

- Confirm intended residential page route
- Publish a working residential page before the next review round

Priority: Critical

### 2. "First Call Clarity / The Next Step Is a Walkthrough"

Client feedback:

- Boxes do not feel cohesive
- Likely missing imagery
- Links and phone numbers have contrast failures on dark blue backgrounds

Revision:

- Rebuild the section as a unified trust/contact block
- Correct text/link contrast to accessible values
- Add imagery or graphic support only if it improves cohesion without creating visual clutter

Priority: Critical

### 3. Local FAQs

Client feedback:

- Layout is good
- Paragraph weight is too heavy

Revision:

- Keep structure
- Reduce paragraph weight
- Confirm open/closed accordion states maintain accessible contrast

Priority: Medium

## Footer Revisions

Client feedback:

- Gray tones are inconsistent
- Some elements look clickable without confirmed links
- Font weight is too heavy

Revision:

- Normalize footer gray to approved brand gray
- Verify every visually interactive element has a real destination
- Remove dead-link styling
- Reduce footer type weight to match site-wide body rules

Priority: High

## Placeholder Copy Cleanup

Critical issue confirmed on live preview and commercial page:

- Internal strategy notes are still rendered as public copy

Examples observed:

- `This is where AGW should speak directly to owners, facility directors, and general contractors...`
- `Where AGW should feel strong`
- `Each topic can become a future case study...`

Revision:

- Perform a full placeholder-language audit before any next client review
- Remove all planning-language remnants from homepage, commercial page, and residential page

Priority: Critical

## Real Asset Implementation Notes

Use in the next pass:

- Real AGW logo instead of placeholder/temporary branding
- Approved Poppins weights with explicit font-weight control
- Approved icons from the uploaded AGW package
- Approved brand references only

Do not use without approval:

- ladder imagery
- unsafe jobsite photos
- generic stock images that make the company look noncompliant or cheap

## Recommended Execution Order

1. Apply real logo, fonts, icons, and palette globally
2. Fix typography scale and weight tokens site-wide
3. Remove all placeholder/internal copy
4. Correct commercial hero and service-line hierarchy
5. Stand up the residential page properly and fix the contact/trust block
6. Audit footer links and contrast
7. Run final visual QA on desktop + mobile before next review link

## Definition Of Done For Round 2

The next AGW review build should meet this bar:

- real AGW branding is applied
- no placeholder/scoping copy remains
- commercial and residential pages are both live
- typography weights are corrected globally
- trust strip is page-specific
- footer is visually consistent and fully linked
- no accessibility failures on dark backgrounds
- no risky / insurance-problem imagery is present
