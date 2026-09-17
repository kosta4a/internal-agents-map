// ABOUTME: Lists the clean paths of the authored guide and note pages.
// ABOUTME: Discovery files and the routing manifest add these to the catalog routes.
import { noteViews } from './notes';
import { guidePath, notesIndexPath } from './routes';

/** Clean paths of every guide page and note, without the home page or entries. */
export async function contentPaths(): Promise<string[]> {
  return [
    '/infrastructure',
    guidePath('definitions'),
    guidePath('methodology'),
    notesIndexPath(),
    ...noteViews().map((note) => note.path),
  ];
}
