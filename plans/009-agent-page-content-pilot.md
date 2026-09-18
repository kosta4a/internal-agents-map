# Plan 009: Pilot a shared content standard on five agent pages

> Proposal prepared on 2026-09-17. The user requested a branch and an implementation
> proposal. The branch exists; implementation, commits, and publication are not part
> of this planning turn. Execution starts only when the user asks to proceed.
>
> Executor: read this plan in full. Preserve the existing editorial follow-up in the
> working tree. Run the verification gate for each step and record the results here.
> Source interpretation still needs review after automated checks pass.

## Status

- Priority: P1.
- Effort: L; approximately 3–5 working days including source review and visual review.
- Risk: medium, concentrated in claim placement, export compatibility, and inherited work.
- Category: editorial coverage, information architecture, and data contracts.
- Branch: `codex/agent-page-content-pilot`.
- Planned at: commit `e10443b`, plus the uncommitted working state fingerprinted in
  `plans/009-agent-page-content-pilot-baseline.json`.
- Depends on: Plan 008's existing corrections and the 2026-09-17 editorial follow-up.
  Publication of that follow-up is not needed to develop the pilot locally.
- Status: COMPLETE — implemented on `codex/plan-009-executor`, reviewed at
  `4db2e54`, and integrated into the `codex/agent-page-content-pilot` working tree
  following user approval. Merge to main approved on 2026-09-17.

## Intended result

A reader can identify the system's purpose, one documented workflow, the human
checkpoints, the implementation, how work is checked, what was observed, and what
can be learned. Where the checked evidence cannot answer a question, the page says
why. The same distinctions survive HTML, Markdown, and JSON delivery.

The pilot covers exactly these records:

| Record ID | What it tests |
| --- | --- |
| `github-qubot` | A data-question workflow, federated context, query routing, and evaluations. |
| `notion-custom-agents` | A platform with a representative internal use, permissions, and a reported failure. |
| `microsoft-prassistant` | A review workflow whose adoption counts and completion-time observation have different meanings. |
| `doordash-code-review` | A staged review process, optional fixer, validation, cost/latency, and quality tradeoffs. |
| `ycombinator-agent-infra` | Shared internal infrastructure and a representative use without a required outcome metric. |

Success does not require every field to contain an implementation fact or every
entry to report a measured benefit. It requires supported answers and explicit
review states. A catalog-wide migration is a later decision informed by this pilot.

## Baseline and preservation

The branch was created from the current checkout of `main`; HEAD remains `e10443b`.
At branch creation there were 53 modified tracked files and an untracked
`docs/lesson-review-2026-09.md`. They belong to an existing Plan 008 editorial
follow-up, not to this pilot. Its lesson wording, confidence reasoning, source
locators, notes, and tests are part of the baseline to preserve.

The normalized working catalog contains 40 approaches, 35 organizations, 590 claims,
and 107 sources. `uv run --locked python scripts/build.py --check` passed during
planning. The full implementation verification suite was not rerun for this proposal.

The baseline JSON fingerprints 443 files outside `plans/`, including the existing
untracked review document. It records the starting status and commit. The companion
`plans/009-agent-page-content-pilot-baseline.patch` stores the full binary-capable
tracked diff from that commit plus the untracked review document. Together, the
commit and patch reconstruct the starting bytes for a real baseline-to-pilot diff.
The patch excludes `plans/`; preserve both baseline artifacts unchanged.

Baseline patch SHA-256: `a5d8bf2a8de27cbbcf93dbb02c4ea5ebb92303be86757a3f2576b4891dde5395`.

Before implementation, reconstruct the snapshot in a disposable directory using
`git archive <planned_at_commit>` followed by `git apply` of the absolute patch path,
and verify every reconstructed file against the JSON fingerprints. Use an ignored
`node_modules/.cache/agent-page-pilot-baseline/` directory (or an external temporary
directory), never apply this baseline patch to the current working checkout. Compare
final file contents and new-file inventory against that reconstructed snapshot,
including overlapping files that already had uncommitted edits. Hashes alone cannot
show which hunks belong to the pilot. The source reconstruction must pass all 443
fingerprints before it can serve as the review baseline.

Before implementation, compare the current bytes with that snapshot:

```sh
python3 - <<'PY'
import hashlib, json
from pathlib import Path
snapshot = json.loads(Path('plans/009-agent-page-content-pilot-baseline.json').read_text())
changed = []
for name, expected in snapshot['files'].items():
    path = Path(name)
    if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != expected:
        changed.append(name)
print('\n'.join(changed) if changed else 'Working baseline matches')
raise SystemExit(bool(changed))
PY
```

Expected before any pilot edits: `Working baseline matches`. If later authorized
work changed a file, reconcile its diff and explicitly update this plan's baseline
record before proceeding. Do not restore the old bytes to make the check pass.
A comparison against HEAD alone is insufficient because the editorial work is
uncommitted. Once implementation starts, compare changes against the snapshot and
the scope below, rather than requiring all files to keep their original hashes.

## Current implementation and constraints

- `data/agents/*.yaml` is the authored source. Evidence points from a claim path to
  source IDs and locators; `claim_metadata` holds kind, provenance, confidence, and
  observation qualifications.
- `scripts/build.py:493` derives claims. A primitive currently becomes
  `item.get("desc") or item.get("name")`, so its name disappears when both exist.
  `normalize()` creates claim IDs from the entry ID and field path. Reordering list
  items can therefore change the identity of a claim.
- `src/lib/entry-view.ts:390` treats every `primitives.*` claim as a workflow and
  divides results only into metric and non-metric claims. It does not distinguish
  operational steps from mechanisms, or adoption from effectiveness.
- `src/pages/agents/[id].astro:48` includes lessons in `hasResults`; absent
  architecture rows render as `N/A` at line 175. A missing implementation section
  can conceal all eight missing fields.
- `src/components/Claim.astro` already labels catalog interpretations and reported
  opinions. Preserve this work. Supporting citations and locators are currently in
  `ResearchDetails.astro` rather than beside each ordinary claim.
- `src/lib/exports.ts` serves per-entry Markdown and JSON from the same normalized
  catalog. `scripts/check_site.py:119` requires every claim ID and its qualifications
  exactly once in the HTML coverage markers, plus all claim text somewhere on the
  page. Do not weaken that rule to hide deduplicated claims.
- `tests/web/entry-view.test.ts` verifies that every claim is placed and that anchors,
  evidence roles, and metric research fields survive. Extend that invariant.
- `tests/web/exports.test.ts` verifies that Markdown retains claim text and caveats.
  Preserve the information while allowing explicit duplicate representations to move
  to research details.

Current pilot content, counted from normalized claims:

| Record | Workflow items | Implementation fields | Result claims including headline | Lessons |
| --- | ---: | ---: | ---: | ---: |
| Qubot | 0 | 2 | 3 | 0 |
| Notion | 0 | 0 | 4 | 0 |
| Microsoft reviewer | 0 | 0 | 4 | 0 |
| DoorDash reviewer | 1 | 5 | 3 | 2 |
| YC | 0 | 2 | 0 | 2 |

Match `DESIGN.md`: ABC Areal, the existing 684px reading column, white backgrounds,
Radix Sand, the shared mobile layout with 24px padding, and existing tables and soft
panels. Keep keyboard access and the no-JavaScript reading experience. Python owns
record validation/generation; TypeScript owns the shared reading model; Astro renders
it. Do not introduce another framework, database, dependency, or editor application.

## Proposed data contract

Use one optional `page_content` block in an existing agent YAML record. It opts that
record into the pilot reading model. The other 35 records retain their current
reading model and content. Do not hardcode the five IDs in application rendering.

This is an additive extension of catalog schema version 6: existing fields, claim
IDs, and meanings remain available. Add optional TypeScript types and runtime
validation; keep the existing schema version. If the implementation would remove,
rename, or reinterpret existing export fields, stop and revise the migration design.

### Coverage metadata

`page_content` contains:

- `version: 1` for this optional block's format.
- `reviewed_at`: the date this content review was completed, distinct from source
  verification dates and the date a company measured a result.
- `source_ids`: the source captures actually read for this content review. IDs must
  belong to the entry. Re-reading a capture must not update `last_verified_at`.
- `questions`: exactly seven keys: `purpose`, `workflow`, `human_involvement`,
  `implementation`, `validation`, `observations`, and `lessons`.
- `implementation_fields`: exactly the existing eight architecture keys, with an
  individual disposition for each. Keep this separate from the section-level answer;
  a useful implementation section can still have several undocumented fields.
- Optional `workflow_scope`: a short label for the specific run being described.
  It is required when the workflow question is reported. Keep the claim text itself
  in the existing evidence-linked fields.
- `primitive_roles`: every existing `primitives.N` in the opted-in record maps to
  exactly one of `workflow`, `mechanism`, or `validation`. The ordered
  `questions.workflow.claim_paths` list defines workflow reading order and must name
  exactly the claims with the workflow role. Preserve every existing indexed claim
  at its original path; append new items. Never reorder or remove existing primitive,
  metric, or lesson items in this pilot. A needed identity migration is a stop
  condition, not a metadata-remapping exercise.
- `observations`: metadata keyed by every existing `headline_metric` and
  `key_metrics.N` claim in the opted-in record, as specified below. Use an empty map
  for a record without observation claims.

Each question or implementation-field disposition has `state`, `claim_paths`, and
an optional `note`. The note is a concise editorial explanation, not an unsupported
implementation claim. Paths resolve only to claims belonging to this record.

| State | Validation | Reader meaning |
| --- | --- | --- |
| `reported` | One or more supported, relevant claim paths are required. | The checked sources answer this question. |
| `unreported` | Empty claim paths, a reason, and a nonempty reviewed source list are required. | Not documented in the reviewed sources. |
| `not-applicable` | Empty claim paths and a concrete reason are required. | This question does not apply to the named scope. |
| `not-reviewed` | Empty claim paths and a next research action are required in `note`. | The catalog has not completed this part of the review. |

A legacy record without this block is not automatically `unreported` or
`not-reviewed`; its review disposition is simply not recorded in this format.
The editorial coverage output must say that. Likewise, a missing value, a literal
`unknown`, and an evidence-strength label must not determine a disposition.

For `reported`, validate that every referenced claim has a supporting evidence link
into the reviewed source set. Editorial review still checks that the passage answers
the question. A quoted absence claim or an `unknown` supervision judgment does not
by itself establish a reported implementation detail or review checkpoint. Existing
such claims remain in research details even if the public slot is `unreported`.

`implementation_fields.<key>` may reference only `architecture.<key>` when reported.
Give vague pilot fields such as `Not specified` an honest review state; keep the
existing placeholder claim in research details unless supported new content can
replace its text at the same field path. Do not delete it to satisfy the page layout. Do not describe approval policy as credential handling or a harness as
an underlying model merely to populate a row.

### Workflow and validation

Use the existing primitive claim text and evidence, with `primitive_roles` deciding
where it is shown. Add an optional `display_name` to normalized primitive claims for
opted-in entries so that both the existing name and description survive generation.
The claim ID and `text` stay stable. The display name must be supported by the same
passage as the description; it cannot introduce a new architectural assertion.

Workflow prose should expose trigger/input, relevant context, actions, checks,
output, and human involvement where the source supplies them. Do not manufacture
missing transitions or force a sequential list of architecture components into a
run. Put reusable components under implementation and validation/failure behavior
under its own heading. A question may reference a claim already shown elsewhere;
link to that claim instead of duplicating its ID and full text.

For Notion and YC, explicitly name the representative workflow and distinguish its
behavior from platform-wide capabilities. For a future supporting-system record,
the same contract can describe request, authorization, execution, and response; do
not add a sixth research entry solely to demonstrate that variant in this pilot.

### Observations and duplicate representations

For each canonical observation, record these independent axes:

- `category`: `effectiveness`, `adoption-output`, `cost-latency`,
  `implementation-scale`, or `runtime-capacity`.
- `basis`: `reported-measurement`, `qualitative`, `estimate`, or `target`.
- `subject`: the specific component, workflow, or population described.

These are editorial descriptions, not a replacement for existing claim kind,
provenance, confidence, or metric metadata. A reported measurement remains
self-reported unless evidence establishes independent verification. Keep dates,
scope, denominator, baseline, method, and limitations where supplied; record a
baseline in `metric_scope` or existing qualification text instead of inventing a
parallel metric schema during this pilot.

An observation that duplicates another may instead hold `duplicate_of` (a same-entry
observation claim path) and a reason. Reject missing targets, self references, cycles,
and chains. Require manual confirmation of identical subject, value/statement,
period, scope, and qualifications. Do not deduplicate different observations merely
because their text or number is similar.

Render one canonical observation in the reading flow. Preserve the alias claim's
ID, full text, evidence, and qualifications in research details, with a link to the
canonical observation. Each `data-claim-id` and anchor must still occur exactly once.
For Markdown, use an explicit duplicate-representations research subsection. JSON
retains both original claims and the duplicate relation. Coverage reports distinguish
raw claim count from unique observation count. Do not rewrite all six duplicate
entries; address confirmed duplicates in the five pilot records only.

## Scope

Only the following may change during implementation, measured against the working
baseline rather than HEAD:

- The five `data/agents/<id>.yaml` files named above.
- `data/schema.md`, `templates/agent.yaml`, `CONTRIBUTING.md`, and
  `.claude/skills/add-agent-from-url/SKILL.md` for the new optional contract and intake.
- `scripts/build.py`, `scripts/check_site.py`, and new `scripts/content_coverage.py`.
- `src/lib/catalog.ts`, `src/lib/entry-view.ts`, `src/lib/exports.ts`,
  `src/lib/labels.ts`, `src/pages/agents/[id].astro`, `src/components/Claim.astro`,
  `src/components/ResearchDetails.astro`, and minimal additions to
  `src/styles/components.css`.
- `tests/test_build.py`, `tests/test_check_site.py`, new
  `tests/test_content_coverage.py`, `tests/web/catalog.test.ts`,
  `tests/web/entry-view.test.ts`, `tests/web/exports.test.ts`, and
  `tests/e2e/entry-pages.spec.ts`.
- `package.json` only to add the coverage check to `verify`; no dependency changes.
- Generated outputs, changed through `scripts/build.py` only: `data/agents.json`,
  `README.md`, `docs/landscape.md`, and the generated snapshot blocks in
  `docs/patterns.md` and `docs/adoption-lessons.md`.
- This plan and its status in `plans/README.md`; new pilot review and coverage
  artifacts under `plans/009-*`. Never overwrite the baseline artifact with final
  implementation hashes or rewrite the historical HTML audit.

Out of scope: all other agent records, organization/logo changes, source recapture,
catalog membership, taxonomy or supervision reclassification, the seven existing
notes, `ArticleLayout.astro`, deployment/CI infrastructure, a redesign, automatic
related links, a public completeness score, and a catalog-wide migration. The
existing `docs/lesson-review-2026-09.md` must remain intact.

Do not stage or commit the inherited 53-file editorial follow-up as though the pilot
created it. At implementation time, keep its history separable under the user's git
instructions. Prefer logical implementation units: contract/validation, source
backfill, presentation/exports, then editorial tooling and verification. Creating this
branch has not authorized pushing, merging, or deployment.

## Execution steps

Start with Qubot as the first complete slice: Step 1, Step 2 for Qubot, then Step 3
for Qubot. Use its rendered page and exports to check the proposed contract before
repeating Steps 2–3 for Notion, Microsoft, DoorDash, and YC. Finish Steps 4–5 after
all five are implemented. The steps below describe the full five-record deliverable.

### 1. Add the optional contract and its validation

Implement `page_content` validation in `scripts/build.py` and document every enum and
reference rule in `data/schema.md`. Extend `normalize()`, `Approach`, `Claim`, and
`validateCatalog()` with the additive fields. Resolve claim paths within the same
entry and reject unknown fields, keys, enums, foreign references, and malformed
review dates. Keep records without the block valid and unchanged.

Write fixtures in `tests/test_build.py` and `tests/web/catalog.test.ts` before opting
in a real record. Follow the existing temporary-fixture and explicit-error patterns.
Test all four states, unsupported reported references, duplicate relations, missing
architecture dispositions, primitive role coverage, and preservation of names and
IDs. Fixture text must not be presented as a claim about a real organization.

Verify: `uv run --locked python -m unittest discover -s tests -p test_build.py`,
`npx vitest run tests/web/catalog.test.ts`, and `npm run check` all exit 0.
`uv run --locked python scripts/build.py --check` still passes with the five records
not yet opted in. Existing catalog and archive contracts remain valid.

### 2. Review the six existing captures and backfill the five records

Create `plans/009-pilot-source-review.md` with one section per entry. Read the full
preserved captures, including the long Notion transcript; the locators below are
starting points, not a claim that planning completed the content review.

All listed paths are `archive/sources/<source-id>/content.md`:

| Entry | Sources and starting points | Extraction target and boundary |
| --- | --- | --- |
| Qubot | `github-qubot-source-1`; lines 30, 36–60, 72 | Slack/VS Code/CLI invocation, cloud run, context and query routing, answer/report, offline evaluations, scoped speed comparison. Preserve the corrected summary; do not revive an unconditional seconds-to-answer promise. |
| Notion | `notion-custom-agents-source-1` (full transcript) and `notion-custom-agents-source-2`; second capture lines 22–45, 51–57 | One documented internal use, default-deny/resource permissions, owner confirmation, and the Slack over-posting incident. Separate alpha/internal history from general product capability; a security-team use list alone is not a complete runtime walkthrough. |
| Microsoft | `microsoft-prassistant-source-1`; lines 16–35 and customization section | PR review, author-applied suggestions, Q&A, repository guidance, and the early cohort's reported 10–20% median PR completion-time improvement. Preserve its observational/early-study limits. Keep the corrected display name and stable URL; do not restore the unsupported GitHub interface assumption. |
| DoorDash | `doordash-code-review-source-1`; architecture and fixer sections, particularly lines 29, 42, 125 | Current review version, scout/reviewers, execution environment, optional fixer and handoff, validation, cost/latency, and precision/recall limits. Keep versions distinct and retain the recent scoped lessons. |
| YC | `ycombinator-agent-infra-source-1`; lines 120–124, 154–166, 190–192 | A named finance/research use, shared context, tool registry, access limits, skill maintenance, and employee interaction. Distinguish interview speakers, host analogies, and the nightly improvement workflow. Do not turn implementation choices into universal advice. |

For every added or materially rewritten claim, record its field path, source ID,
exact locator, scope/version limits, and the reason for its metadata. Track all
seven reader questions and all eight architecture fields per entry. Complete review
of the six captures before marking a pilot disposition `unreported`; state the
checked evidence boundary, not that no public evidence exists anywhere.

Use the current lesson policy: reported practice = fact/reported; attributed
preference = opinion/reported; actual editorial inference = inference/catalog-judgment.
Keep claim-specific confidence reasons. Do not infer a runtime human checkpoint from
an evaluation statistic, or a measured outcome from an architectural safeguard.

Have a final source pass challenge each new claim against its exact passage and
record corrections or unresolved questions. This is a review procedure, not evidence
of independent verification. If one detail cannot be established, record that state
and continue with the supported material. Raise a material contradiction with an
existing classification as a separate follow-up instead of silently expanding scope.

Verify: `uv run --locked python scripts/build.py` exits 0 and regenerates the outputs;
`uv run --locked python scripts/build.py --check` then reports generated files current;
`uv run --locked python scripts/archive_sources.py --check` exits 0. A comparison
with the baseline confirms exactly the five permitted agent YAML files were edited,
with all source captures byte-identical. The source-review log contains five completed
entry sections and accounts for the six captures.

### 3. Implement the pilot reading model and export parity

In `entry-view.ts`, expose coverage states, workflow scope, primitive groups ordered by their explicit references,
canonical observations, alias claims, and separately placed lessons. Opt in through
`approach.page_content`, with the legacy path preserved for other entries.

In the agent page, use this order: purpose; how it works; people; implementation;
validation and failure handling; observations; lessons; sources/research; related
reading. Keep the existing page layout and relevant anchors such as `#results` even
if its displayed title becomes `Reported observations`. Reuse existing section-note,
table, and panel styles. A lesson must not create an observations section containing
only lessons. Show an honest reviewed empty state for YC if no observations emerge.

Replace `N/A` with the specific dispositions on opted-in pages, including pages
with no reported implementation fields. Add an obvious nearby source/research link
for pilot claim text, preserving evidence roles and locators. Keep the existing
attribution labels; do not duplicate citation prose at every location.

Preserve all claim information. Put duplicate representations and any reviewed
legacy placeholder claims in the research disclosure with their original IDs and
text, and link them to their reading location or disposition. Extend the existing
coverage invariant so every original claim appears exactly once across the reading
sections and research-only entries. Do not retain orphan anchors, duplicate IDs, or
qualifications that can no longer be located.

Apply the same states, grouping, categories, and duplicate relations to per-entry
Markdown and JSON in `exports.ts`. Update the generated Markdown landscape for the
five pilot entries in `build.py`; preserve its legacy rendering for other entries.
Directory cards and the compact index keep their current shape and semantics.

Verify: `npm run check` and `npx vitest run tests/web/entry-view.test.ts tests/web/exports.test.ts`
exit 0. Then run `npm run build` and
`uv run --locked python scripts/check_site.py --root dist`; both exit 0, retaining
full claim/source/caveat coverage and unique anchors. Regenerate/check repository
outputs again if the landscape renderer changed in this step.

### 4. Add editorial coverage tooling and update intake

Implement `scripts/content_coverage.py` using the existing validated record loader.
Its output is a per-entry list of question states, architecture states, reviewed
source IDs, next actions, and canonical observation counts. Records without
`page_content` have an explicit `legacy-unassessed` format status, not seven invented
claims about what the company disclosed. Do not create a percentage or quality rank.

Provide `--check` to validate the optional contract and fail on structural omissions
or invalid references, and `--output <path>` to write a deterministic JSON coverage
view. Document these options and test them in `tests/test_content_coverage.py`.
`not-reviewed` is a valid state with a next action; the general checker must not ban
it or force invented answers. The pilot's final review gate separately requires that
all five records finish the agreed source review with no pending dispositions.

Add the read-only `uv run --locked python scripts/content_coverage.py --check` to
`npm run verify` after the generated-data check. Update the record template and intake
instructions to explain the seven questions, field meanings, source-review states,
workflow roles, and observation axes. Keep adoption optional while this is a pilot;
do not make the other 35 records fail validation.

Verify: `uv run --locked python -m unittest discover -s tests -p test_content_coverage.py`
and `uv run --locked python scripts/content_coverage.py --check` exit 0. Generate
`plans/009-content-coverage.json` with `--output`; it includes all 40 entries, with
exactly the five pilot records opted in and the others marked legacy-unassessed.

### 5. Review the rendered pilot and record the result

Run `uv run --locked python scripts/build.py` followed by `npm run verify` once the
implementation is complete. Address failures and rerun the affected gates; repeat
the full suite only when changes or unresolved failures justify it.

Use the existing desktop, mobile, and no-JavaScript Playwright projects to inspect
all five pages, their Markdown exports, citation links, disclosure controls, and
anchor navigation. Add focused assertions to `tests/e2e/entry-pages.spec.ts` for
visible states, meaningful workflow titles, separate lessons, and one reading-flow
representation of an aliased observation. Keep the existing checks for non-pilot
entries. Visually inspect the five pages at desktop and mobile sizes for readable
flow, working controls, and overflow; record screenshots and findings under `plans/`.

Create `plans/009-pilot-review.md` with the before/after coverage, evidence decisions,
commands/results, rendered-page review, and a recommendation on wider adoption.
List remaining unsupported details explicitly. A reviewer should be able to locate
an exact supporting passage from each new claim and explain which workflow each
observation describes.

Final verification: `npm run verify` exits 0; the coverage JSON shows five reviewed
pilot records, seven question dispositions and eight field dispositions each, and
no `not-reviewed` state among those 75 dispositions. That gate establishes completion
of this editorial pass, not truth of the companies' reported outcomes. Compare all
non-pilot data/source hashes to the baseline and inspect all other changes against
the scope list using the reconstructed baseline, so inherited and pilot hunks can
be reviewed separately. Mark implementation complete only after the source and visual review
records are complete; record publication separately if later authorized.

## Regression cases that must be covered

- A legacy entry still produces the existing view and export without new metadata.
- Each of the four review states survives YAML → JSON → view → HTML/Markdown.
- Missing metadata is not silently promoted to reviewed/unreported.
- A reported slot cannot reference a foreign, missing, or unsupported claim.
- A named mechanism is not rendered as a workflow step solely because it is a primitive.
- A validation claim remains reachable without duplicated IDs when two questions cite it.
- A lessons-only entry has a separate lessons section and a truthful observations state.
- An alias cannot lose its text, evidence, caveats, or stable anchor; different scopes,
  periods, and denominators are not automatically merged.
- New source IDs absent from the reviewed list appear as review gaps in the coverage
  output rather than making the old review silently appear current.
- All 35 non-pilot entries retain their existing source records and reading behavior.

## Stop conditions

Stop the affected work and report the concrete conflict if:

- The baseline has changed before execution and the differences have not been reconciled.
- The implementation requires a breaking export change or out-of-scope record migration.
- A source capture is unreadable, incomplete for the intended conclusion, or contradicts
  the named version/internal-use claim. Mark the affected question pending and continue
  independent work; do not declare the pilot complete while that question remains pending.
- Claim identity or evidence would be lost by reordering, moving, or deduplicating content.
- A material factual contradiction requires changing a classification outside this scope.
- A verification gate fails repeatedly and the cause would require changing unrelated work.

Do not change a source, invent a fact, relabel an unfinished review as unreported, or
weaken a test to clear a stop condition.

## Deferred follow-up and maintenance

After the pilot review, decide whether to apply the standard to the remaining 35
entries. Related-reading expansion, more sources, a supporting-system case study,
and any broader observation-storage migration belong to that later scope.

Future source additions must expose which questions have not been re-reviewed.
Future field/index changes must preserve or deliberately migrate claim references.
The editorial coverage view tracks work remaining; evidence strength continues to
describe source detail. Neither is a measurement of a system's quality.

## Execution record

- 2026-09-17: branch created and proposal written. Working-tree fingerprints and a reconstructable baseline patch captured.
  Generated-data check and whitespace check passed. No pilot source/application edits,
  commit, push, or deployment were performed in this planning turn.
- 2026-09-17: execution completed in the isolated worktree
  `/Users/nikola/dev/steel/internal-agents-map-plan009-exec`. Baseline commit
  `73c111c` reconstructs the inherited editorial state; pilot commits `d3b800d`,
  `0fe6776`, and `4db2e54` implement the contract, five-record backfill,
  presentation/export changes, coverage tooling, tests, and review artifacts.
  Independent review reran `npm run verify`: 152 Vitest, 14 negotiation, 201 Python,
  and 327 Playwright tests passed with 39 expected skips. The implementation is
  approved but has not been merged, pushed, or deployed.
- 2026-09-17: user approved the pilot. Applied the implementation delta from
  `73c111c..4db2e54` to the original `codex/agent-page-content-pilot` working tree,
  checking each touched file against the reconstructed baseline first. All other
  existing files were unchanged. Preserved the inherited uncommitted edits and
  local planning history. No commit, push, or deployment was performed.
  Full `npm run verify` passed in the integrated working tree, including 327
  passing browser tests and 39 expected skips.
- 2026-09-17: merged PR #3 into upstream `main` as `f901dd5` after its full local
  verification passed. Integrated its presentation changes into this pilot working
  tree, preserving inherited edits and resolving the overlapping claim-layout CSS
  with PR #3's fuller fix. The pilot itself remains uncommitted and unpublished.
- 2026-09-17: user requested merging the pilot to main. Packaged the pilot and its
  required Plan 008 editorial baseline on top of PR #3 (`f901dd5`), preserving the
  combined implementation verified after that integration.
