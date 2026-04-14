import { spawn } from 'node:child_process';
import { c } from './color.js';
import { confirm } from './prompts.js';

function runShell(cmd) {
  return new Promise((resolve) => {
    const p = spawn(cmd, { shell: true, stdio: 'inherit' });
    p.on('close', (code) => resolve({ ok: code === 0, code }));
    p.on('error', (err) => resolve({ ok: false, code: -1, error: err.message }));
  });
}

export async function promptAndRun(steps, { assumeYes } = {}) {
  let ran = 0, skipped = 0, failed = 0;
  for (const step of steps) {
    const { cmd, desc, note } = step;
    console.log('');
    if (desc) console.log(`  ${c.bold(desc)}`);
    console.log(`  ${c.cyan('$')} ${cmd}`);
    if (note) console.log(`  ${c.yellow(note)}`);
    const go = assumeYes ? true : await confirm(`  Run now?`, true);
    if (!go) { console.log(`  ${c.dim('skipped')}`); skipped++; continue; }
    const { ok, code, error } = await runShell(cmd);
    if (ok) { console.log(`  ${c.green('✓ ok')}`); ran++; }
    else    { console.log(`  ${c.red(`✗ exit ${code}${error ? ' — ' + error : ''}`)}`); failed++; }
  }
  return { ran, skipped, failed };
}

export function summary({ ran, skipped, failed }) {
  const parts = [];
  if (ran)     parts.push(c.green(`${ran} ran`));
  if (skipped) parts.push(c.dim(`${skipped} skipped`));
  if (failed)  parts.push(c.red(`${failed} failed`));
  return parts.join(', ') || c.dim('nothing to do');
}
