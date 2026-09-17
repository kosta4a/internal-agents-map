# Plan 010 source review

Reviewed 2026-09-17 against the fourteen preserved captures of the five batch
records. This log records editorial support and scope; it is not independent
verification of publisher claims. Each section comes from a full read of every
capture; corrections applied during central verification are recorded in place.

## Plaid Internal MCP server


- Read `plaid-internal-mcp-server-source-1` in full (97 lines). Purpose:
  `summary` (14–16, 38–45, 65–67). Every pre-existing claim was checked and
  stands supported: the 80% AI-client share (38), tool/service counts and
  agent/call volumes (89), and the identity-aware proxy and centralized
  authorization (57–59).
- This is the supporting-system variant the pilot deferred. Workflow appended
  as `primitives.0`–`.4`: connect an AI client (38–40, 67), authenticate the
  engineer through the local proxy (59), authorize the request (57, 59),
  enforce the LLM data access policy at call time (61–63, 82, 87), and return
  internal context (14–16). The record previously had no primitives.
- Human involvement is reported as identity, not checkpoint: tool calls run
  under the engineer's authenticated employee identity (`primitives.1`,
  `primitives.2`). The capture documents no separate output-review checkpoint,
  and the catalog's `attention_boundary: unknown` stands unchanged.
- Validation: `primitives.3` — tool-level policy enforcement at call time plus
  caller identity inspection and audit logging in the centralized design (82).
- Implementation: harness, tool access, and credentials reported. `model` is
  `not-applicable`: the server connects AI clients to internal data and runs
  no model itself; the capture describes no model component (14, 67). Sandbox,
  knowledge, context management, and interfaces are `unreported`; the capture
  describes access control rather than an isolation boundary, integrates
  documentation as tools rather than a separate knowledge store, and names AI
  clients rather than a human-facing surface of the server.
- Observations: `key_metrics.0` was first marked a duplicate of the headline
  (same over-80% client-adoption share, scope, and period), then reverted to a
  canonical observation during review verification: unlike a plain restatement,
  it adds the boundary note that MCP-server adoption share is not reported — a
  qualification the compound headline lacks, so the duplicate confirmation rule
  (equal statement and qualifications) does not hold. `key_metrics.1` stays
  canonical: it adds tool-call volume to the agent count, so it is not a
  duplicate of the headline's agent half alone.
  All figures remain self-reported estimates without a stated method.
- Lessons: `unreported`. The capture gives design rationale (for example the
  replicable access-control framing at line 83) but states no evaluated
  transferable lesson; no lesson claim was added.
- Flags: none material. The empty `architecture.interfaces` list stands; the
  capture's client names are recorded in the disposition note rather than as a
  new architecture claim, because MCP clients are not a human-facing surface
  of the server in this catalog's interface taxonomy.

### Disposition counts

Questions: 6 reported, 1 unreported. Implementation fields: 3 reported,
4 unreported, 1 not-applicable. No `not-reviewed` state remains.

## Spotify Honk / Xirp

editorial support and scope; it is not independent verification of publisher
claims.

### Captures read

- `spotify-honk-xirp-source-1` (Honk Part 1, 103 lines) — in full.
- `spotify-honk-xirp-source-2` (Code with Claude, 116 lines) — in full.
- `spotify-honk-xirp-source-3` (Xirp product page, 60 lines) — in full.

### Disposition decisions

- Purpose: `summary` (source 1 line 20 and 99; source 2 lines 44–56; source 3
  lines 12 and 30). The Honk/Xirp relationship stays undocumented, as the
  summary already states.
- Workflow: appended `primitives.3`–`primitives.5` at the end of the list.
  Natural-language prompt replaces the deterministic script and the interactive
  Slack/GitHub agent shapes ad-hoc requests (source 1 lines 58 and 87); Honk
  performs the modification while Fleet Management targets and schedules
  (source 1 lines 52–58; source 2 lines 56–62); Fleet Management opens the PR
  and reviews/merging keep the pre-agent workflow (source 1 lines 26 and 58).
  Scope label: natural-language change request → Honk pull request through
  Fleet Management. The new primitives carry no `claim_metadata`; the default
  fact/reported classification is correct for each.
- Human involvement: unreported. Source 1 line 58 keeps reviews and merges on
  the existing workflow but never states who reviews or that a human must.
  Source 2 line 36 (vast majority auto-merged, no human in the loop) describes
  deterministic Fleetshift PRs, not Honk PRs. The catalog-judgment
  `operating_models.0` (work-product-review) remains in research details.
- Implementation: model (source 1 line 64; source 2 line 56), harness (same),
  tool access (source 1 line 64; source 2 line 56), knowledge (source 2 lines
  88–94), context management (source 1 lines 24–26 and 58; source 3 line 30),
  and interfaces (source 1 lines 64 and 87) are reported. Sandbox is
  unreported: Kubernetes pods and containerized jobs are an execution
  environment, not a documented isolation boundary (Qubot precedent), and
  source 1 line 101 names sandboxing as an open challenge. Credentials are
  unreported; no capture discusses them.
- Validation: `primitives.0` — build/test tools, formatting and linting through
  local MCP, and LLM-judge diff evaluation (source 1 line 64), plus CI builds
  across operating systems (source 2 line 56).
- Observations: headline and `key_metrics.0` report the same cumulative
  1,500+ merged Honk PR count (source 1 lines 70 and 99) — confirmed duplicate
  (same count, population, period, scope); `key_metrics.0` is the alias.
  `key_metrics.1` (60–90% migration time saving, source 1 line 77) is an
  effectiveness observation with a manual-completion denominator.
  `key_metrics.2` (about half of PRs automated since mid-2024, source 1 line
  38) is an adoption estimate whose subject is Fleet Management including
  deterministic transforms — a different population from Honk PRs; it is not
  marked duplicate for that reason.
- Lessons: all four retained lessons verified against their cited passages
  (source 1 line 64; source 2 line 56; source 2 lines 94–96; source 3 lines
  12 and 30).

### Flags and deliberate exclusions

- Source 2 line 24 (99% weekly AI-tool use, 94% productivity, 76% PR-frequency
  increase) describes AI coding tools at Spotify generally, not Honk; it is
  correctly absent from this record's claims.
- Source 2 line 36 (2.5 million auto-merged maintenance PRs) counts the
  deterministic Fleetshift system's full history, not agent-generated work;
  not appended to avoid blurring the agent-system boundary.
- Honk v2 multiplayer (shared sessions, projects, Chirp orchestration, source 2
  line 76) is covered by the existing harness claim; no separate primitive was
  added because no v2 workflow narrative exists in the captures.
- Xirp (source 3) stays a mechanism-layer primitive; its product page claims
  (automatic living documentation, model switching) are marketing copy for a
  beta and introduce no workflow for this record.

### Challenge pass

Every appended claim was checked against its named passage. All three captures
were readable. No existing claim was found unsupported, and no material
classification contradiction emerged. The unsupported details above are
represented as unreported dispositions rather than inferred facts.

## Block Builderbot

independent verification of publisher claims.

### Captures read

All five in full: `block-builderbot-source-1` (launch post, 32 lines),
`block-builderbot-source-2` (protector engineering post, 70 lines),
`block-builderbot-source-3` (public repository README, 96 lines),
`block-builderbot-source-4` (HN thread, 18 lines), and
`block-builderbot-source-5` (HN comment, 12 lines).

### Disposition decisions

- Purpose: `summary`, supported by the launch post lines 12–18 and
  contextualized by the engineering post and repository.
- Workflow: new `primitives.2` (Slack thread start, line 16) then existing
  `primitives.1` (Linear/Jira ticket → branch → code → PR → CI watch, line 18)
  in that reading order. Scope label: Slack-requested ticket to reviewed pull
  request. `primitives.0` (orchestration layer) stays a mechanism, not a run
  step.
- Human involvement: reported through `lessons_learned.1` and
  `lessons_learned.2` (Slack-thread start, colleagues steering during
  execution, line 16). The engineering post adds humans granting the final
  stamp of approval on pull requests (lines 46, 50); that passage has no
  authored claim, so it is stated in the disposition note only.
- Validation: new `primitives.3` (CI watch and feedback iteration, line 18).
  The pre-push `just fmt`/`just test` CLI contract (source 2, lines 26–28)
  covers local agents generally and is not tied to Builderbot's runs, so it
  stays out of the claim set; noted on the disposition.
- Implementation: harness (goose + MCP in Slack, lines 16, 30), tool_access
  (lines 18, 30), knowledge (lines 12, 18; source 2 line 20), interfaces, and
  a new `architecture.context_mgmt` claim from source 2 lines 32–40 (nested
  AGENTS.md, module `.agents/checks/*.md` prompts, internal Agent Skills
  marketplace). New `primitives.4` records the `sq agents review` protector
  gate (source 2, lines 46–58) as a mechanism beside the run.
- Unreported fields: model (goose is the orchestration framework; no capture
  names an underlying model — the README names apps and crates only), sandbox
  (no capture documents an isolation boundary; legacy `unknown` claim stays in
  research details), credentials (not documented; the source-code-only
  boundary at line 20 is a data restriction, not a credential mechanism).
- Observations: headline (≈1,500 merged PRs/week, ≈15% of production changes,
  line 24), `key_metrics.0` (200,000+ operations/day, line 24; operation is
  undefined), and `key_metrics.2` (months-to-days turnaround, lines 24–26,
  qualitative opinion). `key_metrics.1` is a confirmed duplicate of the
  headline: identical count, share, period, scope, and passage.

### Flags

- `architecture.interfaces` lists `github`, but no capture names the pull
  request host; Slack, Linear, and Jira are named (lines 16, 18). The claim is
  unchanged; the disposition note states the evidence boundary.
- Source 3 (public repository) contains Staged and Differ apps and Rust
  crates. It does not document the internal Slack orchestration layer, so no
  architecture claim was added from it; it remains contextual.
- Source 2 frames Builderbot as a protector reviewing proposed changes
  company-wide. That review system is recorded as a mechanism primitive; the
  captures do not state that Builderbot's own pull requests pass through
  `sq agents review`, so it was not made a validation step of the run.

### Challenge pass

Every appended claim was checked against its named passage. No existing claim
was reordered, rewritten, or removed. No material classification contradiction
emerged.

## PostHog StampHog

editorial support and scope; it is not independent verification of PostHog's
claims.


- Read all three captures in full: the July 9 newsletter (`source-1`), the
  July 28 devex post (`source-2`), and the pinned `pr-approval-agent` README
  (`source-3`).
- Every existing claim was checked against its cited passage; all are
  supported. No contradiction was found.
- Workflow (appended `primitives.3`–`.6`, all workflow role): label-triggered
  start (source-1 107–108; source-3 19, 41–44), wait for in-flight bot reviews
  (source-3 80–92), LLM showstopper review (source-2 123; source-3 95–112),
  then risk-aware routing (`primitives.1`, kept from the baseline) and verdict
  posting (source-1 114–116; source-3 128–131). The named scope runs from the
  stamphog label to the posted verdict. `primitives.0` (authoritative gates)
  keeps the validation role; `primitives.2` (verdict bundle) is a mechanism.
- Validation: the deterministic gates (`primitives.0`) plus the fail-closed
  retention behavior (`lessons_learned.2`, source-3 line 19: ERROR and WAIT
  keep the label and retry on the next push).
- Human involvement is reported: source-1 line 116 and source-2 line 123
  document escalation to human review; the catalog-judgment
  `operating_models.0` (exception-only) accompanies it, as in the DoorDash
  pilot record.
- Implementation: seven of eight fields reported. Sandbox is unreported — the
  captures state the GitHub Action host and the reviewer's Read, Grep, and
  Glob tools, but no isolation boundary for a run.
- Observations: `key_metrics.0` and `key_metrics.1` are confirmed duplicates
  of the compound headline (same counts, periods, denominators, and
  qualifications; source-1 lines 105 and 118). `key_metrics.2` (20% of PRs
  approved, about $300 per month in tokens; source-2 line 131) stays
  canonical; its category is adoption-output with the token cost in the
  subject rather than cost-latency, because the approval share is the primary
  reported population and the cost qualifies it.
- Challenge pass: numbers about other systems were not claimed — the 20%→70%
  agent-opened PR share (source-2 line 30) is org-wide, ReviewHog (line 133)
  is a separate unreleased system, and the qa-swarm, review-triage, and
  babysit-prs workflows (source-1) are personal or community systems, not
  StampHog.

#### Flags

- Version drift, not a contradiction: source-1 (July 9) describes
  CODEOWNERS-soft routing and 500-line/20-file ceilings; the pinned README
  (source-3) documents the hogli-resolver ownership source and 800-line/30-
  file substantive ceilings, and notes the CODEOWNERS-soft formats were
  removed. The record's claims stay version-neutral and name neither, so no
  change was needed.
- Source-3 line 102 (an un-withdrawn maintainer hold blocks approval) and
  lines 110–112 (the LLM refuses over an in-flight human review) document a
  human veto that supports the exception-only boundary; no separate claim was
  appended because `primitives.1` already carries the documented checkpoint.

## Cloudflare Internal AI engineering stack


- Read `cloudflare-ai-stack-source-1` (engineering blog, 363 lines) in full.
  Read `cloudflare-ai-stack-source-2` (Hacker News thread) in full; it holds two
  short comments with no substantive evidence and contextualizes the summary only.
- Purpose: `summary` (lines 12, 173, 249, 257 support its three sentences).
- Workflow: `primitives.3`, the merge-request review run (line 259 — MR opened or
  updated triggers a CI job; a coordinator tiers risk and delegates to specialist
  agents; results post as structured MR comments). The platform components
  (`primitives.0`–`.2` — portal, Code Mode, AGENTS.md) are mechanisms. Named scope:
  merge request → automated multi-agent advisory review, one representative run on
  a platform that also carries interactive coding use.
- Human involvement: reported from `operating_models.1` only — line 247 states the
  generator opens a merge request so the owning team can review and refine the
  AGENTS.md document. The review flow itself posts advisory comments (lines 257,
  269); no passage documents a required reader, so `operating_models.0` (attention
  boundary unknown) stays in research details and is not a reported checkpoint.
- Implementation: all eight architecture fields are populated and supported —
  sandbox (52, 54, 334), harness (37, 53), model (87, 273), tool_access (48, 173),
  knowledge (199, 249), credentials (47, 156), context_mgmt (179–189), interfaces
  (37, 259). `interfaces` carries a boundary note: the capture documents CLI
  clients and the CI component but names no web surface for the internal stack
  (the "web UI" at line 348 belongs to the public starter-template diagram).
- Validation: appended `primitives.4` — the reviewer flags merge requests whose
  changes suggest AGENTS.md is stale (lines 249–251, "a stale AGENTS.md can be
  worse than no file at all"). No measured detection rate is given; the claim
  stays at default classification without invented metadata.
- Observations: all five are canonical; no duplicate representations. Subjects
  kept distinct: total AI requests (headline, 47.95M — lines 17, 313), users
  (16, 311), request-and-token volume (`key_metrics.1`, 17–20 — runtime-capacity,
  it pairs the total request count with the Gateway token figure), company-wide
  merge requests (`key_metrics.2`, 25–29 — the record already scopes these as not
  agent-authored), and teams (18). `key_metrics.1` is not a duplicate of the
  headline: it adds the 241.37B token quantity and names the Gateway.
- Lessons: `lessons_learned.0`–`.3` all supported at their cited locators
  (105, 195–212, 179–189, 84–103) with claim-specific confidence reasons already
  in place.

Flags (no contradictions):

1. `architecture.interfaces` lists `web`, which no capture passage names for the
   internal stack. The claim is unchanged; the disposition note states the
   boundary. A future capture of the portal or Backstage surfaces could resolve
   it.
2. `key_metrics.1` paired the 47.95M total-request count with "via AI Gateway"
   wording; the capture lists 20.18M as Gateway requests specifically (line 19)
   and 47.95M as total AI messages (line 313). Correction applied during this
   review: the claim now reads "47.95M AI requests, 20.18M AI Gateway requests
   per month, and 241.37B tokens routed through AI Gateway"; `metric_scope` and
   `measurement_method` name each count separately, and the headline's
   `measurement_method` no longer calls the 47.95M total an "AI Gateway count".
   Claim ID and field path are unchanged.
3. The Kimi K2.5 security agent (line 99, 7B tokens/day) is a different internal
   workload, not usage of this stack's coding tools; correctly absent from claims.
