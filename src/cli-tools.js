import { c } from './color.js';

const MAC = {
  label: 'macOS',
  steps: [
    'brew install fnm gh supabase/tap/supabase',
    'fnm install --lts && fnm default lts-latest',
    'npm install -g pnpm vercel',
    'gh auth login',
  ],
};

const WIN = {
  label: 'Windows',
  note: [
    '⚠ Read before running:',
    '  1. Open TWO PowerShell windows: one as Admin (for winget) and one regular (for scoop / npm -g).',
    '  2. After any install, refresh PATH in the current window:',
    '     $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")',
    '  3. EBADENGINE warnings on npm -g installs are harmless — ignore them.',
  ].join('\n'),
  steps: [
    '# In Admin PowerShell:',
    'winget install Schniz.fnm; winget install GitHub.cli',
    '',
    '# In regular PowerShell:',
    'fnm install --lts; fnm default lts-latest',
    'Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser; irm get.scoop.sh | iex',
    'scoop install supabase',
    'npm install -g pnpm vercel',
    'gh auth login',
  ],
};

const LINUX = {
  label: 'Linux',
  steps: [
    'curl -fsSL https://fnm.vercel.app/install | bash',
    'fnm install --lts && fnm default lts-latest',
    'sudo apt install gh   # or: brew install gh',
    'npm install -g pnpm vercel',
    '# Supabase CLI: https://supabase.com/docs/guides/local-development/cli/getting-started',
    'gh auth login',
  ],
};

export function printCliGuidance(os) {
  const profile = os.platform === 'darwin' ? MAC : os.platform === 'win32' ? WIN : LINUX;
  console.log(`\n${c.bold('─── CLI tools to install')} ${c.dim(`(${profile.label})`)}`);
  if (profile.note) console.log(c.yellow(profile.note) + '\n');
  for (const line of profile.steps) {
    if (line.startsWith('#') || line === '') console.log(c.dim(line));
    else console.log(`  ${line}`);
  }
  console.log(c.dim(`\n  Full reference: https://orbweva.com/en/accelerator/skills`));
}
