# OpenAI Sevbot

### Captures read

- `openai-sevbot-article` (The Pragmatic Engineer, 199 lines) in full. All Sevbot
  behavior sits at lines 183–195; the rest of the article describes the broader
  software factory and is attributed to `openai-software-factory`, never to Sevbot.
- `crtsh-sevbot-certificates` (43 lines) in full: certificates for
  `sevbot.api.openai.com`, earliest not-before 2025-11-20, renewals through
  2026-08-01. Evidences a deployed service under the Sevbot name, not behavior.
- `github-sevbot-pr` (51 lines) in full: PR #2765 in openai-agents-python,
  "[SEVBot] Optionize initialized notification tolerance", commits co-authored by
  `codex`, March 2026. Evidences SEVBot-branded engineering work, not incident
  behavior.

### Disposition decisions

- Purpose: `summary` (article lines 183–195). Every existing claim audited and
  supported at its cited locator; no corrections.
- Workflow reported from four primitives in article order: wake on a detected
  incident (line 188), collect incident context (190), propose-only mitigation
  (191–193), answer developers' questions (192). Appended `.1`–`.3`; the existing
  `.0` already carries the proposal and the engineer instruction. Scope: detected
  incident to engineer-directed mitigation in the incident Slack channel. All four
  carry the workflow role; the record has no mechanism or validation primitive.
- Human involvement reported from `primitives.0` and `operating_models.0`: the
  engineer-controlled mitigation instruction is the documented checkpoint, and the
  article's "never executes any" wording limits autonomous execution. The
  catalog-judgment confidence reason for `operating_models.0` already records the
  reading of that limit.
- Implementation: harness (built on Codex, line 188) and interfaces (Slack, line
  192) reported. Model and sandbox stay unreported; their legacy `unknown`
  placeholders remain in research details, per the pilot's placeholder policy.
- Validation unreported: the propose-only limit is a behavior boundary, not a
  check of Sevbot's proposals or answers; no validation mechanism is documented.
- Observations unreported with an empty map: the record has no headline or key
  metrics, and no outcome measurement appears in any capture. The certificate and
  commit records evidence deployment, not results.
- Lessons reported from `lessons_learned.0` (line 195): the autonomous-mitigation
  goal must not read as current behavior; on-call duty continues.

### Flags and deliberate exclusions

- No claim contradictions. The article's factory-wide figures (Codex adoption,
  PR growth, DevDay metrics) belong to `openai-software-factory`; none were
  claimed here.
- The "[SEVBot]" SDK pull request and the certificate history were read and kept
  as existing summary evidence; no new claims were derived from them.
- Secondary-source discipline: the only behavioral source is an independent
  newsletter relaying OpenAI's account. No claim in this record states a
  measurement, so no press-relay metric metadata was needed.
