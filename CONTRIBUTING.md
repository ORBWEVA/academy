# Contributing to @orbweva/academy

This installer is deliberately small. Most changes are **one-line edits to `manifest.json`** — no code changes required.

## Adding a new track

A track is a base program (Accelerator, Course, Mentoring, etc.). To add one:

1. Open `manifest.json`.
2. Add an entry under `tracks`:
   ```json
   "your-track-key": {
     "label": "Your Track Name",
     "tagline": "One-line description shown in menus",
     "required": ["secure-setup", "orbweva-method", "..."],
     "optional": ["founder-pitch", "..."]
   }
   ```
3. `required` and `optional` reference keys from `skillRepos` (existing entries). Don't invent new repo keys unless you also add them to `skillRepos`.
4. Run `node bin/install.js --help` — your new track should appear in the help output.
5. Dry-run: `node bin/install.js --track your-track-key --dry-run --yes --global`.

## Adding a new specialization pack

Packs are stackable add-ons to tracks (e.g., `--pack marketing`). Same pattern:

1. Under `packs` in `manifest.json`:
   ```json
   "your-pack-key": {
     "label": "Your Pack Name",
     "tagline": "One-line description",
     "required": ["..."],
     "optional": ["..."]
   }
   ```
2. If the pack references a repo that doesn't exist yet, add it to `skillRepos` with `"status": "planned"` so the installer skips it gracefully until the repo is published.

## Adding a new skill repo

If a new skill lives in a brand-new ORBWEVA repo:

1. Make sure the repo is **public** and has this layout:
   ```
   skills/<skill-name>/SKILL.md
   ```
2. Add to `skillRepos` in `manifest.json`:
   ```json
   "your-repo-key": {
     "repo": "ORBWEVA/your-repo-name",
     "skills": ["skill-name-1", "skill-name-2"]
   }
   ```
3. Reference it from one or more `tracks` or `packs`.

## Testing locally

```bash
# Verify parsing + help renders
node bin/install.js --help

# Dry-run the flow
node bin/install.js --track accelerator --dry-run --yes --global

# Full install into a sandboxed HOME (won't touch your real ~/.claude/)
HOME=/tmp/academy-test node bin/install.js --yes --global --skills-only --track accelerator
ls /tmp/academy-test/.claude/skills/
```

## PR guidelines

- **One change per PR** where possible (new track + new pack should be two PRs).
- **Update `CHANGELOG.md`** under `[Unreleased]` with the change.
- **Commit style**: imperative mood, explain *why* not *what* in the body.

## Questions

Open an issue at https://github.com/ORBWEVA/academy-cli/issues or ping @orbweva on X.
