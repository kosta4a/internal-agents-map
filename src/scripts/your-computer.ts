// ABOUTME: Names the reader's own machine in the diagram of where an agent runs.
// ABOUTME: The browser reports a platform, never a model, so this says "Your Mac", not the model.

/**
 * What the browser says the reader is on.
 * A page cannot learn the model of a machine: the platform is as far as it goes,
 * and nothing here leaves the page. Anything unrecognized keeps the written label.
 */
function platformName(): string | null {
  const hinted = (navigator as { userAgentData?: { platform?: string } }).userAgentData;
  const platform = `${hinted?.platform ?? ''} ${navigator.userAgent}`;
  if (/iPad/.test(platform)) return 'Your iPad';
  if (/iPhone/.test(platform)) return 'Your iPhone';
  if (/Android/i.test(platform)) return 'Your Android phone';
  if (/Mac/i.test(platform)) return 'Your Mac';
  if (/Windows/i.test(platform)) return 'Your Windows PC';
  if (/Linux|X11|CrOS/i.test(platform)) return 'Your Linux computer';
  return null;
}

/** Name the reader's machine where the diagram means theirs, and only there. */
export function startYourComputer(): void {
  const name = platformName();
  if (!name) return;
  for (const label of document.querySelectorAll<HTMLElement>('[data-your-computer]')) {
    label.textContent = name;
  }
}
