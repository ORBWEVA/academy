# Specialization Packs

Packs are **stackable add-ons** to tracks. They layer vertical-specific skills on top of any base track so a student building a marketing agency gets the same founder foundation as a student building a web-video studio — plus their specialization.

## How packs compose

```
final skill set = track.required
                ∪ track.optional (the ones you approve)
                ∪ pack1.required
                ∪ pack1.optional (approved)
                ∪ pack2 ...
```

Shared repos are **deduped automatically**. If both the track and a pack reference `gtm-skills`, it's installed once.

You can stack any number of packs:

```bash
npx @orbweva/academy@latest --track accelerator --pack marketing --pack web-video
```

## Available packs

> **Status note**: The three packs below are defined in `manifest.json` with `status: "planned"`. Their GitHub repos haven't been published yet, so the installer warns and skips them gracefully. They'll work automatically once the repos go live.

### `loka`

**For:** Founders building a business on the Loka living-textbook + LoLA avatar platform. Example user: Kyubin Park (Kora Lingo).

**Required repo:** `ORBWEVA/loka-pack` → skill `loka-integration`

Content covers Loka API integration, LoLA avatar configuration, living-textbook content management, Hooks/webhook patterns, persistent learner profiles.

```bash
npx @orbweva/academy@latest --track accelerator --pack loka
```

---

### `marketing`

**For:** Solo operators or small-team marketing agencies. Content marketing, SEO, brand work, client delivery.

**Required repo:** `ORBWEVA/marketing-pack` → skill `marketing-agency`
**Optional (inherited):** `solo`, `agents`

```bash
npx @orbweva/academy@latest --track accelerator --pack marketing
```

---

### `web-video`

**For:** Design studios delivering web design + video editing as a service.

**Required repo:** `ORBWEVA/web-video-pack` → skills `web-design`, `video-editing`
**Optional (inherited):** `solo`

```bash
npx @orbweva/academy@latest --track accelerator --pack web-video
```

---

## Adding a new pack

The pack system is designed so new verticals can be added without touching code. Everything lives in `manifest.json`.

### Step 1 — Add the skill repo

If the pack has its own repo:

```json
{
  "skillRepos": {
    ...
    "my-pack": {
      "repo": "ORBWEVA/my-pack",
      "skills": ["my-skill-name"]
    }
  }
}
```

If the repo doesn't exist yet, add `"status": "planned"` so the installer skips it gracefully:

```json
"my-pack": {
  "repo": "ORBWEVA/my-pack",
  "skills": ["my-skill-name"],
  "status": "planned"
}
```

### Step 2 — Define the pack

```json
{
  "packs": {
    ...
    "my-pack-key": {
      "label": "My Pack",
      "tagline": "One-line description for the menu",
      "required": ["my-pack"],
      "optional": ["solo-skills"]
    }
  }
}
```

`required` and `optional` reference **repo keys** (from `skillRepos`), not skill names.

### Step 3 — Verify

```bash
node bin/install.js --help
```

Your new pack should appear in the help listing.

```bash
node bin/install.js --track accelerator --pack my-pack-key --dry-run --yes --global
```

### Step 4 — Update the CHANGELOG

Add an entry under `[Unreleased]`.

## When to use a pack vs. a new track

- **New track** — the audience uses a *different base program*. Founder base for Leanne's clients is a track because the engagement model is different from the Accelerator.
- **New pack** — the audience uses the *same base program* but needs vertical-specific skills on top. A marketing founder running through the Accelerator needs the Accelerator skills *and* marketing-specific ones.

In most cases: **pack**. Tracks change rarely.
