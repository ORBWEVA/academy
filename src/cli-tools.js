import { c } from './color.js';
import { promptAndRun, summary } from './exec.js';

const MAC = {
  label: 'macOS',
  steps: [
    { cmd: 'brew install fnm gh supabase/tap/supabase', desc: 'Node manager + GitHub CLI + Supabase CLI (brew)' },
    { cmd: 'fnm install --lts && fnm default lts-latest', desc: 'Install and default to LTS Node' },
    { cmd: 'npm install -g pnpm vercel', desc: 'Install pnpm + Vercel CLI globally' },
    { cmd: 'gh auth login', desc: 'Sign in to GitHub (interactive)', note: 'This is interactive — follow the browser prompts.' },
  ],
};

const WIN = {
  label: 'Windows',
  intro: [
    `${c.yellow('⚠ Read before running:')}`,
    '  1. These commands assume you are in PowerShell.',
    '  2. winget commands need Admin PowerShell. If a winget step fails, re-run in an Admin PowerShell window.',
    '  3. scoop commands need regular (non-Admin) PowerShell.',
    '  4. After each install, PATH may be stale — restart the window if you see "command not recognized".',
    '  5. EBADENGINE warnings on "npm install -g" are harmless; ignore them.',
  ].join('\n'),
  steps: [
    { cmd: 'winget install --id Schniz.fnm -e',         desc: 'Install fnm (Node version manager)', note: 'Needs Admin PowerShell.' },
    { cmd: 'winget install --id GitHub.cli -e',         desc: 'Install GitHub CLI',                 note: 'Needs Admin PowerShell.' },
    { cmd: 'fnm install --lts; fnm default lts-latest', desc: 'Install and default to LTS Node' },
    { cmd: 'Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force; irm get.scoop.sh | iex', desc: 'Install Scoop package manager' },
    { cmd: 'scoop install supabase',                    desc: 'Install Supabase CLI via Scoop' },
    { cmd: 'npm install -g pnpm vercel',                desc: 'Install pnpm + Vercel CLI globally' },
    { cmd: 'gh auth login',                             desc: 'Sign in to GitHub (interactive)', note: 'This is interactive — follow the browser prompts.' },
  ],
};

const LINUX = {
  label: 'Linux',
  steps: [
    { cmd: 'curl -fsSL https://fnm.vercel.app/install | bash', desc: 'Install fnm (Node version manager)' },
    { cmd: 'fnm install --lts && fnm default lts-latest',      desc: 'Install and default to LTS Node' },
    { cmd: 'sudo apt install -y gh',                           desc: 'Install GitHub CLI (Debian/Ubuntu)', note: 'If not Debian-based, see https://cli.github.com/manual/installation' },
    { cmd: 'npm install -g pnpm vercel',                       desc: 'Install pnpm + Vercel CLI globally' },
    { cmd: 'gh auth login',                                    desc: 'Sign in to GitHub (interactive)', note: 'This is interactive — follow the browser prompts.' },
  ],
};

function profileFor(os) {
  if (os.platform === 'darwin') return MAC;
  if (os.platform === 'win32')  return WIN;
  return LINUX;
}

export async function runCliSetup(os, { assumeYes, interactive }) {
  const profile = profileFor(os);
  console.log(`\n${c.bold('─── CLI tools')} ${c.dim(`(${profile.label})`)}`);
  if (profile.intro) console.log(profile.intro);

  if (!interactive) {
    // Fallback to print-only mode (for --skills-only-ish callers).
    for (const s of profile.steps) console.log(`  ${c.cyan('$')} ${s.cmd}`);
    console.log(c.dim(`\n  Full reference: https://orbweva.com/en/accelerator/skills`));
    return null;
  }

  const result = await promptAndRun(profile.steps, { assumeYes });
  console.log(`\n  ${c.bold('CLI tools:')} ${summary(result)}`);
  console.log(c.dim(`  Full reference: https://orbweva.com/en/accelerator/skills`));
  return result;
}
