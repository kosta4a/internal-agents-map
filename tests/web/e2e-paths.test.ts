// ABOUTME: Checks that the browser specs write their artifacts through Playwright.
// ABOUTME: An absolute path of one machine does not exist on the continuous runner.

import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const E2E_DIR = new URL('../e2e/', import.meta.url);

function specFiles(): string[] {
  return readdirSync(E2E_DIR).filter((name) => name.endsWith('.ts'));
}

describe('the browser specs', () => {
  it('names no absolute path of one machine', () => {
    for (const name of specFiles()) {
      const text = readFileSync(new URL(name, E2E_DIR), 'utf8');
      expect(text, name).not.toMatch(/['"`](?:\/Users\/|\/private\/|\/home\/|\/tmp\/)/);
    }
  });

  it('writes every screenshot to the output path of the test', () => {
    for (const name of specFiles()) {
      const text = readFileSync(new URL(name, E2E_DIR), 'utf8');
      for (const [line] of text.matchAll(/^.*\bpath:.*$/gm)) {
        expect(line, `${name}: ${line}`).toMatch(/outputPath\(/);
      }
    }
  });
});
