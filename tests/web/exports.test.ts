// ABOUTME: Checks that the JSON and Markdown exports keep the whole research record.
// ABOUTME: The JSON files must stay byte-identical to the published catalog interface.

import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { loadCatalog, type Claim } from '../../src/lib/catalog';
import {
  catalogMarkdown,
  compactIndexJson,
  markdownLink,
  recordJson,
  recordMarkdown,
} from '../../src/lib/exports';
import { entryView } from '../../src/lib/entry-view';
import { canonicalUrl, entryPath } from '../../src/lib/routes';

const catalog = loadCatalog();

/** The published files of the previous build. They are the comparison baseline. */
function published(path: string): string {
  return readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8');
}

describe('record JSON', () => {
  it('reproduces every published record byte for byte', () => {
    for (const approach of catalog.approaches) {
      expect(recordJson(catalog, approach.id), approach.id).toBe(
        published(`site/agents/${approach.id}.json`),
      );
    }
  });

  it('keeps the whole dataset identical to the committed catalog', () => {
    const raw = published('data/agents.json');
    expect(`${JSON.stringify(catalog, null, 2)}\n`).toBe(raw);
  });

  it('carries the claims and the sources the approach lists, in that order', () => {
    const record = JSON.parse(recordJson(catalog, 'block-builderbot')) as {
      schema_version: number;
      approaches: Array<{ id: string; claim_ids: string[]; source_ids: string[] }>;
      claims: Claim[];
      sources: Array<{ id: string }>;
    };
    const approach = record.approaches[0]!;
    expect(record.schema_version).toBe(catalog.schema_version);
    expect(record.claims.map((claim) => claim.id)).toEqual(approach.claim_ids);
    expect(record.sources.map((source) => source.id)).toEqual(approach.source_ids);
  });
});

describe('compact index', () => {
  const published_index = JSON.parse(published('site/agents/index.json')) as {
    schema_version: number;
    approaches: Array<Record<string, unknown>>;
  };
  const current = JSON.parse(compactIndexJson(catalog)) as typeof published_index;

  it('differs from the published index only in the page URL', () => {
    expect(current.schema_version).toBe(published_index.schema_version);
    expect(current.approaches).toHaveLength(published_index.approaches.length);
    for (const [index, entry] of current.approaches.entries()) {
      const before = published_index.approaches[index]!;
      expect({ ...entry, url: null }).toEqual({ ...before, url: null });
    }
  });

  it('points the page URL at the entry page and leaves the export URLs alone', () => {
    for (const [index, entry] of current.approaches.entries()) {
      const before = published_index.approaches[index]!;
      expect(entry.url).toBe(canonicalUrl(entryPath(entry.id as string)));
      expect(entry.json_url).toBe(before.json_url);
      expect(entry.markdown_url).toBe(before.markdown_url);
    }
  });
});

describe('record Markdown', () => {
  it('holds every claim, every qualification, and every source of the entry', () => {
    for (const approach of catalog.approaches) {
      const markdown = recordMarkdown(catalog, approach.id);
      const view = entryView(catalog, approach.id);
      for (const claim of view.claims) {
        expect(markdown, `${approach.id}: ${claim.id}`).toContain(claim.text.trim());
        expect(markdown, `${approach.id}: ${claim.id}`).toContain(`\`${claim.id}\``);
        for (const caveat of claim.caveats) {
          expect(markdown, `${approach.id}: ${claim.id} ${caveat.label}`).toContain(
            `- ${caveat.label}: ${caveat.value}`,
          );
        }
      }
      for (const source of view.sources) {
        expect(markdown, `${approach.id}: ${source.id}`).toContain(source.url);
        if (source.preservedUrl) {
          expect(markdown, `${approach.id}: ${source.id}`).toContain(source.preservedUrl);
        }
      }
    }
  });

  it('keeps a metric qualification beside the number it belongs to', () => {
    const markdown = recordMarkdown(catalog, 'uber-ureview');
    const metrics = entryView(catalog, 'uber-ureview').metricClaims;
    expect(metrics.length).toBeGreaterThan(0);
    for (const claim of metrics) {
      const position = markdown.indexOf(claim.text.trim());
      const block = markdown.slice(position, markdown.indexOf('\n### ', position + 1));
      for (const caveat of claim.caveats) expect(block).toContain(`- ${caveat.label}:`);
    }
  });

  it('names the page it represents and the relation of every citation', () => {
    const markdown = recordMarkdown(catalog, 'plaid-internal-mcp-server');
    expect(markdown.startsWith(`Source: ${canonicalUrl('/agents/plaid-internal-mcp-server')}\n`)).toBe(
      true,
    );
    expect(markdown).toContain('> This entry describes supporting infrastructure');
    for (const relation of entryView(catalog, 'plaid-internal-mcp-server').claims.flatMap(
      (claim) => claim.citations,
    )) {
      expect(markdown).toContain(`${relation.relationLabel} · [${relation.number}]`);
    }
  });
});

describe('catalog Markdown', () => {
  const markdown = catalogMarkdown(catalog);

  it('holds the text of every claim in the catalog', () => {
    for (const claim of catalog.claims) {
      expect(markdown, claim.id).toContain(claim.text.trim());
    }
  });

  it('holds every implementation and its page address', () => {
    for (const approach of catalog.approaches) {
      expect(markdown, approach.id).toContain(`## ${approach.company} — ${approach.agent_name}`);
      expect(markdown, approach.id).toContain(`Page: ${canonicalUrl(entryPath(approach.id))}`);
    }
  });

  it('counts the catalog from the data, not from a fixed number', () => {
    const organizations = new Set(catalog.approaches.map((a) => a.company)).size;
    expect(markdown).toContain(`- Implementations: ${catalog.approaches.length}`);
    expect(markdown).toContain(`- Organizations: ${organizations}`);
    expect(markdown).toContain(`- Sources: ${catalog.sources.length}`);
    expect(markdown).toContain(`- Claims: ${catalog.claims.length}`);
  });
});

describe('Markdown links', () => {
  it('protects brackets in the text and wraps a URL that needs it', () => {
    expect(markdownLink('A [note]', 'https://example.com/a')).toBe(
      '[A \\[note\\]](https://example.com/a)',
    );
    expect(markdownLink('Title', 'https://example.com/a(b)')).toBe(
      '[Title](<https://example.com/a(b)>)',
    );
  });
});
