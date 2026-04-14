<div align="center">

# @orbweva/academy

**English** · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md)

One command to install every ORBWEVA Claude Code skill a founder needs.

```
npx @orbweva/academy@latest
```

Works on **macOS, Windows, and Linux.** Node 18+, zero runtime dependencies.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![ORBWEVA Academy](https://img.shields.io/badge/ORBWEVA-Academy-1f6feb.svg)](https://orbweva.com/en/accelerator/skills)

[Why this exists](#why-this-exists) · [Quick start](#quick-start) · [Tracks](#tracks) · [Specialization packs](#specialization-packs) · [Related docs](#related-docs)

</div>

---

## Why this exists

The first thing every ORBWEVA student used to do was type twenty-two slash commands in a row. `/plugin marketplace add …` then `/plugin install …`, eleven times. Get the order wrong, see `Unknown skill: discovery — Create a new one?` — hit Enter by reflex — now you have a fake skill and no error message. On Windows, half the installs fail silently until you discover you needed two PowerShell windows, one Admin for `winget` and one non-Admin for `scoop`, and that `EBADENGINE` warnings are fine but "recognize 'gh'" means your PATH is stale.

It was a rite of passage nobody asked for. So we built this.

**What it does** — replaces the 22 `/plugin …` commands with one `npx` invocation. Shallow-clones the 11 public ORBWEVA skill repos, copies the `skills/<name>/` directories into `~/.claude/skills/`, then prints the platform-specific CLI tool and MCP server commands you still need to run. Zero runtime dependencies. Node 18+ and `git` are the only prereqs.

## Who this is for

- **ORBWEVA Accelerator students** — the 12-week cohort program
- **Founder-track partners** — e.g. agencies reselling a lean founder base to their clients
- **Mentoring clients** — existing businesses getting 1:1 operator support
- **Self-paced learners** — the Course track
- **Specialists** — anyone layering a vertical on top of a track (Loka ecosystem, marketing agency, web+video studio)

If you're none of those but still want the skills, run `--track full`.

## Quick start

```bash
# Pick a track from the menu, answer a few prompts
npx @orbweva/academy@latest

# Go straight to a track, prompt per optional skill
npx @orbweva/academy@latest --track accelerator

# Fully non-interactive (all defaults, all optional skills, global)
npx @orbweva/academy@latest --track accelerator --yes --global

# Stack a specialization on top of a track
npx @orbweva/academy@latest --track accelerator --pack loka
npx @orbweva/academy@latest --track accelerator --pack marketing --pack web-video

# Partner-delivered lean founder base (no Accelerator overhead)
npx @orbweva/academy@latest --track founder
```

## Tracks

Pick one base program. See [docs/TRACKS.md](docs/TRACKS.md) for full details per track.

| Track | For | Skills |
|---|---|---|
| `accelerator` | 12-week cohort — zero-to-one founders | 15 |
| `course` | Self-paced founder fundamentals | 9 |
| `mentoring` | 1:1 operator support for existing businesses | 13 |
| `founder` | Lean base for partner-delivered programs (agencies, resellers) | 10 |
| `full` | Everything — no tradeoffs | 15 |

## Specialization packs

Stackable on top of any track. See [docs/PACKS.md](docs/PACKS.md).

| Pack | For | Status |
|---|---|---|
| `loka` | Businesses on the Loka living-textbook + LoLA avatar platform | Planned |
| `marketing` | One-person (or small team) marketing agencies | Planned |
| `web-video` | Web design + video editing studios | Planned |

> Pack repos are staged in `manifest.json` but not yet published. The installer skips planned packs gracefully until their repos go live.

## What gets installed

The installer composes a skill set from the track + any packs you add, then clones the relevant public ORBWEVA repos into your Claude Code skills folder.

**For the full phase-by-phase catalog of every skill and command** — see the [ORBWEVA Accelerator Skills Reference](https://orbweva.com/en/accelerator/skills) (or [ACCELERATOR_SKILLS_REFERENCE.md](https://github.com/ORBWEVA/accelerator-template/blob/main/docs/ACCELERATOR_SKILLS_REFERENCE.md)). That's the authoritative source; we don't duplicate it here.

## Verify install

After the installer finishes, open Claude Code and run:

```
/discovery:help
```

You should see the customer-discovery command menu. If Claude says `Unknown skill`, see [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md).

## Staying updated

Re-run the one-liner:

```bash
npx @orbweva/academy@latest
```

It re-clones each repo and overwrites existing skill folders. For air-gapped or npm-less environments, see [docs/manual-update.md](docs/manual-update.md).

## All flags

| Flag | Meaning |
|---|---|
| `-t, --track <name>` | Pick track: `accelerator`, `course`, `mentoring`, `founder`, `full` |
| `-p, --pack <name>` | Add a specialization pack (repeatable) |
| `-g, --global` | Install to `~/.claude/skills/` |
| `-l, --local` | Install to `./.claude/skills/` |
| `-y, --yes` | Accept all defaults AND auto-run every CLI/MCP command — no prompts |
| `--skills-only` | Install skills only; skip CLI + MCP setup entirely |
| `--no-run` | Print CLI + MCP commands (don't execute them). Skills still install. |
| `--dry-run` | Show what would happen, touch nothing |
| `-h, --help` | Show help |

After skills install, the CLI prompts Y/n per CLI tool (brew/winget/scoop/npm/`gh auth login`) and per `claude mcp add` command, then runs the ones you approve. Use `--yes` to run them all silently; `--no-run` to see the commands without executing.

## Related docs

**In this repo:**
- [docs/USER-GUIDE.md](docs/USER-GUIDE.md) — long-form walkthrough with every flag combo
- [docs/TRACKS.md](docs/TRACKS.md) — per-track deep dive
- [docs/PACKS.md](docs/PACKS.md) — specialization pack architecture + how to add one
- [docs/CLI-TOOLS.md](docs/CLI-TOOLS.md) — full per-OS CLI install reference (with Windows gotchas)
- [docs/MCP-SERVERS.md](docs/MCP-SERVERS.md) — MCP server setup per track
- [docs/manual-update.md](docs/manual-update.md) — fallback install for no-npm environments
- [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) — installer-specific issues

**In the ORBWEVA ecosystem:**
- [ORBWEVA Accelerator Skills Reference](https://orbweva.com/en/accelerator/skills) — canonical skill + command catalog, phase-by-phase
- [Accelerator Curriculum Template](https://github.com/ORBWEVA/accelerator-template) — 12-week program guide
- [Program Troubleshooting Guide](https://github.com/ORBWEVA/accelerator-template/blob/main/docs/TROUBLESHOOTING.md) — for non-installer issues (skills failing mid-session, API keys, etc.)
- [Graduation Criteria](https://github.com/ORBWEVA/accelerator-template/blob/main/docs/GRADUATION_CRITERIA.md) — what "completing" the Accelerator means

## Contributing

To add a track, pack, or skill repo, see [CONTRIBUTING.md](CONTRIBUTING.md). Most changes are one-line edits to `manifest.json`.

## License

Dual-licensed to match the ORBWEVA ecosystem:

- **Source code** (`bin/`, `src/`, `manifest.json`) — [MIT](LICENSE)
- **Documentation and prose** (README files, `docs/`, `CHANGELOG`, etc.) — [CC BY-NC-SA 4.0](LICENSE-DOCS)

Installed skills live in separate ORBWEVA repos, each under their own license (typically CC BY-NC-SA 4.0). This installer does not relicense them.

© 2026 ORBWEVA. Commercial licensing inquiries: legal@orbweva.com.
