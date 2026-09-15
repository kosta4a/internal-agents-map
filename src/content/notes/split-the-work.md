---
title: Separate the search from the check
description: DoorDash changed how its agents divide a code review. An observation on shared context, investigation, and verification.
eyebrow: 03 / Agent roles
lede: The division of work can matter more than the number of agents.
summary: DoorDash changed how its agents divide a code review. Each design exposed a different problem.
readingTime: 2 min read
order: 3
publishedAt: '2026-09-11'
relatedAgentIds:
  - doordash-code-review
sources:
  - id: doordash
    title: 'DoorDash: How we built an AI code reviewer'
    url: https://careersatdoordash.com/blog/doordash-built-an-ai-code-reviewer-engineers-actually-listen-to/
    note: The “How we got here” section describes all three designs.
---

<section aria-labelledby="what-doordash-reports">

## What DoorDash reports

DoorDash first used specialist reviewers. They found local errors but missed problems across system boundaries.

The next design used two reviewers with broader context. Each had too much to check, and some findings were lost.

The third design added a scout. It identifies possible issues. Two reviewers then investigate those issues. [[1]](#source-doordash)

<blockquote cite="https://careersatdoordash.com/blog/doordash-built-an-ai-code-reviewer-engineers-actually-listen-to/"><p>“The lead scout's job isn't to verify anything.”</p></blockquote>

<p class="quote-credit">DoorDash, on the scout’s role. <a href="#source-doordash">[1]</a></p>

<figure class="note-diagram">
  <div class="note-versions">
    <div><span class="diagram-number">Version 1</span><strong>Specialists</strong><p>Narrow context</p></div>
    <div><span class="diagram-number">Version 2</span><strong>Broad reviewers</strong><p>Too much to check</p></div>
    <div class="note-version-current"><span class="diagram-number">Version 3</span><strong>Scout → Reviewers</strong><p>Find leads, then verify</p></div>
  </div>
  <figcaption>Our illustration of the three reported designs. The sequence does not represent measured performance.</figcaption>
</figure>

</section>

<section class="note-observation" aria-labelledby="each-role-needs-a-clear-result">

<p class="eyebrow">Our observation</p>

## Each role needs a clear result

A possible issue and a verified issue are different results. Separate roles can make that difference explicit.

This design may help when a broad search precedes a detailed check. It may add unnecessary work when one agent can complete both steps.

This is one team’s report. It does not prove that three agents are better than two.

<p class="note-question"><strong>A question for your build</strong>What must each agent produce before the next agent can use its result?</p>

</section>
