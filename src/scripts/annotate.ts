// ABOUTME: Mounts the Agentation annotation toolbar into a host element of its own.
// ABOUTME: Development injects this; a production build never loads or bundles it.

import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Agentation } from 'agentation';

/** The id of the element the toolbar renders into, so a reload reuses it. */
const HOST_ID = 'agentation-host';

/** Put the toolbar on the page, once. */
export function startAnnotating(): void {
  if (document.getElementById(HOST_ID)) return;
  const host = document.createElement('div');
  host.id = HOST_ID;
  document.body.append(host);
  createRoot(host).render(createElement(Agentation));
}
