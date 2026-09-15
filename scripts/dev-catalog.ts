// ABOUTME: Runs the Python data build, then Astro, and rebuilds data when YAML changes.
// ABOUTME: Only one data build runs at a time, and a failure stays visible in the log.

import { spawn, spawnSync } from 'node:child_process';
import { watch } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
/** The authored evidence. A change here needs a new normalized catalog. */
const WATCHED = path.join(ROOT, 'data', 'agents');
const DATA_BUILD = ['run', '--locked', 'python', 'scripts/build.py'];
/** Wait for the editor to finish writing before the build starts. */
const SETTLE_MS = 150;

function log(message: string): void {
  process.stdout.write(`[dev-catalog] ${message}\n`);
}

/** Run the Python data build. Its output goes straight to this terminal. */
function runDataBuild(): boolean {
  const result = spawnSync('uv', DATA_BUILD, { cwd: ROOT, stdio: 'inherit' });
  return result.status === 0;
}

let building = false;
let queued = false;
let timer: NodeJS.Timeout | undefined;

/** Rebuild the data, one run at a time. A change during a run starts one more. */
function rebuild(): void {
  if (building) {
    queued = true;
    return;
  }
  building = true;
  const ok = runDataBuild();
  building = false;
  if (ok) {
    log('data/agents.json is up to date.');
  } else {
    // The last good data stays in place, so the site keeps working while you fix this.
    log('the data build failed. The error is above. Astro keeps the last good catalog.');
  }
  if (queued) {
    queued = false;
    rebuild();
  }
}

log('building the catalog data before Astro starts');
if (!runDataBuild()) {
  log('the data build failed. Fix the evidence above, then start the server again.');
  process.exit(1);
}

const watcher = watch(WATCHED, (_event, file) => {
  if (file && !file.endsWith('.yaml')) return;
  clearTimeout(timer);
  timer = setTimeout(() => {
    log(`${file ?? 'a record'} changed; rebuilding the catalog data`);
    rebuild();
  }, SETTLE_MS);
});

log(`watching ${path.relative(ROOT, WATCHED)} for record changes`);

const astro = spawn('npx', ['astro', 'dev', ...process.argv.slice(2)], {
  cwd: ROOT,
  stdio: 'inherit',
});

/** True after Astro moves its server into the background and the command returns. */
let detached = false;

function stopWatching(): void {
  clearTimeout(timer);
  watcher.close();
}

astro.on('exit', (code) => {
  if (code !== null && code !== 0) {
    stopWatching();
    process.exit(code);
  }
  // Astro puts its dev server in the background, so keep watching until Ctrl+C.
  detached = true;
  log('watching for record changes. Press Ctrl+C to stop the dev server.');
});

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    stopWatching();
    if (detached) {
      spawnSync('npx', ['astro', 'dev', 'stop'], { cwd: ROOT, stdio: 'inherit' });
    } else {
      astro.kill(signal);
    }
    process.exit(0);
  });
}
