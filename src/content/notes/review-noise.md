---
title: More comments can mean more work
description: How Uber and HubSpot filter agent review comments. An observation on useful findings and the work required from human reviewers.
eyebrow: 02 / Human attention
lede: A review agent also creates work for its reader.
summary: Uber and HubSpot check review comments before engineers see them.
readingTime: 2 min read
order: 2
publishedAt: '2026-09-11'
relatedAgentIds:
  - uber-ureview
  - hubspot-sidekick
sources:
  - id: uber
    title: 'Uber: uReview'
    url: https://www.uber.com/us/en/blog/ureview/
    note: Quality filters, duplicate removal, and feedback from engineers.
  - id: hubspot
    title: 'HubSpot: Sidekick code review'
    url: https://product.hubspot.com/blog/automated-code-review-the-6-month-evolution
    note: The change to Aviator and the judge agent.
---

<section aria-labelledby="what-the-teams-report">

## What the teams report

Uber found that a single prompt produced false alarms and valid comments with little value. Its uReview system checks confidence and removes duplicate comments. It also suppresses categories that engineers rarely use. [[1]](#source-uber)

<blockquote cite="https://www.uber.com/us/en/blog/ureview/"><p>“Precision Is More Valuable than Volume”</p></blockquote>

<p class="quote-credit">A section title in Uber’s uReview report. <a href="#source-uber">[1]</a></p>

HubSpot made its reviewer faster, but review quality remained a problem. It added a judge agent to check comments before publication. [[2]](#source-hubspot)

<figure class="note-diagram">
  <div class="note-flow">
    <div class="note-node"><span>01</span><strong>Find</strong><small>Possible issues</small></div>
    <span class="note-arrow" aria-hidden="true">→</span>
    <div class="note-node note-node-accent"><span>02</span><strong>Filter</strong><small>Check the evidence</small></div>
    <span class="note-arrow" aria-hidden="true">→</span>
    <div class="note-node"><span>03</span><strong>Review</strong><small>Human attention</small></div>
  </div>
  <figcaption>Our simplified illustration. Both teams check comments before publication; their checks differ.</figcaption>
</figure>

</section>

<section class="note-observation" aria-labelledby="measure-the-work-after-the-output">

<p class="eyebrow">Our observation</p>

## Measure the work after the output

Comment count shows how much an agent writes. It does not show how much useful work the team completes.

A useful evaluation can track accepted findings, review time, and missed defects. A filter can reduce noise and still remove a real issue.

A model judge can also make mistakes. The reports do not establish that an extra agent always improves a review.

<p class="note-question"><strong>A question for your build</strong>Does each additional comment save more work than it creates?</p>

</section>
