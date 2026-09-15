> Archived source snapshot  
> Source ID: `strongdm-attractor-repo`  
> Original URL: <https://github.com/strongdm/attractor>  
> Final URL: <https://github.com/strongdm/attractor>  
> Title: GitHub - strongdm/attractor: nlspec of StrongDM's Attractor, a non-interactive Coding Agent sufficient for use in a Software Factory · GitHub  
> Captured at: `2026-09-15T10:26:28Z`

---

## Attractor

This repository contains [NLSpecs](#terminology) to build your own version of Attractor to create your own software factory.

Although bringing your own agentic loop and unified LLM SDK is not required to build your own Attractor, we highly recommend controlling the stack so you have a strong foundation.

## Specs

- [Attractor Specification](https://github.com/strongdm/attractor/blob/main/attractor-spec.md)
- [Coding Agent Loop Specification](https://github.com/strongdm/attractor/blob/main/coding-agent-loop-spec.md)
- [Unified LLM Client Specification](https://github.com/strongdm/attractor/blob/main/unified-llm-spec.md)

## Building Attractor

Supply the following prompt to a modern coding agent (Claude Code, Codex, OpenCode, Amp, Cursor, etc):

```
codeagent> Implement Attractor as described by https://github.com/strongdm/attractor
```

## Terminology

- **NLSpec** (Natural Language Spec): a human-readable spec intended to be directly usable by coding agents to implement/validate behavior.
