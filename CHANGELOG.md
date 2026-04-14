# Changelog

All notable changes to `@orbweva/academy` will be documented here. Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] — 2026-04-14

### Added
- Initial public release.
- `npx @orbweva/academy` installer CLI with zero runtime dependencies (Node 18+, `git` required at install time).
- **Tracks**: `accelerator` (12-week cohort, 15 skills), `course` (self-paced, 9 skills), `mentoring` (1:1, 13 skills), `founder` (partner-delivered, 10 skills), `full` (everything).
- **Specialization packs** (architecture ready; repos planned): `loka`, `marketing`, `web-video`.
- Bundle composition: track + stackable packs, auto-deduped across shared repos.
- Interactive prompts with `--yes` non-interactive mode.
- Flags: `--track`, `--pack` (repeatable), `--global`, `--local`, `--skills-only`, `--dry-run`, `--help`.
- Post-install guidance: per-OS CLI tool commands (`brew`/`winget`/`scoop`) and `claude mcp add` suggestions.
- Pulls 11 public ORBWEVA skill repos via shallow git clone into `~/.claude/skills/` (or project-local `./.claude/skills/`).
- Graceful skip for `status: "planned"` repos that don't exist yet.

### Known limitations
- Prereqs (Node, Git, Claude Code) are not auto-installed — the script assumes they're present.
- CLI tools and MCP servers are printed, not executed. Auto-run planned for a later release.
- Pack repos (`ORBWEVA/loka-pack`, `ORBWEVA/marketing-pack`, `ORBWEVA/web-video-pack`) are referenced in `manifest.json` but not yet published.
