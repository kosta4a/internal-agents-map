# Catalog content review — 2026-09

This review applies the catalog definitions to every active record as of 2026-09-16.
It checks structural type, invocation, state, identity, autonomy, and each scoped
attention boundary together. A source's publication and verification dates are
preserved; `last_reviewed_at` records this catalog review.

## Decisions that changed authored fields

| Entry | Field | Previous value | Decision | Evidence and locator | Rationale |
| --- | --- | --- | --- | --- | --- |
| Brex — Internal Agent Platform | `operating_models`, invocation | One continuous-steering workflow; interactive | Split into exception-only high-confidence cases and two work-product-review workflows; add event-driven | `brex-agent-platform-source-1`; preserved article passages quoted by `operating_models.0–2` and the invocation claim | Analysts review low-confidence exceptions, KYC results, and collections drafts at different boundaries. These workflows cannot be averaged into continuous steering. |
| Cloudflare — Internal AI engineering stack | `operating_models`, state | One work-product-review workflow; unknown | Split automated review (`unknown`) from reviewed AGENTS.md changes; `mixed` | `cloudflare-ai-stack-source-1`; capture sections named by the two operating-model claims and Durable Objects/session claims | Posting advisory findings does not prove a person reviews each run. The platform combines stateful and ephemeral components. |
| Domu — Clementino | `operating_models`, invocation, state | One work-product-review workflow; interactive; unknown | Split approved actions, continuous cowork, and scheduled jobs; add scheduled; cross-session-memory | `domu-clementino-source-1`; capture passages linked from `operating_models.0–2`, `rubric.invocation`, and `rubric.state` | The source documents three distinct workflows and memory that survives individual sessions. |
| Harvey — Spectre | invocation, state | Interactive; unknown | Add background and scheduled; durable-session | `harvey-spectre-source-1`; capture passages linked from `rubric.invocation` and `rubric.state` | Automations start durable runs that may outlive the initiating request. |
| Linear — Linear Agent | state, identity | Unknown; unknown | Durable-session; dedicated-agent | `linear-agent-source-1`; capture passages linked from `rubric.state` and `rubric.identity` | Assigned agent work and persisted sessions establish both properties. |
| monday.com — Sphera / Atlas / Morphex | state | Unknown | Cross-session-memory | `monday-sphera-atlas-morphex-source-1`, `archive/sources/monday-sphera-atlas-morphex-source-1/content.md:62` | `MEMORY.md` is explicitly cross-session, daily diaries preserve learned context, and another pod can mount the same workspace. |
| Notion — Custom Agents | invocation, state, identity | Interactive; unknown; unknown | Add background and event-driven; mixed; dedicated-agent | `notion-custom-agents-source-1`; capture passages linked from the three rubric claims | The record combines interactive and event-triggered agents and both transient and persistent behavior. |
| OpenAI — Software factory | performance-fix attention boundary | Work-product review | Unknown | `openai-sevbot-article`, `archive/sources/openai-sevbot-article/content.md:22`; claim `operating_models.2` | The report says Perf Factory starts agents that propose fixes, but does not locate mandatory human attention for each proposal. |
| Plaid — AI Annotator | autonomy, attention boundary, invocation | Drafts-reviewed; work-product-review; background | Unknown; unknown; unknown | `plaid-ai-annotator-source-1`; claim-linked preserved passage | The source reports annotation work but does not establish the normal review boundary or trigger mode. |
| Replit — Manager Agent | autonomy, attention boundary | Drafts-reviewed; work-product-review | Autonomous; exception-only | `replit-manager-agent-source-1`; claim-linked passages for run completion and escalation | The documented workflow proceeds without routine review and brings people back for exceptions. |
| Retool — RetoolGPT | active membership | Active task-agent; model described as ChatGPT | Remove; retain as an evidence gap in the coverage backlog | `retool-retoolgpt-source-1`, `archive/sources/retool-retoolgpt-source-1/content.md:96` and `:100` | The deployed version requires a user to choose the retrieval source. Model-selected tool calls are described as future RetoolGPT/Retool Agents behavior. The same article says the implementation supports several model providers, so “built on ChatGPT” is unsupported. |
| Salesforce — Slackbot | identity | Unknown | User | `salesforce-slackbot-source-1`; identity claim and linked capture passage | Requests execute with the invoking employee's identity. |
| Sentry — Junior | state | Unknown | Durable-session | `sentry-junior-source-1`, `archive/sources/sentry-junior-source-1/content.md:136` | The source describes a queued continuation and persisted transcript. This establishes resumable session state, not cross-session learning. |
| Shopify — Internal agents | state | Unknown | Durable-session | `shopify-internal-agents-source-1`, `archive/sources/shopify-internal-agents-source-1/content.md:116` and `:134` | Sessions use an append-only event log and recover after ephemeral cells die. |
| Sierra — Pinecone | invocation, state, identity | Interactive; unknown; unknown | Add scheduled; durable-session; mixed | `sierra-pinecone-source-1`; claim-linked scheduler, session, and identity passages | The platform supports scheduled work, durable conversations/runs, and more than one identity model. |
| Spotify — Honk / Xirp | invocation, state | Event-driven; durable-session | Background; unknown | `spotify-honk-xirp-source-1`; invocation and state claim locators | A background workflow is documented, but durable recovery is not established by the collected source. |
| StrongDM — Software Factory | attention boundary | Exception-only | Unknown | `strongdm-software-factory-source-1`; operating-model claim | Outcome measurement and high autonomy do not prove a person normally returns only for exceptions. |
| Uber — Internal coding agent | invocation | Unknown | Interactive | `uber-coding-agent-source-1`; invocation claim | The preserved report describes engineer-started use. |
| WorkOS — Project Horizon | attention boundary, state, identity | Outcome-review; durable-session; unknown | Work-product-review; mixed; user | `workos-project-horizon-source-1`; claim-linked review, runtime, and identity passages | Review occurs on produced work; the compound platform has mixed state and uses the initiating user's authority. |
| Y Combinator — Agent infrastructure | invocation, state | Unknown; unknown | Interactive and scheduled; cross-session-memory | `ycombinator-agent-infra-source-1`; claim-linked scheduling and memory passages | The report documents both user-started and scheduled runs plus memory reused across sessions. |

## Full active-entry coverage

The following active records were read with their preserved primary sources. Entries named in
the decision table above changed at least one reviewed field. The remaining entries required no
additional classification change after applying the definitions; uncertainty stays explicit.

- Airbnb — Airchat
- Atlassian — Rovo Dev
- Block — Builderbot
- Brex — Internal Agent Platform
- Cloudflare — Internal AI engineering stack
- Coinbase — Forge / Mux
- Databricks — coSTAR and internal engineering agents
- Domu — Clementino
- DoorDash — AI Code Review Agent
- DoorDash — Flux / Agentic AI Platform
- Dropbox — Nova
- Flex — AI Investigation Agent
- GitHub — Qubot
- Harvey — Spectre
- HubSpot — Sidekick
- Linear — Linear Agent
- Microsoft — PRAssistant
- monday.com — Sphera / Atlas / Morphex
- Notion — Custom Agents
- OpenAI — Sevbot
- OpenAI — Software factory
- Plaid — AI Annotator
- Plaid — Fix My Connection
- Plaid — Internal MCP server
- PostHog — StampHog
- Ramp — Inspect
- Replit — Manager Agent
- Salesforce — Slackbot
- Sentry — Junior
- Shopify — Internal agents
- Sierra — Pinecone
- Slack — Context system
- Spotify — Honk / Xirp
- Stripe — Minions
- StrongDM — Software Factory
- Uber — Internal coding agent
- Uber — uReview
- WorkOS — Project Horizon
- Y Combinator — Agent infrastructure
- Zup — CodeGen

RetoolGPT was reviewed and removed, so it appears in the decision table and coverage backlog
rather than this active-entry list. Browserbase had already been retired before this review.

## Unresolved questions

- Retool: the collected article does not establish that the model-selected-tool version ran
  internally. A later internal Retool Agents source could support a new, version-specific entry.
- OpenAI Perf Factory: proposal generation is documented; the normal review, merge, and
  deployment boundaries are not.
- Records whose boundary, state, identity, or invocation remains `unknown` need a passage that
  directly establishes that property. Volume, scheduled triggers, persisted chat, and optional
  steering are not substitutes.

## Editorial review log

The same source pass covered every lesson and summary. Company recommendations are treated as
reported opinions, while catalog interpretations state the specific comparison or limitation.
The seven notes were then read together after revision to check repeated endings, generic
cautions, exact quotations, and the distinction among conversation recovery, file recovery,
and completed external actions. Automated tests verify structure and links; they do not measure
editorial judgment.
