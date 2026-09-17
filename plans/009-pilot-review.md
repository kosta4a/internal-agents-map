# Plan 009 pilot review

Reviewed on 2026-09-17 against the reconstructed Plan 009 baseline. This review
covers the five opted-in records and the six preserved source captures listed in
`009-pilot-source-review.md`.

## Recommendation

Adopt `page_content` for additional records in small reviewed batches. The pilot
made workflow, human involvement, validation, observation type, and evidence gaps
materially easier to distinguish without changing the legacy view for the other 35
records. Keep adoption editorial and source-led: each migrated record needs a full
capture review, explicit dispositions, and a rendered-page check. Do not infer
`unreported` for the remaining catalog from their current empty fields.

Before a catalog-wide migration, retain the current contract and gather reviewer
feedback from another mixed batch, including a supporting system. The pilot found
that architecture coverage varies enough that a public completeness score would be
misleading, while explicit field-level states are useful.

## Coverage before and after

Before the pilot, all 40 records used the legacy reading model. The five selected
records had no recorded seven-question review, no field-by-field architecture
dispositions, and no normalized distinction between raw and canonical
observations.

After the pilot:

- 5 records use `page-content-v1`; 35 remain `legacy-unassessed`.
- All five have seven question dispositions and eight implementation-field
  dispositions: 75 dispositions total, with 51 `reported`, 24 `unreported`, and no
  `not-reviewed` or `not-applicable` dispositions.
- The records contain 17 raw observations and 15 canonical observations. The two
  confirmed aliases remain available in research details with their stable claim
  IDs, evidence, qualifications, and links to the canonical reading location.
- All reviewed source IDs are current for the five records; the coverage report has
  no unreviewed source IDs or pending next actions.
- HTML, per-entry Markdown, per-entry JSON, and the generated landscape preserve the
  same review states and content distinctions.

The deterministic result is recorded in `009-content-coverage.json`.

## Evidence decisions

`009-pilot-source-review.md` records the passages, locators, scope limits, metadata
reasons, and final challenge pass for each source. The main editorial decisions were:

- Qubot describes a data-question run through its invocation, federated context,
  routing, answer/report, and offline evaluation. Its speed comparison remains
  scoped rather than becoming a general seconds-to-answer promise.
- Notion uses the security-team workflow as a representative internal use. Platform
  permissions and owner confirmation remain distinct from that workflow, and the
  Slack over-posting incident remains a reported failure rather than a general
  capability claim.
- Microsoft separates adoption/output counts from the early cohort's reported
  10–20% median PR completion-time improvement and preserves the study limits.
- DoorDash separates the staged review, optional fixer handoff, validation, and
  precision/recall tradeoffs. Cost and latency are observations about the current
  reviewed system, not evidence of effectiveness.
- YC uses the finance/research run as the representative workflow and keeps shared
  infrastructure capabilities separate. The source reports no measured outcome for
  that workflow, so the page renders an explicit reviewed empty observations state.

The duplicate decisions are limited to Notion `key_metrics.0` and DoorDash
`key_metrics.0`, each linked to `headline_metric`. They were manually confirmed as
the same subject, statement/value, period, scope, and qualifications. No other
similar-looking observations were merged.

## Remaining unsupported details

The checked sources do not establish the following details. These are recorded as
`unreported`, bounded to the named reviewed captures:

- Qubot: a required human checkpoint, a separate transferable lesson, cloud-host
  isolation guarantees, and credential handling.
- Notion: a single model for the representative workflow, execution isolation, and
  a separate lessons claim.
- Microsoft: the model, orchestration harness, isolation, tool permissions, context
  management, credential handling, a specific hosting interface, and a separate
  lessons claim.
- DoorDash: the current model, remote-VM isolation guarantees, context management,
  and credential handling.
- YC: a required runtime approval checkpoint for the finance workflow, a measured
  outcome for that workflow, its model, execution isolation, and credential
  handling.

Existing legacy placeholders remain available in research details where applicable;
they were not promoted to reported architecture facts.

## Rendered-page review

All five pages were exercised in the desktop, mobile, and no-JavaScript Playwright
projects. Focused checks cover section order, visible review states, meaningful
workflow scope, separate lessons, the YC empty observations state, the single
reading-flow representation of aliases, JSON/Markdown parity, unique claim IDs, and
viewport overflow.

Ten screenshots under `plans/` record desktop and mobile views for each pilot page.
Visual inspection found readable flow, working disclosure controls and citation
links, and no horizontal overflow. The review caught one attribution-layout issue in
the claim grid; the CSS was corrected and the affected desktop and mobile pages were
rechecked.

## Verification

- Baseline reconstruction: 443 of 443 file fingerprints matched; the baseline patch
  SHA-256 matched the planned digest.
- `uv run --locked python -m unittest discover -s tests -p test_build.py`: 53 passed.
- `npx vitest run tests/web/catalog.test.ts tests/web/entry-view.test.ts tests/web/exports.test.ts`:
  68 passed.
- `uv run --locked python -m unittest discover -s tests -p test_content_coverage.py`:
  2 passed.
- `uv run --locked python scripts/content_coverage.py --check`: valid for 40 entries.
- `uv run --locked python scripts/archive_sources.py --check`: 107 source captures
  validated.
- Focused pilot Playwright run: 211 passed, 2 skipped across desktop, mobile, and
  no-JavaScript projects.
- `npm run verify`: exited 0; 152 Vitest tests and 14 negotiation tests passed, the
  Python suite passed, and the complete Playwright run finished with 327 passed and
  39 expected no-JavaScript skips. Astro reported 19 existing deprecation hints and
  no errors or warnings.

The source captures are byte-identical to the baseline. Exactly the five permitted
agent YAML records changed; the other 35 agent records retained their baseline
bytes. This review establishes completion of the source and presentation pass, not
independent verification of company-reported outcomes.
