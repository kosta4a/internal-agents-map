# StrongDM Software Factory

## Captures read

All seven in full: `strongdm-factory-overview` (105 lines), `strongdm-factory-principles`
(34), `strongdm-factory-techniques` (45), `strongdm-factory-products` (24),
`strongdm-attractor-spec` (102), `strongdm-factory-weather-report` (68),
`strongdm-attractor-repo` (32).

## Disposition decisions

- Purpose: `reported` from `summary` (overview lines 10, 18–19; techniques lines 40–45).
- Workflow: appended `primitives.5` (seed, principles lines 16–18), `primitives.6`
  (implement and validate in the loop, principles lines 22–32 plus overview line 10),
  and `primitives.7` (converge on the holdout scenarios, principles line 34 plus
  overview line 10). Scope: natural-language seed through the validation-feedback
  loop to converged software.
- Human involvement: `reported` from `summary` — the standing rules exclude humans
  from writing or reviewing code (overview lines 18–19). Non-convergence handling is
  undocumented; the unknown attention-boundary judgment stays in research details.
- Implementation: six of eight fields `reported` (harness, model, tool_access,
  knowledge, credentials, context_mgmt). `sandbox` is `unreported` — the legacy
  `unknown` placeholder claim stays in research details. `interfaces` is
  `unreported` — no capture names a human-facing surface; the factory is
  non-interactive by definition (overview line 10).
- Validation: `reported` from `primitives.0` (scenarios) and `primitives.1`
  (satisfaction). The Digital Twin Universe carries validation load but stays a
  reusable `mechanism` under implementation; the block-builderbot protector-gate
  precedent applies.
- Observations: `unreported` with an empty map — the record has no headline or key
  metrics, and the captures report no measured outcomes of the factory's software.
  The $1,000/day token figure (overview line 23) is a stated operating principle
  kept under lessons, not an outcome measurement.
- Lessons: `reported` from `lessons_learned.0` (techniques line 45),
  `.1` (principles lines 12–34), and `.2` (overview line 23).
- Primitive roles: Scenarios and Satisfaction carry `validation`; DTU, Shift Work,
  and Attractor are `mechanisms`; the three appended steps are `workflow`.

## Deliberate exclusions

- Community Attractor implementations (attractor-spec lines 83–103) describe
  human approval gates in third-party forks; they are not StrongDM's factory and
  support no human-involvement claim here.
- Weather-report model commentary (for example the Sonnet 4.6 note at line 60)
  is historical log; the model claim stays scoped to the 2026-06 configuration.
- Overview footnotes naming other factories (Devin, Factory, 8090) are context,
  not evidence about this system.

## Flags

- `architecture.knowledge` repeats the products page's "Turn DAG" verbatim
  (products line 16); the capture itself appears to garble "turn DAG" or a term
  of art. Claim left unchanged; recorded for a future capture check.
- The attractor-repo capture (lines 24–28) shows the intended build path is
  prompting a coding agent with the repo URL; no claim was added because it
  describes how others build Attractor, not how the factory runs.
