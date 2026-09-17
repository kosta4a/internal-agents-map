# Plan 010: Apply the page-content standard to a second reviewed batch

> Prepared on 2026-09-17 after the user set the goal: implement the next
> `page_content` batch. This plan inherits the Plan 009 contract without change.
> The data contract, coverage tooling, reading model, and export parity already
> exist on `main`; this batch only opts in more records through editorial review.

## Status

- Priority: P1.
- Effort: M; one full source-review pass over 14 captures plus verification.
- Risk: medium, concentrated in claim backfill for the supporting system and
  test fixtures that name batch records as legacy examples.
- Category: editorial coverage.
- Branch: work on `main` in the shared checkout; the user authorized this batch.
- Depends on: Plan 009 (contract, tooling) — complete and merged as `5674e69`.

## Goal

Five more records carry a complete `page_content` review (seven question
dispositions, eight implementation-field dispositions, primitive roles,
observation metadata), each grounded in a full read of that record's preserved
captures. The batch is mixed so the reviewer sees the standard against shapes
the pilot did not cover:

| Record ID | Approach type | Sources / capture lines | What this batch tests |
| --- | --- | --- | --- |
| `plaid-internal-mcp-server` | supporting-pattern | 1 / 97 | The supporting-system variant the pilot deferred: request, authorization, execution, response. Probably needs primitive backfill. |
| `spotify-honk-xirp` | agent-system | 3 / 279 | The `agent-system` approach type, absent from the pilot. |
| `block-builderbot` | orchestration-system | 5 / 228 | The `orchestration-system` type and a multi-capture review from five short sources. |
| `posthog-stamphog` | agent | 3 / 564 | A multi-source agent; pilot agents were single-source. |
| `cloudflare-ai-stack` | platform | 2 / 384 | A platform with several internal agents and four metrics, against Notion's single-use platform. |

The four records with open Plan 006 research flags (`airbnb-airchat`,
`databricks-costar`, `hubspot-sidekick`, `microsoft-prassistant`) stay out of
this batch; their source-versus-claim questions are separate follow-up work.

## Procedure

Per record, follow the Plan 009 Step 2 review discipline:

1. Read the full preserved capture (`archive/sources/<source-id>/content.md`)
   for every source of the record, not only the locators already cited.
2. Track all seven questions and all eight architecture fields. Complete the
   capture read before marking any disposition `unreported`; the note states
   the checked evidence boundary.
3. Keep claim identity: never reorder, rewrite, or remove existing indexed
   claims. Append new claims only when the capture supports them, with source
   ID, exact locator, and `claim_metadata` including a claim-specific
   confidence reason.
4. Dispositions follow the Plan 009 state table. `reported` slots reference
   same-entry claims supported by a reviewed source. Every other state carries
   an empty claim list and a concrete note.
5. `primitive_roles` covers every primitive; the workflow question names
   exactly the workflow-role claims in reading order and `workflow_scope`
   labels the run. `observations` covers the headline and every key metric
   with category, basis, and subject, or a confirmed `duplicate_of`.

## Scope

- The five `data/agents/<id>.yaml` files above.
- `tests/web/entry-view.test.ts` (the legacy fixture moves off
  `block-builderbot`), `tests/e2e/entry-pages.spec.ts` (extend the pilot
  assertions to the new records), and other tests that hardcode these IDs as
  legacy examples.
- Generated outputs through `scripts/build.py` only: `data/agents.json`,
  `README.md`, `docs/landscape.md`, and generated snapshot blocks.
- `plans/010-source-review.md`, `plans/010-batch-review.md`, and
  `plans/010-content-coverage.json`; this plan and `plans/README.md`.

Out of scope: the other 30 legacy records, the contract and tooling, source
recapture, taxonomy or supervision changes, notes, and deployment.

## Gates

- `uv run --locked python scripts/build.py` then `--check` exit 0.
- `npm run verify` exits 0 end to end, including Playwright.
- `scripts/content_coverage.py --check` reports the five new records valid;
  the coverage JSON shows 10 reviewed records and 30 `legacy-unassessed`.
- No `not-reviewed` disposition remains among the five new records; every
  disposition is `reported`, `unreported`, or `not-applicable`.
- Rendered-page check for all five pages at desktop and mobile widths.

## Stop conditions

Inherited from Plan 009: stop the affected record if a capture contradicts a
named claim or classification, if claim identity would be lost, or if an
honest disposition requires changing the contract. Record the conflict in
`plans/010-source-review.md` and continue with the other records.

## Execution record

- 2026-09-17: plan written; baseline gates pass (`build.py --check`,
  `content_coverage.py --check`) at `ed4ea5a`.
- 2026-09-17: executed. Five parallel record reviews (two waves of three and two)
  read all fourteen captures in full, appended 17 supported claims, and wrote each
  record's `page_content` block. Central verification repaired comma-damaged flow-map
  notes in two records, reverted one over-confirmed observation duplicate (Plaid
  `key_metrics.0`), and applied one claim correction (Cloudflare `key_metrics.1`
  request-count attribution). Test fixtures relocated as planned; pilot counts and
  ID lists extended to ten records. Full `npm run verify` passed: 152 Vitest,
  201 Python, 346 Playwright across desktop, mobile, and no-JavaScript projects.
  Coverage JSON shows 10 reviewed records, 30 `legacy-unassessed`, 75 new
  dispositions with no `not-reviewed`. Artifacts: `010-source-review.md`,
  `010-batch-review.md`, `010-content-coverage.json`, and ten screenshots.
  Status: COMPLETE.
