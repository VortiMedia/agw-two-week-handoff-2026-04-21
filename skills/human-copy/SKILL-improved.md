---
name: human-copy
description: "Write copy that sounds like a real human — cold emails, LinkedIn DMs, Instagram DMs, Facebook comments, Reddit posts. AI detection avoidance built in. Applies to all outreach channels across Rex's pipeline."
---

# Human Copy — Vorti Voice System

All outbound copy — cold email, LinkedIn, Instagram, Facebook, Reddit — must pass the "did a real person write this?" test. This skill provides the framework.

## The Core Rule
If it could appear on a LinkedIn carousel, it's cringe. If it sounds like ChatGPT, it's dead. Write like a sharp 26-year-old who knows the industry cold and has zero time for bullshit.

## AI Detection Kill List
**Never use these phrases or patterns:**

```
BANNED WORDS/PHRASES:
- "I hope this finds you well"
- "I wanted to reach out"
- "game-changer", "game-changing"
- "leverage" (as a verb)
- "seamlessly", "effortlessly"
- "touch base", "circle back"
- "synergy", "synergize"
- "cutting-edge", "state-of-the-art"
- "in today's competitive landscape"
- "I came across your profile and was impressed"
- "I'd love to connect"
- "reaching out because..."
- "As a [JOB TITLE], I understand..."
- Bullet points in cold outreach (they scream template)
- 3+ adjectives in a row
- Passive voice constructions
- Overly formal contractions avoidance (use contractions: "you're", "we've", "I've")
```

**Structural patterns that signal AI:**
- Paragraph that starts with "As" ("As a dental practice owner...")
- Sentences longer than 25 words
- Opening with "I" (weak, self-focused)
- Starting every sentence with "The" or "This"
- More than 2 sentences about yourself before asking a question

## Cold Email Framework

### Subject Lines (pick the pattern, not the words)
```
Pattern 1: Operational specificity
"[City] dental — Google Ads question"
"quick question about [Competitor Name]'s ads"

Pattern 2: Results reference
"added 23 implant patients in 8 weeks"
"how [Similar Practice] cut CPL by 40%"

Pattern 3: Direct observation
"saw you're running ads for [keyword]"
"noticed something on your Google Ads"
```

### Email Body Structure
```
LINE 1: Observation or specific hook (1 sentence, not about you)
LINE 2: The problem (1-2 sentences, concrete numbers preferred)
LINE 3: Proof it's solvable (1 sentence, specific)
LINE 4: Soft CTA (1 question, no pressure)

TOTAL: 4-6 sentences max. No greetings. No sign-off fluff.
```

### CTA — Required Format
The email MUST end with exactly one of these approved CTAs:
- "Worth a conversation?"
- "Worth a quick look?"
- "Want me to pull the numbers for [City]?"

**Never use time commitments** ("15 minutes", "quick call") or vague asks ("let me know"). One question. That's it.

### Email Templates by Stage

**Email 1 — Cold Open**
```
[Observation about their practice/ads/market].
Most [specialty] practices [running ads / in their market] are [specific problem — wasted spend, wrong keywords, competitors eating their leads].
We fixed this for [analogous practice type] — went from [X] to [Y] in [timeframe].
Worth a conversation?
```

**Email 2 — Day 3 Follow-Up**
```
Sending this again in case it got buried.
[One new data point or observation — market stat, competitor move, specific insight].
[Same soft CTA or slight variation].
```

**Email 3 — Day 7 Break-Up**
```
Last one from me.
If [their goal] isn't a priority right now, totally get it.
If it ever is — [simple reactivation hook].
```

## LinkedIn DM Framework

### Connection Request (<300 chars, zero pitch)
```
[Specific observation about their work/practice/content].
[One genuine question or comment].
[No ask, no pitch, no "let's connect"].
```

Example:
```
Saw your implant case study series — the before/afters are genuinely impressive.
The organic engagement on those is way higher than most practice pages.
```

### First Message After Accept
```
[Reference back to connection request observation].
[Bridge to their challenge — one sentence].
[Soft question, not a pitch].

Max 60 words.
```

### Follow-Up (Day 5)
```
[New hook — something you noticed since connecting].
[Direct question about their situation].
No pitch.
```

## Instagram DM Framework

### Cold DM (browser automation via Instagram profile)
```
[Genuine comment about their content — specific post or reel].
[Question that shows you actually watched/read it].
[No offer, no pitch — just conversation starter].

Max 40 words. Must reference something real from their profile.
```

### Follow-Up After Reply
Get the conversation going naturally. Ask about their practice, their biggest challenge with marketing. Earn the pitch before making it. Min 2-3 exchanges before any ask.

## Facebook Framework

### Group Engagement (Rex browser automation)
```
Target groups: dental practice owners, healthcare marketing, medical spa owners
Engagement type: Genuine answers to questions, not promotional

Pattern:
- Find posts asking about marketing/ads/patient acquisition
- Reply with specific, useful advice (no pitch)
- Reference our experience with dental/healthcare clients
- Follow up privately only if they engage
```

### Comment Copy
```
No "Great question!" — ever.
Lead with the answer, not an acknowledgment.
Max 3 sentences.
One specific data point or example.
End with a question to continue the thread.
```

## Reddit Framework

### Target Subreddits
- r/dentistry, r/DentalPracticeManagement
- r/smallbusiness, r/marketing (healthcare/medical posts)
- r/GoogleAds (establish expertise)

### Reddit Voice
Reddit hates marketers. To win there:
```
- Use first person, share actual failures as well as wins
- Cite specific numbers ("we ran this test, here's what happened")
- Never mention Vorti by name in Reddit threads
- Add value in 90% of comments before any soft mention
- If asked what you do: honest, brief, no pitch ("run Google Ads for dental practices")
```

## Multi-Channel ABM Timing (Whale Targets — $10K+/yr potential)

For prospects who didn't respond to standard pipeline:

| Day | Channel | Action |
|-----|---------|--------|
| 0 | Email | Email 1 via Rex pipeline |
| 2 | LinkedIn | Connection request (no pitch) |
| 3 | Email | Email 2 (follow-up) |
| 4 | LinkedIn | First message if connected |
| 7 | Email | Email 3 (break-up) |
| 7 | Handwritten | Letter sent via Scribeless (arrives ~Day 12) |
| 8 | LinkedIn | Engage with their content |
| 12 | Email | "Got my note?" reference letter |
| 14 | Phone | David cold call (Morgan provides talking points) |

**Scribeless API** (key in openclaw.json env: SCRIBELESS_API_KEY):
```bash
curl -X POST "https://platform.scribeless.co/api/recipients" \
  -H "X-API-Key: $SCRIBELESS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "campaignId": "CAMPAIGN_ID",
    "data": {
      "firstName": "John", "lastName": "Smith",
      "company": "Smith Dental Group",
      "address": {"address1": "...", "city": "...", "state": "NY", "postalCode": "...", "country": "US"},
      "variables": {"custom1": "Personalized note — reference something specific about their practice"}
    }
  }'
```
Cost: ~$5-8/letter. Use only for $10K+/yr targets.

## Quality Gate (Before Any Copy Goes Out)
- [ ] No banned phrases
- [ ] Under 100 words for cold email
- [ ] Under 300 chars for LinkedIn connection note
- [ ] Starts with observation, not "I"
- [ ] Contains at least one specific data point or observation
- [ ] Reads naturally out loud
- [ ] Ends with exactly one approved CTA (see CTA section above) — a specific yes/no question, no time commitments