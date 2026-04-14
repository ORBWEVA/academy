import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { banner } from './banner.js';
import { confirm, select } from './prompts.js';
import { detectOS } from './os.js';
import { installSkills } from './install.js';
import { printCliGuidance } from './cli-tools.js';
import { printMcpGuidance } from './mcp.js';
import { c } from './color.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(readFileSync(join(__dirname, '..', 'manifest.json'), 'utf8'));

function parseArgs(argv) {
  const flags = { global: false, local: false, yes: false, skillsOnly: false, dryRun: false, track: null, packs: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--global' || a === '-g') flags.global = true;
    else if (a === '--local' || a === '-l') flags.local = true;
    else if (a === '--yes' || a === '-y') flags.yes = true;
    else if (a === '--skills-only') flags.skillsOnly = true;
    else if (a === '--dry-run') flags.dryRun = true;
    else if (a === '--help' || a === '-h') { printHelp(); process.exit(0); }
    else if (a === '--track' || a === '-t') flags.track = argv[++i];
    else if (a.startsWith('--track=')) flags.track = a.slice(8);
    else if (a === '--pack' || a === '-p') flags.packs.push(argv[++i]);
    else if (a.startsWith('--pack=')) flags.packs.push(a.slice(7));
  }
  return flags;
}

function printHelp() {
  const tracks = Object.entries(manifest.tracks)
    .map(([k, t]) => `    ${k.padEnd(14)} ${c.dim(t.tagline)}`).join('\n');
  const packs = Object.entries(manifest.packs)
    .map(([k, p]) => `    ${k.padEnd(14)} ${c.dim(p.tagline)}`).join('\n');

  console.log(`
${c.bold('orbweva-academy')} — install ORBWEVA skills into Claude Code

Usage:
  npx @orbweva/academy [options]

Tracks  ${c.dim('(pick one base program)')}:
${tracks}

Specialization packs  ${c.dim('(stackable, pick zero or more)')}:
${packs}

Options:
  -t, --track <name>   Pick a track (skip the menu)
  -p, --pack <name>    Add a specialization pack (repeatable)
  -g, --global         Install to ~/.claude/skills (all projects)
  -l, --local          Install to ./.claude/skills (current project only)
  -y, --yes            Accept defaults — install all required skills, no prompts
      --skills-only    Skip MCP and CLI-tool guidance
      --dry-run        Show what would be installed, don't touch disk
  -h, --help           Show this help

Examples:
  npx @orbweva/academy --track accelerator --pack loka
  npx @orbweva/academy --track founder
  npx @orbweva/academy --track accelerator --pack marketing --pack web-video --yes
`);
}

function resolveTrack(key) {
  const t = manifest.tracks[key];
  if (!t) throw new Error(`Unknown track "${key}". Options: ${Object.keys(manifest.tracks).join(', ')}`);
  return t;
}

function resolvePack(key) {
  const p = manifest.packs[key];
  if (!p) throw new Error(`Unknown pack "${key}". Options: ${Object.keys(manifest.packs).join(', ')}`);
  return p;
}

function repoEntry(repoKey) {
  const r = manifest.skillRepos[repoKey];
  if (!r) throw new Error(`Unknown skill repo key "${repoKey}" referenced in manifest`);
  return { key: repoKey, ...r };
}

// Merge repos across track + packs, deduping by repoKey.
// Returns { required: [...repos], optional: [{repo, source}], planned: [repos with status:planned] }
function planInstall(track, packs) {
  const requiredKeys = new Set(track.required);
  for (const pack of packs) for (const k of pack.required) requiredKeys.add(k);

  const optionalEntries = new Map(); // key → { sources: Set<label> }
  for (const k of track.optional) {
    if (!optionalEntries.has(k)) optionalEntries.set(k, new Set());
    optionalEntries.get(k).add(track.label);
  }
  for (const pack of packs) {
    for (const k of pack.optional) {
      if (requiredKeys.has(k)) continue;
      if (!optionalEntries.has(k)) optionalEntries.set(k, new Set());
      optionalEntries.get(k).add(pack.label);
    }
  }

  const required = [...requiredKeys].map(repoEntry);
  const optional = [...optionalEntries.entries()].map(([k, sources]) => ({
    ...repoEntry(k),
    sources: [...sources],
  }));
  const planned = [...required, ...optional].filter(r => r.status === 'planned');

  return { required, optional, planned };
}

export async function run(argv) {
  const flags = parseArgs(argv);
  const os = detectOS();

  console.log(banner());
  console.log(c.dim(`Detected platform: ${os.name} (${os.arch})\n`));

  // Track
  let trackKey = flags.track;
  if (!trackKey) {
    if (flags.yes) trackKey = 'accelerator';
    else trackKey = await select('Which Academy track?', Object.entries(manifest.tracks).map(([k, t]) => ({
      value: k, label: `${c.bold(t.label)} — ${c.dim(t.tagline)}`,
    })));
  }
  const track = resolveTrack(trackKey);
  console.log(`\n${c.green('→')} Track: ${c.bold(track.label)}`);

  // Packs
  let packKeys = [...flags.packs];
  if (packKeys.length === 0 && !flags.yes && Object.keys(manifest.packs).length > 0) {
    console.log(`\n${c.bold('Add specialization packs?')} ${c.dim('(optional, stackable)')}`);
    for (const [k, p] of Object.entries(manifest.packs)) {
      const add = await confirm(`  ${c.cyan(p.label)} ${c.dim(`— ${p.tagline}`)}?`, false);
      if (add) packKeys.push(k);
    }
  }
  const packs = packKeys.map(resolvePack);
  if (packs.length > 0) console.log(`${c.green('→')} Packs: ${packs.map(p => c.bold(p.label)).join(', ')}`);

  // Scope
  let scope;
  if (flags.global) scope = 'global';
  else if (flags.local) scope = 'local';
  else if (flags.yes) scope = 'global';
  else scope = await select('Install scope', [
    { value: 'global', label: `Global — ${c.dim('~/.claude/skills/ (recommended, all projects)')}` },
    { value: 'local',  label: `Local  — ${c.dim('./.claude/skills/ (current project only)')}` },
  ]);

  // Plan
  const plan = planInstall(track, packs);

  // Warn about planned (not-yet-created) repos
  if (plan.planned.length > 0) {
    console.log(`\n${c.yellow('⚠')}  Some pack repos are planned but not yet published:`);
    for (const r of plan.planned) console.log(`   ${c.dim('•')} ${r.repo} (${r.skills.join(', ')})`);
    console.log(c.dim('   These will be skipped during install. They\'ll work once the repos are public.\n'));
  }

  // Approve optional
  let approvedOptional = [];
  if (!flags.yes && plan.optional.length > 0) {
    console.log(`\n${c.bold('Required skills')} (always installed):`);
    for (const r of plan.required) console.log(`  ${c.green('•')} ${r.skills.join(', ')} ${c.dim(`(${r.repo})`)}`);

    console.log(`\n${c.bold('Optional')}:`);
    for (const r of plan.optional) {
      const src = c.dim(`[${r.sources.join(', ')}]`);
      const include = await confirm(`  Install ${c.cyan(r.skills.join(', '))} ${src}?`, true);
      if (include) approvedOptional.push(r);
    }
  } else {
    approvedOptional = plan.optional;
  }

  const selectedRepos = [...plan.required, ...approvedOptional].filter(r => r.status !== 'planned');

  // Confirm
  const totalSkills = selectedRepos.reduce((n, r) => n + r.skills.length, 0);
  console.log(`\n${c.bold('Ready to install:')} ${totalSkills} skills from ${selectedRepos.length} repos → ${scope === 'global' ? '~/.claude/skills/' : './.claude/skills/'}`);

  if (!flags.yes && !flags.dryRun) {
    const go = await confirm('Proceed?', true);
    if (!go) { console.log('Aborted.'); return; }
  }

  await installSkills(selectedRepos, scope, { dryRun: flags.dryRun });

  if (flags.skillsOnly) {
    console.log(`\n${c.green('✓')} Skills installed. Open Claude Code to use them.`);
    return;
  }

  printCliGuidance(os);
  printMcpGuidance(manifest.mcpServers);

  console.log(`\n${c.green('✓')} Setup complete. Open Claude Code and try ${c.cyan('/discovery:help')} to verify.\n`);
}
