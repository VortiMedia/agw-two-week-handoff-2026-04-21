# AGW Site Audit — 2026-04-17

Project audited: `/Users/claw/.openclaw/workspace-vorti-main/projects/agw-website`

Rendered with Playwright against local production server. Screenshots captured from:
- `tmp/agw-audit/home-desktop.png`
- `tmp/agw-audit/home-mobile.png`
- `tmp/agw-audit/commercial-desktop.png`
- `tmp/agw-audit/residential-desktop.png`
- `tmp/agw-audit/heritage-desktop.png`
- `tmp/agw-mobile-home-top.png`
- `tmp/agw-mobile-commercial-top.png`
- `tmp/agw-mobile-residential-top.png`

## Brutal Summary

The codebase is mostly intact. The site is failing because the page composition is wrong, the hierarchy is weak, the cards all feel like the same component wearing different colors, and mobile is under-directed. The commercial page is the closest to usable. The homepage is the worst offender because it tries to sell heritage, quote flow, local office, review proof, map proof, FAQs, and service segmentation with almost no visual discipline.

## Priority Findings

### Critical

1. **Mobile header is visibly broken and duplicating the top-strip badge.**
   Evidence:
   - `tmp/agw-mobile-home-top.png`
   - `tmp/agw-mobile-commercial-top.png`
   - `tmp/agw-mobile-residential-top.png`
   Cause:
   - [globals.css](/Users/claw/.openclaw/workspace-vorti-main/projects/agw-website/src/app/globals.css:166) forces `.top-strip-badge` to `display: inline-flex`, which overrides Tailwind's `hidden`.
   - [site-shell.tsx](/Users/claw/.openclaw/workspace-vorti-main/projects/agw-website/src/components/site-shell.tsx:31) intends one mobile eyebrow and one desktop badge, but mobile renders both.
   Fix:
   - Remove `display` from the shared `.top-strip-badge` CSS rule or split the badge styling from display behavior.

2. **The `Service Area` nav link is dead.**
   Evidence:
   - [site-data.ts](/Users/claw/.openclaw/workspace-vorti-main/projects/agw-website/src/lib/site-data.ts:26) links to `/#service-area`.
   - No `id="service-area"` exists on the homepage.
   Fix:
   - Add a real `service-area` anchor to the counties section or remove the nav item until the section exists.

3. **Homepage mobile above-the-fold is proportionally wrecked.**
   Evidence:
   - `tmp/agw-mobile-home-top.png`
   What is wrong:
   - The headline is too large for the mobile measure and breaks into a tall blue wall.
   - The brand strip and nav eat too much vertical space before the actual pitch starts.
   - The first screen looks like stacked UI fragments instead of a clear conversion moment.
   Fix:
   - Cut the hero headline size on mobile.
   - Reduce header stack height.
   - Move to one primary CTA and one support action above the fold.

### High

4. **The homepage hero is structurally lopsided.**
   Evidence:
   - `tmp/agw-audit/home-desktop.png`
   - [page.tsx](/Users/claw/.openclaw/workspace-vorti-main/projects/agw-website/src/app/page.tsx:52)
   What is wrong:
   - Left column is just text and pills.
   - Right column stacks a form card and a shallow blue office card.
   - The whole thing feels like two unrelated layouts glued together.
   Fix:
   - Pick one hero frame: either trust-led with strong image/proof, or quote-led with a cleaner single conversion module.
   - Stop stacking multiple competing right-rail cards above the fold.

5. **The site overuses the same rounded white-card language until everything feels templated.**
   Evidence:
   - `tmp/agw-audit/home-desktop.png`
   - `tmp/agw-audit/residential-desktop.png`
   - `tmp/agw-audit/commercial-desktop.png`
   - [page.tsx](/Users/claw/.openclaw/workspace-vorti-main/projects/agw-website/src/app/page.tsx:184)
   What is wrong:
   - Nearly every section resolves to white/beige cards with the same radius, shadow, and padding rhythm.
   - Repetition kills hierarchy and makes the page feel generated instead of designed.
   Fix:
   - Collapse duplicate card families.
   - Vary section construction: one strong image-led section, one proof band, one text-heavy split section, one CTA band.

6. **Proof elements are too small and too decorative to build trust.**
   Evidence:
   - `tmp/agw-audit/home-desktop.png`
   - `tmp/agw-audit/commercial-desktop.png`
   What is wrong:
   - Certifications and review logos read like garnish.
   - They are not large enough or contextual enough to function as proof.
   Fix:
   - Replace tiny floating badge boxes with one real trust block that includes a short claim, one or two legible logos, and one concrete review/stat.

7. **Imagery is being used like filler, not as persuasion.**
   Evidence:
   - `tmp/agw-audit/home-desktop.png`
   - `tmp/agw-audit/heritage-desktop.png`
   - `tmp/agw-audit/residential-desktop.png`
   What is wrong:
   - Homepage team photo is crushed into a banner strip.
   - Heritage hero uses a noisy branded mockup instead of a convincing historical or team image.
   - Residential hero leans on a warranty seal as the main art object, which feels placeholder-level.
   Fix:
   - Use real property, team, or archival imagery.
   - Let at least one image earn space instead of forcing every visual into a badge/card frame.

8. **The homepage section rhythm is incoherent.**
   Evidence:
   - `tmp/agw-audit/home-desktop.png`
   What is wrong:
   - Heritage/trust, dual service paths, process, map/reviews, and FAQ/CTA all have similar weight.
   - The page never establishes one dominant storyline.
   Fix:
   - Rebuild the homepage around a clear order:
     1. trust + scope
     2. residential/commercial split
     3. how work starts
     4. local proof
     5. CTA + FAQ

9. **Mobile navigation is cramped and low-utility.**
   Evidence:
   - `tmp/agw-mobile-home-top.png`
   - [site-shell.tsx](/Users/claw/.openclaw/workspace-vorti-main/projects/agw-website/src/components/site-shell.tsx:59)
   What is wrong:
   - Horizontal nav tabs consume space without helping conversion.
   - Mobile has no always-visible call button or sticky CTA.
   Fix:
   - Simplify mobile header to logo + call/quote action.
   - Move full nav into a compact menu or trim it hard.
   - Add a sticky mobile quote/call bar.

10. **Typography is elegant in isolation but mis-sized in practice.**
    Evidence:
    - `tmp/agw-mobile-home-top.png`
    - `tmp/agw-audit/home-desktop.png`
    - [globals.css](/Users/claw/.openclaw/workspace-vorti-main/projects/agw-website/src/app/globals.css:81)
    What is wrong:
    - The serif display face is good, but the headlines are oversized relative to the narrow measures.
    - Some sections become giant blue text blocks with weak supporting structure.
    Fix:
    - Reduce hero and section heading scale on mobile.
    - Shorten headline copy where possible.
    - Tighten the ratio between display type and body copy.

### Medium

11. **The homepage estimate card looks generic, not premium or trustworthy.**
    Evidence:
    - `tmp/agw-audit/home-desktop.png`
    - [page.tsx](/Users/claw/.openclaw/workspace-vorti-main/projects/agw-website/src/app/page.tsx:76)
    What is wrong:
    - The form card feels like a SaaS lead widget dropped into a legacy contractor brand.
    - The badge in the corner reads like sticker decoration.
    Fix:
    - Either simplify this to a short call-routing CTA block or redesign it as a more bespoke estimate-intake module with fewer fields and stronger reassurance copy.

12. **Residential page is cleaner than home, but it still leans too hard on warranty iconography.**
    Evidence:
    - `tmp/agw-audit/residential-desktop.png`
    - `tmp/agw-mobile-residential-top.png`
    What is wrong:
    - The seal dominates the trust block more than real evidence does.
    - It still reads like a placeholder asset rather than a persuasive residential page.
    Fix:
    - Swap the seal-first composition for a home/project image plus a tighter warranty statement.

13. **Heritage page has the right theme but the wrong hero asset.**
    Evidence:
    - `tmp/agw-audit/heritage-desktop.png`
    What is wrong:
    - The right-side hero looks like a brochure mockup, not a website hero.
    - It feels abstract and self-referential.
    Fix:
    - Use real archival/team material and let the page feel earned, not designed around a branded composition.

14. **Commercial page is the healthiest page, but its proof panel still feels like a dashboard widget.**
    Evidence:
    - `tmp/agw-audit/commercial-desktop.png`
    What is wrong:
    - The right hero card uses too many boxed subcomponents for what should be a simple trust message.
    Fix:
    - Keep the page structure, but simplify the hero proof area into one strong message and one proof row.

## Repair Order

1. Fix the literal bugs first.
   - top-strip duplicate badge
   - dead `Service Area` anchor

2. Rebuild the mobile shell before touching aesthetics.
   - shorter header
   - one obvious mobile CTA
   - no horizontally cramped pseudo-desktop nav

3. Recompose the homepage from scratch using the existing copy/data.
   - keep the content
   - throw out the current section choreography

4. Replace decorative asset usage with real persuasion assets.
   - real team/property/archive imagery
   - fewer seals, more evidence

5. Normalize the design system after the homepage.
   - reduce repeated card patterns
   - vary section types
   - adjust heading scales across all pages

6. Then tune secondary pages.
   - commercial: simplify
   - residential: de-seal it
   - heritage: replace hero art

## What Not To Do On The Fix Pass

- Do not run another vague “cleaner hierarchy” pass.
- Do not keep the same layout and just change colors, spacing, or copy.
- Do not add more cards to solve trust problems.
- Do not ship another review link unless mobile header and homepage hero are visibly fixed.

## Bottom Line

This is salvageable, but not with trim passes. The homepage needs a real recomposition. The mobile shell needs to stop fighting the page. The commercial page can mostly be tightened. The residential and heritage pages need better art direction and less decorative badge energy.
