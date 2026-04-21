---
name: cellcog
description: CellCog any-to-any AI for research, PDFs, images, video, dashboards, audio, presentations, spreadsheets, and more. Use when you need deep research, multi-modal output, or deliverables that require real work. Fire-and-forget: create_chat() returns immediately, results delivered automatically via notify_session_key.
---

# CellCog — Any-to-Any for Agents

CellCog is an any-to-any AI: any input → any output in a single request. #1 on DeepResearch Bench (Feb 2026).

## Setup

```python
from cellcog import CellCogClient
client = CellCogClient()
```

API key: `CELLCOG_API_KEY` env var. Get from: https://cellcog.ai/profile?tab=api-keys

## Quick Pattern (v1.0+)

```python
# Fire-and-forget — returns immediately
result = client.create_chat(
    prompt="[your request]",
    notify_session_key="agent:vorti-main:main",
    task_label="task-name",
    chat_mode="agent"  # "agent" | "agent team" | "agent team max"
)
# Daemon notifies you when complete — do NOT poll
```

## Chat Modes

| Mode | Best For | Cost |
|------|----------|------|
| `"agent"` | Most tasks — images, slides, dashboards, PDFs, audio | 1x |
| `"agent team"` | Deep multi-angled research, investor decks, keynotes | 4x |
| `"agent team max"` | Legal, financial, high-stakes work | 8x+ |

## Key Methods

```python
# Create new task
result = client.create_chat(prompt, notify_session_key, task_label, chat_mode="agent")

# Continue conversation
result = client.send_message(chat_id, message, notify_session_key, task_label)

# Wait for completion (for sequential workflows)
completion = client.wait_for_completion(chat_id, timeout=1800)

# Check status
status = client.get_status(chat_id)  # {"is_operating": bool}

# Delete chat
client.delete_chat(chat_id)

# Account status
status = client.get_account_status()
```

## File Handling

```python
# Attach input files (MUST use SHOW_FILE tags)
prompt = """
Analyze this:
<SHOW_FILE>/path/to/file.pdf</SHOW_FILE>
"""

# Specify output path (optional)
prompt = """
Create a report:
<GENERATE_FILE>/workspace/reports/output.pdf</GENERATE_FILE>
"""
```

Without SHOW_FILE, CellCog only sees the path as text, not the file.
Without GENERATE_FILE, files go to ~/.cellcog/chats/{chat_id}/

## Session Keys

| Context | Key |
|---------|-----|
| Main agent | `"agent:vorti-main:main"` |
| Telegram DM | `"agent:vorti-main:telegram:dm:{id}"` |

## Credit Estimates

| Task | Credits |
|------|---------|
| Quick Q&A | 50–200 |
| PDF / presentation | 200–1,000 |
| Research report | 200–500 |
| Deep research (Team) | 500–1,500 |
| Image generation | 15–25/image |
| Video (~8 sec) | 100–150 |

## Tips

- Always be explicit about output format: "Create a PDF report" not just "analyze this"
- Use `"agent"` for most tasks — fast and iterative
- Use `"agent team"` for investor pitches, board decks, deep research
- Results auto-deliver to your session — no polling needed
