// ABOUTME: Lists the clean paths of the authored guide and note pages.
// ABOUTME: Discovery files and the routing manifest add these to the catalog routes.
import { guidePath, notePath, notesIndexPath } from './routes';

/** The slugs of the published notes, in navigation order. */
export const NOTE_SLUGS = [
  'stop-a-run',
  'review-noise',
  'split-the-work',
  'work-can-continue',
  'load-tools',
  'steps-without-a-model',
  'test-on-your-work',
] as const;

/** Clean paths of every guide page and note, without the home page or entries. */
export async function contentPaths(): Promise<string[]> {
  return [
    guidePath('definitions'),
    guidePath('methodology'),
    notesIndexPath(),
    ...NOTE_SLUGS.map((slug) => notePath(slug)),
  ];
}
