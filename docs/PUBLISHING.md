# Publishing `@orbweva/academy` to npm

Maintainer reference. Follow this any time you need to generate a new npm token or publish a new version.

## Why tokens (not OTP)

Our npm account uses a **security key / passkey** for 2FA. Security keys can't be used from the CLI, so `npm publish --otp=<code>` won't work. Instead we use a **granular access token with "Bypass 2FA"** enabled.

---

## Generate a new publish token

Do this when your current token expires (you'll get a `401 Unauthorized` on `npm publish`) or whenever you want to rotate.

### 1. Revoke the old token first (optional but tidy)

https://www.npmjs.com/settings/orbweva/tokens → find the old `academy-publish` → **Revoke**

### 2. Generate a new token

https://www.npmjs.com/settings/orbweva/tokens → **Generate New Token** → **Granular Access Token**

Fill in exactly:

| Field | Value |
|---|---|
| **Token name** | `academy-publish` (or `academy-publish-YYYYMM` to track age) |
| **Description** | `CLI publish for @orbweva/academy` (optional) |
| **Bypass two-factor authentication (2FA)** | ✅ **checked** — required for our security-key 2FA setup |
| **Allowed IP ranges** | leave empty |
| **Permissions** | **Read and write** |
| **Select packages** | ✅ **All packages** (covers `@orbweva/*` current + future) |
| **Organizations → Permissions** | **No access** (we publish under user scope, not org) |
| **Expiration** | **90 days** (the max for write tokens) |

Click **Generate Token**. Copy the `npm_…` value — **you only see it once.**

### 3. Install the token locally

In your terminal:

```bash
# If you already have a line for registry.npmjs.org in ~/.npmrc,
# edit it instead of appending a duplicate.
echo "//registry.npmjs.org/:_authToken=npm_PASTE_YOUR_NEW_TOKEN" >> ~/.npmrc
chmod 600 ~/.npmrc
```

Verify:

```bash
npm whoami
# should print: orbweva
```

Done. No terminal restart needed — npm reads `~/.npmrc` fresh on every command.

---

## Publishing a new version

Flow from clean checkout:

```bash
cd /Users/ryno/orbweva-academy/academy

# 1. Edit code / docs / manifest
# 2. Update CHANGELOG.md under [Unreleased]

# 3. Bump version (rewrites package.json, commits, tags)
npm version patch   # 0.2.0 → 0.2.1 (bug fixes)
# or:
npm version minor   # 0.2.0 → 0.3.0 (new features, backwards-compat)
# or:
npm version major   # 0.2.0 → 1.0.0 (breaking changes)

# 4. Push code + tag
git push origin main --follow-tags

# 5. Publish
npm publish --access public
```

Expected output ends with:

```
+ @orbweva/academy@0.2.1
```

### Sanity check after publish

```bash
cd /tmp && rm -rf verify && mkdir verify && cd verify
npx --yes @orbweva/academy@latest --help
```

Should show the help output from the new version.

---

## Troubleshooting

### `401 Unauthorized` on `npm publish`

Token expired (or got revoked). Generate a new one (see top of this doc).

### `403 Forbidden — Two-factor authentication required`

The token doesn't have **Bypass 2FA** enabled. Revoke it and generate a new one with that box checked.

### `403 Forbidden — You cannot publish over the previously published versions`

You tried to re-publish the same version number. Bump the version first with `npm version patch` (or `minor` / `major`).

### `npm WARN publish npm auto-corrected some errors`

Harmless — npm is just normalizing the `repository.url` format. No action needed.

### I pasted my token into a chat / Slack / email

Revoke immediately at https://www.npmjs.com/settings/orbweva/tokens and generate a new one. Never share a live token.

---

## What lives where

| Thing | Location |
|---|---|
| Token (current) | `~/.npmrc` (owner-readable only) |
| Token management | https://www.npmjs.com/settings/orbweva/tokens |
| Package page | https://www.npmjs.com/package/@orbweva/academy |
| Source repo | https://github.com/ORBWEVA/academy |

---

## Why not Trusted Publishing?

npm's [Trusted Publishers](https://docs.npmjs.com/trusted-publishers) lets you publish from GitHub Actions with no tokens at all. Worth setting up when we move to CI-based releases. Skipped for now because manual publishes are infrequent enough that token management isn't painful.
