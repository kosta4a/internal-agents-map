// ABOUTME: Starts the Astro preview server before the browser tests run.
// ABOUTME: `astro preview` runs in the background, so the tests wait for a response.

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { PREVIEW_HOST, PREVIEW_PORT, PREVIEW_URL } from './preview';

export default async function globalSetup(): Promise<void> {
  if (!existsSync(new URL('../../dist/index.html', import.meta.url))) {
    throw new Error('dist/index.html is missing. Run `npm run build` before `npm run test:e2e`.');
  }
  execFileSync(
    'npx',
    ['astro', 'preview', '--host', PREVIEW_HOST, '--port', String(PREVIEW_PORT)],
    { stdio: 'inherit' },
  );
  const deadline = Date.now() + 30_000;
  for (;;) {
    try {
      const response = await fetch(PREVIEW_URL);
      if (response.ok) return;
    } catch {
      // The server is not listening yet.
    }
    if (Date.now() > deadline) throw new Error(`The preview server did not answer at ${PREVIEW_URL}.`);
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
}
