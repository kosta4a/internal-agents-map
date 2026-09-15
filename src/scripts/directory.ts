// ABOUTME: Filters the directory in the browser and resolves the old fragment links.
// ABOUTME: Every card and every entry link is already in the HTML; this only hides cards.

import { entryPath } from '../lib/routes';
import {
  FACET_KEYS,
  FACET_LABELS,
  type FacetTerm,
  findTerm,
  matchesFacets,
  matchesText,
  resolveTerm,
  suggest,
  toSelection,
} from '../lib/search';

/** The query parameters the directory reads and writes. They are part of the URL contract. */
const CONTROL_KEYS = ['q', ...FACET_KEYS] as const;

/** A claim anchor: `claim-<approach-id>--<field-path>`. */
const CLAIM_FRAGMENT = /^claim-([a-z0-9-]+)--([a-z0-9-]+)$/;
/** A source anchor: `source-<source-id>`. The card of its entry lists the source id. */
const SOURCE_FRAGMENT = /^source-([a-z0-9-]+)$/;
/** An approach identifier on its own. */
const APPROACH_FRAGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** How long the search field waits before it writes a history entry. */
const SEARCH_DELAY = 250;

/** The identifiers of the implementations this page carries, one per card. */
function approachIds(cards: readonly HTMLElement[]): ReadonlySet<string> {
  return new Set(cards.map((card) => card.dataset.approachId ?? ''));
}

/** The entry of every source identifier the cards list. */
function sourceOwners(cards: readonly HTMLElement[]): ReadonlyMap<string, string> {
  const owners = new Map<string, string>();
  for (const card of cards) {
    const approach = card.dataset.approachId ?? '';
    for (const id of (card.dataset.sourceIds ?? '').split(' ')) if (id) owners.set(id, approach);
  }
  return owners;
}

/**
 * Find the entry page an old homepage fragment belongs to.
 * The path comes from the route helper and a known identifier. The anchor is
 * rebuilt from the matched parts, so no text of the fragment reaches the URL raw.
 */
export function legacyTarget(
  hash: string,
  ids: ReadonlySet<string>,
  sources: ReadonlyMap<string, string>,
): string | null {
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
  const owner = source ? sources.get(source[1]!) : undefined;
  if (source && owner && ids.has(owner)) {
    return `${entryPath(owner)}#source-${source[1]!}`;
  }
  if (APPROACH_FRAGMENT.test(fragment) && ids.has(fragment)) return entryPath(fragment);
  return null;
}

function element<T extends Element>(id: string, type: new () => T): T {
  const node = document.getElementById(id);
  if (!(node instanceof type)) throw new Error(`The directory has no "${id}" element.`);
  return node;
}

/** The facet vocabulary the page carries as JSON, so the script and the cards agree. */
function readVocabulary(): FacetTerm[] {
  const node = document.getElementById('facet-vocabulary');
  return node ? (JSON.parse(node.textContent ?? '[]') as FacetTerm[]) : [];
}

function sameTerm(a: FacetTerm, b: FacetTerm): boolean {
  return a.key === b.key && a.id === b.id;
}

/** Start the directory: legacy links first, then the search box. */
export function startDirectory(): void {
  const cards = [...document.querySelectorAll<HTMLElement>('.entry[data-approach-id]')];
  const ids = approachIds(cards);
  const sources = sourceOwners(cards);
  const target = legacyTarget(location.hash, ids, sources);
  if (target) {
    location.replace(target);
    return;
  }
  // An old link can also arrive as a fragment change inside this page.
  window.addEventListener('hashchange', () => {
    const next = legacyTarget(location.hash, ids, sources);
    if (next) location.replace(next);
  });

  const form = document.getElementById('filters');
  const results = document.getElementById('results');
  const empty = document.getElementById('empty');
  if (!(form instanceof HTMLFormElement) || !results || !empty || cards.length === 0) return;

  const input = element('q', HTMLInputElement);
  const chips = element('chips', HTMLUListElement);
  const listbox = element('suggestions', HTMLUListElement);
  const vocabulary = readVocabulary();

  /** The selected facet terms, in the order they were chosen. */
  let selected: FacetTerm[] = [];
  /** The suggestions on show and the one the arrow keys point at. */
  let shown: FacetTerm[] = [];
  let active = -1;
  let searchTimer: ReturnType<typeof setTimeout> | undefined;

  const cardFacets = (card: HTMLElement) => ({
    work: (card.dataset.work ?? '').split(' '),
    type: (card.dataset.type ?? '').split(' '),
    supervision: (card.dataset.supervision ?? '').split(' '),
  });

  const matches = (card: HTMLElement): boolean =>
    matchesText(card.dataset.search ?? '', input.value) &&
    matchesFacets(cardFacets(card), toSelection(selected));

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

  const renderChips = (): void => {
    chips.replaceChildren(
      ...selected.map((term) => {
        const chip = document.createElement('li');
        chip.className = 'chip';
        chip.dataset.key = term.key;
        chip.dataset.id = term.id;
        const key = document.createElement('span');
        key.className = 'chip-key';
        key.textContent = FACET_LABELS[term.key];
        const label = document.createElement('span');
        label.textContent = term.label;
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'chip-remove';
        remove.setAttribute('aria-label', `Remove ${FACET_LABELS[term.key]}: ${term.label}`);
        remove.textContent = '×';
        remove.addEventListener('click', () => {
          selected = selected.filter((item) => !sameTerm(item, term));
          commit();
          input.focus();
        });
        chip.append(key, label, remove);
        return chip;
      }),
    );
  };

  const closeSuggestions = (): void => {
    shown = [];
    active = -1;
    listbox.replaceChildren();
    listbox.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  };

  const markActive = (): void => {
    [...listbox.children].forEach((item, index) => {
      item.setAttribute('aria-selected', String(index === active));
    });
    if (active >= 0) input.setAttribute('aria-activedescendant', `suggestion-${active}`);
    else input.removeAttribute('aria-activedescendant');
  };

  const renderSuggestions = (): void => {
    shown = suggest(input.value, vocabulary, selected);
    active = -1;
    if (shown.length === 0) {
      closeSuggestions();
      return;
    }
    listbox.replaceChildren(
      ...shown.map((term, index) => {
        const item = document.createElement('li');
        item.id = `suggestion-${index}`;
        item.className = 'suggestion';
        item.setAttribute('role', 'option');
        item.setAttribute('aria-selected', 'false');
        item.dataset.key = term.key;
        item.dataset.id = term.id;
        const key = document.createElement('span');
        key.className = 'chip-key';
        key.textContent = FACET_LABELS[term.key];
        const label = document.createElement('span');
        label.textContent = term.label;
        item.append(key, label);
        // Mouse down would move focus off the input and close the list before the click lands.
        item.addEventListener('mousedown', (event) => event.preventDefault());
        item.addEventListener('click', () => choose(term));
        return item;
      }),
    );
    listbox.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  };

  const writeUrl = (): void => {
    const url = new URL(location.href);
    for (const key of CONTROL_KEYS) url.searchParams.delete(key);
    if (input.value) url.searchParams.set('q', input.value);
    for (const term of selected) url.searchParams.append(term.key, term.id);
    if (url.href !== location.href) history.pushState(null, '', url);
  };

  /** Read the state a shared or restored URL carries. Unknown values are dropped. */
  const readUrl = (): void => {
    const params = new URLSearchParams(location.search);
    input.value = params.get('q') ?? '';
    selected = [];
    for (const key of FACET_KEYS) {
      for (const id of params.getAll(key)) {
        const term = findTerm(key, id, vocabulary);
        if (term && !selected.some((item) => sameTerm(item, term))) selected.push(term);
      }
    }
  };

  /** Record the current state in the address and on the page. */
  const commit = (): void => {
    clearTimeout(searchTimer);
    closeSuggestions();
    renderChips();
    writeUrl();
    apply();
  };

  const choose = (term: FacetTerm): void => {
    if (!selected.some((item) => sameTerm(item, term))) selected = [...selected, term];
    input.value = '';
    commit();
    input.focus();
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const term = shown[active] ?? resolveTerm(input.value, vocabulary);
    if (term) choose(term);
    else commit();
  });
  input.addEventListener('input', () => {
    clearTimeout(searchTimer);
    apply();
    renderSuggestions();
    searchTimer = setTimeout(() => writeUrl(), SEARCH_DELAY);
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' && shown.length > 0) {
      event.preventDefault();
      active = (active + 1) % shown.length;
      markActive();
    } else if (event.key === 'ArrowUp' && shown.length > 0) {
      event.preventDefault();
      active = (active - 1 + shown.length) % shown.length;
      markActive();
    } else if (event.key === 'Escape' && shown.length > 0) {
      event.preventDefault();
      closeSuggestions();
    } else if (event.key === 'Backspace' && input.value === '' && selected.length > 0) {
      event.preventDefault();
      selected = selected.slice(0, -1);
      commit();
    }
  });
  input.addEventListener('blur', () => closeSuggestions());
  form.addEventListener('reset', (event) => {
    event.preventDefault();
    input.value = '';
    selected = [];
    commit();
  });
  window.addEventListener('popstate', () => {
    clearTimeout(searchTimer);
    closeSuggestions();
    readUrl();
    renderChips();
    apply();
  });

  form.hidden = false;
  readUrl();
  renderChips();
  apply();
}
