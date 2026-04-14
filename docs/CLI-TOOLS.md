# CLI Tools Reference

The `@orbweva/academy` installer prints platform-specific CLI install commands at the end of every run. This doc is the expanded version with every gotcha.

**The installer never executes these for you.** Copy and run them yourself.

---

## macOS

```bash
# Node version manager + GitHub CLI + Supabase CLI
brew install fnm gh supabase/tap/supabase

# Switch to LTS Node
fnm install --lts
fnm default lts-latest

# Package managers
npm install -g pnpm vercel

# Sign in to GitHub
gh auth login
```

That's the whole thing. Total time: ~5 min on a reasonable connection.

---

## Windows

Windows has three gotchas that will each cost you 30 minutes if you don't know them. Read these before running anything:

### Gotcha 1: You need TWO PowerShell windows at the same time

| Window | How to open | What it's for |
|---|---|---|
| **Admin PowerShell** | Start → type `powershell` → right-click **Windows PowerShell** → **Run as administrator** | `winget install` commands *only* |
| **Regular PowerShell** | Start → type `powershell` → left-click | `scoop`, `npm install -g`, `gh auth login`, `claude`, day-to-day work |

**Why:** `winget` needs admin. `scoop` *refuses* to install as admin (it'll print `Running the installer as administrator is disabled by default`).

Keep both open — you'll use admin for ~2 minutes, then close it.

### Gotcha 2: New CLIs don't work until PATH refreshes

After any `winget install` or `scoop install`, the current window has a stale PATH. If you run `gh --version` right after installing gh and see `gh : The term 'gh' is not recognized`, the install worked — PATH just hasn't refreshed.

**Fix (one-liner):**

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

(Or just close and reopen the window.)

You'll use this a few times. Keep it handy.

### Gotcha 3: `EBADENGINE` warnings on `npm install -g` are harmless

If you have Node v25 (or any odd-numbered / non-LTS version), `pnpm` and `vercel` will print:

```
npm WARN EBADENGINE Unsupported engine
```

They still install and work fine — pnpm/vercel haven't declared support for experimental Node versions. **Ignore the warning.** Step 2 below switches you to LTS Node anyway, which makes them disappear.

---

### Step 1 — In Admin PowerShell, install winget tools

```powershell
winget install Schniz.fnm
winget install GitHub.cli
```

Refresh PATH in the admin window:

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
fnm --version
gh --version
```

Both should print version numbers. **You can close Admin PowerShell now** — everything else runs in regular PowerShell.

### Step 2 — In regular PowerShell, install Node LTS

```powershell
fnm install --lts
fnm default lts-latest
node --version
npm --version
```

`node --version` should show **v22.x** (the current LTS).

> If you see a higher number like v25, that's a stray Node install from nodejs.org. It'll still work for the ORBWEVA curriculum, but every `npm install` will print `EBADENGINE` warnings. Clean up: Windows Settings → "Apps & features" → search "Node" → uninstall, then reopen PowerShell.

### Step 3 — Install Scoop (for Supabase CLI)

Scoop **must** be installed in regular (non-admin) PowerShell.

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Press **Y** and Enter if prompted.

```powershell
irm get.scoop.sh | iex
```

Wait ~20 seconds until you see `Scoop was installed successfully!`. Refresh PATH:

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
scoop --version
```

### Step 4 — Install the remaining CLIs

```powershell
# Supabase CLI (via scoop)
scoop install supabase

# pnpm — fast package manager, cross-platform via npm
npm install -g pnpm

# Vercel CLI — deploy and manage from terminal
npm install -g vercel
```

Verify:

```powershell
supabase --version
pnpm --version
vercel --version
```

### Step 5 — Log in to GitHub

```powershell
gh auth login
```

You'll be asked four questions. Answers in order:

1. **"Where do you use GitHub?"** → **GitHub.com** (Enter)
2. **"Preferred protocol for Git operations?"** → **HTTPS** (Enter)
   *Why HTTPS, not SSH: no key management, works through any firewall, `gh` handles credentials via Windows Credential Manager.*
3. **"Authenticate Git with your GitHub credentials?"** → **Y** (Enter)
   *This wires `git push` / `git pull` to reuse your gh token. Skip this and you'll be typing usernames and passwords forever.*
4. **"How would you like to authenticate GitHub CLI?"** → **Login with a web browser** (Enter)

PowerShell then prints something like:

```
! First copy your one-time code: ABCD-1234
Press Enter to open https://github.com/login/device in your browser...
```

> **⚠ The 8-character code is in your PowerShell window, NOT the browser.** First-timers always miss this. Copy it (or write it down), *then* press Enter. The browser opens a page with 8 boxes — paste the code, click **Continue**, sign in to GitHub if asked, click **Authorize GitHub CLI**. The browser says "Congratulations", and PowerShell shows `✓ Authentication complete.`

Verify:

```powershell
gh auth status
```

### Step 6 — Sanity check

```powershell
fnm --version
node --version
npm --version
pnpm --version
vercel --version
gh --version
supabase --version
```

All seven should return version numbers.

---

## Linux

```bash
# Node version manager
curl -fsSL https://fnm.vercel.app/install | bash
fnm install --lts
fnm default lts-latest

# GitHub CLI — varies by distro
sudo apt install gh   # Debian/Ubuntu
# or: brew install gh (if you use Homebrew on Linux)

# Package managers
npm install -g pnpm vercel

# Supabase CLI — see https://supabase.com/docs/guides/local-development/cli/getting-started

# Sign in to GitHub
gh auth login
```

---

## Phase 2 tools (install later, not now)

```bash
# Stripe CLI — for testing webhooks locally (Week 8 of the Accelerator)
# macOS
brew install stripe/stripe-cli/stripe
# Windows
scoop install stripe
# Linux — see https://docs.stripe.com/stripe-cli#install

# ngrok — expose localhost for webhook testing (Week 6)
# macOS
brew install ngrok
# Windows
winget install Ngrok.Ngrok

# Playwright — browser testing (Week 6). Runs in any project folder
npm install -D @playwright/test
```

For the full list of CLIs, MCPs, and IDE extensions at each phase, see the **[ORBWEVA Accelerator Skills Reference](https://orbweva.com/en/accelerator/skills)**.
