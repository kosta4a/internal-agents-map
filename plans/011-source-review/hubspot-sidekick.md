# HubSpot Sidekick (hubspot-sidekick)

## Captures read

- `hubspot-sidekick-source-1` (Automated code review: the 6-month evolution), 136 lines, in full.
- `hubspot-sidekick-source-2` (Cloud coding agents at HubSpot), 107 lines, in full.

## Research flag outcome

The Plan 006 flag: preserved sources attribute multi-model support to the Aviator
framework, not the Judge Agent; check other claims for the same pattern. The
audit found **no misattribution in the current record** — the flagged multi-model
claim no longer exists (removed in an earlier reconciliation). Every remaining
claim was checked against its capture:

- `summary`, `headline_metric`, `key_metrics.0–.2`: correctly attributed to the
  review system and its figures (source 1, lines 14, 18, 116).
- `architecture.harness`: Aviator named as internal Java agent framework;
  Crucible/Claude Code correctly framed as the predecessor (source 1, lines
  22–26, 41; source 2, lines 24–37).
- `architecture.tool_access`: text already attributes tool control to the Aviator
  framework (source 1, lines 47–55), not to the agent. Correct as written.
- `architecture.sandbox` (`unknown`, catalog-judgment): honest; see fields below.

Deliberate exclusions: Aviator's first-class multi-model support (source 1,
line 45) stays unclaimed — a framework capability, not a statement about this
reviewer; source 2's lessons about autonomous issue implementation (deterministic
paths, hooks, UX) concern other Crucible workflows, not the code reviewer.

## Disposition decisions

- Purpose: `reported`, `summary` (source 1, lines 12–14).
- Workflow: `reported`. The record had no primitives; four appended from the
  captures — trigger on PR creation/ready/manual request (source 2, line 57;
  source 1, line 14), Sidekick drafts the review (source 1, line 79), Judge
  Agent evaluates each draft comment (lines 79–83), only passing comments are
  posted (line 85). Scope: pull request opened → draft review → judge-gated
  comments posted to GitHub.
- Human involvement: `unreported`. The flow is automated end to end; captures
  document post-hoc emoji/thread feedback (lines 103–108) and continued human
  review for design and architecture (line 12), but no required checkpoint
  inside the flow. The `operating_models.0` work-product-review judgment stays a
  catalog judgment in research details.
- Implementation: harness, tool access, knowledge, interfaces `reported`.
  `architecture.knowledge` appended from the just-launched repo-specific custom
  instructions (line 129). Model, sandbox, context management, credentials
  `unreported` with boundary notes (isolation descriptions cover the Crucible
  predecessor only; multi-model is a framework capability).
- Validation: `reported`, `primitives.2` — the judge gate is the runtime quality
  check (the evaluator-optimizer workflow, lines 75–87).
- Observations: `reported`. `key_metrics.0` and `key_metrics.1` are confirmed
  aliases of the compound headline (strict components, nothing added); the 80%
  thumbs-up rate is canonical (`effectiveness`, reported measurement).
- Lessons: `reported` via one appended lesson (lines 71–87): unhelpful rather
  than incorrect feedback was the main failure mode; prompt tuning alone could
  not fix it; the judge gate was the most important factor. Attributed team
  assessment — `opinion`/`reported` with a claim-specific reason.

## Counts

15 dispositions: 9 `reported`, 6 `unreported`, 0 `not-applicable`.
Appended claims: `primitives.0`–`.3`, `architecture.knowledge`,
`lessons_learned.0`.

## Challenge pass

Re-checked each new claim against its exact passage. The 90% figure keeps its
existing scope guard (feedback time, not PR completion time). Trigger conditions
come from source 2 (the platform post), which names GitHub as the review
surface; Slack @-mentions exist there for planning/implementation workflows only,
so `architecture.interfaces` stays `[github]`. No contradictions found.
