# A.G. Williams Painting Company — Website

Next.js 16 / React 19 codebase for the A.G. Williams Painting Company marketing site. Heritage painting contractor, est. 1906, Bronxville NY. Residential and commercial.

## Quick start

```bash
nvm use            # Node >=20.9.0 required for Next.js 16
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run lint       # eslint
npm start          # serve the production build
npm run cf:preview # deploy current static export to Cloudflare Pages
```

## Cloudflare Preview

- Stable preview: `https://agw-website-v2-preview.pages.dev/`
- Structured deploy artifact: `cloudflare-preview-state.json`
- Cloudflare Pages config: `wrangler.toml`

## Repo layout

Single flat Next.js app at the repo root. Reference material lives alongside but is excluded from TypeScript and ESLint.

```
/
├── src/                  Next.js app code (source of truth)
├── public/               static assets served by the app
├── design-system/        north-star design reference (NOT app source)
├── content/agw/          reports, audits, strategy docs
├── assets/agw/           canonical brand assets (fonts, logos, icons, patterns, photos)
├── artifacts/            audit captures, QA renders (reference only)
├── brand-kit/            brand-kit snapshot
├── phase-0/              preview deploy state + locks
├── skills/               reference copy of custom skill bundles
├── package.json
├── next.config.ts
├── tsconfig.json
└── HANDOFF_FOR_OTHER_AI.md   ← start here if you're picking up the project
```

## Routes currently implemented

`/`, `/about`, `/accessibility`, `/commercial`, `/contact`, `/get-a-quote`, `/heritage`, `/privacy-policy`, `/residential`, `/terms`, plus `/robots.txt` and `/sitemap.xml`.

## Design

The north-star design lives at `design-system/project/ui-kit/marketing-site.html` (a self-contained HTML/CSS prototype). The Next.js app has **not yet been re-skinned to match it** — that's Phase 3 of the consolidation plan at `content/agw/reports/cleanup-revised-execution-plan-2026-04-22.md`.

Design tokens (colors, typography, spacing, radii, shadows, motion) live in `design-system/project/colors_and_type.css` and have yet to be ported into the Next.js app.

Brand palette:

| Token | Value | Role |
|---|---|---|
| `--agw-blue` | `#0063B0` | Lapis Lazuli — signature brand |
| `--agw-celeste` | `#6CBBE8` | Blue Celeste — accents |
| `--agw-ivory` | `#F9F8F2` | Default page surface |
| `--agw-dark` | `#595953` | Shadow Gray — body text |

Typography: Playfair Display (headlines) + Poppins (UI).

## Branches

- `main` — canonical code
- `agw-preserved-work-archive` — historical report commits
- `agw-preserved-integration-design-refresh` — ink-palette refresh (historical, not adopted)
- `agw-preserved-booking-flow` — full custom quote intake flow (recovered; not currently on main)

## Onboarding

If you are picking up this project — AI or human — read these in order:

1. `HANDOFF_FOR_OTHER_AI.md` — handoff rules and runtime
2. `CLAUDE_CODE_CONTEXT_PRIME.md` — Claude Code onboarding
3. `content/agw/agw-production-readiness-audit-2026-04-21.md` — current state
4. `content/agw/reports/cleanup-revised-execution-plan-2026-04-22.md` — the work that just landed
5. `design-system/project/ui-kit/marketing-site.html` — target design
