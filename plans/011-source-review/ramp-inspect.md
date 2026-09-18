# Ramp Inspect

## Captures read

All five, in full: `ramp-inspect-source-1` (141 lines, first-party engineering
post), `ramp-inspect-source-2` (Linear case study, 43 lines),
`ramp-inspect-source-3` (HN thread, 31 lines — a third-party project inspired
by Inspect; discovery role, supports no Ramp claim),
`ramp-inspect-source-4` (verified byte-identical to source-1 except the RSS
feed URL; the record already marks it `duplicate_of` source-1), and
`ramp-inspect-source-5` (Pragmatic Engineer deep-dive, 153 lines).

## Flag resolution

None pending for this record. Every existing claim audited against the
captures; all supported at their cited locators.

## Disposition decisions

- Questions: all seven `reported`. Implementation: all eight fields `reported`
  — the third fully-reported record after cloudflare-ai-stack and
  sentry-junior, and the first where even `sandbox` and `credentials` carry
  complete capture-supported claims (source-1 lines 30–44, 94–96).
- Workflow: appended `primitives.3` (Slack `@inspect fix this` run: reads
  thread context, works in its sandbox, raises a PR — source-5 line 109,
  source-2 line 22). Scope: "Slack bug report to raised pull request". The
  three pre-existing primitives stay mechanisms.
- Validation: appended `primitives.4` — Inspect verifies its own changes
  (tests, telemetry, feature flags; visual verification with screenshots and
  live previews — source-1 lines 10–12, source-5 lines 51–54).
- Context management: appended `architecture.context_mgmt` from source-1
  lines 20 and 44 (snapshot restore for follow-ups; client changes sync to
  the session).
- Human involvement: `operating_models.0` (user-token PRs, no self-approval,
  human merges); multiplayer collaboration noted in the disposition note.
- Observations: 12 observation claims; `key_metrics.1` is a confirmed alias of
  the headline (same 75% merged-PR share, same May 2026 period, same
  denominator — adds nothing). The remaining ten stay canonical with distinct
  populations or periods: 60% January history (km0), ~30% earlier first-party
  report (km2, different period), 90% Inspect-repo share (km3, different
  population), million sessions (km4), spin-up latency (km5), platform-agent
  examples (km6, fact), contributor count (km7), team size (km8), self-build
  share (km9), and the design-goal speed target (km10, basis `target`; its
  opinion kind stays in claim metadata).

## Flags and deliberate exclusions

1. Source-5 line 112 ("more than 200 agents running on top of Inspect") is
   left unclaimed; `key_metrics.6` lists the named examples, and the 200+
   count is a different, broader figure a future claim could carry.
2. Source-2 line 40 ("bottleneck moved from writing code to reviewing it")
   is contextual support for retained human review; not separately claimed.
3. The 30% → 60% → 75% adoption series are distinct periods, not conflicts;
   each keeps its own claim and `valid_at`.

## Challenge pass

Each appended claim was checked against its exact passage: the Slack-run
primitive reflects only the documented `@inspect fix this` flow (no invented
transitions); the validation primitive carries only the four named
verification behaviors; `context_mgmt` claims only what lines 20 and 44 state
(no invented retrieval or summarization mechanism). No metric was promoted
from design goal to result: km10 keeps basis `target` and its opinion
metadata.
