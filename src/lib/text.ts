// ABOUTME: Shortens catalog prose for cards and page descriptions.
// ABOUTME: The full text always stays on the entry page it belongs to.

/** Cut text on a word boundary, so a qualification is never half-shown. */
export function shorten(text: string, limit: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= limit) return clean;
  const cut = clean.slice(0, limit);
  const boundary = cut.lastIndexOf(' ');
  return `${(boundary > limit / 3 ? cut.slice(0, boundary) : cut).replace(/[,;:.\s]+$/, '')}…`;
}
