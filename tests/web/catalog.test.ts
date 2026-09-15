// ABOUTME: Checks that the catalog loader accepts the real data and rejects broken links.
// ABOUTME: A failure message must name the record and the claim path that caused it.

import { describe, expect, it } from 'vitest';
import { CATALOG_SCHEMA_VERSION, loadCatalog, validateCatalog } from '../../src/lib/catalog';

const approach = {
  id: 'example-agent',
  company: 'Example',
  agent_name: 'Example agent',
  approach_type: 'task-agent',
  deployment_stage: 'pilot',
  year: 2026,
  last_reviewed_at: '2026-09-09',
  status: 'internal',
  domains: ['coding'],
  autonomy: 'drafts-reviewed',
  operating_models: [{ scope: 'ticket → patch', attention_boundary: 'work-product-review', level: 3 }],
  rubric: { invocation: ['interactive'], state: 'unknown', identity: 'unknown', evidence_strength: 'detailed-primary' },
  claim_ids: ['example-agent--summary'],
  source_ids: ['example-agent-source-1'],
  interfaces: [],
};

const claim = {
  id: 'example-agent--summary',
  approach_id: 'example-agent',
  field: 'summary',
  text: 'An example.',
  kind: 'fact',
  provenance: 'reported',
  confidence: 'high',
  confidence_reason: 'A linked first-party source states the claim.',
  valid_at: null,
  evidence: [{ source_id: 'example-agent-source-1', relation: 'supports' }],
};

const source = {
  id: 'example-agent-source-1',
  approach_id: 'example-agent',
  title: 'An example source',
  url: 'https://example.com/post',
  kind: 'engineering-blog',
  provenance_class: 'first-party',
  role: 'evidence',
  last_verified_at: '2026-08-31',
};

function fixture(overrides: Record<string, unknown> = {}) {
  return {
    schema_version: CATALOG_SCHEMA_VERSION,
    approaches: [structuredClone(approach)],
    claims: [structuredClone(claim)],
    sources: [structuredClone(source)],
    ...overrides,
  };
}

describe('the published catalog', () => {
  const catalog = loadCatalog();

  it('uses the schema version the website reads', () => {
    expect(catalog.schema_version).toBe(4);
  });

  it('lists every claim and every source under exactly one approach', () => {
    expect(catalog.approaches.length).toBeGreaterThan(0);
    const claimCount = catalog.approaches.reduce((sum, item) => sum + item.claim_ids.length, 0);
    const sourceCount = catalog.approaches.reduce((sum, item) => sum + item.source_ids.length, 0);
    expect(claimCount).toBe(catalog.claims.length);
    expect(sourceCount).toBe(catalog.sources.length);
  });

  it('resolves every claim and source of every approach', () => {
    const claims = new Set(catalog.claims.map((item) => item.id));
    const sources = new Set(catalog.sources.map((item) => item.id));
    for (const item of catalog.approaches) {
      for (const id of item.claim_ids) expect(claims.has(id)).toBe(true);
      for (const id of item.source_ids) expect(sources.has(id)).toBe(true);
    }
  });
});

describe('catalog validation', () => {
  it('accepts a complete record', () => {
    expect(() => validateCatalog(fixture())).not.toThrow();
  });

  it('rejects another schema version', () => {
    expect(() => validateCatalog(fixture({ schema_version: 3 }))).toThrow(/schema_version must be 4, found 3/);
  });

  it('names the claim path when evidence cites an unknown source', () => {
    const broken = fixture();
    broken.claims[0]!.evidence[0]!.source_id = 'example-agent-source-9';
    expect(() => validateCatalog(broken)).toThrow(
      /claim "example-agent--summary" \(approach "example-agent", field "summary"\) cites unknown source "example-agent-source-9" at evidence\.0\./,
    );
  });

  it('names the approach when it lists an unknown claim', () => {
    const broken = fixture();
    broken.approaches[0]!.claim_ids = ['example-agent--missing'];
    expect(() => validateCatalog(broken)).toThrow(
      /approach "example-agent" lists unknown claim "example-agent--missing"/,
    );
  });

  it('names the approach when it lists an unknown source', () => {
    const broken = fixture();
    broken.approaches[0]!.source_ids = ['example-agent-source-4'];
    expect(() => validateCatalog(broken)).toThrow(
      /approach "example-agent" lists unknown source "example-agent-source-4"/,
    );
  });

  it('rejects a duplicate claim identifier', () => {
    const broken = fixture();
    broken.claims.push(structuredClone(claim));
    expect(() => validateCatalog(broken)).toThrow(/claim "example-agent--summary" is declared more than once/);
  });

  it('rejects a claim that belongs to an unknown approach', () => {
    const broken = fixture();
    broken.claims[0]!.approach_id = 'ghost-agent';
    broken.approaches[0]!.claim_ids = [];
    expect(() => validateCatalog(broken)).toThrow(/belongs to an unknown approach/);
  });
});
