import { platform, arch } from 'node:os';

export function detectOS() {
  const p = platform();
  const name = p === 'darwin' ? 'macOS' : p === 'win32' ? 'Windows' : p === 'linux' ? 'Linux' : p;
  return { platform: p, name, arch: arch() };
}
