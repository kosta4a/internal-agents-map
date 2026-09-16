# Content review, 2026-09-16

This review implements Phase 1 of [Plan 008](../plans/008-reconcile-content-and-classifications.md).
It covered every active entry in `data/agents/` against the preserved source captures in
`archive/sources/`. For each entry, a reviewer read the record and every preserved capture and
assessed `rubric.state`, `rubric.identity`, `rubric.invocation`, `autonomy`, each scoped
`operating_models` item, `architecture.model`, and the `summary`. Every proposed correction then
went to a second, adversarial reviewer that re-read the cited lines with surrounding context and
was instructed to refute the correction. Corrections quoted below were verified verbatim at the
named locators in the preserved `content.md` files; locators refer to those files, including their
archive headers. Only corrections that survived refutation, or unclear verdicts resolved by the
editorial rules below, changed a record.

Editorial rules applied throughout:

- Measured successful outcomes are not evidence that a person reviews outcomes on each run.
- Approval is distinct from merge and from production deployment.
- Optional steering is not continuous steering; an event trigger alone does not establish
  unattended background operation.
- Persisted chat history, recovered files, completed external actions, and cross-session learning
  are different properties; a record gets only the property its sources establish.
- Where the sources do not locate the human-attention boundary, the boundary is `unknown`.
- Compound records split into separate scoped assessments instead of averaging workflows.

`last_reviewed_at` moved to 2026-09-16 for every reviewed record. Source `last_verified_at`
values did not change: re-reading an existing capture is not a new verification event.

## Coverage

41 entries were active at the start of the review. One was removed (RetoolGPT; see below) and the
reviewed catalog now holds 40. The finish of this file lists the entries reviewed without changes.

Changed: airbnb-airchat, brex-agent-platform, cloudflare-ai-stack, coinbase-forge-mux,
databricks-costar, doordash-flux, domu-clementino, flex-investigation-agent, harvey-spectre,
linear-agent, microsoft-prassistant, monday-sphera-atlas-morphex, notion-custom-agents,
openai-software-factory, plaid-ai-annotator, plaid-fix-my-connection, ramp-inspect,
replit-manager-agent, salesforce-slackbot, sentry-junior, shopify-internal-agents, sierra-pinecone,
spotify-honk-xirp, stripe-minions, strongdm-software-factory, uber-coding-agent,
workos-project-horizon, ycombinator-agent-infra, retool-retoolgpt (removed).

Reviewed with no classification or content change: openai-sevbot, posthog-stamphog,
uber-ureview, and the entries listed as unchanged in the finisher addendum.

## RetoolGPT removal

Decision: remove from active membership; record the unresolved Retool Agents product in the
[coverage backlog](coverage-backlog.md).

- The version the record cataloged is the deployed assistant of the 2025-08 engineering blog
  (`retool-retoolgpt-source-1`). Its documented behavior is a scripted retrieval pipeline: users
  select data sources with toggles (`content.md:41`), a fixed workflow performs semantic search
  and passes results to a user-chosen model (`content.md:69`), and the model selector offers
  OpenAI, Anthropic, and DeepSeek models (`content.md:39`).
- Model-directed tool selection appears only in future tense (`content.md:100`: "in the future,
  RetoolGPT will be able to decide which tools to call"), and the run-time tool-deciding passages
  describe the separate Retool Agents product (`content.md:102`, `:104`).
- The prior `model: Built on ChatGPT` claim misread "an internal version of ChatGPT"
  (`content.md:21`), a description of the assistant's shape, not its provider.
- Per Plan 008, the entry stays only with readable evidence of model-directed action selection in
  internal use. That evidence does not exist, so the entry was removed rather than reclassified,
  and no assistant or infrastructure category was invented to preserve membership.

The preserved captures stay in `archive/sources/`. The Definitions chart placement, company
record, logo, and CSS anchor were removed; historical documents link to the capture.

## Decisions by entry

### Airbnb — Airchat

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `architecture.model` | Claude Code (a vendor agent), wrapped by Airbnb | Vendor coding agents (Claude Code and Codex are named in use), wrapped by Airbnb | `airbnb-airchat-source-2 content.md:114` ("It's Claude Code, it's Codex"), `:214` ("a light abstraction wrapper around coding agents"), `:234` |
| `architecture.harness` | Wrapper over Claude Code … | Wrapper over vendor coding agents … | Same passages; no source ties AirChat to Claude Code alone |
| `summary` | "vendor coding agents such as Claude Code" | adds "and Codex" | `content.md:114` |
| `operating_models.0` evidence | cited source-2 only | source-3 supports (lines 82, 250: "A human reviews every line before it merges"), source-2 contextualizes | The exact boundary passages live in source-3's distillation |

### Brex — Internal Agent Platform

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `rubric.invocation` | interactive | interactive, event-driven | `content.md:80` (a rubric agent evaluates every support response), `:173` (collections outreach automated), `:167` (KYC traffic routed to the agent), `:36`. The chatbot first-touch quote at `:76` was rejected as load-bearing: it describes Brex's customer-facing product AI (`:20`), outside this entry |
| `operating_models.0` | one model, `internal operations request → completed operation`, continuous-steering | three scoped models: exception-only (high-confidence case flow, `:76`, `:159`), work-product-review (KYC, `:143`, `:205`, with `:211` contextualizing), work-product-review (collections follow-ups, `:173`) | Continuous steering is documented nowhere; the only iteration is build-time (`:181`). The verifier refuted the reviewer's first split as overreaching and supplied this one |
| `architecture.model` | Multi-model | Not documented for deployed agents; the platform provides multi-model testing at build time | `:36` describes build-time capability; no deployed runtime model is named |
| `key_metrics.0` scope | (unqualified) | notes the chatbot figure describes Brex's customer-facing product AI | `:20`, `:76` |

### Cloudflare — Internal AI engineering stack

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `rubric.state` | unknown | mixed | `content.md:261` (CI reviewer "stateless per execution" = run-only) beside `:53` (Agents SDK "Stateful, long-running agent sessions") and `:271` (reviewer keeps context across iterations) |
| `operating_models.0` | scope "pull request → AI review findings", work-product-review | scope "pull request → automated AI review findings posted as advisory comments", unknown | `:257` (every MR reviewed automatically), `:269` (engineers "may scan" headers); no passage documents a person reviewing the findings per run |
| `operating_models.1` | (absent) | AGENTS.md generation → merge request the owning team reviews and refines, work-product-review | `:247` |

`rubric.identity` stays unknown: the interactive path documents user SSO identity (`:141`) but the
CI reviewer's identity is undocumented, and no single value is established platform-wide.

### Coinbase — Forge / Mux

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `operating_models.0.scope` | "… reviewed pull request and build" | "… drafted fix and pull request pushed back for review" | `coinbase-forge-mux-source-2 content.md:34`; no source documents a build artifact |
| `summary` | "Linear issue, fix, PR, and one-off build"; "5% of all PRs merged company-wide" | drops "one-off build" and "company-wide" | Same passage; the preserved tweet says only "5% of all PRs merged" and the thread reply cited for the company-wide reading is not in the capture |
| `architecture.model` | "Portfolio across multiple providers" | Claude bot can use multiple underlying models despite its name; the documented portfolio spans harnesses; no source names model providers | `source-5 content.md:114`, `source-1 content.md:24` |
| `primitives.0` | included "one-off build" | ends at "PR pushed back for review" | Same as scope |
| `headline_metric`, `key_metrics.1` reasons | cited a thread reply for company-wide scope | state the preserved capture does not establish that scope | `source-3 content.md:11` |

### Databricks — coSTAR and internal engineering agents

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `key_metrics.0` | "Internal agents serve as daily coding drivers on the Databricks codebase" (kind: fact, citing source-1) | "coSTAR reduced the time to verify agent changes from two weeks down to hours" (kind: metric, citing source-1 `content.md:11`) | The daily-driver phrase exists only in `source-2 content.md:41–43` and is a prospective conclusion about model choice; source-1 contains no such statement |
| `summary` | "Databricks' open-source Omnigent is a separate product" | drops "open-source" | Neither capture states Omnigent's license (`source-2 content.md:60`) |

`rubric.invocation`: the reviewer proposed dropping `background`; the adversarial verification for
this field did not complete, so the value is unchanged and recorded as an open question below.

### Domu — Clementino

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `rubric.state` | unknown | cross-session-memory | `content.md:64` (four layers stored in shared tables), `:82` (a fact learned in a Tuesday Cowork session is recalled on Thursday in Slack) — stored information reused across separate sessions |
| `rubric.invocation` | interactive | interactive, scheduled | `:70`, `:78` (5am standup, invoice approvals, QA sampling, huddle ingestion) |
| `operating_models.1` | (absent) | Cowork alongside-workflow, continuous-steering | `:80` (work watched "in one place"), `:76` ("two workflows") |
| `operating_models.2` | (absent) | scheduled jobs, unknown | `:70`, `:78`; no review of their output is described |

### DoorDash — Flux / Agentic AI Platform

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `summary` | presented one platform ("a unified cognitive layer … with an AI Marketplace … and the Flux cloud-agent runtime") | two documented platforms — the data/analytics agentic AI platform and the Flux engineering-agent platform — with no preserved source connecting them | `source-2 content.md:10` (Nov 2025 analytics post) and `source-3 content.md:10` (Aug 2026 Flux post) never reference each other |
| `architecture.model` | "Model-agnostic platform primitives…" | sources name no model or provider; documented primitives are modular across tools and harnesses | `source-3 content.md:36`, `:54` |

### Flex — AI Investigation Agent

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `architecture.model` | Not specified | Anthropic (named for the tool-calling investigation loop and the coding sub-agent); version not named | `content.md:202` ("**Anthropic:** tool-calling investigation loop and coding sub-agent") |
| `architecture.harness` | "underlying runtime not documented" | serverless application on Modal; Slack acknowledge → spawned background function → coding sub-agent | `:148`, `:150`, `:203` |

### GitHub — Qubot

Reviewed, no change. `rubric.state` stays unknown: query results persist as PR-attached reports and
a context layer persists across repositories (`content.md:30`, `:42`, `:46`), but no passage
establishes session survival across interruption or memory reused across sessions.

### Harvey — Spectre

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `rubric.state` | unknown | durable-session | `content.md:38` ("the durable object is the run record"), `:40` (resume from archived session state), `:74` |
| `rubric.invocation` | interactive | interactive, background, scheduled | `:16` (Slack, web app, or automation), `:68` (cron-based automations), `:30` (kick off and walk away) |
| `summary` | "reacts to incidents, bug reports, and Slack messages" | "turns requests from Slack, the web app, or automations into durable runs…" | `:16` is the article's own trigger list; "bug reports" appears in no capture (`:94` is about Spectre's own bugs) |
| `architecture.tool_access` | "reacts to incidents, bug reports, customer feedback, and Slack messages" | documented trigger set and injected tool configuration | `:16`, `:44`, `:46` |
| `architecture.credentials` | restated the tool-access phrase | short-lived, scoped credentials injected at run start; no ambient access | `:82` |

### Linear — Linear Agent

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `rubric.state` | unknown | durable-session | `linear-agent-source-1 content.md:85` ("agent loop built on a durable workflow engine"), `:100` (suspend mid-tool call, resume later) |
| `rubric.identity` | unknown | dedicated-agent | `source-3 content.md:24` (actor=app creates a dedicated user with its own OAuth token), `source-2 content.md:60` |
| `summary` | "triages … executes scheduled/event-driven 'Loops'" | "scopes customer feedback into issues … can be triggered automatically when issues enter triage" | Triage routing is Triage Intelligence's step (`source-2 content.md:38`); the Loops claim rested on a passing mention (`source-1 content.md:24`); auto-trigger documented at `source-6 content.md:45` |

### Microsoft — AI-powered code review assistant

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `agent_name` | PRAssistant | AI-powered code review assistant | "PRAssistant" appears nowhere in the sole capture; the article names the tool "AI-powered code review assistant" (`content.md:10`) |
| `summary` | "built by its Developer Division Data and AI team" | "built in close collaboration with its Developer Division's Data & AI team" | `content.md:10` verbatim |
| `architecture.interfaces` | `[github]` | `[]` | Every GitHub mention in the capture refers to the external GitHub Copilot offering; the internal integration is described only as "the existing PR workflow" (`:16`) |

The entry id and URL are unchanged.

### monday.com — Sphera / Atlas / Morphex

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `rubric.state` | unknown | mixed | Durable replay and EFS-mounted resume (`content.md:77`, `:52`) beside per-agent `MEMORY.md` and daily diary written at session end and read at session start (`:120`), reused across sessions (`:88–93`) |
| `operating_models.0` | one model, "Atlas or Morphex feature task → tested and merged pull request", outcome-review | Morphex: PR passing CI, remote sandbox, and Guardrails → automatic merge and production ship, exception-only | `:150` ("Nineteen of every twenty Morphex PRs merge automatically"), `:169` (above threshold merges, below routes to a human); the outcome machinery at `:116` is automated, so outcome-review was not established |
| `operating_models.1` | (absent) | Atlas feature task → sandbox-tested pull request, unknown | `:124` (tests before human review, present tense) against `:169` (threshold routing described as being driven out over two quarters); two-sided evidence |

### Notion — Custom Agents

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `rubric.invocation` | interactive | interactive, background, event-driven | `source-1 content.md:143` ("it's actually running in the background"), `:1051`, `:609` (Slack-triggered agent), `:1375` (calendar triggers) |
| `rubric.state` | unknown | mixed | `:683` (no built-in memory; pages and databases are the memory) with documented cross-session reuse via shared pages/databases (`:679`) |
| `rubric.identity` | unknown | dedicated-agent | `source-2 content.md:16`, `:22` (build-from-nothing permission model), `:45` |

### OpenAI — Agentic software factory

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `operating_models.2` | "production alert → proposed performance fix", work-product-review, confidence low | same scope, unknown, confidence unverified | `openai-factory-article content.md:186` ends at "propose fixes"; where human attention returns for those proposals is not documented anywhere in the captures |
| `rubric.identity` | mixed | unknown | No capture states whose identity the agents act under |
| `rubric.invocation` | interactive, background, event-driven | adds scheduled | `every-codex-team-interview content.md:246` (hourly CI cleanup), `:232`; `openai-harness-engineering-post content.md:199` (regular-cadence background tasks) |

### Plaid — AI Annotator

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `autonomy` | drafts-reviewed | unknown | The only human-involvement passage is targeted validation "when required for a product use-case" (`content.md:18`); the alignment metric measures agreement, not per-run review |
| `operating_models.0` | work-product-review | unknown | Same passage; no per-run review documented |
| `rubric.invocation` | background | unknown | The source never says how labeling runs start or are attended |
| `summary` | "with human oversight on the labeled output" | "with targeted human validation when a product use case requires it" | `:18` verbatim |

### Plaid — Fix My Connection

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `operating_models.0` | outcome-review | unknown | `content.md:32` reports aggregate impact (2M logins, 90% faster fixes); no passage documents per-run review of outcomes, work products, or exceptions |
| `summary` | "detects bank-integration failures and generates repair scripts automatically" | pending the finisher verification; recorded below if applied | "scripts" appears nowhere in the capture; `:30` and `:28` say "automatically repairs access issues" / "automated tools that swiftly repair" |

### Ramp — Inspect

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `rubric.state` | unknown | durable-session | `ramp-inspect-source-1 content.md:44` (snapshot finished session, restore on follow-up), `:82` (per-session SQLite), `:22` (resume from another device) |
| `rubric.identity` | unknown | mixed | `:96`, `:94` (PR opened with the user's token, on behalf of the user) beside `:38–39` (clone/commit/push under a GitHub App installation token; user.name/email are attribution only) |
| `rubric.invocation` | background, event-driven, interactive | background, interactive | Every documented Inspect invocation starts with a person (`:18`; `source-5 content.md:109`); the alert-triggered automations belong to separate agents built on top (`source-5 content.md:137–141`) |
| `summary` | "now also monitoring production and proposing fixes; also a platform that hosts many internal agents" | Inspect serves as the platform hosting many internal agents, some of which monitor production and propose fixes | `source-5 content.md:112`, `:137`; no Ramp source attributes production monitoring to Inspect itself |

### Replit — Manager agent

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `autonomy` | drafts-reviewed | autonomous | `content.md:16` (performing work, checking results, escalating judgment), `:50`, `:54`, `:168` — no passage documents required review before work takes effect |
| `operating_models.0` | work-product-review | kept work-product-review (reviewer's exception-only flip was refuted: `:62` documents a persisting human-review lane and `:50`'s 30%-of-review-time metric is incompatible with exception-only) | Verified adjustment |
| `operating_models.1` | (absent) | pull request → agent review with risk-gated human second reviewer, exception-only | `:50` ("assess risk levels and only call in a second human reviewer when necessary") |

### Salesforce — Slackbot

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `architecture.model` | Not specified | Anthropic Claude (named via VentureBeat); additional providers planned within the year, Gemini named and OpenAI possible | `salesforce-slackbot-source-3 content.md:32`, `:34` |

### Sentry — Junior

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `rubric.state` | unknown | durable-session | `sentry-junior-source-1 content.md:136` area: queued continuation and persisted transcript; the interrupt/resume broker survives serverless timeouts |

Plan-directed correction applied before the reviewer pass; the finisher reviewer re-checked it
against the capture.

### Shopify — Aquifer / River

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `rubric.state` | unknown | durable-session | `shopify-internal-agents-source-1 content.md:120` (durable identity, Postgres append-only event log), `:134` (work picks up where it left off), `:116` — session durability, not cross-session learning |
| `operating_models.0.scope` | "River coding request → reviewed pull request" | "River coding request → River-opened, River-coauthored pull request" | `:65` (River opens PRs), `:83` (merged in the passive voice, no actor); "reviewed" inserted a step no passage documents, and "human-merged" was refuted as the same overreach in reverse |
| `operating_models.0.attention_boundary` | work-product-review | unknown | PR review runs as a separate profile "often no human in the loop" (`:140`, `:147`); merge actor undocumented |
| `summary` | "plus research, migration, and app-security agents" | "plus PR-review and headless Vanilla agent profiles; other teams have requested research, migration, and compliance-scan agents" | `:140` (documented profiles), `:93` (research/migration/compliance appear in the request list); no app-security agent is named anywhere |
| `domains` | coding, code-review, research, security | coding, code-review | Follows the corrected summary: research and security agents are requested, not running |
| `operating_models.0` metadata | medium confidence, PR-creation reason | unverified; reason states the evidence gap | Same passages |

### Sierra — Pinecone

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `rubric.identity` | unknown | mixed | `sierra-pinecone-source-2 content.md:101–104` (interactive work runs as the user; scheduled or shared workflows run as service accounts) |
| `rubric.invocation` | event-driven, interactive | adds scheduled | `source-1 content.md:50` ("triggered through webhooks or on a schedule"), `:141` |
| `architecture.model` | "routes by intent (planning, coding, prose)" | a classifier routes by task intent to select repository, environment, harness, model, and reasoning budget | `:58`; the "(planning, coding, prose)" taxonomy appears in no capture |
| `summary` | "collapsed separate support, analytics, engineering, and sales agents into a single runtime" | moved from per-employee laptop agents to one shared runtime | `:22` (every engineer had laptop agents), `:56`; no prior departmental agents are documented |

`rubric.state` stays durable-session: a proposed cross-session-memory reading was refuted —
session reuse (`source-1:28`, `:80`) flows from recorded durable state, and the skills library is
person-authored knowledge architecture, not rubric-level cross-session state.

### Spotify — Honk / Xirp

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `rubric.state` | durable-session | unknown | No passage documents a Honk session surviving interruption; K8s pod scheduling is concurrency, and Honk v2 "shared agent sessions" is announced multiplayer collaboration (`source-2 content.md:56`, `:76`) |
| `rubric.invocation` | event-driven, interactive | interactive, background | `source-1 content.md:81`, `:87` (kick off and go to lunch; MCP-triggered from Slack/GHE); no passage documents an event that starts the agent |
| `summary` | "Xirp is the workspace/context/session layer around it (medium confidence)" | Xirp is a related beta product, an agentic development environment connected to Portal; its relationship to Honk is not documented in the captured sources | The Xirp page never mentions Honk (`source-3 content.md:30`) |
| `primitives.2` desc | "The session/context surface around the agent…" | same correction as the summary | Same passage |

### Stripe — Minions

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `rubric.invocation` | background, event-driven, interactive | background, interactive | `source-1 content.md:36` (people start minions from Slack/CLI/web), `source-2 content.md:40` (fully unattended after start); the only event flow creates a ticket with a human-pressed button (`source-1:42–44`) |
| `summary` | "read work context, locate the right repo/workspace, implement a change…" | drops "locate the right repo/workspace" | `source-2 content.md:30`: the devbox is pre-checked-out across Stripe's repos; no passage describes the minion choosing the workspace |

### StrongDM — Software Factory

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `operating_models.0` | exception-only | unknown | The sources document zero human code review and automatic scenario validation, but no passage states a person is summoned when scenarios fail to converge; the exception edge is a spec example whose recipient is never named |

### Uber — Internal coding agent

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `operating_models.0` | unknown, "does not document where human attention returns" | work-product-review | `uber-coding-agent-source-1 content.md:26`: "There is zero human authoring. Engineers review and approve, but the code is written entirely by AI agents" |

### WorkOS — Project Horizon

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `operating_models.0` | outcome-review | work-product-review | `source-1 content.md:60` (a human is always in the loop at PR handoff; no merge without explicit approval), `:48`, `:181` |
| `rubric.state` | durable-session | mixed | Durable half: `:112`, `:62`; cross-session half: fixes, scripts, docs, and conventions carried into later runs (`:146`, `:133`, `:26`) |
| `rubric.identity` | unknown | user | `source-1:54` (PRs attributed to the human owner), `source-2:52` ("The PR opens as you"), `source-1:106`; the GitHub App token for mechanical git operations is recorded in `architecture.credentials` |
| `architecture.model` | "Swappable; the harness is the constant, not the model" | Not documented by name; the harness is the swappable layer (OpenCode in one deployment, Claude Remote Routines in the other) | `:153`, `:157`, `source-2:50`; the record inverted the sources |

### Y Combinator — Internal agent infrastructure

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `rubric.state` | unknown | cross-session-memory | `content.md:166` (a nightly general agent reads stored conversations for improvements), `:178` (learnings baked into the shared two-sentence-description skill, which got noticeably better), `:158` (shared skills) |
| `rubric.invocation` | unknown | interactive, scheduled | `:122`, `:132` (people ask questions), `:166` (the nightly agent runs on a fixed schedule) |

`autonomy` stays human-in-loop: the documented dominant pattern is interactive chat in which a
person participates in every cycle, which matches the catalog definition. The nightly
self-improvement run is unattended; the boundary for that workflow stays unknown.

## Refuted corrections (no change made)

- **Block — Builderbot**, `rubric.invocation` → interactive only: refuted. Source-2 identifies the
  per-PR review protector as Builderbot itself (`block-builderbot-source-2 content.md:20`, `:46`,
  `:50`), so event-driven invocation for the review subsystem stands.
- **HubSpot — Sidekick**, `autonomy` → autonomous: refuted. A Sidekick comment is an advisory
  draft a person reads before any consequence; the Judge Agent gates delivery quality, not effect.
  `drafts-reviewed` stands.
- **Replit — Manager agent**, `operating_models.0` → exception-only: refuted as a flip of the
  whole scope; split applied instead (above).
- **Shopify**, OM scope "…human-merged pull request": refuted; merge actor is undocumented.
- **Sierra — Pinecone**, `rubric.state` → cross-session-memory: refuted; stays durable-session.
- **Brex**, first proposed OM split: refuted on values; adjusted split applied (above).

## Unresolved questions

- **Brex `key_metrics.0`**: the 50% first-touch metric describes Brex's customer-facing product
  AI, adjacent to this internal-platform entry. Retained with an explicit scope note; removal is
  an open editorial question.
- **HubSpot `operating_models.0`**: the reviewer proposed `unknown` (no per-run human review of
  comments); the autonomy refutation argued advisory comments are drafts a person reviews before
  use. `work-product-review` stands; recorded as a semantic tension for the Phase 2 taxonomy work.
- **Linear "Loops"**: the scheduled/event-driven Loops claims rest on a passing mention; the
  summary no longer asserts them. `primitives.2` (Loops) is retained on the auto-trigger passage.
- **Y Combinator `autonomy`**: see above; kept human-in-loop on the interactive definition.

## Method limits

Automated checks validate structure and links; they cannot measure whether a classification is
warranted. This review is also agent work: reviewer agreement is not independent evidence, which
is why every applied change names the passage a human can re-read in the preserved capture.

## Finisher addendum (same date)

The final six entries and the two outstanding verifications completed in a second pass:

### Sentry — Junior (additional corrections)

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `rubric.identity` | unknown | mixed | `content.md:216` (global installation token for reads; per-user OAuth for writes), `:212`, `:180` |
| `rubric.invocation` | event-driven, interactive | adds scheduled | `:261` ("The two primary concerns … are scheduled tasks and inbound events"), `:263` |
| `operating_models.0` | one model | scope narrowed to the interactive Slack task (continuous-steering, unchanged); new `operating_models.1` for event/scheduler-triggered follow-ups, unknown | `:12`, `:91` versus `:279` ("It's up to Junior at that point to decide what to do"), `:281` |
| `summary` | "Its CEO argues one general-purpose agent beat several vendor-specific bots" | "Its author would rather have one general-purpose agent than several vendor-specific bots" | No capture names the author or title (`:10`, `:28`); "beat" overstated a preference |

`rubric.state: durable-session` was re-verified against `:136`, `:138`, `:73`.

### DoorDash — AI Code Review Agent

Reviewed; no change. A proposed `rubric.identity: dedicated-agent` was refuted: the capture
establishes a non-human taggable bot identity (`content.md:133`, `:168`) but cannot discriminate a
dedicated bot account from a shared service account, so `unknown` stands.

### Dropbox — Nova

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `autonomy` | human-in-loop | autonomous | `content.md:18` ("others can run autonomously in async workflows"), `:58`, `:62` (capped fix-and-validate loop with no person in it); the dual-mode nuance moved into split operating models |
| `operating_models.0` | "agent-assisted SDLC workflow → accepted change", unknown | event-triggered validation-gated remediation → landed fix or routed candidates, exception-only | `:18`, `:58`, `:62`; publication stays deterministic outside the agent (`:32`) |
| `operating_models.1` | (absent) | interactive developer session, continuous-steering | `:18`, `:26` |
| `rubric.state` | unknown | durable-session | `:58` ("a durable workflow"), `:26` (Nova continues the session across validation failures) |
| `architecture.model` | "Platform-agnostic … swap models without rebuilding infra" | multiple coding agents behind one interface; prompt-evaluation tooling; helpers for adding AI-powered steps; no model or provider named | `:28`; model swapping is never discussed |

### Plaid — Internal MCP server

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `rubric.identity` | unknown | user | `content.md:59` (signed identity token parsed for the employee's identity; CLI auth through a local proxy), `:83` (user-level permission framework) |

### Slack — Multi-agent context system

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `autonomy` | human-in-loop | autonomous | `content.md:24` (investigations continue until concluded by the Director agent), `:54`, `:146` (staff audit is after the fact) |
| `rubric.state` | durable-session | unknown | Three written channels carry state between rounds within one investigation (`:272`), but no passage documents a session surviving interruption or restart |

### Zup — CodeGen

| Field | Old | New | Basis |
| --- | --- | --- | --- |
| `operating_models.0.attention_boundary` | continuous-steering | unknown | The abstract names "progressive human oversight modes" (`content.md:18`) but no boundary form |

### Outstanding verifications resolved

- **Databricks `rubric.invocation`**: the proposal to drop `background` was refuted — the entry's
  scope covers coSTAR-shipped automated agents, and the nightly judge cadence (`source-1
  content.md:135`) even supports scheduled operation. `[interactive, background]` stands.
- **Plaid Fix My Connection `summary`**: verified and applied above ("automatically repairs
  access issues"; "scripts" appears nowhere in the capture).

All 41 baseline entries are now accounted for: 30 records changed, RetoolGPT removed, and the
remainder reviewed with no change: openai-sevbot, posthog-stamphog, uber-ureview,
doordash-code-review, github-qubot (state question resolved to keep unknown).

## Parallel-execution reconciliation (same date)

A second executor independently reviewed the same records from an earlier snapshot of this
review and completed the remaining plan phases. Its Phase 1 decisions were compared with the
verifier-backed decisions above and reconciled as follows:

- **Uber — Internal coding agent, `rubric.invocation` → interactive**: accepted. The capture
  documents engineer-initiated delegation ("95% of its engineers now use AI every month";
  "engineers are increasingly delegating tasks to AI", `uber-coding-agent-source-1
  content.md:18, 24`), so `unknown` understates the evidence.
- **Salesforce — Slackbot, `rubric.identity` → user**: refuted and reverted to `unknown`. The
  cited passage ("taking action on behalf of employees", `salesforce-slackbot-source-3
  content.md:14`) is a capability description, not an identity-architecture statement; no
  capture discusses the account or authorization model the bot acts under.
- **monday.com, `rubric.state` → cross-session-memory**: superseded by `mixed`. Both properties
  are documented — durable replay and EFS-mounted resume (`content.md:52`, `:77`) beside the
  per-agent `MEMORY.md` and diary reused across sessions (`:120`, `:88–93`) — so one value
  alone understates the evidence.
- **Replit — Manager agent, whole-scope `exception-only` flip**: superseded by the split above;
  the adversarial verification refuted the flip (`:62` documents a persisting human-review
  lane, and the 30%-of-review-time figure at `:50` is incompatible with exception-only).

The reconciled record set carries the union of both passes; every difference was decided for
the reading with direct, verifier-checked passage support.
