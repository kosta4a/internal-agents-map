# Coinbase Forge / Mux

## Captures read

All five captures read in full: the Mux engineering blog (source 1), the Linear
case study (source 2), the Turakhia milestone tweet (source 3), the Lenny's
Newsletter episode page (source 4), and the ChatPRD episode writeup (source 5).

## Claim audit

Every pre-existing claim verified at its cited locator, including the portfolio
harness statement (s1:24), the worktree separation with its not-a-sandbox
boundary (s1:26), the Forge Slack-to-PR workflow (s2:34), the multi-model
statement (s5:114), and the security-driven in-house build (s5:120). No
corrections applied.

## Appended claims

- `primitives.2` — orchestrate concurrent agents: an engineer runs several
  agents in parallel, each on its own worktree, and reviews, gives feedback,
  and merges as each finishes (s1:20). Role: workflow. The pre-existing Mux
  worktree primitive stays a mechanism (the substrate, not a run).
- `key_metrics.4` — 5,068 merged PRs across 461 repositories and 10 orgs
  (s1:31), metric/reported with a no-measurement-window reason.
- `key_metrics.5` — 3.5x more merged PRs per engineer for Mux users (39.6 vs
  11.4, s1:32–34); the confidence reason carries the post's own skew caveat
  and the denominator names the non-user baseline.
- `architecture.context_mgmt` — Slack discussions become labelled, sized
  Linear issues carrying the work context (s2:34); the feedback pipeline
  summarizes recordings into a reviewable issue before an agent acts
  (s5:102–110).

## Disposition decisions

- Workflow reported with two named runs: the Forge fix flow (`primitives.0`)
  and the parallel-agent orchestration loop (`primitives.2`); scope states
  both. `primitives.1` (worktrees) is the mechanism.
- Human involvement reported from `operating_models.0` plus `primitives.2`:
  the documented checkpoint is pull-request review — Forge pushes the PR back
  to Slack, the orchestrating engineer reviews and merges each result.
- Validation unreported: no automated check of agent output is documented;
  the review checkpoint is cited under human involvement, not double-counted.
- Credentials unreported: the security requirements that blocked cloud
  background agents are described (s5:120) without their mechanism.
- Interfaces: Slack, GitHub, and Linear are named invocation surfaces for
  Forge (s2:34), so `github` is supported here, unlike records where GitHub
  is only acted upon.

## Duplicate confirmation

`key_metrics.1` is an alias of the headline: identical statement, period,
scope, and denominator — the same 5% share from the same tweet (s3:11). All
other observations stay canonical: user counts (s1:30), wallet-rewrite review
time (s4:16), the speed-run event (s4:23, s5:170), and the two appended Mux
figures are distinct subjects, values, or periods.

## Deliberate exclusions

- The first speed run (120 engineers, 80 PRs, hosted from an Uber) and the
  later 500-PR session (s2:38) are different events from the claimed 100/70
  run; only the run documented in two independent captures is claimed.
- Autonomous-operation time is tracked and "keeps climbing" but no number is
  given (s2:40); not a metric.
- The January 2026 delete-your-IDE experiment (s2:26) is an org adoption
  event, not a property of Forge or Mux.
- "Taken GitHub down four or five times" (s2:38) is color, not a claim.
- Cursor-adoption cohorting and the wine-sommelier demo (s5) are personal or
  analysis workflows, not this record's systems.

## Flags

None material. The wallet-rewrite 150h→15h figure remains low-confidence with
its no-method qualification; the sources contradict nothing in the record.
