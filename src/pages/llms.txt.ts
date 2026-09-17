// ABOUTME: Tells a machine reader which catalog files to fetch and how to cite them.
// ABOUTME: The link list comes from the publication inventory, so it never goes stale.
import type { APIRoute } from 'astro';
import { loadCatalog } from '../lib/catalog';
import { contentPaths } from '../lib/content-routes';
import { termLabel } from '../lib/labels';
import { noteViews } from '../lib/notes';
import { SITE_NAME } from '../lib/metadata';
import { ORIGIN, homePath, markdownPath, notePath } from '../lib/routes';

/** The label of one guide or note. A note carries its authored title. */
function pageLabel(path: string, noteTitles: ReadonlyMap<string, string>): string {
  return noteTitles.get(path) ?? termLabel(path.slice(path.lastIndexOf('/') + 1));
}

/** One Markdown link line for the list of readable documents. */
function line(label: string, path: string): string {
  return `- [${label}](${ORIGIN}${path})\n`;
}

/** Build the guidance file from the paths the build publishes. */
export function llmsTxt(paths: readonly string[], noteTitles: ReadonlyMap<string, string>): string {
  return (
    `# ${SITE_NAME}\n\n` +
    '> A source-backed catalog of AI systems organizations build or adapt for their own teams.\n\n' +
    'Read the compact index first, then fetch individual records for relevant systems. The historical agents.json and agents/index.json endpoints contain both agents and infrastructure; use catalog_section to distinguish them. ' +
    'Preserve claim qualifications, dates, confidence, and contradicting evidence. ' +
    'Cite original sources; catalog judgments and company-reported metrics are not ' +
    'independent verification.\n\n' +
    line('Compact catalog index', '/agents/index.json') +
    line('Data and evidence guide', '/data-guide.md') +
    line('Complete dataset', '/agents.json') +
    line('Agents in Markdown', markdownPath(homePath())) +
    paths.map((path) => line(pageLabel(path, noteTitles), markdownPath(path))).join('')
  );
}

export const GET: APIRoute = async () => {
  loadCatalog();
  const noteTitles = new Map(noteViews().map((note) => [notePath(note.slug), note.title]));
  return new Response(llmsTxt(await contentPaths(), noteTitles), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
