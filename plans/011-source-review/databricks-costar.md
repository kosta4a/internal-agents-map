# Databricks coSTAR and internal engineering agents

### Captures read

- `databricks-costar-source-1` (coSTAR methodology post, 194 lines) in full.
- `databricks-costar-source-2` (coding benchmark post, 128 lines) in full.

### Research flag resolution

The Plan 006 flag said `key_metrics.0` ("agents as daily coding drivers") was
not in the preserved sources. The flagged wording no longer exists in the
record: the 2026-09-16 Plan 008 reconciliation already removed it. The current
`key_metrics.0` ("coSTAR reduced the time to verify agent changes from two
weeks down to hours") is supported by source-1 line 11 and, with the manual-
evals baseline stated, lines 153–157. No correction applied. The "daily
driver" passage belongs to source-2 lines 41–43 and is about GLM as a model
choice for developers, not about this record's internal agents — it stays
unclaimed.

### Disposition decisions

- Purpose: `reported` from `summary` (source-1 line 16; source-2 lines 10–12).
- Workflow: appended five primitives with evidence. Run order `primitives.0`
  (execute scenario as MLflow trace, lines 62–64), `.1` (agentic judges score
  trace properties, lines 70–74), `.2` (coding assistant refines the agent,
  lines 119–121). `workflow_scope`: one coSTAR scenario run. `.3` (judge
  alignment against the Golden Set, lines 113–117) is a mechanism — it serves
  the coupled judge loop, not a step of the agent-under-test run. `.4` (same
  judges in production, CI/CD, and nightly builds, lines 12 and 135) carries
  the validation role.
- Human involvement: `reported` from `primitives.2`, whose text keeps source-1
  line 121 exact — the engineer is the reviewer and final arbiter of proposed
  agent changes.
- Implementation: `architecture.tool_access` appended (MCP tools for data
  access, code execution, and environment setup, line 133); harness and
  knowledge were already supported. Unreported fields with boundary notes:
  model (benchmark models are evaluation subjects, not the shipped agents),
  sandbox (the benchmark's sealed git history is an evaluation guardrail, not
  a runtime boundary), context_mgmt (traces record execution, not context
  management), credentials, interfaces.
- Validation: `reported` from `primitives.3` and `primitives.4` — judge
  alignment keeps the checks trustworthy and production/CI runs catch
  regressions, including changes in dependent MCP tools.
- Observations: no headline metric exists; `key_metrics.0` is cost-latency /
  reported-measurement on verification time; `key_metrics.1` is
  implementation-scale / qualitative on the benchmark's codebase. Not
  duplicates — different subjects and bases.
- Lessons: `reported` from one appended attributed-preference lesson
  ("give judges tools, not traces", lines 72–74 and 180), metadata
  opinion/reported.

### Deliberate exclusions

- "Hundreds of test scenarios per agent" (line 158) — test-suite growth, kept
  as context rather than an outcome claim.
- Task-complexity shares and model cost-per-task figures (source-2) — they
  characterize the benchmark, not the internal agents.
- Omnigent appears in both captures as a separate product and stays out of
  claims, as the summary already distinguishes it.

### Challenge pass

Checked every appended claim against its exact passage. The verification-time
claim keeps its manual-evals comparison boundary in `metric_scope`. The
engineer-arbiter wording was not generalized beyond agent changes to the
coSTAR loop itself. The judge-alignment primitive was kept out of the workflow
reading order because the captures present it as the mirrored loop that earns
trust in judges, not as a step of a scenario run.
