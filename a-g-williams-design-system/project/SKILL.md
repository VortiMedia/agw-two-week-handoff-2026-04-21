# A.G. Williams — Brand Skill

When designing for A.G. Williams Painting Company, load this skill before producing any artifact.

## 1. Load the tokens
Every HTML artifact links `colors_and_type.css` from the project root:

```html
<link rel="stylesheet" href="colors_and_type.css">
```

Reach for `--agw-*` CSS variables, never hex codes. The palette is intentionally narrow — do not invent new colors.

## 2. Website palette (the only palette for digital)

| Token | Hex | Use |
|---|---|---|
| `--agw-blue` | `#0063B0` | **Primary.** Logo, CTAs, display em, links |
| `--agw-celeste` | `#6CBBE8` | Secondary highlights, dark-mode accents |
| `--agw-ivory` | `#F9F8F2` | Default page surface — **not white** |
| `--agw-dark` | `#595953` | Body copy, deep surfaces |
| `--agw-blue-ink` | `#002A4D` | Long-form headlines, dark footers |
| `--agw-celeste-soft` | `#D8ECF7` | Pill fills, info washes |

**Heritage green** (`--agw-green` `#0D8E49`) is print/packaging/signage only. Never use on web.

## 3. Type system

- **Display**: Playfair Display (Google Fonts, already imported by the CSS). `font-display: var(--font-display)`. Weights: 900 for H1, 700 for H2, 600 for H3, italic for the em-highlight word.
- **Body / UI**: Poppins. `font-family: var(--font-sans)`. 400 for body, 500/600 for labels and nav, 700 for strong.
- **Italic-em highlight is a brand move**: wrap 1–3 words per headline in `<em>` — it renders italic + `--agw-blue`. Use it to mark the *outcome*, not the filler.

Minion stays available as `--font-heritage` for print work only.

## 4. Voice — premium, confident, outcome-first

- Lead with the **finished result**, not with process. ("A home that looks finished, not just painted" — not "We take our time.")
- Every residential page must surface **5-year warranty** and **0% financing** above the fold.
- Separate **Residential** and **Commercial** as top-level pathways. Commercial language: specification, compliance, capabilities, UL-certified, GC partner.
- Avoid folksy/craft-y language: "brush-by-Tuesday," "porches," "four generations of painters" as the hero hook. A single heritage beat ("Since 1906, family-owned") is fine; the hook should be the outcome.
- Never claim a 7-year warranty. It is 5 years, written, non-prorated.

## 5. Required trust signals

Every landing page shows:
- 5-year warranty
- 0% financing (up to 12 months, projects over $5,000)
- EPA Lead-Safe certified
- Licensed & insured (NY HIC #11842, CT HIC.0649371, $2M GL)
- 600+ verified reviews / 4.9★
- PDCA member, BBB A+

Footer must include a residential column AND a commercial column, plus certifications row.

## 6. Composition rules

- **Surface**: default to `--agw-ivory`. Use `--agw-cream-warm` for alternating sections. Pure `--agw-paper` (`#FFF`) only for forms/cards that need to stand apart.
- **Radii**: 4–8px. Pills only for chips and badges. Never rounded-everything.
- **Shadows**: soft, warm (`--shadow-md`, `--shadow-lg`). Avoid harsh black.
- **Spacing**: this brand breathes. Favor `--space-8` (64px) and `--space-9` (96px) between sections.
- **Patterns**: use the AGW brand pattern (`assets/agw/brand/patterns/…/Patterns (3).png`) at 10–18% opacity, Blue Ink or Lapis backgrounds only.

## 7. Logos & icons

- Web uses the **blue** logo variants (`assets/logo-horizontal-blue.svg`, `logo-vertical-blue.svg`, `logo-badge-blue.svg`, `logo-icon-blue.svg`).
- On blue/ink backgrounds use `logo-horizontal-white.svg`.
- The green logo is heritage — do not put it on the website.
- SVG logos have a 1000×1000 viewBox. Always set explicit `width` + `height: auto` on `<img>` tags, otherwise they render square.
- Brand icons live at `assets/agw/brand/icons/PNG Files/Icons (N).png` — 24 monochrome blue illustrations. Use for service cards and form pillars.

## 8. Before you ship

- Did you link `colors_and_type.css`?
- Are headlines Playfair, body Poppins?
- Is the hero outcome-led?
- Does warranty + financing appear above the fold?
- Are Residential and Commercial both reachable in the nav?
- Is the page surface Ivory, not white?
- Are logos sized with explicit width (not just height)?
