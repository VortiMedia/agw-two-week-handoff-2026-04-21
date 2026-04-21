---
name: kit-gsd
description: "Kit's build execution skill — GSD-powered heavy builds, vertical playbook lookup before every LP/proposal, case study injection into proposals, Impeccable polish pass, MiroFish market intel hook. Use when: building any LP, proposal, or site with more than 200 lines of code, or any asset that will be shown to a real prospect."
---

# Kit GSD — Build Execution Skill

## 1. When To Use This Skill

**Use for:**
- Any landing page build (ad group LP, standalone LP, campaign LP)
- Any proposal (Google Ads management OR AI automation)
- Any website build (client site or Vorti site)
- Any build >200 lines that will be shown to a real prospect

**NOT for:** quick HTML edits, cron configs, data scripts, internal tooling, cold email copy (Rex's domain).

---

## 2. Vertical Playbook Lookup (MANDATORY before every build)

Before writing a single line of code or copy for any LP or proposal, run this sequence:

```bash
# 1. Check if playbook exists for this vertical
ls /Users/claw/.openclaw/workspace-vorti-main/playbooks/ 2>/dev/null

# 2. Search memory for relevant vertical context
memory_search("vertical name + keywords/copy/CPA")

# 3. If playbook exists, load it — it contains:
#    - Winning copy angles for this vertical
#    - ICP pain points and fears (in their language)
#    - CPA benchmarks (from real spend data)
#    - Waste patterns (what ICPs say that signals low intent)
#    - Case study data (real numbers from our clients)
```

**If playbook exists:** Load it. Use its copy angles, fear/pain language, CPA context, and proof points. Do not freestyle when playbook data exists.

**If no playbook exists:** Note the gap in `memory/state/blockers.md` with the vertical name and date. Proceed with general Vorti knowledge + Mika keyword data. Flag to David: "No playbook for [vertical] — building from general knowledge."

**Priority verticals (playbook status):**
1. Painting / Home Services — AGW reference account
2. Cash Home Buyers — Pace reference account
3. Hotel / B&B — West Hill reference account
4. Dental / Healthcare — no reference account yet, playbook seeds from research

---

## 3. Case Study Injection (proposals only)

For any proposal, check case studies first:

```bash
ls /Users/claw/.openclaw/workspace-vorti-main/case-studies/ 2>/dev/null
```

**AGW Painting case study** (primary — use when available):
- Facts: painting contractor, $2K → $4.5K/mo managed retainer (125% increase in 60 days)
- The client voluntarily increased spend because results justified it
- Use when: prospect is home services (painting, contracting, landscaping, plumbing, HVAC)
- Inject in: **The Opportunity** section + **About Vorti** section
- Format: one tight paragraph, real numbers, no fluff

Example injection:
> "Our last home services client — a painting contractor — went from $2K/mo to $4.5K/mo in managed spend within 60 days. They increased their investment because the qualified lead pipeline we built justified it. We'll apply the same playbook to your business."

**Pace Cash Buyers** (when written): different economics, motivated seller signals. Use for: real estate investors, wholesalers.

**No case study available for vertical:** Skip injection. Don't fabricate. Use general Vorti stats ("$2M+ managed, healthcare + home services specialty").

---

## 4. GSD for Heavy Builds (>200 lines or multi-component)

### Install (once)
```bash
npx get-shit-done-cc@latest --claude --global
```

### Heavy LP or site build flow
```bash
# Start in a clean worktree — never build in workspace root
git worktree add /tmp/kit-build-[slug] main
cd /tmp/kit-build-[slug]

# GSD flow — each phase gets fresh context, zero accumulated garbage
/gsd:new-project        # describe what you're building
/gsd:discuss-phase 1    # nail down: what action should visitor take? what does success look like?
/gsd:plan-phase 1       # research + atomic task plans
/gsd:execute-phase 1    # parallel build, fresh context per component
/gsd:verify-work 1      # does it actually convert? does it look right?
```

### When to use GSD vs inline
| Scenario | Approach |
|----------|----------|
| LP <200 lines, single component | Build inline. Impeccable pass still mandatory. |
| LP >200 lines or multi-page | GSD. Worktree. Full flow. |
| Client website (any size) | GSD. Always. |
| Proposal PDF | Inline — template-driven, not code-heavy. |
| Internal tool / script | Inline. No Impeccable pass needed. |

### Model profile
Use `balanced` (Opus for planning, Sonnet for execution). Switch to `budget` for quick tactical fixes only.

---

## 5. Client-Facing Rebuild Gate

Use this for any existing website, homepage reset, redesign pass, or client-facing repair.

### Before coding
1. Review the current page, screenshot, or live preview.
2. Name **3-5 concrete visual problems** in plain language.
3. Tie each one to a component or region, not an abstraction.

Good:
- `the first screen wastes vertical space in the top strip + header`
- `the hero headline is oversized and stacks awkwardly on mobile`
- `the right-side estimate form looks like a generic template widget`
- `the page still repeats the same card rhythm even after section shuffling`

Bad:
- `section grammar`
- `still feels repetitive`
- `needs more polish`
- `the structure is overdesigned`

### Structural change rule
- Do not say `reset`, `collapse`, `strip back`, or `trim pass` unless you can state the exact new structure first.
- One structural thesis per pass. Do not thrash through three homepage concepts in a row.

### Deployment rule
- No deploy until local visual QA passes.
- For client-facing site work, review the actual rendered page or screenshot before shipping.
- If the render still shows the same failure shape, do not deploy just because the code diff is large.

### Reporting rule
- Report exact changes, not self-congratulatory abstractions.
- Bad: `I fixed the grammar`, `I collapsed the page`, `this reset is cleaner`.
- Good: `removed the top promo strip`, `cut hero headline from 8 lines to 4`, `replaced 3 stacked mini-cards with one proof band`.

---

## 6. Landing Page Build Protocol

Every LP follows this order — never skip steps:

### Step 1: Goal
What ONE action should the visitor take?
- Book a call → calendar embed or form
- Fill a form → short form, above fold
- Call a number → click-to-call, prominent

### Step 2: Vertical playbook
Load playbook if exists (Section 2 above). Extract: winning hook, ICP fears, CPA context, proof points.

### Step 3: Mika keyword data
```bash
vorti-ads keyword-planner --keywords "[main keyword]" --location "[geo]"
```
Pull: search volume, CPC, competition level. Use in copy ("X people in [City] search for this every month").

### Step 4: Build structure
```
Hero        → Hook (from playbook) + single CTA above the fold
Problem     → 3 bullets — ICP's exact fears in their language
Solution    → What Vorti/client does, tied to their vertical
Proof       → Case study number (if exists) or social proof
CTA         → Repeated at bottom, same as hero
```

Stack: Next.js + Tailwind CSS. Mobile-first. Conversion-focused.

### Step 5: Impeccable pass (mandatory — no exceptions)
```bash
npx impeccable distill ./components/LandingPage.tsx    # remove clutter, tighten hierarchy
npx impeccable colorize ./styles/globals.css --brand [hex]  # correct color usage
npx impeccable animate ./components/Hero.tsx            # add purposeful motion
npx impeccable delight ./components/CTA.tsx             # micro-interactions, polish
```

### Step 6: Deploy
```bash
cd [project-dir]
wrangler pages deploy ./out --project-name [project-name]
```
Confirm URL is accessible. Screenshot hero for David.

### Step 7: Autoresearch hook
After deploy, update `memory/reference/offer-strategy.md` — add LP URL as landing destination for active experiment. Conversion rate becomes a tracked metric in the autoresearch loop.

---

## 7. Proposal Build Protocol

### Step 1: Prospect data
```bash
source ~/.openclaw/.env
curl -s "$SUPABASE_URL/rest/v1/leads?id=eq.[lead_id]&select=*" \
  -H "apikey: $SUPABASE_KEY" -H "Authorization: Bearer $SUPABASE_KEY"
```

### Step 2: Vertical playbook lookup
Mandatory. See Section 2. No shortcuts.

### Step 3: Case study check
See Section 3. Inject if vertical matches.

### Step 4: MiroFish hook (enterprise $5K+/mo prospects only)
```bash
# Run full MiroFish pipeline — handles health check + fallback internally
# Exit 0 = success (market intel with simulation data)
# Exit 1 = fallback used (market intel from vertical benchmarks — MiroFish not running)
# Exit 2 = lead not found
python scripts/proposal_inject.py --lead-id [lead_id]

# Output: /tmp/market-intel-[slug].md
# Kit: include this file content in proposal PDF under "Market Intelligence" section
if [ $? -le 1 ]; then
  echo "Market intel ready — include in proposal"
  # The file at /tmp/market-intel-[slug].md contains a formatted ## Market Intelligence section
fi
```
If MiroFish not available: fallback benchmarks are used automatically. The proposal is never blocked.
To set up MiroFish: `bash scripts/mirofish_setup.sh` (requires Docker + API keys).

### Step 5: Keyword data from Mika (always)
```bash
vorti-ads keyword-planner --keywords "[specialty] near me,[specialty] cost" --location "[city, state]"
```
A proposal without market data is a guess. Non-negotiable.

### Step 6: Generate PDF
```bash
python scripts/generate_proposal.py --client [name] --vertical [type] --geo [city]
```

### Step 7: Store
```
content/proposals/[slug]/YYYY-MM-DD-proposal.pdf
content/proposals/[slug]/data.json   # data snapshot
```

### Step 8: Report to David
Link + 2-line summary: what data was used, what case study was injected (if any), recommended follow-up timing.

---

## 8. Impeccable Pass Reference

Run after EVERY AI-generated component. The difference between "AI-generated" and "custom-quality" is always the Impeccable pass.

### Full pass (anything prospect-facing)
```bash
npx impeccable distill ./path/to/component     # remove clutter, tighten hierarchy
npx impeccable colorize ./styles/globals.css --brand [hex]  # correct color usage
npx impeccable animate ./components/Hero.tsx    # add purposeful motion
npx impeccable delight ./components/CTA.tsx     # micro-interactions, polish
```

### Quick pass (internal tools only)
```bash
npx impeccable distill ./path/to/component
```

### Rules
- Prospect-facing work: full pass. Always. No exceptions.
- Internal tooling: quick pass or skip entirely.
- Never ship an AI-generated component without at least `distill`.
- Run Impeccable AFTER the build is functionally complete — polish last, not first.

---

## 8. Autoresearch Loop Connections

Kit feeds the autoresearch loop in two ways:

### LPs → Conversion signal
Every deployed LP gets added to `memory/reference/offer-strategy.md` as the destination URL for active experiments. When emails generate replies → replies book calls → LP conversion rate becomes a trackable metric. This closes the loop: better LPs → higher conversion → better autoresearch signal.

### Proposals → Case study pipeline
Every successful proposal (prospect becomes client) triggers a case study snapshot:

```bash
# After client is confirmed won
python scripts/generate_case_study.py --client [name] --vertical [type] --result "[key outcome]"
```

- Template: `case-studies/TEMPLATE.md`
- Output: `case-studies/[slug].md`
- This feeds back into the next proposal for the same vertical
- At 30 days: first data point. At 90 days: full case study auto-drafted from Supabase data.

### Vertical playbook updates
If a build reveals new patterns (winning hook that wasn't in playbook, new ICP fear language from prospect conversation), update the playbook:

```bash
# Append new pattern to playbook
echo "## New Pattern — [date]" >> /Users/claw/.openclaw/workspace-vorti-main/playbooks/[vertical].md
```

The playbook IS the compound asset. Every build should make it stronger.

---

## 9. Deployment Checklist

Before marking any build complete:

- [ ] Impeccable pass run on all prospect-facing components
- [ ] LP deployed and URL confirmed accessible (not 404, not broken mobile)
- [ ] Vertical playbook consulted before build (or gap noted in blockers.md)
- [ ] Case study data injected if vertical match exists
- [ ] Keyword data from Mika pulled and used in copy
- [ ] `offer-strategy.md` updated with LP URL (for autoresearch tracking)
- [ ] Vertical playbook updated if new patterns discovered during build
- [ ] Build logged to Supabase `agent_events`
- [ ] Link + summary shared with David

---

## 10. Anti-Patterns

- **Building without playbook check.** Even if you "know" the vertical — check. The playbook has tested data, not vibes.
- **Skipping Impeccable on prospect-facing work.** The #1 tell of AI-generated sites. Never ship without polish.
- **Proposals without Mika keyword data.** A proposal without market data is a guess. David's rule.
- **Freestyle copy when case study exists.** Real numbers beat generic claims every time. Use the data.
- **Building in workspace root.** Heavy builds go in worktrees. Keep workspace clean.
- **Multi-variable LP experiments.** One CTA, one hook, one goal per LP. Test one thing at a time.
- **Fabricating case study data.** If the numbers don't exist, don't invent them. Use general Vorti stats instead.
