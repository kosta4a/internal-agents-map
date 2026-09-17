// ABOUTME: Browser acceptance for the directory: search, filters, history, and old links.
// ABOUTME: The no-javascript project proves that every entry link works without the script.

import { expect, test, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { PREVIEW_URL } from './preview';

const PREVIEW_HOST = new URL(PREVIEW_URL).host;
/** The committed catalog, so the spec follows the data. */
const CATALOG = JSON.parse(
  readFileSync(new URL('../../data/agents.json', import.meta.url), 'utf8'),
) as {
  approaches: ReadonlyArray<{ id: string; company_id: string }>;
  companies: ReadonlyArray<{ id: string; logo: { readonly path: string } | null }>;
};
/** The number of implementations in the committed catalog. */
const TOTAL = CATALOG.approaches.length;
/** The logo descriptor of each company, or null when only its monogram remains. */
const LOGO_BY_COMPANY = new Map(CATALOG.companies.map((company) => [company.id, company.logo]));
/** Cards whose companies show a monogram, and cards whose companies show a logo. */
const MONOGRAM_CARDS = CATALOG.approaches
  .filter((approach) => LOGO_BY_COMPANY.get(approach.company_id) === null)
  .slice(0, 3);
const LOGO_CARDS = CATALOG.approaches
  .filter((approach) => LOGO_BY_COMPANY.get(approach.company_id) !== null)
  .slice(0, 3);
/** A work filter value, and the label the search box suggests for it. */
const WORK = { value: 'security', label: 'Security' };
const INVOCATION = { value: 'background', label: 'Background' };
/** A supervision value, the label of its chip, and the level a person can type to reach it. */
const SUPERVISION = { value: 'exception-only', label: 'Exception only (level 5)', typed: 'level 5' };
/** A search term. The cards whose text carries it are counted from the page. */
const SEARCH = { term: 'uber' };

const visibleCards = (page: Page) => page.locator('article.entry:not([hidden])');
/** The chips of the selected facet terms, in selection order. */
const chips = (page: Page) => page.locator('#chips .chip');
const chip = (page: Page, key: string, value: string) =>
  page.locator(`#chips .chip[data-key="${key}"][data-id="${value}"]`);
const suggestion = (page: Page, key: string, value: string) =>
  page.locator(`#suggestions [role="option"][data-key="${key}"][data-id="${value}"]`);
/** How many cards carry the work value, hidden or not. */
const workCount = (page: Page) => page.locator(`article.entry[data-work~="${WORK.value}"]`).count();
/** How many cards carry the search term in their searchable text, hidden or not. */
const searchCount = (page: Page) =>
  page.locator(`article.entry[data-search*="${SEARCH.term}"]`).count();

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

  test('keeps the card of an old fragment link as its anchor', async ({ page }) => {
    await page.goto('/#block-builderbot');
    expect(new URL(page.url()).pathname).toBe('/');
    await expect(page.locator('article.entry#block-builderbot')).toBeVisible();
  });

  test('gives every card exactly one company logo mark', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('article.entry')).toHaveCount(TOTAL);
    await expect(page.locator('article.entry span.company-logo')).toHaveCount(TOTAL);
    await expect(page.locator('article.entry:has(span.company-logo[data-company-id])')).toHaveCount(
      TOTAL,
    );

    for (const approach of MONOGRAM_CARDS) {
      const mark = page.locator(`article.entry#${approach.id} span.company-logo`);
      await expect(mark).toHaveAttribute('data-company-id', approach.company_id);
      // The card's mark is rendered but hidden for now, so only its presence is checked.
      await expect(mark.locator('span.company-logo-monogram')).toHaveCount(1);
      await expect(mark.locator('img')).toHaveCount(0);
    }

    for (const approach of LOGO_CARDS) {
      const logo = LOGO_BY_COMPANY.get(approach.company_id)!;
      const mark = page.locator(`article.entry#${approach.id} span.company-logo`);
      await expect(mark).toHaveAttribute('data-company-id', approach.company_id);
      await expect(mark.locator('img')).toHaveAttribute('src', `/${logo.path}`);
      await expect(mark.locator('span.company-logo-monogram')).toHaveCount(0);
    }
  });
});

test.describe('the directory with javascript', () => {
  test.skip(({ javaScriptEnabled }) => javaScriptEnabled === false, 'These cases need the script.');

  test('shows the filter form and the whole catalog first', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#filters')).toBeVisible();
    await expect(visibleCards(page)).toHaveCount(TOTAL);
    await expect(page.locator('#results')).toHaveText(`${TOTAL} items`);
    await expect(page.locator('#empty')).toBeHidden();
  });

  for (const shortcut of ['Meta+k', 'Control+k']) {
    test(`${shortcut} focuses search and selects the existing query`, async ({ page }) => {
      await page.goto('/?q=github');
      await expect(page.locator('#filters')).toBeVisible();
      await page.keyboard.press(shortcut);
      await expect(page.locator('#q')).toBeFocused();
      await expect(page.locator('#q')).toHaveValue('github');
      await page.keyboard.type('notion');
      await expect(page.locator('#q')).toHaveValue('notion');
      await page.keyboard.press('k');
      await expect(page.locator('#q')).toHaveValue('notionk');
    });
  }

  test('searches the cards and records the search in the URL', async ({ page }) => {
    await page.goto('/');
    await page.fill('#q', SEARCH.term);
    await expect(visibleCards(page)).toHaveCount(await searchCount(page));
    await expect(page.locator('#results')).toHaveText(`${await searchCount(page)} items`);
    await expect(page).toHaveURL(new RegExp(`\\?q=${SEARCH.term}$`));
    await expect(page.locator('article.entry#uber-ureview')).toBeVisible();
  });

  test('turns a suggested work area into a chip and records it in the URL', async ({ page }) => {
    await page.goto('/');
    await page.fill('#q', 'secu');
    await expect(page.locator('#q')).toHaveAttribute('aria-expanded', 'true');
    await expect(suggestion(page, 'work', WORK.value)).toHaveText(`Work${WORK.label}`);
    await suggestion(page, 'work', WORK.value).click();

    await expect(chip(page, 'work', WORK.value)).toContainText(WORK.label);
    await expect(page.locator('#q')).toHaveValue('');
    await expect(page.locator('#suggestions')).toBeHidden();
    await expect(visibleCards(page)).toHaveCount(await workCount(page));
    await expect(page).toHaveURL(new RegExp(`\\?work=${WORK.value}$`));
  });

  test('turns an exact facet word into a chip on Enter', async ({ page }) => {
    await page.goto('/');
    await page.fill('#q', WORK.label);
    await page.keyboard.press('Enter');
    await expect(chip(page, 'work', WORK.value)).toBeVisible();
    await expect(page.locator('#q')).toHaveValue('');
    await expect(page).toHaveURL(new RegExp(`\\?work=${WORK.value}$`));
  });

  test('reaches a supervision level by its number', async ({ page }) => {
    await page.goto('/');
    await page.fill('#q', SUPERVISION.typed);
    await page.keyboard.press('Enter');
    await expect(chip(page, 'supervision', SUPERVISION.value)).toContainText(SUPERVISION.label);
    await expect(page).toHaveURL(new RegExp(`\\?supervision=${SUPERVISION.value}$`));
    await expect(visibleCards(page)).toHaveCount(
      await page.locator(`article.entry[data-supervision~="${SUPERVISION.value}"]`).count(),
    );
  });

  test('keeps other words as free text that must all match', async ({ page }) => {
    await page.goto('/');
    await page.fill('#q', 'coding assistant');
    await page.keyboard.press('Enter');
    await expect(chips(page)).toHaveCount(0);
    await expect(page.locator('#q')).toHaveValue('coding assistant');
    await expect(page).toHaveURL(/\?q=coding(\+|%20)assistant$/);
    // Cards collapse before they are hidden, so let the list settle first.
    await expect(visibleCards(page)).not.toHaveCount(TOTAL);
    const count = await visibleCards(page).count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(TOTAL);
    for (const text of await visibleCards(page).evaluateAll((nodes) =>
      nodes.map((node) => (node as HTMLElement).dataset.search ?? ''),
    )) {
      expect(text).toContain('coding');
      expect(text).toContain('assistant');
    }
  });

  test('combines two values of one facet with OR', async ({ page }) => {
    await page.goto('/');
    await page.fill('#q', 'security');
    await page.keyboard.press('Enter');
    await page.fill('#q', 'coding');
    await page.keyboard.press('Enter');
    await expect(chips(page)).toHaveCount(2);
    await expect(page).toHaveURL(/\?work=security&work=coding$/);
    const either = await page
      .locator('article.entry[data-work~="security"], article.entry[data-work~="coding"]')
      .count();
    await expect(visibleCards(page)).toHaveCount(either);
  });

  test('filters structural type and invocation independently', async ({ page }) => {
    await page.goto(`/?type=agent&invocation=${INVOCATION.value}`);
    await expect(chip(page, 'type', 'agent')).toContainText('Agent');
    await expect(chip(page, 'invocation', INVOCATION.value)).toContainText(INVOCATION.label);
    const matching = await page
      .locator('article.entry[data-type~="agent"][data-invocation~="background"]')
      .count();
    await expect(visibleCards(page)).toHaveCount(matching);
  });

  test('combines repeated invocation values with OR', async ({ page }) => {
    await page.goto('/?invocation=background&invocation=scheduled');
    await expect(chips(page)).toHaveCount(2);
    const either = await page
      .locator('article.entry[data-invocation~="background"], article.entry[data-invocation~="scheduled"]')
      .count();
    await expect(visibleCards(page)).toHaveCount(either);
  });

  test('migrates the old task-agent type to agent', async ({ page }) => {
    await page.goto('/?type=task-agent');
    await expect(chip(page, 'type', 'agent')).toContainText('Agent');
    await expect(visibleCards(page)).toHaveCount(
      await page.locator('article.entry[data-type~="agent"]').count(),
    );
  });

  test('explains the old background-agent type and preserves other filters', async ({ page }) => {
    await page.goto(`/?type=background-agent&work=${WORK.value}`);
    await expect(page.locator('#legacy-filter-notice')).toBeVisible();
    await expect(page.locator('#legacy-filter-notice')).toContainText('Background invocation');
    await expect(chip(page, 'work', WORK.value)).toBeVisible();
    await expect(visibleCards(page)).toHaveCount(await workCount(page));
  });

  test('restores the state of a shared filtered address', async ({ page }) => {
    await page.goto(`/?work=${WORK.value}`);
    await expect(chip(page, 'work', WORK.value)).toBeVisible();
    await expect(visibleCards(page)).toHaveCount(await workCount(page));
  });

  test('ignores a filter value that the catalog does not use', async ({ page }) => {
    await page.goto('/?work=not-a-real-value');
    await expect(chips(page)).toHaveCount(0);
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
    await page.fill('#q', WORK.label);
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new RegExp(`work=${WORK.value}`));
    await page.fill('#q', SUPERVISION.typed);
    await page.keyboard.press('Enter');
    await expect(visibleCards(page)).toHaveCount(
      await page
        .locator(
          `article.entry[data-work~="${WORK.value}"][data-supervision~="${SUPERVISION.value}"]`,
        )
        .count(),
    );

    await page.goBack();
    await expect(chip(page, 'supervision', SUPERVISION.value)).toHaveCount(0);
    await expect(visibleCards(page)).toHaveCount(await workCount(page));

    await page.goBack();
    await expect(chips(page)).toHaveCount(0);
    await expect(visibleCards(page)).toHaveCount(TOTAL);

    await page.goForward();
    await expect(chip(page, 'work', WORK.value)).toBeVisible();
    await expect(visibleCards(page)).toHaveCount(await workCount(page));
  });

  test('removes a chip from its button and from Backspace', async ({ page }) => {
    await page.goto(`/?work=${WORK.value}&supervision=${SUPERVISION.value}`);
    await expect(chips(page)).toHaveCount(2);
    await chip(page, 'work', WORK.value).getByRole('button').click();
    await expect(chips(page)).toHaveCount(1);
    await expect(page).toHaveURL(new RegExp(`\\?supervision=${SUPERVISION.value}$`));

    await page.locator('#q').focus();
    await page.keyboard.press('Backspace');
    await expect(chips(page)).toHaveCount(0);
    await expect(page).toHaveURL(/\/$/);
    await expect(visibleCards(page)).toHaveCount(TOTAL);
  });

  test('explains an empty result and resets the search', async ({ page }) => {
    await page.goto(`/?work=${WORK.value}`);
    await page.fill('#q', 'nothing matches this text');
    await expect(visibleCards(page)).toHaveCount(0);
    await expect(page.locator('#empty')).toBeVisible();

    await page.locator('#empty button').click();
    await expect(visibleCards(page)).toHaveCount(TOTAL);
    await expect(page.locator('#empty')).toBeHidden();
    await expect(page.locator('#q')).toHaveValue('');
    await expect(chips(page)).toHaveCount(0);
    await expect(page).toHaveURL(/\/(\?.*)?$/);
    expect(new URL(page.url()).searchParams.get('q')).toBeNull();
    expect(new URL(page.url()).searchParams.get('work')).toBeNull();
  });

  test('works from the keyboard alone', async ({ page }) => {
    await page.goto('/');
    await page.locator('#q').focus();
    await page.keyboard.type(SEARCH.term);
    await page.keyboard.press('Enter');
    await expect(visibleCards(page)).toHaveCount(await searchCount(page));
    await expect(page).toHaveURL(new RegExp(`\\?q=${SEARCH.term}$`));

    await page.fill('#q', 'secu');
    await page.keyboard.press('ArrowDown');
    await expect(suggestion(page, 'work', WORK.value)).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#q')).toHaveAttribute('aria-activedescendant', /suggestion-/);
    await page.keyboard.press('Enter');
    await expect(chip(page, 'work', WORK.value)).toBeVisible();
    await expect(page).toHaveURL(new RegExp(`\\?work=${WORK.value}$`));

    // Security is a chip now, so it leaves the list. Another prefix opens it again.
    await page.fill('#q', 'cod');
    await expect(page.locator('#suggestions')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#suggestions')).toBeHidden();
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
      path: testInfo.outputPath('directory-filtered.png'),
      fullPage: true,
    });
    await page.fill('#q', 'nothing matches this text');
    await expect(page.locator('#empty')).toBeVisible();
    await page.screenshot({
      path: testInfo.outputPath('directory-empty.png'),
      fullPage: true,
    });
  });
});
