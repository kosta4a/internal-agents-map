---
title: Load tools when the task needs them
description: An agent can find a tool before it loads the details.
eyebrow: 05 / Tools and context
lede: An agent can find a tool before it loads the details.
summary: An agent can find a tool before it loads the details.
readingTime: 2 min read
order: 5
publishedAt: '2026-09-11'
updatedAt: '2026-09-16'
relatedAgentIds:
  - cloudflare-ai-stack
  - sentry-junior
sources:
  - id: '1'
    title: 'Cloudflare: Our internal AI engineering stack'
    url: https://blog.cloudflare.com/internal-ai-engineering-stack/
    note: Tool schema overhead and portal-level search.
  - id: '2'
    title: 'Sentry: Building an intern'
    url: https://cra.mr/building-an-intern/
    note: Progressive discovery and provider connections.
---

<section aria-labelledby="what-the-teams-report">

## What the teams report

Cloudflare found that tool definitions used context space before any task started. Its portal gives the model a search function over tool schemas, then an execution function for the selected tool. [[1]](#source-1)

Sentry’s Junior starts without a connection to an MCP provider. Model Context Protocol (MCP) connects agents to tools. Junior first looks up a provider, then connects and discovers that provider’s tools. [[2]](#source-2)

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
  <figcaption>Our simplified illustration of tool discovery.</figcaption>
</figure>

</section>

<section class="note-observation" aria-labelledby="more-tools-need-not-mean-more-initial-context">

<p class="eyebrow">Our observation</p>

## More tools need not mean more initial context

Both designs separate available capabilities from initial context. Cloudflare searches a schema catalog. Sentry discovers a provider before it discovers the provider’s tools.

This adds a discovery dependency. Search quality, provider availability, descriptions, and permissions can prevent the agent from reaching a usable tool.

A small tool set may not need discovery. The reports do not establish that fewer tool definitions always improve accuracy.

<p class="note-question"><strong>A question for your build</strong>Can the agent find the right tool without first reading every tool definition?</p>

</section>
