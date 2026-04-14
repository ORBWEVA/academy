# Security Policy

## Reporting a vulnerability

Email **security@orbweva.com** with subject `[academy] <short summary>`. Please **do not** open a public GitHub issue.

We aim to acknowledge within 72 hours.

## What this installer does (threat model)

`@orbweva/academy` performs a narrow set of operations on your machine:

1. **Shells out to `git`** to shallow-clone public GitHub repos under `https://github.com/ORBWEVA/*` into a temp directory.
2. **Reads files from the cloned temp dirs** and copies `skills/<name>/` folders into either `~/.claude/skills/` (global) or `./.claude/skills/` (project-local).
3. **Prints suggested shell commands** for CLI tool installs (`brew`, `winget`, `scoop`, `npm -g`) and MCP server setup (`claude mcp add …`). **These are not executed automatically** — you must copy/paste them.
4. **Removes the temp directory** after copying.

It does not: write to `~/.claude.json`, edit shell dotfiles, run arbitrary commands from any repo, reach any server besides GitHub, or transmit telemetry.

## Trust boundaries

- **Source of skills** — only repos listed in `manifest.json` under the `ORBWEVA/*` namespace. A malicious PR attempting to add a third-party repo must pass review.
- **Runtime dependencies** — none (beyond Node 18+ and system `git`). Zero `node_modules`.
- **`npx` trust** — running `npx @orbweva/academy` executes arbitrary npm-published code. Audit the published version by running `npm view @orbweva/academy` before installing, or `git clone` this repo and run `node bin/install.js` directly.

## Disclosure timeline

We follow coordinated disclosure:

1. Reporter emails security@orbweva.com.
2. We triage within 72 hours.
3. Fix developed privately; release candidate shared with reporter.
4. Patch released + CVE filed if applicable.
5. Public advisory 7–30 days after patch release, depending on severity.
