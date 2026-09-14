// ABOUTME: Filters the directory in the browser and resolves the old fragment links.
// ABOUTME: Every card and every entry link is already in the HTML; this only hides cards.

import { entryPath } from '../lib/routes';

/** The query parameters the directory reads and writes. They are part of the URL contract. */
const FILTER_KEYS = ['work', 'type', 'supervision'] as const;
const CONTROL_KEYS = ['q', ...FILTER_KEYS] as const;

type FilterKey = (typeof FILTER_KEYS)[number];
type ControlKey = (typeof CONTROL_KEYS)[number];

/** A claim anchor: `claim-<approach-id>--<field-path>`. */
const CLAIM_FRAGMENT = /^claim-([a-z0-9-]+)--([a-z0-9-]+)$/;
/** A source anchor: `source-<approach-id>-source-<number>`. */
const SOURCE_FRAGMENT = /^source-([a-z0-9-]+)-source-([0-9]+)$/;
/** An approach identifier on its own. */
const APPROACH_FRAGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** How long the search field waits before it writes a history entry. */
const SEARCH_DELAY = 250;

function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, ' ').trim();
}

/** The identifiers of the implementations this page carries, one per card. */
function approachIds(cards: readonly HTMLElement[]): ReadonlySet<string> {
  return new Set(cards.map((card) => card.dataset.approachId ?? ''));
}

/**
 * Find the entry page an old homepage fragment belongs to.
 * The path comes from the route helper and a known identifier. The anchor is
 * rebuilt from the matched parts, so no text of the fragment reaches the URL raw.
 */
export function legacyTarget(hash: string, ids: ReadonlySet<string>): string | null {
  let fragment: string;
  try {
    fragment = decodeURIComponent(hash.replace(/^#/, ''));
  } catch {
    return null;
  }
  if (!fragment) return null;
  const claim = CLAIM_FRAGMENT.exec(fragment);
  if (claim && ids.has(claim[1]!)) {
    return `${entryPath(claim[1]!)}#claim-${claim[1]!}--${claim[2]!}`;
  }
  const source = SOURCE_FRAGMENT.exec(fragment);
  if (source && ids.has(source[1]!)) {
    return `${entryPath(source[1]!)}#source-${source[1]!}-source-${source[2]!}`;
  }
  if (APPROACH_FRAGMENT.test(fragment) && ids.has(fragment)) return entryPath(fragment);
  return null;
}

function control(form: HTMLFormElement, key: ControlKey): HTMLInputElement | HTMLSelectElement {
  const element = form.elements.namedItem(key);
  if (!(element instanceof HTMLInputElement) && !(element instanceof HTMLSelectElement)) {
    throw new Error(`The filter form has no "${key}" control.`);
  }
  return element;
}

/** Start the directory: legacy links first, then search and filters. */
export function startDirectory(): void {
  const cards = [...document.querySelectorAll<HTMLElement>('.entry[data-approach-id]')];
  const ids = approachIds(cards);
  const target = legacyTarget(location.hash, ids);
  if (target) {
    location.replace(target);
    return;
  }
  // An old link can also arrive as a fragment change inside this page.
  window.addEventListener('hashchange', () => {
    const next = legacyTarget(location.hash, ids);
    if (next) location.replace(next);
  });

  const form = document.getElementById('filters');
  const results = document.getElementById('results');
  const empty = document.getElementById('empty');
  if (!(form instanceof HTMLFormElement) || !results || !empty || cards.length === 0) return;

  const controls = {
    q: control(form, 'q'),
    work: control(form, 'work'),
    type: control(form, 'type'),
    supervision: control(form, 'supervision'),
  };
  let searchTimer: ReturnType<typeof setTimeout> | undefined;

  const matches = (card: HTMLElement): boolean => {
    if (!(card.dataset.search ?? '').includes(normalize(controls.q.value))) return false;
    return FILTER_KEYS.every((key: FilterKey) => {
      const wanted = controls[key].value;
      return wanted === '' || (card.dataset[key] ?? '').split(' ').includes(wanted);
    });
  };

  const apply = (): void => {
    let count = 0;
    for (const card of cards) {
      card.hidden = !matches(card);
      if (!card.hidden) count += 1;
    }
    const text = `${count} of ${cards.length} approaches`;
    if (results.textContent !== text) results.textContent = text;
    empty.hidden = count !== 0;
  };

  const writeUrl = (): void => {
    const url = new URL(location.href);
    for (const key of CONTROL_KEYS) {
      const value = controls[key].value;
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    if (url.href !== location.href) history.pushState(null, '', url);
  };

  /** Read the state a shared or restored URL carries. Unknown values are dropped. */
  const readUrl = (): void => {
    const params = new URLSearchParams(location.search);
    for (const key of CONTROL_KEYS) {
      const value = params.get(key) ?? '';
      const element = controls[key];
      element.value =
        element instanceof HTMLInputElement ||
        [...element.options].some((option) => option.value === value)
          ? value
          : '';
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearTimeout(searchTimer);
    writeUrl();
    apply();
  });
  controls.q.addEventListener('input', () => {
    clearTimeout(searchTimer);
    apply();
    searchTimer = setTimeout(() => writeUrl(), SEARCH_DELAY);
  });
  for (const key of FILTER_KEYS) {
    controls[key].addEventListener('change', () => {
      clearTimeout(searchTimer);
      writeUrl();
      apply();
    });
  }
  form.addEventListener('reset', (event) => {
    event.preventDefault();
    clearTimeout(searchTimer);
    for (const key of CONTROL_KEYS) controls[key].value = '';
    writeUrl();
    apply();
  });
  window.addEventListener('popstate', () => {
    clearTimeout(searchTimer);
    readUrl();
    apply();
  });

  form.hidden = false;
  readUrl();
  apply();
}
