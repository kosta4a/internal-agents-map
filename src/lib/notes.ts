// ABOUTME: Reads the authored notes and turns their metadata into a reading model.
// ABOUTME: Pages, the entry view, the route list, and the exports all use it.

import { loadCatalog, type Catalog } from './catalog';
import { canonicalUrl, entryPath, notePath, notesIndexPath } from './routes';

/** One numbered source at the end of a note. */
export interface NoteSourceView {
  readonly id: string;
  /** The anchor the citations in the body point to. */
  readonly anchor: string;
  readonly title: string;
  readonly url: string;
  readonly note: string;
}

/** A link from a note to the entry page of an implementation it examines. */
export interface NoteCatalogLink {
  readonly id: string;
  readonly path: string;
  readonly label: string;
}

export interface NoteView {
  readonly slug: string;
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly eyebrow: string;
  readonly lede: string;
  readonly summary: string;
  readonly readingTime: string;
  readonly order: number;
  readonly publishedAt: string;
  readonly updatedAt: string | null;
  /** The date a reader sees: the update date when one exists. */
  readonly displayDate: string;
  readonly relatedAgentIds: readonly string[];
  readonly sources: readonly NoteSourceView[];
}

interface NoteFrontmatter {
  readonly title: string;
  readonly description: string;
  readonly eyebrow: string;
  readonly lede: string;
  readonly summary: string;
  readonly readingTime: string;
  readonly order: number;
  readonly publishedAt: string;
  readonly updatedAt?: string;
  readonly relatedAgentIds: readonly string[];
  readonly sources: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
    readonly url: string;
    readonly note: string;
  }>;
}

interface NoteModule {
  readonly frontmatter: NoteFrontmatter;
  /** The Markdown body of the file, without its metadata block. */
  rawContent(): string;
}

const modules = import.meta.glob<NoteModule>('../content/notes/*.md', { eager: true });

function slugOf(file: string): string {
  const name = file.split('/').pop() ?? file;
  return name.replace(/\.md$/, '');
}

function noteView(slug: string, data: NoteFrontmatter): NoteView {
  return {
    slug,
    path: notePath(slug),
    title: data.title,
    description: data.description,
    eyebrow: data.eyebrow,
    lede: data.lede,
    summary: data.summary,
    readingTime: data.readingTime,
    order: data.order,
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt ?? null,
    displayDate: data.updatedAt ?? data.publishedAt,
    relatedAgentIds: data.relatedAgentIds,
    sources: data.sources.map((source) => ({
      id: source.id,
      anchor: `source-${source.id}`,
      title: source.title,
      url: source.url,
      note: source.note,
    })),
  };
}

/**
 * Reject a note that points at an implementation the catalog does not hold.
 * The message names the note and the identifier, so the fix is obvious.
 */
export function assertRelatedAgentIds(
  notes: readonly NoteView[],
  approachIds: ReadonlySet<string>,
): void {
  for (const note of notes) {
    for (const id of note.relatedAgentIds) {
      if (!approachIds.has(id)) {
        throw new Error(`note "${note.slug}" lists unknown relatedAgentIds "${id}".`);
      }
    }
  }
}

/** Reject two notes that claim the same position in the reading order. */
function assertUniqueOrder(notes: readonly NoteView[]): void {
  const seen = new Map<number, string>();
  for (const note of notes) {
    const other = seen.get(note.order);
    if (other) {
      throw new Error(`notes "${other}" and "${note.slug}" both use order ${note.order}.`);
    }
    seen.set(note.order, note.slug);
  }
}

let cached: NoteView[] | undefined;

/** Every note, in reading order. The metadata is checked once per build. */
export function noteViews(): readonly NoteView[] {
  if (!cached) {
    const notes = Object.entries(modules)
      .map(([file, module]) => noteView(slugOf(file), module.frontmatter))
      .sort((a, b) => a.order - b.order);
    assertUniqueOrder(notes);
    assertRelatedAgentIds(notes, new Set(loadCatalog().approaches.map((a) => a.id)));
    cached = notes;
  }
  return cached;
}

/** One note. An unknown slug is an error, never an empty page. */
export function noteViewBySlug(slug: string): NoteView {
  const note = noteViews().find((item) => item.slug === slug);
  if (!note) throw new Error(`note "${slug}" is not in the notes collection.`);
  return note;
}

/** The notes that examine one implementation, in reading order. */
export function notesForApproach(approachId: string): Array<{
  slug: string;
  path: string;
  title: string;
}> {
  return noteViews()
    .filter((note) => note.relatedAgentIds.includes(approachId))
    .map((note) => ({ slug: note.slug, path: note.path, title: note.title }));
}

/** The note a reader reaches next. The last note returns to the first. */
export function nextNote(slug: string): { note: NoteView; isFirst: boolean } {
  const notes = noteViews();
  const index = notes.findIndex((item) => item.slug === slug);
  if (index < 0) throw new Error(`note "${slug}" is not in the notes collection.`);
  const next = notes[(index + 1) % notes.length]!;
  return { note: next, isFirst: index === notes.length - 1 };
}

/** The entry pages a note links to, labelled with the company name. */
export function noteCatalogLinks(catalog: Catalog, note: NoteView): NoteCatalogLink[] {
  return note.relatedAgentIds.map((id) => {
    const approach = catalog.approaches.find((item) => item.id === id);
    if (!approach) throw new Error(`note "${note.slug}" lists unknown relatedAgentIds "${id}".`);
    return { id, path: entryPath(id), label: `${approach.company} in the catalog` };
  });
}

/** The Markdown body of a note, as the author wrote it. */
export function noteBody(slug: string): string {
  const entry = Object.entries(modules).find(([file]) => slugOf(file) === slug);
  if (!entry) throw new Error(`note "${slug}" is not in the notes collection.`);
  return entry[1].rawContent();
}

/** Write a calendar date the way the notes show it, such as `11 September 2026`. */
export function longDate(date: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&nbsp;': ' ',
};

/**
 * Turn one authored diagram or inline block into plain text.
 * Links and bold text keep their Markdown form; decoration is removed.
 */
export function htmlToText(html: string): string {
  const withoutDecoration = html.replace(
    /<([a-z]+)[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/\1>/g,
    '',
  );
  const withMarkdown = withoutDecoration
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, '[$2]($1) ')
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/g, '**$1** ')
    // Inline labels lose their visual spacing when the tags go away.
    .replace(/<\/(span|small|em|time)>/g, ' ');
  const blocks = withMarkdown
    .replace(/<\/(div|p|figcaption|figure|li|ol|ul|h[1-6])>/g, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z#0-9]+;/gi, (entity) => ENTITIES[entity] ?? entity)
    .split('\n\n')
    .map((block) => block.replace(/\s+/g, ' ').trim())
    .filter((block) => block.length > 0);
  return blocks.join('\n\n');
}

/**
 * Turn the Markdown body of a note into the text of its export.
 * The layout elements are removed; prose, citations, and diagram text remain.
 */
export function noteBodyMarkdown(note: NoteView): string {
  const base = canonicalUrl(note.path);
  return noteBody(note.slug)
    .replace(/^<\/?section[^>]*>\s*$/gm, '')
    .replace(/<blockquote[\s\S]*?<\/blockquote>/g, (block) => `> ${htmlToText(block)}`)
    .replace(/<figure[\s\S]*?<\/figure>/g, (block) => htmlToText(block))
    .replace(/<p[\s\S]*?<\/p>/g, (block) => htmlToText(block))
    .replace(/\]\(#/g, `](${base}#`)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** The complete Markdown representation of one note. */
export function noteMarkdown(catalog: Catalog, note: NoteView): string {
  const notesUrl = canonicalUrl(notesIndexPath());
  const next = nextNote(note.slug);
  const dates = note.updatedAt
    ? `${longDate(note.publishedAt)} · Updated ${longDate(note.updatedAt)} · ${note.readingTime}`
    : `${longDate(note.publishedAt)} · ${note.readingTime}`;
  const sources = note.sources.map(
    (source, index) => `${index + 1}. [${source.title}](${source.url}) ${source.note}`,
  );
  const catalogLinks = noteCatalogLinks(catalog, note).map(
    (link) => `[${link.label}](${canonicalUrl(link.path)})`,
  );
  return [
    `Source: ${canonicalUrl(note.path)}`,
    `[← Notes](${notesUrl})`,
    note.eyebrow,
    `# ${note.title}`,
    note.lede,
    dates,
    noteBodyMarkdown(note),
    `## ${note.sources.length === 1 ? 'Source' : 'Sources'}`,
    sources.join('\n'),
    '### Related items',
    catalogLinks.join(' '),
    `[All notes](${notesUrl}) [${next.isFirst ? 'Read' : 'Next'}: ${next.note.title} →](${canonicalUrl(next.note.path)})`,
  ].join('\n\n');
}

/** A note's subject without its place in the sequence: "01 / Run limits" reads "Run limits". */
export function noteTopic(note: NoteView): string {
  return note.eyebrow.replace(/^\d+\s*\/\s*/, '');
}

/** The heading a note wears in a list: its subject, then the question it asks. */
export function notePreviewTitle(note: NoteView): string {
  return `${noteTopic(note)}: ${note.title}`;
}

/** The companies a note reads, in the order the note lists them. */
export function noteCompanies(catalog: Catalog, note: NoteView): string[] {
  return noteCatalogLinks(catalog, note).map((link) => link.label.replace(' in the catalog', ''));
}

/** The Markdown blocks that describe every note on the index. */
export function notePreviewsMarkdown(catalog: Catalog): string[] {
  return noteViews().flatMap((note) => [
    `## [${notePreviewTitle(note)}](${canonicalUrl(note.path)})`,
    note.summary,
    `${noteCompanies(catalog, note).join(' · ')} ${note.readingTime}`,
  ]);
}
