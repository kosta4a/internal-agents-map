# Stripe Minions source review

Plan 011 record review, 2026-09-17. All seven captures were read in full:
Part 1 (`stripe-minions-source-1`, 84 lines), Part 2 (`stripe-minions-source-2`,
108 lines), and the five Hacker News items (`-source-3` through `-source-7`).
This log records editorial support and scope, not independent verification.

### Claim audit

Every pre-existing claim was checked against its capture passage and verified
supported, including the YAML anchors that tie the five commentary sources to
both PR-count claims. `architecture.model` remains the legacy `Not specified`
placeholder; no model is named in either part. The pre-existing
`primitives.0` (one-shot characterization with bounded CI repair) was reclassified
as a mechanism rather than a run step.

### Appended claims

- `architecture.context_mgmt` — subdirectory-scoped rule files attached during
  traversal (s2:68), deterministic pre-run MCP hydration (s1:64), and blueprint
  node-level context control (s2:60). Metadata: fact/reported/medium with the
  two-part reasoning.
- `primitives.1` start from Slack/CLI/web/internal app (s1:36, 42);
  `primitives.2` pre-run context hydration (s1:64, s2:68); `primitives.3`
  implement in a prewarmed devbox under the blueprint (s2:30, 52–56, 94);
  `primitives.4` bounded CI repair loop (s1:72–74, s2:96); `primitives.5`
  prepare the PR for human review with an instruction path (s1:50).

### Dispositions

Questions — all seven reported. Workflow scope: "Slack or internal-app request
to a minion-produced pull request ready for human review", steps `.1 → .2 → .3
→ .5` in reading order. `primitives.4` carries the validation role: the
deterministic lint node plus at most two CI rounds with autofixes, after which
the branch returns to its human operator (s1:68–74, s2:94–98). Human
involvement is the engineer's PR review and the further-instruction cycle
(`operating_models.0`, `primitives.5`; s1:50).

Fields — seven reported; only `model` unreported (no model named; the legacy
placeholder claim stays in research details). The `interfaces` note states the
boundary: Slack, CLI, web, and internal tools are named; the pull-request host
is implied by the branch-and-PR flow but never named.

### Observations

`headline_metric` (1,300+ per week, Part 2) and `key_metrics.0` (1,000+ per
week, Part 1) are NOT duplicates: different values and report periods, both
canonical (adoption-output, reported-measurement, subjects naming their part).
This follows the openai-software-factory precedent.

### Deliberate exclusions

- Community skepticism about review quality and the PR-count metric
  (`-source-3` lines 44–66, 190–214; `-source-4`, `-source-7` in full) stays as
  contextualizing evidence on the existing claims; no new claims were drawn
  from commentary.
- Devbox warming details (Bazel caches, code generation services, s2:30) stay
  inside the existing sandbox and lesson claims.
- "Hundreds of different agents" fleet size (s2:80) and Toolshed's
  "nearly 500 tools" (s2:82) are platform facts beyond this record's scope;
  the existing tool_access claim already carries the curated-subset practice.

### Flags

None. All YAML anchors preserved; new evidence keys appended at the end of the
evidence map. Key-scan clean; workflow claim paths equal the workflow-role set.
