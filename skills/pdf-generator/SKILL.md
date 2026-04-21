---
name: pdf-generator
description: "Generate beautiful, paginated PDFs using Puppeteer. For proposals, reports, audits, guides, and any document that needs to look professional. Handles pagination properly — no content cut-offs, no orphaned headers, no broken tables."
---

# PDF Generator

Create professional PDFs from data and templates using Puppeteer's headless Chrome rendering.

## When to Use
- Google Ads proposals/audits for prospects
- Client performance reports (weekly/monthly)
- Conference speaker kits (bio + talk abstracts)
- OpenClaw setup proposals for AI automation services
- Any document that needs to look polished and be emailed/attached

## Architecture

### Option 1: Puppeteer (Recommended)
Generate HTML with CSS → render to PDF via Puppeteer headless Chrome.

```javascript
const puppeteer = require('puppeteer');

async function generatePDF(htmlContent, outputPath) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready'); // wait for web fonts
  await page.pdf({
    path: outputPath,
    format: 'A4',
    // Zero margins — CSS padding on each .page div handles all content spacing.
    // Cover is full-bleed because it has width:210mm height:297mm and no padding constraint.
    // @page CSS and negative margin tricks are both broken in Puppeteer v24+.
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    printBackground: true,
    displayHeaderFooter: false,
    preferCSSPageSize: false,
  });
  await browser.close();
}
```

**Required CSS structure in every PDF template:**
```css
/* Full-bleed cover — no margin, no padding from Puppeteer */
.cover {
  width: 210mm;
  height: 297mm;      /* exact A4 — NEVER min-height: 100vh */
  overflow: hidden;
  page-break-after: always;
  /* padding goes inside here for cover content layout */
  padding: 64px 68px;
}

/* Each content page = its own div, padding fires at top of new page */
.page {
  padding: 0.55in 0.65in 0.65in 0.65in;
  page-break-before: always;
  break-before: page;
}
```

**HTML structure:**
```html
<div class="cover">...</div>       <!-- full-bleed -->
<div class="page">...</div>        <!-- page 2 — padding fires at top -->
<div class="page">...</div>        <!-- page 3 -->
<div class="page">...</div>        <!-- page N -->
```

⚠️ **Both `@page` CSS and negative-margin cover tricks are broken in Puppeteer v24+ headless.** Use Puppeteer `margin: 0` + per-page divs with `padding` + `page-break-before: always`. Cover is the only zero-padding element (full-bleed by design).

### Option 2: nano-pdf Skill
For editing existing PDFs or simple text-to-PDF conversions.

## Pagination Rules (CRITICAL)

### The 5 Rules That Actually Matter

**Rule 1: Puppeteer margin = 0. Each content page = its own div with padding + `page-break-before: always`.**

Both `@page` CSS and negative-margin cover tricks are **confirmed broken** in Puppeteer v24+ headless.

The only confirmed correct approach (tested via pdftohtml y-position measurement):

```javascript
// Puppeteer: zero margins — CSS padding on each section handles spacing
margin: { top: '0', right: '0', bottom: '0', left: '0' }
```

```css
/* COVER: full-bleed, zero-margin — must be first element */
.cover {
  width: 210mm;
  height: 297mm;    /* exact A4 — never min-height: 100vh */
  overflow: hidden;
  page-break-after: always;
  /* no margin, no padding constraints from Puppeteer */
}

/* CONTENT PAGES: each page is its own div with padding + page-break-before.
   padding-top fires at the TOP of each new page because the div starts fresh. */
.page {
  padding: 0.55in 0.65in 0.65in 0.65in;
  page-break-before: always;
  break-before: page;
}
```

**Why this works:** `padding-top` on a div that starts with `page-break-before: always` fires at the very top of the new PDF page. It is NOT consumed on a previous page because the div itself starts at the top of the new page. Confirmed: first text y-position = 127pts (~1.76in from top) on all content pages.

**Why overflow divs fail:** If content overflows mid-div onto a new page, `padding-top` was already consumed when the div opened on the previous page. Continuation content starts at y=0 or y=46 (just margins from line height). Always use one div per page.

**Why negative margin on cover fails:** Puppeteer renders inside a viewport bounded by its margin values. CSS negative margins cannot push content outside that bounded area.

**Structure every PDF like this:**
```html
<!-- Cover: full-bleed -->
<div class="cover">...</div>

<!-- Each section = its own .page div -->
<div class="page">  <!-- page-break-before: always + padding -->
  <!-- section content here -->
</div>

<div class="page">
  <!-- next section -->
</div>
```

**Rule 2: Cover page must be exact A4, not `100vh`.**
```css
.cover {
  width: 210mm;
  height: 297mm;          /* exact A4 — not min-height: 100vh */
  overflow: hidden;       /* never allow bleed */
  break-after: page;
  page-break-after: always;
}
```
`100vh` in headless Chrome ≠ 297mm. It breaks your page grid.

**Rule 3: Section labels must be grouped with their first content element.**
```html
<!-- WRONG: label floats, table jumps to next page, giant gap -->
<div class="section-label">Keyword Data</div>
<table>...</table>

<!-- CORRECT: wrap them together -->
<div class="section-group">   <!-- break-inside: avoid -->
  <div class="section-label">Keyword Data</div>
  <table>...</table>
</div>
```
```css
.section-group { break-inside: avoid; page-break-inside: avoid; }
```

**Rule 4: Large tables (> ~8 rows) must be allowed to split across pages.**
```css
/* WRONG for large tables — entire table dumps to next page = giant gap */
table { page-break-inside: avoid; }

/* CORRECT — rows never split, but table can span pages */
table { break-inside: auto; page-break-inside: auto; }
tr    { break-inside: avoid; page-break-inside: avoid; }
```

**Rule 5: Only apply `break-inside: avoid` to small atomic units.**
Apply to: metric cards (3–4 fields), 2-row data blocks, callout boxes, step items.
Never apply to: entire page sections, large tables, flexible-height containers.

### Full pagination CSS block
```css
/* Modern + legacy break properties for Chrome/Puppeteer */
h1, h2, h3, h4, h5, h6 { break-after: avoid; page-break-after: avoid; }

/* Tables: allow splitting, but never split a row */
table { break-inside: auto; page-break-inside: auto; }
tr    { break-inside: avoid; page-break-inside: avoid; }

/* Small atomic units: keep together */
.metric-card, .callout, .scenario, .step, .campaign-block {
  break-inside: avoid;
  page-break-inside: avoid;
}

/* Section label must travel with its first content block */
.section-group { break-inside: avoid; page-break-inside: avoid; }

/* Explicit page breaks */
.page-break { break-before: page; page-break-before: always; }

/* Orphan/widow control */
p { orphans: 3; widows: 3; }
```

## Design System

### Brand Colors (Vorti)
```css
:root {
  --primary: #1a1a2e;     /* Dark navy */
  --secondary: #16213e;   /* Deep blue */
  --accent: #0f3460;      /* Blue accent */
  --highlight: #e94560;   /* Red/coral pop */
  --text: #1a1a2e;        /* Dark text */
  --text-light: #6c757d;  /* Muted text */
  --bg: #ffffff;          /* White */
  --bg-alt: #f8f9fa;      /* Light gray */
  --border: #e9ecef;      /* Subtle border */
}
```

### Typography
```css
body {
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 11pt;
  line-height: 1.6;
  color: var(--text);
}
h1 { font-size: 28pt; font-weight: 700; }
h2 { font-size: 20pt; font-weight: 600; margin-top: 24pt; }
h3 { font-size: 14pt; font-weight: 600; }
```

### Common Components

**Metric Card:**
```html
<div class="metric-card">
  <div class="metric-value">$95</div>
  <div class="metric-label">Cost per Consultation</div>
  <div class="metric-change positive">↓ 62% from industry avg</div>
</div>
```

**Data Table:**
```html
<table class="data-table">
  <thead><tr><th>Metric</th><th>Current</th><th>Benchmark</th></tr></thead>
  <tbody><tr><td>CPA</td><td>$95</td><td>$374</td></tr></tbody>
</table>
```

## PDF Types

### 1. Google Ads Proposal
Sections: Cover → Executive Summary → Market Analysis (Keyword Planner data) → Competitive Landscape → Proposed Strategy → Pricing → Case Studies → Next Steps

Data sources:
- `vorti-ads keyword-planner` for search volume + CPC
- `memory_search` for industry benchmarks
- Lead's enrichment data from Supabase

### 2. Client Performance Report
Sections: Cover → KPIs at a Glance → Campaign Performance → Search Term Analysis → Conversion Analysis → Recommendations → Next Month Plan

Data sources:
- `vorti-ads performance --account <client>`
- `vorti-analytics bounce-report --account <client>`
- `vorti-analytics conversions --account <client>`

### 3. OpenClaw/AI Automation Proposal
Sections: Cover → The Problem (manual processes costing time) → The Solution (autonomous agents) → Architecture Overview → Implementation Plan → Pricing → ROI Projection

### 4. Speaker Kit
Sections: Bio → Headshot → Available Talks (titles + abstracts) → Past Speaking → Testimonials → Contact

## File Output
- Save generated PDFs to `/tmp/vorti-pdfs/` for immediate use
- Archive to `content/proposals/<client-slug>/` for record-keeping
- File naming: `YYYY-MM-DD-<type>-<client-slug>.pdf`

## Dependencies
```bash
npm install puppeteer
# Already available on the Mac mini
```

## Anti-Patterns
- **Never use `@page` CSS** — silently ignored by Puppeteer v24+, confirmed via hash test
- **Never use negative CSS margin on cover** — Puppeteer renders inside a bounded viewport; negative margin cannot escape it, white border remains
- **Never let content overflow mid-div onto a new page** — `padding-top` is consumed when the div opens; continuation starts at y=0. Use one `.page` div per section with `page-break-before: always`
- **Never use `min-height: 100vh` on a cover page** — use `height: 297mm` (exact A4)
- **Never apply `page-break-inside: avoid` to a large table** — the whole table dumps to the next page and leaves a gap
- **Never leave a section label as a standalone div before a table** — wrap them in `.section-group`
- Never generate PDFs with raw markdown → always render HTML first
- Never use fixed-height containers on body content (content varies → overflow = cut off)
- Never put critical data at the bottom of a page without a `.section-group` wrapper
- Never use lorem ipsum — every number must be real or clearly marked as projected
- Don't embed massive images — 150 DPI for print, 72 for screen-only
