# Airbnb Airchat (airchat-cli)

## Captures read

- `airbnb-airchat-source-1` in full (26 lines; speaker bios only — no talk content,
  so it supports nothing on its own and keeps its contextual role).
- `airbnb-airchat-source-2` in full (254 lines; DX Annual session with Christopher
  Sanson and Madison Capps, including the full transcript).
- `airbnb-airchat-source-3` in full (305 lines; The AI Thinker essay that quotes the
  October 2025 Szczepan Faber / Mike Nakhimovich talk).

## Flag resolution: `architecture.model`

Resolved as **supported**; no correction needed. The claim reads "Vendor coding
agents (Claude Code and Codex are named in use), wrapped by Airbnb".

- Source-2 line 114: "97% of active engineers... It's Claude Code, it's Codex,
  they're using Agentic AI."
- Source-2 line 214: "we introduced something that we called AirChat CLI. This is a
  light abstraction wrapper around coding agents and passes all of the APIs through
  a single unified gateway."
- Source-3 line 174 corroborates: "Even Airbnb wraps their own `airchat-cli`, not
  raw OpenAI or Anthropic."

Backfill applied without changing claim text: `architecture.model` evidence gained
the exact locator (source-2 lines 114, 214), and `architecture.tool_access` gained
a second evidence entry (source-3 line 166), where the "over a dozen internal MCP
servers" figure actually lives; the prior source-2 link covers only default MCP
loading (line 118).

## Disposition decisions

- Purpose: `reported` on `summary`. The orchestrator-that-never-shipped history is
  source-3 lines 202–210; the wrapper framing is source-2 line 214.
- Workflow: `reported` on appended `primitives.0`–`.2` — spec starts the session
  (source-3 lines 82, 104; source-2 line 118), the loop materializes the change
  (source-3 line 82), a human reviews every line before merge (source-3 lines
  178–182). Scope names one representative run on the platform, per the platform
  pattern from the pilot.
- Human involvement: `reported` on `operating_models.0` plus `primitives.2`. The
  permanent-navigator framing and the line-review quote locate attention at work-product
  review; no finer checkpoint is documented.
- Implementation: `reported` across harness, model, tool access, context management,
  credentials (source-2 line 118), sandbox (source-2 line 232 — AirDev workspaces are
  network-isolated from production and user data), and interfaces.
- Interfaces: the legacy empty list became `[cli, web]` — the CLI is the stated core
  abstraction (source-2 line 214) and the Remote web UI is live as an internal EAP
  (source-2 lines 188–192). The JetBrains/Xcode IDE-plugin origin (source-2 line 120)
  is history, not a current surface, and the disposition note says so.
- Validation: `reported`, cross-referencing `primitives.2`. The documented check for
  coding runs is the human diff review; the note states that no separate automated
  gate is described. The migration framework's validate-transform-validate loop
  (source-2 line 216) belongs to the migration use, not the representative coding run.
- Observations: headline 64% share of PRs materialized through agentic coding
  (source-3 lines 16, 24, 194), `adoption-output` / `reported-measurement`, October
  2025. `key_metrics.0` is a confirmed duplicate — identical text, scope, period,
  denominator, and confidence; it adds nothing the canonical lacks.
- Lessons: `reported` on appended `lessons_learned.0` (opinion/reported): the team's
  pivot from an unshipped from-scratch orchestrator to a thin shim (source-3 lines
  202–210, including "Can't beat them, join them"). Scoped as their choice, not
  measured advice.

## Deliberate exclusions

- Source-2 productivity figures (97% weekly / 90% daily usage, 65% PR throughput,
  59% AI-authored code, six hours saved weekly, 3× EAP throughput): these describe
  Airbnb's agentic-AI adoption overall, not the AirChat platform record's scope, and
  several ride on DX-hosted measurements the capture summarizes rather than documents.
  None claimed.
- Source-2 line 146 Slack-originated workflows appear as desired interfaces, not
  shipped ones; Slack is not added to `interfaces`.
- The four-level fluency ladder and champion-network practices (source-3) are
  program description, not this record's architecture or workflow.

## Flags

- None new. The Plan 006 flag on `architecture.model` is closed as supported with
  locators; the earlier hedged summary stands.
