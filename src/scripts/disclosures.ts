// ABOUTME: Opens and closes a disclosure smoothly instead of snapping to its new height.
// ABOUTME: The <details> element stays the source of truth, so without this script it still opens.

import { animate } from 'motion';

/** How long a disclosure takes to open or close. */
const TOGGLE_SECONDS = 0.28;
const TOGGLE_EASE = [0.3, 0.7, 0.3, 1] as const;

/** Readers who ask for less motion get the browser's own instant toggle. */
function reducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Settle on the end state once the animation is done, or once its time is up.
 * Motion pauses while the document is hidden, so waiting only on the animation
 * would leave a disclosure stranded part-way open.
 */
function settle(animation: { finished: Promise<unknown> }, done: () => void): void {
  let ran = false;
  const once = (): void => {
    if (ran) return;
    ran = true;
    done();
  };
  animation.finished.then(once, once);
  setTimeout(once, TOGGLE_SECONDS * 1000 + 60);
}

/** The chevron that reports whether a disclosure is open, if it has one. */
function marker(details: HTMLDetailsElement): HTMLElement | null {
  return details.querySelector<HTMLElement>(':scope > summary > .icon');
}

/** Animate one disclosure's own height, so its contents slide into place. */
function start(details: HTMLDetailsElement, chevron: HTMLElement): void {
  let height: { stop: () => void; finished: Promise<unknown> } | undefined;
  let turn: { stop: () => void } | undefined;
  /** Which toggle owns the element, so a stale one cannot clear a live animation. */
  let generation = 0;

  details.addEventListener('click', (event) => {
    const summary = event.target instanceof Element ? event.target.closest('summary') : null;
    if (!summary || summary.parentElement !== details) return;
    if (reducedMotion()) return;
    // The element toggles on its own once the animation has run.
    event.preventDefault();

    const opening = !details.open;
    // Read where it is now, mid-animation included, before clearing that height.
    const from = details.getBoundingClientRect().height;
    height?.stop();
    turn?.stop();
    details.style.removeProperty('height');

    // Measure the target state, then hold the contents open while they move.
    details.open = opening;
    const to = details.getBoundingClientRect().height;
    details.open = true;
    details.style.overflow = 'hidden';

    height = animate(
      details,
      { height: [`${from}px`, `${to}px`] },
      { duration: TOGGLE_SECONDS, ease: TOGGLE_EASE },
    );
    // The animation writes its last frame after it resolves, so clear on the next one.
    const mine = ++generation;
    settle(height, () =>
      requestAnimationFrame(() => {
        if (generation !== mine) return;
        height?.stop();
        details.style.removeProperty('height');
        details.style.removeProperty('overflow');
        details.open = opening;
      }),
    );
    turn = animate(
      chevron,
      { rotate: opening ? 180 : 0 },
      { duration: TOGGLE_SECONDS, ease: TOGGLE_EASE },
    );
  });
}

/** Give every chevron disclosure on the page its opening motion. */
export function startDisclosures(): void {
  for (const details of document.querySelectorAll<HTMLDetailsElement>('details')) {
    const chevron = marker(details);
    if (chevron) start(details, chevron);
  }
}
