# Plan 012: Give agents and infrastructure distinct places in one catalog

> Implementation authorized by the user on 2026-09-17; publication remains separate.
> Read fully, preserve existing work, execute in phase order, and update the index
> after verification. Do not infer source facts from this plan: reopen the linked
> evidence before authoring claims. No automatic deletion of platform records.

## Status and baseline

- Priority P1; effort L; implementation risk medium.
- Category: content correction, information architecture, schema and presentation.
- Planned at `5265ac3`, 2026-09-17. Depends on completed Plans 008–011.
- Run `git diff --stat 5265ac3..HEAD -- data src scripts tests docs templates README.md CONTRIBUTING.md DESIGN.md`
  and `git status --short` first. Reconcile drift against the excerpts below.
- This planning pass read the relevant data, rendering, routing, exports, coverage,
  design, and verification contracts. It did not audit security, performance, or
  dependencies and did not run the implementation verification suite.

## Product decision

Keep one source-backed research catalog with two public collections:

1. **Agents** at `/`: systems doing identifiable work for an organization's teams.
2. **Infrastructure** at `/infrastructure`: platforms, runtimes, orchestration
   components, and tool-access systems on which agents run.

Both deserve maintained records, original sources, preserved captures, architecture,
and research details. They are not equivalent units for comparisons or counts.
Keep **Notes** for cross-case explanations, not as storage for displaced records.
An optional `/?collection=all` view exposes the complete catalog in two labeled
groups. Never silently mix the two collections in a single ranked list.

Default home counts are agents, organizations represented by those agents, and
distinct sources referenced by those agents. Show infrastructure count separately
as a link. On the all view use separate counts. Do not count a platform as an agent
or count a family as its undocumented constituent agents. Avoid fixed final counts:
new entries depend on evidence, not a quota.

### Classification rules

Retain the existing structural enum as research metadata for this migration.
Derive `catalog_section` in generated data, never author it independently:

- `agent`, `agent-system` -> `agents`.
- `platform`, `supporting-pattern`, `orchestration-system` -> `infrastructure`.

Review structural types before assigning collections. A system doing a task end to
end is an `agent`, even if it includes orchestration and many subagents. A documented
family of independently useful agents is `agent-system`. A reusable host for several
systems is a platform. A stand-alone control plane can be `orchestration-system`.
The vendor's word “platform” and a source's focus on sandboxes are not sufficient
classification evidence. Classify the named subject's primary responsibility.

Present Agent / Agent family as modest metadata in the agents collection. Present
Platform / Component / Orchestration as metadata in infrastructure. Preserve enum
IDs for consumers. Do not make structural type, invocation, human involvement,
deployment maturity, and evidence strength competing top-level categories.

### Navigation and page design

Sidebar: Agents, Infrastructure, Notes, Definitions, Methodology, using the existing
layout. Agent cards lead with the work; infrastructure cards lead with what the system
provides and which documented agents use it. Architecture and source depth remain
available for both. Global search includes both with visible collection labels;
directory filtering operates within the current collection unless All is selected.

Use a shared page frame and reusable claim components with two content profiles:

| Agent page | Infrastructure page |
| --- | --- |
| Purpose | Purpose |
| How it works | Capabilities and architecture |
| Where people stay involved | Access and controls |
| Implementation | Documented uses |
| Validation | Reliability and validation |
| Results and lessons | Adoption, operating evidence, and lessons |
| Infrastructure used / Related reading | Agents using this / Related reading |
| Sources and research details | Sources and research details |

This is a rendering profile, not a second disconnected CMS. Preserve the existing
claim ledger and editorial review states. Map existing workflow claims on an
infrastructure record to a clearly scoped example in Documented uses; never treat
them as a platform-wide autonomous run. If evidence is missing for an applicable
question, state that locally. For inapplicable agent questions, keep the disposition
in research details without rendering empty main sections. Access controls are not
human supervision. Platform performance and adoption are not downstream agent outcomes.

Remove the Supporting infrastructure notice and its generated prose altogether.
Use a small breadcrumb and type label, e.g. `Infrastructure / Platform`, followed
by a useful description. Do not replace the notice with another taxonomy explanation.
Spectre retains its sandbox/runtime detail prominently in its infrastructure page.

Reuse ABC Areal, Sand tokens, the 684px column, unboxed cards, rounded soft panels,
existing icons, keyboard behavior, and mobile spacing from DESIGN.md. No visual
redesign or new scoring system is needed.

## Current implementation and boundaries

- `data/agents/*.yaml` are authored records; `scripts/build.py` generates JSON and
  repository summaries. Keep this physical directory for compatibility.
- `data/schema.md` defines a task-performing agent and says subagents alone do not
  establish an agent family. CONTRIBUTING currently permits supporting systems.
- `src/pages/index.astro` uses `directoryCards(catalog)` and counts
  `catalog.approaches.length`, putting every structural type on equal footing.
- `src/lib/entry-view.ts:25` defines
  `new Set(['supporting-pattern', 'platform'])`; `supportingSystemNote()` creates the
  notice from type plus workflow count. This is not an independent source judgment.
- `src/pages/agents/[id].astro` renders that notice and the same human-involvement
  section for all entries. `src/lib/exports.ts` provides Markdown and compact JSON.
- `scripts/build.py` requires exactly seven `page_content.questions` keys:
  purpose, workflow, human_involvement, implementation, validation, observations,
  lessons. Review states already include `not-applicable`. Retain these normalized
  research keys; vary presentation rather than duplicating the coverage schema.
- `src/lib/routes.ts` makes all detail URLs `/agents/<id>`; publication inventory
  is shared with sitemap and content negotiation. Keep existing detail URLs and
  representation URLs in this release, even for infrastructure. Navigation and
  breadcrumbs establish collection identity; URL migration is a separate concern.
- `src/lib/content-routes.ts`, `scripts/site-publication.ts`, discovery endpoints,
  and route tests must include the new index and its Markdown representation.
- `tests/web/entry-view.test.ts` checks every claim is placed and anchors survive;
  keep this guarantee. Use its fixtures and Vitest style for profile tests.

In scope: affected YAML, captures for new evidence, generated catalog/docs,
`scripts/build.py`, coverage and publication/check scripts, `src/lib`, `src/pages`,
shared components/layouts, directory/palette scripts, necessary styles, corresponding
tests, data schema/templates, README, CONTRIBUTING, docs, and plan status.
Out of scope: deleting archive bundles; changing hosting; deploying; changing brand
design; unrelated agent content; rewriting source preservation; physical directory
renames; blanket URL migrations; inventing agents to meet a target count.
Use a `codex/plan-012-agents-infrastructure` branch or isolated checkout. Do not
discard unrelated changes, commit, push, merge, or publish without the operator's
requested scope.

## Phase 1: Establish a source-backed migration ledger

Create `docs/classification-review-2026-09.md`. For each subject below record old
identity/type, proposed identity/type, scope, decisive source passage/locator,
confidence, dependent claim corrections, final disposition, and relationship evidence.
Distinguish a taxonomy correction from extracting a different system from an umbrella.
The following are review findings, not permission to fabricate missing details:

| Existing record | Required action and evidence |
| --- | --- |
| `workos-project-horizon` | Reclassify the whole task-performing code factory as `agent`, subject to confirming scope; exact subtype has medium confidence. Requirements -> issues -> implementation -> PR, with human gates. https://workos.com/blog/project-horizon and https://workos.com/blog/applied-ai-showcase |
| `slack-context-system` | Reclassify and rename to security investigation service; retain ID. Add the foundational Dec 1, 2025 source; correct earliest evidence/year, deployment, security domain, and unsupported autonomous-remediation implications. https://slack.engineering/streamlining-security-investigations-with-agents/ and https://slack.engineering/managing-context-in-long-run-agentic-applications/ |
| `shopify-internal-agents` | Separate River (`agent`) from Aquifer (`platform`). Keep current umbrella ID for Aquifer where that preserves its identity; create River with explicit lineage and updated display names. Allocate River adoption/workflow claims to River, platform claims to Aquifer. https://shopify.engineering/under-the-river |
| `doordash-flux` | Keep Flux platform. Remove conflated analytics-system attribution; represent the analytics platform separately if enough independent detail, and extract DataExplorer as an agent if supported. Reuse existing DoorDash code-review record, never duplicate it. https://careersatdoordash.com/blog/delegating-engineering-work-to-cloud-based-agents/ and https://careersatdoordash.com/blog/beyond-single-agents-doordash-building-collaborative-ai-ecosystem/ |
| `airbnb-airchat` | Keep platform. Review Datako and Pascal as distinct internal agents; create only where source describes sufficient task behavior and material adaptation. https://getdx.com/podcast/beyond-the-cli-agentic-ai-for-async-workloads-and-non-developers/ |
| `brex-agent-platform` | Keep builder platform. Prioritize an onboarding agent record; evaluate disputes, collections, and QA individually without averaging supervision. `/c1` provisions AI-tool access, not proven operational-agent invocation. https://www.firstround.com/ai/brex and https://www.brex.com/journal/rebuilding-onboarding-ai-native |
| `cloudflare-ai-stack` | Keep platform; create AI Code Reviewer. Correct advisory-only language: source describes approval, revoked approval, merge blocking, and human override. https://blog.cloudflare.com/internal-ai-engineering-stack/ and https://blog.cloudflare.com/ai-code-review/ |
| `dropbox-nova` | Keep platform; create Deflaker if full workflow remains supported (logs, fix, repeated CI evaluation, bounded retries). https://dropbox.tech/machine-learning/introducing-nova-our-internal-platform-for-coding-agents |
| `harvey-spectre` | Retain platform with prominent execution/sandbox detail. Separate SOC claims: SOC uses a different substrate. Review SOC as its own agent-family candidate; never assert built-on Spectre. https://www.harvey.ai/blog/building-spectre-internal-collaborative-cloud-agent-platform and https://www.harvey.ai/blog/building-an-agentic-security-operations-center |
| `notion-custom-agents` | Keep platform; create Scruff security agent using Jan 12, 2026 case study. Review bug triage separately; don't transfer Scruff's earliest date to the broad product without identity evidence. https://www.notion.com/en-gb/blog/how-we-built-security-into-custom-agents and https://www.notion.com/blog/meet-scruff-securitys-new-ai-teammate |
| `ycombinator-agent-infra` | Keep current platform identity; review operational assistant and nightly improvement workflows for agent entries. Avoid fabricated names and conflation with personal OpenClaw experiments. https://www.ycombinator.com/library/Qh-inside-yc-s-ai-playbook |
| `plaid-internal-mcp-server` | Keep supporting component. Explain authenticated tool/context access; agent dependency does not make MCP an agent. https://engineering.plaid.com/the-plaid-internal-mcp-server-8eff08bb6bdb |

Also review `block-builderbot` and `replit-manager-agent` against their actual linked
sources before their orchestration label routes them into Infrastructure. Their
stored descriptions suggest task-performing systems; these two were not reverified
in the initial twelve-record audit. Audit the six `agent-system` records for the
family-versus-subagent distinction, reopening their sources where classification
changes. This is bounded taxonomy consistency work, not a wholesale claim rewrite.

For blocked extractions record the missing evidence and a Needs evidence disposition
in `docs/coverage-backlog.md`; keep supported umbrella research. Every candidate
above needs a final disposition, not necessarily a new record. Initial high-value
extractions: River, Cloudflare reviewer, Deflaker, Scruff, Brex onboarding, DataExplorer.

Before changing data, write the ledger and run `git diff --check` (exit 0).
Review all proposed identities and ensure no source passage is based only on snippets.

## Phase 2: Correct records and preserve provenance

Apply ledger decisions to YAML using the current schema and claim metadata style.
Preserve original source URLs, captures, qualifications, and review dates accurately.
New sources use the existing archive workflow (`archive_sources.py --help` describes
capture options); do not claim a live recheck when only an old capture was read.
Do not overwrite append-only captures or fabricate successful archival metadata.

Allocate claims to their actual subjects. Preserve old IDs/anchors for retained
claims. For moved claims, keep a source-backed historical/contextual reference or
an explicit anchor compatibility mapping; do not silently leave old links dangling.
Record old-to-new claim and identity mappings in the ledger. Shared source material
must follow current source identity/duplicate conventions and validate globally.
No duplicated metric may appear as separate additive agent and platform outcomes.

Use existing `built-on`, `component-of`, and `related-to` relationships. A company
match alone does not establish built-on. Render inverse “Agents using this” links
from the canonical authored relation rather than storing both directions. Show
related agents only when the relationship is evidenced; do not invent completeness.

Verify: `uv run --locked python scripts/build.py`, then
`uv run --locked python scripts/build.py --check`,
`uv run --locked python scripts/content_coverage.py --check`,
`uv run --locked python scripts/archive_sources.py --check`, and
`uv run --locked python -m unittest discover -s tests` -> all exit 0.
Content checks complement the passage review; they cannot prove source truth.

## Phase 3: Add collection semantics and browsing

Generate `catalog_section` from the audited types, validate it in the TypeScript
boundary, and include it in individual and compact exports. Bump catalog schema
6 -> 7 and compact index 2 -> 3; document exact migration and retain all old fields.
Keep full `agents.json` and `agents/index.json` inclusive of both sections for
compatibility, clearly documenting that these historical endpoint names contain
the full research catalog. Derived counts must use explicit collection predicates.

Create `/infrastructure` plus its `.md` representation. Refactor directory selection
so homepage defaults to Agents; `collection=all` includes both in labeled groups;
Infrastructure index selects infrastructure. Preserve selection in URL/history.
Old type-filter links requesting infrastructure on `/` should resolve to the All
view with their filters intact; mixed agent/platform type queries must preserve OR
semantics. Ordinary text queries stay in collection and offer a visible switch to
search all records. Global command palette searches both with section labels.
With JavaScript disabled, each canonical collection index lists all its records
and links to the other collection; no inaccessible JS-only infrastructure inventory.

Keep invocation and supervision facets for agents. Infrastructure uses work supported,
type, and free text; do not expose agent-supervision filters that imply equivalence.
All view supports existing filters but only actual scoped agent facts match human
supervision; platform access is not a Level 2–5 run. Keep the five-level framework
for agents and preserve platform-specific evidence as scoped use examples.

Update sidebar, counts, cards, search/palette, generated README/landscape/observations,
Markdown index, guides, templates, llms.txt, sitemap, and structured data consistently.
Definitions quadrant must not mix infrastructure and agent markers as equivalent:
make existing agent comparison agent-only and link infrastructure separately;
remove or rebind stale platform marker claims only after evidence review.
Notes retain their sources and can link either kind of record.

Verify: `npm run check`, `npm run test:unit`, and
`uv run --locked python -m unittest discover -s tests` -> exit 0.

## Phase 4: Replace the notice with appropriate page profiles

Implement shared profile selection in `entry-view.ts`, consumed by Astro and
Markdown, not scattered type checks in templates. Remove `supportingSystemNote`
and the notice markup. Use the profile table above. Keep source and claim anchors,
all claims discoverable, and detailed research disclosures. Do not suppress
unfavorable or unknown facts merely to make pages look complete.

On infrastructure pages remove meaningless top-level autonomy/operating-level
metadata; show genuinely documented controls and scoped downstream use boundaries
in their appropriate sections. Preserve their original factual claim content in
the ledger. Agent-family pages identify covered constituent agents and scope
results; don't pretend every family has one universal workflow or supervision level.

Pilot profiles on Spectre (rich infrastructure), Plaid MCP (component), River
(task-performing agent), and Slack (corrected agent). Then apply to every record.
Verify `npm run check`, `npm run test:unit`, `npm run build`, and
`uv run --locked python scripts/check_site.py --root dist` -> exit 0.

## Phase 5: Regression coverage and release handoff

Follow existing tests in `tests/test_build.py`, `tests/test_content_coverage.py`,
`tests/web/{catalog,entry-view,exports,search,directory,routes,definitions}.test.ts`,
`tests/e2e/{directory,entry-pages}.spec.ts`, and publication/negotiation tests.
Add meaningful cases for:

- Every record belongs to exactly one derived collection; unknown type fails.
- Agent totals exclude infrastructure; family counted once; sources deduplicated.
- Both collections remain in full and compact exports with schema versions.
- Legacy URLs/anchors, type queries, OR semantics, no-JS indexes, history, reset,
  empty results, keyboard navigation, and palette reopen continue working.
- Infrastructure profile preserves architecture and sources, has no generic
  supporting notice, no forced agent autonomy, and no empty inapplicable sections.
- Applicable unknowns remain visible; HTML and Markdown place the same claims.
- Relations resolve both ways without duplicates, missing targets, or implied
  same-company dependencies. Harvey SOC is not asserted built-on Spectre.
- Corrected Slack/WorkOS identities and Shopify/DoorDash separation match the ledger.
- New infrastructure index appears in route inventory, sitemap and content negotiation.

Visual inspection at desktop and mobile must cover the two indexes, All view,
Spectre, Plaid MCP, River, Slack, one agent family, and command palette. Record
screenshots/findings in the review ledger; inspect them, not just test pass counts.

Run `npm run verify` -> exit 0. This runs generated-data, coverage, archives,
Astro/TypeScript, unit, build, artifact, Python, Ruff, privacy, local links,
Playwright, and diff checks as defined in package.json. Do not edit generated data
by hand to appease failures. Report pre-existing failures separately and rerun
only when fixes or new concerns justify it.

## Done criteria

- Full verification passes and collection/profile/compatibility regressions above
  have explicit tests, including the no-JavaScript path.
- The migration ledger accounts for all twelve original records, both orchestration
  records, six family classifications, and every proposed extraction disposition.
- Every old record remains reachable; retained research/captures are preserved;
  corrected claims are scoped and source-linked; historical anchors are accounted for.
- Default agent browse excludes infrastructure, while infrastructure has a first-class
  index, discoverable search, useful pages, and evidenced links to agent records.
- `rg -n 'supportingSystemNote|The record also reports a workflow|This entry describes supporting infrastructure' src`
  returns no matches. Historical plan files may retain those strings.
- HTML/Markdown/JSON, counts, definitions, and generated documentation agree.
- `git diff --check` exits 0. Index records completion only after verification;
  commit/push/deployment remain outside this planning authorization.

## Stop conditions and maintenance

Stop the affected migration and report if an identity cannot be separated without
unsupported attribution, original evidence contradicts the proposed disposition,
or a compatibility change would silently discard an external endpoint or anchor.
Mark optional candidate extraction Needs evidence and continue independent work.
Resolve ordinary implementation choices within these boundaries; do not invent
facts or expand into a new CMS/taxonomy rewrite to avoid reporting an evidence gap.

Future contributors should decide the subject before collecting its metrics:
one task-performing system, an actual family, or reusable infrastructure. Detailed
sandbox documentation never by itself makes something a platform. Preserve the
single derived collection rule, source ownership, and representation parity.

Rejected alternatives: deleting infrastructure (loses useful research); moving all
records into Notes (loses structured maintenance/comparison); retaining a single
undifferentiated list with better disclaimers (does not fix equivalence); keeping
only a type filter (default still misleading); mass renaming routes (unnecessary
compatibility risk). A later route cleanup or company hub can be planned separately.

## Completion review — 2026-09-17

APPROVED in the isolated `codex/plan-012-agents-infrastructure` worktree. All five
phases are complete. The catalog contains 43 agents/families and 13 infrastructure
records; the original research, URLs, captures and claim anchors are preserved.
Both executor and independent coordinating-reviewer `npm run verify` runs passed
with 158 Vitest, 14 negotiation, 201 Python, and 517 browser tests (47 expected
skips). Source rechecks, extraction dispositions, preservation checks and visual
findings are recorded in `docs/classification-review-2026-09.md`.

The implementation is local and has not been pushed or deployed.
