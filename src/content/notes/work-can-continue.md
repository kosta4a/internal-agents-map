---
title: The worker can stop. The work can continue.
description: A new worker can continue from a saved record.
eyebrow: 04 / Work state
lede: A new worker can continue from a saved record.
summary: A new worker can continue from a saved record.
readingTime: 2 min read
order: 4
publishedAt: '2026-09-11'
updatedAt: '2026-09-16'
relatedAgentIds:
  - shopify-internal-agents
  - sentry-junior
  - sierra-pinecone
sources:
  - id: '1'
    title: 'Shopify: Under the River'
    url: https://shopify.engineering/under-the-river
    note: The session record and disposable workers.
  - id: '2'
    title: 'Sentry: Building an intern'
    url: https://cra.mr/building-an-intern/
    note: Pauses and continuation tasks before timeouts.
  - id: '3'
    title: 'Sierra: Agency'
    url: https://sierra.ai/es/blog/agency-secure-scalable-sandboxes-for-agents
    note: Checkpoints and event replay after inactivity.
---

<section aria-labelledby="what-the-teams-report">

## What the teams report

Shopify keeps the conversation and session record in Postgres. A worker can stop, and a new worker can read the same history under the same session identity. [[1]](#source-1)

Sentry’s Junior pauses before a serverless timeout. It places a continuation task in a queue so another run can continue. The report describes task continuation, not recovery of every local file. [[2]](#source-2)

Sierra uses checkpoints and ordered events to restore a runner after inactivity. Event replay can restore recorded state; it cannot infer an external action that was never recorded. [[3]](#source-3)

<blockquote cite="https://shopify.engineering/under-the-river"><p>“Cells die, sandboxes die, machines die. The conversation doesn't.”</p></blockquote>

<p class="quote-credit">Shopify, on session survival. <a href="#source-1">[1]</a></p>

<figure class="note-diagram">
  <div class="note-flow">
    <div class="note-node"><span>01</span><strong>Worker A</strong><small>Reads and updates the record</small></div>
    <span class="note-arrow" aria-hidden="true">→</span>
    <div class="note-node"><span>02</span><strong>Worker stops</strong><small>Saved state remains</small></div>
    <span class="note-arrow" aria-hidden="true">→</span>
    <div class="note-node note-node-accent"><span>03</span><strong>Worker B</strong><small>Reads the saved state</small></div>
  </div>
  <p class="note-diagram-tail">The saved record exists outside the worker.</p>
  <figcaption>Our illustration of work that survives a worker stop. Each team saves and restores different state.</figcaption>
</figure>

</section>

<section class="note-observation" aria-labelledby="a-saved-record-needs-a-clear-scope">

<p class="eyebrow">Our observation</p>

## A saved record needs a clear scope

A conversation, a workspace file, and an action in another system are different kinds of state. Each needs its own record and recovery method.

Conversation history can restore the exchange. Durable storage can restore a file. An idempotency key or receipt can establish whether an external action completed.

The reports preserve different records, so “resume” has no single scope across these systems.

<p class="note-question"><strong>A question for your build</strong>What must the next worker know before it can continue?</p>

</section>
