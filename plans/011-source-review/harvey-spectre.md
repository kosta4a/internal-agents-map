# Harvey Spectre

## Captures read

- `harvey-spectre-source-1` (Building Spectre) in full, 95 lines.
- `harvey-spectre-source-2` (Building an agentic security operations center) in full, 120 lines.

## Claim audit

Every pre-existing claim verified against the captures: the summary and
operating model (source-1 lines 12, 16, 24), all six architecture fields
(lines 36–54, 44, 46, 82), both primitives (16, 24, 36–40), and all three
lessons (16, 24; 88; source-2 line 115). No corrections needed.

## Appended claims

- `architecture.interfaces` gains `cli`: source-1 line 40 names "Slack, web,
  CLI, and scheduled work" as surfaces over the same durable run. The
  interfaces evidence locator now cites lines 16 and 40.
- `primitives.2` Start a durable run (lines 16, 24, 40); `primitives.3`
  Execute the agent in the sandbox (lines 24, 44, 46); `primitives.4` Return
  reviewable artifacts (lines 16, 24) — the first-version flow the post
  documents verbatim at line 24. `primitives.5` Scheduled verification loops
  (lines 68, 74) carries the validation role.
- Existing primitives keep mechanism roles: durable runs and reviewable
  artifacts are runtime properties, not steps of the named run.

## Disposition decisions

- Workflow reported, scope "request from Slack, the web app, an automation, or
  the CLI through a sandboxed durable run to reviewable artifacts" — the
  platform pattern: one documented run, platform-wide capability kept distinct.
- Human involvement reported from `operating_models.0` (work-product review);
  the failure path at line 24 returns results to a person who decides next
  steps, named in the note.
- Model unreported: the post discusses providers and multi-provider support
  but names no model; the placeholder claim stays in research details.
- Knowledge unreported: no knowledge store for Spectre runs is documented.
  The SOC's persistent-memory system belongs to the separate security
  platform and was not imported.
- Observations unreported: source-1 reports no measured outcomes, and all
  source-2 figures (5,300 memories, 2,500+ investigations, 400+ detections,
  75-to-400 coverage growth, ~95% alert-space reduction) describe the agentic
  SOC — a different system that source-2 line 115 says deliberately runs on
  separate infrastructure. None were claimed for Spectre.

## Flags and deliberate exclusions

- Source-2's SOC workflow (four-phase detection pipeline, hourly triage,
  threat-watch) is a separate platform; only the separate-infrastructure
  rationale feeds the existing lesson.
- The "invest in your log warehouse before your agents" guidance is SOC
  practice, not a Spectre lesson.
- Self-check: keyscan CLEAN; roles cover all six primitives; workflow claim
  paths equal the workflow-role set; seven questions and eight fields exact.
