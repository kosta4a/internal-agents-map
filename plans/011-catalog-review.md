# Plan 011 catalog review

Completed 2026-09-17 on branch `plan-011-page-content-catalog`. Every record in
the catalog now carries a complete `page-content-v1` review. Per-record sections
live in `plans/011-source-review/`; the machine-readable view is
`plans/011-content-coverage.json`.

## Result

- 40 of 40 records reviewed; zero `legacy-unassessed` remain.
- 600 dispositions: 464 `reported`, 135 `unreported`, 1 `not-applicable`
  (the Plaid internal MCP server runs no model), and no `not-reviewed`.
- Every preserved capture of the 30 migrated records was read in full
  (~11,400 lines across 62 capture files); more than 120 supported claims were
  appended, each with locators and claim-specific metadata.
- 25 duplicate representations confirmed under the schema criterion; every one
  is a strict restatement or component of a compound canonical observation.
- Five records are fully reported (cloudflare-ai-stack, sentry-junior,
  sierra-pinecone, ramp-inspect, monday-sphera-atlas-morphex). The thinnest
  sources produced the most honest states, not invented content: zup-codegen
  (5 reported) and uber-coding-agent (6) stay mostly `unreported`.

## Research flags

All four Plan 006 flags are closed. airbnb-airchat's wrapper claim was verified
supported with locators backfilled; databricks-costar and hubspot-sidekick were
already corrected by the Plan 008 reconciliation; microsoft-prassistant was
resolved in the Plan 009 pilot.

## Corrections and contract boundaries

- atlassian-rovo-dev: the capture-supported Bitbucket surface is recorded in
  the interfaces disposition note rather than the claim list, because the
  interface vocabulary does not include `bitbucket` and Plan 011 does not
  change the contract. A future vocabulary revision can promote it.
- uber-coding-agent: the alias's "at the time" wording was judged to add
  nothing beyond the headline's point-in-time framing; kept as a confirmed
  duplicate with the reasoning recorded.

## Follow-up gaps recorded by the reviews

Claims kept unchanged where no preserved capture supports them, listed for a
future capture or correction pass:

- linear-agent: the Loops definition cites an unpreserved post; one knowledge
  clause could not be located.
- shopify-internal-agents: sandbox attribution to Anthropic appears only as an
  unnamed linked essay; "Shopify SSO" is not in the capture.
- brex-agent-platform: `credentials` names ConductorOne, which the capture
  calls only a "provisioning tool".
- dropbox-nova: `credentials` claims engineer-equivalent auth/authz with no
  supporting passage.
- sentry-junior and workos-project-horizon: `github` listed under interfaces
  where the captures describe a system acted upon, not a surface.
- strongdm-software-factory: `architecture.knowledge` repeats the products
  page's garbled "Turn DAG" text verbatim.

## Test and tooling state

- Adoption counts now derive from the catalog (`catalog.approaches.length`,
  `CATALOG.approaches`); no test pins a record count.
- The pilot reading-model loop covers all 40 records and branches on the
  workflow disposition; the legacy-path test asserts no record remains legacy.
- Legacy layout tests were replaced with reviewed-layout equivalents on
  ramp-inspect; the Plaid supporting-system tests flipped to the
  reports-a-workflow form in Plan 010.

## Commands and results

Recorded in the execution record of `011-page-content-catalog-completion.md`;
the final `npm run verify` result is stated there.
