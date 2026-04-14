import { mkdir, cp, rm, access } from 'node:fs/promises';
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
  const destRoot = scope === 'global'
    ? join(homedir(), '.claude', 'skills')
    : join(process.cwd(), '.claude', 'skills');

  if (dryRun) {
    console.log(`\n${c.yellow('DRY RUN')} — would install to ${destRoot}`);
    for (const r of repos) {
      for (const s of r.skills) console.log(`  ${c.dim('•')} ${s} ${c.dim(`(from ${r.repo})`)}`);
    }
    return;
  }

  await mkdir(destRoot, { recursive: true });

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

    let copied = 0;
    for (const skillName of r.skills) {
      const src = join(cloneDir, 'skills', skillName);
      const dst = join(destRoot, skillName);
      if (!(await exists(src))) {
        console.log(c.yellow(`skill "${skillName}" not found in repo, skipping`));
        continue;
      }
      if (await exists(dst)) await rm(dst, { recursive: true, force: true });
      await cp(src, dst, { recursive: true });
      copied++;
    }
    console.log(c.green(`✓ ${copied} skill${copied === 1 ? '' : 's'}`));
  }

  await rm(tmpBase, { recursive: true, force: true });
  console.log(`\n${c.green('✓')} Installed to ${c.bold(destRoot)}`);
}
