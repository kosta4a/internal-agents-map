# Brex Internal Agent Platform

- Read `brex-agent-platform-source-1` in full (215 lines; an independent-secondary
  First Round interview, so every Brex figure is press-relayed — the record-level
  `secondary-only` strength and the existing confidence reasons carry that).
- Claim audit: `summary`, `headline_metric`, all `architecture.*`, both original
  primitives, all four key metrics, and all five lessons verified at their cited
  lines. Two clauses are not supported as written and are flagged below rather
  than changed.
- Workflow appended as `primitives.2` (dispute-submission preparation,
  lines 179–189 — the headline metric's own run) and `primitives.3` (collections
  response drafting for the servicing team, line 173). The prompt studio and the
  MCP bridge stay build-time mechanisms. `workflow_scope` names both runs and
  keeps platform-wide capability and the L1/L2/L3 restructure out of the
  run description.
- Validation appended as `primitives.4`: the quality-rubric agent that reviews
  every support interaction and feeds a closed improvement loop (lines 80–82).
  The KYC human checks are carried by human involvement, not duplicated here.
- Human involvement reported from all three operating models with a note that
  the boundaries differ by use: fraud is exception-only (76, 159), KYC and
  collections keep work-product review (143, 205, 173), and the dispute run
  itself documents no checkpoint (187).
- Implementation fields: harness, sandbox, tool access, knowledge, credentials,
  interfaces reported; `model` and `context_mgmt` unreported — deployed-agent
  models are not documented (multi-model testing is build time; the placeholder
  claim stays in research details), and no context-maintenance mechanism is
  described (the QA feedback loop improves performance, it does not manage
  context).
- Observations: `key_metrics.1` is a confirmed duplicate of the headline —
  identical subject, values, period, scope, and locator (179–189); the shorthand
  adds nothing. The other three stay canonical: the chatbot first-touch rate is
  the customer-facing product AI adjacent to this platform (76, already scoped
  in `metric_scope`), the QA coverage and staffing change (80), and the KYC
  adverse-media accuracy comparison (163–167).

Flags (no contradictions):

1. `architecture.tool_access` ends with "invoked via Slack /c1". The capture
   describes `/c1` as the modal where employees configure which AI tools to
   use, with provisioning in Okta (line 62) — provisioning configuration, not
   agent invocation. Claim unchanged; the disposition note states the boundary
   and this flag records it for a correction pass.
2. `architecture.credentials` names "ConductorOne access management". No
   preserved passage names that vendor; the capture says generically that Brex
   routes all AI tools through a provisioning tool (line 62) plus SSO via
   internal Retool proxies and Okta (60–62). The name plausibly derives from
   ConductorOne's `c1` product but is not in the capture. Claim unchanged; the
   credentials disposition is reported on the strength of lines 60–62 with the
   vendor name excluded from the supported boundary and flagged here.
3. The capture's L1 claim "fully-automated with no human involvement in most
   cases" (line 76) is general process-work framing; it was not added as a
   primitive. The fraud-specific exception-only boundary (159) is the citable
   scope and already stands in `operating_models.0`.

Deliberate exclusions: the 5x–10x efficiency ambition (213, a target), the
in-progress onboarding agent (48–50), the 15 CS roles migrated to L2 (76), the
approximate "eight to ten of the 14 steps" KYC share (211), the org-wide
training program and AI-fluency ladder (102–119), and the hiring changes
(121–139). The COO's name is missing from the capture's own byline at line 14
(an editorial removal in the original); noted, not material to any claim.

Challenge pass: each appended primitive was re-checked against its exact
passage; the dispute primitive was narrowed to submission preparation (not
end-to-end chargeback resolution) to match the existing `metric_scope`, and the
collections primitive was kept to drafting with the servicing team's select,
customize, or send step (173). Key-scan clean; workflow claim paths equal the
workflow-role set; all reported claim paths resolve to same-entry fields.
