# Sierra Pinecone — Plan 011 source review

## Captures read

All three captures read in full: `sierra-pinecone-source-1` (Pinecone retrospective,
152 lines), `sierra-pinecone-source-2` (MCP Gateway engineering post, 121 lines),
`sierra-pinecone-source-3` (Agency sandbox post, 99 lines).

## Claim audit

Every pre-existing claim verified against the captures: summary (s1:42, 70–74;
s2:14, 118), headline and key_metrics.0/.1 (s1:136–139), all eight architecture
fields (s1:44, 58, 70–74, 90–92; s2:93, 118; s3:59–74, 78–86), the three
mechanism primitives, and all four lessons (s1:56–60, 116–124, 130;
s2:52–66, 93). No contradictions found; no claim changed.

## Appended claims

- `primitives.3` Start a session from a prompt (s1:44) — workflow.
- `primitives.4` Broker its own pull requests (s1:49) — workflow.
- `primitives.5` Babysit the pull request (s1:49, 104) — validation: watches
  checks, answers machine-review comments, fixes failing tests, rebases, and
  escalates to a person only when judgment is required.
- `key_metrics.2` 96% of engineering uses Pinecone; majority of the company
  daily (s1:137), metric/reported with scope.
- `key_metrics.3` Usage tripled every month since April while costs fell
  (s1:139), metric/reported, scope notes no absolute figures.

## Disposition decisions

- Purpose: `summary`. Workflow: `primitives.3` + `.4`; the three pre-existing
  primitives stay mechanisms (gateway, sandbox layer, routing).
  Scope: "Employee prompt to a streamed cloud session with brokered pull
  requests".
- Human involvement: `operating_models.0` + `primitives.5`. Sessions stream to
  the requester (watch, interrupt, redirect, s1:44); babysitting escalates only
  on judgment calls (s1:49, 104). The gateway's identity rules (interactive as
  user, scheduled as service account, s2:99–106) corroborate but are recorded
  here, not as a separate claim.
- Validation: `primitives.5` only. The environment lesson ("everything needed
  to verify its own work", s1:108; s3:20) describes capability, not a
  documented check of output, and stays in the lesson.
- Implementation: all eight fields reported — the third fully-reported record
  in the catalog (with cloudflare-ai-stack and sentry-junior).
- Observations: headline canonical (adoption-output, reported-measurement);
  `key_metrics.0` a confirmed alias (identical statement, figure, period,
  scope, same passage); `.1`/`.2`/`.3` canonical, subjects kept distinct
  (PR share; engineering adoption; growth-with-falling-costs).
- Lessons: all four reported.

## Deliberate exclusions

- Ghostwriter (s1:114; s3:16, 94): a separate customer-facing product sharing
  Pinecone's infrastructure; not an observation about Pinecone itself.
- 89% gateway adoption across 45 services (s2:118): adoption of the gateway
  component, not of Pinecone sessions; adding it would blur the record's
  subjects.
- Cost centralization without token leaderboards (s1:118): practice, already
  covered by lesson text; no metric claimed.
- Agency hibernation round-trip latencies (s3:82): infrastructure detail of the
  sandbox layer, already represented by the mechanism primitive.

## Flags

None. All existing claims verify; no corrections were needed.
