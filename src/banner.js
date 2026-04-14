import { c } from './color.js';

export function banner() {
  const art = [
    '  ___  ____  ____  _    _  _____ _     _    ',
    ' / _ \\|  _ \\| __ )| |  | |/ ____| |   / \\   ',
    '| | | | |_) |  _ \\| |  | | |    | |  / _ \\  ',
    '| |_| |  _ <| |_) | |/\\| | |___ | |_/ ___ \\ ',
    ' \\___/|_| \\_\\____/ \\_/\\_/ \\____||___/_/   \\_\\',
  ].join('\n');

  return `\n${c.cyan(art)}\n\n${c.bold('ORBWEVA Academy')} — Claude Code skills installer\n`;
}
