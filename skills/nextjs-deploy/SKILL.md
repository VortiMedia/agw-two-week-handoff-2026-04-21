---
name: nextjs-deploy
description: Production deployment pipeline for Next.js projects. Runs preflight checks, asset audit, env sync, build verification, deploy, and smoke tests. Catches every class of deploy error before it goes live. Use when deploying any Next.js site to Vercel.
---

# Next.js Deploy

Production-grade deployment pipeline for Next.js + Vercel. Replaces manual `vercel --prod` with a full preflight + audit + deploy + verify sequence.

## Usage

```bash
# Standard deploy
uv run {baseDir}/scripts/deploy.py ./path/to/project

# Preview deploy with structured result output
uv run {baseDir}/scripts/deploy.py ./path/to/project --target preview --json-output /tmp/deploy-result.json

# Dry run — shows everything it would do, nothing executes
uv run {baseDir}/scripts/deploy.py ./path/to/project --dry-run

# Skip specific steps
uv run {baseDir}/scripts/deploy.py ./path/to/project --skip-assets
uv run {baseDir}/scripts/deploy.py ./path/to/project --skip-smoke

# Auto-fix env vars without prompting
uv run {baseDir}/scripts/deploy.py ./path/to/project --auto-env --yes

# Rollback to previous deployment
uv run {baseDir}/scripts/deploy.py ./path/to/project --rollback
```

## What It Does

```
1. PREFLIGHT     — CLI checks, Next.js version, node_modules
2. ASSET AUDIT   — Flag images <200KB (heroes/features), broken paths
3. ENV SYNC      — Diff .env.local vs Vercel, sync missing/changed vars
4. BUILD         — npm run build, parse errors, hard stop on failure
5. DEPLOY        — vercel preview or production deploy, capture URL
6. SMOKE TESTS   — Hit key routes, check status codes + auth redirects
7. REPORT        — Summary, URL, timings, any warnings
```

## Per-Project Config

Create `.deploy.json` in your project root to override defaults:

```json
{
  "env_file": ".env.local",
  "smoke_urls": [
    { "path": "/", "expect": 200 },
    { "path": "/dashboard", "expect": 200 },
    { "path": "/dashboard/leads", "expect": 302 },
    { "path": "/sitemap.xml", "expect": 200 },
    { "path": "/robots.txt", "expect": 200 }
  ],
  "asset_min_kb": 200,
  "hero_patterns": ["hero", "step", "about", "feature"],
  "notify": true
}
```

## Asset Audit Rules

- Images matching hero patterns (hero, step, about, feature) must be >200KB
- All images referenced in src/ must exist in public/
- If an image is flagged, you decide: provide a replacement path or skip
- Never auto-generates without your explicit OK

## Env Sync Rules

- Reads .env.local (or configured env_file)
- Skips vars prefixed with `#` (comments)
- Skips `NEXT_PUBLIC_` vars that are already correct on Vercel
- Uses `printf 'value' | vercel env add` — never heredoc, no whitespace bugs
- Shows a diff before applying anything

## Next.js Version Checks

Automatically flags known breaking changes per version:
- v16+: middleware.ts must be proxy.ts, export named `proxy`
- v15+: async params in page components
- v13+: App Router conventions

## Smoke Test Logic

- Follows redirects, checks final status
- Auth-protected routes expected to redirect → checks redirect target is /login or /dashboard (not 500)
- Reports response time per route

## Environment Variables Required

None — uses vercel CLI auth (must be logged in: `vercel whoami`)

## Structured Output

- `--json-output <path>` writes a machine-readable result with:
  - `status` (`preview_ready`, `production_ready`, or a `blocked_*` status)
  - `blocker_type`
  - `deploy_url`
  - `vercel_user`
  - per-step details
- Use this when an agent needs to persist deploy truth instead of narrating from memory or partial logs.

## Dependencies

- `uv` (Python runner)
- `vercel` CLI (npm install -g vercel)
- `node` + `npm`
- Python packages: requests (auto-installed via uv)
