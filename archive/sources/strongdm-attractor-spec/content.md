> Archived source snapshot  
> Source ID: `strongdm-attractor-spec`  
> Original URL: <https://factory.strongdm.ai/products/attractor>  
> Final URL: <https://factory.strongdm.ai/products/attractor>  
> Title: Attractor | StrongDM Software Factory  
> Captured at: `2026-09-15T10:26:17Z`

---

Attractor is our implementation of a non-interactive coding agent.

It composes models, prompts, and tools into a graph-structured pipeline. It is designed to operate end-to-end once the work is fully specified.

## Graph Structure

> "
> 
> Attractor is structured as a graph of nodes, forming a generative SDLC.

Each node corresponds to a phase of work and is governed by a core prompt (e.g. "implement the functionality", "identify the bottleneck").

### Example Nodes

I

Implement

"Implement the functionality"

## Natural Language Edges

Edges between nodes are expressed in natural language and **evaluated by the LLM**.

#### Example Edges

Proceed Edge

"Proceed once a bottleneck is identified"

Judged Branch

"Take this edge if the copywriting standards have been met"

"Take this edge if we need to request an exception to the standards"

## Execution Model

Execution consists of **traversing this graph** until convergence or termination conditions are met.

S

→

I

→

O

→

V

→

✓

<svg width="280" height="48" viewBox="0 0 280 48" fill="none" style="margin:4px auto 0;display:block"><defs><marker id="loopArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#888"></polygon></marker></defs><path d="M 230 4 C 230 38, 50 38, 50 4" stroke="#888" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#loopArrow)"></path><text x="140" y="42" text-anchor="middle" fill="currentColor" font-size="11">loop back</text></svg>

Start → Implement → Optimize → Validate → Complete

#### Key Properties

- Deterministic given the same inputs
- Observable at every node transition
- Resumable from any checkpoint
- Composable with other graphs

## Community Implementations

The Attractor spec is open. These are implementations built by the community.

| Project | Language | Description |
| --- | --- | --- |
| [Fabro](https://github.com/fabro-sh/fabro)  by Bryan Helmkamp | Rust | An open-source workflow orchestration platform for AI coding agents — defines processes as Graphviz DOT graphs with branching, loops, and human approval gates, routes models via CSS-like stylesheets, runs in cloud sandboxes via Daytona VMs, and ships as a single Rust binary with git checkpointing and automatic retrospectives. |
| [Kilroy](https://github.com/danshapiro/kilroy)  by Dan Shapiro | Go | A local-first CLI that converts English-language requirements into Attractor pipelines and executes them step-by-step using tool-equipped coding agents in isolated git worktrees. |
| [Forge](https://github.com/smartcomputer-ai/forge)  by Luke Buehler | Rust | A spec-first Rust library implementing the Attractor specification as layered crates — a unified multi-provider LLM client and a coding-agent loop — with deterministic conformance testing across providers. |
| [samueljklee's Attractor](https://github.com/samueljklee/attractor)  by Samuel Lee | Python | A comprehensive Python implementation claiming 100% spec coverage — features a custom recursive-descent DOT parser, 9 node types, middleware-chain LLM client, HTTP server with SSE streaming, cooperative cancellation, and a goal-gate circuit breaker for safe autonomous iteration. |
| [coreydaley's Attractor](https://github.com/coreydaley/attractor)  by Corey Daley | Java | A Java 25 pipeline orchestration engine built with Gradle — multi-provider LLM support (Claude, GPT, Gemini, custom endpoints), human-in-the-loop approval gates, conditional branching with fan-out/fan-in parallelism, persistent checkpointing to SQLite/MySQL/PostgreSQL, a 37-endpoint REST API, and an SSE-powered web dashboard with Docker deployment. |
| [F#kYeah](https://github.com/TheFellow/fkyeah)  by TheFellow | F# | An F# pipeline execution engine targeting.NET 10 — three libraries (Attractor engine, unified multi-provider LLM client, coding agent) with CSS-like stylesheets for LLM routing, automatic retry loops with goal gates, full checkpoint/resume, and 317 tests across three test projects. |
| [attractor-php](https://github.com/jaytaylor/attractor-php) / [attractor-tcl](https://github.com/jaytaylor/attractor-tcl)  by Jay Taylor | PHP / Tcl | PHP and Tcl implementations of the Attractor spec layers — including unified multi-provider LLM clients, autonomous coding-agent loops, and DOT-based pipeline runners for software-factory workflows. |
| [anishkny's Attractor](https://github.com/anishkny/attractor)  by Anish Karandikar | Python | A Python pipeline execution framework that interprets DOT-syntax directed graphs with a handler-based architecture — supporting human-in-the-loop gates, parallel branches, checkpoint recovery, and an HTTP server with Server-Sent Events streaming. |
| [attractor-pi-dev](https://github.com/jhugman/attractor-pi-dev)  by jhugman | TypeScript | A TypeScript monorepo structured as three workspace packages — core engine, pi.dev LLM backend, and CLI — with a backend-agnostic CodergenBackend interface that lets providers be swapped without touching the execution engine. |
| [attractor-scala](https://github.com/bencivjan/attractor-scala)  by Ben Civjan | Scala | A Scala 3 pipeline orchestration engine built on cats-effect and fs2 — type-safe concurrency via IO monads, stream processing with automatic backpressure, sealed-trait pattern matching, and an immutable case-class architecture implementing the full Attractor spec with a provider-agnostic LLM client. |
| [attractor-ruby](https://github.com/bborn/attractor-ruby)  by Bruno Bornsztein | Ruby | A Ruby gem implementing all three Attractor spec layers — a provider-agnostic LLM client, an autonomous agent loop with dev tools, and a DOT-based pipeline orchestrator with conditional branching, parallel execution, and a five-step edge-selection algorithm. |
| [Arc](https://github.com/point-labs-dev/arc)  by Point Labs | TypeScript | A spec-driven DOT pipeline engine that coordinates AI coding agents — uses convergence loops where specifications drive verification, with fresh context windows per attempt, persistent learnings from failures, holdout test scenarios, Effect.ts error handling, and a web dashboard for monitoring. |
| [attractor-c](https://github.com/jmccarthy/attractor-c)  by Justin McCarthy | C | A pure C11 implementation compiling to a static library and CLI binary — includes a hand-written DOT parser, multi-provider LLM client over libcurl, and self-referential validation pipelines that use Attractor to audit its own spec compliance. |
| [SoulCaster](https://github.com/johnnyhchen/soulcaster)  by Johnny Chen | C# | A C# implementation of the Attractor spec with a DOT-based pipeline engine, an agentic coding loop, and a unified multi-provider LLM client supporting Anthropic, OpenAI, and Gemini. |
| [attractor-rb](https://github.com/aliciapaz/attractor-rb)  by aliciapaz | Ruby | A Ruby DOT-based workflow orchestration engine for AI-driven development — parses Graphviz DOT files into directed graphs with LLM execution, human approval gates, conditional branching, parallel fan-out/fan-in, automatic retries, checkpointing, and 13 built-in linting rules for pipeline validation. |
| [amolstrongdm's Attractor](https://github.com/amolstrongdm/attractor)  by Amol Kabe | Python | A multi-agent Software Factory that replaces pass/fail testing with probabilistic satisfaction scoring — orchestrates specialized agents (Coding, Validator, Debugger, Planner) against holdout scenario sets and Digital Twin API replicas to iterate autonomously toward a confidence threshold. |
| [attractor-software-factory](https://github.com/az9713/attractor-software-factory)  by az9713 | Python | A clone of strongdm/attractor with extensive documentation and 5 new DOT pipeline blueprints — demonstrates the software factory concept with ready-to-run blueprints for login pages, REST APIs, CLI tools, landing pages, data pipelines, and static site generators. |
| [Dark Factory](https://github.com/DeepCreative/dark-factory)  by DeepCreative | Python | A Kubernetes-native Dark Factory pipeline for the Bravo Zero platform — implements Judge-01 Scenario Eval with trained D3N models, plus phased Spec Engine, Attractor, Scenario Executor, and DTU Controller components per ADR-151. |
