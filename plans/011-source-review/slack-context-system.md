# Slack Multi-agent context system

## Captures read

- `slack-context-system-source-1` (Slack engineering post, 302 lines) in full.
- `slack-context-system-source-2` (InfoQ news, 39 lines) in full; it is secondary
  coverage that quotes source-1 and adds only the coordinator/dispatcher framing
  already captured in `architecture.harness`.

## Disposition decisions

- Purpose: `reported` from `summary` (source-1 lines 22, 36–42; source-2 line 22).
- Workflow: `reported`. The article describes the investigation process directly
  (line 24: phases and rounds, no preset limit, Director concludes) and the
  Director's role (line 54). Appended `primitives.3` (pose the round's questions,
  lines 24, 54), `primitives.4` (experts gather evidence and cite artifacts,
  line 119), and `primitives.5` (Director concludes, lines 24, 115 — the specimen
  journal's "advance to conclude" and root-cause summary). The three pre-existing
  primitives are context channels, not runs: Journal and Timeline are mechanisms;
  the Critic Review is the system's documented check on Expert work and carries
  the `validation` role. `workflow_scope`: Director-led investigation rounds from
  a security alert to a concluded report.
- Human involvement: `unreported`. Both captures describe agent coordination
  only. Source-1 line 146 (staff can identify which conclusions need scrutiny)
  names an audit use of the scores, not a checkpoint inside a run; the attention
  boundary stays unknown in research details.
- Implementation: `reported` for harness (source-2 line 26), tool_access
  (source-1 lines 119–138, the four evidence-inspection tools), and
  context_mgmt (source-1 lines 36–42). `model` is `unreported`, not
  `not-applicable`: unlike the Plaid MCP server, this system runs model agents,
  but no model is named — the only model statement is that a stronger model runs
  the Critic (source-1 line 174), carried in the disposition note. `sandbox`,
  `credentials`, `knowledge`, and `interfaces` are `unreported` with boundary
  notes; no human-facing surface is named.
- Validation: `reported` from `primitives.1`. The Critic scores every finding
  against cited evidence (lines 119–160) and the Timeline prunes findings that
  break narrative coherence (line 236); the note names both.
- Observations: the headline and `key_metrics.0` state the same workload
  (hundreds of requests, megabytes of output) at the same locators (34–38; 22)
  with the same qualitative scope — `key_metrics.0` is a confirmed alias. Appended
  `key_metrics.1`: over 170,000 reviewed findings scored, slightly over a quarter
  below the plausible threshold (lines 162–170) — the only measured figure in
  either capture, kept as its own canonical observation (category effectiveness,
  basis reported-measurement).
- Lessons: `reported`; all three existing lessons verify at their cited locators.

## Deliberate exclusions

- The specimen investigation (kernel-module false positive) is illustrative
  content, not system behavior.
- The six Journal entry types, the five-level rubric tables, and the top-three
  gap limit are format detail already summarized by the channel claims.
- The stronger-model mitigation (line 174) stays a disposition note because no
  model is named; it does not become an architecture claim.

## Challenge pass

Checked that the Critic Review is not misread as a human checkpoint (it is model
inference; source-1 line 172 says so), that "Not specified" for the model stays
honest, and that the alias confirmation compares subject, figures, period, and
locators rather than surface similarity.
