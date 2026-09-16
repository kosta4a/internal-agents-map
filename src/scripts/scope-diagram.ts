// ABOUTME: Sends small signals along the scope illustration's links, both ways.
// ABOUTME: The diagram reads the same without this: the signals only show it is two-way.

import { animate } from 'motion';

/** How long one signal takes to cross a link. */
const TRAVEL_SECONDS = 2.6;
/** How long the gap is before a signal sets off again. */
const REPEAT_SECONDS = 1.4;
/** The share of the crossing a signal spends fading in, and again fading out. */
const FADE = 0.15;

/** Readers who ask for less motion get the diagram still. */
function reducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Full at the middle of a crossing, nothing at either end. */
function fade(progress: number): number {
  if (progress < FADE) return progress / FADE;
  if (progress > 1 - FADE) return (1 - progress) / FADE;
  return 1;
}

/** Start the signals travelling between the agent and what it works with. */
export function startScopeDiagram(): void {
  const figure = document.querySelector('.scope-figure');
  if (!figure || reducedMotion()) return;

  for (const signal of figure.querySelectorAll<SVGCircleElement>('.scope-signal')) {
    const link = figure.querySelector<SVGPathElement>(`#scope-link-${signal.dataset.link}`);
    if (!link) continue;
    const span = link.getTotalLength();
    // A returning signal walks the same link backwards, from the point to the agent.
    const returning = signal.dataset.return !== undefined;

    animate(0, 1, {
      duration: TRAVEL_SECONDS,
      ease: 'linear',
      repeat: Infinity,
      repeatDelay: REPEAT_SECONDS,
      delay: Number(signal.dataset.delay ?? 0),
      onUpdate: (progress: number) => {
        const at = link.getPointAtLength((returning ? 1 - progress : progress) * span);
        signal.setAttribute('cx', String(at.x));
        signal.setAttribute('cy', String(at.y));
        signal.style.opacity = String(fade(progress));
      },
    });
  }
}
