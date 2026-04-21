---
name: site-audit
description: Comprehensive static audit for Next.js projects. Scans for images, iOS/Safari bugs, Next.js issues, SEO gaps, AI design tells, security exposures, performance problems, accessibility failures, and common React bugs. Outputs a prioritized issue list + AUDIT_FIXES.md ready to hand to Claude Code.
---

# site-audit

Static analysis for Next.js projects. Finds every class of issue before it hits production.

## Usage

```bash
# Full audit
uv run {baseDir}/scripts/audit.py ./my-project

# Audit + generate fix task for Claude Code
uv run {baseDir}/scripts/audit.py ./my-project --fixes

# Audit specific categories only
uv run {baseDir}/scripts/audit.py ./my-project --only images,ios,security

# Output as JSON (for programmatic use)
uv run {baseDir}/scripts/audit.py ./my-project --json

# Audit then immediately hand fixes to Claude Code
uv run {baseDir}/scripts/audit.py ./my-project --fixes --apply
```

## What It Checks

| Category | Issues Detected |
|----------|----------------|
| **Images** | Size, missing priority/quality, raw img tags, broken paths, missing alt, AI-generated detection |
| **iOS/Safari** | viewport-fit, safe-area insets, 100vh→dvh, input zoom, tap highlight, sticky bugs |
| **Next.js** | proxy.ts convention, dynamic routes, Suspense, use client overuse, metadata API |
| **SEO** | h1 count, meta tags, OG/Twitter, JSON-LD, robots.txt, sitemap, canonical |
| **AI Tells** | Font choices, color patterns, layout patterns, emoji icons, identical card grids |
| **Security** | NEXT_PUBLIC_ secret exposure, unprotected routes, .env in git |
| **Performance** | Font preconnect, display:swap, console.logs, unused use client |
| **Accessibility** | Contrast (WCAG AA), tap targets, focus states, labels, aria |
| **Bugs** | Hydration mismatches, useEffect issues, missing e.preventDefault(), useSearchParams |

## Output

Prioritized report:
- **CRITICAL** — security risks, runtime crashes, broken functionality
- **HIGH** — user-facing bugs, SEO killers, major UX issues  
- **MEDIUM** — quality issues, performance gaps
- **LOW** — polish, nice-to-have fixes

Each issue includes file path, line number, and the exact fix.

With `--fixes`: generates `AUDIT_FIXES.md` — a complete task file for Claude Code.
With `--apply`: runs `claude --permission-mode bypassPermissions --print "Read AUDIT_FIXES.md and fix every issue"` automatically.
