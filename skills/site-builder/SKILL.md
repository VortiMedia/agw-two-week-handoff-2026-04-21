---
name: site-builder
description: Full-stack Next.js site builder. Generates design system, scaffolds project, spawns parallel agents for UI + backend + images. 20 verticals built in. Use when starting any new website build from scratch.
---

# site-builder

One command to go from idea to production-ready Next.js project. Design system generated, project scaffolded, agents spawned, images generated — all in parallel.

## Usage

```bash
# New project (interactive — asks for missing info)
uv run {baseDir}/scripts/build.py new ./my-project

# New project with flags
uv run {baseDir}/scripts/build.py new ./my-project \
  --vertical dental \
  --brand "#0A2540,#00B4D8" \
  --name "Bright Smiles Dental" \
  --domain "brightsmilesdental.com"

# List all available verticals
uv run {baseDir}/scripts/build.py verticals

# Generate design system only (no scaffold)
uv run {baseDir}/scripts/build.py design --vertical saas --brand "#6366F1,#10B981"

# Audit an existing project
uv run {baseDir}/scripts/build.py audit ./existing-project
```

## Available Verticals

| Key | Vertical |
|-----|----------|
| `real-estate-investor` | Cash Home Buyer / Real Estate Investor |
| `dental` | Dental Practice |
| `med-spa` | Med Spa / Aesthetic Clinic |
| `marketing-agency` | Marketing / Ad Agency |
| `saas` | SaaS / Software Product |
| `law-firm` | Law Firm / Attorney |
| `restaurant` | Restaurant / Food & Beverage |
| `fitness` | Gym / Fitness Studio |
| `plastic-surgery` | Plastic Surgery / Cosmetic |
| `chiropractic` | Chiropractic / Physical Therapy |
| `urgent-care` | Urgent Care / Walk-In Clinic |
| `ecommerce` | E-Commerce / DTC Brand |
| `financial-advisor` | Financial Advisor / Wealth Mgmt |
| `home-services` | Home Services (HVAC, Plumbing, etc.) |
| `photography` | Photography / Videography |
| `consulting` | Consulting / B2B Service |
| `wedding` | Wedding Planner / Venue |
| `nonprofit` | Nonprofit / Charity |
| `portfolio` | Personal Portfolio / Developer |

## What It Generates

### 1. Design System (`design-system/MASTER.md`)
- Vertical-appropriate style, pattern, mood
- Color palette with CSS variable names
- Font pairing with Google Fonts import
- Page section order
- shadcn components to install
- Anti-patterns to avoid
- Trust signals to include

### 2. Project Scaffold
- Next.js 16 + Tailwind v4 + TypeScript
- `proxy.ts` auth (dashboard-ready)
- `/lib/supabase.ts` (ready to activate)
- globals.css with brand CSS variables pre-set
- `src/components/` stubs for all vertical sections
- `src/app/` routing structure

### 3. AGENT_TASK.md
Complete task file ready for Claude Code — design spec, page list, component specs, SEO requirements, quality checklist. Hand it to `claude --permission-mode bypassPermissions --print "Read AGENT_TASK.md and execute it"`.

### 4. .deploy.json
Pre-configured for nextjs-deploy skill with:
- Vertical-appropriate smoke URLs
- Asset patterns for audit
- Env file path

### 5. Images (via image-gen skill)
- Hero image generated with gpt-image-1.5
- All images in a parallel process

## Design Quality Rules (from design-for-ai)

Every build enforces these before shipping:

**Typography**
- Max 2 font families. No Inter/Roboto/Arial as primary display font.
- Type scale: 12/14/16/18/20/24/32/40/48/60px
- Line height: 1.5 body, 1.1-1.2 display
- Never fake bold. Smart quotes where possible.

**Color**
- 60/30/10 rule: dominant/secondary/accent
- All text meets WCAG AA contrast (4.5:1 min)
- No decorative gradient text
- Hue-shifted shadows (not gray)

**Composition**
- One dominant element per section
- Asymmetry over perfect centering
- Generous whitespace — tight within groups, loose between
- No 6x identical card grids

**Motion**
- 100ms micro, 300ms standard, 500ms complex
- Ease-out for entries, ease-in for exits
- `prefers-reduced-motion` respected
- Animation must convey information, not just decorate

**AI Tells to eliminate**
- Inter/Roboto as the only font
- Cyan-on-dark or purple-to-blue gradient
- Icon + heading + text card repeated N times
- Everything centered, no asymmetry
- Same spacing everywhere
- Glassmorphism used decoratively
- Dark mode with glowing neon
- Everything fades in from below with same timing

**Interaction States (all 8)**
default / hover / focus / active / disabled / loading / error / success

**Responsive**
- 375px / 768px / 1024px / 1440px
- Mobile-first always
- Fluid typography (clamp)
- 44×44px minimum touch targets

## Cinematic Mode (Optional)

When `--cinematic` flag is passed or the brief calls for a high-impact hero:
1. Generate a Kling 3D video for the hero background (see frontend-design skill for prompt template)
2. Add to AGENT_TASK.md: "Integrate public/hero.mp4 as hero background with inward masking gradient overlay"
3. Note in design system: "Cinematic hero — ensure text contrast with backdrop overlay"

Requires: FAL_API_KEY or Higsfield account (not yet in Vorti env — David needs to set up).

## Cinematic Mode (Optional)

When `--cinematic` flag is passed or brief calls for high-impact hero:
1. Generate a Kling 3D video for the hero background (see frontend-design skill for prompt template)
2. Add to AGENT_TASK.md: "Integrate public/hero.mp4 as hero background with inward masking gradient overlay"
3. Note in design system: "Cinematic hero — ensure text contrast with backdrop overlay"

Requires: FAL_API_KEY or Higsfield account (not yet in Vorti env — David needs to set up).

## Environment Variables

None required to run the builder itself.
Image generation requires `OPENAI_API_KEY` or `GEMINI_API_KEY` in `~/.openclaw/.env`.

## Dependencies

- `uv` (Python runner)
- `node` + `npm`
- `vercel` CLI (for deploy integration)
- Optional: `OPENAI_API_KEY` for image generation
