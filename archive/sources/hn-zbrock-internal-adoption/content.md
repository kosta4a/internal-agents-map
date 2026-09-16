> Archived source snapshot  
> Source ID: `hn-zbrock-internal-adoption`  
> Original URL: <https://news.ycombinator.com/item?id=48435213>  
> Final URL: <https://news.ycombinator.com/item?id=48435213>  
> Title: 1. Yes! Many teams internally have adopted a lot of the same practices we outlin... | Hacker News  
> Captured at: `2026-09-16T15:10:44Z`

---

**zbrock** · 2026-06-07

1\. Yes! Many teams internally have adopted a lot of the same practices we outlined in the blog post. Ryan has also been spending time both internally and externally helping companies figure out how to do this in their code bases.

2\. Hmm, kind of. There have definitely been issues the models can’t one shot. But we still use Codex to write all the actual code with human guidance.

3\. More agents :) Some teams are experimenting with centralized Agent mediated integration queues, others use normal merge queues, many have local Codex threads that monitor CI to resolve and land conflicts or failures.

4\. Today’s models and codex app. We started doing all this with gpt-5 and codex-cli. The tools today, 9 months later, are so much better than what we had then.

---

## Comments

> **HorizonXP** · [2026-06-07](https://news.ycombinator.com/item?id=48435312)
> 
> Have you built any tooling or products around all of this and deploying it somehow? I’d love to learn more and share notes, because we’ve been doing this too. About 3100+ PRs merged across our 4 person team in 4 months. Impossible without harness engineering, and I agree, the tools are getting even better.
