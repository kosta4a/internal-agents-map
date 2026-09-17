# Uber uReview

## Captures read

- `uber-ureview-source-1` in full (223 lines): the uReview/Commenter engineering
  blog, 2025-08-12.

## Claim audit

Every existing claim was checked against the capture; all are supported as
written. The headline's weekly-versus-monthly conflict (line 34 vs line 120) is
already recorded faithfully with a `contradicts` evidence link and a low
confidence rating; no correction needed. The ~1,500 hours figure's arithmetic
(10,000 commits × 10 min ≈ 1,667 h) is already qualified as not reconciling
exactly in `key_metrics.4` metadata.

## Disposition decisions

- Purpose: `summary` (lines 28–34).
- Workflow: reported. The capture's own pipeline order is ingestion (50–54) →
  generation by specialized assistants (56–62) → post-processing and quality
  filtering (64–72) → in-line posting with ratings (74–76). Appended
  `primitives.3` (ingest an eligible diff) and `primitives.4` (post validated
  comments) to carry the first and last stages; existing `primitives.0` and
  `.1` are the generation and filtering stages, so the reading order is
  `[.3, .0, .1, .4]`. Scope: submitted diff to posted, rated comments.
- Human involvement: `operating_models.0` — engineers remain in control of the
  change (lines 30, 76, 162). Ratings are optional feedback, not a checkpoint.
- Implementation: harness (44, 58, 64–72), model (106–110), tool access (94,
  144), knowledge (54, 61), context management (76), interfaces (76, 94).
  `sandbox` and `credentials` unreported: the capture documents neither.
- Validation: `primitives.2` — addressed-comment detection by five re-runs per
  final commit (82), curated-benchmark precision/recall/F1 before release
  (84–88), developer ratings (76).
- Observations: the headline is a compound of diff coverage, usefulness, and
  addressed rate; `key_metrics.0`, `.1`, and `.2` are strict components that add
  nothing the headline lacks (same figures, scopes, denominators, and the same
  unresolved monthly conflict in `.0`), so all three are aliases.
  `key_metrics.3` (4-minute median latency, line 94) and `key_metrics.4`
  (~1,500 modeled hours, line 104, an assumed-calculation estimate) are
  canonical.
- Lessons: all three `lessons_learned` claims reported (lines 128–148).

## Deliberate exclusions

- The Fixer component (line 30) is a separate system that proposes code changes;
  the blog itself scopes this record to Commenter ("referred to simply as
  uReview"). Not appended; a distinct approach if it is ever cataloged.
- The 51% human-reviewer comparison (line 100): a company audit figure about
  humans, not an observation of this system; left unclaimed.
- IDE-versus-CI and linters sections (150–156): design rationale already
  reflected in the lessons; no new claims.

## Flags

None. All pre-existing claims verified supported.
