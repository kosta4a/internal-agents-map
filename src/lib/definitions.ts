// ABOUTME: Places selected implementations on the Definitions chart from their claims.
// ABOUTME: A placement disappears when the evidence it names is no longer in the catalog.

import type { Catalog, Claim } from './catalog';
import { entryPath } from './routes';

/** The four regions of the chart. Only three of them hold catalog entries. */
export type QuadrantCell = 'specialized' | 'shared' | 'ready';

/** The claim a placement depends on, and the word the reader sees for it. */
export interface PlacementRequirement {
  readonly field: string;
  readonly label: string;
}

export interface PlacementCandidate {
  readonly id: string;
  readonly cell: QuadrantCell;
  /** The editorial reason for the region, shown as a title and a note. */
  readonly reason: string;
  readonly requirements: readonly PlacementRequirement[];
}

export interface PlacementEvidenceLink {
  readonly label: string;
  /** The claim anchor on the entry page of the implementation. */
  readonly href: string;
}

export interface PlacementView {
  readonly id: string;
  readonly path: string;
  readonly company: string;
  readonly agentName: string;
  readonly cell: QuadrantCell;
  readonly reason: string;
  readonly evidence: readonly PlacementEvidenceLink[];
}

/** The claims that support every placement, unless a candidate names other ones. */
const DEFAULT_REQUIREMENTS: readonly PlacementRequirement[] = [
  { field: 'summary', label: 'Scope' },
  { field: 'architecture.knowledge', label: 'Context' },
  { field: 'architecture.tool_access', label: 'Tools' },
];

/** Claim text that answers nothing. It cannot support a placement. */
const EMPTY_TEXT: ReadonlySet<string> = new Set(['', 'unknown', 'not specified']);

/**
 * The editorial placements of the Definitions chart.
 * These are scoped assessments of described work, not scores or rankings.
 */
export const PLACEMENT_CANDIDATES: readonly PlacementCandidate[] = [
  {
    id: 'doordash-code-review',
    cell: 'specialized',
    reason: 'One code-review workflow, grounded in repository evidence and domain rules.',
    requirements: DEFAULT_REQUIREMENTS,
  },
  {
    id: 'stripe-minions',
    cell: 'specialized',
    reason:
      'Several engineering tasks within a coding workflow, connected to Stripe’s development tools and repository rules. Placed toward the middle of workflow breadth.',
    requirements: DEFAULT_REQUIREMENTS,
  },
  {
    id: 'posthog-stamphog',
    cell: 'specialized',
    reason:
      'One pull-request approval workflow, grounded in repository-specific safety gates, review state, ownership, and prior human approvals.',
    requirements: DEFAULT_REQUIREMENTS,
  },
  {
    id: 'ramp-inspect',
    cell: 'specialized',
    reason:
      'A background coding agent that verifies work with tests, telemetry, feature flags, and the rendered frontend; it later expanded into production monitoring and a host for other internal agents.',
    requirements: DEFAULT_REQUIREMENTS,
  },
  {
    id: 'brex-agent-platform',
    cell: 'shared',
    reason:
      'A Retool-based platform for multiple operations workflows, with company procedures, account data, and product tools. Described in a First Round case study.',
    requirements: DEFAULT_REQUIREMENTS,
  },
  {
    id: 'sentry-junior',
    cell: 'shared',
    reason:
      'A general internal agent that takes varied tasks across company systems, with persistent context and tools discovered through MCP.',
    requirements: DEFAULT_REQUIREMENTS,
  },
  {
    id: 'shopify-internal-agents',
    cell: 'shared',
    reason:
      'A shared platform that powers coding, research, migration, and application-security agents using Shopify’s monorepo context and internal tools.',
    requirements: DEFAULT_REQUIREMENTS,
  },
];

/** A claim supports a placement when it says something and a source supports it. */
function supportsPlacement(claim: Claim | undefined): claim is Claim {
  if (!claim) return false;
  if (EMPTY_TEXT.has(String(claim.text).trim().toLowerCase())) return false;
  return claim.evidence.some((evidence) => evidence.relation === 'supports');
}

/**
 * Build the placements the chart can show.
 * A candidate is left out when any claim it names is missing or unsupported.
 */
export function placements(catalog: Catalog): PlacementView[] {
  const byId = new Map(PLACEMENT_CANDIDATES.map((candidate) => [candidate.id, candidate]));
  const claims = new Map(catalog.claims.map((claim) => [claim.id, claim]));
  const views: PlacementView[] = [];
  for (const approach of catalog.approaches) {
    const candidate = byId.get(approach.id);
    if (!candidate) continue;
    const evidence = new Map<string, Claim>();
    for (const claimId of approach.claim_ids) {
      const claim = claims.get(claimId);
      if (claim) evidence.set(claim.field, claim);
    }
    const supported = candidate.requirements.every((requirement) =>
      supportsPlacement(evidence.get(requirement.field)),
    );
    if (!supported) continue;
    views.push({
      id: approach.id,
      path: entryPath(approach.id),
      company: approach.company,
      agentName: approach.agent_name,
      cell: candidate.cell,
      reason: candidate.reason,
      evidence: candidate.requirements.map((requirement) => ({
        label: requirement.label,
        href: `${entryPath(approach.id)}#claim-${evidence.get(requirement.field)!.id}`,
      })),
    });
  }
  return views;
}

/** Group the placements by the region of the chart that holds them. */
export function placementsByCell(catalog: Catalog): Record<QuadrantCell, PlacementView[]> {
  const cells: Record<QuadrantCell, PlacementView[]> = {
    specialized: [],
    shared: [],
    ready: [],
  };
  for (const placement of placements(catalog)) cells[placement.cell].push(placement);
  return cells;
}
