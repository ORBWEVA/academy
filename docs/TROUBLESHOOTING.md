# Installer Troubleshooting

Issues specific to `@orbweva/academy`. For non-installer issues (a skill works but behaves unexpectedly, an MCP server won't connect, API key problems), see the [ORBWEVA program-level troubleshooting guide](https://github.com/ORBWEVA/accelerator-template/blob/main/docs/TROUBLESHOOTING.md).

## `npx @orbweva/academy` — command not found

You probably don't have Node installed, or it's too old.

```bash
node --version
```

If this fails or shows v17 or lower, install Node LTS from [nodejs.org](https://nodejs.org/) or via `fnm`/`nvm`.

## `npx` hangs on first use

First-time `npx` has to download the package. On slow connections this can take 30–60 seconds before any output appears. If it's still silent after 2 minutes, try:

```bash
npm cache clean --force
npx @orbweva/academy@latest
```

## `clone failed` for one or more repos

Output shows:

```
[3/11] ORBWEVA/resume-skill ... clone failed
```

### Causes and fixes

**Network / firewall** — corporate proxies sometimes block `github.com`. Test:

```bash
git clone --depth 1 https://github.com/ORBWEVA/resume-skill.git /tmp/test-clone
```

If that also fails, the issue is your network, not the installer. Try via a VPN or personal hotspot.

**Rate-limited** — unauthenticated clone is subject to GitHub's IP-based limits. If you've cloned a lot in the last hour, wait 15 minutes or authenticate: `gh auth login` then re-run.

**Repo renamed / made private** — unlikely but possible. Open an issue at https://github.com/ORBWEVA/academy-cli/issues.

## "Permission denied" writing to `~/.claude/skills`

The install path has wrong ownership. Check:

```bash
ls -la ~/.claude/
```

If `~/.claude/` is owned by root (rare but happens when a tool was run with `sudo`), fix it:

```bash
sudo chown -R $(whoami) ~/.claude
```

Then re-run the installer.

## `Unknown skill: discovery` in Claude Code after install

The installer completed but Claude Code isn't seeing the skills.

1. **Restart Claude Code.** Skills are loaded at startup. Close and reopen.
2. **Confirm the install scope** — did you use `--local`? Local installs only show up when Claude Code is started *from that project directory*. Run `cd` to your project first, then `claude`.
3. **Check the folder** — `ls ~/.claude/skills/discovery/SKILL.md` should exist. If not, the install silently skipped that skill. Re-run:
   ```bash
   npx @orbweva/academy@latest --track accelerator --yes --global
   ```
4. **Claude Code version** — very old versions of Claude Code may not autoload `~/.claude/skills/`. Update: `npm install -g @anthropic-ai/claude-code`.

## `Unknown skill: X — Create a new one?` appears when you type `/discovery`

This is Claude Code's built-in behavior when a command doesn't resolve. If you see this:

- **Press `Esc`. Don't press Enter.** Pressing Enter creates a fake skill in `~/.claude/skills/X/` that masks future installs.
- Check if you actually have the skill installed: `ls ~/.claude/skills/`.
- If the skill directory exists but Claude still says Unknown, restart Claude Code.

## "Planned" pack warnings

Output shows:

```
⚠  Some pack repos are planned but not yet published:
   • ORBWEVA/loka-pack (loka-integration)
```

This is expected. Pack repos are listed in `manifest.json` ahead of being published so the CLI's architecture stays stable. The installer skips planned repos gracefully. Once the repo is public, re-run the installer.

## Installer crashes with a cryptic error

Set the debug env var and re-run:

```bash
ORBWEVA_DEBUG=1 npx @orbweva/academy@latest
```

This prints a full stack trace. Include it when opening an issue at https://github.com/ORBWEVA/academy-cli/issues.

## Still stuck?

- **Email:** support@orbweva.com
- **GitHub issues:** https://github.com/ORBWEVA/academy-cli/issues

For non-installer program-level issues: https://github.com/ORBWEVA/accelerator-template/blob/main/docs/TROUBLESHOOTING.md
