// ABOUTME: Stops the background Astro preview server after the browser tests.
// ABOUTME: A failure to stop must not hide the result of the tests.

import { execFileSync } from 'node:child_process';

export default function globalTeardown(): void {
  execFileSync('npx', ['astro', 'preview', 'stop'], { stdio: 'inherit' });
}
