#!/usr/bin/env node
import { run } from '../src/cli.js';

run(process.argv.slice(2)).catch((err) => {
  console.error(`\n\x1b[31m✗\x1b[0m ${err.message}`);
  if (process.env.ORBWEVA_DEBUG) console.error(err.stack);
  process.exit(1);
});
