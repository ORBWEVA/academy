# Changelog

All notable changes to `@orbweva/academy` will be documented here. Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] — 2026-04-14

### Added
- **Auto-install for CLI tools and MCP servers.** After skills land, the installer now prompts Y/n per CLI command (brew/winget/scoop/npm, `gh auth login`, etc.) and per `claude mcp add`, then actually runs the ones you approve. Previously it only printed the commands.
- `--no-run` flag for users who want the old print-only behavior.
- `--yes` now auto-approves every CLI and MCP command in addition to skill choices.

### Changed
- `--skills-only` now fully skips the CLI + MCP section (previously it printed guidance and stopped).
- Re-licensed to dual MIT + CC BY-NC-SA 4.0 to match the broader ORBWEVA ecosystem. Code is MIT; docs and prose are CC BY-NC-SA 4.0. See `LICENSE` and `LICENSE-DOCS`.
- Windows CLI steps now use explicit `winget install --id <pkg> -e` form and `Set-ExecutionPolicy … -Force` for the Scoop bootstrap.

### Notes
- Interactive commands (`gh auth login`) work because child processes inherit stdio — follow the browser prompts as usual.
- Windows admin steps (`winget install …`) fail if Node was launched from non-Admin PowerShell. Re-run those from an Admin window, or use `--no-run` and run manually.

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
