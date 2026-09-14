// ABOUTME: Browser acceptance for the directory: search, filters, history, and old links.
// ABOUTME: The no-javascript project proves that every entry link works without the script.

import { expect, test, type Page } from '@playwright/test';
import { PREVIEW_URL } from './preview';

const PREVIEW_HOST = new URL(PREVIEW_URL).host;
const SCREENSHOT_DIR =
  '/private/tmp/claude-501/-Users-nikola-dev-steel-internal-agents-map/fcf8448a-58ec-485b-b372-ca66928c4997/scratchpad/wave2-directory';

/** The whole catalog, as the directory publishes it today. */
const TOTAL = 39;
/** A work filter value and the number of cards that carry it. */
const WORK = { value: 'security', count: 4 };
/** A search term and the number of cards whose text carries it. */
const SEARCH = { term: 'uber', count: 4 };

const visibleCards = (page: Page) => page.locator('article.entry:not([hidden])');

test.describe('the directory without javascript', () => {
  test.skip(({ javaScriptEnabled }) => javaScriptEnabled !== false, 'This is the no-JS project.');

  test('shows every entry link and hides the filter form', async ({ page }) => {
    await page.goto('/');
    await expect(visibleCards(page)).toHaveCount(TOTAL);
    const links = page.locator('article.entry a[href^="/agents/"]');
    const targets = await links.evaluateAll((nodes) =>
      nodes.map((node) => (node as HTMLAnchorElement).getAttribute('href')),
    );
    expect(new Set(targets).size).toBe(TOTAL);
    await expect(page.locator('#filters')).toBeHidden();
  });

  test('draws the contour map as decoration behind the header', async ({ page }) => {
    await page.goto('/');
    const map = page.locator('header.intro svg.topography');
    await expect(map).toHaveCount(1);
    await expect(map).toHaveAttribute('aria-hidden', 'true');
    expect(await map.locator('path.contour').count()).toBeGreaterThan(0);
  });

  test('keeps the card of an old fragment link as its anchor', async ({ page }) => {
    await page.goto('/#block-builderbot');
    expect(new URL(page.url()).pathname).toBe('/');
    await expect(page.locator('article.entry#block-builderbot')).toBeVisible();
  });
});

test.describe('the directory with javascript', () => {
  test.skip(({ javaScriptEnabled }) => javaScriptEnabled === false, 'These cases need the script.');

  test('shows the filter form and the whole catalog first', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#filters')).toBeVisible();
    await expect(visibleCards(page)).toHaveCount(TOTAL);
    await expect(page.locator('#results')).toHaveText(`${TOTAL} of ${TOTAL} approaches`);
    await expect(page.locator('#empty')).toBeHidden();
  });

  test('searches the cards and records the search in the URL', async ({ page }) => {
    await page.goto('/');
    await page.fill('#q', SEARCH.term);
    await expect(visibleCards(page)).toHaveCount(SEARCH.count);
    await expect(page.locator('#results')).toHaveText(`${SEARCH.count} of ${TOTAL} approaches`);
    await expect(page).toHaveURL(new RegExp(`\\?q=${SEARCH.term}$`));
    await expect(page.locator('article.entry#uber-ureview')).toBeVisible();
  });

  test('filters by work and records the filter in the URL', async ({ page }) => {
    await page.goto('/');
    await page.selectOption('#work', WORK.value);
    await expect(visibleCards(page)).toHaveCount(WORK.count);
    await expect(page).toHaveURL(new RegExp(`\\?work=${WORK.value}$`));
  });

  test('restores the state of a shared filtered address', async ({ page }) => {
    await page.goto(`/?work=${WORK.value}`);
    await expect(page.locator('#work')).toHaveValue(WORK.value);
    await expect(visibleCards(page)).toHaveCount(WORK.count);
  });

  test('ignores a filter value that the catalog does not use', async ({ page }) => {
    await page.goto('/?work=not-a-real-value');
    await expect(page.locator('#work')).toHaveValue('');
    await expect(visibleCards(page)).toHaveCount(TOTAL);
  });

  test('keeps the homepage canonical while a filter is applied', async ({ page }) => {
    await page.goto(`/?q=${SEARCH.term}&work=${WORK.value}`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://internal-agents.com/',
    );
  });

  test('walks back and forward through the filter history', async ({ page }) => {
    await page.goto('/');
    await page.selectOption('#work', WORK.value);
    await expect(page).toHaveURL(new RegExp(`work=${WORK.value}`));
    await page.selectOption('#supervision', 'outcome-review');
    await expect(visibleCards(page)).toHaveCount(1);

    await page.goBack();
    await expect(page.locator('#supervision')).toHaveValue('');
    await expect(visibleCards(page)).toHaveCount(WORK.count);

    await page.goBack();
    await expect(page.locator('#work')).toHaveValue('');
    await expect(visibleCards(page)).toHaveCount(TOTAL);

    await page.goForward();
    await expect(page.locator('#work')).toHaveValue(WORK.value);
    await expect(visibleCards(page)).toHaveCount(WORK.count);
  });

  test('explains an empty result and resets the filters', async ({ page }) => {
    await page.goto('/');
    await page.fill('#q', 'nothing matches this text');
    await expect(visibleCards(page)).toHaveCount(0);
    await expect(page.locator('#empty')).toBeVisible();

    await page.locator('#empty button').click();
    await expect(visibleCards(page)).toHaveCount(TOTAL);
    await expect(page.locator('#empty')).toBeHidden();
    await expect(page.locator('#q')).toHaveValue('');
    await expect(page).toHaveURL(/\/(\?.*)?$/);
    expect(new URL(page.url()).searchParams.get('q')).toBeNull();
  });

  test('works from the keyboard alone', async ({ page }) => {
    await page.goto('/');
    await page.locator('#q').focus();
    await page.keyboard.type(SEARCH.term);
    await page.keyboard.press('Enter');
    await expect(visibleCards(page)).toHaveCount(SEARCH.count);
    await expect(page).toHaveURL(new RegExp(`\\?q=${SEARCH.term}$`));

    await page.keyboard.press('Tab');
    await expect(page.locator('#work')).toBeFocused();
    await page.locator('#work').selectOption(WORK.value);
    await expect(page).toHaveURL(new RegExp(`work=${WORK.value}`));
  });

  test.describe('old fragment links', () => {
    test('sends an entry fragment to the entry page', async ({ page }) => {
      await page.goto('/#block-builderbot');
      await expect(page).toHaveURL(/\/agents\/block-builderbot$/);
      await expect(page.locator('h1')).toHaveText('Builderbot');
    });

    test('sends a claim fragment to the claim on its entry page', async ({ page }) => {
      await page.goto('/#claim-uber-ureview--headline-metric');
      await expect(page).toHaveURL(
        /\/agents\/uber-ureview#claim-uber-ureview--headline-metric$/,
      );
      await expect(page.locator('#claim-uber-ureview--headline-metric')).toBeVisible();
    });

    test('sends a source fragment to the source on its entry page', async ({ page }) => {
      await page.goto('/#source-plaid-internal-mcp-server-source-1');
      await expect(page).toHaveURL(
        /\/agents\/plaid-internal-mcp-server#source-plaid-internal-mcp-server-source-1$/,
      );
      await expect(page.locator('#source-plaid-internal-mcp-server-source-1')).toBeVisible();
    });

    test('replaces the directory in the history, so back leaves the site entry', async ({ page }) => {
      await page.goto('/');
      await page.goto('/#block-builderbot');
      await expect(page).toHaveURL(/\/agents\/block-builderbot$/);
      await page.goBack();
      expect(new URL(page.url()).pathname).toBe('/');
    });

    for (const fragment of ['#catalog', '#main', '#not-a-real-entry', '#claim-nobody--field']) {
      test(`keeps ${fragment} on the directory`, async ({ page }) => {
        await page.goto(`/${fragment}`);
        expect(new URL(page.url()).pathname).toBe('/');
        await expect(visibleCards(page)).toHaveCount(TOTAL);
      });
    }

    for (const fragment of [
      '#//evil.example.com',
      '#https://evil.example.com',
      '#block-builderbot/../../evil',
      '#%2e%2e%2fevil',
    ]) {
      test(`refuses to redirect on ${fragment}`, async ({ page }) => {
        await page.goto(`/${fragment}`);
        expect(new URL(page.url()).host).toBe(PREVIEW_HOST);
        expect(new URL(page.url()).pathname).toBe('/');
      });
    }
  });

  test('captures the filtered and the empty directory', async ({ page }, testInfo) => {
    await page.goto(`/?work=${WORK.value}`);
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/directory-filtered-${testInfo.project.name}.png`,
      fullPage: true,
    });
    await page.fill('#q', 'nothing matches this text');
    await expect(page.locator('#empty')).toBeVisible();
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/directory-empty-${testInfo.project.name}.png`,
      fullPage: true,
    });
  });
});
