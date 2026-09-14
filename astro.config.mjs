// ABOUTME: Configures the static build, the clean URL policy, and the site origin.
// ABOUTME: There is no server adapter: every page is a file in dist/.

import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://internal-agents.com',
  output: 'static',
  trailingSlash: 'never',
  build: {
    // One file per page, so /agents/<id> is served from agents/<id>.html.
    format: 'file',
  },
});
