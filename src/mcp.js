import { c } from './color.js';

export function printMcpGuidance(servers) {
  console.log(`\n${c.bold('─── MCP servers')} ${c.dim('(add after setting credentials)')}`);
  for (const [name, cfg] of Object.entries(servers)) {
    const envNote = cfg.envKey ? c.dim(`  # set ${cfg.envKey} first`) : '';
    console.log(`  ${c.cyan(`claude mcp add ${name}`)} ${cfg.cmd}${envNote ? '  ' + envNote : ''}`);
  }
  console.log(c.dim(`\n  Docs: https://docs.claude.com/en/docs/claude-code/mcp`));
}
