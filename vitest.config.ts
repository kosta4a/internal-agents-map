// ABOUTME: Runs the TypeScript contract tests for the catalog, routes, and views.
// ABOUTME: Browser acceptance lives in tests/e2e and runs through Playwright.

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/web/**/*.test.ts'],
    environment: 'node',
  },
});
