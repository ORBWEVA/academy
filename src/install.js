import { mkdir, cp, rm, access, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join } from 'node:path';
import { homedir, tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import { c } from './color.js';

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'pipe', ...opts });
    let stderr = '';
    p.stderr.on('data', (d) => (stderr += d.toString()));
    p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}: ${stderr.trim()}`))));
    p.on('error', reject);
  });
}

async function exists(path) {
  try { await access(path, constants.F_OK); return true; } catch { return false; }
}

export async function installSkills(repos, scope, { dryRun } = {}) {
  const base = scope === 'global' ? homedir() : process.cwd();
  const skillsRoot = join(base, '.claude', 'skills');
  const commandsRoot = join(base, '.claude', 'commands');

  if (dryRun) {
    console.log(`\n${c.yellow('DRY RUN')} — would install skills to ${skillsRoot} and any commands to ${commandsRoot}`);
    for (const r of repos) {
      for (const s of r.skills) console.log(`  ${c.dim('•')} ${s} ${c.dim(`(from ${r.repo})`)}`);
    }
    return;
  }

  await mkdir(skillsRoot, { recursive: true });

  const tmpBase = join(tmpdir(), `orbweva-install-${Date.now()}`);
  await mkdir(tmpBase, { recursive: true });

  console.log('');
  let i = 0;
  for (const r of repos) {
    i++;
    const [owner, name] = r.repo.split('/');
    const cloneDir = join(tmpBase, name);
    const url = `https://github.com/${owner}/${name}.git`;
    process.stdout.write(`${c.cyan(`[${i}/${repos.length}]`)} ${r.repo} ... `);

    try {
      await run('git', ['clone', '--depth', '1', '--quiet', url, cloneDir]);
    } catch (err) {
      console.log(c.red('clone failed'));
      console.log(c.dim(`  ${err.message}`));
      continue;
    }

    // Copy skills
    let skillsCopied = 0;
    for (const skillName of r.skills) {
      const src = join(cloneDir, 'skills', skillName);
      const dst = join(skillsRoot, skillName);
      if (!(await exists(src))) {
        console.log(c.yellow(`skill "${skillName}" not found in repo, skipping`));
        continue;
      }
      if (await exists(dst)) await rm(dst, { recursive: true, force: true });
      await cp(src, dst, { recursive: true });
      skillsCopied++;
    }

    // Copy slash-command namespaces (if the repo ships any)
    let commandNamespaces = 0;
    const commandsSrc = join(cloneDir, 'commands');
    if (await exists(commandsSrc)) {
      await mkdir(commandsRoot, { recursive: true });
      for (const ns of await readdir(commandsSrc)) {
        const nsSrc = join(commandsSrc, ns);
        const nsDst = join(commandsRoot, ns);
        if (await exists(nsDst)) await rm(nsDst, { recursive: true, force: true });
        await cp(nsSrc, nsDst, { recursive: true });
        commandNamespaces++;
      }
    }

    const parts = [`${skillsCopied} skill${skillsCopied === 1 ? '' : 's'}`];
    if (commandNamespaces > 0) parts.push(`${commandNamespaces} command namespace${commandNamespaces === 1 ? '' : 's'}`);
    console.log(c.green(`✓ ${parts.join(', ')}`));
  }

  await rm(tmpBase, { recursive: true, force: true });
  console.log(`\n${c.green('✓')} Skills installed to ${c.bold(skillsRoot)}`);
  if (await exists(commandsRoot)) {
    console.log(`${c.green('✓')} Commands installed to ${c.bold(commandsRoot)}`);
  }
}
