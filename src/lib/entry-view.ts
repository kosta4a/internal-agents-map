// ABOUTME: Builds the reading model of one catalog entry from claims and sources.
// ABOUTME: It keeps evidence roles, metric caveats, and claim anchors intact.

import {
  requireApproach,
  sortedApproaches,
  sourcesById,
  type Approach,
  type Catalog,
  type Claim,
  type ClaimKind,
  type EvidenceRelation,
  type Source,
} from './catalog';
import { fieldLabel, levelLabel, termLabel } from './labels';
import { companyView, type CompanyView } from './companies';
import { notesForApproach } from './notes';
import { entryPath } from './routes';
import { shorten } from './text';

/** Where the repository keeps the preserved copy of a source. */
const REPOSITORY_BLOB = 'https://github.com/steel-experiments/internal-agents-map/blob/main/';

/** Approach types that describe shared infrastructure, not an execution workflow. */
const SUPPORTING_TYPES: ReadonlySet<string> = new Set(['supporting-pattern', 'platform']);

export interface CaveatView {
  readonly label: string;
  readonly value: string;
}

export interface CitationView {
  /** The citation number inside this entry, counted from the source list. */
  readonly number: number;
  readonly sourceId: string;
  readonly anchor: string;
  readonly relation: EvidenceRelation;
  readonly relationLabel: string;
  readonly locator: string | null;
  readonly title: string;
}

export interface ClaimView {
  readonly id: string;
  readonly anchor: string;
  readonly field: string;
  readonly label: string;
  readonly text: string;
  readonly kind: ClaimKind;
  readonly kindLabel: string;
  readonly provenanceLabel: string;
  readonly confidenceLabel: string;
  readonly confidenceReason: string;
  readonly validAt: string | null;
  readonly isMetric: boolean;
  /** Qualifications that must stay beside the statement. Empty fields stay out. */
  readonly caveats: readonly CaveatView[];
  /** One line that says which qualification of a figure the sources do not report. */
  readonly qualification: string | null;
  /** Every research field of the claim, for the ledger. A metric shows its gaps. */
  readonly metadata: readonly CaveatView[];
  /**
   * True when the role of a citation carries information.
   * One supporting source under one statement needs only its number.
   */
  readonly showCitationRoles: boolean;
  readonly supporting: readonly CitationView[];
  readonly contextualizing: readonly CitationView[];
  readonly contradicting: readonly CitationView[];
  /** Every citation of this claim, in source order. */
  readonly citations: readonly CitationView[];
}

export interface SourceView {
  readonly id: string;
  readonly anchor: string;
  readonly number: number;
  readonly title: string;
  readonly url: string;
  readonly kindLabel: string;
  readonly provenanceClassLabel: string;
  readonly roleLabel: string;
  readonly publisher: string | null;
  readonly publishedAt: string | null;
  readonly accessedAt: string | null;
  readonly lastVerifiedAt: string | null;
  /** The preserved copy in the repository, when the source was captured. */
  readonly preservedUrl: string | null;
  readonly archivedUrl: string | null;
}

export interface OperatingModelView {
  readonly scope: string;
  readonly boundary: string;
  readonly boundaryLabel: string;
  readonly level: number | null;
  readonly levelLabel: string;
}

export interface RelatedEntryView {
  readonly id: string;
  readonly path: string;
  readonly company: string;
  readonly agentName: string;
  readonly relationLabel: string;
}

export interface RelatedNoteView {
  readonly slug: string;
  readonly path: string;
  readonly title: string;
}

export interface TermView {
  readonly id: string;
  readonly label: string;
}

export interface EntryView {
  readonly id: string;
  readonly path: string;
  readonly company: string;
  readonly companyId: string;
  /** The logo or monogram mark the entry header shows. */
  readonly companyView: CompanyView;
  readonly agentName: string;
  readonly title: string;
  readonly approachType: string;
  readonly approachTypeLabel: string;
  /** True when the entry describes infrastructure other systems build on. */
  readonly isSupportingSystem: boolean;
  readonly supportingSystemNote: string | null;
  readonly summary: ClaimView | null;
  readonly summaryText: string;
  readonly reviewedAt: string;
  readonly year: number | null;
  readonly statusLabel: string;
  readonly deploymentStageLabel: string;
  readonly autonomyLabel: string;
  readonly evidenceStrengthLabel: string;
  readonly domains: readonly TermView[];
  readonly interfaces: readonly TermView[];
  readonly invocation: readonly TermView[];
  readonly operatingModels: readonly OperatingModelView[];
  readonly workflowClaims: readonly ClaimView[];
  readonly supervisionClaims: readonly ClaimView[];
  readonly architectureClaims: readonly ClaimView[];
  /** Claims of a metric field whose kind is a metric. */
  readonly metricClaims: readonly ClaimView[];
  /** Claims of a metric field that state a fact, an inference, or an opinion. */
  readonly resultStatementClaims: readonly ClaimView[];
  readonly lessonClaims: readonly ClaimView[];
  /** Claims that no section above classifies. They keep every claim reachable. */
  readonly otherClaims: readonly ClaimView[];
  readonly claims: readonly ClaimView[];
  readonly sources: readonly SourceView[];
  readonly relatedEntries: readonly RelatedEntryView[];
  /** Notes about this entry. Later steps fill this from note metadata. */
  readonly relatedNotes: readonly RelatedNoteView[];
}

function termView(id: string): TermView {
  return { id, label: termLabel(id) };
}

function preservedUrl(source: Source): string | null {
  const path = source.capture?.artifacts?.markdown?.path;
  return path ? REPOSITORY_BLOB + path : null;
}

function sourceView(source: Source, number: number): SourceView {
  return {
    id: source.id,
    anchor: `source-${source.id}`,
    number,
    title: source.title,
    url: source.url,
    kindLabel: termLabel(source.kind),
    provenanceClassLabel: termLabel(source.provenance_class),
    roleLabel: termLabel(source.role),
    publisher: source.publisher ?? null,
    publishedAt: source.published_at ?? null,
    accessedAt: source.accessed_at ?? null,
    lastVerifiedAt: source.last_verified_at ?? null,
    preservedUrl: preservedUrl(source),
    archivedUrl: source.archived_url ?? null,
  };
}

/** The research fields that qualify a statement, in reading order. */
const QUALIFIER_FIELDS: ReadonlyArray<readonly [keyof Claim, string]> = [
  ['reported_by', 'Reported by'],
  ['metric_scope', 'Scope'],
  ['denominator', 'Denominator'],
  ['measurement_method', 'Method'],
  ['valid_at', 'Observation date'],
];

/** The qualifications a figure cannot stand without. */
const REQUIRED_METRIC_FIELDS: ReadonlyArray<readonly [keyof Claim, string]> = [
  ['metric_scope', 'Scope'],
  ['denominator', 'Denominator'],
];

function fieldValue(claim: Claim, key: keyof Claim): string | null {
  const value = claim[key];
  return value === undefined || value === null ? null : String(value);
}

/**
 * List the qualifications that belong next to a statement.
 * A field the sources do not report stays out of the reading flow.
 */
function caveats(claim: Claim): CaveatView[] {
  const result: CaveatView[] = [];
  for (const [key, label] of QUALIFIER_FIELDS) {
    const value = fieldValue(claim, key);
    if (value !== null) result.push({ label, value });
  }
  return result;
}

/**
 * Say which qualification of a figure the sources do not report.
 * Without this line a number with no denominator reads as a plain outcome.
 */
function qualification(claim: Claim): string | null {
  if (claim.kind !== 'metric') return null;
  const missing = REQUIRED_METRIC_FIELDS.filter(([key]) => fieldValue(claim, key) === null).map(
    ([, label]) => label.toLowerCase(),
  );
  if (missing.length === 0) return null;
  const names = missing.length === 1 ? missing[0] : `${missing[0]} and ${missing[1]}`;
  return `The source does not report the ${names} of this figure.`;
}

/** List every research field of a claim. A metric names the fields it lacks. */
function metadata(claim: Claim): CaveatView[] {
  const result: CaveatView[] = [];
  for (const [key, label] of QUALIFIER_FIELDS) {
    const value = fieldValue(claim, key);
    if (value !== null) result.push({ label, value });
    else if (claim.kind === 'metric') result.push({ label, value: 'Not reported' });
  }
  return result;
}

function claimView(claim: Claim, numbers: ReadonlyMap<string, number>, sources: ReadonlyMap<string, Source>): ClaimView {
  const citations: CitationView[] = claim.evidence.map((evidence) => {
    const source = sources.get(evidence.source_id);
    const number = numbers.get(evidence.source_id);
    if (!source || number === undefined) {
      throw new Error(
        `claim "${claim.id}" (approach "${claim.approach_id}", field "${claim.field}") ` +
          `cites source "${evidence.source_id}", which the approach does not list.`,
      );
    }
    return {
      number,
      sourceId: source.id,
      anchor: `source-${source.id}`,
      relation: evidence.relation,
      relationLabel: termLabel(evidence.relation),
      locator: evidence.locator ?? null,
      title: source.title,
    };
  });
  citations.sort((a, b) => a.number - b.number);
  return {
    id: claim.id,
    anchor: `claim-${claim.id}`,
    field: claim.field,
    label: fieldLabel(claim.field),
    text: claim.text,
    kind: claim.kind,
    kindLabel: termLabel(claim.kind),
    provenanceLabel: termLabel(claim.provenance),
    confidenceLabel: termLabel(claim.confidence),
    confidenceReason: claim.confidence_reason,
    validAt: claim.valid_at,
    isMetric: claim.kind === 'metric',
    caveats: caveats(claim),
    qualification: qualification(claim),
    metadata: metadata(claim),
    showCitationRoles:
      citations.length > 1 || citations.some((item) => item.relation !== 'supports'),
    supporting: citations.filter((item) => item.relation === 'supports'),
    contextualizing: citations.filter((item) => item.relation === 'contextualizes'),
    contradicting: citations.filter((item) => item.relation === 'contradicts'),
    citations,
  };
}

/**
 * Say what the catalog classifies this entry as.
 * The record, not the classification, says whether a workflow is reported.
 */
function supportingSystemNote(approach: Approach, workflowClaims: number): string | null {
  if (!SUPPORTING_TYPES.has(approach.approach_type)) return null;
  const classification =
    `This entry describes supporting infrastructure that other work builds on. ` +
    `The catalog classifies it as a ${termLabel(approach.approach_type).toLowerCase()}.`;
  const workflow =
    workflowClaims > 0
      ? `The record also reports a workflow.`
      : `The record reports no execution workflow.`;
  return `${classification} ${workflow}`;
}

function relatedEntries(catalog: Catalog, approach: Approach): RelatedEntryView[] {
  const byId = new Map(catalog.approaches.map((item) => [item.id, item]));
  const related: RelatedEntryView[] = [];
  const add = (id: string, relationLabel: string) => {
    const target = byId.get(id);
    if (!target || target.id === approach.id) return;
    if (related.some((item) => item.id === target.id)) return;
    related.push({
      id: target.id,
      path: entryPath(target.id),
      company: target.company,
      agentName: target.agent_name,
      relationLabel,
    });
  };
  for (const relationship of approach.relationships ?? []) {
    add(
      relationship.approach_id,
      relationship.type === 'component-of' ? 'This entry is a component of' : 'Related implementation',
    );
  }
  for (const other of catalog.approaches) {
    for (const relationship of other.relationships ?? []) {
      if (relationship.approach_id !== approach.id) continue;
      add(
        other.id,
        relationship.type === 'component-of' ? 'Names this entry as its context' : 'Related implementation',
      );
    }
  }
  return related;
}

/** Build the reading model of one entry from the normalized catalog. */
export function entryView(catalog: Catalog, id: string): EntryView {
  const approach = requireApproach(catalog, id);
  const allSources = sourcesById(catalog);
  const allClaims = new Map(catalog.claims.map((claim) => [claim.id, claim]));

  const numbers = new Map<string, number>();
  const sources: SourceView[] = approach.source_ids.map((sourceId, index) => {
    const source = allSources.get(sourceId);
    if (!source) throw new Error(`approach "${approach.id}" lists unknown source "${sourceId}".`);
    numbers.set(sourceId, index + 1);
    return sourceView(source, index + 1);
  });

  const claims = approach.claim_ids.map((claimId) => {
    const claim = allClaims.get(claimId);
    if (!claim) throw new Error(`approach "${approach.id}" lists unknown claim "${claimId}".`);
    return claimView(claim, numbers, allSources);
  });

  const of = (test: (claim: ClaimView) => boolean) => claims.filter(test);
  const summary = claims.find((claim) => claim.field === 'summary') ?? null;
  const workflowClaims = of((claim) => claim.field.startsWith('primitives.'));
  const supervisionClaims = of((claim) => claim.field.startsWith('operating_models.'));
  const architectureClaims = of((claim) => claim.field.startsWith('architecture.'));
  const resultClaims = of(
    (claim) => claim.field === 'headline_metric' || claim.field.startsWith('key_metrics.'),
  );
  const metricClaims = resultClaims.filter((claim) => claim.isMetric);
  const resultStatementClaims = resultClaims.filter((claim) => !claim.isMetric);
  const lessonClaims = of((claim) => claim.field.startsWith('lessons_learned.'));
  const placed = new Set(
    [summary, ...workflowClaims, ...supervisionClaims, ...architectureClaims, ...resultClaims, ...lessonClaims]
      .filter((claim): claim is ClaimView => claim !== null)
      .map((claim) => claim.id),
  );

  return {
    id: approach.id,
    path: entryPath(approach.id),
    company: approach.company,
    companyId: approach.company_id,
    companyView: companyView(catalog, approach.company_id),
    agentName: approach.agent_name,
    title: `${approach.company} — ${approach.agent_name}`,
    approachType: approach.approach_type,
    approachTypeLabel: termLabel(approach.approach_type),
    isSupportingSystem: SUPPORTING_TYPES.has(approach.approach_type),
    supportingSystemNote: supportingSystemNote(approach, workflowClaims.length),
    summary,
    summaryText: summary?.text ?? '',
    reviewedAt: approach.last_reviewed_at,
    year: approach.year ?? null,
    statusLabel: termLabel(approach.status),
    deploymentStageLabel: termLabel(approach.deployment_stage),
    autonomyLabel: termLabel(approach.autonomy),
    evidenceStrengthLabel: termLabel(approach.rubric.evidence_strength),
    domains: approach.domains.map(termView),
    interfaces: (approach.interfaces ?? []).map(termView),
    invocation: approach.rubric.invocation.map(termView),
    operatingModels: approach.operating_models.map((model) => ({
      scope: model.scope,
      boundary: model.attention_boundary,
      boundaryLabel: termLabel(model.attention_boundary),
      level: model.level,
      levelLabel: levelLabel(model.level),
    })),
    workflowClaims,
    supervisionClaims,
    architectureClaims,
    metricClaims,
    resultStatementClaims,
    lessonClaims,
    otherClaims: claims.filter((claim) => !placed.has(claim.id)),
    claims,
    sources,
    relatedEntries: relatedEntries(catalog, approach),
    relatedNotes: notesForApproach(approach.id),
  };
}

export interface DirectoryCard {
  readonly id: string;
  readonly path: string;
  readonly company: string;
  /** The logo or monogram mark the card shows beside the company name. */
  readonly companyView: CompanyView;
  readonly agentName: string;
  readonly summary: string;
  /** The first sentences of the summary, for the directory card. */
  readonly excerpt: string;
  /** The text the directory search reads, normalized to lower case. */
  readonly search: string;
  readonly approachType: string;
  readonly approachTypeLabel: string;
  readonly domains: readonly TermView[];
  /** The attention boundaries of the scoped operating models, with their derived levels. */
  readonly boundaries: readonly BoundaryView[];
  readonly reviewedAt: string;
  /** The source identifiers of the entry, so an old source fragment can find its page. */
  readonly sourceIds: readonly string[];
}

/** An attention boundary as a filter term. The level is null when the boundary is unknown. */
export interface BoundaryView extends TermView {
  readonly level: number | null;
}

/** The length a directory card shows before it links to the whole entry. */
export const CARD_SUMMARY_LIMIT = 200;

/** Join the words a card is searchable by, in the form the browser compares. */
function searchText(parts: readonly string[]): string {
  return parts.join(' ').replace(/\s+/g, ' ').trim().toLowerCase();
}

/** Build the compact card of every implementation, ordered the way the directory reads. */
export function directoryCards(catalog: Catalog): DirectoryCard[] {
  const claims = new Map(catalog.claims.map((claim) => [claim.id, claim]));
  return sortedApproaches(catalog).map((approach) => {
    const summary = approach.claim_ids
      .map((claimId) => claims.get(claimId))
      .find((claim) => claim?.field === 'summary');
    const levels = new Map(
      approach.operating_models.map((model) => [model.attention_boundary, model.level]),
    );
    if (levels.size === 0) levels.set('unknown', null);
    const boundaries: BoundaryView[] = [...levels.keys()]
      .sort()
      .map((id) => ({ ...termView(id), level: levels.get(id) ?? null }));
    const domains = approach.domains.map(termView);
    return {
      id: approach.id,
      path: entryPath(approach.id),
      company: approach.company,
      companyView: companyView(catalog, approach.company_id),
      agentName: approach.agent_name,
      summary: summary?.text ?? 'Unknown',
      excerpt: shorten(summary?.text ?? 'Unknown', CARD_SUMMARY_LIMIT),
      search: searchText([
        approach.company,
        approach.agent_name,
        summary?.text ?? '',
        approach.approach_type,
        termLabel(approach.approach_type),
        ...domains.flatMap((domain) => [domain.id, domain.label]),
        ...boundaries.flatMap((boundary) => [boundary.id, boundary.label, levelLabel(boundary.level)]),
        approach.autonomy,
        termLabel(approach.autonomy),
      ]),
      approachType: approach.approach_type,
      approachTypeLabel: termLabel(approach.approach_type),
      sourceIds: approach.source_ids,
      domains,
      boundaries,
      reviewedAt: approach.last_reviewed_at,
    };
  });
}
