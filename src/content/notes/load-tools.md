---
title: Load tools when the task needs them
description: An agent can find a tool before it loads the details.
eyebrow: 05 / Tools and context
lede: An agent can find a tool before it loads the details.
summary: An agent can find a tool before it loads the details.
readingTime: 2 min read
order: 5
publishedAt: '2026-09-11'
relatedAgentIds:
  - cloudflare-ai-stack
  - sentry-junior
  - browserbase-bb
sources:
  - id: '1'
    title: 'Cloudflare: Our internal AI engineering stack'
    url: https://blog.cloudflare.com/internal-ai-engineering-stack/
    note: Tool schema overhead and portal-level search.
  - id: '2'
    title: 'Sentry: Building an intern'
    url: https://cra.mr/building-an-intern/
    note: Progressive discovery and provider connections.
  - id: '3'
    title: 'Browserbase: Internal agents'
    url: https://browserbase.com/blog/internal-agents
    note: Task-specific skills and a small core tool set.
---

<section aria-labelledby="what-the-teams-report">

## What the teams report

Cloudflare found that tool definitions used context space before any task started. Its portal now exposes search and execution tools instead of every definition. [[1]](#source-1)

Sentry’s Junior starts without a connection to an MCP provider. Model Context Protocol (MCP) connects agents to tools. Junior connects after the agent requests a tool lookup. [[2]](#source-2)

Browserbase loads skills for each task. These skills contain instructions for specific work. They are separate from the tools that perform actions. [[3]](#source-3)

<blockquote cite="https://cra.mr/building-an-intern/"><p>“keep the always-on surface small”</p></blockquote>

<p class="quote-credit">Sentry, on progressive tool discovery. <a href="#source-2">[2]</a></p>

<figure class="note-diagram">
  <div class="note-flow">
    <div class="note-node"><span>01</span><strong>Start small</strong><small>Core tools and instructions</small></div>
    <span class="note-arrow" aria-hidden="true">→</span>
    <div class="note-node"><span>02</span><strong>Find a tool</strong><small>Search for the capability</small></div>
    <span class="note-arrow" aria-hidden="true">→</span>
    <div class="note-node note-node-accent"><span>03</span><strong>Use the tool</strong><small>Load the required details</small></div>
  </div>
  <figcaption>Our simplified illustration of tool discovery. Skills supply instructions and may load separately.</figcaption>
</figure>

</section>

<section class="note-observation" aria-labelledby="more-tools-need-not-mean-more-initial-context">

<p class="eyebrow">Our observation</p>

## More tools need not mean more initial context

Tool discovery can separate available capabilities from the context supplied at the start of a task.

This adds a dependency: the agent must find the correct tool. A missing or unclear tool description can prevent that step.

A small tool set may not need discovery. The reports do not establish that fewer tool definitions always improve accuracy.

<p class="note-question"><strong>A question for your build</strong>Can the agent find the right tool without first reading every tool definition?</p>

</section>
