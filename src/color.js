const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const wrap = (code, str) => (useColor ? `\x1b[${code}m${str}\x1b[0m` : String(str));

export const c = {
  bold:    (s) => wrap('1', s),
  dim:     (s) => wrap('2', s),
  red:     (s) => wrap('31', s),
  green:   (s) => wrap('32', s),
  yellow:  (s) => wrap('33', s),
  blue:    (s) => wrap('34', s),
  magenta: (s) => wrap('35', s),
  cyan:    (s) => wrap('36', s),
};
