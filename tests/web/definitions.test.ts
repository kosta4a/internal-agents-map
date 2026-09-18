// ABOUTME: Checks that a chart placement depends on the evidence the catalog holds.
// ABOUTME: A claim that is removed, emptied, or unsupported removes its placement.

import { describe, expect, it } from 'vitest';
import { loadCatalog, type Catalog, type Claim } from '../../src/lib/catalog';
import {
  PLACEMENT_CANDIDATES,
  placements,
  placementsByCell,
} from '../../src/lib/definitions';
import { entryPath } from '../../src/lib/routes';

const catalog = loadCatalog();
const SAMPLE = 'stripe-minions';

/** Copy the catalog with one claim of one implementation changed or removed. */
function withClaim(field: string, change: ((claim: Claim) => Claim) | null): Catalog {
  const target = catalog.claims.find(
    (claim) => claim.approach_id === SAMPLE && claim.field === field,
  )!;
  if (change === null) {
    return {
      ...catalog,
      approaches: catalog.approaches.map((item) =>
        item.id === SAMPLE
          ? { ...item, claim_ids: item.claim_ids.filter((id) => id !== target.id) }
          : item,
      ),
      claims: catalog.claims.filter((claim) => claim.id !== target.id),
    };
  }
  return {
    ...catalog,
    claims: catalog.claims.map((claim) => (claim.id === target.id ? change(claim) : claim)),
  };
}

describe('the chart placements', () => {
  it('places every selected implementation the catalog still supports', () => {
    const placed = placements(catalog);
    expect(placed.map((item) => item.id).sort()).toEqual(
      PLACEMENT_CANDIDATES.map((item) => item.id).sort(),
    );
  });

  it('links a placement to the entry page and to the claim it names', () => {
    const minions = placements(catalog).find((item) => item.id === SAMPLE)!;
    expect(minions.path).toBe(entryPath(SAMPLE));
    expect(minions.evidence.map((item) => item.label)).toEqual(['Scope', 'Context', 'Tools']);
    for (const link of minions.evidence) {
      expect(link.href.startsWith(`${entryPath(SAMPLE)}#claim-${SAMPLE}--`)).toBe(true);
    }
  });

  it('groups the placements by the region that holds them', () => {
    const cells = placementsByCell(catalog);
    expect(cells.specialized.map((item) => item.id)).toContain(SAMPLE);
    expect(cells.shared.map((item) => item.id)).toContain('sentry-junior');
    expect(cells.ready.map((item) => item.id)).not.toContain('retool-retoolgpt');
  });

  it('drops a placement when a required claim is removed', () => {
    const fixture = withClaim('architecture.tool_access', null);
    expect(placements(fixture).map((item) => item.id)).not.toContain(SAMPLE);
    expect(placements(fixture).map((item) => item.id)).toContain('sentry-junior');
  });

  it('drops a placement when a required claim says nothing', () => {
    const fixture = withClaim('architecture.knowledge', (claim) => ({ ...claim, text: 'Unknown' }));
    expect(placements(fixture).map((item) => item.id)).not.toContain(SAMPLE);
  });

  it('drops a placement when no source supports the required claim', () => {
    const fixture = withClaim('summary', (claim) => ({
      ...claim,
      evidence: claim.evidence.map((item) => ({ ...item, relation: 'contextualizes' as const })),
    }));
    expect(placements(fixture).map((item) => item.id)).not.toContain(SAMPLE);
  });
});
