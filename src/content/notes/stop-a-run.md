---
title: When should an agent stop?
description: Stripe, Dropbox, and DoorDash use different limits for failed agent runs. An observation on retries, time limits, and useful results.
eyebrow: 01 / Run limits
lede: A failed run can still produce useful work.
summary: A failed run can still produce useful work. Stripe, Dropbox, and DoorDash use different limits.
readingTime: 2 min read
order: 1
publishedAt: '2026-09-11'
relatedAgentIds:
  - stripe-minions
  - dropbox-nova
  - doordash-code-review
sources:
  - id: stripe
    title: 'Stripe: Minions, part 2'
    url: https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2
    note: CI checks and the return to a human operator.
  - id: dropbox
    title: 'Dropbox: Introducing Nova'
    url: https://dropbox.tech/machine-learning/introducing-nova-our-internal-platform-for-coding-agents
    note: Deflaker and its capped fix attempts.
  - id: doordash
    title: 'DoorDash: How we built an AI code reviewer'
    url: https://careersatdoordash.com/blog/doordash-built-an-ai-code-reviewer-engineers-actually-listen-to/
    note: Repeated requests and per-agent deadlines.
---

<section aria-labelledby="what-the-teams-report">

## What the teams report

Stripe limits Minions to two rounds of continuous integration (CI) checks. It then returns the branch to a person. More attempts cost time and compute. [[1]](#source-stripe)

Dropbox uses a different limit for Deflaker, its tool to repair unstable tests. It carries notes and test logs between attempts. It stops after a successful fix or five attempts. [[2]](#source-dropbox)

<blockquote cite="https://careersatdoordash.com/blog/doordash-built-an-ai-code-reviewer-engineers-actually-listen-to/"><p>“A turn counter is not a progress detector.”</p></blockquote>

<p class="quote-credit">DoorDash, on a repeated request that did not advance the turn counter. <a href="#source-doordash">[3]</a></p>

DoorDash added deadlines for each agent. A soft deadline requests verified findings. A hard deadline stops the agent. [[3]](#source-doordash)

<figure class="note-diagram">
  <div class="note-flow">
    <div class="note-node"><span>01</span><strong>Attempt</strong><small>Make a change</small></div>
    <span class="note-arrow" aria-hidden="true">→</span>
    <div class="note-node"><span>02</span><strong>Check</strong><small>Inspect the result</small></div>
    <span class="note-arrow" aria-hidden="true">→</span>
    <div class="note-node note-node-accent"><span>03</span><strong>Stop or retry</strong><small>Apply the run limit</small></div>
  </div>
  <p class="note-diagram-tail">At the limit → Save the work and explain the failure.</p>
  <figcaption>Our illustration of a possible control flow. Each source uses different checks and limits.</figcaption>
</figure>

</section>

<section class="note-observation" aria-labelledby="the-limit-needs-a-useful-exit">

<p class="eyebrow">Our observation</p>

## The limit needs a useful exit

An attempt limit and a time limit address different failures. Neither limit explains what the next person needs.

A useful exit can include the current work, failed checks, and a reason to stop. This is a design proposal, not a shared implementation.

The cases do not establish one correct retry count.

<p class="note-question"><strong>A question for your build</strong>What will a person receive if the next attempt fails?</p>

</section>
