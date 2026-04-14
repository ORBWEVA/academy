import { c } from './color.js';
import { promptAndRun, summary } from './exec.js';

function stepsFromManifest(servers) {
  return Object.entries(servers).map(([name, cfg]) => ({
    cmd: `claude mcp add ${name} ${cfg.cmd}`,
    desc: `Add MCP: ${name}`,
    note: cfg.envKey ? `Needs ${cfg.envKey} in your shell env before Claude Code can actually connect.` : null,
  }));
}

export async function runMcpSetup(servers, { assumeYes, interactive }) {
  console.log(`\n${c.bold('─── MCP servers')}`);
  const steps = stepsFromManifest(servers);

  if (!interactive) {
    for (const s of steps) {
      console.log(`  ${c.cyan('$')} ${s.cmd}${s.note ? c.dim('  # ' + s.note) : ''}`);
    }
    console.log(c.dim(`\n  Docs: https://docs.claude.com/en/docs/claude-code/mcp`));
    return null;
  }

  const result = await promptAndRun(steps, { assumeYes });
  console.log(`\n  ${c.bold('MCP servers:')} ${summary(result)}`);
  console.log(c.dim(`  Docs: https://docs.claude.com/en/docs/claude-code/mcp`));
  return result;
}
