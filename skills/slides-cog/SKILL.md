---
name: slides-cog
description: Generate professional slide decks and presentations via CellCog. PDF by default (highest quality). Handles pitch decks, keynotes, conference talks, board presentations, sales decks, educational slides, and image slideshows. Requires cellcog skill and CELLCOG_API_KEY.
---

# Slides-Cog — Content Worth Presenting, Design Worth Looking At

Powered by CellCog (via cellcog skill). PDF is the default and the best format.

## Prerequisites

Read the `cellcog` SKILL.md first for SDK setup and API calls.

```python
from cellcog import CellCogClient
client = CellCogClient()  # requires CELLCOG_API_KEY
```

## Quick Pattern

```python
result = client.create_chat(
    prompt="[your presentation request]",
    notify_session_key="agent:vorti-main:main",
    task_label="presentation-task",
    chat_mode="agent"  # Use "agent team" for keynotes and investor pitches
)
# Daemon notifies you when complete — do NOT poll
```

## Chat Mode for Presentations

| Scenario | Mode |
|----------|------|
| Standard decks, educational slides, training, sales | `"agent"` |
| Investor pitch decks, board presentations, conference keynotes | `"agent team"` |

## Output Format

**PDF is the default.** Always. No questions asked.

- Full control over layout, typography, design
- Perfect rendering across all devices
- Professional, presentation-ready

PPTX/DOCX only if explicitly requested — quality is ~30-40% of PDF.

## Presentation Types

### Pitch Decks
```
"Create a 12-slide Series A pitch deck for [company] — a B2B SaaS that [does X].
Include: Problem, Solution, Product Demo, Market Size, Business Model, Traction, Team, Competition, GTM, Financials, Ask, Contact.
Key metrics: $X MRR, Y customers, Z% MoM growth, seeking $Xm.
Modern professional design."
```

### Conference / Keynote Talk
```
"Create a 20-minute conference presentation on [topic].
Audience: [technical/executive/general]
Key points: [list them]
Modern design, bold visuals."
```

### Business / QBR
```
"Create a QBR presentation for Q4 2025:
- Executive Summary
- Revenue Performance (95% of target)
- Customer Metrics (NPS 72)
- Key Wins (3 enterprise deals)
- Challenges (SMB churn)
- Q1 2026 Priorities
Corporate professional style."
```

### Educational / Training
```
"Create a 15-slide presentation for 'Introduction to [Topic]'.
Slides: [list them]
Beginner-friendly, code examples, clean modern design."
```

### Sales / Capabilities Deck
```
"Build a capabilities presentation for enterprise sales.
Cover: who we are, what we do, case studies, ROI proof points, next steps.
Clean, professional."
```

## Tips for Better Slides

- **Slide count:** Specify it — "10-12 slides" scopes appropriately
- **List the slides:** Even rough outline helps
- **Provide real data:** Actual metrics > placeholders
- **Design direction:** "Minimal and modern" / "Corporate professional" / "Bold and colorful"
- **Audience:** "For investors" vs "For technical team" changes tone and depth
- **Trust PDF:** Only request PPTX if you truly need to edit afterwards

## Example: Requesting PPTX (Only When Needed)

```
"Create a 10-slide sales deck as PPTX (I need to edit it in PowerPoint).
Note: I understand PDF quality is better, but I need the editable format."
```
