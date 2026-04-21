"""
Shared git utilities for site-builder, site-audit, and nextjs-deploy skills.
Provides worktree management, branch safety checks, and clean diff helpers.
"""

import os
import re
import shutil
import subprocess
import tempfile
from pathlib import Path
from typing import Optional


# ── Colors ───────────────────────────────────────────────────────────────────
R="\033[0m"; BOLD="\033[1m"; RED="\033[31m"; GRN="\033[32m"
YLW="\033[33m"; BLU="\033[34m"; DIM="\033[2m"

def ok(m): print(f"  {GRN}✅{R}  {m}")
def warn(m): print(f"  {YLW}⚠️ {R}  {m}")
def err(m): print(f"  {RED}❌{R}  {m}")
def info(m): print(f"  {BLU}→{R}  {m}")


# ── Core Helpers ──────────────────────────────────────────────────────────────
def run(cmd: str, cwd=None, capture=True) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, shell=True, cwd=cwd,
                          capture_output=capture, text=True)


def is_git_repo(path: Path) -> bool:
    return (path / ".git").exists() or run("git rev-parse --git-dir", cwd=path).returncode == 0


def ensure_git_repo(path: Path):
    """Initialize a git repo if one doesn't exist. Commit all files."""
    if not is_git_repo(path):
        info(f"Initializing git repo in {path.name}")
        run("git init", cwd=path)
        run("git add -A", cwd=path)
        run('git commit -m "Initial commit (site-builder)"', cwd=path)
        ok("Git repo initialized")


def current_branch(path: Path) -> str:
    r = run("git branch --show-current", cwd=path)
    return r.stdout.strip() or "main"


def is_dirty(path: Path) -> bool:
    r = run("git status --porcelain", cwd=path)
    return bool(r.stdout.strip())


def uncommitted_files(path: Path) -> list[str]:
    r = run("git status --porcelain", cwd=path)
    return [line.strip() for line in r.stdout.strip().splitlines() if line.strip()]


def commit_all(path: Path, message: str):
    run("git add -A", cwd=path)
    run(f'git commit -m "{message}"', cwd=path)


def branch_exists(path: Path, branch: str) -> bool:
    r = run(f"git branch --list {branch}", cwd=path)
    return bool(r.stdout.strip())


def delete_branch(path: Path, branch: str, force=False):
    flag = "-D" if force else "-d"
    run(f"git branch {flag} {branch}", cwd=path)


# ── Worktree Management ───────────────────────────────────────────────────────
class Worktree:
    """
    Context manager for a git worktree.

    Usage:
        with Worktree(project_dir, branch="audit/fixes-2026-03-23") as wt:
            # work in wt.path
            ...
        # worktree cleaned up on exit
        # optionally merge back:
        wt.merge_to_main()  # call before exiting 'with' block
    """

    def __init__(self, repo_dir: Path, branch: str, base: str = "HEAD",
                 worktree_root: Optional[Path] = None, auto_cleanup: bool = True):
        self.repo_dir = repo_dir
        self.branch = branch
        self.base = base
        self.auto_cleanup = auto_cleanup
        self._merged = False

        # Where to put the worktree directory
        root = worktree_root or Path(tempfile.gettempdir()) / "site-builder-worktrees"
        root.mkdir(parents=True, exist_ok=True)
        safe_branch = re.sub(r'[^a-zA-Z0-9_-]', '-', branch)
        self.path = root / f"{repo_dir.name}__{safe_branch}"

    def __enter__(self) -> "Worktree":
        self._setup()
        return self

    def __exit__(self, *args):
        if self.auto_cleanup and not self._merged:
            self.cleanup()

    def _setup(self):
        """Create the worktree + branch."""
        ensure_git_repo(self.repo_dir)

        # Remove stale worktree if it exists
        if self.path.exists():
            info(f"Removing stale worktree: {self.path.name}")
            run(f"git worktree remove --force {self.path}", cwd=self.repo_dir)
            if self.path.exists():
                shutil.rmtree(self.path, ignore_errors=True)

        # Delete stale branch if it exists
        if branch_exists(self.repo_dir, self.branch):
            run(f"git branch -D {self.branch}", cwd=self.repo_dir)

        # Create worktree with new branch
        r = run(f"git worktree add -b {self.branch} {self.path} {self.base}",
                cwd=self.repo_dir)
        if r.returncode != 0:
            raise RuntimeError(f"Failed to create worktree: {r.stderr}")

        ok(f"Worktree created: {self.path.name} (branch: {self.branch})")

    def diff_summary(self) -> str:
        """Return a human-readable summary of changes in this worktree."""
        r = run(f"git diff HEAD --stat", cwd=self.path)
        return r.stdout.strip() or "No changes"

    def diff_full(self) -> str:
        """Return full git diff of all changes."""
        r = run("git diff HEAD", cwd=self.path)
        return r.stdout.strip()

    def changed_files(self) -> list[str]:
        """List files changed in the worktree."""
        r = run("git status --porcelain", cwd=self.path)
        return [line[3:].strip() for line in r.stdout.strip().splitlines() if line.strip()]

    def commit(self, message: str):
        """Stage and commit all changes in the worktree."""
        run("git add -A", cwd=self.path)
        r = run(f'git commit -m "{message}"', cwd=self.path)
        if r.returncode == 0:
            ok(f"Committed: {message}")
        else:
            warn(f"Nothing to commit or commit failed: {r.stderr[:100]}")

    def merge_to(self, target_branch: str = "main", squash: bool = False) -> bool:
        """Merge this worktree's branch into target. Returns True on success."""
        flag = "--squash" if squash else "--no-ff"
        r = run(f"git merge {flag} {self.branch} -m 'Merge {self.branch}'",
                cwd=self.repo_dir)
        if r.returncode == 0:
            self._merged = True
            ok(f"Merged {self.branch} → {target_branch}")
            return True
        else:
            err(f"Merge failed: {r.stderr[:200]}")
            return False

    def cleanup(self):
        """Remove the worktree and its branch."""
        run(f"git worktree remove --force {self.path}", cwd=self.repo_dir)
        if self.path.exists():
            shutil.rmtree(self.path, ignore_errors=True)
        # Delete branch if not merged
        if not self._merged and branch_exists(self.repo_dir, self.branch):
            run(f"git branch -D {self.branch}", cwd=self.repo_dir)


# ── Convenience Functions ─────────────────────────────────────────────────────
def with_clean_worktree(repo_dir: Path, branch: str, task_fn, base="HEAD",
                         auto_merge=False, merge_target="main"):
    """
    Run task_fn(worktree_path) in an isolated worktree.
    If auto_merge=True, merges on success.
    Returns (success: bool, worktree: Worktree).

    Example:
        def fix_task(wt_path):
            # do stuff in wt_path
            return True

        success, wt = with_clean_worktree(project, "fix/my-fix", fix_task)
        if success:
            wt.merge_to("main")
    """
    ensure_git_repo(repo_dir)

    wt = Worktree(repo_dir, branch, base=base, auto_cleanup=False)
    wt._setup()

    try:
        success = task_fn(wt)
        if success and auto_merge:
            wt.commit(f"Changes from {branch}")
            wt.merge_to(merge_target)
        return success, wt
    except Exception as e:
        err(f"Task failed: {e}")
        wt.cleanup()
        raise


def git_status_check(project_dir: Path, warn_only=False) -> bool:
    """
    Check for uncommitted changes. Returns True if clean.
    If warn_only=True, shows warning but doesn't stop. 
    """
    if not is_git_repo(project_dir):
        warn(f"{project_dir.name} is not a git repo — initializing")
        ensure_git_repo(project_dir)
        return True

    dirty = uncommitted_files(project_dir)
    if dirty:
        if warn_only:
            warn(f"{len(dirty)} uncommitted file(s) in {project_dir.name}")
            for f in dirty[:5]:
                print(f"    {DIM}{f}{R}")
            if len(dirty) > 5:
                print(f"    {DIM}... and {len(dirty)-5} more{R}")
            return False
        else:
            err(f"Uncommitted changes in {project_dir.name}. Commit or stash first.")
            for f in dirty[:5]:
                print(f"    {DIM}{f}{R}")
            return False

    ok(f"Git working tree clean ({current_branch(project_dir)})")
    return True


def print_diff_summary(wt: Worktree):
    """Print a clean summary of what changed."""
    changed = wt.changed_files()
    if not changed:
        info("No files changed")
        return

    print(f"\n  {BOLD}Changed files:{R}")
    for f in changed:
        print(f"    {GRN}+{R} {f}")
    print()
    summary = wt.diff_summary()
    if summary:
        print(f"  {DIM}{summary}{R}\n")
