# Plan 009 source review

Reviewed 2026-09-17 against the six preserved captures. This log records editorial
support and scope; it is not independent verification of publisher claims.

## GitHub Qubot

- Read `github-qubot-source-1` in full. Purpose: `summary` (lines 12–16).
- Workflow: `primitives.0` (line 30), `.1` (36–48, 64), `.2` (64), and `.3`
  (30). The named scope is a Slack question through the warehouse answer and PR report.
- Validation: `.4` (52–60), an offline gate for context/configuration changes.
- Implementation additions use lines 30–32, 36–48, and 64. The source does not state
  credential handling, an isolation boundary, or a required runtime human checkpoint.
- Observations retain the scoped adoption and qualitative channel-volume language at
  line 70. The earlier corrected summary was preserved; no seconds-to-answer promise
  was added. Challenge pass: wording was narrowed from general speed to the documented
  evaluation dimensions and query-engine roles.

## Notion Custom Agents

- Read both `notion-custom-agents-source-1` (the full transcript) and
  `notion-custom-agents-source-2` in full.
- Representative workflow: transcript line 609, the internal Slack bug-triage agent.
  It is explicitly one internal use, not the behavior of every Custom Agent.
- Permissions and checks: engineering article lines 22–47. The default-deny model,
  granular grants, owner confirmation, and message deletion are distinct mechanisms.
- Failure: article lines 51–55 documents overly broad Slack access and posts to
  `#general`; it motivated the read-and-reply permission. This history is not framed as
  current default behavior.
- Harness/context descriptions use transcript lines 405 and 707–717. Model and sandbox
  details for the representative workflow remain unreported. `key_metrics.0` is a
  confirmed duplicate of the headline: same internal-agent count, alpha endpoint,
  scope, and qualification. Challenge pass: security-team uses remained observations,
  not a fabricated runtime walkthrough.

## Microsoft AI-powered code review assistant

- Read `microsoft-prassistant-source-1` in full.
- Workflow: lines 16–29 support automatic start, review/comments, summary, suggested
  change, explicit author application, and PR-thread Q&A (`primitives.0`–`.4`).
- Repository guidance is supported at line 41. The source says existing PR workflow but
  does not establish GitHub as the internal hosting interface, so interfaces remain
  unreported.
- Observations: line 10 supports company-wide adoption/output. Line 35 supports the
  early 5,000-repository cohort and its reported 10–20% median completion-time
  improvement. The metric retains the unspecified comparison-design limitation and is
  separate from adoption counts. Challenge pass: author application is the human
  checkpoint; it was not generalized to every comment or review action.

## DoorDash AI Code Review Agent

- Read `doordash-code-review-source-1` in full and kept the current v3 workflow distinct
  from v1/v2 history.
- Workflow: automatic trigger (23), scout (42–44), deep reviewers (42–46), and optional
  fixer/handoff (131–144). The existing grounded-findings primitive remains a mechanism.
- Validation/failure handling: disprove-it pass (58–68), evaluation loop (170–180),
  timeouts and reporting guardrails (162–168). The page uses the former two as the
  concise validation claims.
- Implementation: remote full-repository access (125), routed review profiles (78–115),
  and model-agnostic design (127). The legacy `Not specified` model claim is retained in
  research details and marked unreported publicly.
- Observations: weekly scale (23), action rate and denominator (27), average cost (29,
  129), and average posting latency (30). `key_metrics.0` is a confirmed duplicate of
  the headline with the same period, repository population, and qualification.
  Challenge pass preserved the precision/recall limit and did not interpret acceptance
  as recall.

## Y Combinator internal agent infrastructure

- Read `ycombinator-agent-infra-source-1` in full. Speaker attribution was checked: Pete
  Koomen supplies the implementation details; host analogies were not converted into
  implementation facts.
- Representative workflow: finance-team natural-language questions and origin
  (120–124), read-only SQL/model access (124), and employee-visible conversations
  (190–192). It is a named example on shared infrastructure, not a platform-wide promise.
- Implementation: common database/context, agent loop, model router, and 350+ shared
  tools (154); skills (158). Nightly transcript review at 162–166 is a maintenance and
  validation workflow, not a measured outcome.
- No outcome metric is reported for the named finance workflow. Sandbox, credentials,
  and a required runtime approval checkpoint remain unreported. The legacy `unknown`
  sandbox claim remains in research details. Challenge pass kept the two scoped lessons
  as reported practices and excluded broad host predictions and universal advice.

## Final challenge pass

Every new or rewritten claim above was checked against its named preserved passage.
All six captures were readable and byte-identical to the baseline. No material
classification contradiction emerged. The unsupported details listed in each section
are represented as reviewed dispositions rather than inferred facts.
