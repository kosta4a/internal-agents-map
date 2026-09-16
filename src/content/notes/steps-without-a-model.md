---
title: Some steps do not need a model
description: Code can control a step that must follow a fixed rule.
eyebrow: 06 / Workflow control
lede: Code can control a step that must follow a fixed rule.
summary: Code can control a step that must follow a fixed rule.
readingTime: 2 min read
order: 6
publishedAt: '2026-09-11'
updatedAt: '2026-09-16'
relatedAgentIds:
  - stripe-minions
  - dropbox-nova
  - posthog-stamphog
sources:
  - id: '1'
    title: 'Stripe: Minions, part 2'
    url: https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2
    note: Blueprint nodes that run without a model.
  - id: '2'
    title: 'Dropbox: Introducing Nova'
    url: https://dropbox.tech/machine-learning/introducing-nova-our-internal-platform-for-coding-agents
    note: Publication and test control outside the agent.
  - id: '3'
    title: 'PostHog: PR approval agent'
    url: https://github.com/PostHog/posthog/tree/988c9031bb93c74bafcdfb670c01497c79a4f644/tools/pr-approval-agent
    note: Pinned implementation with authoritative safety gates.
---

<section aria-labelledby="what-the-teams-report">

## What the teams report

Stripe’s blueprints combine model-directed work with ordinary code. A model can implement a task, while code runs configured checks and controls the push step. [[1]](#source-1)

Dropbox keeps code publication outside the agent. Its workflows start continuous integration (CI) checks, return failures for repair, and retain publication control in the surrounding system. [[2]](#source-2)

PostHog checks whether a pull request is eligible for agent approval. Its fixed gates remain authoritative. The model can make approval stricter but cannot relax a gate. [[3]](#source-3)

<blockquote cite="https://dropbox.tech/machine-learning/introducing-nova-our-internal-platform-for-coding-agents"><p>“not every step belongs inside the agent loop.”</p></blockquote>

<p class="quote-credit">Dropbox, on control of the workflow. <a href="#source-2">[2]</a></p>

<figure class="note-diagram">
  <div class="note-flow">
    <div class="note-node"><span>01</span><strong>Model task</strong><small>Propose a result</small></div>
    <span class="note-arrow" aria-hidden="true">→</span>
    <div class="note-node"><span>02</span><strong>Fixed check</strong><small>Apply a known rule</small></div>
    <span class="note-arrow" aria-hidden="true">→</span>
    <div class="note-node note-node-accent"><span>03</span><strong>Next step</strong><small>Proceed or return a failure</small></div>
  </div>
  <figcaption>Our illustration of a model task followed by code-controlled steps. The cases use different checks and actions.</figcaption>
</figure>

</section>

<section class="note-observation" aria-labelledby="the-rule-and-the-judgment-can-stay-separate">

<p class="eyebrow">Our observation</p>

## The rule and the judgment can stay separate

A deterministic check can enforce a known policy, such as whether a required test passed. Model judgment can assess evidence that the policy does not encode.

Publication is a separate authority boundary. Passing a test need not grant the agent permission to push, merge, or approve.

A passing check proves only its encoded condition. It does not prove that the implementation is correct or that publication is authorized.

<p class="note-question"><strong>A question for your build</strong>Which step must happen the same way on every run?</p>

</section>
