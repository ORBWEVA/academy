import readline from 'node:readline';
import { c } from './color.js';

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (a) => { rl.close(); resolve(a.trim()); }));
}

export async function prompt(label, def = '') {
  const hint = def ? c.dim(` (${def})`) : '';
  const a = await ask(`${label}${hint}: `);
  return a || def;
}

export async function confirm(label, def = true) {
  const hint = def ? 'Y/n' : 'y/N';
  const a = (await ask(`${label} ${c.dim(`[${hint}]`)} `)).toLowerCase();
  if (!a) return def;
  return a.startsWith('y');
}

export async function select(label, options) {
  console.log(`\n${c.bold(label)}:`);
  options.forEach((o, i) => console.log(`  ${c.cyan(`${i + 1})`)} ${o.label}`));
  while (true) {
    const a = await ask(c.dim(`  Choice [1-${options.length}, default 1]: `));
    const n = a === '' ? 1 : parseInt(a, 10);
    if (n >= 1 && n <= options.length) return options[n - 1].value;
    console.log(c.red('  Invalid choice.'));
  }
}
