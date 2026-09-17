# Linear Agent

## Captures read

All six in full: `linear-agent-source-1` (how we built — prompt/tools/model-of-product
boundaries, system skills, custom harness), `linear-agent-source-2` (how we use it at
Linear — three end-to-end workflows), `linear-agent-source-3` (Agent Interaction SDK —
identities, scopes, sessions, delegation), `linear-agent-source-4` and `-source-5`
(HN stubs, link-only), `linear-agent-source-6` (public-beta changelog — skills,
automations, Code Intelligence).

## Disposition decisions

- Purpose: `summary` (s1, s2, s6 all linked).
- Workflow: the email-to-shipped-feature run is the representative workflow because it
  spans all five documented stages. Appended `primitives.3` (scope the Intercom
  conversation into an issue, s2 28–34), `primitives.4` (delegated first-pass coding,
  s2 60, 114), `primitives.7` (close the loop in Intercom or Slack, s2 70, 102). The
  existing `primitives.0` (Triage Intelligence) carries the routing step because s2
  places it explicitly as stage 2 of this run (s2 38). `primitives.1` (SDK identities)
  and `primitives.2` (Loops) are mechanisms. Two further documented workflows (Slack
  thread → PR, s2 78–102; PM files-and-ships, s2 110–122) are named in the disposition
  note rather than duplicated.
- Human involvement: reported — human final pull-request approval (s2 66), mid-run
  confirmation for risky or hard-to-undo actions (s1 94–96), and delegation that keeps
  the issue assigned to its human owner (s3 68–78).
- Validation: reported — the coding-agent review pass with human final approval
  (`primitives.5`, s2 66) and the conditional tool-call approval gate (`primitives.6`,
  s1 94–96).
- Implementation: appended `architecture.context_mgmt` (progressive system-skill
  disclosure per run, s1 62–72); the field set is otherwise reported from existing
  claims. `sandbox` stays unreported: the captures describe a custom owned stack
  (s1 82–86) but no execution or isolation boundary; the placeholder claim remains in
  research details.
- Observations: `unreported` with an empty map — the record has no observation claims,
  and the captures give no usage or outcome measurements; effectiveness statements are
  qualitative.
- Lessons: all five existing lessons verified (s2 28–38/60/70/98/102/134), three as
  attributed opinions, two as reported facts.

## Flags

1. `primitives.2` (Loops) and the "scheduled/event-driven 'Loops'" clause in
   `architecture.harness` describe Loops as scheduled, recurring runs. The six captures
   only name Loops in passing (s1 24) and describe triage automations separately
   (s6 45); the Loops definition itself lives in an unpreserved post. Claims unchanged;
   a future capture of the Loops announcement would resolve this.
2. `architecture.knowledge` first clause ("Semantic/vector search evolved into
   agentic context acquisition") could not be located in any capture; the Datadog and
   Sentry customer-context clause is verified (s2 38). Claim unchanged; flagged.
3. `github` in `architecture.interfaces` is a system the agent acts on (PRs, s2 66,
   114) more than a conversational surface; noted in the disposition.
4. Deliberate exclusions: s6 marketing usage examples and pricing tiers; the
   sub-agent suspension and prefix-cache harness internals (s1 88–100) beyond the
   harness claim; the structured activity types planned in s3 82.

## Challenge pass

Each appended claim was re-checked against its exact passage. The review-gate framing
of `primitives.5` separates the coding agent's review pass from the human final
approval and does not present the agent pass as the checkpoint. The workflow note
prevents reading the one representative run as the platform's full capability set.
