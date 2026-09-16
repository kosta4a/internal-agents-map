> Archived source snapshot  
> Source ID: `openai-agents-api-post`  
> Original URL: <https://openai.com/index/introducing-the-agents-api/>  
> Final URL: <https://openai.com/index/introducing-the-agents-api/>  
> Title: Introducing the Agents API | OpenAI  
> Captured at: `2026-09-16T15:10:51Z`

---

Build and run cloud agents with the Codex harness, fully managed by OpenAI.

As we’ve scaled Codex and ChatGPT for Work to millions of people around the world, we’ve learned what it takes to make long-running agents work well in practice. Useful agents need a powerful harness that manages context, uses tools efficiently, and coordinates subagents. They also need infrastructure that keeps them running reliably for days, with environments where they can work with files, run code, and save intermediate results.

Today, we’re introducing the [Agents API ⁠](https://developers.openai.com/api/docs/guides/agents-api/overview) in public beta, bringing that same harness and infrastructure that powers Codex to developers through a simple, flexible API.

## What our customers are saying about Agents API

1 of 8

> “With the Agents API, our evaluation score went from 0.71 to 0.85. The subagent support in the API is great and drastically sped up our workflow. Previously it was pretty cumbersome to observe and orchestrate subagents in our old setup but the new APIs gave us a 4x latency reduction. We spent a long time trying to optimize for this and the subagent flows were a huge out-of-the-box lift.”

Jack Weissenberger, CTO, Ciridae

## Build cloud agents with a single API call

With the Agents API, you can create a production-ready agent in a single API call by specifying the task, model, tools, and environment:

#### JavaScript

```
import OpenAI from "openai";

const client = new OpenAI();

const session = await client.beta.agents.sessions.create({
  agent: {
    model: "gpt-6-astra",
    tools: [
      {
        type: "mcp",
        server_label: "observability",
        transport: {
          type: "http",
          server_url: "https://observability.example.com/mcp",
        },
      },
    ],
    multi_agent: { enabled: true, max_concurrent_subagents: 3 },
  },
  vault_ids: ["vault_YOUR_VAULT_ID"],
  environment: {
    type: "openai_hosted",
    capability_directories: ["/workspace/capabilities/skills"],
  },
  input:
    "Investigate service-api’s elevated 5xx rate over the last 30 minutes. " +
    "Delegate deployment, error, and dependency analysis to subagents. " +
    "Save findings, evidence, and recommended mitigation in /workspace/outputs.",
});
```

OpenAI hosts and maintains the harness. You choose the agent’s compute environment: in an OpenAI-managed sandbox, on your own infrastructure, or with one of our sandbox partners. The Agents API gives you a strong foundation for building agents on top of our optimized agent harness and infrastructure, so you can focus on the tools, knowledge, and workflows that make your agent unique.

Agents API powers your agents with the same harness and infrastructure behind Codex.

## Choose your agent environment

Different workloads need different compute, storage, and deployment options. The Agents API lets you choose a sandbox that fits your application.

We’re [partnering with ecosystem providers ⁠](https://developers.openai.com/api/docs/guides/agents-api/environments/self-hosted#sandbox-providers), including Blaxel, Cloudflare, Daytona, DigitalOcean, E2B, Modal, Oracle, Runloop, and Vercel, to provide first-class integrations for a range of needs:

- Fully managed environments or deployments within your VPC
- Specific file and secret storage mechanisms
- Different CPU, GPU, and memory configurations, with performance, cold-start, and cost profiles to match your company’s workflow.

The Agents API offers first-class integrations with popular ecosystem providers.

## OpenAI hosted sandboxes

For developers who want to get started quickly and scale efficiently, we’re also introducing the [OpenAI hosted sandbox ⁠](https://developers.openai.com/api/docs/guides/agents-api/environments/openai-hosted). This leverages the same sandboxing infrastructure that powers Codex and ChatGPT.

OpenAI provisions and manages the sandbox, giving your agent a secure and performant environment to run code, work with files, and produce artifacts. These sandboxes can be flexibly configured with your files, packages, skills and plugins to give the agent what it needs to complete the task.

## Build with an evolving Codex harness

Taking advantage of new model capabilities often means reworking your harness, taking valuable time away from improving your application. The Agents API provides versioned access to these capabilities with each model launch. We maintain and continuously improve the harness alongside our models, helping your agents get better performance from every upgrade. For example, recent improvements to the harness include:

### Keep agents working across long sessions

To support models working for hours, we’ve built context management that helps agents carry relevant information across longer sessions. The Agents API [automatically compacts ⁠](https://developers.openai.com/api/docs/guides/compaction) earlier context as a session approaches its context limit, preserving information the agent needs to continue. Developers can build workflows that span multiple context windows without implementing their own compaction logic.

The Agents API helps agents find the right tools and use them efficiently. [Tool search ⁠](https://developers.openai.com/api/docs/guides/tools-tool-search) loads relevant tool definitions as needed, helping reduce token usage and cost while preserving the model’s cache. Once tools are available, [programmatic tool calling ⁠](https://developers.openai.com/api/docs/guides/tools-programmatic-tool-calling) lets agents run calls in parallel, chain related operations, and filter or combine results in code so they can work through large volumes of data while bringing only the relevant results back into context. The Agents API supports MCP, custom functions, and built-in tools like web search.

#### JSON

```
"agent": {
  "tools": [
    {
      "type": "mcp",
      "server_label": "openai_docs",
      "transport": {
        "type": "http",
        "server_url": "https://developers.openai.com/mcp"
      }
    },
  ]
}
```

### Let agents parallelize work with subagents

With [multi-agent support ⁠](https://developers.openai.com/api/docs/guides/agents-api/multi-agent), the Agents API can break complex tasks into independent pieces and delegate them to subagents that work in parallel. Each subagent maintains its own context, helping it stay focused on its assignment, while the main agent coordinates their work and brings the results together. This can speed up research, analysis, and coding tasks that benefit from parallel work, without requiring you to build your own orchestration.

#### JSON

```
"agent": {
  "model": "gpt-6-astra",
  "multi_agent": {
    "enabled": true,
    "max_concurrent_subagents": 3,
  }
}
```

## An open-source foundation

The Agents API is powered by the open-source Codex harness, giving developers visibility into the core logic that coordinates model calls, tools, and context. With the Agents API, OpenAI operates and maintains that harness while developers can inspect and learn from its [public codebase ⁠](https://github.com/openai/codex).

## Start building

Agents API is available in public beta today to all developers. There are no additional fees for using the Agents API – you simply pay for the tokens and tools your agents use, as outlined on our [pricing page ⁠](https://developers.openai.com/api/docs/pricing).

Explore the [Agents API overview ⁠](https://developers.openai.com/api/docs/guides/agents-api/overview) to learn more, or follow the [quickstart ⁠](https://developers.openai.com/api/docs/guides/agents-api/quickstart) to get started and bring the harness behind Codex into your own agents.

During the public beta, we’ll iterate quickly based on your feedback as we work toward general availability. Let us know what’s working, where you’re running into friction, and what you need to build and run your agents in production.
