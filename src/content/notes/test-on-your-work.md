---
title: Test the agent on your own work
description: Past tasks and failures can become repeatable checks.
eyebrow: 07 / Evaluation
lede: Past tasks and failures can become repeatable checks.
summary: Past tasks and failures can become repeatable checks.
readingTime: 2 min read
order: 7
publishedAt: '2026-09-11'
updatedAt: '2026-09-16'
relatedAgentIds:
  - databricks-costar
  - uber-ureview
sources:
  - id: '1'
    title: 'Databricks: Benchmarking coding agents'
    url: https://www.databricks.com/blog/benchmarking-coding-agents-databricks-multi-million-line-codebase
    note: Task construction, solution hints, and manual test review.
  - id: '2'
    title: 'Uber: uReview'
    url: https://www.uber.com/us/en/blog/ureview/
    note: Evaluation and feedback from engineers.
  - id: '3'
    title: 'Databricks: coSTAR'
    url: https://www.databricks.com/blog/costar-how-we-ship-ai-agents-databricks-fast-without-breaking-things
    note: Failure scenarios and checks on model judges.
---

<section aria-labelledby="what-the-teams-report">

## What the teams report

Databricks builds benchmark tasks from actual code changes. It removes solution details from task descriptions so the agent cannot copy the historical solution. It also keeps relevant tests separate. People check each sample. [[1]](#source-1)

The team revises tests when they reject a valid alternative solution. A useful test must check required behavior without requiring the original implementation. [[1]](#source-1)

Uber evaluates uReview with a curated benchmark and feedback from engineers. Its benchmark concerns review findings, while Databricks evaluates code changes. Their scores are not interchangeable. [[2]](#source-2)

<blockquote cite="https://www.databricks.com/blog/costar-how-we-ship-ai-agents-databricks-fast-without-breaking-things"><p>“every bug we find in production becomes a new scenario”</p></blockquote>

<p class="quote-credit">Databricks, on its coSTAR evaluation method. <a href="#source-3">[3]</a></p>

<figure class="note-diagram">
  <div class="note-flow">
    <div class="note-node"><span>01</span><strong>Past task</strong><small>Remove the solution hints</small></div>
    <span class="note-arrow" aria-hidden="true">→</span>
    <div class="note-node"><span>02</span><strong>Agent run</strong><small>Capture the result</small></div>
    <span class="note-arrow" aria-hidden="true">→</span>
    <div class="note-node note-node-accent"><span>03</span><strong>Evaluation</strong><small>Check the required properties</small></div>
  </div>
  <p class="note-diagram-tail">A new failure can become another test case.</p>
  <figcaption>Our illustration of a possible evaluation cycle. It combines ideas from the reports, not one shared implementation.</figcaption>
</figure>

</section>

<section class="note-observation" aria-labelledby="the-test-set-needs-review-too">

<p class="eyebrow">Our observation</p>

## The test set needs review too

A test case needs a clear task, an initial state, and a way to assess the result. Past work can supply these parts.

Databricks also checks model judges against human judgments in coSTAR. Agreement on a sample can reveal judge drift, but the human labels and sample still define what the check covers. [[3]](#source-3)

Past cases cannot cover every future failure. Leakage can overstate performance, narrow tests can reject valid work, and a model judge can repeat model errors.

<p class="note-question"><strong>A question for your build</strong>Which past failure must the next version avoid?</p>

</section>
