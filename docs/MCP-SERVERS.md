# MCP Servers

After the installer prints the CLI tools section, it prints a list of MCP (Model Context Protocol) servers to wire into Claude Code. This doc covers what each one does and how to configure it.

**The installer prints `claude mcp add ...` commands — it doesn't run them.** Copy and run them yourself, after setting any required environment variables.

## What MCP is

MCP lets Claude Code talk directly to external services (Supabase, GitHub, Playwright, your filesystem) without leaving the session. Instead of Claude telling you to "open a new terminal and run X", Claude just calls the tool.

Full docs: https://docs.claude.com/en/docs/claude-code/mcp

## Recommended servers

### `supabase`

Required for: `accelerator`, `mentoring`, `founder`, any track that builds web apps.

**What it does:** Query your Supabase databases, run migrations, deploy edge functions, read logs.

**Setup:**

```bash
# 1. Get your Supabase access token from https://supabase.com/dashboard/account/tokens
export SUPABASE_ACCESS_TOKEN=sbp_...

# 2. Add to Claude Code
claude mcp add supabase npx -y @supabase/mcp-server-supabase
```

On Windows PowerShell, use `$env:SUPABASE_ACCESS_TOKEN = "sbp_..."` instead of `export`.

### `context7`

Required for all tracks — heavily used by skills for fetching current library docs.

**What it does:** Fetches up-to-date documentation for libraries, frameworks, SDKs (React, Next.js, Prisma, etc.) so Claude doesn't rely on training-data-era knowledge.

**Setup:**

```bash
claude mcp add context7 npx -y @upstash/context7-mcp
```

No API key required.

### `playwright`

Optional. Required if you're doing web app testing (Week 6 of Accelerator).

**What it does:** Browser automation — take screenshots, run E2E tests, inspect rendered pages.

**Setup:**

```bash
claude mcp add playwright npx -y @playwright/mcp
```

No API key required.

### `memory`

Optional. Useful for long-running projects with persistent knowledge graphs.

**What it does:** Stores entities + relations across sessions. Used by some skills for retaining project context.

**Setup:**

```bash
claude mcp add memory npx -y @modelcontextprotocol/server-memory
```

No API key required.

## Per-track recommendations

| Track | Recommended MCPs |
|---|---|
| `accelerator` | supabase, context7, playwright, memory |
| `course` | context7 (others optional) |
| `mentoring` | supabase, context7, memory |
| `founder` | context7 (supabase if client builds on it) |
| `full` | all four |

## Adding more MCPs

MCP servers not listed here that are useful at various points:

- **GitHub MCP** — repo/PR/issue operations (`@modelcontextprotocol/server-github`)
- **Stripe MCP** — billing integration work (`@stripe/mcp`)
- **Figma MCP** — design-to-code workflows (`figma-developer-mcp`)
- **n8n MCP** — workflow automation integration

See the [ORBWEVA Accelerator Skills Reference](https://orbweva.com/en/accelerator/skills) for the full list of MCPs used in the curriculum.

## Verifying your MCP setup

In Claude Code:

```
/mcp
```

Lists all registered MCP servers and their connection status.

If a server shows as disconnected, check:

1. The command in `claude mcp list` matches the docs (no typos).
2. Required env vars are set in the shell where you started Claude Code.
3. The npm package exists — `npm view <package-name>` should succeed.

## Removing an MCP server

```bash
claude mcp remove <name>
```
