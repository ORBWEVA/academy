# User Guide

Long-form walkthrough of the `@orbweva/academy` installer.

## Prerequisites

Before running `npx @orbweva/academy`, you need:

| Requirement | Verify with | If missing |
|---|---|---|
| **Node.js 18+** | `node --version` | Install LTS from [nodejs.org](https://nodejs.org/), or via `fnm`/`nvm` |
| **git** | `git --version` | macOS: `xcode-select --install`; Windows: [git-scm.com](https://git-scm.com/download/win); Linux: `apt install git` |
| **Claude Code** | `claude --version` | `npm install -g @anthropic-ai/claude-code` |

That's it. The installer itself has **zero runtime dependencies** — everything else it needs, it shells out to.

## The interactive flow

Running `npx @orbweva/academy` (no flags) walks you through a short menu.

### 1. Track selection

```
Which Academy track?:
  1) Accelerator — 12-week cohort program — zero-to-one founders
  2) Course — Self-paced founder fundamentals
  3) Mentoring — 1:1 operator support for existing businesses
  4) Founder — Lean founder base — for partner-delivered programs
  5) Full Academy — All 11 ORBWEVA skill repos — no tradeoffs
  Choice [1-5, default 1]: _
```

Press `Enter` for Accelerator, or type a number. One track per install.

### 2. Specialization packs (stackable)

```
Add specialization packs? (optional, stackable)
  Loka / LoLA — Build a business on the Loka living-textbook + LoLA avatar platform? [y/N]
  Marketing Agency — Run a one-person (or small team) marketing agency? [y/N]
  Web + Video Studio — Web design + video editing studio? [y/N]
```

Each prompt defaults to **N**. Answer `y` for the ones you want.

### 3. Install scope

```
Install scope:
  1) Global — ~/.claude/skills/ (recommended, all projects)
  2) Local  — ./.claude/skills/ (current project only)
  Choice [1-2, default 1]: _
```

**Global** is right for almost everyone. Use **Local** only if you want a specific project's Claude Code session to see different skills than your other projects.

### 4. Required vs optional skills

For every track, some skills are **required** (auto-installed) and some are **optional** (you're prompted).

Required = always installed for that track. Optional = `Install <skill name> [Y/n]` per skill.

### 5. Confirmation

```
Ready to install: 15 skills from 11 repos → ~/.claude/skills/
Proceed? [Y/n] _
```

Press `Enter`.

### 6. Clone + copy

```
[1/11] ORBWEVA/secure-setup ... ✓ 1 skill
[2/11] ORBWEVA/orbweva-method ... ✓ 1 skill
...
[11/11] ORBWEVA/solo-agents ... ✓ 1 skill

✓ Installed to /Users/you/.claude/skills
```

### 7. Post-install guidance

The installer prints platform-specific commands for CLI tools and MCP servers. **You copy and run these manually** — the installer does not execute them for you. See [CLI-TOOLS.md](CLI-TOOLS.md) and [MCP-SERVERS.md](MCP-SERVERS.md).

## Non-interactive mode

Chain `--track`, `--pack`, `--yes`, `--global` to skip every prompt:

```bash
npx @orbweva/academy@latest --track accelerator --yes --global
```

Full examples:

```bash
# Accelerator, everything, global
npx @orbweva/academy@latest --track accelerator --yes --global

# Accelerator + Loka, everything, global
npx @orbweva/academy@latest --track accelerator --pack loka --yes --global

# Stack multiple packs
npx @orbweva/academy@latest --track accelerator --pack marketing --pack web-video --yes --global

# Partner-delivered, project-local
npx @orbweva/academy@latest --track founder --yes --local

# See what would happen without touching disk
npx @orbweva/academy@latest --track full --dry-run --yes --global

# Skip the post-install guidance prints (for CI / scripts)
npx @orbweva/academy@latest --track accelerator --yes --global --skills-only
```

## All flags

| Flag | Meaning |
|---|---|
| `-t, --track <name>` | Track: `accelerator`, `course`, `mentoring`, `founder`, `full` |
| `-p, --pack <name>` | Pack: `loka`, `marketing`, `web-video` (repeatable) |
| `-g, --global` | Install to `~/.claude/skills/` (all Claude Code projects) |
| `-l, --local` | Install to `./.claude/skills/` (this project only) |
| `-y, --yes` | Non-interactive: accept all defaults and install every optional skill |
| `--skills-only` | Skip post-install CLI / MCP guidance prints |
| `--dry-run` | Show the plan, touch nothing on disk |
| `-h, --help` | Show help + list of available tracks and packs |

## Verify your install

```bash
ls ~/.claude/skills/
```

You should see directories: `secure-setup/`, `core/`, `discovery/`, `design-thinking/`, `pitch/`, etc.

In Claude Code:

```
/discovery:help
```

If this prints the customer-discovery command menu, you're done.

If Claude says `Unknown skill` — see [TROUBLESHOOTING.md](TROUBLESHOOTING.md).

## Update cycle

Skills change. To refresh:

```bash
npx @orbweva/academy@latest
```

Same command. It re-clones each repo and overwrites existing `~/.claude/skills/<name>/` folders. Your per-project skills (in `./.claude/skills/`) are untouched unless you re-run with `--local`.

## What the installer does NOT do

- **Does not install Node, Git, or Claude Code.** You need those first.
- **Does not run the CLI-tool `brew`/`winget`/`scoop` commands.** It prints them; you copy them.
- **Does not run `claude mcp add` for you.** Same deal — prints, doesn't execute.
- **Does not edit `~/.claude.json`** (the Claude Code config). Skills are read from `~/.claude/skills/` at the filesystem level — no config changes needed.
- **Does not send any telemetry.**

## Uninstall

The installer doesn't provide an uninstall command. Skills are just directories — delete the ones you don't want:

```bash
rm -rf ~/.claude/skills/discovery
```

To remove everything the installer added:

```bash
rm -rf ~/.claude/skills/{secure-setup,core,resume,discovery,design-thinking,startup-metrics,pitch,hiring,legal-essentials,retention,geo,gtm-launch,seo-toolkit,solo,agents}
```
