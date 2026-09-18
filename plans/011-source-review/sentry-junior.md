### Captures read

All four in full: `sentry-junior-source-1` (355-line writeup), `-source-2`
(repository README, package table), `-source-3` (Sentry Labs index),
`-source-4` (Apache-2.0 license text, confirmed at lines 412–414).

### Disposition decisions

- Purpose: `summary` (s1 28–34, 64–95, 261–281; s2 14–16).
- Workflow: appended `primitives.3`–`.6` for the four documented runs —
  codebase question (s1 34), GitHub issue from a conversation with the
  deterministic footer (s1 40, 218–220), visual QA through agent-browser
  (s1 42), and watched-PR follow-up via resource subscriptions (s1 263–279).
  The three pre-existing primitives (progressive discovery, credential proxy,
  interrupt/resume broker) are mechanisms and keep research-side placement.
  Scope: Slack thread request or watched event to an acted-upon answer or
  artifact.
- Human involvement: `operating_models.0` (s1 12, 91) — give information,
  steer mid-run, review the work. The event-driven follow-up boundary is
  unverified (s1 279: the agent decides alone) and stays in research details.
- Implementation: all eight architecture fields reported; every claim has
  capture support (broker at s1 66–110, Sonnet default at 56, sandbox and
  proxy at 114–196, progressive discovery at 226–243, Redis transcripts at
  138, skills at 245–257, GitHub grants at 198–218).
- Validation: `lessons_learned.3` (s1 311–337) — vitest-evals event scenarios
  with explicit pass/fail criteria and side-effect assertions. Runtime note:
  interceptors also force deterministic issue/PR footers (s1 218–220).
- Observations: headline compound (license + ~100k lines + internal use);
  `key_metrics.0` is the size component and adds nothing → duplicate of the
  headline (same exclusions, same passage). `key_metrics.1` (4 months) stays
  canonical: implementation-scale, reported measurement, different subject.
- Lessons: all five reported (s1 28–32, 247–257, 136, 311–337, 212–216).

### Flags and deliberate exclusions

1. `architecture.interfaces` lists `github`, which the captures treat as a
   system Junior acts on, not a human surface of Junior. Slack and the
   dashboard (web, s1 301–305) are the named surfaces; the writeup also names
   a local `junior chat` CLI (s1 339) that the claim list does not carry.
   Claim unchanged; boundary recorded in the interfaces disposition note.
2. `architecture.sandbox` says "ephemeral containers", a paraphrase of the
   Vercel Sandbox and serverless ephemerality (s1 114, 144). Supported in
   substance; left as written.
3. Deliberately unclaimed: the coding-performance self-assessment ("garbage
   at it", s1 56), the "used quite frequently" adoption color (s1 48) beyond
   the existing summary, and the scheduler credential prohibition (s1 281)
   which is a stated limitation, not an observed practice.
