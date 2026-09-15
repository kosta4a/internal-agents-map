// ABOUTME: Checks the resolver that sends an old homepage fragment to its entry page.
// ABOUTME: An unknown or hostile fragment must never become a redirect target.

import { describe, expect, it } from 'vitest';
import { legacyTarget } from '../../src/scripts/directory';
import { loadCatalog } from '../../src/lib/catalog';

const catalog = loadCatalog();
const ids = new Set(catalog.approaches.map((approach) => approach.id));
const sources = new Map(catalog.sources.map((source) => [source.id, source.approach_id]));

describe('the legacy fragment resolver', () => {
  it('sends a known approach fragment to its entry page', () => {
    expect(legacyTarget('#block-builderbot', ids, sources)).toBe('/agents/block-builderbot');
  });

  it('sends a known claim fragment to the same anchor on the entry page', () => {
    const claim = catalog.claims.find((item) => item.approach_id === 'uber-ureview')!;
    expect(legacyTarget(`#claim-${claim.id}`, ids, sources)).toBe(`/agents/uber-ureview#claim-${claim.id}`);
  });

  it('sends a known source fragment to the same anchor on the entry page', () => {
    const source = catalog.sources.find((item) => item.approach_id === 'plaid-internal-mcp-server')!;
    expect(legacyTarget(`#source-${source.id}`, ids, sources)).toBe(
      `/agents/plaid-internal-mcp-server#source-${source.id}`,
    );
  });

  it('resolves every approach, claim, and source fragment of the catalog', () => {
    for (const approach of catalog.approaches) {
      expect(legacyTarget(`#${approach.id}`, ids, sources)).toBe(`/agents/${approach.id}`);
    }
    for (const claim of catalog.claims) {
      expect(legacyTarget(`#claim-${claim.id}`, ids, sources)).toBe(
        `/agents/${claim.approach_id}#claim-${claim.id}`,
      );
    }
    for (const source of catalog.sources) {
      expect(legacyTarget(`#source-${source.id}`, ids, sources)).toBe(
        `/agents/${source.approach_id}#source-${source.id}`,
      );
    }
  });

  it('leaves the page fragments and unknown fragments alone', () => {
    for (const fragment of ['', '#', '#catalog', '#main', '#not-a-real-entry', '#claim-nobody--x']) {
      expect(legacyTarget(fragment, ids, sources)).toBeNull();
    }
  });

  it('cannot be turned into a redirect to another site', () => {
    const hostile = [
      '#//evil.example.com',
      '#https://evil.example.com',
      '#..%2F..%2Fevil',
      '#block-builderbot/../../evil',
      '#block-builderbot?next=https://evil.example.com',
      '#block-builderbot#https://evil.example.com',
      '#%2e%2e%2fevil',
      '#claim-block-builderbot--x/../../evil',
      '#\\evil.example.com',
      '#%',
    ];
    for (const fragment of hostile) expect(legacyTarget(fragment, ids, sources)).toBeNull();
  });
});
