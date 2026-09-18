// ABOUTME: Carries the sidebar's current-page dot from one link to the next.
// ABOUTME: Without this the dot still marks the page; it simply appears there.

import { animate } from 'motion';

/** How long the dot takes to cross to its new link. */
const TRAVEL_SECONDS = 0.44;
/** How far the dot bows out of the straight line on its way. */
const ARC = 7;

/** Where the dot was left, so the next page can carry it from there. */
let resting: number | null = null;

/** Readers who ask for less motion get the dot in its place, without the journey. */
function reducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Put the dot beside the current page's link, travelling there if it has a place to leave. */
export function startNavDot(): void {
  const nav = document.querySelector<HTMLElement>('.nav-links');
  const dot = nav?.querySelector<HTMLElement>('.nav-dot');
  const current = nav?.querySelector<HTMLElement>('a[aria-current="page"]');
  if (!nav || !dot) return;
  if (!current) {
    dot.hidden = true;
    return;
  }

  dot.hidden = false;
  const to = current.offsetTop + current.offsetHeight / 2;
  const from = resting;
  resting = to;

  if (from === null || from === to || reducedMotion()) {
    dot.style.top = `${to}px`;
    return;
  }

  // The dot keeps its place in the list and bows out of the line as it travels.
  dot.style.top = `${to}px`;
  animate(0, 1, {
    duration: TRAVEL_SECONDS,
    ease: [0.34, 1.2, 0.34, 1],
    onUpdate: (progress: number) => {
      const y = from + (to - from) * progress - to;
      const x = -ARC * Math.sin(Math.PI * progress);
      dot.style.transform = `translate(${x}px, ${y}px)`;
    },
  }).finished.then(
    () => dot.style.removeProperty('transform'),
    () => dot.style.removeProperty('transform'),
  );
}
