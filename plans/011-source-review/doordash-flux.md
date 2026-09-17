# Doordash Flux / Agentic AI Platform

## Captures read

- `doordash-flux-source-1` (X announcement, 13 lines) in full.
- `doordash-flux-source-2` ("Beyond single agents", analytics platform, 119 lines) in full.
- `doordash-flux-source-3` ("Delegating Engineering Work", Flux platform, 96 lines) in full.

## Scope judgment

The record deliberately spans two platforms its own summary says no preserved
source connects: the analytics/agentic-AI platform with the AI Marketplace
(source-2) and Flux, the cloud engineering-agent platform (sources 1 and 3).
Every disposition names which platform its content describes; the sibling
`doordash-code-review` record owns the reviewer-agent run.

## Disposition decisions

- Purpose: `summary` (both platforms named, sources 1–3).
- Workflow: `primitives.5`, appended for the one documented representative run —
  the DataExplorer grounded-SQL loop (source-2 lines 42, 78–80): table
  identification through DescribeTable with cached column examples, starter SQL
  grounded in schema, EXPLAIN validation with autocorrection before execution.
  Scope names the analytics platform. Flux's own delegation cycle (playbook
  defines work, sandbox executes, gateway governs, surfaces invoke — source-3
  line 42) is architecture, not a documented single run; forcing it into
  workflow steps would manufacture transitions the post does not give.
- Human involvement: `unreported`. Source-3 line 10 states runs execute
  unattended in parallel around the clock; public-thread output review
  (source-3 line 86) is an observed adoption practice, and no required
  checkpoint is stated for either platform. The catalog-judgment
  `operating_models.0` stays in research details.
- Implementation: all eight fields dispositioned. Model `unreported` — no model
  or provider is named; the modular-primitives placeholder claim stays in
  research details. Harness, context_mgmt (analytics platform: maturity model,
  hybrid retrieval, schema-aware SQL), sandbox, credentials (Flux: Firecracker
  microVMs, gateway-brokered scoped permissions), tool_access (both platforms:
  Agent Gateway, LangGraph, prospective A2A), knowledge, and interfaces are
  `reported`, each note naming its platform.
- Validation: `primitives.5` plus `lessons_learned.4` — linting, EXPLAIN checks,
  statistical-metadata checks with autocorrection, and the separate
  LLM-as-judge and DeepEval framework (source-2 lines 80–82). Flux playbooks
  package validation per playbook (source-3 line 66).
- Observations: headline plus three key metrics. `key_metrics.0` is a confirmed
  alias of the headline — identical statement, scope, period, and locators
  (source-1 lines 10–12; source-3 line 10). Weekly code reviews and
  playbook/invocation counts stay canonical with distinct subjects and periods.
- Lessons: all six `reported`, verified at their cited locators (source-3 lines
  85–87; source-2 lines 58–66, 80–82, 94).

## Deliberate exclusions

- The deterministic finance/strategy reporting workflow (source-2 line 30) is a
  second documented run, left unclaimed to keep one representative workflow.
- The analytics conversational web UI (source-2 line 88) — interfaces claims
  stay with the six documented invocation surfaces.
- Flux Responder (source-3 line 91), future-work material.
- The sandbox provisioning-time figure lives inside the sandbox claim, not as a
  separate observation.

## Flags

None. All pre-existing claims verified at their locators. Note: the maturity
model and retrieval architecture claims describe the analytics platform while
the headline metrics describe Flux; the record's dual-platform summary keeps
that attribution honest, and the field notes name the platform per row.

## Challenge pass

- Rejected reporting human involvement from the public-threads review practice:
  an adoption behavior is not a stated checkpoint.
- Rejected appending the Flux delegation cycle as workflow steps: the post
  describes architecture, not a run sequence.
- Confirmed the alias: the headline and `key_metrics.0` carry the same count,
  period caveat (calendar month unspecified), and locators; nothing is added.
