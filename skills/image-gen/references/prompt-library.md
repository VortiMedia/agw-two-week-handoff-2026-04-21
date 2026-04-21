# Prompt Library Quick Reference

## Template Categories

| Category | Templates | Ad Eligible | Best For |
|----------|-----------|-------------|----------|
| `3d-electronics` | 3 | No | Product renders, retro gadgets |
| `3d-plush` | 3 | No | Character mascots, toy aesthetics |
| `3d-macro-devices` | 3 | No | Macro product studies |
| `3d-flowers` | 3 | No | Surreal organic forms |
| `ui-cards` | 3 | No | UI design mockups |
| `micrographics` | 3 | No | Dense data visualizations |
| `retro-logos` | 3 | No | Brand logo redesigns |
| `sora-video` | 4 | No | Video sequences (Sora) |
| `extreme-sports` | 3 | No | Action sports photography |
| `fashion-editorial` | 6 | Yes* | Fashion campaigns, editorial |
| `lifestyle` | 6 | Yes | People in aspirational settings |
| `cat-portraits` | 3 | No | Creative cat photography |
| `product-photography` | 3 | Yes* | Beauty/product campaigns |
| `luxury-jewelry` | 3 | No | Luxury editorial still life |
| `bar-atmosphere` | 3 | No | Moody bar/nightlife scenes |
| `transparent-tech` | 3 | No | Transparent device renders |
| `auto-photography` | 4 | No | Automotive racing shots |
| `illustration-retro` | 3 | No | Retro cartoon illustrations |
| `illustration-flat-vector` | 3 | No | Flat vector cityscape/scenes |
| `illustration-photo-overlay` | 3 | No | Illustrated characters in photos |
| `illustration-paper-collage` | 3 | No | Handcrafted paper collage art |
| `food-photography` | 3 | Yes* | Editorial food photography |
| `architecture` | 3 | Yes | Architectural spaces |
| `object-styling` | 0 | Yes | Object product photography |

\* Limited ad eligibility by vertical. See ad-creative-engine for details.

## Template ID Format

Template IDs follow the pattern: `{category}-{number}`

Examples: `lifestyle-001`, `food-photography-003`, `fashion-editorial-005`

## Variable Substitution

Templates support variable placeholders like `{brand_name}`, `{subject}`, `{setting}`.
Pass variables as JSON: `--vars '{"brand_name": "BrightSmile", "subject": "young professional"}'`

Common variables across templates:
- `{brand_name}` — Client brand name
- `{subject}` — Main subject description
- `{setting}` — Environment/background
- `{color_primary}` — Brand primary color
- `{product_type}` — Product/service shown
- `{mood}` — Overall feel/vibe

## Library Location

`/Users/claw/.openclaw/workspace-vorti-main/content/prompt-library/`
- `index.json` — Master searchable index
- `guidelines.md` — Prompt engineering framework
- `templates/*.json` — Category template files
