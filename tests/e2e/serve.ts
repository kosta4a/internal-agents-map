// ABOUTME: Keeps the built Astro preview in Playwright's managed server process.
// ABOUTME: The API avoids the CLI's automatic background mode in agent environments.

import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { preview } from 'astro';
import { PREVIEW_HOST, PREVIEW_PORT } from './preview.ts';

const root = new URL('../../', import.meta.url);
if (!existsSync(new URL('dist/index.html', root))) {
  throw new Error('dist/index.html is missing. Run `npm run build` before `npm run test:e2e`.');
}

const server = await preview({
  root: fileURLToPath(root),
  server: { host: PREVIEW_HOST, port: PREVIEW_PORT, open: false },
  vite: { preview: { strictPort: true } },
});

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => {
    void server.stop();
  });
}
await server.closed();
