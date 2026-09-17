// ABOUTME: Filters the directory in the browser and resolves the old fragment links.
// ABOUTME: Every card and every entry link is already in the HTML; this only hides cards.

import { animate } from 'motion';

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

/** How long a card takes to collapse out of the list, or expand back into it. */
const COLLAPSE_SECONDS = 0.32;
const COLLAPSE_EASE = [0.3, 0.7, 0.3, 1] as const;
/** How long the item tally takes to count to a new total. */
const COUNT_SECONDS = 0.3;

/** Readers who ask for less motion get the instant result instead. */
function reducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}
/** What each card is animating toward, so a repeated pass does not restart it. */
const desired = new WeakMap<HTMLElement, boolean>();
/**
 * The first pass only states where the cards already are. Animating it would
 * measure across the font swap and walk every card to its own height, which
 * reads as the list settling into place after the page has drawn.
 */
let settled = false;

/**
 * Show or hide one card, collapsing its height so the list closes smoothly.
 * The `hidden` attribute stays the source of truth: it is set once the card has
 * finished collapsing, and cleared before it starts to expand.
 */
function reveal(card: HTMLElement, visible: boolean): void {
  if (desired.get(card) === visible) return;
  desired.set(card, visible);

  if (!settled || reducedMotion()) {
    card.hidden = !visible;
    return;
  }

  // Measure where the card is now, so an interrupted animation carries on from there.
  const from = card.hidden ? 0 : card.getBoundingClientRect().height;
  const fromMargin = card.hidden ? '0px' : getComputedStyle(card).marginBottom;
  card.style.overflow = 'hidden';

  const clear = (): void => {
    for (const property of ['height', 'overflow', 'opacity', 'margin-bottom']) {
      card.style.removeProperty(property);
    }
  };

  /**
   * Settle on the end state once the animation is done, or once its time is up.
   * Motion pauses while the document is hidden, so waiting only on the animation
   * would leave a filtered-out card on screen.
   */
  const settle = (animation: { finished: Promise<unknown> }, done: () => void): void => {
    let ran = false;
    const once = (): void => {
      if (ran) return;
      ran = true;
      done();
    };
    animation.finished.then(once, once);
    setTimeout(once, COLLAPSE_SECONDS * 1000 + 60);
  };

  if (visible) {
    // Let the card lay out at its natural size to read the height to expand into.
    card.hidden = false;
    for (const property of ['height', 'margin-bottom']) {
      card.style.removeProperty(property);
    }
    const margin = getComputedStyle(card).marginBottom;
    const to = card.getBoundingClientRect().height;
    settle(
      animate(
        card,
        {
          height: [`${from}px`, `${to}px`],
          marginBottom: [fromMargin, margin],
          opacity: [from === 0 ? 0 : 1, 1],
        },
        { duration: COLLAPSE_SECONDS, ease: COLLAPSE_EASE },
      ),
      // A later pass may have reversed this one; leave that animation alone.
      () => {
        if (desired.get(card) === true) clear();
      },
    );
    return;
  }

  settle(
    animate(
      card,
      {
        height: [`${from}px`, '0px'],
        marginBottom: [fromMargin, '0px'],
        opacity: [1, 0],
      },
      { duration: COLLAPSE_SECONDS, ease: COLLAPSE_EASE },
    ),
    () => {
      if (desired.get(card) !== false) return;
      card.hidden = true;
      clear();
    },
  );
}

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
  const shortcut = document.getElementById('search-shortcut');
  if (shortcut) shortcut.textContent = /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? '⌘ K' : 'Ctrl K';
  const chips = element('chips', HTMLUListElement);
  const listbox = element('suggestions', HTMLUListElement);
  const vocabulary = readVocabulary();
  const legacyNotice = document.getElementById('legacy-filter-notice');

  /** The selected facet terms, in the order they were chosen. */
  let selected: FacetTerm[] = [];
  /** The suggestions on show and the one the arrow keys point at. */
  let shown: FacetTerm[] = [];
  let active = -1;
  let searchTimer: ReturnType<typeof setTimeout> | undefined;

  const cardFacets = (card: HTMLElement) => ({
    work: (card.dataset.work ?? '').split(' '),
    type: (card.dataset.type ?? '').split(' '),
    invocation: (card.dataset.invocation ?? '').split(' '),
    supervision: (card.dataset.supervision ?? '').split(' '),
  });

  const matches = (card: HTMLElement): boolean =>
    matchesText(card.dataset.search ?? '', input.value) &&
    matchesFacets(cardFacets(card), toSelection(selected));

  const display = document.getElementById('results-count');
  let shownCount = cards.length;
  let counting: { stop: () => void } | undefined;
  let countTimer: ReturnType<typeof setTimeout> | undefined;

  /** Move the visible tally to `next`, counting through the numbers between. */
  const showCount = (next: number): void => {
    const text = `${next} items`;
    // The live region carries the settled wording, never the frames between.
    if (results.textContent !== text) results.textContent = text;
    if (!display || shownCount === next) return;
    const from = shownCount;
    shownCount = next;
    if (reducedMotion()) {
      display.textContent = text;
      return;
    }
    counting?.stop();
    clearTimeout(countTimer);
    counting = animate(from, next, {
      duration: COUNT_SECONDS,
      ease: COLLAPSE_EASE,
      onUpdate: (value: number) => {
        display.textContent = `${Math.round(value)} items`;
      },
    });
    // Motion pauses while the document is hidden, so land the final value anyway.
    countTimer = setTimeout(() => {
      if (shownCount === next) display.textContent = text;
    }, COUNT_SECONDS * 1000 + 60);
  };

  const apply = (): void => {
    let count = 0;
    for (const card of cards) {
      const visible = matches(card);
      reveal(card, visible);
      if (visible) count += 1;
    }
    showCount(count);
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
    if (legacyNotice) legacyNotice.hidden = true;
  };

  /** Read the state a shared or restored URL carries. Unknown values are dropped. */
  const readUrl = (): void => {
    const params = new URLSearchParams(location.search);
    input.value = params.get('q') ?? '';
    selected = [];
    let legacyBackground = false;
    for (const key of FACET_KEYS) {
      for (const id of params.getAll(key)) {
        const migrated = key === 'type' && id === 'task-agent' ? 'agent' : id;
        if (key === 'type' && id === 'background-agent') {
          legacyBackground = true;
          continue;
        }
        const term = findTerm(key, migrated, vocabulary);
        if (term && !selected.some((item) => sameTerm(item, term))) selected.push(term);
      }
    }
    if (legacyNotice) legacyNotice.hidden = !legacyBackground;
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
  // Everything after this first pass is a change the reader made.
  settled = true;
}
