# Dropbox Nova source review (Plan 011)

## Captures read

- `dropbox-nova-source-1` in full (95 lines): the engineering post introducing Nova.
- `dropbox-nova-source-2` in full (18 lines): a bare Hacker News discovery link whose
  single comment is off-topic (climate models). Nothing claimable; read and listed
  in `source_ids`.

## Disposition decisions

- Purpose: `summary` (lines 12, 26, 28).
- Workflow: the Deflaker flaky-test loop is the documented operational run
  (lines 57–62): `primitives.2` (Athena/Deflaker evidence into Nova), `.3`
  (root-cause fix proposal), `.5` (retry with carried-forward notes to a landed
  fix or the cap of five). `primitives.4` (100+ CI validation runs) carries the
  validation role, mirroring the Qubot offline-eval-gate pattern. Scope names
  that one loop; interactive sessions (lines 18, 26, 55) and the crash-alert
  experiment (line 72) are other platform modes, kept out of the scope note.
- Human involvement: both documented modes, `operating_models.0` and `.1` —
  exception-only async workflows (crash candidates routed to service teams,
  lines 58, 62, 72) and continuously steered interactive sessions (lines 18, 26).
- Implementation: seven of eight fields reported. Credentials is the exception —
  see flags.
- Validation: `primitives.4`; the general mechanism is caller-attached validation
  commands run after each attempt (line 26), of which the Deflaker CI runs are
  the documented instance.
- Observations: `key_metrics.2` is a confirmed alias of the headline — same
  dozens-of-agents capacity, same runbook passage (line 67), identical
  `metric_scope`, no separate period or qualification. `key_metrics.0` (100+
  CI validation runs per fix, runtime-capacity) and `key_metrics.1` (thousands
  of migration entries by the predecessor Goose migrator, adoption-output,
  pre-Nova period) stay canonical with distinct subjects and periods.
- Lessons: all four reported; each verified at its locator (lines 78, 26, 80,
  20–22, 55).

## Flags

1. `architecture.credentials` says "same auth/authz as engineers"; no passage in
   either capture states an authentication or authorization mechanism. The
   closest support is line 20 (agents operate within Dropbox's existing
   infrastructure and validation paths). Claim unchanged; the credentials field
   is honestly `unreported` and the legacy claim stays in research details.
2. Source 2 carries `role: discovery`; its single comment is unrelated. No action.

## Deliberate exclusions

- The crash-alert workflow (line 72) and RenovateBot first-pass repair (line 69):
  emerging or one-line descriptions, not appended as workflow primitives.
- Multi-agent review aggregation and scheduled on-call toil experiments
  (lines 72–74): exploratory, no run documented.
- The illustrative JSON request (lines 34–46) is treated as harness documentation
  (already claimed in `architecture.harness`), not a separate primitive.

## Challenge pass

- The workflow reading order was checked against the post's own diagram caption
  (line 62): detect → send logs → propose → validate → retry with notes. The
  appended primitives follow that order.
- The Deflaker metrics stay scoped to CI validation runs; the post gives no
  fix-success rate, so none was inferred.
- `primitives.0` (validation loop) stays a mechanism: it names the platform's
  harness loop, not a run step — the run-specific validation is `primitives.4`.
