# Manual Install / Update

If you can't run `npx @orbweva/academy` — air-gapped machine, npm blocked by corporate proxy, offline laptop — you can install the skills by hand. It's just `git clone` + copy.

## Prerequisites

- `git`
- A shell (bash, zsh, or PowerShell)

## One-time setup

```bash
mkdir -p ~/.claude/skills
```

On Windows: `~/.claude/skills` resolves to `%USERPROFILE%\.claude\skills\`.

## Install all 11 public ORBWEVA skill repos

Paste this whole block into your shell:

```bash
cd /tmp
for repo in secure-setup orbweva-method resume-skill founder-discovery dt-skill founder-metrics founder-pitch founder-ops gtm-skills solo-skills solo-agents; do
  git clone --depth 1 "https://github.com/ORBWEVA/$repo.git" "/tmp/orbweva-$repo"
  # Each repo may contain one or more skills under skills/
  for skill_dir in /tmp/orbweva-$repo/skills/*/; do
    skill_name=$(basename "$skill_dir")
    rm -rf ~/.claude/skills/$skill_name
    cp -r "$skill_dir" ~/.claude/skills/$skill_name
    echo "installed: $skill_name"
  done
  rm -rf "/tmp/orbweva-$repo"
done
```

PowerShell equivalent:

```powershell
cd $env:TEMP
$repos = @('secure-setup','orbweva-method','resume-skill','founder-discovery','dt-skill','founder-metrics','founder-pitch','founder-ops','gtm-skills','solo-skills','solo-agents')
foreach ($repo in $repos) {
  git clone --depth 1 "https://github.com/ORBWEVA/$repo.git" "$env:TEMP\orbweva-$repo"
  Get-ChildItem "$env:TEMP\orbweva-$repo\skills" -Directory | ForEach-Object {
    $dst = "$env:USERPROFILE\.claude\skills\$($_.Name)"
    if (Test-Path $dst) { Remove-Item $dst -Recurse -Force }
    Copy-Item $_.FullName $dst -Recurse
    Write-Host "installed: $($_.Name)"
  }
  Remove-Item "$env:TEMP\orbweva-$repo" -Recurse -Force
}
```

## Update

The manual install command is idempotent — re-run it. It overwrites each skill directory with the latest clone.

## Uninstall a specific skill

```bash
rm -rf ~/.claude/skills/<skill-name>
```

## Install only specific repos

Trim the `repos` array to what you want. For the Accelerator track specifically:

```bash
# Accelerator required + optional (skip founder-ops if you don't need hiring/legal/retention)
secure-setup orbweva-method resume-skill founder-discovery dt-skill \
  founder-metrics gtm-skills founder-pitch founder-ops solo-skills solo-agents
```

For per-track skill lists, see [TRACKS.md](TRACKS.md).

## Verify

```bash
ls ~/.claude/skills/
```

In Claude Code:

```
/discovery:help
```

Should show the customer-discovery command menu.
