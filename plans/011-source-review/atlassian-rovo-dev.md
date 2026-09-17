# Atlassian Rovo Dev (RovoDev)

### Captures read

All three in full: `atlassian-rovo-dev-source-1` (coding-agent experience post),
`atlassian-rovo-dev-source-2` (code-reviewer evaluation post), and
`atlassian-rovo-dev-source-3` (HULA paper abstract page; the abstract only —
the paper body is not preserved).

### Record shape and scope

This record spans two connected systems that the captures themselves keep
distinct: the Jira coding agent built on the HULA framework (source 1, source 3)
and the Rovo Dev Code Reviewer integrated into Bitbucket (source 2). The
record's existing claims already drew from both; every disposition note names
which side it describes. The workflow reported is the Jira coding agent's
four-phase HULA run; the validation gates and the measured outcomes belong to
the code reviewer.

### Disposition decisions

- Purpose: `summary` (supported by all three captures).
- Workflow: appended `primitives.0`–`.3` from the HULA phases at source-1
  lines 46–49 (set context, plan with user refinement, code with human review,
  PR the user reviews and merges). Scope: Jira work item to reviewed pull
  request.
- Human involvement: reported from `operating_models.0` plus the three review
  points in the workflow steps; the code-reviewer side leaves accept-or-decline
  to the human reviewer (source-2 lines 76–83).
- Implementation: appended `architecture.model` (Claude 3.5 Sonnet with a
  gpt-4o-mini judge, source-2 lines 41 and 60, code-reviewer side) and
  `architecture.context_mgmt` (top-50 similar resolved work items with merged
  PR diffs as run context, source-1 lines 67–74); appended `bitbucket` to
  `architecture.interfaces` (source-2 lines 41, 83) alongside the existing
  `jira`. Sandbox, tool access, knowledge, and credentials stay unreported:
  repository selection is user-provided context rather than a documented tool
  mechanism, and the privacy statements name concerns, not credential
  handling.
- Validation: appended `primitives.4` (source-2 lines 60–70) — the gpt-4o-mini
  factual judge and the fine-tuned ModernBERT actionability filter, with the
  note that these gates belong to the code reviewer.
- Observations: appended `key_metrics.2` (30.8% median PR-cycle reduction) and
  `key_metrics.3` (35.6% fewer human-written comments) from the year-long,
  1,900+ repository evaluation (source-2 lines 16, 87–91), each with metric
  metadata naming the evaluation as the method. The two pre-existing metrics
  are confirmed strict components of the compound headline (same counts,
  periods, and scopes; nothing added) and alias it.
- Lessons: unreported. The HULA abstract says the paper draws lessons, but the
  preserved capture is the abstract page and states none; the blogs give
  design philosophy, not evaluated transferable lessons.

### Flags and deliberate exclusions

- The 97% precision / 50% recall work-item-suitability classifier (source-1
  lines 80–84) is a surrounding Jira feature, not Rovo Dev itself; not claimed.
- The 22.5% quality gain from similar-work-items context and the 41.98%
  SWE-bench full leaderboard result (source-1 lines 90–96) are benchmark
  statements about features or the public product, not internal-run
  observations; not claimed.
- The 38.70% vs 44.45% comment resolution rates (source-2 lines 93–95) were
  considered for `key_metrics` and left out: they are per-comment rates for
  the reviewer's output, secondary to the two adopted evaluation outcomes.
  Recorded here for a future pass if the observations axis grows a quality
  category use for them.
- The code reviewer's model is Claude 3.5 Sonnet; the Jira coding agent's
  model is named nowhere. The `model` field note states that boundary.

### Challenge pass

Checked each appended claim against its exact passage: the four phases carry
the review wording of the source (reviewed and/or refined, human can review,
user can review and merge) without inventing approval force; the two
evaluation figures match the percentages and the stated medians; the judge and
ModernBERT stages are two separate checks and are described as such. The
`bitbucket` interface addition is supported twice (integration and one-click
accept). No existing claim changed; `architecture.interfaces` gained a list
item at the same field path.
