---
name: proposal-builder
description: "Build data-driven proposals for Google Ads management and OpenClaw automation setup services. Pulls real Keyword Planner data, competitive intel, and industry benchmarks to generate personalized PDFs. Used by Kit (PDF rendering) and Mika (data sourcing)."
---

# Proposal Builder

Generate personalized, data-backed proposals for prospects. Two proposal types: Google Ads management and AI/OpenClaw automation setup.

## When to Use
- Prospect reaches "Interested" or "Negotiating" status in pipeline
- David asks for a proposal for a specific lead
- Conference follow-up (attendee requests more info)
- Warm inbound lead from website or referral

## Proposal Type 1: Google Ads Management

### Data Collection (Mika provides)
1. **Keyword Planner data** for prospect's specialty + geo:
   ```bash
   vorti-ads keyword-planner --keywords "rhinoplasty near me,nose job cost" --location "New York, NY"
   ```
2. **Competitive landscape** — who's running ads in their market:
   ```bash
   vorti-ads search-terms --account agw --days 30  # For benchmark data
   ```
3. **Lead enrichment data** from Supabase:
   ```bash
   source ~/.openclaw/.env
   curl -s "$SUPABASE_URL/rest/v1/leads?id=eq.<lead_id>&select=*" \
     -H "apikey: $SUPABASE_KEY" -H "Authorization: Bearer $SUPABASE_KEY"
   ```
4. **Industry benchmarks** from knowledge base:
   ```
   memory_search "CPA benchmarks dental" or "cost per consultation plastic surgery"
   ```

### Sections
1. **Cover Page**
   - "[Practice Name] — Google Ads Growth Proposal"
   - Vorti logo + David's contact info
   - Date

2. **The Opportunity** (1 page)
   - "[X] people in [City] search for [specialty] services every month"
   - "Your top 3 competitors are spending $[X]-$[Y]/mo on Google Ads"
   - "The average cost per qualified consultation in [specialty] is $[X]"
   - Pull ALL numbers from Keyword Planner — never estimate

3. **The Problem** (1 page)
   - Speed-to-lead audit results (if we ran one)
   - Landing page score (if we scored it)
   - "40-55% of inbound leads are never worked by staff"
   - Match to their specific situation

4. **Our Approach** (1-2 pages)
   - Campaign architecture (Max Conversions, single campaign, multi ad group by procedure)
   - Landing page strategy (dedicated LP per ad group, conversion-optimized)
   - Tracking setup (call tracking, form tracking, conversion import)
   - Speed-to-lead system recommendations
   - Keyword architecture specific to their procedures

5. **Projected Results** (1 page)
   - Conservative, moderate, aggressive scenarios
   - Based on Keyword Planner CPC × our historical conversion rates
   - NEVER guarantee specific patient numbers — show the math, let them see it

6. **Investment** (1 page)
   - Setup: $2,000 (surgical) or $1,500 (non-surgical)
   - Monthly: $2,000 or $1,500
   - Ad spend: $2,500-$3,500/mo (paid directly to Google)
   - Guarantee: 10 qualified consultations in 30 days or full setup refund
   - "You own everything. Cancel anytime with 30 days notice."

7. **About Vorti** (half page)
   - $2M+ managed, healthcare specialty
   - Quick client results (anonymized)
   - David's direct contact

8. **Next Steps** (half page)
   - "Reply to this email" or "Book a 15-min call"
   - No calendar link in cold context — only after they've expressed interest

### Anti-Patterns
- Never say "dominate your market" or "crush the competition"
- Never use stock photos — clean design, real data, no filler
- Never inflate Keyword Planner numbers — use exact match volume
- Never promise a specific number of patients/consultations in the proposal body (the guarantee is in the pricing section only)

## Proposal Type 2: OpenClaw / AI Automation Setup

### Sections
1. **Cover Page** — "[Company] — AI Process Automation Proposal"
2. **The Problem** — Manual processes, wasted employee hours, inconsistent execution
3. **The Solution** — Autonomous AI agents tailored to their business
4. **Architecture** — Simple diagram of what agents do what (keep it non-technical)
5. **Implementation Timeline** — Typically 2-4 weeks
6. **Investment** — Custom quote based on complexity
7. **ROI Projection** — Hours saved × employee cost = payback period
8. **About** — David's background, the system running Vorti as proof

## Workflow
1. David says "build a proposal for [lead]" or lead hits Negotiating status
2. Morgan routes to Kit (PDF) + Mika (data)
3. Mika pulls Keyword Planner + competitive data
4. Kit generates HTML from template + data → renders PDF via pdf-generator skill
5. PDF saved to `content/proposals/<lead-slug>/`
6. Morgan presents to David for review
7. David approves → send via vorti-mail

## Output
- PDF file at `/tmp/vorti-pdfs/proposal-<slug>.pdf`
- Archive at `content/proposals/<slug>/YYYY-MM-DD-proposal.pdf`
- Data snapshot at `content/proposals/<slug>/data.json`
