# @orbweva/academy

One-command installer for **ORBWEVA Academy** — the umbrella for all ORBWEVA learning tracks. Installs Claude Code skills from the [public ORBWEVA plugin repos](https://github.com/orgs/ORBWEVA/repositories), then prints CLI-tool and MCP-server guidance tailored to your OS.

Replaces 22 `/plugin marketplace add` + `/plugin install` commands with one line.

## Usage

```bash
npx @orbweva/academy@latest
```

Pick your track from the menu, or skip it:

```bash
npx @orbweva/academy@latest --bundle accelerator
npx @orbweva/academy@latest --bundle course --yes --global
```

## Tracks

| Bundle | Who it's for | Skills |
|---|---|---|
| `accelerator` | 12-week cohort program — zero-to-one founders | 15 |
| `course` | Self-paced founder fundamentals | 9 |
| `mentoring` | 1:1 operator support for existing businesses | 13 |
| `full` | Everything — no tradeoffs | 15 |

Each track selects a different mix of the 11 public ORBWEVA skill repos. New tracks are added by editing `manifest.json` — no code changes.

## What it does

1. Asks which track (or use `--bundle <name>`)
2. Asks install scope — global (`~/.claude/skills/`) or project-local (`./.claude/skills/`)
3. Asks per optional skill
4. Shallow-clones each repo, copies `skills/<name>/` into your Claude Code skills folder
5. Prints platform-specific CLI tool install commands (macOS / Windows / Linux)
6. Prints `claude mcp add` commands for recommended MCP servers

## Flags

| Flag | Meaning |
|---|---|
| `-b, --bundle <name>` | Pick track: `accelerator`, `course`, `mentoring`, `full` |
| `-g, --global` | Install to `~/.claude/skills/` |
| `-l, --local` | Install to `./.claude/skills/` |
| `-y, --yes` | Accept all defaults, install everything in the track, no prompts |
| `--skills-only` | Skip CLI/MCP post-install guidance |
| `--dry-run` | Show what would be installed, touch nothing |
| `-h, --help` | Show help |

## Update

Re-run `npx @orbweva/academy@latest`. It re-clones each repo and overwrites existing skill folders.

## Adding a new track

Edit `manifest.json`:

```json
"bundles": {
  "masterclass": {
    "label": "Masterclass",
    "tagline": "Advanced techniques for experienced founders",
    "required": ["orbweva-method", "founder-pitch"],
    "optional": ["founder-ops"]
  }
}
```

`required` and `optional` reference keys from `skillRepos`. That's it — the CLI picks it up on next run.

## Local dev

```bash
git clone https://github.com/ORBWEVA/academy-cli.git
cd academy-cli
node bin/install.js --dry-run
```
