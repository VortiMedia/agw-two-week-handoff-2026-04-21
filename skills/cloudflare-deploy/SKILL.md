---
name: cloudflare-deploy
description: "Deploy websites and landing pages to Cloudflare Pages using Wrangler CLI. Handles Next.js, static HTML/Tailwind, and single-page apps. Used by Kit for client landing pages, Vorti website, and proposal microsites."
---

# Cloudflare Deploy

Deploy web projects to Cloudflare Pages via Wrangler CLI. Supports Next.js, static sites, and SPAs.

## When to Use
- Deploying a new landing page for a Google Ads campaign
- Publishing the VortiHQ website or updates
- Creating a microsite for a specific proposal or client
- Deploying any Next.js or static HTML project

## Prerequisites
```bash
# Wrangler CLI
npm install -g wrangler

# Auth (one-time)
wrangler login
# Or use API token:
export CLOUDFLARE_API_TOKEN="<token>"
export CLOUDFLARE_ACCOUNT_ID="<account_id>"
```

## Deploy Patterns

### Pattern 1: Static HTML / Tailwind
```bash
# Project structure
project/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    └── images/

# Deploy
cd project
wrangler pages deploy . --project-name <project-name>
```

### Pattern 2: Next.js (Static Export)
```bash
# next.config.js must have:
# output: 'export'

npm run build
wrangler pages deploy out --project-name <project-name>
```

### Pattern 3: Next.js (Full — with @cloudflare/next-on-pages)
```bash
npm install @cloudflare/next-on-pages

# Build
npx @cloudflare/next-on-pages

# Deploy
wrangler pages deploy .vercel/output/static --project-name <project-name>
```

## Project Naming Convention
- Client landing pages: `<client-slug>-lp` (e.g., `layliev-rhinoplasty-lp`)
- Vorti properties: `vortihq`, `vorti-blog`, `vorti-docs`
- Proposal microsites: `proposal-<slug>`
- Test/staging: `staging-<project>`

## Custom Domains
```bash
# After first deploy, add custom domain
wrangler pages project update <project-name> --custom-domain <domain>

# Or via dashboard: Pages → project → Custom Domains → Add
```

## Environment Variables
```bash
# Set env vars for the project
wrangler pages secret put <KEY> --project-name <project-name>

# Or in wrangler.toml
[vars]
API_URL = "https://api.example.com"
```

## Landing Page Standards (for Google Ads campaigns)

### Required Elements
1. **Headline** matching the ad copy (message match = lower bounce rate)
2. **Hero section** with clear value proposition + CTA above the fold
3. **Social proof** — reviews, logos, testimonials
4. **Benefits** — 3-5 bullet points, not features
5. **CTA button** — one primary action, repeated 2-3 times
6. **Form** — name, email, phone minimum. Less fields = more conversions.
7. **Trust signals** — HIPAA badge, BBB, industry certifications
8. **Mobile-first** — 70%+ of healthcare searches are mobile

### Performance Requirements
- **LCP < 2.5s** (Core Web Vital — affects Quality Score)
- **No external fonts** unless preloaded
- **Images: WebP format**, lazy-loaded below fold
- **Total page weight < 500KB**
- **No render-blocking JS** above the fold

### Conversion Tracking
```html
<!-- Google Ads conversion tracking -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXX');
</script>

<!-- Fire on form submit / call click -->
<script>
  function trackConversion() {
    gtag('event', 'conversion', {
      'send_to': 'AW-XXXXXXXXX/XXXXXXX',
      'value': 1.0,
      'currency': 'USD'
    });
  }
</script>
```

## Deployment Workflow
1. Kit builds the site (Next.js/Tailwind or static HTML)
2. Local preview: `npx wrangler pages dev .` (or `npm run dev` for Next.js)
3. Build: `npm run build` (Next.js) or validate HTML
4. Deploy to staging: `wrangler pages deploy <dir> --project-name staging-<project>`
5. David reviews staging URL
6. Deploy to production: `wrangler pages deploy <dir> --project-name <project>`
7. Set custom domain if needed
8. Verify conversion tracking fires correctly

## Rollback
```bash
# List deployments
wrangler pages deployments list --project-name <project-name>

# Rollback to specific deployment
wrangler pages deployments rollback <deployment-id> --project-name <project-name>
```

## Anti-Patterns
- Never deploy without testing locally first
- Never use `next export` with API routes (they won't work on static export)
- Never hardcode API keys in client-side code
- Never skip mobile testing — always verify on 375px width
- Never deploy landing pages without conversion tracking — the whole point is measurable results
