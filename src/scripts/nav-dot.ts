// ABOUTME: Puts the sidebar's dot beside the link for the page being read.
// ABOUTME: Without this the sidebar still names the page; it simply has no dot.

/** Put the dot beside the current page's link, wherever that link is. */
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
  dot.style.top = `${current.offsetTop + current.offsetHeight / 2}px`;
}
