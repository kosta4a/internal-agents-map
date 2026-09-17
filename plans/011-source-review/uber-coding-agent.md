## Uber Internal coding agent (unnamed)

### Captures read

- `uber-coding-agent-source-1` in full (36 lines; a Business Insider article relaying
  the CTO's LinkedIn post). Sevbot-style boundary kept: the Jellyfish 700-company
  survey (line 28), the Amazon outage report (line 32), and the industry burnout
  discussion (line 34) are context, not claims about this agent.

### Disposition decisions

- Purpose: `summary` (lines 24–26).
- Workflow: appended `primitives.0`–`.2` — delegate the task (line 24), write the
  complete change with zero human authoring (lines 24–26), review and approve
  (line 26). Scope "Delegated coding task to engineer-approved code change". The
  article describes no other stage.
- Human involvement: `summary` + `operating_models.0` (line 26). Validation
  reports the same review gate (`primitives.2`); no automated check exists in
  the capture, and the note says so.
- Implementation: honestly `unreported` — the capture names no model, harness,
  tools, knowledge, credentials, or interface. All eight architecture fields are
  `unreported`; the pre-existing `unknown` sandbox and `Not specified publicly`
  harness claims stay in research details as placeholders.
- Observations: headline and `key_metrics.0` (lines 24–26) plus `key_metrics.1`
  (line 18). `key_metrics.1` keeps its distinct subject: monthly AI-tool use
  among engineers generally, not this agent.
- Lessons: appended `lessons_learned.0` (line 36, the engineer-role shift) and
  `.1` (line 30, quiet experimentation over top-down push), both `opinion`/
  `reported` with single-secondary-source reasons.

### Duplicate confirmation

- `key_metrics.0` → headline: same weekly count and 8% share from the same
  passage. The claim's "at the time" wording was examined against the alias
  criterion and judged to add no separate information: the headline's growth
  statement ("from under 1% to 8%") already carries the point-in-time framing.
  Unlike the Plaid batch-2 revert, no new qualification or absence about a
  different subject is present.

### Flags

- None. Every pre-existing claim verified at its locator; the record's existing
  medium-confidence "limited public evidence" reasons already state the
  secondary-only boundary.
