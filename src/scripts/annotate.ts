// ABOUTME: Mounts the Agentation annotation toolbar into a host element of its own.
// ABOUTME: Explicitly opted-in development injects this; production never bundles it.

import { createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Agentation } from 'agentation';

/** The id of the element the toolbar renders into, so a reload reuses it. */
const HOST_ID = 'agentation-host';

/** The toolbar's root and the element it renders into, kept across page changes. */
let root: Root | null = null;
let host: HTMLElement | null = null;

/**
 * The style elements the toolbar's own modules put in the head. They carry an
 * id and nothing else; the site's own styles are the ones the dev server marks.
 */
function toolbarStyles(): HTMLStyleElement[] {
  return [...document.querySelectorAll<HTMLStyleElement>('head > style[id]')].filter(
    (style) => style.dataset.viteDevId === undefined,
  );
}

/** Put the toolbar on the page, unless the one already there is still standing. */
function mount(): void {
  if (host?.isConnected) return;
  root?.unmount();
  host = document.createElement('div');
  host.id = HOST_ID;
  document.body.append(host);
  root = createRoot(host);
  root.render(createElement(Agentation));
}

/** Show the toolbar, and keep showing it as the reader moves between pages. */
export function startAnnotating(): void {
  mount();
  /*
   * A page change swaps the head and the body, which drops both the toolbar and
   * the styles its modules injected — leaving the markup to draw itself bare.
   * The styles are carried into the arriving document, and the toolbar, whose
   * host went with the old body, is mounted again on the new one.
   */
  document.addEventListener('astro:before-swap', (event) => {
    const { newDocument } = event as unknown as { newDocument: Document };
    for (const style of toolbarStyles()) newDocument.head.append(style.cloneNode(true));
  });
  document.addEventListener('astro:page-load', mount);
}
