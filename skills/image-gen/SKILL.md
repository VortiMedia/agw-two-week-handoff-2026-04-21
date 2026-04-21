---
name: image-gen
description: Generate images using Gemini or OpenAI with tiered model selection, prompt library templates, and batch generation.
homepage: https://ai.google.dev/
metadata:
  {
    "openclaw":
      {
        "emoji": "🎨",
        "requires": { "bins": ["uv"], "env": ["GEMINI_API_KEY"] },
        "primaryEnv": "GEMINI_API_KEY",
        "install":
          [
            {
              "id": "uv-brew",
              "kind": "brew",
              "formula": "uv",
              "bins": ["uv"],
              "label": "Install uv (brew)",
            },
          ],
      },
  }
---

# Image Gen (Gemini + OpenAI)

Unified image generation with tiered model selection across two providers. Draft cheap, finalize expensive.

## Tiered Workflow

| Tier | Provider | Model | Cost/img | When to use |
|------|----------|-------|----------|-------------|
| Draft | Gemini | Flash | $0.039 | Prompt iteration, testing |
| Draft | OpenAI | mini | ~$0.03 | Different style, cheap OpenAI |
| Final | Gemini | Pro | $0.134 | Polished Gemini output |
| Final | OpenAI | best (gpt-image-1.5) | ~$0.08-0.17 | Best OpenAI quality |

**Default:** Gemini Flash (cheapest). Use `--provider openai` for OpenAI models.

## Generate from a text prompt

```bash
# Gemini Flash (default — cheapest)
uv run {baseDir}/scripts/generate.py --prompt "a dental office waiting room, modern" --filename "output.png"

# OpenAI mini (cheap OpenAI draft)
uv run {baseDir}/scripts/generate.py --prompt "a dental office waiting room, modern" --provider openai --filename "output.png"

# OpenAI best (gpt-image-1.5 — highest quality)
uv run {baseDir}/scripts/generate.py --prompt "a dental office waiting room, modern" --provider openai --model best --filename "output.png"

# Gemini Pro (polished, 2K resolution)
uv run {baseDir}/scripts/generate.py --prompt "hero image for dental website" --model pro --resolution 2K --filename "hero.png"
```

## Generate from a template

```bash
uv run {baseDir}/scripts/generate.py --template lifestyle-004 --vars '{"subject": "a young woman in activewear", "setting": "bright outdoor park"}' --filename "lifestyle-shot.png"
```

## Batch generation (multiple variations)

```bash
uv run {baseDir}/scripts/generate.py --prompt "modern dental office" --batch 3 --filename "dental-{n}.png"
```

## Multi-size output

```bash
uv run {baseDir}/scripts/generate.py --prompt "modern dental office exterior" --sizes "1:1,16:9,4:5" --filename "dental-{ratio}.png"
```

## Cost estimate without generating

```bash
uv run {baseDir}/scripts/generate.py --prompt "..." --batch 5 --sizes "1:1,16:9" --cost-estimate
```

## Options

| Flag | Default | Description |
|------|---------|-------------|
| `--prompt` / `-p` | required* | Text prompt |
| `--template` / `-t` | — | Prompt library template ID |
| `--vars` / `-v` | `{}` | JSON variables for template substitution |
| `--filename` / `-f` | required | Output filename (`{n}` for batch, `{ratio}` for sizes) |
| `--provider` | `gemini` | `gemini` or `openai` |
| `--model` / `-m` | `auto` | Gemini: `flash`, `pro`. OpenAI: `mini`, `standard`, `best`. Or `auto`. |
| `--resolution` / `-r` | `1K` | Gemini only: `1K`, `2K`, `4K` |
| `--aspect-ratio` / `-a` | auto | `1:1`, `16:9`, `4:5`, etc. (mapped to closest OpenAI size automatically) |
| `--openai-size` | auto | OpenAI size override: `1024x1024`, `1536x1024`, `1024x1536`, `auto` |
| `--quality` | `auto` | OpenAI quality: `auto`, `low`, `medium`, `high` |
| `--batch` / `-b` | `1` | Number of variations |
| `--sizes` | — | Comma-separated aspect ratios for multi-size output |
| `--use-guidelines` | off | Use prompt library guidelines as system instructions (Gemini only) |
| `--cost-estimate` | off | Show cost estimate without generating |

\* Either `--prompt` or `--template` is required.

## Models

### Gemini
| Model | API ID | Cost/img | Resolution | Free Tier |
|-------|--------|----------|-----------|-----------|
| Flash | `gemini-2.5-flash-image` | $0.039 | 1K only | 500/day |
| Pro | `gemini-3-pro-image-preview` | $0.134 | 1K/2K/4K | None |

### OpenAI
| Model | API ID | Cost/img | Sizes |
|-------|--------|----------|-------|
| mini | `gpt-image-1-mini` | ~$0.02-0.04 | 1024² / 1536×1024 / 1024×1536 |
| standard | `gpt-image-1` | ~$0.08 | Same |
| best | `gpt-image-1.5` | ~$0.08-0.17 | Same |

## Environment Variables

- `GEMINI_API_KEY` — required for Gemini provider
- `OPENAI_API_KEY` — required for OpenAI provider

Both stored in `~/.openclaw/.env`.

## Notes

- Output is always PNG
- The script prints `MEDIA:<path>` for OpenClaw auto-attach
- Aspect ratios auto-map: 16:9/3:2 → 1536×1024, 9:16/2:3 → 1024×1536, 1:1 → 1024²
- Template library at: `content/prompt-library/`
- Draft on Flash/mini, finalize on Pro/best — saves 70-80% on iteration
