// ABOUTME: Checks that the reading model keeps evidence roles, caveats, and anchors.
// ABOUTME: The three difficult entries of the plan are covered case by case.

import { describe, expect, it } from 'vitest';
import { loadCatalog } from '../../src/lib/catalog';
import {
  CARD_SUMMARY_LIMIT,
  directoryCards,
  entryView,
  type ClaimView,
} from '../../src/lib/entry-view';

const catalog = loadCatalog();

function caveat(claim: ClaimView, label: string): string {
  const found = claim.caveats.find((item) => item.label === label);
  if (!found) throw new Error(`claim "${claim.id}" has no ${label} caveat.`);
  return found.value;
}

describe('every entry', () => {
  it('places every claim of the record in a section', () => {
    for (const approach of catalog.approaches) {
      const entry = entryView(catalog, approach.id);
      const placed = new Set([
        ...(entry.summary ? [entry.summary.id] : []),
        ...entry.workflowClaims.map((claim) => claim.id),
        ...entry.supervisionClaims.map((claim) => claim.id),
        ...entry.architectureClaims.map((claim) => claim.id),
        ...entry.metricClaims.map((claim) => claim.id),
        ...entry.lessonClaims.map((claim) => claim.id),
        ...entry.otherClaims.map((claim) => claim.id),
      ]);
      expect(placed.size).toBe(approach.claim_ids.length);
      expect([...placed].sort()).toEqual([...approach.claim_ids].sort());
    }
  });

  it('keeps claim and source anchors', () => {
    for (const approach of catalog.approaches) {
      const entry = entryView(catalog, approach.id);
      for (const claim of entry.claims) expect(claim.anchor).toBe(`claim-${claim.id}`);
      for (const source of entry.sources) expect(source.anchor).toBe(`source-${source.id}`);
    }
  });

  it('numbers citations from the source list of the record', () => {
    for (const approach of catalog.approaches) {
      const entry = entryView(catalog, approach.id);
      expect(entry.sources.map((source) => source.number)).toEqual(
        entry.sources.map((_, index) => index + 1),
      );
      const numbers = new Map(entry.sources.map((source) => [source.id, source.number]));
      for (const claim of entry.claims) {
        for (const citation of claim.citations) {
          expect(citation.number).toBe(numbers.get(citation.sourceId));
        }
      }
    }
  });

  it('keeps the three evidence roles apart', () => {
    for (const approach of catalog.approaches) {
      const entry = entryView(catalog, approach.id);
      for (const claim of entry.claims) {
        expect(claim.supporting.length + claim.contextualizing.length + claim.contradicting.length)
          .toBe(claim.citations.length);
        for (const citation of claim.supporting) expect(citation.relation).toBe('supports');
        for (const citation of claim.contextualizing) expect(citation.relation).toBe('contextualizes');
        for (const citation of claim.contradicting) expect(citation.relation).toBe('contradicts');
      }
    }
  });

  it('shows the scope and the denominator of every metric', () => {
    for (const approach of catalog.approaches) {
      for (const claim of entryView(catalog, approach.id).metricClaims) {
        if (!claim.isMetric) continue;
        expect(claim.caveats.map((item) => item.label)).toEqual(
          expect.arrayContaining(['Reported by', 'Scope', 'Denominator', 'Method']),
        );
      }
    }
  });
});

describe('block-builderbot', () => {
  const entry = entryView(catalog, 'block-builderbot');

  it('describes a ticket-to-code workflow', () => {
    expect(entry.workflowClaims.length).toBeGreaterThan(0);
    const workflow = entry.workflowClaims.map((claim) => claim.text).join(' ');
    expect(workflow).toContain('ticket');
    expect(workflow).toContain('PR');
    expect(entry.invocation.map((item) => item.id)).toContain('event-driven');
  });

  it('attributes the metrics to the company that reported them', () => {
    const headline = entry.metricClaims.find((claim) => claim.field === 'headline_metric');
    expect(headline).toBeDefined();
    expect(caveat(headline!, 'Reported by')).toBe('Block');
    expect(caveat(headline!, 'Denominator')).toContain('All production code changes across Block');
  });

  it('keeps the undefined meaning of an operation beside the operations figure', () => {
    const operations = entry.metricClaims.find((claim) => claim.text.includes('operations per day'));
    expect(operations).toBeDefined();
    expect(caveat(operations!, 'Scope')).toContain('does not define an operation');
  });

  it('is not labelled as supporting infrastructure', () => {
    expect(entry.isSupportingSystem).toBe(false);
    expect(entry.supportingSystemNote).toBeNull();
  });
});

describe('uber-ureview', () => {
  const entry = entryView(catalog, 'uber-ureview');

  it('keeps the weekly and monthly conflict beside the metric', () => {
    const metrics = entry.metricClaims.filter((claim) => claim.text.includes('65,000'));
    expect(metrics.length).toBeGreaterThan(0);
    for (const metric of metrics) {
      expect(metric.text).toMatch(/month/);
      expect(caveat(metric, 'Scope')).toMatch(/conflicts and remains unresolved/);
      expect(caveat(metric, 'Denominator')).toMatch(/monthly|month/);
    }
  });

  it('marks the conflicting source as contradicting, not supporting', () => {
    const headline = entry.metricClaims.find((claim) => claim.field === 'headline_metric');
    expect(headline!.contradicting.length).toBeGreaterThan(0);
    for (const citation of headline!.contradicting) {
      expect(citation.relationLabel).toBe('Contradicts');
      expect(headline!.supporting.map((item) => item.relation)).not.toContain('contradicts');
    }
  });

  it('links the related Uber implementation', () => {
    expect(entry.relatedEntries.map((related) => related.id)).toContain('uber-coding-agent');
  });
});

describe('plaid-internal-mcp-server', () => {
  const entry = entryView(catalog, 'plaid-internal-mcp-server');

  it('is labelled as supporting infrastructure', () => {
    expect(entry.isSupportingSystem).toBe(true);
    expect(entry.approachTypeLabel).toBe('Supporting pattern');
    expect(entry.supportingSystemNote).toContain('supporting infrastructure');
  });

  it('keeps coding-tool adoption apart from server adoption', () => {
    const adoption = entry.metricClaims.filter((claim) => claim.text.includes('80%'));
    expect(adoption.length).toBeGreaterThan(0);
    for (const claim of adoption) {
      expect(caveat(claim, 'Scope')).toContain('separate from internal MCP server adoption');
    }
    const detailed = adoption.find((claim) => claim.field.startsWith('key_metrics.'));
    expect(detailed!.text).toContain('the source does not report internal MCP server adoption');
  });

  it('records no supervision level for the scope it serves', () => {
    expect(entry.operatingModels[0]!.levelLabel).toBe('Level unknown');
    expect(entry.operatingModels[0]!.boundaryLabel).toBe('Unknown');
  });
});

describe('the directory model', () => {
  const cards = directoryCards(catalog);

  it('has one card per approach, ordered by company', () => {
    expect(cards.length).toBe(catalog.approaches.length);
    const companies = cards.map((card) => card.company.toLowerCase());
    expect([...companies]).toEqual([...companies].sort());
  });

  it('carries a summary and a link for every card', () => {
    for (const card of cards) {
      expect(card.summary.length).toBeGreaterThan(0);
      expect(card.path).toBe(`/agents/${card.id}`);
    }
  });
});

describe('directory card summaries', () => {
  it('shortens a long summary and keeps the whole text for the entry page', () => {
    const card = directoryCards(catalog).find((item) => item.id === 'plaid-internal-mcp-server')!;
    expect(card.summary.length).toBeGreaterThan(CARD_SUMMARY_LIMIT);
    expect(card.excerpt.length).toBeLessThanOrEqual(CARD_SUMMARY_LIMIT + 1);
    expect(card.excerpt.endsWith('…')).toBe(true);
    expect(card.summary.startsWith(card.excerpt.slice(0, 60))).toBe(true);
  });

  it('leaves a short summary unchanged', () => {
    for (const card of directoryCards(catalog)) {
      if (card.summary.length <= CARD_SUMMARY_LIMIT) expect(card.excerpt).toBe(card.summary);
    }
  });
});
