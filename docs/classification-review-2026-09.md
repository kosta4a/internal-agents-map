# Classification review — September 2026

## Scope and evidence method

This is the migration ledger for Plan 012. Reviews distinguish one task-performing system from a reusable runtime and from a family of independently useful agents. Existing captures were reopened on 2026-09-17; that does not claim a fresh publisher verification. New primary articles were opened live and are captured through the repository archive workflow. Classification confidence is editorial judgment, not an independent verification of reported outcomes.

All original record IDs, source IDs, captures and claim paths remain reachable. When the original umbrella contains another system's claims, those paths remain explicitly scoped contextual references; the dedicated entry owns the system identity. Counts never sum contextual platform metrics with agent results.

## Identity decisions

| Existing ID and old type | Final identity/type | Decisive evidence and locator | Confidence and corrections |
| --- | --- | --- | --- |
| workos-project-horizon / platform | Horizon / agent | source-1, request and orchestrator sections; requirements become issues, implementations and PRs | High task scope; moderate exact label. Preserve human review boundaries. |
| slack-context-system / supporting-pattern | Security investigation service / agent | New foundational article, December 1, 2025, Investigation Flow and Service Architecture; source-1 context article describes same service | High. Correct year, first evidence, deployment and security domain; reports lead to human remediation. |
| shopify-internal-agents / platform | Aquifer / platform; extract shopify-river / agent | source-1, “River is one profile. Aquifer is the platform.” | High. River workflow and adoption remain scoped context at old anchors; dedicated agent owns outcome identity. River built-on Aquifer is explicit. |
| doordash-flux / platform | Flux / platform; extract analytics platform and DataExplorer | source-3 “Primitives, not workflows”; source-2 “Introducing dynamic reasoning with agents” | High. No established Flux/analytics platform connection. Keep old analytics claims as historical context, not Flux capabilities. Existing reviewer reused. |
| airbnb-airchat / platform | Airchat / platform | source-2 transcript: CLI harness and downstream Datako/Pascal examples | High platform; candidates need distinct attribution and workflow review before extraction. |
| brex-agent-platform / platform | Operations agent builder / platform; extract onboarding | source-1 builder discussion; new onboarding article “How the onboarding agents work together” | High. /c1 provisions tools, not operational-agent invocation. No universal supervision claim. Builder relationship to new onboarding implementation remains related-to, not assumed built-on. |
| cloudflare-ai-stack / platform | Internal AI stack / platform; extract AI Code Reviewer | source-1 gateway/context stack; new reviewer article approval workflow | High. Reviewer can approve, revoke approval and block merges; human override remains. |
| dropbox-nova / platform | Nova / platform; extract Deflaker | source-1 “Flaky test remediation” | High. Explicit Nova dependency; repeated CI and five-attempt cap scoped to Deflaker. |
| harvey-spectre / platform | Spectre / platform | source-1 “Core Technical Primitives” and “Security Requires Explicit Boundaries” | High. Preserve sandbox/runtime detail. source-2 SOC is a separate implementation, not Spectre. |
| notion-custom-agents / platform | Custom Agents / platform; extract Scruff | source-2 security model; new Scruff case study | High. Scruff evidence date does not become broad platform date. |
| ycombinator-agent-infra / platform | Internal agent infrastructure / platform | source-1 transcript: shared harness/tool registry | High. Operational and nightly workflows retained as scoped examples pending distinct identity evidence. |
| plaid-internal-mcp-server / supporting-pattern | Internal MCP server / supporting-pattern | source-1 “Problem space” and “What's next” | High. Authenticated tool/context access is component behavior, not an autonomous agent. |
| block-builderbot / orchestration-system | Builderbot / agent | source-1 Slack ticket to reviewed PR; primary responsibility is completing engineering work | High. Internal orchestration does not make a standalone control plane. |
| replit-manager-agent / orchestration-system | Manager agent / agent | source-1 “Self-driving company”: employee delegates verifiable work and judgment escalates | Medium. Several spawned workers serve one delegated task. |
| spotify-honk-xirp / agent-system | Honk / agent | source-1 background coding; source-2 coding workflow | High. Xirp relationship is unestablished; keep contextual claims, no family/dependency inference. |
| strongdm-software-factory / agent-system | Software Factory / agent | factory overview/principles: seeds and scenarios to validated software | Medium. Multiagent implementation of one software-production workflow. |
| databricks-costar / agent-system | coSTAR / supporting-pattern | source-1 testing/refinement method using judges and MLflow | High. Internal reviewer/on-call examples are users of the method, not a demonstrated family. |
| monday-sphera-atlas-morphex / agent-system | Atlas and Morphex / agent-system | source-1 coauthored AWS case: distinct agents and attention boundaries | High. Preserve constituent-specific scopes. |
| openai-software-factory / agent-system | Internal software engineering agents / agent-system | factory article section 3: coding, review, deployment, Perf Factory and Sevbot | Medium. Actual independently useful work streams justify family; do not classify merely from subagents. |
| coinbase-forge-mux / agent-system | Forge / agent; separate Mux / platform | source-2 Linear case: issue-to-PR Forge; source-1 Mux worktree/session host | High separation. February background-PR metric is not attributed to later Mux adoption. |

## Extraction and compatibility ledger

New records share original publisher evidence through unique source IDs with `duplicate_of`, preserving canonical source identity. Old claims remain at their original path with explicit subject scope rather than silently dropping anchors. No source capture is overwritten.

Priority additions: River, AI Code Reviewer, Deflaker, Scruff, onboarding system and DataExplorer. Additional platform separation: DoorDash analytics AI Marketplace and Coinbase Mux. Relationships are authored only on the dependent agent when explicit. Related-to does not claim a runtime dependency.

Candidate dispositions and remaining evidence gaps are tracked in [coverage-backlog.md](coverage-backlog.md). Verification results will be appended after implementation.

## Implemented extraction dispositions

| Candidate | Final disposition | Identity and relationship evidence |
| --- | --- | --- |
| River | Added `shopify-river` | Built-on Aquifer, explicitly a profile in Under the River. |
| Cloudflare reviewer | Added `cloudflare-code-reviewer` | Built-on internal stack; article documents AI Gateway configuration and Worker control plane. |
| Deflaker | Added `dropbox-deflaker` | Calls Nova; deterministic surrounding workflow owns CI and publication. |
| Scruff | Added `notion-scruff` | Custom Agents implementation explicitly named in the January case study. |
| Brex onboarding | Added `brex-onboarding` | January 2026 KYC/underwriting implementation; related-to builder only. No version identity assumed with 2025 onboarding examples. |
| DataExplorer | Added `doordash-dataexplorer` | Built-on analytics marketplace; DescribeTable and grounded SQL in Figure 4. |
| DoorDash analytics platform | Added `doordash-ai-marketplace` | Dedicated platform subject from November 2025 source, not a Flux predecessor or dependency. |
| Coinbase Mux | Added `coinbase-mux` | Workspace/session platform, related-to Forge; not evidence of Forge's runtime. |
| Airbnb Datako | Added `airbnb-datako` | Data application on AirChat SDK; no transfer of broad AirChat productivity metrics. |
| Airbnb Pascal | Added `airbnb-pascal` | Product-planning application on AirChat SDK; no invented approval gate. |
| Harvey SOC | Added `harvey-security-operations` | Actual family: daily reporting, hourly triage and threat-watch agents sharing memory. Related-to Spectre, explicitly separate substrate. |
| Notion bug triage | Added `notion-bug-triage` | Descriptive name; interview at 34:07 describes Slack report, routing constitution, task creation and team-channel post. |
| Brex disputes | Added `brex-disputes` | Built using internal builder; submission preparation is supported, automated filing authority is not. |
| Brex collections | Added `brex-collections` | Related-to builder; initial outreach and human-selected follow-up drafts have distinct boundaries. |
| Brex quality assurance | Added `brex-support-qa` | Related-to builder; rubric assessment and coaching feedback, not an assertion of 100% accuracy. |
| YC operations | Added `ycombinator-operations` | Descriptive name for internal operational agent using shared registry; SQL is read-only, other tools perform actions. |
| YC nightly improvement | Retained platform example; Needs evidence for separate entry | Transcript 18:23 describes reading conversations for gaps; separate output/update authority and identity remain unclear. |
| YC two-sentence company skill | Retained capability, no separate agent | A skill can be taught/updated without establishing an independently deployed task-performing system. |
| Spotify Xirp | Retained historical context; Needs evidence for separate internal entry | Product site does not establish internal adaptation or a dependency on Honk. |
| Shopify additional profiles | Retained documented uses | PR review and Vanilla are named profiles; research, migration and compliance requests are not proof of deployed separate systems. |

### Date and source corrections

Datako and Pascal do not inherit the umbrella AirChat's 2025 earliest date. The DX episode linked from the transcript was published on **2026-06-22**, corroborated by the [Apple Podcasts information panel](https://podcasts.apple.com/us/podcast/beyond-the-cli-agentic-ai-for-async-workloads-and/id1619140476?i=1000773730152). Their first-evidence date uses that episode, not an inferred launch date. Scruff's January evidence does not backdate the broad Custom Agents record. Slack's December 1, 2025 source establishes a functioning service and an earlier May prototype; May is not a public-evidence date.

New primary capture bundles: `slack-security-foundation`, `brex-onboarding-source`, `cloudflare-code-review-source`, `notion-scruff-source`. All four were fetched with the existing Steel archive workflow on September 17. Existing snapshots are unchanged. New entries' source aliases use `duplicate_of` pointing to the original source record; that original retains its capture. Unchanged `last_verified_at` values on aliases accurately retain the old source verification dates when only existing captures were reviewed.

### Claim and anchor compatibility

No old claim path was deleted. These are identity reallocations, with old paths retained as source-backed context rather than redirects:

| Old record and paths | Dedicated subject and claim paths | Treatment at old location |
| --- | --- | --- |
| Shopify `summary`, `primitives.1`, `primitives.3`–`.6`, `headline_metric`, `key_metrics.0`–`.2` | River `summary`, `primitives.0`–`.2`, `key_metrics.0` | Old River examples explicitly scoped; Aquifer identity and architecture remain. |
| Nova `primitives.2`–`.5`, `key_metrics.0` | Deflaker `primitives.0`–`.3` | Scoped Deflaker use and repeated-test validation; not Nova-wide outcomes. |
| Cloudflare `primitives.3`–`.4`, `operating_models.0` | Reviewer `summary`, `primitives.0`–`.2`, `operating_models.0` | Original review boundary corrected to approval/blocking with override. |
| DoorDash `architecture.harness`, `architecture.context_mgmt`, `primitives.3`–`.5`, `lessons_learned.3`–`.5` | Marketplace architecture/validation and DataExplorer workflow | Explicitly separate analytics-system context, not Flux capabilities. |
| Coinbase `architecture.sandbox`, `primitives.1`–`.2`, `key_metrics.0`, `.4`, `.5` | Mux architecture/workflow and `key_metrics.0`–`.2` | Mux workflow and metrics removed from Forge main question mappings, retained in research detail. |
| Brex `primitives.2`–`.4`, `headline_metric`, `key_metrics.1`–`.2` | Disputes, collections and quality agents | Explicit downstream use scopes; onboarding is separately sourced. |
| Harvey `lessons_learned.2` | SOC `architecture.harness` | Explicit separation is retained, never a built-on relationship. |
| Notion `summary` and bug-triage primitives | Bug-triage `summary` and `primitives.0`–`.2` | Platform example remains; Scruff is new evidence, not a rename. |
| Spotify Xirp contextual architecture/primitives/lessons | No separate record | Explicitly unestablished relationship; Honk is one agent. |

Infrastructure-wide human involvement is `not-applicable`; all original scoped operating-model claims survive in research details. This prevents access controls being misrepresented as supervision. Metrics repeated as historical context are not additive, and no company-level statistic is promoted to a new agent's outcome.

## Content verification

- `uv run --locked python scripts/build.py`: passed with 56 records.
- `uv run --locked python scripts/content_coverage.py --check`: passed for 56 entries.
- `uv run --locked python scripts/archive_sources.py --check`: passed, 111 declared captures.
- Final generated-data, Python and full product verification are recorded below by the coordinating implementation review; this section does not claim they have already passed.

Content review follow-up: River's optional collaborative redirects do not establish required continuous steering. Deflaker's automated repair/CI loop does not establish a required human review or exception policy merely because the workflow lands fixes. Both new entries now retain `unknown` attention boundaries, and Nova's old Deflaker inference is corrected accordingly. The documented actions remain intact.

Content validation checkpoint: generated-data check passed for 56 records; all 201 Python tests passed. `git diff --check` passed. These are source/schema checks, not a substitute for the coordinating agent's HTML/Markdown/profile and visual review.

## Collection, profile, and compatibility verification

Implementation verification on 2026-09-17 completed with `npm run verify` (exit 0):
158 Vitest cases, 14 content-negotiation cases, 201 Python cases, and 517 Playwright
cases passed. The 47 Playwright skips are intentional project exclusions for
JavaScript-only actions, no-JavaScript cases, and duplicate visual captures. The
same command passed generated-data, content-coverage, archive, Astro/TypeScript,
build/artifact, Ruff, privacy, local-link, and whitespace checks. Astro reports
19 existing Zod deprecation hints and no errors or warnings.

The final catalog has 56 records: 43 agents (including three agent families counted
once) and 13 infrastructure records. It contains 900 claims and 127 source records.
There are 109 distinct canonical publisher URLs and 111 declared capture bundles;
these are different counting units. Source aliases from extracted entries do not
increase displayed source totals. The original baseline already included repeated
publisher URLs for the OpenAI factory/Sevbot and Plaid examples.

An independent baseline comparison retained all 40 original record IDs, all 774
original claim IDs, all 107 original source IDs and URLs, and all 774 original
claim anchors in built entry HTML. Existing `/agents/<id>` HTML, Markdown, and JSON
addresses remain valid. Complete and compact JSON retain both collections;
`catalog_section` derives from type in catalog schema 7 and compact index schema 3.
The default and infrastructure indexes, All grouping, scoped text search, old
infrastructure type links, OR filters, history, no-JavaScript browsing, palette
reopening, inverse dependencies, and claim/export parity have explicit regression
coverage. Agent-only comparisons and supervision facets exclude infrastructure.

## Visual review

Desktop (1280×900) and mobile (390×844) screenshots were generated with Playwright
for Agents, Infrastructure, All, Spectre, Plaid MCP, River, Slack, a monday.com
agent-family page, and the command palette. Both full-page and viewport images
are available in the local review artifacts at `/tmp/plan012-visual/`, named
`desktop-<subject>.png`, `mobile-<subject>.png`, and corresponding `-viewport.png`
files. These are QA artifacts, not published source evidence.

The coordinating reviewer inspected the collection indexes, All, Spectre, Plaid,
River, Slack, the family page, and the palette across desktop/mobile captures;
the executor also inspected desktop Agents and mobile All. Review found and fixed
the initially floating scoped search and redundant infrastructure launcher. The
scoped search now appears inline with the collection, while the global keyboard
palette searches both labeled collections. Infrastructure headings lead with
architecture; Spectre's sandbox detail remains prominent. The generic supporting
notice is gone, infrastructure has no top-level agent autonomy/level, and scoped
legacy assessments remain in research details. Mobile text, navigation, metadata,
and search fit the viewport. Automated narrow-page checks also cover expanded
research disclosures and all entry claim anchors.
