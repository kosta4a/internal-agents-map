# Internal Agents Map

**[Explore the map](https://internal-agents.com/)**

## Definition

**Internal agents are AI systems organizations build or adapt to do work for their own teams.**

They operate through the organization's knowledge, tools, workflows, and controls. Some work
alongside a person. Others start from an event and run in the background. Human supervision
varies by workflow.

Organizations publish these systems under many names. Internal Agents Map groups their
implementations under one definition so their designs and operating boundaries can be compared.

The map also covers platforms, orchestration systems, and implemented supporting patterns.
These support internal agents but are not agents themselves.

Claims link to public sources. Company reports stay separate from catalog interpretation, and
undocumented details stay unknown.

[Browse the catalog](docs/landscape.md) ·
[Website and delivery](docs/site.md) ·
[Architecture patterns](docs/patterns.md) ·
[Adoption observations](docs/adoption-lessons.md) ·
[Use the data](data/agents.json) ·
[Contribute](CONTRIBUTING.md)

<!-- BEGIN OVERVIEW -->

**Current map: 40 approaches across 35 organizations, backed by 107 sources and 774 evidence-linked claims.**

## Overview

| Organization | Approach | Type | Work |
| --- | --- | --- | --- |
| Airbnb | [Airchat (airchat-cli)](docs/landscape.md#airbnb-airchat) | platform | coding, code-review |
| Atlassian | [Rovo Dev (RovoDev)](docs/landscape.md#atlassian-rovo-dev) | agent | coding, code-review |
| Block | [Builderbot](docs/landscape.md#block-builderbot) | orchestration-system | coding, code-review |
| Brex | [Internal Agent Platform](docs/landscape.md#brex-agent-platform) | platform | finance-ops, support, customer-success |
| Cloudflare | [Internal AI engineering stack](docs/landscape.md#cloudflare-ai-stack) | platform | coding, code-review |
| Coinbase | [Forge / Mux](docs/landscape.md#coinbase-forge-mux) | agent-system | coding, code-review |
| Databricks | [coSTAR and internal engineering agents](docs/landscape.md#databricks-costar) | agent-system | coding, code-review, on-call |
| Domu | [Clementino](docs/landscape.md#domu-clementino) | agent | support, finance-ops, coding, recruitment, customer-success |
| DoorDash | [AI Code Review Agent](docs/landscape.md#doordash-code-review) | agent | code-review |
| DoorDash | [Flux / Agentic AI Platform](docs/landscape.md#doordash-flux) | platform | code-review, coding, ci-triage, on-call, maintenance, data |
| Dropbox | [Nova](docs/landscape.md#dropbox-nova) | platform | coding, ci-triage, on-call, maintenance |
| Flex | [AI Investigation Agent](docs/landscape.md#flex-investigation-agent) | agent | finance-ops, on-call, coding |
| GitHub | [Qubot](docs/landscape.md#github-qubot) | agent | data |
| Harvey | [Spectre](docs/landscape.md#harvey-spectre) | platform | coding, code-review, on-call, security |
| HubSpot | [Sidekick](docs/landscape.md#hubspot-sidekick) | agent | code-review |
| Linear | [Linear Agent](docs/landscape.md#linear-agent) | agent | support, customer-success, coding |
| Microsoft | [AI-powered code review assistant](docs/landscape.md#microsoft-prassistant) | agent | code-review |
| monday.com | [Sphera / Atlas / Morphex](docs/landscape.md#monday-sphera-atlas-morphex) | agent-system | coding, code-review |
| Notion | [Custom Agents](docs/landscape.md#notion-custom-agents) | platform | support, finance-ops, recruitment, security |
| OpenAI | [Agentic software factory](docs/landscape.md#openai-software-factory) | agent-system | coding, code-review, ci-triage, ops |
| OpenAI | [Sevbot](docs/landscape.md#openai-sevbot) | agent | on-call |
| Plaid | [AI Annotator](docs/landscape.md#plaid-ai-annotator) | agent | data |
| Plaid | [Fix My Connection](docs/landscape.md#plaid-fix-my-connection) | agent | ops, maintenance |
| Plaid | [Internal MCP server](docs/landscape.md#plaid-internal-mcp-server) | supporting-pattern | coding |
| PostHog | [StampHog](docs/landscape.md#posthog-stamphog) | agent | code-review |
| Ramp | [Inspect](docs/landscape.md#ramp-inspect) | agent | coding, code-review, on-call |
| Replit | [Manager agent (agent-of-agents)](docs/landscape.md#replit-manager-agent) | orchestration-system | coding, code-review, support, research, data |
| Salesforce | [Slackbot](docs/landscape.md#salesforce-slackbot) | agent | support, customer-success, ops |
| Sentry | [Junior](docs/landscape.md#sentry-junior) | agent | coding, code-review, support, on-call |
| Shopify | [Aquifer / River](docs/landscape.md#shopify-internal-agents) | platform | coding, code-review |
| Sierra | [Pinecone](docs/landscape.md#sierra-pinecone) | agent | coding, code-review, support, research, data |
| Slack | [Multi-agent context system](docs/landscape.md#slack-context-system) | supporting-pattern | research |
| Spotify | [Honk / Xirp](docs/landscape.md#spotify-honk-xirp) | agent-system | coding, migrations, code-review |
| Stripe | [Minions](docs/landscape.md#stripe-minions) | agent | coding, code-review |
| StrongDM | [Software Factory](docs/landscape.md#strongdm-software-factory) | agent-system | coding |
| Uber | [Internal coding agent (unnamed)](docs/landscape.md#uber-coding-agent) | agent | coding |
| Uber | [uReview](docs/landscape.md#uber-ureview) | agent | code-review |
| WorkOS | [Project Horizon](docs/landscape.md#workos-project-horizon) | platform | coding, code-review, security |
| Y Combinator | [Internal agent infrastructure](docs/landscape.md#ycombinator-agent-infra) | platform | coding, ops |
| Zup | [CodeGen](docs/landscape.md#zup-codegen) | agent | coding |

<!-- END OVERVIEW -->

**Reading the levels:** Adapted from [Dan Shapiro's
framework](https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/),
**L2** means continuous steering, **L3** work-product review, **L4** outcome review, and **L5**
exception-only supervision. Levels describe a specific workflow, not company maturity. [Methodology
→](data/schema.md#operating-models-and-derived-levels)

<!-- BEGIN README FINDINGS -->

## What the current map shows

These counts classify 40 catalog entries. A platform and one of its components can both appear, so the entries are not independent deployments, shares of industry practice, or counts of successful runs.

Entry autonomy is classified as 21 drafts-reviewed, 7 human-in-loop, 7 autonomous, 1 assistive, and 4 unknown. Human-in-loop includes approval checkpoints; it does not mean a person continuously steers the whole run.

The catalog contains 51 scoped supervision assessments across those entries, including 3 continuous-steering, 26 work-product-review, 0 outcome-review, 6 exception-only, and 16 unknown assessments. 8 entries have more than one assessed workflow; the counts therefore do not assign one level to each company.

12 entries are platforms or supporting patterns. State duration is undocumented for 24 entries. Review cost, failure rates, and retired systems remain rarely reported.

<!-- END README FINDINGS -->

## What belongs in the map

An entry needs a named organization, an agent or enabling approach built or materially adapted
for that organization's own work, and public evidence describing its implementation or use.

Agents, platforms, and implemented supporting systems have separate approach types. Research
implementations, prototypes, and commercial or open-source systems can qualify. A product name
is optional. Generic adoption claims are insufficient.

See the [inclusion rules](CONTRIBUTING.md#inclusion-rules) for the shared policy.

## Evidence standard

Every authored claim points to one or more structured sources. Each source records its
relationship to the organization. Reported statements stay separate from catalog judgments, and
company metrics remain self-reported unless independently verified.

Accepted sources are [preserved while they are live](docs/source-preservation.md). The publisher
URL remains the citation; verified snapshots provide an audit trail if it is later removed.

`unknown` means undocumented, not absent. Conflicting evidence remains visible. See the
[data schema](data/schema.md) for the complete methodology.

## Contributing

Found a missing approach or better evidence for one already here? Start with the
[record template](templates/agent.yaml) and follow the [contribution guide](CONTRIBUTING.md).

## License

Code and tooling are licensed under [MIT](LICENSE). Content and data are licensed under
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Preserved third-party source
material under [`archive/`](archive/README.md) retains its original ownership and is not
relicensed under those terms.
