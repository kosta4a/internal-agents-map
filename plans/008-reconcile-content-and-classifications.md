# Plan 008: Reconcile catalog evidence, classifications, and editorial guidance

> Proposal prepared on 2026-09-16 against commit `632d132` and reconciled after
> the redesign pull at commit `3750284`. The user authorized implementation of
> all nine findings, dependency synchronization, checkpoint commits on an
> isolated branch, and complete local verification.
>
> The user separately authorized removing Browserbase's bb entry. That removal
> is implemented locally and recorded below; it is not pending plan work.
>
> Executor: read the whole plan, preserve existing changes, follow the phases in
> order, and record verification before marking the plan complete. Source
> interpretation still requires editorial review after automated checks pass.

## Status and execution order

- Priority: P1.
- Effort: L, primarily source review and editing across the catalog.
- Risk: medium. Reclassification changes the public data vocabulary and filters.
- Depends on: completed Plans 003, 006, and 007.
- Category: content correctness, information architecture, and data contracts.
- Status: DONE on 2026-09-16. All seven phases were implemented and committed on the
  isolated `codex/plan-008-reconcile` branch, then squash-merged into `main` as
  `15bacb9` after PR #2 (`bcaff15`). The initial release passed local verification
  and 371 production response checks. Later Phase 1 corrections from the shared
  checkout are retained in the follow-up reconciliation described below.

### Parallel-execution reconciliation record

Two executors worked this plan on 2026-09-16. A Claude Code session executed Phase 1
in the shared checkout with a per-entry reviewer plus adversarial verification of every
proposed correction; a Codex session captured an earlier snapshot of that work at
`e10d371` and completed Phases 2–7 on the isolated branch. After both finished, the
Claude session reconciled the results into the shared working tree:

- The Codex branch (taxonomy migration, generated statistics, lessons and attribution,
  notes revision, supervision definitions) was adopted as the base; its implementation
  matches the plan's requirements for Phases 2–6.
- The later, verifier-backed Phase 1 corrections that postdate the captured baseline
  were re-applied on top: Microsoft's rename and interface correction, Ramp
  (state/identity/invocation/summary), Stripe (invocation/summary), monday.com
  (operating-model split and `mixed` state, superseding the branch's
  `cross-session-memory`), Replit (split retaining the human-review lane, superseding
  the branch's whole-scope `exception-only` flip), DoorDash Flux (two-platform summary,
  model wording), Plaid Fix My Connection (boundary `unknown`, summary), Slack context
  system (autonomy `autonomous`, state `unknown`), Dropbox Nova (autonomy, split models,
  state, model field), Plaid MCP server (identity `user`), Sentry (identity, split
  models, scheduled invocation, summary), and Zup (boundary `unknown`).
- One Codex decision was accepted (Uber invocation `interactive`, engineer-initiated
  delegation documented at `uber-coding-agent-source-1 content.md:18, 24`) and one was
  refuted against the captures and reverted (Salesforce identity `user`; "on behalf of
  employees" is a capability phrase, not an identity statement).
- `docs/content-review-2026-09.md` records every decision, the six refuted corrections,
  and this reconciliation. The later corrections were initially left uncommitted in the
  shared checkout and missed the `15bacb9` release. The release follow-up carries all
  fourteen changed records and their generated output forward, alongside this expanded
  review and the byte-identical `plans/agent-page-content-audit.html`.

Execution order: evidence corrections, taxonomy, statistics, lessons, notes,
reader guidance, then final verification. Finish each phase as a reviewable unit.
Do not publish an intermediate combination of old classifications and new copy.

Run this reconciled drift check before implementation:

```sh
git status --short
git diff --stat 3750284..HEAD -- README.md CONTRIBUTING.md data docs src scripts tests templates plans .claude/skills
git diff --stat -- README.md CONTRIBUTING.md data docs src scripts tests templates plans .claude/skills
```

The plan was written on a dirty working tree and reconciled while Phase 1 was in
progress. OpenAI's factory and Sevbot entries,
their source captures, company/logo updates, generated output, and changes to
`tests/web/companies.test.ts` already existed before this turn. The Browserbase
removal and this plan are additional local changes. A checkout of bare
`3750284` does not reproduce this baseline. Compare the excerpts and current
files; do not restore files or discard existing work to make them match HEAD.

### Reconciliation snapshot

At reconciliation, the generated catalog had 41 approaches, 36 organizations,
109 sources, and 592 claims at catalog schema 5. The count is descriptive, not an
acceptance target: Phase 1 was actively changing evidence-linked claims. Corrections
already touched Airbnb, Brex, Cloudflare, Coinbase, Databricks, Domu, Flex, Harvey,
Linear, Notion, Plaid, Sentry, and Shopify. Treat these edits as work to review and
complete, not changes to overwrite. `DESIGN.md` records the pulled Areal/Sand visual
contract and must remain intact.

The pre-pull stash is a recovery copy only. Do not pop or reapply it over the current
files. Its 31 untracked files matched the restored copies when reviewed; later Phase 1
record edits and `DESIGN.md` are outside that backup.

## What this plan fixes

| Review finding | Change | Phase |
| --- | --- | --- |
| 1. Company practices become universal advice | Attribute reported opinions; make interpretations conditional and explain their support | 4 |
| 2. Unknown state contradicts documented persistence | Review classifications against architecture text and preserved sources | 1 |
| 3. RetoolGPT is described as built on ChatGPT | Correct the implementation, distinguish versions, and resolve eligibility | 1 |
| 4. Task/background types overlap | Separate system type from invocation and update filtering and exports | 2 |
| 5. Unsupported supervision levels | Use unknown when the boundary is undocumented; preserve workflow scope | 1, 6 |
| 6. Aggregate wording overstates the data | Generate qualified entry counts; distinguish checkpoints from continuous steering | 3 |
| 7. Notes follow a repetitive caution template | Rewrite around each design problem and revise the writing rules | 5 |
| 8. Promotional abstraction replaces mechanisms | Edit summaries and lessons for concrete, supported descriptions | 4, 5 |
| 9. Readers cannot find the level definitions | Publish the actual framework and link to it from entries and Methodology | 6 |

Browserbase's removal retires its examples from the review. Apply the same
editorial criteria to the remaining entries; do not restore bb to illustrate a fix.

## Current state and file responsibilities

After the Browserbase removal, the catalog has 41 entries, 36 organizations,
109 source records, and seven published notes. The claim count is changing during
Phase 1 and must be derived from regenerated output rather than treated as a fixed
acceptance target.

- `data/agents/*.yaml` owns authored claims, classifications, sources, and evidence.
- `data/companies.yaml` owns organization identities and logo references. It must
  join to active entries in both directions; an unused organization is invalid.
- `scripts/build.py` validates records and generates `data/agents.json`,
  `docs/landscape.md`, and marked sections of README, patterns, and adoption docs.
- `src/lib/catalog.ts` validates the normalized data. Its current catalog schema
  version is 5. `src/lib/exports.ts` has a separate compact-index schema version 1.
- `src/lib/entry-view.ts` groups claims for pages; `Claim.astro`, `ResearchDetails.astro`,
  and `src/pages/agents/[id].astro` control visible attribution and qualifications.
- `src/lib/guide-content.ts` owns shared guide text. The guide Astro pages and
  Markdown exports must continue to read the same content.
- `src/lib/definitions.ts` selects and explains chart placements.
- `src/lib/search.ts`, `src/scripts/directory.ts`, and `AgentCard.astro` implement
  the directory's single search box, facets, and shareable filter URLs.
- `src/content/notes/*.md` owns the seven notes. `docs/notes-writing.md` defines
  their current rigid structure. `updatedAt` is available for substantive edits.
- `CONTRIBUTING.md`, `data/schema.md`, `templates/agent.yaml`, and the repository
  intake skill must agree about how future records are authored.

Preserve the existing design and delivery contracts: static Astro pages,
source-linked claims, clean entry URLs, HTML/Markdown parity, no-JavaScript
reading, accessible navigation, and immutable source captures. Do not replace
these with a new content system or redesign the site.

### Confirmed examples

`data/agents/shopify-internal-agents.yaml` currently contains both:

```yaml
  state: unknown
```

and:

```yaml
  harness: Session (durable; Postgres append-only event log) + Harness (cheap agent loop) + Cell (ephemeral Go runtime);
    cells die, sessions persist
```

The source describes the durable session at
`archive/sources/shopify-internal-agents-source-1/content.md:116` and its recovery
at line 134. Sentry has the same classification problem: its source describes a
queued continuation and persisted transcript at
`archive/sources/sentry-junior-source-1/content.md:136`.

`data/agents/retool-retoolgpt.yaml` says `model: Built on ChatGPT`.
Its preserved article describes multiple model providers at
`archive/sources/retool-retoolgpt-source-1/content.md:96`, and contrasts its
current user-selected retrieval with future tool selection at line 100. The
following paragraph discusses Retool Agents, so resolve the version instead of
combining current functionality and future/product possibilities.

OpenAI's `operating_models.2` has `attention_boundary: work-product-review`, but
its metadata says:

```yaml
    confidence_reason: "Perf Factory proposes fixes; where human attention returns for those proposals is not documented."
```

`data/schema.md` defines `task-agent` by bounded work and `background-agent` by
delegation or an event. HubSpot and Microsoft describe the same PR-to-comments
scope but use those different types.

`src/lib/guide-content.ts` sends readers to Definitions for the levels framework;
Definitions does not currently contain the L2-L5 mapping. The actual mapping is
in `data/schema.md` and `scripts/build.py:BOUNDARY_LEVELS`.

## Commands and verification conventions

Use the Node version in `.node-version` and the locked uv environment. Install
only if the environment is missing; do not update dependencies or lockfiles.

| Purpose | Command | Expected result |
| --- | --- | --- |
| Generate catalog and repository documents | `uv run --locked python scripts/build.py` | Exit 0; validated records and regenerated output |
| Check generated content | `uv run --locked python scripts/build.py --check` | Exit 0; generated files current |
| Check declared source captures | `uv run --locked python scripts/archive_sources.py --check` | Exit 0; all declared captures valid |
| Build site and routing manifest | `npm run build` | Exit 0; artifact and manifest generated |
| Typecheck | `npm run check` | No errors |
| Unit and negotiation tests | `npm run test:unit` | All pass |
| Focused Python build tests | `uv run --locked python -m unittest discover -s tests -p test_build.py` | All pass |
| Complete acceptance suite | `npm run verify` | Exit 0, including artifact, Python, lint, privacy, links, and browser checks |
| Whitespace | `git diff --check` | No output |

After membership or route changes, run both generators before `npm run verify`:
the verification script checks the committed routing manifest during unit tests
before its own site-build step. A fresh manifest prevents a stale-output failure.
Do not hand-edit generated JSON, landscape content, or the routing manifest.

## Scope

Allowed work is limited to the following areas:

- Authored catalog records and affected company/logo membership.
- `scripts/build.py`, data schema, record/data-guide templates, and catalog/export
  version constants and their validation.
- Entry presentation, search facets, guide content and rendering, and Markdown exports.
- The seven notes, their writing rules, README, patterns, adoption observations,
  contribution instructions, and the repository intake skill.
- Existing tests covering those behaviors; add focused regression cases where a
  logic or publication contract changes.
- A new `docs/content-review-2026-09.md` recording editorial decisions and source
  locators; plan progress and execution evidence in `plans/`.
- Generated files resulting from these changes, including `routing-manifest.json`.

Out of scope: dependency upgrades, hosting configuration, redesign, new note
topics, a general-purpose prose linter, changing source statements, rewriting
historical audit results, and broad collection of unrelated new cases. Preserved
archive bytes and manifests remain unchanged. New captures are appropriate only
when genuinely needed to resolve a named evidence gap and collected under the
existing preservation policy. No commit, push, or deployment is authorized by
this proposal's original scope. The user has since authorized checkpoint commits
only on the isolated execution branch. No push, merge into the user's branch, or
deployment is authorized.

## Git workflow

1. Create an isolated worktree and branch from `3750284`.
2. Copy the current dirty-tree snapshot into that worktree without modifying the
   user's checkout. Include tracked edits, deletions, and untracked files listed by
   `git status --short`; exclude ignored build and dependency directories.
3. Commit the recovered baseline in focused checkpoints: design guidance; OpenAI
   records, source captures, and logo registry; Browserbase retirement; then completed
   Phase 1 evidence corrections and their generated output. When overlap makes a split
   unsafe, keep the authored record and its generated output in one commit and document
   the combination.
4. Implement Phases 2–6 in reviewable commits, keeping schema, consumer, and test
   changes together and generated files with their authored source changes.
5. Finish with the verification record and plan-status update. Do not push, merge,
   deploy, pop the stash, or commit on the user's `main` checkout.

## Phase 1: Correct evidence and classifications

1. Create the dated content-review document. Record one row per changed field:
   entry, field, old value, decision, source ID and locator, and why the evidence
   supports the decision. Include unresolved questions. Record reviewed entries
   with no changes so coverage of all active entries is explicit.
2. Read the existing architecture descriptions and preserved sources for every
   active entry. Check state, identity, invocation, autonomy, and scoped attention
   boundaries together. A repeated claim or a note is a lead, not additional evidence.
3. Correct Shopify and Sentry to durable-session using the passages above. Review
   monday's explicit cross-session file memory and other persistence claims under
   the same definitions. Do not equate persisted chat history with recovered files,
   completed external actions, or cross-session learning. Keep unknown where the
   source does not establish the relevant property.
4. Set OpenAI's performance-fix attention boundary to unknown unless an exact
   supporting passage establishes it. Update its metadata and locator together.
   Check all remaining operating models: approval is distinct from merge and
   production deployment; measuring successful outcomes is not evidence that a
   person reviews outcomes on each run; optional steering is not continuous steering.
   Split genuinely different documented workflows instead of averaging them.
5. Correct Retool's implementation and model description. Its read-only permissions
   passage concerns who can edit the app; do not convert that into a demonstrated
   agent tool-permission boundary. Determine which documented version is being
   cataloged. Retain it as an agent only with readable evidence of model-directed
   action selection in internal use. If the evidence establishes only a scripted
   retrieval assistant, remove it from active membership and record the unresolved
   agent version in `docs/coverage-backlog.md`. Do not add an assistant category or
   call it supporting infrastructure merely to preserve membership.
6. If Retool remains, correct its chart placement and explanation from its actual
   organizational adaptation. If removed, remove the placement, unused organization
   and logo, active links, and brittle count expectations; preserve its history.
7. Update approach review dates for reviewed records. Reading an old capture does
   not advance source `last_verified_at`. Preserve report dates and workflow scope.

Verify with the catalog generator, capture check, site build, and unit tests from
the command table. The review document must identify evidence for every changed
classification. Tests validate consistency and presentation; the source review
establishes whether the changes are warranted.

## Phase 2: Separate system type from invocation

1. Replace `task-agent` and `background-agent` with one structural type, `agent`.
   Keep the existing `rubric.invocation` array for interactive, background,
   scheduled, and event-driven operation. A system can have several modes.
2. Retain `agent-system`, `platform`, `orchestration-system`, and
   `supporting-pattern`, with explicit decision rules in `data/schema.md`:
   an agent is one task-performing system; an agent-system is a documented family;
   a platform provides reusable infrastructure; an orchestration system's primary
   responsibility is coordinating agents; a supporting pattern implements a narrower
   enabling component. Internal subagents alone do not require changing an agent's type.
   Compound entries use their documented primary responsibility and explain components.
3. Migrate the active YAML records, `APPROACH_TYPES`, snapshot labels, templates,
   and affected fixtures. Review invocation from the evidence; do not infer
   unattended execution solely from an event trigger.
4. Bump catalog schema 5 to 6 and compact-index schema 1 to 2 because the public
   enum changes. Update Python output, TypeScript validation, export tests, schema,
   and data guide together. Do not change the routing-manifest schema, which is
   unrelated. Keep existing entry paths and representation URLs.
5. Add an `invocation` facet to the existing search box. Extend `DirectoryCard`,
   `AgentCard` data attributes, `FACET_KEYS`, vocabulary, selection, DOM matching,
   and URL handling together. Background must remain discoverable without being
   a system type. Keep current OR-within-facet and AND-between-facets semantics.
6. Handle incoming removed type values explicitly. `type=task-agent` can migrate
   to `type=agent`. For `type=background-agent`, show a short replacement notice
   directing the reader to Agent and Background filters; preserve other valid
   filters. Do not silently claim equivalent results, especially for combinations
   of old types whose OR semantics cannot be preserved by adding an AND facet.
   Document the enum migration for programmatic consumers.

Verify with generated-output checks, `npm run check`, unit tests, and directory
browser tests through `npm run test:e2e`. Add behavior tests for independent type
and invocation filtering, multi-mode agents, repeated query parameters, legacy
filter notices, reset/history behavior, and usable content without JavaScript.

## Phase 3: Make catalog summaries accurate and generated

1. Replace the README's manually maintained numeric findings with a generated
   marked block, using the same marker replacement convention as the overview.
   Centralize count calculation so README, patterns, and adoption snapshots agree.
2. Describe counts as classifications of catalog entries. Replace the translation
   of human-in-loop into involvement throughout the work with wording that includes
   approval checkpoints. Reserve continuous steering for that scoped boundary.
3. State the unit beside each distribution. Whole platforms and their component
   entries can both be present; counts are not independent deployments, shares of
   industry practice, or numbers of successful agent runs.
4. Keep infrastructure/supporting entries identifiable in any autonomy summary.
   If publishing supervision counts, count explicit scoped assessments and report
   unknowns and multi-assessment entries rather than forcing one level per company.
   A simple entry-classification distribution is sufficient; do not add a maturity score.
5. Rewrite narrative conclusions in patterns and adoption docs against the corrected
   records. Old review documents retain their dated historical counts.

Verify with `test_build.py` tests using small fixture sets containing a platform,
a component, approval checkpoints, unknowns, and a multi-workflow entry. Assert
the counting unit and totals, not today's hardcoded company count. Run generation
twice and confirm the second run produces no additional diff.

## Phase 4: Rewrite lessons and entry prose from their evidence

1. Review every remaining lesson; the current baseline has 100. For each, choose
   a reported practice, an attributed company opinion, a bounded catalog
   interpretation, or removal because it adds no supported information.
2. Match metadata to the decision. Reported opinions use `kind: opinion` and
   `provenance: reported`. Interpretations retain `catalog-judgment` and explain
   the actual inference and its limitation. Replace the boilerplate confidence
   reason about deriving an observation from sources. Do not give an interpretation
   high confidence merely because the cited article is first-party.
3. Examples of the required change in reasoning:
   - monday's file-memory choice describes that implementation. It does not
     establish that another team should discard vector retrieval.
   - Sentry's testing preference needs the scope of agent behavior evaluation;
     it should not dismiss unit tests for deterministic software components.
   - WorkOS's runtime requirements need their lifecycle and access-control context;
     avoid prescribing a custom runtime for every organization.
   - StrongDM's token-spend threshold is the team's operating principle. Keep it
     visibly attributed as an opinion, with no implication of proven efficiency.
4. Reconcile apparently competing practices where useful. A single employee-facing
   agent can dispatch several specialists; those are different design decisions.
   A custom control layer can also wrap a vendor runtime. Avoid inventing
   contradictions or comparative winners from different scopes.
5. Edit all summaries and primitives, not only lessons. Replace phrases such as
   DoorDash's unified cognitive layer and Spotify's context multiplier with the
   documented components or behavior. Remove absolute guarantees from access-control
   descriptions; constrained tools still permit mistakes within their authority.
6. Update claim evidence and list-index paths when editing or removing lessons.
   Keep quotations exact and retain concrete failures, qualifications, and dissent.
   A shorter catalog with fewer lessons is an acceptable outcome.
7. Make attribution visible in the reading flow. Company opinions and catalog
   interpretations must be distinguishable in lesson text and its adjacent label,
   not only inside `ResearchDetails`. `Claim.astro` currently hides kind labels
   when `showLabel` is false, so render interpretation/provenance independently of
   the field label. Preserve the same distinction in Markdown exports.

Verify with source-by-source review recorded in the dated review document, plus
unit/export and artifact checks. Add focused presentation tests for a reported
opinion and a catalog interpretation with field labels hidden. Do not create a
test for every rewritten sentence or a blacklist that treats every hedge as an error.

## Phase 5: Revise the notes and their writing rules

1. Revise `docs/notes-writing.md` before editing the articles. Retain clear terms,
   short sentences, exact sourced quotations, and explicit separation of report
   from interpretation. Remove the mandatory identical sequence of quote, diagram,
   observation, caution, and closing question. Include a diagram or quote only when
   it adds information. Keep genuine uncertainty specific to the claim it qualifies.
2. Rewrite all seven notes while preserving their slugs, source attribution, and
   related-entry integrity. Add `updatedAt` when the content changes. Use these
   distinct editorial questions to guide the revision, not as mandatory closing text:
   - `stop-a-run`: distinguish attempt limits from deadlines and specify the saved
     work a human can receive. Separate a proposed handoff from what sources report.
   - `review-noise`: examine the false-positive/false-negative tradeoff and the
     downstream work of reviewing comments, including limitations of model judges.
   - `split-the-work`: retain the failures of both earlier DoorDash designs and
     explain the responsibility passed from scout to reviewer. Do not infer measured
     improvement from the version sequence alone.
   - `work-can-continue`: distinguish conversation recovery, file recovery, and
     completed external actions; explain what the saved record actually preserves.
   - `load-tools`: compare Cloudflare's schema search with Sentry's provider lookup,
     including the added discovery dependency. Browserbase stays removed.
   - `steps-without-a-model`: distinguish deterministic policy enforcement from
     model judgment and publication control; specify what a passed check covers.
   - `test-on-your-work`: explain solution leakage, alternative valid solutions,
     and checks on model judges using the actual Databricks and Uber reports.
3. Remove generic caveats that repeat Methodology without identifying a case-specific
   limitation. Keep concrete limitations, even if the article becomes less tidy.
4. Make diagrams show the relevant branch, loop, shared state, or comparison. Do not
   force every mechanism into three boxes; omit a diagram that repeats the prose.
5. Adjust note tests that assume one fixed editorial shape. Continue testing source
   anchors, valid related IDs, meaningful metadata, readable exports, accessibility,
   and desktop/mobile/no-JavaScript reading. Keep public route compatibility.

Verify with unit tests, browser tests, source review, and HTML/Markdown comparison.
Read the seven notes together to catch repeated endings and recycled observations;
record the editorial review without claiming tests measure reasoning quality.

## Phase 6: Explain classifications where readers encounter them

1. Add a shared guide-content table for the actual attention-boundary mapping:
   continuous steering/L2, work-product review/L3, outcome review/L4,
   exception-only/L5, and unknown/no level. Define the role of human attention and
   distinguish each from tool authority and unattended execution.
2. Render the table at `/definitions#supervision` and in the Definitions Markdown
   export. Attribute the adaptation of Shapiro's framework using the existing
   source link. Explain why L0-L1 are outside this catalog's assessment and why
   levels are workflow descriptions, not a ranking of companies or output quality.
3. Link Methodology's level explanation and each entry's human-involvement section
   directly to that anchor. Put the workflow scope, boundary, and evidence together;
   do not show an unscoped company-wide level.
4. Add concise definitions of the revised system types and invocation modes to
   Definitions. Update the chart's terminology and placements after Phase 1; an
   illustrative chart still needs reasons consistent with its axes and source claims.
5. Keep Methodology about selection, evidence, inference, and limits. Keep Definitions
   about terms. Update the contribution guide, schema, template, and repository
   intake skill to require the same distinctions in new records.

Verify guide heading/link parity in `tests/web/guides.test.ts`, placement evidence
in `tests/web/definitions.test.ts`, and entry/guide browser navigation. Test that
the supervision anchor exists, every boundary is defined, unknown has no numeric
level, and the Markdown export carries the same definitions and links.

## Phase 7: Regenerate, verify, and record the result

Run, in this order:

```sh
uv run --locked python scripts/build.py
npm run build
npm run verify
git diff --check
git status --short
```

Review the diff against the recorded dirty baseline. Spot-check representative
rendered pages: a single agent, a platform, a supporting system, an unknown
boundary, an attributed company opinion, and a multi-workflow entry. Inspect
Definitions, Methodology, directory filtering, and the revised notes on desktop
and mobile; include keyboard and no-JavaScript coverage.

Keep the existing Vercel publication setup. This plan ends at a verified local
result committed on the isolated execution branch; any later merge, push, or release
requires a separate action outside this plan. Do not claim a local change is live.

## Done criteria

- [x] All nine findings map to implemented changes or a source-supported resolution
  in the dated review document.
- [x] Every active entry has been reviewed for contradictions between classifications,
  claims, and scoped human involvement; unresolved boundaries remain unknown.
- [x] Retool's implementation and eligibility have a documented, version-specific decision.
- [x] `APPROACH_TYPES` and active records contain neither `task-agent` nor `background-agent`;
  background remains available through invocation. Historical records and compatibility
  explanations may retain the old terms.
- [x] Catalog version 6 and compact-index version 2 agree across producers, consumers,
  documentation, and tests. Route-manifest version is unchanged.
- [x] Numeric catalog findings are generated from one counting convention, with the unit
  stated and approval checkpoints distinguished from continuous steering.
- [x] No active lesson uses the exact boilerplate confidence reason, "The catalog derives
  this observation from the linked sources." Every retained interpretation has a reason.
- [x] Source opinions and catalog interpretation are distinguishable in HTML and Markdown.
- [x] All seven notes have completed source and editorial review; quotations remain exact.
- [x] Definitions publishes every attention boundary and the entry/Methodology links resolve.
- [x] Both generators and `npm run verify` exit 0; `git diff --check` is clean.
- [x] Browserbase remains absent from active data, site pages, filters, notes, and assets.
- [x] Existing unrelated work and archive artifacts are preserved; status and verification
  evidence are recorded in this file and `plans/README.md`.

## Execution record

Completed locally on 2026-09-16 in the isolated worktree at
`/private/tmp/internal-agents-map-plan008`, branch `codex/plan-008-reconcile`.
The final catalog contains 40 approaches, 35 organizations, 35 logos, and 107
declared source captures. Catalog schema 6, compact-index schema 2, and route-manifest
schema 1 are current.

The final ordered gate passed: `scripts/build.py`, `npm run build`, `npm run verify`,
and `git diff --check`. Verification included 147 Vitest tests, 14 Node negotiation
tests, 196 Python tests, and 283 Playwright tests with 38 expected project skips.
Astro built 52 pages and the publication integration wrote 51 canonical routes.
Type checking reported no errors and 19 existing deprecation hints. Archive, artifact,
privacy, formatting, e-mail, and local-link checks passed.

The first full verification run exposed three stale expectations left by the Retool
removal: a fixed chart-marker count and two links to the retired active record. The
marker assertion now follows the rendered placements, and the historical reviews link
to the preserved source capture. Ruff also applied its required formatting to the new
statistics expressions. The complete ordered gate passed after those corrections.

## Evidence gaps and scope limits

If a source cannot resolve a classification, keep unknown and record the gap;
that does not block independent phases. If sources conflict, keep dated claims
and their relations rather than choosing the tidier story. If a proposed fix
requires changing inclusion policy to admit unqualified cases, removing unrelated
entries, altering archives, or changing deployment infrastructure, pause that
part and report the concrete issue. Do not weaken a check to make the plan pass.

This plan covers the reported content and organization findings. It is not a
fresh security audit, performance audit, live verification of every publisher,
or independent measurement of company results.

## Browserbase removal record

Completed locally on 2026-09-16 at the user's request:

- Removed `data/agents/browserbase-bb.yaml`, its unused company record, and logo.
- Removed its source, example, and related-entry link from the published
  tool-discovery note; removed the current adoption-document reference.
- Regenerated the catalog, overview, analysis snapshots, entry pages, exports,
  sitemap, and routing manifest.
- Retained the immutable source capture. Historical evidence and notes reviews
  identify the removal and link to the capture instead of deleted catalog paths.
- Replaced the removed claim used by the HTML-escaping test with an existing
  Cloudflare claim containing an ampersand, preserving that test's purpose.

Verification on 2026-09-16: both generators and `npm run verify` passed, including
146 TypeScript unit tests, 14 Node negotiation tests, 195 Python tests, archive
validation, formatting, local links, artifact checks, and browser coverage.
Playwright reported 273 passed and 36 skipped; its projects cover desktop, mobile,
and no-JavaScript reading. Astro reported 19 deprecation hints and no errors.
The local build contains 53 HTML pages and 52 canonical routes. No commit or
deployment was made in this turn.
