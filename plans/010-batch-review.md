# Plan 010 batch review

Reviewed 2026-09-17. This second batch applies the Plan 009 `page-content` contract
to five more records without changing the contract, the tooling, or the legacy
reading model of the other 30 records. Full sections per record are in
`010-source-review.md`; the coverage view is `010-content-coverage.json`.

## Recommendation

Continue batch adoption. The contract held unchanged against five shapes the pilot
did not cover, including the deferred supporting-system variant. Two review-time
findings deserve written follow-up: an explicit duplicate-confirmation criterion
(the Plaid revert below) and an authoring note about commas in YAML flow-map notes.
A next batch can be larger; the per-record cost fell once the playbook existed.

## Coverage before and after

- Before: 5 records on `page-content-v1`, 35 `legacy-unassessed`.
- After: 10 reviewed records, 30 `legacy-unassessed`. The batch adds 75 dispositions:
  62 `reported`, 12 `unreported`, 1 `not-applicable`, and no `not-reviewed`.
- 14 captures read in full (1 + 3 + 5 + 3 + 2 across the five records).
- 17 claims appended (13 workflow/validation primitives, 1 context-management
  architecture field, and the supporting-system primitive set for Plaid), each with
  evidence locators and claim-specific metadata. No existing claim was reordered,
  rewritten, or removed — except one correction, recorded below.

Per record:

| Record | Reported | Unreported | Not applicable | Aliases |
| --- | ---: | ---: | ---: | ---: |
| plaid-internal-mcp-server | 9 | 5 | 1 | 0 |
| spotify-honk-xirp | 12 | 3 | 0 | 1 |
| block-builderbot | 12 | 3 | 0 | 1 |
| posthog-stamphog | 14 | 1 | 0 | 2 |
| cloudflare-ai-stack | 15 | 0 | 0 | 0 |

## What the batch tested and found

- **The supporting-system variant works.** Plaid produced a request →
  authenticate → authorize → respond workflow from its capture, reported human
  involvement as an authenticated identity rather than a checkpoint, and produced
  the catalog's first `not-applicable` disposition: an internal MCP server runs no
  model, so `implementation_fields.model` is not applicable rather than unreported.
- **Duplicate confirmation needs one written criterion.** Plaid `key_metrics.0`
  was first marked a duplicate of the headline, then reverted during verification:
  it adds an absence note (MCP-server adoption share not reported) that the
  compound headline lacks, so its qualifications differ. The working rule this
  batch validates: an alias must add nothing the canonical lacks — not text
  similarity. PostHog's two component aliases of its compound headline pass that
  rule; Plaid's did not. Write the criterion into `data/schema.md` before the next
  batch.
- **Compound headlines are the norm in multi-metric records.** Three of five
  records carry one; the alias mechanism handled each without layout changes.
- **Version drift is visible but out of contract.** PostHog's captures disagree on
  resolver version and line ceilings; claims stay version-neutral and the drift is
  recorded in the source review. A version axis is future scope, not a stop.
- **Deliberate exclusions held.** Spotify numbers about AI tools generally and
  about deterministic Fleetshift transforms, and Cloudflare's Kimi K2.5 security
  workload, were read and left unclaimed.

## Corrections applied during review

- Cloudflare `key_metrics.1` said "47.95M AI requests and 241.37B tokens via AI
  Gateway"; the capture gives 47.95M total AI requests, 20.18M AI Gateway requests
  per month, and 241.37B Gateway-routed tokens. The claim now separates the three
  counts, and the headline's `measurement_method` no longer calls the total an
  "AI Gateway count". Claim ID and field path unchanged.
- Plaid `key_metrics.0` reverted from alias to canonical observation (above).

## Test and tooling changes

- Legacy-path fixtures moved off batch records: `block-builderbot` →
  `replit-manager-agent` (entry view), both results-layout tests → `ramp-inspect`
  (the remaining legacy record with an opinion key metric).
- Plaid's "reports no workflow" expectations became workos-style "does not deny
  the reported workflow" in both the view and e2e suites.
- Pilot counts 5 → 10 in `tests/web/catalog.test.ts` and
  `tests/test_build.py`; pilot ID lists extended to the five new records.

## Commands and results

- `uv run --locked python scripts/build.py` and `--check`: pass.
- `uv run --locked python scripts/content_coverage.py --check`: pass, 40 entries.
- `npm run verify`: pass end to end — 152 Vitest, 201 Python, 346 Playwright
  (desktop, mobile, no-JavaScript), site check, archive, link, and private-data
  checks.

## Rendered-page review

The extended Playwright pilot suite renders all ten reviewed pages across desktop,
mobile, and no-JavaScript projects, asserts the full anchor set, unique claim IDs,
working Markdown exports, and no horizontal overflow, and captures desktop and
mobile screenshots recorded under `plans/`. The five new pages show workflow
scopes, honest unreported states (Plaid sandbox/credentials, Spotify human
involvement), Plaid's not-applicable model row, and PostHog's alias disclosures
without layout defects.
