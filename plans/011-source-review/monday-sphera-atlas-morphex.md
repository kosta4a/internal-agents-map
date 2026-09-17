# monday.com Sphera / Atlas / Morphex

Reviewed 2026-09-17 against the preserved capture. This log records editorial
support and scope; it is not independent verification of publisher claims.

## Captures read

- `monday-sphera-atlas-morphex-source-1` (AWS ML blog case study, 203 lines)
  in full. Secondary-only provenance (AWS-published, monday-reported figures).

## Claim audit

Every pre-existing claim verified against the capture at or near its cited
locator, including the Plan 008 reconciliation outcomes: the two operating
models keep the Morphex (exception-only, lines 150, 169) and Atlas (two-sided,
line 124 with line 169 as the contextualizing future goal) boundaries distinct.
No corrections needed.

## Disposition decisions

- Purpose: `summary` (lines 28, 114–130, 150).
- Workflow: appended `primitives.4`–`.7` — inbox trigger through SNS/SQS to the
  agent session (lines 40, 46, 50), implement the ticket and write the PR
  (line 28), auto-deploy to the remote sandbox with tests, checks, and replayed
  production traffic before any human review (line 124), then merge above the
  confidence threshold or route to a human with the failing signal (lines 150,
  169). Scope names the shared pipeline and the per-agent difference at the
  final gate. The four pre-existing primitives (agent profiles, Guardrails,
  memory files, CoWORK) stay mechanisms.
- Human involvement: `operating_models.0` and `.1` — Morphex exception-only
  (below-threshold routes to a human; approved ships with none); Atlas sandbox
  gates run before a human review request. The threshold auto-merge is a stated
  goal for the next two quarters for that population, not a current Atlas fact.
- Implementation: all eight architecture fields reported — the capture
  documents each directly (EKS pods and the sandbox at lines 108, 124; the SDK
  wrapper at 54–60; Bedrock routing at 97–104; the event path at 40–50; memory
  files at 64–95; ElastiCache and boards at 64, 134; Secrets Manager and shared
  RBAC at 46, 181; three inboxes at 40). First record in the catalog with all
  eight fields and all seven questions reported.
- Validation: blocking Guardrails reviewers (`primitives.1`, lines 126–130),
  the sandbox gate (`primitives.6`, line 124), and the deterministic plus
  LLM-scored evals fed back into the harness (`lessons_learned.4`, lines 116,
  128–130).
- Observations: `key_metrics.0` is a confirmed duplicate of the headline — the
  same nineteen-in-twenty figure, denominator, and unset period; "automatically"
  adds nothing the headline's own metadata scope does not state. The other three
  stay canonical with distinct subjects: Builder adoption (lines 10, 16, 22),
  per-engineer throughput (lines 10, 23), and the Guardrails pre-filter with
  revert rate among top PR-generating agents (lines 154–158).
- Lessons: all five verified (lines 114–116, 118–120, 122–124, 150, 116/128–130).

## Deliberate exclusions

- The roughly three-in-ten merged / three-quarters zero-human-edit figures
  (line 156) describe top PR-generating agents generally — a different
  population from Morphex's nineteen-in-twenty; left unclaimed.
- The one-in-five all-PR Guardrails failure rate (line 130) covers agent- and
  human-authored PRs together; `key_metrics.3` correctly uses the agent-only
  quarter from line 156.
- Tens of thousands of PRs evaluated per month (line 130) — volume without a
  comparable denominator; unclaimed.

## Flags

None. The capture is consistent with every claim; the only boundary judgment is
the Atlas threshold-routing future framing, already carried by the existing
contextualizing evidence link and the disposition note.
