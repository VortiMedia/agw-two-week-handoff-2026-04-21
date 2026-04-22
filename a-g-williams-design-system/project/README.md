# A.G. Williams Painting Company — Design System

*A heritage house-painting brand since 1906. This system is how we talk, look, and feel on every surface — from a truck wrap to a web form.*

---

## 1. Context & Voice

### Who we are
A.G. Williams has been painting homes in the Northeast since **1906**. Four generations. We're not a startup dressed up in heritage — we're the real thing. Our design language reflects that: considered, patient, built to last, a little old-fashioned in the best ways.

### How we sound
- **Confident, not loud.** We've been doing this for over a century; we don't need exclamation points.
- **Specific, not salesy.** "Two coats of Benjamin Moore Regal Select" beats "premium finishes."
- **Warm, not cutesy.** We're a trade, not a boutique.
- **Plain, not technical.** Homeowners, not painters, are reading.

### How we don't sound
- No emoji. No "elevate your home." No "experience the difference."
- No startup-isms. No "book a discovery call." Say "get an estimate."
- No hedging. If the eaves need two coats, the eaves need two coats.

---

## 2. Visual Foundations

### Primary palette
| Token | Hex | Use |
|---|---|---|
| `--agw-blue` | `#0063B0` | The signature. Logo, headlines, CTAs, links. |
| `--agw-blue-deep` | `#004B85` | Pressed states, underlines, shadow tones. |
| `--agw-blue-ink` | `#002A4D` | Long-form editorial headlines on cream. |
| `--agw-green` | `#0D8E49` | Accent — icons, growth/renewal moments. |
| `--agw-cream` | `#F9F8F2` | **Default page surface.** Never `#FFF`. |
| `--agw-cream-warm` | `#F2EEE2` | Alternating sections, card surfaces. |
| `--agw-ink` | `#1A1A1A` | Body text. |

**Rules.**
- Blue is the brand. Blue leads. If in doubt, use blue.
- Green is a guest, not a host. It appears in icons, in hover states, in "estimate confirmed" moments — never as the primary headline color, never on a primary button.
- Pure white (`#FFFFFF`) is for photography, for crispness, for the inside of a card. The page itself is cream. This is non-negotiable — cream is what separates AGW from every other contractor brand.

### Typography

**Minion** (serif) — the voice of the brand.
Headlines, pull quotes, the logo's long-form wordmark, editorial copy. Minion carries the weight of a hundred years. It is not interchangeable with "any serif."

**Poppins** (sans) — the worker.
Body, UI, labels, data, forms, buttons. Gets out of the way.

**Rules.**
- One eyebrow per section. Eyebrows are Poppins, uppercase, tracked wide, in blue.
- Italic Minion is for emphasis *inside* headlines — a single phrase, never a whole line.
- Minimum body size: 16px web, 14px print captions. Minimum UI hit-area text: 14px.
- Never mix Georgia or Times with Minion anywhere — the fallback is there for load-failure, not for design.

### Spacing
4-px base scale. Prefer the larger steps — AGW breathes. Hero sections want `--space-9` (96px) or `--space-10` (128px) of vertical room, not 32px. Cards are `--space-5` (24px) padded minimum.

### Radii
Small. `--radius-sm` (4px) for cards and inputs, `--radius-md` (8px) for feature cards, never pill-shaped except for the occasional status chip. We are a brand of straight lines and honest corners.

### Shadows
Warm and soft. `--shadow-md` for cards, `--shadow-lg` for modal/focus moments. Never a harsh black drop-shadow — our shadows are tinted with the ink-blue and cream.

---

## 3. Logo

Four lockups ship with the system, all now available in brand colors:

| File | When |
|---|---|
| `assets/logo-horizontal-blue.svg` | Default. Headers, footers, sign-offs. |
| `assets/logo-vertical-blue.svg` | Stacked — square placements, social avatars. |
| `assets/logo-badge-blue.svg` | Seal with "Est. 1906" — hero moments, truck panels. |
| `assets/logo-icon-blue.svg` | Monogram only — favicons, app icons, watermarks. |
| `assets/logo-horizontal-white.svg` | Reverse — on blue or photographic backgrounds. |
| `assets/logo-icon-green.svg` | Accent use — pair with green section breaks. |

**Clear space.** Leave at least one "W" width around the mark on every side.
**Minimum size.** Horizontal: 120px wide on screen. Icon: 32px.
**Never.** Recolor beyond the approved set. Stretch. Place on a busy photo without a blue scrim. Put on pure `#FFF` — use cream or a photo.

---

## 4. Iconography

Twenty-four hand-drawn outline icons live in `assets/agw/brand/icons/PNG Files/`. They are **always green** (`--agw-green`), **always stroked** (no fills), and **always at generous size** — 48px minimum, 96px preferred in marketing.

Themes: brushes, rollers, palettes, paper/contracts, rulers, color swatches, a dropper, a camera, scissors. They describe the craft. Use them one-at-a-time inside feature blocks; never as a dense row of bullet-decorations. Icons are a pause, not a garnish.

**Rules.**
- Don't tint them blue. Green is correct.
- Don't fill them. The outline is the style.
- Don't shrink them below 32px — the strokes collapse.
- If an icon is missing from the set, add a photograph or a blue-scrim illustration instead. Don't reach for Font Awesome.

---

## 5. Patterns

Two tiling patterns ship for secondary surfaces — `assets/agw/brand/patterns/`:

- **Monogram tile** — the AgW mark, tiled on cream. For quiet backgrounds: estimate cover pages, thank-you cards, website footers.
- **Wordmark tile** — the full "A.G. Williams Painting Company" wordmark, tiled on blue. For loud brand moments: truck wraps, booth backdrops, hero backgrounds behind a white-logo lockup.

Use patterns *sparingly* — one patterned surface per view. Never over text.

---

## 6. Content Fundamentals

### What we talk about
Paint, prep work, color consultation, historic homes, interior/exterior, carpentry, generational trust, local crews, warranty. **Not** "solutions," "experiences," "journeys," or "partners."

### How we structure a page
1. **A headline in Minion**, one short sentence, blue italic on one phrase.
2. **A sub in Poppins**, 2–3 lines maximum.
3. **One primary CTA in blue**, one secondary as a text link in blue-deep.
4. **A photograph or pattern**, never a gradient.
5. **An eyebrow above every section.**

### Numbers & dates
- Years: `1906`, never `'06` or `1906.`
- Phone: `(914) 555-0100`, formal parens.
- Prices: `$4,200`, no trailing `.00`.
- Dates: `March 14, 2026`, not `3/14/26`.

### Punctuation
Em-dashes, not double hyphens. Oxford commas. Period at the end of every sentence, including callouts. Title case for headings, sentence case for body.

---

## 7. Files in this system

```
colors_and_type.css                  Core tokens — drop into any HTML
assets/
  logo-*.svg                         Recolored logo lockups
  agw/brand/
    icons/PNG Files/                 24 green outline icons
    patterns/                        Monogram + wordmark tiles
    logo/                            Original source SVGs + PNGs
fonts/                               Minion + Poppins
preview/                             Design-system preview cards
```

Start any new AGW artifact with:

```html
<link rel="stylesheet" href="colors_and_type.css">
<body class="agw-base">
```

…and the rest follows.
