#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = ["requests"]
# ///

"""
nextjs-deploy — Deployment pipeline for Next.js + Vercel
Usage: uv run deploy.py <project_dir> [options]
"""

import argparse
from datetime import datetime, timezone
import json
import os
import re
import shlex
import shutil
import subprocess
import sys
from pathlib import Path as _Path

# Shared git utilities
sys.path.insert(0, str(_Path(__file__).parent.parent.parent / "_shared/scripts"))
try:
    from git_utils import git_status_check, ensure_git_repo, is_git_repo, current_branch
    HAS_GIT_UTILS = True
except ImportError:
    HAS_GIT_UTILS = False
import time
from pathlib import Path
from typing import Any, Optional

# ── Colors ──────────────────────────────────────────────────────────────────
RESET = "\033[0m"
BOLD = "\033[1m"
RED = "\033[31m"
GREEN = "\033[32m"
YELLOW = "\033[33m"
BLUE = "\033[34m"
CYAN = "\033[36m"
DIM = "\033[2m"

def ok(msg): print(f"  {GREEN}✅{RESET}  {msg}")
def warn(msg): print(f"  {YELLOW}⚠️ {RESET}  {msg}")
def err(msg): print(f"  {RED}❌{RESET}  {msg}")
def info(msg): print(f"  {BLUE}→{RESET}  {msg}")
def dim(msg): print(f"  {DIM}{msg}{RESET}")
def header(msg): print(f"\n{BOLD}{CYAN}{msg}{RESET}")
def rule(): print(f"  {DIM}{'─' * 55}{RESET}")

# ── Helpers ──────────────────────────────────────────────────────────────────
def run(cmd, cwd=None, capture=False, env=None):
    result = subprocess.run(
        cmd, shell=True, cwd=cwd,
        capture_output=capture, text=True, env=env
    )
    return result

def run_stream(cmd, cwd=None):
    """Run command and stream output in real time."""
    process = subprocess.Popen(
        cmd, shell=True, cwd=cwd,
        stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
        text=True, bufsize=1
    )
    output_lines = []
    for line in process.stdout:
        print(f"     {DIM}{line.rstrip()}{RESET}")
        output_lines.append(line)
    process.wait()
    return process.returncode, "".join(output_lines)

def ask(prompt, default="y") -> bool:
    indicator = "[Y/n]" if default == "y" else "[y/N]"
    resp = input(f"  {YELLOW}?{RESET}  {prompt} {DIM}{indicator}{RESET} ").strip().lower()
    if not resp:
        return default == "y"
    return resp in ("y", "yes")

def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")

def strip_ansi(text: str) -> str:
    return re.sub(r"\x1b\[[0-9;]*m", "", text)

def combine_output(stdout: str = "", stderr: str = "") -> str:
    return "\n".join(part for part in [stdout.strip(), stderr.strip()] if part).strip()

def classify_blocker(text: str, default: str = "blocked_runtime_state") -> str:
    lower = strip_ansi(text).lower()
    if any(token in lower for token in ["enotfound", "eai_again", "could not resolve host", "getaddrinfo", "dns", "network", "timed out", "timeout", "econnreset", "connection reset", "temporary failure in name resolution"]):
        return "blocked_network"
    if any(token in lower for token in ["not authenticated", "login", "log in", "unauthorized", "forbidden", "invalid token", "authentication", "permission denied", "token"]):
        return "blocked_auth"
    if any(token in lower for token in ["type error", "build failed", "compilation failed", "eslint", "lint", "cannot find module", "syntax error"]):
        return "blocked_build"
    return default

def choose_deploy_url(output: str, target: str) -> Optional[str]:
    matches = re.findall(r"https://[^\s)]+", strip_ansi(output))
    if not matches:
        return None
    cleaned = []
    for match in matches:
        trimmed = match.rstrip(".,")
        if "inspect" in trimmed:
            continue
        cleaned.append(trimmed)
    if not cleaned:
        return None
    if target == "preview":
        for candidate in cleaned:
            if "vercel.app" in candidate:
                return candidate
    for candidate in cleaned:
        if "vercel.app" in candidate:
            return candidate
    return cleaned[-1]

def init_result(project_dir: Path, target: str) -> dict[str, Any]:
    return {
        "timestamp": now_iso(),
        "project_dir": str(project_dir),
        "project_name": project_dir.name,
        "target": target,
        "status": None,
        "blocker_type": None,
        "message": None,
        "deploy_url": None,
        "vercel_user": None,
        "project_linked": False,
        "project_link": None,
        "build_passed": None,
        "smoke_passed": None,
        "steps": {},
    }

def write_result(path: Optional[Path], payload: dict[str, Any]) -> None:
    if not path:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=True) + "\n")

def load_config(project_dir: Path) -> dict:
    """Merge defaults with per-project .deploy.json."""
    defaults_path = Path(__file__).parent.parent / "config" / "defaults.json"
    config = json.loads(defaults_path.read_text()) if defaults_path.exists() else {}

    project_config_path = project_dir / ".deploy.json"
    if project_config_path.exists():
        project_config = json.loads(project_config_path.read_text())
        # Deep merge smoke_urls (replace, not extend)
        config.update(project_config)

    return config

def parse_env_file(env_path: Path) -> dict:
    """Parse .env.local into a dict, skipping comments and empty lines."""
    if not env_path.exists():
        return {}
    env = {}
    for line in env_path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if "=" in line:
            key, _, val = line.partition("=")
            # Strip quotes if present
            val = val.strip().strip('"').strip("'")
            env[key.strip()] = val
    return env

# ── Step 1: Preflight ────────────────────────────────────────────────────────
def step_preflight(project_dir: Path, config: dict, dry_run: bool) -> tuple[bool, dict[str, Any]]:
    header("STEP 1 — PREFLIGHT")

    passed = True
    details: dict[str, Any] = {
        "project_linked": False,
        "project_link": None,
        "vercel_user": None,
        "nextjs_version": None,
        "blocker_type": None,
        "errors": [],
    }

    project_link_path = project_dir / ".vercel" / "project.json"
    if project_link_path.exists():
        details["project_linked"] = True
        try:
            details["project_link"] = json.loads(project_link_path.read_text())
            ok(f"Vercel project linked: {details['project_link'].get('projectName', project_dir.name)}")
        except Exception as exc:
            warn(f"Could not parse .vercel/project.json: {exc}")
            details["errors"].append(f"link-parse: {exc}")
    else:
        warn(".vercel/project.json missing — linkage will rely on current Vercel context")

    # Git status check — warn on dirty tree, block on untracked .env files
    if HAS_GIT_UTILS and not dry_run:
        if is_git_repo(project_dir):
            branch = current_branch(project_dir)
            ok(f"Git branch: {branch}")
            clean = git_status_check(project_dir, warn_only=True)
            if not clean:
                warn("Deploying with uncommitted changes — consider committing first")
                warn("Run: git add -A && git commit -m 'pre-deploy snapshot'")
        else:
            warn(f"{project_dir.name} is not a git repo — skipping git checks")
    elif dry_run:
        info("[dry-run] Would check git status")

    # Check vercel CLI
    if shutil.which("vercel"):
        result = run("vercel whoami", capture=True)
        if result.returncode == 0:
            user = strip_ansi(result.stdout).strip().splitlines()[-1]
            details["vercel_user"] = user
            ok(f"Vercel CLI authed as: {user}")
        else:
            err("Vercel CLI not authenticated. Run: vercel login")
            passed = False
            combined = combine_output(result.stdout, result.stderr)
            details["blocker_type"] = classify_blocker(combined, default="blocked_auth")
            if combined:
                details["errors"].append(combined)
    else:
        err("vercel CLI not found. Run: npm install -g vercel")
        passed = False
        details["blocker_type"] = "blocked_runtime_state"
        details["errors"].append("vercel CLI not found")

    # Check node/npm
    if shutil.which("npm"):
        result = run("node --version", capture=True)
        ok(f"Node.js {result.stdout.strip()}")
    else:
        err("node/npm not found")
        passed = False
        details["blocker_type"] = details["blocker_type"] or "blocked_runtime_state"
        details["errors"].append("node/npm not found")

    # Check node_modules
    if (project_dir / "node_modules").exists():
        ok("node_modules present")
    else:
        warn("node_modules missing — running npm install")
        if not dry_run:
            r = run("npm install", cwd=project_dir, capture=True)
            if r.returncode != 0:
                err(f"npm install failed: {r.stderr[:200]}")
                passed = False
                combined = combine_output(r.stdout, r.stderr)
                details["blocker_type"] = details["blocker_type"] or classify_blocker(combined)
                if combined:
                    details["errors"].append(combined)
            else:
                ok("npm install complete")

    # Detect Next.js version
    pkg_path = project_dir / "package.json"
    if pkg_path.exists():
        pkg = json.loads(pkg_path.read_text())
        deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
        nextjs_ver = deps.get("next", "unknown").lstrip("^~")
        details["nextjs_version"] = nextjs_ver
        major = nextjs_ver.split(".")[0] if nextjs_ver != "unknown" else "0"
        ok(f"Next.js {nextjs_ver} detected")

        # Flag breaking changes for this version
        breaking = config.get("nextjs_breaking_changes", {})
        for ver, notes in breaking.items():
            if int(major) >= int(ver):
                for note in notes:
                    warn(f"Next.js {ver}+ breaking change: {note}")
    else:
        warn("package.json not found")
        passed = False
        details["blocker_type"] = details["blocker_type"] or "blocked_runtime_state"
        details["errors"].append("package.json not found")

    return passed, details

# ── Step 2: Asset Audit ──────────────────────────────────────────────────────
def step_asset_audit(project_dir: Path, config: dict, dry_run: bool, auto_yes: bool) -> tuple[bool, dict[str, Any]]:
    header("STEP 2 — ASSET AUDIT")

    min_kb = config.get("asset_min_kb", 200)
    hero_patterns = config.get("hero_patterns", ["hero", "step", "feature"])
    public_dir = project_dir / "public"
    src_dir = project_dir / "src"

    flagged = []
    missing = []
    details: dict[str, Any] = {
        "flagged_images": [],
        "missing_references": [],
        "blocker_type": None,
        "errors": [],
    }

    # Find all image files in public/
    image_exts = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"}
    all_images = {}
    if public_dir.exists():
        for f in public_dir.rglob("*"):
            if f.suffix.lower() in image_exts:
                all_images[f.name] = f

    # Check hero/feature images for size
    for name, path in all_images.items():
        name_lower = name.lower()
        is_hero = any(p in name_lower for p in hero_patterns)
        if is_hero:
            size_kb = path.stat().st_size / 1024
            if size_kb < min_kb:
                flagged.append((path, size_kb))
            else:
                ok(f"{name} ({size_kb:.0f}KB ✓)")

    # Check for broken image references in src/
    if src_dir.exists():
        src_files = list(src_dir.rglob("*.tsx")) + list(src_dir.rglob("*.ts")) + list(src_dir.rglob("*.jsx"))
        ref_pattern = re.compile(r'["\'](/[^"\']+\.(?:jpg|jpeg|png|webp|avif|gif|svg))["\']')
        for src_file in src_files:
            try:
                content = src_file.read_text()
                for match in ref_pattern.finditer(content):
                    img_path = match.group(1)
                    abs_path = project_dir / "public" / img_path.lstrip("/")
                    if not abs_path.exists():
                        missing.append((img_path, src_file.relative_to(project_dir)))
            except Exception:
                pass

    details["flagged_images"] = [
        {"path": str(path.relative_to(project_dir)), "size_kb": round(size_kb, 1)}
        for path, size_kb in flagged
    ]
    details["missing_references"] = [
        {"path": img_path, "source": str(src_file)}
        for img_path, src_file in missing
    ]

    # Report
    if not flagged and not missing:
        ok("All images pass audit")
        return True, details

    if flagged:
        print()
        warn(f"{len(flagged)} image(s) below {min_kb}KB threshold (will appear blurry):")
        rule()
        for path, size_kb in flagged:
            print(f"     {RED}✗{RESET} {path.relative_to(project_dir)}  {DIM}({size_kb:.1f}KB — needs replacement){RESET}")
        rule()
        print()
        info("These images need replacement. Options:")
        info("  1. Replace the file manually with a high-res version")
        info("  2. Use the image-gen skill to regenerate:")
        info(f"     uv run ~/.openclaw/skills/image-gen/scripts/generate.py --prompt '...' --provider openai --model best --filename <path>")
        print()
        if not dry_run and not auto_yes and not ask("Continue deploy with flagged images?", default="n"):
            err("Deploy cancelled — fix images first")
            details["blocker_type"] = "blocked_runtime_state"
            details["errors"].append("Deploy cancelled due to flagged images")
            return False, details
        if auto_yes:
            warn("Continuing with flagged images because --yes was set")

    if missing:
        print()
        warn(f"{len(missing)} broken image reference(s) found:")
        rule()
        for img_path, src_file in missing[:10]:
            print(f"     {RED}✗{RESET} {img_path}  {DIM}(referenced in {src_file}){RESET}")
        rule()
        if not dry_run and not auto_yes and not ask("Continue deploy with broken image references?", default="n"):
            err("Deploy cancelled — fix missing images first")
            details["blocker_type"] = "blocked_runtime_state"
            details["errors"].append("Deploy cancelled due to broken image references")
            return False, details
        if auto_yes:
            warn("Continuing with broken image references because --yes was set")

    return True, details

# ── Step 3: Env Sync ─────────────────────────────────────────────────────────
def step_env_sync(project_dir: Path, config: dict, dry_run: bool, auto_env: bool, target: str) -> tuple[bool, dict[str, Any]]:
    header("STEP 3 — ENV SYNC")

    env_file = project_dir / config.get("env_file", ".env.local")
    environment = "preview" if target == "preview" else "production"
    details: dict[str, Any] = {
        "environment": environment,
        "added": [],
        "already_set": [],
        "blocker_type": None,
        "errors": [],
    }
    if not env_file.exists():
        warn(f"{env_file.name} not found — skipping env sync")
        return True, details

    local_env = parse_env_file(env_file)
    if not local_env:
        warn("No env vars found in local env file")
        return True, details

    # Get current Vercel env vars
    result = run(f"vercel env ls {environment} --format json", cwd=project_dir, capture=True)
    vercel_output = result.stdout.strip()
    if result.returncode != 0:
        combined = combine_output(result.stdout, result.stderr)
        err(f"Vercel env ls failed for {environment}")
        details["blocker_type"] = classify_blocker(combined, default="blocked_runtime_state")
        if combined:
            details["errors"].append(combined)
        return False, details

    # Parse vercel env ls output to get existing var names
    vercel_vars = set()
    try:
        parsed = json.loads(vercel_output) if vercel_output else []
    except json.JSONDecodeError:
        parsed = None

    parsed_items = parsed
    if isinstance(parsed, dict):
        parsed_items = parsed.get("envs", [])

    if isinstance(parsed_items, list):
        for item in parsed_items:
            if not isinstance(item, dict):
                continue
            key = item.get("key") or item.get("name")
            if isinstance(key, str) and key.strip():
                vercel_vars.add(key.strip())
    else:
        combined_output_text = combine_output(result.stdout, result.stderr)
        for line in combined_output_text.splitlines():
            parts = line.split()
            if parts and not parts[0].startswith("Vercel") and not parts[0].startswith("─") and len(parts) >= 2:
                vercel_vars.add(parts[0])

    to_add = []
    already_set = []

    for key, val in local_env.items():
        # Skip internal Next.js vars
        if key.startswith("__"):
            continue
        if key in vercel_vars:
            already_set.append(key)
        else:
            to_add.append((key, val))

    # Report
    for key in already_set:
        ok(f"{key}  {DIM}already set{RESET}")
    details["already_set"] = already_set

    if to_add:
        print()
        warn(f"{len(to_add)} var(s) missing from Vercel {environment}:")
        rule()
        for key, val in to_add:
            masked = val[:4] + "..." if len(val) > 4 else "***"
            print(f"     {YELLOW}+{RESET} {key}  {DIM}= {masked}{RESET}")
        rule()
        print()

        if dry_run:
            info(f"[dry-run] Would add vars above to Vercel {environment}")
            return True, details

        if auto_env or ask("Add missing vars to Vercel production?"):
            for key, val in to_add:
                # Use printf pipe to avoid whitespace issues
                cmd = f"printf '%s' {shlex.quote(val)} | vercel env add {shlex.quote(key)} {environment}"
                r = run(cmd, cwd=project_dir, capture=True)
                if r.returncode == 0:
                    ok(f"Added {key}")
                    details["added"].append(key)
                else:
                    # Try remove + re-add if already exists
                    run(f"vercel env rm {shlex.quote(key)} {environment} --yes", cwd=project_dir, capture=True)
                    r2 = run(cmd, cwd=project_dir, capture=True)
                    if r2.returncode == 0:
                        ok(f"Updated {key}")
                        details["added"].append(key)
                    else:
                        err(f"Failed to add {key}: {r2.stderr[:100]}")
                        combined = combine_output(r2.stdout, r2.stderr)
                        details["blocker_type"] = classify_blocker(combined, default="blocked_runtime_state")
                        if combined:
                            details["errors"].append(combined)
                        return False, details
        else:
            warn("Skipped env sync — vars may be missing on Vercel")
    else:
        ok("All env vars synced")

    return True, details

# ── Step 4: Build ────────────────────────────────────────────────────────────
def step_build(project_dir: Path, dry_run: bool) -> tuple[bool, dict[str, Any]]:
    header("STEP 4 — BUILD")
    details: dict[str, Any] = {
        "elapsed_seconds": 0,
        "blocker_type": None,
        "errors": [],
    }

    if dry_run:
        info("[dry-run] Would run: npm run build")
        return True, details

    info("Running npm run build...")
    print()
    start = time.time()
    code, output = run_stream("npm run build", cwd=project_dir)
    elapsed = time.time() - start
    details["elapsed_seconds"] = round(elapsed, 2)

    print()
    if code != 0:
        err(f"Build failed after {elapsed:.0f}s")
        details["blocker_type"] = "blocked_build"

        # Extract TypeScript/Next.js errors
        error_lines = [l for l in output.splitlines() if "Error" in l or "error" in l.lower() or "Type error" in l]
        if error_lines:
            rule()
            for line in error_lines[:10]:
                print(f"     {RED}{line.strip()}{RESET}")
            rule()
            details["errors"] = [strip_ansi(line.strip()) for line in error_lines[:10]]
        else:
            details["errors"].append("Build failed without parseable error output")

        return False, details

    ok(f"Build passed in {elapsed:.0f}s")

    # Count routes
    route_count = output.count("○") + output.count("●") + output.count("ƒ")
    if route_count:
        dim(f"{route_count} routes generated")

    return True, details

# ── Step 5: Deploy ───────────────────────────────────────────────────────────
def step_deploy(project_dir: Path, dry_run: bool, target: str) -> tuple[Optional[str], dict[str, Any]]:
    header("STEP 5 — DEPLOY")
    details: dict[str, Any] = {
        "target": target,
        "elapsed_seconds": 0,
        "blocker_type": None,
        "errors": [],
        "deploy_command": None,
    }

    if dry_run:
        info(f"[dry-run] Would run: vercel deploy ({target})")
        return "https://example-dry-run.vercel.app", details

    command = "vercel deploy --yes --target preview" if target == "preview" else "vercel deploy --yes --prod"
    details["deploy_command"] = command
    info(f"Deploying to Vercel {target}...")
    print()
    start = time.time()
    code, output = run_stream(command, cwd=project_dir)
    elapsed = time.time() - start
    details["elapsed_seconds"] = round(elapsed, 2)
    print()

    if code != 0:
        err(f"Deploy failed after {elapsed:.0f}s")
        details["blocker_type"] = classify_blocker(output)
        details["errors"].append(strip_ansi(output.strip())[-2000:])
        return None, details

    # Extract deployment URL
    url = choose_deploy_url(output, target)

    if url:
        ok(f"Deployed in {elapsed:.0f}s → {BOLD}{url}{RESET}")
        # Save to deploy history
        history_path = project_dir / ".deploy-history.json"
        history = []
        if history_path.exists():
            try:
                history = json.loads(history_path.read_text())
            except Exception:
                pass
        history.insert(0, {"url": url, "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ"), "elapsed": elapsed, "target": target})
        history_path.write_text(json.dumps(history[:5], indent=2))
    else:
        warn("Could not extract deployment URL from output")
        details["blocker_type"] = "blocked_runtime_state"
        details["errors"].append("Deploy completed without an extractable URL")
        return None, details

    return url, details

# ── Step 6: Smoke Tests ──────────────────────────────────────────────────────
def step_smoke(base_url: str, config: dict, dry_run: bool) -> tuple[bool, dict[str, Any]]:
    import requests as req

    header("STEP 6 — SMOKE TESTS")
    details: dict[str, Any] = {"results": [], "blocker_type": None, "errors": []}

    if dry_run:
        info("[dry-run] Would test configured routes")
        return True, details

    smoke_urls = config.get("smoke_urls", [
        {"path": "/", "expect": 200},
        {"path": "/sitemap.xml", "expect": 200},
        {"path": "/robots.txt", "expect": 200},
    ])

    passed = True
    for route in smoke_urls:
        path = route["path"]
        expected = route.get("expect", 200)
        url = base_url.rstrip("/") + path

        try:
            start = time.time()
            r = req.get(url, timeout=15, allow_redirects=True)
            elapsed_ms = (time.time() - start) * 1000
            actual = r.status_code

            if actual == expected:
                ok(f"{path}  {DIM}→ {actual} ({elapsed_ms:.0f}ms){RESET}")
                details["results"].append({"path": path, "expected": expected, "actual": actual, "ok": True, "elapsed_ms": round(elapsed_ms, 1)})
            elif expected in (301, 302) and actual in (301, 302):
                ok(f"{path}  {DIM}→ {actual} redirect ✓ ({elapsed_ms:.0f}ms){RESET}")
                details["results"].append({"path": path, "expected": expected, "actual": actual, "ok": True, "elapsed_ms": round(elapsed_ms, 1)})
            else:
                warn(f"{path}  {DIM}→ expected {expected}, got {actual}{RESET}")
                passed = False
                details["blocker_type"] = "blocked_runtime_state"
                details["results"].append({"path": path, "expected": expected, "actual": actual, "ok": False, "elapsed_ms": round(elapsed_ms, 1)})
        except Exception as e:
            err(f"{path}  → request failed: {e}")
            passed = False
            details["blocker_type"] = details["blocker_type"] or classify_blocker(str(e))
            details["errors"].append(str(e))
            details["results"].append({"path": path, "expected": expected, "actual": None, "ok": False, "error": str(e)})

    return passed, details

# ── Rollback ─────────────────────────────────────────────────────────────────
def do_rollback(project_dir: Path):
    header("ROLLBACK")
    history_path = project_dir / ".deploy-history.json"
    if not history_path.exists() or not json.loads(history_path.read_text()):
        err("No deploy history found — run vercel rollback manually")
        return
    history = json.loads(history_path.read_text())
    if len(history) < 2:
        err("Only one deploy in history — nothing to rollback to")
        return
    prev = history[1]
    info(f"Previous deploy: {prev['url']}  {DIM}({prev['timestamp']}){RESET}")
    if ask("Rollback to this deployment?"):
        run_stream("vercel rollback", cwd=project_dir)

# ── Main ─────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Next.js production deploy pipeline")
    parser.add_argument("project_dir", help="Path to the Next.js project")
    parser.add_argument("--dry-run", action="store_true", help="Show what would happen, don't execute")
    parser.add_argument("--skip-assets", action="store_true", help="Skip asset audit")
    parser.add_argument("--skip-env-sync", action="store_true", help="Skip Vercel environment synchronization")
    parser.add_argument("--skip-smoke", action="store_true", help="Skip smoke tests")
    parser.add_argument("--auto-env", action="store_true", help="Auto-add missing env vars without prompting")
    parser.add_argument("--target", choices=["preview", "production"], default="production", help="Deploy target")
    parser.add_argument("--json-output", help="Write a structured result JSON file")
    parser.add_argument("--yes", action="store_true", help="Continue past non-fatal prompts without asking")
    parser.add_argument("--rollback", action="store_true", help="Rollback to previous deployment")
    args = parser.parse_args()

    project_dir = Path(args.project_dir).resolve()
    json_output = Path(args.json_output).resolve() if args.json_output else None
    result = init_result(project_dir, args.target)
    if not project_dir.exists():
        err(f"Project directory not found: {project_dir}")
        result["status"] = "blocked_runtime_state"
        result["blocker_type"] = "blocked_runtime_state"
        result["message"] = f"Project directory not found: {project_dir}"
        write_result(json_output, result)
        sys.exit(1)

    print(f"\n{BOLD}{'━' * 60}{RESET}")
    print(f"{BOLD}  🚀 nextjs-deploy — {project_dir.name}{RESET}")
    if args.dry_run:
        print(f"  {YELLOW}DRY RUN — nothing will be executed{RESET}")
    print(f"{BOLD}{'━' * 60}{RESET}")

    config = load_config(project_dir)
    start_total = time.time()

    # Rollback mode
    if args.rollback:
        do_rollback(project_dir)
        return

    # Run pipeline
    steps_passed = True

    preflight_ok, preflight_details = step_preflight(project_dir, config, args.dry_run)
    result["steps"]["preflight"] = preflight_details
    result["project_linked"] = preflight_details.get("project_linked", False)
    result["project_link"] = preflight_details.get("project_link")
    result["vercel_user"] = preflight_details.get("vercel_user")
    if not preflight_ok:
        result["status"] = preflight_details.get("blocker_type") or "blocked_runtime_state"
        result["blocker_type"] = result["status"]
        result["message"] = "Preflight failed"
        write_result(json_output, result)
        err("Preflight failed — fix issues above and retry")
        sys.exit(1)

    if not args.skip_assets:
        assets_ok, assets_details = step_asset_audit(project_dir, config, args.dry_run, args.yes)
        result["steps"]["asset_audit"] = assets_details
        if not assets_ok:
            result["status"] = assets_details.get("blocker_type") or "blocked_runtime_state"
            result["blocker_type"] = result["status"]
            result["message"] = "Asset audit failed"
            write_result(json_output, result)
            sys.exit(1)

    if args.skip_env_sync:
        result["steps"]["env_sync"] = {"skipped": True}
    else:
        env_ok, env_details = step_env_sync(project_dir, config, args.dry_run, args.auto_env, args.target)
        result["steps"]["env_sync"] = env_details
        if not env_ok:
            result["status"] = env_details.get("blocker_type") or "blocked_runtime_state"
            result["blocker_type"] = result["status"]
            result["message"] = "Environment sync failed"
            write_result(json_output, result)
            sys.exit(1)

    build_ok, build_details = step_build(project_dir, args.dry_run)
    result["steps"]["build"] = build_details
    result["build_passed"] = build_ok
    if not build_ok:
        result["status"] = build_details.get("blocker_type") or "blocked_build"
        result["blocker_type"] = result["status"]
        result["message"] = "Build failed"
        write_result(json_output, result)
        err("Build failed — fix errors above and retry")
        sys.exit(1)

    deploy_url, deploy_details = step_deploy(project_dir, args.dry_run, args.target)
    result["steps"]["deploy"] = deploy_details
    if not deploy_url:
        result["status"] = deploy_details.get("blocker_type") or "blocked_runtime_state"
        result["blocker_type"] = result["status"]
        result["message"] = "Deploy failed"
        write_result(json_output, result)
        err("Deploy failed")
        sys.exit(1)
    result["deploy_url"] = deploy_url

    if not args.skip_smoke:
        smoke_ok, smoke_details = step_smoke(deploy_url, config, args.dry_run)
        result["steps"]["smoke"] = smoke_details
        result["smoke_passed"] = smoke_ok
        if not smoke_ok:
            warn("Some smoke tests failed — check the live site")
            steps_passed = False
    else:
        result["smoke_passed"] = None

    # Final report
    elapsed_total = time.time() - start_total
    header("DONE")
    rule()
    if steps_passed:
        ok(f"Deployed successfully in {elapsed_total:.0f}s")
    else:
        warn(f"Deployed with warnings in {elapsed_total:.0f}s")
    info(f"Live: {BOLD}{deploy_url}{RESET}")
    rule()
    print()

    result["status"] = "preview_ready" if args.target == "preview" else "production_ready"
    result["blocker_type"] = None
    result["message"] = "Deploy completed"
    write_result(json_output, result)

if __name__ == "__main__":
    main()
