# WorkOS Project Horizon

## Captures read

- `workos-project-horizon-source-1` (Project Horizon architecture post) in full — 186 lines.
- `workos-project-horizon-source-2` (Applied AI Showcase) in full — 109 lines; the Horizon section
  (lines 46-54) documents the Claude Remote Routines variant, the TARS-emoji Slack trigger, the KV
  identity map, and WorkOS Vault credential storage.
- `workos-project-horizon-source-3` (autonomous UI-quality program) in full — 71 lines; Triage
  skill, QA agents against WorkDS, and Horizon picking up high-confidence tickets (line 56).
- `workos-project-horizon-source-4` (Hacker News submission) in full — a bare discovery link with
  no discussion content; read and listed, no claims possible.

## Disposition decisions

- Purpose: `summary` (s1 lines 24-30, 38-42).
- Workflow: the platform pattern from Cloudflare — one representative run named in
  `workflow_scope`. Appended `primitives.4` (PM agent divides a delegated Linear project into
  issues; human reviews each, s1 46-48), `primitives.5` (In Progress moves the issue to a cloud
  agent; sandbox boots Docker with OpenCode and the MCP server, s1 48-56), `primitives.6`
  (pull request attributed to the issue owner; explicit human approval, s1 54, 60), and
  `primitives.7` (merge webhook continues the dependency chain, s1 62). Scope: delegated Linear
  project to merged, human-approved pull requests.
- Human involvement: `operating_models.0` plus `primitives.4` and `primitives.6` — the issue
  review and the PR handoff are the two documented checkpoints; the article names humans as the
  frequent bottleneck (s1 60).
- Implementation: all fields reported except `model`. The model claim is an absence statement
  ("Not documented by name..."); it keeps its ID in research details and the field is honestly
  `unreported`. The harness claim already keeps OpenCode (core article) and Claude Remote Routines
  (showcase) distinct, and `lessons_learned.2` blocks any whole-platform migration reading.
- Validation: appended `primitives.8` — lint, build, and automated tests in the sandbox, plus
  initial validation of acceptance criteria (s1 38, 96). Headless browser verification is planned
  work (s1 167), stated as such in the note, not claimed as current.
- Observations: `unreported` with an empty observations map. No capture measures a Horizon
  outcome. The UI Nits closure rate (about one hundred nits per month, s3 28) belongs to the
  surrounding program — Triage skill, QA agents, and humans participate alongside Horizon — so
  attributing it to Horizon alone would over-claim.
- Lessons: all five reported at their existing locators.

## Deliberate exclusions

- The showcase variant's CI behavior (routines listening to GitHub Actions webhooks until CI goes
  green, s2 50) and WorkOS Vault credential storage (s2 52): single-deployment details; the
  record's claims stay version-neutral with the two deployments already distinguished in the
  harness claim.
- Claude Day's 39 apps, Nick Nisi's 293 days, and BlogBot's three-minute fix loop (s2): other
  systems, not Horizon.
- The self-improvement loop stays a mechanism (`primitives.2`): it is a compounding system
  property with a human merge step, not the representative implementation run.

## Flags

None. Every pre-existing claim verified at its cited locators; the `architecture.model` absence
claim is accurate for all four captures.
