## Salesforce Slackbot

### Captures read

All four in full: `salesforce-slackbot-source-1` (GA launch release, 125 lines),
`-source-2` (staged "interview" with the agent, 100 lines), `-source-3`
(VentureBeat launch report, 135 lines — the substantive source for model,
internal-rollout figures, and the documented demonstration), `-source-4` (Hacker
News submission pointer; a discovery link with no discussion content).

### Claim audit

Every pre-existing claim verifies against the captures, including both lessons
(s1 lines 88–90, 104–108 and 36, 72) and the permission claims. Backfilled one
missing locator: `architecture.harness` now cites s1 lines 22–24, 38 ("front
door to the Agentic Enterprise").

### Disposition decisions

- Workflow: reported from two appended runs. `primitives.1` is the launch
  post's meeting-prep briefing (s1 64–66: recent discussions, documents, and
  customer history into one briefing). `primitives.2` is the documented product
  demonstration (s3 52–58: correlate pilot feedback with an uploaded dashboard
  image, query Salesforce for candidate accounts, write the plan into a shared
  Canvas). `primitives.0` (permission-aware context) stays a mechanism.
- Human involvement: reported from `operating_models.0`; the documented loop is
  conversational refinement of drafts (s1 54). No approval gate beyond the
  requesting user appears in any capture.
- Implementation: six fields reported. `sandbox` unreported (s3 24–26 describes
  an LLM plus a robust search layer and third-party data connections, not an
  isolation boundary). `context_mgmt` unreported (grounding in Slack context
  and conversation continuity are described; maintenance over time is not).
- Validation: unreported. The staged interview self-describes citing sources
  and admitting unknowns (s2 26); that is an output attribute in a marketing
  piece, not a documented check.
- Observations: the record had none; appended `key_metrics.0` (two-thirds of
  ~80,000 employees tried it; 80% of those continue, s3 42–44) and
  `key_metrics.1` (96% internal satisfaction; two to 20 hours per week saved,
  s3 44), both marked as Salesforce internal figures relayed by VentureBeat
  without method or window.

### Flags and deliberate exclusions

- No contradictions. Deliberately unclaimed: the customer time-savings
  testimonials in s1/s3 (Sinan's 90 minutes/day, Engine's 30 minutes/day —
  individual anecdotes already summarized by the internal figures), the
  250-prompt Canvas adoption story (s3 46), the 73% social-adoption research
  finding (s3 48), FedRAMP-driven provider selection detail beyond the model
  claim (s3 32), and all future-roadmap items (MCP client, third-party tool
  calls, image generation, multi-agent coordination).
- Meeting booking is a timing boundary, not a contradiction: availability
  checking shipped at launch; booking was "coming a few weeks after" (s3 112–114).
  Recorded in the `tool_access` note.
- Source-4's capture holds only the outbound link; it is read and listed, and
  contributes no claims.
