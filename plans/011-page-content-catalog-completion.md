# Plan 011: Complete the page-content standard across the catalog

> Prepared on 2026-09-17 after the user set the goal: migrate the remaining 30
> records to `page-content-v1` on a dedicated branch, using parallel review
> agents. The Plan 009/010 contract, tooling, and reading model are unchanged.
> This is the catalog-wide migration the pilot review deferred to an explicit
> decision; the user made that decision on 2026-09-17.

## Status

- Priority: P1.
- Effort: L; 30 records, ~11,400 preserved capture lines, 3 research flags.
- Risk: medium, concentrated in the three flagged records, the heaviest capture
  (openai-software-factory, 2,651 lines), and tests that use real records as
  legacy examples.
- Category: editorial coverage.
- Branch: `plan-011-page-content-catalog`.

## Goal

All 40 records carry a complete `page_content` review (seven question
dispositions, eight implementation-field dispositions, primitive roles,
observation metadata), each grounded in a full read of that record's preserved
captures. No legacy-unassessed records remain. The Plan 006 research flags on
`airbnb-airchat`, `databricks-costar`, and `hubspot-sidekick` are resolved
first, in the same reviews, by checking each flagged claim against its captures
and correcting claim text or metadata where the captures do not support it
(claim IDs and field paths preserved; corrections recorded).

## Procedure

Per record, the Plan 009 Step 2 discipline plus the Plan 010 lessons:

1. Read every preserved capture of the record in full.
2. Resolve any research flag before dispositions: verify the flagged claim
   against the capture; correct or hedge claim text/metadata if unsupported.
3. Track the seven questions and eight fields; complete the capture read before
   any `unreported`; notes state the checked evidence boundary.
4. Never reorder, rewrite, or remove existing claims; append supported claims
   with source ID, exact locator, and claim-specific `claim_metadata`.
5. Duplicate confirmation uses the criterion this plan adds to `data/schema.md`:
   an alias must add nothing the canonical lacks — subject, value, period,
   scope, and qualifications all equal. Similar numbers do not merge.
6. Authoring rules: quote every prose value inside a YAML flow map (unquoted
   commas silently split the map); each review agent runs the disposition
   key-scan on its own file before reporting.

Waves of at most five concurrent reviews, sized by capture volume; the
coordinator verifies each wave (deep key-scan, `build.py`,
`content_coverage.py --check`), corrects findings, and commits per wave with
explicit paths. The three smallest records are reviewed by the coordinator.

## Scope

- The remaining 30 `data/agents/<id>.yaml` files.
- `data/schema.md` (the duplicate-confirmation criterion).
- Tests that pin adoption counts or use real records as legacy examples: counts
  move to 40, and legacy-path tests switch to synthetic fixtures once no legacy
  record remains.
- Generated outputs through `scripts/build.py`; `plans/011-*` artifacts;
  `plans/README.md`.

Out of scope: contract or tooling changes, source recapture, taxonomy or
supervision changes, notes, deployment.

## Gates

- After each wave: deep key-scan clean, `build.py --check`,
  `content_coverage.py --check` pass.
- Final: `npm run verify` exits 0 end to end; coverage JSON shows 40 reviewed
  records, zero `legacy-unassessed`, zero `not-reviewed` dispositions;
  rendered-page check across desktop, mobile, and no-JavaScript projects.

## Stop conditions

Inherited from Plans 009/010: a capture contradicting a named claim stops that
record (resolve as a flag correction or mark pending and continue others);
claim identity must never be lost; an honest disposition must never require a
contract change.

## Execution record

- 2026-09-17: plan written; branch created from `92d5222` (Plan 010 committed,
  unpushed). Baseline gates pass.
