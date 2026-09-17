// ABOUTME: Checks that every note loads, points at real entries, and keeps its sources.
// ABOUTME: It also checks the clean paths that the discovery files and the manifest read.

import { describe, expect, it } from 'vitest';
import { loadCatalog } from '../../src/lib/catalog';
import { contentPaths } from '../../src/lib/content-routes';
import {
  assertRelatedAgentIds,
  htmlToText,
  nextNote,
  noteBody,
  noteCatalogLinks,
  noteMarkdown,
  noteViewBySlug,
  noteViews,
  notesForApproach,
  type NoteView,
} from '../../src/lib/notes';
import { entryPath, guidePath, notePath, notesIndexPath } from '../../src/lib/routes';

const catalog = loadCatalog();
const notes = noteViews();

const SLUGS = [
  'stop-a-run',
  'review-noise',
  'split-the-work',
  'work-can-continue',
  'load-tools',
  'steps-without-a-model',
  'test-on-your-work',
];

describe('the notes collection', () => {
  it('loads every published note in reading order', () => {
    expect(notes.map((note) => note.slug)).toEqual(SLUGS);
    expect(notes.map((note) => note.order)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('gives every note the metadata a page needs', () => {
    for (const note of notes) {
      expect(note.title.length).toBeGreaterThan(0);
      expect(note.description.length).toBeGreaterThan(0);
      expect(note.lede.length).toBeGreaterThan(0);
      expect(note.summary.length).toBeGreaterThan(0);
      expect(note.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(note.path).toBe(notePath(note.slug));
      expect(note.sources.length).toBeGreaterThan(0);
    }
  });

  it('resolves every related implementation to a catalog entry', () => {
    const ids = new Set(catalog.approaches.map((approach) => approach.id));
    for (const note of notes) {
      expect(note.relatedAgentIds.length).toBeGreaterThan(0);
      for (const id of note.relatedAgentIds) expect(ids.has(id)).toBe(true);
      for (const link of noteCatalogLinks(catalog, note)) {
        expect(link.path).toBe(entryPath(link.id));
        expect(link.label.endsWith(' in the catalog')).toBe(true);
      }
    }
  });

  it('names the note and the identifier when a related implementation is unknown', () => {
    const broken = { ...notes[0]!, slug: 'a-test-note', relatedAgentIds: ['no-such-agent'] };
    expect(() => assertRelatedAgentIds([broken as NoteView], new Set(['stripe-minions']))).toThrow(
      'note "a-test-note" lists unknown relatedAgentIds "no-such-agent".',
    );
  });

  it('cites only sources the note declares', () => {
    for (const note of notes) {
      const declared = new Set(note.sources.map((source) => source.anchor));
      const cited = [...noteBody(note.slug).matchAll(/#(source-[a-z0-9-]+)/g)].map(
        (match) => match[1]!,
      );
      expect(cited.length).toBeGreaterThan(0);
      for (const anchor of cited) expect(declared.has(anchor)).toBe(true);
    }
  });

  it('reads on from the last note to the first', () => {
    expect(nextNote('stop-a-run')).toMatchObject({ isFirst: false });
    expect(nextNote('stop-a-run').note.slug).toBe('review-noise');
    const wrap = nextNote('test-on-your-work');
    expect(wrap.isFirst).toBe(true);
    expect(wrap.note.slug).toBe('stop-a-run');
  });
});

describe('related reading', () => {
  it('finds the notes that examine one implementation', () => {
    expect(notesForApproach('stripe-minions').map((note) => note.slug)).toEqual([
      'stop-a-run',
      'steps-without-a-model',
    ]);
    expect(notesForApproach('airbnb-airchat')).toEqual([]);
  });

  it('links to the note by its clean path', () => {
    for (const note of notesForApproach('uber-ureview')) {
      expect(note.path).toBe(notePath(note.slug));
      expect(note.title).toBe(noteViewBySlug(note.slug).title);
    }
  });
});

describe('the Markdown export of a note', () => {
  const note = noteViewBySlug('stop-a-run');
  const markdown = noteMarkdown(catalog, note);

  it('keeps the citations, the diagram text, and the sources', () => {
    expect(markdown).toContain('Source: https://internal-agents.com/notes/stop-a-run');
    expect(markdown).toContain('[[1]](https://internal-agents.com/notes/stop-a-run#source-stripe)');
    expect(markdown).toContain(
      '**Budget exhausted** Stop and return the current work, failed checks, and reason for stopping.',
    );
    expect(markdown).toContain(
      'Our proposed control flow. A passing check still leaves any required human approval in place.',
    );
    for (const source of note.sources) expect(markdown).toContain(source.url);
  });

  it('sends the catalog links to the entry pages', () => {
    expect(markdown).toContain(
      '[Stripe in the catalog](https://internal-agents.com/agents/stripe-minions)',
    );
    expect(markdown).not.toContain('/index.html#');
  });

  it('leaves no markup in the text', () => {
    expect(markdown).not.toMatch(/<[a-z]+[^>]*>/);
  });
});

describe('the diagram text', () => {
  it('keeps bold labels and links and removes decoration', () => {
    const html =
      '<figure><div><span>01</span><strong>Attempt</strong><small>Make a change</small></div>' +
      '<span aria-hidden="true">→</span>' +
      '<figcaption>Our <a href="/x">illustration</a>.</figcaption></figure>';
    expect(htmlToText(html)).toBe('01 **Attempt** Make a change\n\nOur [illustration](/x) .');
  });
});

describe('the content routes', () => {
  it('lists the guides, the notes index, and every note', async () => {
    const paths = await contentPaths();
    expect(paths).toEqual([
      '/infrastructure',
      guidePath('definitions'),
      guidePath('methodology'),
      notesIndexPath(),
      ...SLUGS.map((slug) => notePath(slug)),
    ]);
    expect(paths).toHaveLength(11);
    expect(new Set(paths).size).toBe(paths.length);
  });
});
