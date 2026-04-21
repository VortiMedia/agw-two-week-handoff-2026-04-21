# AGW Homepage — Root-Cause Visual Diagnosis

**Prepared:** 2026-04-21
**Target branch:** `origin/agw-integration` @ `531027f972483db7c0993b91508385dd15dc516c`
**Scope:** `projects/agw/website-review-build/src/app/page.tsx` plus supporting shell, tokens, data, and assets.
**Mode:** Audit only. No app code was edited.

---

## Blunt summary

- **What is wrong:** The homepage is a five-times-repeated "kicker → serif H2 → rounded cards in asymmetric two-column grid" template, rendered in a desaturated palette where the brand's signature blue shows up only as text and button fill. It reads as competent AI output, not as A.G. Williams.
- **Why it happened:** The design system was configured correctly (Playfair + Poppins, Lapis + Blue Celeste + Ivory + Shadow), but the page was authored as one 500-line inline-JSX file that never used the system to *block*, *contrast*, or *commit*. It layers soft whites on soft whites and calls it "refined."
- **What kind of redesign is actually required:** Not a restyling — a structural rebuild. Kill the uniform card grid, break the section symmetry, deploy the brand colors as actual blocks (not accents), and replace the polished stock-style imagery with narrative work. A second pass that only tweaks spacing and padding will produce the same page.

---

## 1. Overall verdict

The homepage is not broken. It is invisible. It communicates "a contractor who hired a decent web shop" when it needs to communicate "a 120-year-old painting institution that is still the local phone call." Every section uses the same visual grammar — a small-caps kicker, a serif headline in Lapis Lazuli, muted gray body copy, and two or three heavily rounded cards in a `0.XXfr / 1.XXfr` grid. The pattern is so consistent that the page reads as a single loop played five times.

Worse, the brand palette is defined but dormant. Lapis Lazuli (`#0063b0`, `globals.css:7`) appears almost exclusively as H-tag text, label text, link color, and CTA fill. Blue Celeste (`#6cbbe8`, `globals.css:9`) appears in exactly three places, all of them functionally invisible: the 22%-opacity radial gradient behind the hero (`globals.css:159`), the 18%-opacity step-marker background (`globals.css:444`), and the 28%-opacity text selection highlight (`globals.css:82`). The palette is loaded into the page the way a logo is loaded into a letterhead — decoratively, not structurally.

The net effect: a page that respects the user's time and follows best practices, but has no point of view, no visual tension, and no reason to be remembered. It is exactly what a careful, literate model produces when asked to "design a premium painting company homepage." That is the problem.

---

## 2. Top 7 concrete visual failures

Each failure cites the file and line where the pattern originates so a rebuild can target the exact source.

### Failure 1 — The hero is letterboxed inside a card, not committed to the page

The entire hero is wrapped in a single rounded container at `page.tsx:89`:

```
<div className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[rgba(255,255,255,0.82)] shadow-[var(--shadow-soft)]">
```

Then the content grid inside it (`page.tsx:90`) uses `lg:px-10 lg:py-10` — generous padding *inside* the already-padded container shell. The hero image at `page.tsx:165-212` lives inside that padded card, not bleeding to any edge. On a 1440px viewport this reads as a content card on a page, not a hero. There is no moment where the image, the copy, or the color takes over the screen. The hero *shares* the page instead of *owning* it.

### Failure 2 — The hero crams four distinct components into one container

Inside the hero card, the left column (`page.tsx:91-162`) stacks: kicker → H1 → lead paragraph → two buttons → a "Choose the right next step" label → a three-column grid of route cards → a wrapping row of four info-pill chips. The right column (`page.tsx:164-259`) stacks: image-with-overlay-cards → "Why the first call matters" card → "Review and credentials" card.

That is **eleven distinct UI objects** inside a single "hero." The page opens with a decision tree, not a statement. The visitor's first job is triage. A hero should do one thing loud. This one does seven things in the same tone of voice.

### Failure 3 — Every section is a 2-column asymmetric `0.XXfr / 1.XXfr` grid

Scan the grid declarations in order:

| Section | Line | Grid ratio |
|---|---|---|
| Hero content | `page.tsx:90` | `0.76fr / 1.24fr` |
| Hero right column | `page.tsx:164` | `1.08fr / 0.92fr` |
| Selected work | `page.tsx:275` | `1.14fr / 0.86fr` |
| Residential card inner split | `page.tsx:277` | `0.96fr / 1.04fr` |
| Local-accountability card split | `page.tsx:360` | `0.92fr / 1.08fr` |
| How work starts | `page.tsx:390` | `0.78fr / 1.22fr` |
| Service area | `page.tsx:456` | `0.84fr / 1.16fr` |
| Service area right column | `page.tsx:479` | `1.06fr / 0.94fr` |
| CTA + FAQs | `page.tsx:528` | `0.82fr / 1.18fr` |

**Nine asymmetric two-column grids in one page**, each with a slightly different ratio so they all feel "designed." They produce the same rhythm regardless: a slightly narrower element on the left, a slightly wider one on the right, with a gap of `8` units. The page has one structural move and repeats it until the visitor stops noticing.

### Failure 4 — Uniform rounded corners on every container kill visual hierarchy

Border radii on the homepage:

- `rounded-[2rem]` — hero shell (`page.tsx:89`)
- `rounded-[1.8rem]` — image card, residential card, commercial card, local-accountability card (`page.tsx:165, 276, 330, 359`)
- `rounded-[1.7rem]` — process panel (`page.tsx:431`)
- `rounded-[1.6rem]` — painter image card (`page.tsx:406`)
- `rounded-[1.5rem]` — side info cards (`page.tsx:214, 234`)
- `rounded-[1.4rem]` — CTA block (`page.tsx:529`)
- `rounded-[1.35rem]` — route cards, hero stat cards, feedback blocks (`page.tsx:133, 187, 418`)
- `rounded-[1.25rem]` — nested feedback card (`page.tsx:199`)
- `rounded-[1.2rem]` — prep/warranty sub-cards (`page.tsx:303, 312`)
- `rounded-full` — every button, chip, and kicker (`globals.css:177, 213, 230, 309`)

Every surface is softened. Nothing is sharp. Nothing is hard-cornered. This is the canonical "modern safe" design signature. The page has no edges to catch on. Combined with `--shadow-soft: 0 22px 60px rgba(63, 63, 59, 0.08)` (`globals.css:15`) — a shadow so diffuse it barely reads — every container feels weightless and interchangeable.

### Failure 5 — Blue Celeste is defined and never deployed

From `globals.css:9`: `--color-secondary: #6cbbe8;`

Grep for actual usage across the homepage and shell:

- `globals.css:82` — `::selection` background at 28% opacity. Invisible unless text is selected.
- `globals.css:159` — hero radial gradient at 22% opacity. "Transparent 34%." Invisible on most monitors.
- `globals.css:257, 289, 337` — focus-visible outline color. Keyboard-only.
- `globals.css:444` — step-marker background at 18% opacity. Three small circles in a dark section.

**Blue Celeste never appears as a panel, a block, a band, a card, a button, a border, or any object a casual visitor would register.** The homepage's secondary brand color is functionally absent. The palette the brand reference document calls out by name is a two-color palette in practice: dark navy `#10243a` (for one dark section) and Lapis `#0063b0` (for text and one CTA panel).

### Failure 6 — The team photo is used twice in the same page

- First use: `page.tsx:363` — inside the "Local accountability" card in Selected Work.
- Second use: `page.tsx:483` — inside the Service Area section.

Two identical crops, two identical framings, fewer than 800 pixels apart on desktop. This is the single most damning tell that the page was assembled rather than designed. A rebuild with proper imagery discipline would never permit this.

### Failure 7 — The final CTA is a flat blue rectangle pinned next to a FAQ list

At `page.tsx:527-570` the page ends with a `0.82fr / 1.18fr` grid: a solid `--color-primary` block on the left with a white pill button, an expanding FAQ list on the right. The block is `rounded-[1.4rem]`, `p-8`, `shadow-[var(--shadow-soft)]` — the same visual treatment as every other card on the page, just colored blue instead of white.

A final CTA should close the page. This one lies down beside an FAQ accordion and asks politely. The Lapis block has no scale, no full-bleed treatment, no typographic weight that distinguishes it from the route cards 2000 pixels above it. "Request a Quote" above the fold and "Request a Quote" below the fold look like the same button on the same card.

---

## 3. Root causes behind those failures

The visual failures above are symptoms. These are the underlying architectural decisions that produced them.

### Root cause A — One monolithic inline-JSX file, zero component discipline

`page.tsx` is a single 575-line `Home()` function. Every section is hand-coded inline. The repo *ships* reusable pieces — `SiteShell`, `FaqList`, `TrackedLink`, a curated brand-asset map in `lib/brand-assets.ts`, and data structures in `lib/site-data.ts` — but no `<HeroSection>`, `<ProofSection>`, `<ServiceAreaSection>`, or `<SectionHeading>` component exists for the homepage to consume.

The consequence: every section is a fresh improvisation inside the same file, and the author (human or model) naturally reaches for the pattern they just wrote one screen earlier. The result is a gradient from "distinct sections" to "the same section in a new costume." Inline authoring is why the asymmetric grid from section 1 appears in sections 2, 3, 4, 5. There is no component boundary where a different pattern could originate.

### Root cause B — The design system defines tokens but not compositions

`globals.css` defines colors, typography, spacing, radii, shadows, and a small set of utility classes (`.kicker`, `.section-label`, `.section-title`, `.card-title`, `.body-copy`, `.button-primary`, `.info-pill`, `.step-marker`, `.faq-summary`). Every one of these is a **primitive**. There is no class for "a hero block," "a color-blocked section," "a full-bleed band," "a two-tone stat strip," or "a commanding CTA panel."

When the author reaches for a compositional pattern and finds only primitives, they invent — and what they invent is the rounded-card grid, because that is the default composition in the Tailwind + Next.js + 2025 era. The system does not steer anyone toward a distinctive composition, so everyone converges on the same one.

### Root cause C — Color is used as ink, not as architecture

Lapis Lazuli is configured as `.hero-title` / `.page-title` / `.section-title` / `.card-title` color on `globals.css:100` and as `.button-primary` background on `globals.css:246`. That means the token is locked into "text on white" and "one fill on one button." It is not deployed as section background, as accent bar, as framing rule, as stat-strip panel, or as color-blocked typographic background.

Every major section background on the homepage is one of three values: white (`page.tsx:265, 454`), navy ink `#10243a` (`page.tsx:389`), or the default Ivory page background. **Not one section uses Lapis as its dominant surface.** The result is a page where the brand color is everywhere in small doses and nowhere in large ones — the opposite of how color establishes identity.

### Root cause D — The page's voice is copy-shaped, not color-shaped

Read the first sentence of each section in order:

1. "A century-old painting company with one local office behind every estimate." (hero H1)
2. "Quiet residential finish work, commercial coating scopes, and local proof that does not feel staged." (selected work H2)
3. "The first call should make the next step obvious." (how work starts H2)
4. "Work routed from Pelham across Westchester, Fairfield, Rockland, and Putnam." (service area H2)
5. "Start with the office and AGW will route the right next step." (final CTA H2)

Each sentence is operationally correct — it says what the section is about. None of them carries a *point of view*. They read as descriptive labels, not as claims. The copy is doing the work that color, composition, and imagery should share. When the copy is the only thing with voice, the page leans on text to carry the brand — and text cannot carry a brand alone.

### Root cause E — Imagery is proof, not narrative

`AGW_CURATED_PHOTOS` includes: `homeExteriorFairfield`, `whiteKitchen`, `commercialFloor`, `interiorPainter`. `AGW_LIVE_ASSETS` adds `teamPhoto` and `countiesMap`. Every image on the homepage is a *finished result*: a clean kitchen, a sealed floor, a completed exterior, a painter mid-trim. There is no before/after pair, no prep/protection shot, no scaffolding, no taped-off room, no client walk-through, no crew unloading the van at 7:30 AM. The imagery set is indistinguishable from any regional painter's portfolio.

This matters because craft brands prove themselves through process, not outcomes. An outcome photo ("the kitchen looks nice") is a commodity. A process photo ("look at how we protected the floors before we started") is a differentiator. AGW is telling a story about *how* it works and showing pictures of *what* the work looks like when it is done.

### Root cause F — Spacing and radii are configured to whisper

- `.section-space` — `padding-block: clamp(4.5rem, 8vw, 7.25rem)` (`globals.css:154`). Vertical rhythm tops out at ~116 px. That is generous-to-airy for a 1440px viewport.
- `--shadow-soft` — `0 22px 60px rgba(63, 63, 59, 0.08)` (`globals.css:15`). An 8% shadow at 60 px spread is nearly invisible against the Ivory background.
- Every card rounded to `1.2rem`–`2rem`. No container is ever rectangular.
- `--color-border: rgba(89, 89, 83, 0.18)` (`globals.css:13`). An 18%-opacity hairline is visible at close range and disappears on laptop screens.

Individually, each choice is defensible ("understated," "refined"). Stacked, they produce a page where nothing asserts itself. The composite instruction is *do not stand out*. A century-old Pelham-office painting company should not have a "do not stand out" visual system.

---

## 4. What makes it feel generic / AI-generated

These are the specific tells a trained eye registers as "template." None are individually fatal; together they lock the page into the AI-output aesthetic.

- **The kicker → serif headline → muted body → 2–3 card grid pattern** repeated in sections 1, 2, 3, 4, and 5. This is the exact module shape of a modern SaaS landing page generator output.
- **The `0.XXfr / 1.XXfr` grid ratios** (see Failure 3). Using nine near-symmetric-but-not-quite grids is a tell — real designers either commit to a symmetric grid or break sharply. Slightly-off-balance is the sound of a model trying to "look designed."
- **The uniform rounded-pill treatment on every small element** — kickers, section labels, info-pills, buttons, navigation chips, nav links, menu summary, mobile nav links, step markers. Nine different component classes in `globals.css` use `border-radius: 999px`. The page has no vocabulary for "not-a-pill."
- **The 0.68rem uppercase `tracking-[0.18em]` label applied to every micro-heading.** It appears fourteen times on this page alone (`page.tsx:125, 135, 178, 181, 188, 200, 206, 215, 235, 289, 304, 313, 341, 371, 419, 425, 491, 512`). It is the single most-overused classname in the file. It stops feeling like a label and starts feeling like a texture.
- **The `rgba(249, 248, 242, 0.8)` / `0.92` / `0.94` / `0.96` Ivory-at-partial-opacity background** applied to cards. Real designers either commit to a color or leave a surface white. Ivory-at-80%-opacity is a model's guess at "warmth."
- **Gradient overlays on images with identical math** — `from-[rgba(16,36,58,0.92)] via-[rgba(16,36,58,0.28)]` (`page.tsx:175`) and `from-[rgba(16,36,58,0.94)]` (`page.tsx:339`). Two different images, same darkening recipe, same text-card-on-gradient treatment at the bottom.
- **The "choose the right next step" three-card decision tree inside the hero** (`page.tsx:129-149`). A real brand commits to a point of view above the fold. A template surveys the visitor.
- **Process steps numbered 1/2/3 in Blue Celeste circles** (`page.tsx:433-446`). This is the universal "how it works" module, delivered identically on every service business homepage generated since 2022.
- **The team photo used twice** (Failure 6). The most obvious tell of all — it is what happens when sections are generated independently and nobody audits the final page as a single composition.
- **No custom iconography.** The page has zero icons, zero illustrations, zero custom marks beyond the AGW logo. Every visual differentiation is carried by color and type, both of which are already flat (see above).

---

## 5. What must be preserved

Not everything is wrong. These elements are load-bearing and should survive the rebuild unchanged.

- **Brand token definitions** in `globals.css:3-20`. The palette, typography stack, and shadow variables are correctly chosen. Playfair Display + Poppins matches the brand reference. Lapis + Blue Celeste + Ivory + Shadow Gray + Navy Ink is the right set. The failure is deployment, not selection.
- **Responsive clamping** (`globals.css:104-141, 154`). `clamp()` on type and padding is good practice and should carry forward.
- **`SiteShell` wrapper** (`components/site-shell.tsx` via `page.tsx:79`). Header, footer, top strip, nav — all functional. Do not rebuild.
- **`FaqList`** (`page.tsx:566`). The `details`/`summary` pattern is accessible, the styling in `globals.css:451-492` is clean. Keep it.
- **`TrackedLink`** (`page.tsx:104, 541`). Tracking wiring for the quote CTA is business-critical and should not be disturbed.
- **`lib/site-data.ts` + `lib/brand-assets.ts`**. The separation of data from presentation is correct. The *content* of some entries may change, but the structure is right.
- **JSON-LD injection** (`page.tsx:81-86`). Schema markup for SEO, do not touch.
- **Accessibility scaffolding** — heading hierarchy, `alt` text, ARIA labels on FAQ, `aside` and `article` landmarks. All correct.
- **Next/Image usage everywhere.** Every `<Image>` has `fill` or explicit dimensions, `sizes`, and appropriate `priority`. Performance discipline is already in place.

---

## 6. What must be removed or rebuilt

- **All inline-JSX section code in `page.tsx` from line 87 to line 570.** Not tweaked — removed and replaced with component calls.
- **The uniform rounded-card grid pattern.** Every `rounded-[1.2rem]`–`rounded-[2rem]` container should be re-examined. Default to rectangular panels or a tighter `rounded-[0.5rem]` maximum. Reserve large radii for genuinely distinct objects (maybe the CTA card, nothing else).
- **All nine asymmetric `0.XXfr / 1.XXfr` grids.** Rebuild with either committed symmetric grids, full-bleed bands, or genuinely broken/editorial layouts — not a third, hedging option.
- **The hero's eleven-object stack.** Cut to four max: kicker, H1, one-sentence sub, two CTAs. Move the route cards, the "Why the first call matters" card, the credentials aside, and the info-pills into their own dedicated sections or kill them.
- **The duplicate `teamPhoto` usage.** Pick one placement. Source a second, different team/crew photo for the other.
- **Every `rgba(249, 248, 242, 0.X)` Ivory-opacity background.** Either commit to solid Ivory (`#f9f8f2`) or commit to white. Partial opacity is a hedge.
- **The "Choose the right next step" three-card tree inside the hero** (`page.tsx:124-150`). Move out of the hero entirely or cut.
- **The `--shadow-soft` value at 8% opacity.** Either make shadows structural (deeper, more committed) or remove them in favor of borders, rules, or color contrast.
- **The 0.68rem / tracking-0.18em micro-label.** Cut its appearances by two-thirds. Reserve for genuinely important labels, not every piece of metadata.
- **The final CTA block that sits beside the FAQ list** (`page.tsx:527-570`). Rebuild as a full-bleed, full-width Lapis band with typography that closes the page, then follow it with the FAQ section below — not beside.
- **The `info-pill` chip row of trust signals** (`page.tsx:152-161`). Four pills in a wrapping row is noise. Either integrate trust signals into the hero typography or commit to a real proof strip with logos, numbers, and scale.

---

## 7. New design direction in plain English

The current page reads as "nice website." The new page should read as **"the local century-old painting company, captured in web form."** Concrete directional moves:

1. **Use color as architecture, not as ink.** At least one major section should be a full-bleed Lapis Lazuli band. At least one should be Ivory (not white, not Ivory-at-80%). The hero should commit to a single dominant color — the right answer is probably a split where Lapis owns 60% of the fold and a full-bleed image owns 40%, with Blue Celeste appearing as a thin accent rule or a single typographic highlight.
2. **Break section symmetry on purpose.** Alternate a full-bleed editorial section with a tight centered section with a color-blocked two-up. No more nine variants of the same two-column grid.
3. **Commit to typographic contrast.** Playfair Display should carry big moments in serif weight 900. Poppins should carry dense UI and labels in weight 600–800. Currently both fonts feel like different-sized versions of the same idea because nothing is ever set at display scale. The hero H1 should be *large* — at `4.35rem` max (current `clamp`) it is borderline mid-scale. Push the top of the clamp to `5.5rem+` and use it once.
4. **Replace "outcome" imagery with "process" imagery.** Before/after pair for one residential scope. A drop-cloth-and-tape prep shot. A crew morning scene outside the Pelham office. The team photo once, not twice. A genuine 1906-era photograph or archival document somewhere — this is a *century-old* company and there is no visual nod to that fact anywhere on the page.
5. **Close the page with a statement, not a panel.** A full-bleed Lapis band, page-title typography at display scale, one button, one phone number. FAQ below it, not beside it.
6. **Remove at least a third of the containers.** Right now the hero alone contains eleven distinct rounded rectangles. A confident page has fewer objects and asks each object to do more.
7. **Pick one signature move and repeat it with intent.** Candidates: a consistent Lapis vertical rule that runs through editorial sections; a heritage badge that anchors the top of the page; a numbered-chapter treatment across services; a full-bleed photo band between every two sections. Any one of these would give the page a fingerprint. Currently it has none.
8. **Use Blue Celeste deliberately, once or twice, at full saturation.** A Blue Celeste underline under one word in the H1. A Blue Celeste backing panel behind one stat. The current 18%-28%-opacity approach produces zero brand recognition. Used at 100% opacity on a single moment, it becomes the page's visual signature.

What this is not: a suggestion to "improve spacing," "add more whitespace," "modernize the layout," or "use more gradients." The problem is not taste-level polish. The problem is the page's grammar.

---

## 8. Exact files that should change in the rebuild

| File | Change type | Scope |
|---|---|---|
| `src/app/page.tsx` | **Full rewrite** | Replace 575 lines of inline JSX with a composition of section components. Final `page.tsx` should be <100 lines. |
| `src/app/globals.css` | **Extend, don't remove** | Add compositional classes: `.band-lapis`, `.band-ivory`, `.band-ink`, `.hero-bleed`, `.editorial-split`, `.stat-strip`, `.section-rule`. Add a Poppins weight ladder (400 / 600 / 800). Tighten the radius scale to a max of `1rem` for most containers, reserving larger radii for exceptional use. Do not remove existing primitives; they stay for interior pages. |
| `src/components/hero-block.tsx` | **New** | One composable hero with full-bleed image option, color-blocked option, and single H1 slot. |
| `src/components/section-band.tsx` | **New** | Color-blocked section wrapper (`tone: "lapis" | "ivory" | "ink" | "white"`) with optional full-bleed prop. |
| `src/components/stat-strip.tsx` | **New** | Horizontal numeric proof row — the replacement for the four-pill info row in the current hero. |
| `src/components/editorial-split.tsx` | **New** | One genuine two-column layout (copy + image) used *once or twice* max, not nine times. Default to symmetric `1fr 1fr`; asymmetry is opt-in, not default. |
| `src/components/service-card.tsx` | **New** | Replaces the three route cards in the hero and the residential/commercial/accountability cards in Selected Work — one component, consistent treatment. |
| `src/components/proof-strip.tsx` | **New** | Google/Yelp/EPA lead-safe logos as a dedicated strip, not a column in the hero's right rail. |
| `src/components/final-cta.tsx` | **New** | Full-bleed Lapis band that closes the page. Not a card in a grid. |
| `src/lib/brand-assets.ts` | **Extend with new imagery** | Add: `residentialBeforeAfter`, `prepProtection`, `crewMorning`, `heritageArchival` (a genuine 1906-era photo or document). The `teamPhoto` is currently used twice; source a second crew shot to break the duplication. |
| `src/lib/site-data.ts` | **Copy pass, not structure change** | Data shapes are correct. Copy for hero H1, section H2s, and the final CTA needs a voice pass — currently each headline is descriptive, not declarative. |

Unchanged: `src/app/layout.tsx`, `src/components/site-shell.tsx`, `src/components/faq-list.tsx`, `src/components/tracked-link.tsx`, `src/components/agw-logo.tsx`, JSON-LD, metadata, sitemap.

---

## 9. Rebuild order for homepage only

Sequenced so each step unblocks the next and the page is visually legible at every checkpoint. Do not skip or parallelize — the whole point is to avoid the current page's problem of each section being built independently.

### Step 1 — System work before composition work

1. Extend `globals.css` with the compositional classes listed above (`.band-lapis`, `.band-ivory`, `.band-ink`, `.hero-bleed`, `.editorial-split`, `.stat-strip`, `.section-rule`). Add the Poppins weight ladder.
2. Tighten the radius scale. Introduce `--radius-sm: 0.5rem` and `--radius-md: 1rem`. Reserve `rounded-[1.5rem+]` for one intentional exception (probably the hero).
3. Strengthen `--shadow-soft` or add `--shadow-structural` for containers that need visual weight.
4. Build the six new components listed in §8 as empty shells with typed props. Do not style them yet.

### Step 2 — Anchor the hero first, because it dictates the page

5. Build the new hero using `<HeroBlock>`. Pick one of: (a) full-bleed image left, Lapis-blocked copy right; or (b) Lapis-blocked copy with a single editorial image integrated below, breaking the fold. Pick one and commit.
6. H1 at display scale (`clamp(2rem, 6vw, 5.75rem)`). One sentence. One sub-sentence. Two CTAs. Nothing else in the hero. No route cards, no info-pills, no credentials aside.
7. Review the hero alone at 1440px, 1024px, 768px, 390px. If it doesn't read as "AGW" at 1440px with no other context, stop and fix before moving on.

### Step 3 — Build the first follow-on section as the pattern exemplar

8. Build one `<SectionBand tone="ivory">` immediately below the hero, using `<EditorialSplit>` for content. This is the "what AGW actually does" section — a committed 1/1 split or a deliberate full-bleed editorial layout. Not `0.XXfr / 1.XXfr`.
9. Place the `<ProofStrip>` immediately after. Google, Yelp, EPA lead-safe, and any additional proof elements (years-in-business stat, warranty, counties served) rendered as a dense horizontal band. This is the new home for the content that is currently scattered across the hero info-pills and the credentials aside.
10. Review the first three composed blocks together. The transitions between hero → ivory band → proof strip should produce three distinct visual registers. If they look like three variants of the same card, stop and fix.

### Step 4 — Apply the pattern across remaining sections

11. Rebuild "How work starts" inside a `<SectionBand tone="ink">` — this is the one section where the current dark-navy treatment actually works. Keep the three process steps but in a cleaner composition (vertical list with Lapis numerals, not a three-card backdrop-blur panel).
12. Rebuild "Service Area" in a `<SectionBand tone="white">` with the map as the primary visual. Counties list as typography, not bordered-ivory cards. Kill the duplicate team photo here — this section no longer gets one.
13. Rebuild Selected Work (residential/commercial) using `<ServiceCard>` components. Two cards, consistent treatment, no nested mini-cards, no "Prep-first standard"/"Warranty-backed" sub-tiles. Those details live on the service pages, not on the homepage.

### Step 5 — Imagery discipline

14. Swap the duplicate `teamPhoto` usage: one instance stays (pick which), the other is replaced with a crew-in-action or prep-phase shot. Source the new image into `lib/brand-assets.ts`.
15. Add at least one heritage/archival image somewhere on the page. The "Since 1906" line currently has zero visual backing.
16. Add one before/after pair into either the hero or the Selected Work section.

### Step 6 — Close the page with weight

17. Rebuild the final CTA as a full-bleed `<SectionBand tone="lapis">` with `<FinalCta>`. No grid, no FAQ beside it. Page-title typography, one primary button, one phone number, nothing else.
18. Move the FAQ section below the final CTA as a standalone `<SectionBand tone="white">`. Keep `FaqList` unchanged.

### Step 7 — Component enforcement and cleanup

19. Confirm `page.tsx` is under 100 lines and composed entirely of component calls with data props.
20. Audit the final page as a single composition at 1440 / 1024 / 768 / 390. Count objects per section. Count border radii. Count grid ratios. If any section has more than four primary objects, or if grid ratios are still near-symmetric-but-not-quite, return to Step 1.
21. Compare side-by-side against the current page at `531027f`. If the new page could still be mistaken for the current one with copy swapped, the rebuild failed and should be re-evaluated at the composition level, not the polish level.

---

## Appendix — Cited evidence locations

**page.tsx:**
- Hero container with uniform soft treatment: L89
- Hero content grid ratio `0.76fr/1.24fr`: L90
- Eleven-object hero left column: L91–162
- Route-card sub-grid inside hero: L129–149
- Info-pill trust-signal row: L152–161
- Hero image with dark gradient and overlay cards: L165–212
- "Why the first call matters" card: L214–232
- "Review and credentials" aside: L234–258
- Selected Work section: L265–387
- Residential card with nested sub-cards: L276–327
- Commercial floor dark card with image-gradient treatment: L330–357
- **First** team photo usage: L363
- How work starts dark section: L389–450
- Process panel with numbered step markers: L431–448
- Service area section: L452–525
- Service-area list with Lapis left border on Ivory: L467–476
- **Second** team photo usage (duplicate): L483
- Final CTA + FAQs band: L527–570
- Lapis CTA block beside FAQ list: L529–560

**globals.css:**
- Color tokens (Lapis, Blue Celeste, Ivory, Navy, Shadow): L3–20
- Blue Celeste only uses: L82 (selection), L159 (hero radial), L257/289/337 (focus outline), L444 (step marker)
- Display font stack (Playfair Display, correct per brand reference): L17
- Body font stack (Poppins, correct per brand reference): L18–19
- Weak `--shadow-soft`: L15
- Section vertical rhythm cap: L154
- Universal pill radius (999px) on kickers, labels, info-pills, buttons, nav links, step markers: L177, 213, 230, 309
- Heading typography tokens bound to Lapis color: L95–127
- Low-contrast `--color-border` at 18% opacity: L13
- `.step-marker` — the only visible Blue Celeste usage: L437–449

---

**End of audit.**
