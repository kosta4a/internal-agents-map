# OpenAI Agentic software factory

### Captures read

All nine in full: `openai-factory-article` (199 lines), `venturebeat-devday-codex`
(60), `openai-harness-engineering-post` (235), `hn-harness-engineering-thread`
(1,340), `hn-zbrock-internal-prototype` (28), `hn-zbrock-internal-adoption` (26),
`openai-agents-api-post` (137), `openai-chatgpt-work-post` (110),
`every-codex-team-interview` (516).

### Existing-claim audit

Every existing claim was checked against its cited passage; all are supported.
No locator corrections were needed. The record already separates the
company-wide factory (Pragmatic Engineer article) from the one-team
harness-engineering repository, and the evidence relations preserve that
boundary (for example `summary` contextualized by the one-repository account).

### Disposition decisions

- Purpose: `summary` (article lines 141–177).
- Workflow: appended `primitives.5` (implement and babysit the PR, lines
  149–153); reported with `primitives.2` (deploy handholding, 159–177) and
  `primitives.4` (Perf Factory, 186). The domain-specialist reviewers and the
  perf harness are validation; the risk-tiered routing is a mechanism, not a
  run.
- Human involvement: production approval (article line 165, work-product
  review) and exception-only auto-approve in opted-in low-risk areas (line
  159). The Perf Factory attention boundary stays the unknown catalog judgment.
- Implementation: harness (line 48; Agents API lines 12–14 "same harness";
  zbrock prototype comment), tool access (140–145), knowledge (140–147, plus
  the one-team docs/ system of record and the interview automations at lines
  236, 258, 274), context management (/goal, lines 52–56), interfaces
  (48, 80, 140–145).
- Model: `unreported`. The article names no model for the internal harness.
  The one-team account names gpt-5/codex-cli for its 2025 start (harness post
  line 30; zbrock adoption line 18) — a different scope, kept out of the claim.
- Sandbox: `unreported`. The Agents API post (line 80) documents sandboxing for
  the external product; no source documents the internal pipeline's execution
  boundary. The `unknown` placeholder claim stays in research details.
- Validation: domain-specialist review of every change (155–157; VentureBeat
  line 44; one-team agent-to-agent review at harness post 46–48) and the
  Synthetics A/B perf harness (153). CI runs inside the implement primitive.
- Observations: headline (weekly employee use, line 46), non-engineering
  0%→90% (line 46), ~10x pipeline load (line 92) — all distinct, no
  duplicates. Appended two DevDay 2025 figures from VentureBeat line 32:
  92% daily technical-staff use (`key_metrics.2`) and 70% more PRs per
  engineer weekly (`key_metrics.3`), each with press-relay metadata and
  `valid_at: 2025-10`.
- Lessons: both existing lessons (lines 52–56, 64–66), both attributed
  opinions of the desktop lead.

### Deliberate exclusions

- One-team throughput figures (million LOC, ~1,500 PRs, 3.5 PRs/engineer/day,
  hundreds of internal users; harness post line 34): a single team's
  repository, not the company-wide system this record describes.
- The one-team end-to-end autonomy list (harness post 177–191) and its
  per-worktree/DevTools/observability mechanisms (54–56): one-repository
  scope.
- ChatGPT Work external-user figures (5M weekly Codex users, 1M non-developer
  users; Work post line 16): external product adoption, not internal use.
- Every-interview app-era details (Super Bowl surge, Cerebras speed, mid-turn
  steering): external product facts; only the internal-use passage (line 486)
  is cited, already in evidence as contextualizing the headline.

### Flags

None. No claim contradicted its capture.
