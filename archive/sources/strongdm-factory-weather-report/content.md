> Archived source snapshot  
> Source ID: `strongdm-factory-weather-report`  
> Original URL: <https://factory.strongdm.ai/weather-report>  
> Final URL: <https://factory.strongdm.ai/weather-report>  
> Title: Weather Report | StrongDM Software Factory  
> Captured at: `2026-09-15T10:26:22Z`

---

## Weather Report

What models we're running today, how they're configured, and what role each one plays in the factory.

**Why do we publish The Weather Report?** The Weather Report started out as a casual internal summary of how each provider and model was performing on our most important use cases. We update it frequently and have found it essential to our process.

As of June 4th, 2026

Moved to gpt-5.5 across our OpenAI text/code defaults: CS/Math, Frontend Architecture, Architectural Critique, Security review, and the Sprint Planning consensus pair. Bumped the consensus Opus to opus-4.8. DevOps Tasks and QA Orchestration came off opus-4.7/max onto gpt-5.5 at default params, which is good enough there. Voice bumped gpt-realtime-1.5 to gpt-realtime-2. Heads up: Google updated gemini-3-flash-preview to be Gemini 3.5 Flash under the same model ID, so Image comprehension and Agentic dialogues get the upgrade for free. If you haven't already switched to using codex/gpt-5.5 as your defaults everywhere, this is a good time to do that. Gemini 3.5 Flash, while a solid agentic model and good for small tasks, does still sometimes end up in a tool call loop. Opus 4.8 is good when you need input from another model, but I would not daily drive anything with it right now; it burns too many tokens. The default for everyday tasks should be gpt-5.5 on low/medium before you bump up the reasoning. Modified: CS/Math Hard Problems, Frontend Aesthetics, Frontend Architecture, Architectural Critique, Sprint Planning, Devops Tasks, QA Orchestration, Security review, Image comprehension, Agentic dialogues, Voice (interactive). Added: Copy / Writing.

| Use | Models (by preference) | Parameters | Notes |
| --- | --- | --- | --- |
| CS/Math Hard Problems  Jun 4 | gpt-5.5 | default |  |
| Image comprehension  Jun 4 | gemini-3-flash-preview | default | Google updated this preview to Gemini 3.5 Flash (same model ID) |
| Frontend Aesthetics  Jun 4 | opus-4.8 | max | Sticking with max thinking |
| Frontend Architecture  Jun 4 | gpt-5.5 | default |  |
| Architectural Critique  Jun 4 | gpt-5.5 | extra high |  |
| Sprint Planning  Jun 4 | consensus(opus-4.8, gpt-5.5) | max / extra high | Gemini can improve consensus in some cases |
| Devops Tasks  Jun 4 | gpt-5.5 | default | Default is good enough for gpt-5.5 |
| QA Orchestration  Jun 4 | gpt-5.5 | default | Default is good enough for gpt-5.5 |
| Security review  Jun 4 | gpt-5.5 | high |  |
| Bulk classification  Feb 6 | Any | default | Go up cost and strength as needed |
| Bulk MapReduce  Feb 6 | Any | default | Go up cost and strength as needed |
| UX Ideation  Apr 21 | gpt-image-2 | default | ChatGPT Images 2.0 |
| Copy / Writing  Jun 4 | opus-4.8 | default |  |
| Agentic dialogues  Jun 4 | gemini-3-flash-preview | default | General message handling loops with user interaction and limited tool calling. Now Gemini 3.5 Flash. |
| Voice (interactive)  Jun 4 | gpt-realtime-2 | default | Internal use; not yet an official default |

*Consensus* operator refers to an LLM merge of the points from independent plans.

## Log

June 4th, 2026

Moved to gpt-5.5 across our OpenAI text/code defaults: CS/Math, Frontend Architecture, Architectural Critique, Security review, and the Sprint Planning consensus pair. Bumped the consensus Opus to opus-4.8. DevOps Tasks and QA Orchestration came off opus-4.7/max onto gpt-5.5 at default params, which is good enough there. Voice bumped gpt-realtime-1.5 to gpt-realtime-2. Heads up: Google updated gemini-3-flash-preview to be Gemini 3.5 Flash under the same model ID, so Image comprehension and Agentic dialogues get the upgrade for free. If you haven't already switched to using codex/gpt-5.5 as your defaults everywhere, this is a good time to do that. Gemini 3.5 Flash, while a solid agentic model and good for small tasks, does still sometimes end up in a tool call loop. Opus 4.8 is good when you need input from another model, but I would not daily drive anything with it right now; it burns too many tokens. The default for everyday tasks should be gpt-5.5 on low/medium before you bump up the reasoning. Modified: CS/Math Hard Problems, Frontend Aesthetics, Frontend Architecture, Architectural Critique, Sprint Planning, Devops Tasks, QA Orchestration, Security review, Image comprehension, Agentic dialogues, Voice (interactive). Added: Copy / Writing.

April 21st, 2026

Switched UX Ideation from gemini-3-pro-image-preview (Nano Banana Pro) to gpt-image-2 (ChatGPT Images 2.0). Modified: UX Ideation.

April 20th, 2026

Bumped opus-4.6 → opus-4.7 across our Anthropic defaults. We're seeing discrepancies with opus-4.7's adaptive thinking, so we're sticking with max thinking for now. gpt-5.3-codex remains our default implementation model — we've evaluated alternatives but haven't found a reason to switch.

March 12th, 2026

gpt-5.4 has been formally adopted for planning and architectural critique. It replaces gpt-5.2 in our Sprint Planning consensus pair and Architectural Critique. Gemini can improve consensus in some cases for sprint planning. We're continuing to evaluate gpt-5.4 for implementation tasks but keeping gpt-5.3-codex as our default implementation model for now.

February 23rd, 2026

No specific changes in defaults, but please note for anyone evaluating Gemini 3.1, the gemini-3.1-pro-preview-customtools may significantly outperform gemini-3.1-pro-preview depending on your harness. We've switched to gpt-realtime-1.5 for our internal use cases but aren't officially defaulting to it yet. Very happy with Sonnet 4.6, it may overtake Opus for some of our everyday use cases.

February 13th, 2026

Happy with gpt-5.3-codex-spark. gpt-5.3-codex continues to be our preferred default implementation model with critiques and suggestions from Opus. Modified: Sprint Planning. Added: UX Ideation, Agentic dialogues, Voice (interactive).

February 6th, 2026

New models this week. We're very happy with gpt-5.3-codex. No problems with Opus 4.6 so far.
