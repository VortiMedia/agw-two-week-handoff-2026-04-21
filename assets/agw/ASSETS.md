# AGW Assets — Canonical Layout

Keep `assets/` clean. Everything AGW lives under `assets/agw/`.

## Quick rules
- Use **site-ready images** from `assets/agw/photos/curated/high/`.
- Avoid `assets/agw/photos/curated/low/` unless you’re desperate.
- Anything in `assets/agw/photos/curated/review-needed/` needs a human “yes” before it touches a client-facing page.

## Structure
- `assets/agw/brand/` — logos, icons, fonts, patterns, stationery, guidelines
- `assets/agw/photos/raw/` — original drops / source photos (kept as-is)
- `assets/agw/photos/curated/` — *symlinks* with normalized names + `INDEX.csv` mapping back to originals
- `assets/agw/screenshots/` — site screenshots / references (drop here)
- `assets/agw/inbox/` — new unprocessed drops (drop here first)
- `assets/agw/docs/` — PDFs and misc docs (proposals, reference exports, etc.)

