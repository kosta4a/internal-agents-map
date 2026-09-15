// ABOUTME: Browser acceptance for the directory and the three difficult entry pages.
// ABOUTME: One project runs without JavaScript, so the reading path must not need it.

import { expect, test, type Page } from '@playwright/test';

const ENTRIES = [
  {
    id: 'block-builderbot',
    heading: 'Builderbot',
    company: 'Block',
    /** The undefined meaning of an operation must stay beside the figure. */
    caveat: 'does not define an operation',
  },
  {
    id: 'uber-ureview',
    heading: 'uReview',
    company: 'Uber',
    caveat: 'conflicts and remains unresolved',
  },
  {
    id: 'plaid-internal-mcp-server',
    heading: 'Internal MCP server',
    company: 'Plaid',
    caveat: 'separate from internal MCP server adoption',
  },
] as const;

async function structuredData(page: Page): Promise<Record<string, unknown>> {
  const text = await page.locator('script[type="application/ld+json"]').innerText();
  return JSON.parse(text) as Record<string, unknown>;
}

test.describe('the directory', () => {
  test('links to every entry page in the initial HTML', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText('Internal Agents Map');
    const cards = page.locator('article.entry[data-approach-id]');
    await expect(cards).toHaveCount(39);
    for (const entry of ENTRIES) {
      const card = page.locator(`article.entry#${entry.id}`);
      await expect(card).toHaveCount(1);
      await expect(card.locator(`a[href="/agents/${entry.id}"]`).first()).toBeVisible();
    }
  });

  test('reports a missing address as a real 404', async ({ page }) => {
    const response = await page.goto('/agents/not-a-real-entry');
    expect(response?.status()).toBe(404);
  });
});

for (const entry of ENTRIES) {
  test.describe(entry.id, () => {
    test('reads as a complete document', async ({ page }) => {
      const response = await page.goto(`/agents/${entry.id}`);
      expect(response?.status()).toBe(200);

      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveText(entry.heading);
      await expect(page).toHaveTitle(new RegExp(`${entry.heading} at ${entry.company}`));

      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute('href', `https://internal-agents.com/agents/${entry.id}`);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{40,}/);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        'https://internal-agents.com/og.png',
      );
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);

      await expect(page.locator('#sources')).toBeVisible();
      await expect(page.locator('#related')).toBeVisible();
      await expect(page.locator('a[href="/"]').first()).toBeVisible();
    });

    test('keeps the material qualification beside its statement', async ({ page }) => {
      await page.goto(`/agents/${entry.id}`);
      await expect(page.getByText(entry.caveat).first()).toBeVisible();
    });

    test('keeps claim and source anchors', async ({ page }) => {
      await page.goto(`/agents/${entry.id}`);
      const claims = page.locator('[data-claim-id]');
      expect(await claims.count()).toBeGreaterThan(0);
      for (const id of await claims.evaluateAll((nodes) => nodes.map((node) => node.id))) {
        expect(id).toMatch(/^claim-/);
      }
      const sources = page.locator('ol.sources > li[data-source-id]');
      expect(await sources.count()).toBeGreaterThan(0);
      for (const id of await sources.evaluateAll((nodes) => nodes.map((node) => node.id))) {
        expect(id).toMatch(/^source-/);
      }
    });

    test('describes itself for search engines', async ({ page }) => {
      await page.goto(`/agents/${entry.id}`);
      const data = await structuredData(page);
      const graph = data['@graph'] as Array<Record<string, unknown>>;
      const types = graph.map((node) => node['@type']);
      expect(types).toContain('WebPage');
      expect(types).toContain('BreadcrumbList');
      expect(types).toContain('Organization');
      const webPage = graph.find((node) => node['@type'] === 'WebPage');
      expect(webPage?.url).toBe(`https://internal-agents.com/agents/${entry.id}`);
    });

    test('shows the sources as links to their publishers', async ({ page }) => {
      await page.goto(`/agents/${entry.id}`);
      const links = page.locator('ol.sources a.source-url');
      expect(await links.count()).toBeGreaterThan(0);
      for (const href of await links.evaluateAll((nodes) =>
        nodes.map((node) => (node as HTMLAnchorElement).href),
      )) {
        expect(href).toMatch(/^https:\/\//);
      }
    });
  });
}

test.describe('reported results', () => {
  test('separates the metrics from the statements of the other kinds', async ({ page }) => {
    await page.goto('/agents/block-builderbot');
    const results = page.locator('#results');
    await expect(results.getByRole('heading', { name: 'Reported metrics' })).toBeVisible();
    const statements = results.getByRole('heading', { name: 'Reported outcomes and statements' });
    await expect(statements).toBeVisible();
    const opinion = results.locator('.claim', { hasText: 'now takes days' });
    await expect(opinion).toHaveCount(1);
    await expect(opinion.locator('.claim-kind')).toHaveText('Opinion');
  });
});

test.describe('supporting systems', () => {
  test('omit an empty workflow section and keep the invocation fact', async ({ page }) => {
    await page.goto('/agents/plaid-internal-mcp-server');
    await expect(page.locator('#how-it-works')).toHaveCount(0);
    const facts = page.locator('.entry-facts');
    await expect(facts).toContainText('Invocation');
    await expect(facts).toContainText('Interactive');
    await expect(page.getByText('supporting infrastructure').first()).toBeVisible();
  });

  test('do not deny the workflow of a platform that reports one', async ({ page }) => {
    await page.goto('/agents/workos-project-horizon');
    await expect(page.locator('#how-it-works')).toBeVisible();
    await expect(page.getByText('supporting infrastructure').first()).toBeVisible();
    await expect(page.getByText('no execution workflow')).toHaveCount(0);
  });

  test('keep the workflow section where the sources report a workflow', async ({ page }) => {
    await page.goto('/agents/block-builderbot');
    await expect(page.locator('#how-it-works')).toBeVisible();
    expect(await page.locator('#how-it-works .claim').count()).toBeGreaterThan(0);
  });
});

test.describe('page previews', () => {
  test('captures the directory and the three entries', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'no-javascript', 'One capture per layout is enough.');
    for (const path of ['/', ...ENTRIES.map((entry) => `/agents/${entry.id}`)]) {
      await page.goto(path);
      const name = path === '/' ? 'directory' : path.slice('/agents/'.length);
      await page.screenshot({
        path: testInfo.outputPath(`${name}.png`),
        fullPage: true,
      });
    }
  });
});
