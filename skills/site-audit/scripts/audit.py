#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///

"""
site-audit — Comprehensive static analysis for Next.js projects
Usage: uv run audit.py <project_dir> [--fixes] [--apply] [--only cat1,cat2] [--json]
"""

import argparse
import json
import os
import re
import subprocess
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

# Shared git utilities
sys.path.insert(0, str(Path(__file__).parent.parent.parent / "_shared/scripts"))
try:
    from git_utils import (
        Worktree, git_status_check, ensure_git_repo,
        print_diff_summary, current_branch, is_git_repo
    )
    HAS_GIT_UTILS = True
except ImportError:
    HAS_GIT_UTILS = False

# ── Colors ───────────────────────────────────────────────────────────────────
R="\033[0m"; BOLD="\033[1m"; RED="\033[31m"; GRN="\033[32m"
YLW="\033[33m"; BLU="\033[34m"; CYN="\033[36m"; DIM="\033[2m"; MAG="\033[35m"

SEVERITY_COLOR = {"CRITICAL": RED, "HIGH": YLW, "MEDIUM": BLU, "LOW": DIM}
SEVERITY_ICON = {"CRITICAL": "❌", "HIGH": "⚠️ ", "MEDIUM": "→ ", "LOW": "~ "}
SEVERITY_ORDER = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}

# ── Issue ─────────────────────────────────────────────────────────────────────
@dataclass
class Issue:
    category: str
    severity: str  # CRITICAL | HIGH | MEDIUM | LOW
    title: str
    detail: str
    file: Optional[str] = None
    line: Optional[int] = None
    fix: Optional[str] = None  # exact fix instruction

    def to_dict(self):
        return {k: v for k, v in self.__dict__.items() if v is not None}

# ── Scanner Base ──────────────────────────────────────────────────────────────
class Scanner:
    def __init__(self, project_dir: Path):
        self.project = project_dir
        self.issues: list[Issue] = []
        self.src = project_dir / "src"
        if not self.src.exists():
            self.src = project_dir  # no src/ dir

    def add(self, category, severity, title, detail, file=None, line=None, fix=None):
        self.issues.append(Issue(category, severity, title, detail,
                                  str(file.relative_to(self.project)) if file and isinstance(file, Path) else file,
                                  line, fix))

    def ts_files(self):
        root = self.src if self.src.exists() else self.project
        return list(root.rglob("*.tsx")) + list(root.rglob("*.ts"))

    def find_in_file(self, path: Path, pattern: str, flags=0):
        """Return list of (line_number, line_content) matches."""
        try:
            results = []
            for i, line in enumerate(path.read_text(errors="ignore").splitlines(), 1):
                if re.search(pattern, line, flags):
                    results.append((i, line.strip()))
            return results
        except Exception:
            return []

    def scan(self):
        raise NotImplementedError

# ── Image Scanner ─────────────────────────────────────────────────────────────
class ImageScanner(Scanner):
    HERO_PATTERNS = ["hero", "step", "about", "feature", "banner", "cover", "team", "headshot"]
    IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"}
    MIN_HERO_KB = 200

    def scan(self):
        public_dir = self.project / "public"
        if not public_dir.exists():
            return

        # Build map of all public images
        all_images = {}
        for f in public_dir.rglob("*"):
            if f.suffix.lower() in self.IMAGE_EXTS:
                all_images[f.name.lower()] = f
                rel = str(f.relative_to(public_dir))
                all_images["/" + rel] = f

        # Size check on hero/feature images
        for name, path in all_images.items():
            if not isinstance(path, Path):
                continue
            name_lower = path.name.lower()
            is_hero = any(p in name_lower for p in self.HERO_PATTERNS)
            if is_hero and path.suffix.lower() in self.IMAGE_EXTS - {".svg"}:
                size_kb = path.stat().st_size / 1024
                if size_kb < self.MIN_HERO_KB:
                    self.add("images", "HIGH",
                        f"Low-res hero image: {path.name} ({size_kb:.0f}KB)",
                        f"Below {self.MIN_HERO_KB}KB threshold — will appear blurry on retina screens.",
                        path,
                        fix=f"Replace with high-res version (>200KB) or regenerate:\n  uv run ~/.openclaw/skills/image-gen/scripts/generate.py --prompt '...' --provider openai --model best --filename {path}")

        # Scan TSX files for image issues
        for tsx in self.ts_files():
            content = tsx.read_text(errors="ignore")
            lines = content.splitlines()

            # Raw <img> tags
            for i, line in enumerate(lines, 1):
                if re.search(r'<img\s', line) and 'next/image' not in line:
                    self.add("images", "HIGH",
                        f"Raw <img> tag in {tsx.name}",
                        "Use next/image for optimization, lazy loading, and layout shift prevention.",
                        tsx, i,
                        fix=f"Replace <img> with next/image component. Add width and height props.")

            # next/image missing priority on above-fold
            for i, line in enumerate(lines, 1):
                if '<Image' in line or 'next/image' in content:
                    if re.search(r'<Image\b', line):
                        # Check if priority is nearby (next 5 lines)
                        block = "\n".join(lines[max(0,i-1):i+6])
                        is_hero = any(p in block.lower() for p in ["hero", "above", "priority", "banner"])
                        has_priority = "priority" in block
                        if is_hero and not has_priority:
                            self.add("images", "HIGH",
                                f"Missing priority prop on hero Image in {tsx.name}:{i}",
                                "Above-fold images without priority= cause LCP degradation.",
                                tsx, i,
                                fix=f"Add priority prop to the Image component at {tsx.name}:{i}")

            # Missing quality={100} on hero images
            for i, line in enumerate(lines, 1):
                if re.search(r'<Image\b', line):
                    block = "\n".join(lines[max(0,i-1):i+8])
                    src_match = re.search(r'src=["\']([^"\']+)["\']', block)
                    if src_match:
                        src = src_match.group(1).lower()
                        if any(p in src for p in self.HERO_PATTERNS):
                            if "quality" not in block:
                                self.add("images", "HIGH",
                                    f"Missing quality={{100}} on hero image in {tsx.name}:{i}",
                                    "Next.js default quality is 75 — Vercel will compress hero images and make them blurry.",
                                    tsx, i,
                                    fix=f"Add quality={{100}} to the Image component at {tsx.name}:{i}")

            # Missing alt text
            for i, line in enumerate(lines, 1):
                if re.search(r'<Image\b', line) or re.search(r'<img\b', line):
                    block = "\n".join(lines[max(0,i-1):i+5])
                    if 'alt=' not in block:
                        self.add("images", "MEDIUM",
                            f"Missing alt text on image in {tsx.name}:{i}",
                            "Required for accessibility and SEO.",
                            tsx, i,
                            fix=f"Add descriptive alt='...' prop to image at {tsx.name}:{i}")

        # Broken image references
        for tsx in self.ts_files():
            content = tsx.read_text(errors="ignore")
            for match in re.finditer(r'["\'](/[^"\']+\.(?:jpg|jpeg|png|webp|avif|gif|svg))["\']', content):
                img_path = match.group(1)
                abs_path = self.project / "public" / img_path.lstrip("/")
                if not abs_path.exists():
                    line_no = content[:match.start()].count("\n") + 1
                    self.add("images", "CRITICAL",
                        f"Broken image path: {img_path}",
                        f"Referenced in {tsx.name} but file does not exist.",
                        tsx, line_no,
                        fix=f"Create or move the file to public{img_path}, or update the reference in {tsx.name}:{line_no}")

# ── iOS/Safari Scanner ────────────────────────────────────────────────────────
class IOSScanner(Scanner):
    def scan(self):
        # Check layout.tsx for viewport-fit=cover
        layout = self.project / "src/app/layout.tsx"
        if not layout.exists():
            layout = self.project / "app/layout.tsx"

        if layout.exists():
            content = layout.read_text(errors="ignore")

            if "viewport" not in content or "viewportFit" not in content:
                self.add("ios", "HIGH",
                    "Missing viewport-fit=cover in layout.tsx",
                    "Content hides behind iPhone notch/Dynamic Island. Add: export const viewport: Viewport = { viewportFit: 'cover' }",
                    layout,
                    fix="Add to layout.tsx:\nimport type { Viewport } from 'next'\nexport const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' }")

        # Check CSS and TSX for 100vh
        for f in list(self.ts_files()) + list((self.project / "src/app").rglob("*.css") if (self.project / "src/app").exists() else []):
            for i, line in self.find_in_file(f, r'100vh'):
                if 'dvh' not in line and 'comment' not in line.lower():
                    self.add("ios", "HIGH",
                        f"100vh causes iOS Safari toolbar overlap in {f.name}:{i}",
                        "iOS Safari's toolbar collapses/expands, making 100vh taller than the visible area.",
                        f, i,
                        fix=f"Replace 100vh with 100dvh at {f.name}:{i} (dvh = dynamic viewport height, respects toolbar)")

        # Check for safe-area-inset on fixed/sticky nav
        for tsx in self.ts_files():
            content = tsx.read_text(errors="ignore")
            has_fixed = re.search(r'fixed\s+top-0|position.*fixed.*top.*0|sticky\s+top-0', content)
            has_safe_area = 'safe-area-inset-top' in content or 'safe-area' in content

            if has_fixed and not has_safe_area:
                self.add("ios", "HIGH",
                    f"Fixed/sticky header missing safe-area-inset-top in {tsx.name}",
                    "Content hides behind iPhone notch/status bar/Dynamic Island.",
                    tsx,
                    fix=f"Add to the nav element in {tsx.name}:\nstyle={{{{ paddingTop: 'env(safe-area-inset-top)' }}}}")

        # Check for input font-size issues (zoom on focus)
        for tsx in self.ts_files():
            content = tsx.read_text(errors="ignore")
            for i, line in enumerate(content.splitlines(), 1):
                if re.search(r'<input\b', line, re.IGNORECASE):
                    block = "\n".join(content.splitlines()[max(0,i-1):i+4])
                    size_match = re.search(r'text-(?:xs|sm)\b', block)
                    if size_match and 'type="hidden"' not in block:
                        self.add("ios", "MEDIUM",
                            f"Input with small font-size may trigger iOS zoom in {tsx.name}:{i}",
                            "iOS zooms in on any input with font-size < 16px. Use text-base or larger.",
                            tsx, i,
                            fix=f"Ensure input at {tsx.name}:{i} has text-base (16px) or larger. Add: className='text-base ...'")

        # Check for tap highlight color
        globals_css = self.project / "src/app/globals.css"
        if not globals_css.exists():
            globals_css = self.project / "app/globals.css"
        if globals_css.exists():
            css = globals_css.read_text(errors="ignore")
            if '-webkit-tap-highlight-color' not in css:
                self.add("ios", "LOW",
                    "Missing -webkit-tap-highlight-color: transparent in globals.css",
                    "iOS shows a gray flash when tapping links/buttons. Disable for polished feel.",
                    globals_css,
                    fix="Add to globals.css body or * selector:\n-webkit-tap-highlight-color: transparent;")

# ── Next.js Scanner ───────────────────────────────────────────────────────────
class NextjsScanner(Scanner):
    def scan(self):
        pkg = self.project / "package.json"
        nextjs_major = 0
        if pkg.exists():
            try:
                data = json.loads(pkg.read_text())
                deps = {**data.get("dependencies", {}), **data.get("devDependencies", {})}
                ver = deps.get("next", "0").lstrip("^~")
                nextjs_major = int(ver.split(".")[0])
            except Exception:
                pass

        # proxy.ts check (Next.js 16+)
        if nextjs_major >= 16:
            middleware = self.project / "src/middleware.ts"
            if not middleware.exists():
                middleware = self.project / "middleware.ts"

            if middleware.exists():
                content = middleware.read_text(errors="ignore")
                self.add("nextjs", "CRITICAL",
                    "middleware.ts should be proxy.ts in Next.js 16+",
                    "Next.js 16 deprecated middleware.ts. Rename to proxy.ts and export function named 'proxy'.",
                    middleware,
                    fix="1. Rename src/middleware.ts to src/proxy.ts\n2. Rename export function middleware() to export function proxy()")

            proxy = self.project / "src/proxy.ts"
            if proxy.exists():
                content = proxy.read_text(errors="ignore")
                if "export async function middleware" in content or "export function middleware" in content:
                    self.add("nextjs", "CRITICAL",
                        "proxy.ts exports 'middleware' — should export 'proxy'",
                        "Next.js 16 requires the function to be named 'proxy' in proxy.ts.",
                        proxy,
                        fix="Rename: export async function middleware() → export async function proxy()")

        # API routes missing force-dynamic
        api_dir = self.project / "src/app/api"
        if not api_dir.exists():
            api_dir = self.project / "app/api"
        if api_dir.exists():
            for route in api_dir.rglob("route.ts"):
                content = route.read_text(errors="ignore")
                uses_cookies = "cookies()" in content or "request.cookies" in content
                uses_env = bool(re.search(r'process\.env\.\w+(?!.*NEXT_PUBLIC)', content))
                missing_dynamic = "force-dynamic" not in content and "force-static" not in content

                if (uses_cookies or uses_env) and missing_dynamic:
                    self.add("nextjs", "HIGH",
                        f"API route may need force-dynamic: {route.relative_to(self.project)}",
                        "Routes using cookies() or server-only env vars at runtime need force-dynamic to avoid being statically cached.",
                        route,
                        fix=f"Add to top of {route.name}:\nexport const dynamic = 'force-dynamic'")

        # useSearchParams without Suspense
        for tsx in self.ts_files():
            content = tsx.read_text(errors="ignore")
            if "useSearchParams" in content and "Suspense" not in content:
                self.add("nextjs", "HIGH",
                    f"useSearchParams() without Suspense in {tsx.name}",
                    "Causes build error in Next.js 13+. Wrap the component using useSearchParams in <Suspense>.",
                    tsx,
                    fix=f"Wrap the component in {tsx.name} with:\nimport {{ Suspense }} from 'react'\n<Suspense fallback={{null}}><YourComponent /></Suspense>")

        # use client overuse
        for tsx in self.ts_files():
            content = tsx.read_text(errors="ignore")
            if '"use client"' in content or "'use client'" in content:
                client_only_hooks = ["useState", "useEffect", "useRef", "useCallback", "useMemo", "useReducer"]
                uses_client_hook = any(h in content for h in client_only_hooks)
                uses_browser_api = any(api in content for api in ["window.", "document.", "navigator.", "localStorage", "sessionStorage"])

                if not uses_client_hook and not uses_browser_api:
                    self.add("nextjs", "MEDIUM",
                        f"Unnecessary 'use client' in {tsx.name}",
                        "This component doesn't use any client-only APIs. Remove 'use client' to enable SSR and reduce bundle size.",
                        tsx,
                        fix=f"Remove 'use client' from {tsx.name} — it has no client-only hooks or browser APIs")

        # Old next/head usage
        for tsx in self.ts_files():
            for i, line in self.find_in_file(tsx, r"from ['\"]next/head['\"]"):
                self.add("nextjs", "MEDIUM",
                    f"Deprecated next/head import in {tsx.name}:{i}",
                    "Use the Metadata API (export const metadata) in Next.js 13+ App Router.",
                    tsx, i,
                    fix=f"Remove next/head import from {tsx.name}. Use:\nexport const metadata = {{ title: '...', description: '...' }}")

        # next.config missing image domains
        for config_name in ["next.config.ts", "next.config.js", "next.config.mjs"]:
            config = self.project / config_name
            if config.exists():
                content = config.read_text(errors="ignore")
                # Check if using external images without domains config
                external_images = False
                for tsx in self.ts_files():
                    tcontent = tsx.read_text(errors="ignore")
                    if re.search(r'<Image[^>]+src=["\']https?://', tcontent):
                        external_images = True
                        break
                if external_images and "remotePatterns" not in content and "domains" not in content:
                    self.add("nextjs", "HIGH",
                        "External images used but next.config missing remotePatterns",
                        "Next.js blocks external image sources by default.",
                        config,
                        fix="Add to next.config.ts images section:\nremotePatterns: [{ protocol: 'https', hostname: '**' }]")

# ── SEO Scanner ───────────────────────────────────────────────────────────────
class SEOScanner(Scanner):
    def scan(self):
        app_dir = self.project / "src/app"
        if not app_dir.exists():
            app_dir = self.project / "app"

        # Check layout.tsx for metadata
        layout = app_dir / "layout.tsx"
        if layout.exists():
            content = layout.read_text(errors="ignore")

            if "export const metadata" not in content:
                self.add("seo", "HIGH",
                    "No metadata export in layout.tsx",
                    "Missing site-wide title and description.",
                    layout,
                    fix="Add to layout.tsx:\nexport const metadata = {\n  title: 'Your Site Title',\n  description: 'Your description',\n}")

            if "openGraph" not in content:
                self.add("seo", "HIGH",
                    "Missing openGraph metadata in layout.tsx",
                    "No OG tags = poor social sharing previews. Required for every client site.",
                    layout,
                    fix="Add openGraph to metadata export:\nopenGraph: {\n  title: '...',\n  description: '...',\n  images: [{ url: '/assets/og-image.jpg', width: 1200, height: 630 }]\n}")

            if "twitter" not in content.lower():
                self.add("seo", "MEDIUM",
                    "Missing Twitter/X card meta in layout.tsx",
                    fix="Add to metadata: twitter: { card: 'summary_large_image' }")

            if "application/ld+json" not in content and "LocalBusiness" not in content:
                self.add("seo", "MEDIUM",
                    "Missing JSON-LD structured data in layout.tsx",
                    "JSON-LD helps Google and AI models understand the business. Required for local SEO.",
                    layout,
                    fix="Add <script type='application/ld+json'> with LocalBusiness or relevant schema to layout.tsx")

        # Check robots.ts/txt
        robots_ts = app_dir / "robots.ts"
        robots_txt = self.project / "public/robots.txt"
        if robots_ts.exists():
            content = robots_ts.read_text(errors="ignore")
            ai_bots = ["GPTBot", "ClaudeBot", "anthropic-ai", "PerplexityBot", "CCBot"]
            missing = [b for b in ai_bots if b not in content]
            if missing:
                self.add("seo", "MEDIUM",
                    f"robots.ts missing AI crawler allowlist: {', '.join(missing)}",
                    "AI bots won't index your content for ChatGPT/Perplexity/Claude citations.",
                    robots_ts,
                    fix=f"Add to robots.ts rules array:\n" + "\n".join(f"{{ userAgent: '{b}', allow: '/' }}" for b in missing))
        elif not robots_txt.exists():
            self.add("seo", "MEDIUM",
                "No robots.ts or robots.txt found",
                fix="Create src/app/robots.ts with allow rules for all crawlers including AI bots")

        # Check for sitemap
        sitemap = app_dir / "sitemap.ts"
        sitemap_xml = self.project / "public/sitemap.xml"
        if not sitemap.exists() and not sitemap_xml.exists():
            self.add("seo", "MEDIUM",
                "No sitemap.ts or sitemap.xml found",
                "Search engines and AI crawlers rely on sitemaps to discover pages.",
                fix="Create src/app/sitemap.ts that returns all your routes with priority and lastModified")

        # Check page.tsx files for multiple h1
        for page in list(app_dir.rglob("page.tsx")) + list(app_dir.rglob("page.jsx")):
            content = page.read_text(errors="ignore")
            h1_matches = re.findall(r'<h1[\s>]', content)
            if len(h1_matches) > 1:
                self.add("seo", "HIGH",
                    f"Multiple <h1> tags in {page.relative_to(self.project)}",
                    f"Found {len(h1_matches)} h1 tags. Only one h1 per page for correct SEO hierarchy.",
                    page,
                    fix=f"Reduce to one <h1> in {page.relative_to(self.project)}. Use <h2> for secondary headings.")

        # Check for og-image existence if referenced
        for tsx in self.ts_files():
            content = tsx.read_text(errors="ignore")
            og_match = re.search(r'["\']([^"\']*og[^"\']*\.(?:jpg|jpeg|png|webp))["\']', content, re.IGNORECASE)
            if og_match:
                og_path = og_match.group(1)
                abs_path = self.project / "public" / og_path.lstrip("/")
                if not abs_path.exists():
                    self.add("seo", "HIGH",
                        f"OG image file missing: {og_path}",
                        "Social share previews will be broken.",
                        tsx,
                        fix=f"Generate og-image.jpg (1200x630):\nuv run ~/.openclaw/skills/image-gen/scripts/generate.py --prompt 'Professional OG banner for [site name]' --size 1200x630 --filename public{og_path}")

# ── AI Tells Scanner ──────────────────────────────────────────────────────────
class AITellsScanner(Scanner):
    AI_FONTS = ["Inter", "Roboto", "Arial", "Open Sans", "Lato", "Nunito", "'Inter'", '"Inter"']
    AI_COLORS = [
        (r'#[89aAbB][0-9a-fA-F]{2}ff|from-purple|to-blue|from-violet|to-indigo', "Purple-to-blue AI gradient"),
        (r'from-cyan|to-blue.*dark|#0ff|#00ffff', "Cyan-on-dark AI palette"),
    ]

    def scan(self):
        # Font detection
        for tsx in self.ts_files():
            content = tsx.read_text(errors="ignore")
            for font in self.AI_FONTS:
                if font in content and "font-" in content:
                    self.add("ai-tells", "MEDIUM",
                        f"Generic AI font '{font}' detected in {tsx.name}",
                        f"{font} is the most common AI-generated font choice. Use a distinctive display font from the design system.",
                        tsx,
                        fix=f"Replace {font} with the project's display font from design-system/MASTER.md")
                    break

        # Color pattern detection
        for tsx in self.ts_files():
            content = tsx.read_text(errors="ignore")
            for pattern, label in self.AI_COLORS:
                match = re.search(pattern, content, re.IGNORECASE)
                if match:
                    line_no = content[:match.start()].count("\n") + 1
                    self.add("ai-tells", "MEDIUM",
                        f"{label} in {tsx.name}:{line_no}",
                        "This color pattern is a strong AI tell. Replace with brand-specific palette.",
                        tsx, line_no,
                        fix=f"Replace the gradient/color at {tsx.name}:{line_no} with the brand colors from design-system/MASTER.md")

        # Identical card grid detection
        for tsx in self.ts_files():
            content = tsx.read_text(errors="ignore")
            # Look for .map() producing identical card structures
            map_matches = re.findall(r'\.map\s*\([^)]+\)\s*=>', content)
            card_pattern = re.search(r'(grid|flex).*?(gap|space).*?\.map', content, re.DOTALL)
            if len(map_matches) >= 3 and card_pattern:
                self.add("ai-tells", "LOW",
                    f"Possible identical card grid in {tsx.name}",
                    "Rendering 3+ identical card structures is a classic AI tell. Consider visual variation.",
                    tsx,
                    fix=f"Review {tsx.name} for identical card patterns. Add visual variety: alternating layouts, featured cards, different sizes")

        # Emoji as icons
        for tsx in self.ts_files():
            content = tsx.read_text(errors="ignore")
            emoji_in_jsx = re.findall(r'>[^\S\n]*([🏠🏡💰✅❌⚠️📞✉️📊📤🔴🟡⚫✓→←↑↓★☆♥♦♣♠])[^\S\n]*<', content)
            if len(emoji_in_jsx) > 2:
                self.add("ai-tells", "MEDIUM",
                    f"Emoji used as UI icons in {tsx.name} ({len(emoji_in_jsx)} found)",
                    "Emoji icons are a strong AI tell and render inconsistently across platforms. Use SVG (Lucide, Heroicons).",
                    tsx,
                    fix=f"Replace emoji icons in {tsx.name} with SVG icons from Lucide React:\nnpm install lucide-react\nimport {{ Home, Phone, Check }} from 'lucide-react'")

# ── Security Scanner ──────────────────────────────────────────────────────────
class SecurityScanner(Scanner):
    SECRET_PATTERNS = [
        ("KEY", "API key"), ("SECRET", "secret"), ("TOKEN", "token"),
        ("PASSWORD", "password"), ("PRIVATE", "private key"),
        ("SERVICE_KEY", "service key"), ("ACCESS_TOKEN", "access token"),
    ]

    def scan(self):
        # NEXT_PUBLIC_ exposing secrets
        env_file = self.project / ".env.local"
        if env_file.exists():
            for i, line in enumerate(env_file.read_text(errors="ignore").splitlines(), 1):
                if line.startswith("NEXT_PUBLIC_"):
                    key = line.split("=")[0]
                    for pattern, label in self.SECRET_PATTERNS:
                        if pattern in key.upper():
                            self.add("security", "CRITICAL",
                                f"Secret exposed to client: {key}",
                                f"NEXT_PUBLIC_ prefix makes this {label} visible to anyone visiting the site.",
                                env_file, i,
                                fix=f"Remove NEXT_PUBLIC_ prefix from {key}. Access it server-side only in API routes/server components.")

        # .env.local in git
        gitignore = self.project / ".gitignore"
        if gitignore.exists():
            content = gitignore.read_text(errors="ignore")
            if ".env.local" not in content and ".env" not in content:
                self.add("security", "CRITICAL",
                    ".env.local not in .gitignore",
                    "API keys and secrets will be committed to git.",
                    gitignore,
                    fix="Add to .gitignore:\n.env\n.env.local\n.env*.local")
        else:
            self.add("security", "CRITICAL",
                "No .gitignore found",
                "All files including secrets may be committed to git.",
                fix="Create .gitignore with at minimum:\n.env\n.env.local\n.next/\nnode_modules/")

        # Dashboard routes without auth
        dashboard_dir = self.project / "src/app/dashboard/(protected)"
        if not dashboard_dir.exists():
            dashboard_dir = self.project / "src/app/dashboard"
        if dashboard_dir.exists():
            proxy = self.project / "src/proxy.ts"
            middleware = self.project / "src/middleware.ts"
            if not proxy.exists() and not middleware.exists():
                self.add("security", "CRITICAL",
                    "Dashboard routes found but no auth middleware (proxy.ts/middleware.ts)",
                    "Dashboard is publicly accessible without authentication.",
                    fix="Create src/proxy.ts with JWT cookie verification protecting /dashboard/* routes")

        # Supabase service key in client components
        for tsx in self.ts_files():
            content = tsx.read_text(errors="ignore")
            if '"use client"' in content and "SUPABASE_SERVICE_KEY" in content:
                self.add("security", "CRITICAL",
                    f"Service key used in client component: {tsx.name}",
                    "SUPABASE_SERVICE_KEY bypasses Row Level Security. Never use in client components.",
                    tsx,
                    fix=f"Move Supabase service key usage to an API route. Replace with anon key in {tsx.name}")

# ── Performance Scanner ───────────────────────────────────────────────────────
class PerformanceScanner(Scanner):
    def scan(self):
        # Font preconnect
        layout = self.project / "src/app/layout.tsx"
        if not layout.exists():
            layout = self.project / "app/layout.tsx"
        if layout.exists():
            content = layout.read_text(errors="ignore")
            uses_google_fonts = "googleapis.com" in content or "from 'next/font/google'" in content
            has_preconnect = "preconnect" in content
            if uses_google_fonts and not has_preconnect:
                self.add("performance", "MEDIUM",
                    "Missing preconnect to Google Fonts in layout.tsx",
                    "Fonts load slower without preconnect hints.",
                    layout,
                    fix="Add to layout.tsx <head>:\n<link rel='preconnect' href='https://fonts.googleapis.com' />\n<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />")

        # console.log in production code
        for tsx in self.ts_files():
            content = tsx.read_text(errors="ignore")
            for i, line in enumerate(content.splitlines(), 1):
                if re.search(r'console\.(log|warn|error|debug)\(', line):
                    if not line.strip().startswith("//"):
                        self.add("performance", "LOW",
                            f"console.log in {tsx.name}:{i}",
                            "Pollutes production logs and slightly slows execution.",
                            tsx, i,
                            fix=f"Remove console.log at {tsx.name}:{i}")

# ── Bug Scanner ───────────────────────────────────────────────────────────────
class BugScanner(Scanner):
    def scan(self):
        for tsx in self.ts_files():
            content = tsx.read_text(errors="ignore")
            lines = content.splitlines()

            # useEffect missing dependency array
            for i, line in enumerate(lines, 1):
                if re.search(r'useEffect\s*\(', line):
                    block = "\n".join(lines[i-1:i+10])
                    closing = block.rfind(")")
                    if closing > 0:
                        effect_block = block[:closing]
                        if not re.search(r',\s*\[', effect_block):
                            self.add("bugs", "HIGH",
                                f"useEffect without dependency array in {tsx.name}:{i}",
                                "Runs on every render — likely causes infinite loops or duplicate API calls.",
                                tsx, i,
                                fix=f"Add dependency array to useEffect at {tsx.name}:{i}: useEffect(() => {{...}}, []) or list the deps")

            # Missing e.preventDefault on form submit
            for i, line in enumerate(lines, 1):
                if re.search(r'onSubmit\s*=', line):
                    block = "\n".join(lines[i-1:i+8])
                    if "preventDefault" not in block:
                        self.add("bugs", "HIGH",
                            f"Form onSubmit missing e.preventDefault() in {tsx.name}:{i}",
                            "Form will submit and reload the page.",
                            tsx, i,
                            fix=f"Add e.preventDefault() as first line of submit handler at {tsx.name}:{i}")

            # Hydration mismatch risks
            for i, line in enumerate(lines, 1):
                if re.search(r'Date\.now\(\)|Math\.random\(\)|new Date\(\)', line):
                    if not re.search(r'useEffect|useState|useRef|api\.|fetch\(', "\n".join(lines[max(0,i-3):i+3])):
                        self.add("bugs", "MEDIUM",
                            f"Potential hydration mismatch in {tsx.name}:{i}",
                            "Date.now()/Math.random() in render produces different values server vs client.",
                            tsx, i,
                            fix=f"Move Date.now()/Math.random() at {tsx.name}:{i} into a useEffect or useState(() => ...) initializer")

# ── Accessibility Scanner ─────────────────────────────────────────────────────
class A11yScanner(Scanner):
    def scan(self):
        for tsx in self.ts_files():
            content = tsx.read_text(errors="ignore")
            lines = content.splitlines()

            # Inputs without labels
            for i, line in enumerate(lines, 1):
                if re.search(r'<input\b', line, re.IGNORECASE):
                    block = "\n".join(lines[max(0,i-3):i+3])
                    has_label = "label" in block.lower() or "aria-label" in block or "aria-labelledby" in block
                    if not has_label and 'type="hidden"' not in line:
                        self.add("a11y", "MEDIUM",
                            f"Input without label in {tsx.name}:{i}",
                            "Screen readers can't identify this input.",
                            tsx, i,
                            fix=f"Add aria-label='...' to input at {tsx.name}:{i}")

            # outline: none without focus-visible replacement
            for i, line in enumerate(lines, 1):
                if "outline-none" in line or "outline: none" in line or "outline: 0" in line:
                    block = "\n".join(lines[max(0,i-2):i+4])
                    has_focus = "focus-visible" in block or "focus:ring" in block or "focus:outline" in block
                    if not has_focus:
                        self.add("a11y", "HIGH",
                            f"outline:none without focus-visible replacement in {tsx.name}:{i}",
                            "Keyboard users can't see focused elements. Breaks WCAG 2.4.7.",
                            tsx, i,
                            fix=f"Replace outline-none at {tsx.name}:{i} with focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[brand-color]")

# ── Report Generator ──────────────────────────────────────────────────────────
def generate_report(issues: list[Issue], project_dir: Path, json_output: bool) -> str:
    if json_output:
        return json.dumps([i.to_dict() for i in issues], indent=2)

    by_severity = {"CRITICAL": [], "HIGH": [], "MEDIUM": [], "LOW": []}
    for issue in issues:
        by_severity[issue.severity].append(issue)

    lines = []
    lines.append(f"\n{BOLD}{'━'*60}{R}")
    lines.append(f"{BOLD}  🔍 site-audit — {project_dir.name}{R}")
    lines.append(f"{BOLD}{'━'*60}{R}\n")

    total = len(issues)
    if total == 0:
        lines.append(f"  {GRN}✅ No issues found. Clean build.{R}\n")
        return "\n".join(lines)

    # Summary line
    parts = []
    for sev in ["CRITICAL", "HIGH", "MEDIUM", "LOW"]:
        count = len(by_severity[sev])
        if count:
            color = SEVERITY_COLOR[sev]
            parts.append(f"{color}{count} {sev}{R}")
    lines.append(f"  {' · '.join(parts)}  {DIM}({total} total){R}\n")

    # Issues by severity
    for sev in ["CRITICAL", "HIGH", "MEDIUM", "LOW"]:
        issues_in_sev = by_severity[sev]
        if not issues_in_sev:
            continue

        color = SEVERITY_COLOR[sev]
        icon = SEVERITY_ICON[sev]
        lines.append(f"  {color}{BOLD}{sev} ({len(issues_in_sev)}){R}")
        lines.append(f"  {DIM}{'─'*55}{R}")

        for issue in issues_in_sev:
            loc = f"  {DIM}{issue.file}{':{}'.format(issue.line) if issue.line else ''}{R}" if issue.file else ""
            lines.append(f"  {color}{icon}{R} {BOLD}{issue.title}{R}")
            lines.append(f"       {DIM}{issue.detail}{R}")
            if loc:
                lines.append(f"       {loc}")
        lines.append("")

    lines.append(f"  {BOLD}{'━'*55}{R}")
    lines.append(f"  {total} issues · Run with --fixes to generate AUDIT_FIXES.md\n")

    return "\n".join(lines)

# ── Fix Task Generator ────────────────────────────────────────────────────────
def generate_fixes_md(issues: list[Issue], project_dir: Path) -> str:
    critical = [i for i in issues if i.severity == "CRITICAL"]
    high = [i for i in issues if i.severity == "HIGH"]
    medium = [i for i in issues if i.severity == "MEDIUM"]
    low = [i for i in issues if i.severity == "LOW"]

    lines = [f"""# Audit Fixes — {project_dir.name}

Generated by site-audit. Fix every issue below in order (CRITICAL first).
Run `npm run build` after all fixes. Build must be clean before finishing.

---
"""]

    for severity, issues_list in [("CRITICAL", critical), ("HIGH", high), ("MEDIUM", medium), ("LOW", low)]:
        if not issues_list:
            continue
        lines.append(f"## {severity} ({len(issues_list)} issues)\n")
        for i, issue in enumerate(issues_list, 1):
            lines.append(f"### {i}. {issue.title}")
            lines.append(f"**Category:** {issue.category}  ")
            if issue.file:
                lines.append(f"**File:** `{issue.file}`{':{}'.format(issue.line) if issue.line else ''}  ")
            lines.append(f"**Why:** {issue.detail}  ")
            if issue.fix:
                lines.append(f"\n**Fix:**\n```\n{issue.fix}\n```")
            lines.append("")

    lines.append("---\n")
    lines.append("## Final Steps\n")
    lines.append("1. Run `npm run build` — fix all TypeScript errors")
    lines.append("2. Test at 390px mobile viewport")
    lines.append("3. Test on iOS Safari specifically (safe area, 100dvh, input zoom)")
    lines.append("4. Run: `openclaw system event --text \"Audit fixes complete — {name} ready for review\" --mode now`".format(name=project_dir.name))

    return "\n".join(lines)

# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="site-audit — Next.js static analysis")
    parser.add_argument("project_dir", help="Path to Next.js project")
    parser.add_argument("--fixes", action="store_true", help="Generate AUDIT_FIXES.md")
    parser.add_argument("--apply", action="store_true", help="Auto-run fixes with Claude Code after generating")
    parser.add_argument("--only", help="Comma-separated categories: images,ios,nextjs,seo,ai-tells,security,performance,bugs,a11y")
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    args = parser.parse_args()

    project_dir = Path(args.project_dir).resolve()
    if not project_dir.exists():
        print(f"  {RED}❌{R}  Project not found: {project_dir}")
        sys.exit(1)

    only_cats = set(args.only.split(",")) if args.only else None

    scanners = [
        ("images", ImageScanner),
        ("ios", IOSScanner),
        ("nextjs", NextjsScanner),
        ("seo", SEOScanner),
        ("ai-tells", AITellsScanner),
        ("security", SecurityScanner),
        ("performance", PerformanceScanner),
        ("bugs", BugScanner),
        ("a11y", A11yScanner),
    ]

    all_issues = []
    for cat, ScannerClass in scanners:
        if only_cats and cat not in only_cats:
            continue
        scanner = ScannerClass(project_dir)
        scanner.scan()
        all_issues.extend(scanner.issues)

    # Sort by severity
    all_issues.sort(key=lambda i: SEVERITY_ORDER.get(i.severity, 99))

    # Print report
    report = generate_report(all_issues, project_dir, args.json)
    print(report)

    # Generate fixes file
    if args.fixes or args.apply:
        fixes_content = generate_fixes_md(all_issues, project_dir)

        if args.apply and HAS_GIT_UTILS:
            # Apply fixes in an isolated git worktree
            import datetime
            branch_name = f"audit/fixes-{datetime.date.today().isoformat()}"
            ensure_git_repo(project_dir)

            print(f"\n  {BLU}→{R}  Creating worktree branch: {BOLD}{branch_name}{R}")
            wt = Worktree(project_dir, branch_name, auto_cleanup=False)
            wt._setup()

            # Write fixes file into the worktree
            fixes_path = wt.path / "AUDIT_FIXES.md"
            fixes_path.write_text(fixes_content)
            print(f"  {GRN}✅{R}  AUDIT_FIXES.md written to worktree")

            print(f"\n  {BLU}→{R}  Handing to Claude Code in worktree...")
            result = subprocess.run(
                'claude --permission-mode bypassPermissions --print '
                '"Read AUDIT_FIXES.md and fix every issue listed. '
                'Run npm run build at the end and fix all errors. '
                'When done, output a summary of every file changed."',
                shell=True, cwd=wt.path
            )

            if result.returncode == 0:
                # Show diff summary
                print_diff_summary(wt)
                wt.commit(f"Audit fixes ({len(all_issues)} issues addressed)")

                # Ask to merge
                print(f"\n  {YLW}?{R}  Merge {branch_name} → {current_branch(project_dir)}?")
                choice = input(f"  {DIM}[Y/n]{R} ").strip().lower()
                if choice in ("", "y", "yes"):
                    if wt.merge_to(current_branch(project_dir)):
                        ok("Fixes merged. Run nextjs-deploy to ship.")
                    wt.cleanup()
                else:
                    info(f"Branch kept: {branch_name}")
                    info(f"To merge later: git merge {branch_name}")
                    info(f"To discard: git branch -D {branch_name} && git worktree remove --force {wt.path}")
            else:
                err("Claude Code exited with errors — branch kept for inspection")
                info(f"Worktree: {wt.path}")
                info(f"Branch: {branch_name}")
        else:
            # No apply — just write fixes file to project dir
            fixes_path = project_dir / "AUDIT_FIXES.md"
            fixes_path.write_text(fixes_content)
            print(f"  {GRN}✅{R}  AUDIT_FIXES.md written → {fixes_path}")

            if args.apply and not HAS_GIT_UTILS:
                print(f"\n  {BLU}→{R}  Handing to Claude Code...")
                subprocess.run(
                    'claude --permission-mode bypassPermissions --print '
                    '"Read AUDIT_FIXES.md and fix every issue listed. Run npm run build at the end."',
                    shell=True, cwd=project_dir
                )

if __name__ == "__main__":
    main()
