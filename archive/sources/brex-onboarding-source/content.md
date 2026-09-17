> Archived source snapshot  
> Source ID: `brex-onboarding-source`  
> Original URL: <https://www.brex.com/journal/rebuilding-onboarding-ai-native>  
> Final URL: <https://www.brex.com/journal/rebuilding-onboarding-ai-native>  
> Title: The end of the trade-off: How AI agents broke the onboarding trilemma  
> Captured at: `2026-09-17T18:23:35Z`

---

[

Blog

](https://www.brex.com/journal)[

Building Brex

](https://www.brex.com/journal)

The end of the t...[Building Brex](https://www.brex.com/journal)

### The end of the trade-off: How AI agents broke the onboarding trilemma

Camilla Matias Morais

·

Jan 20, 2026

Jan 20, 2026

*While the rest of the industry is still debating whether AI can drive real-world operational efficiency, Brex rebuilt onboarding as an AI-native, multi-agent system. AI allows us to onboard customers in minutes, while also improving accuracy and scale.*

## Raising the bar on speed

Onboarding is our customers’ first experience with Brex — the moment to establish trust.

But for a long time, it could take days. While that was fast by traditional banking standards, it wasn’t fast enough for the speed at which our customers move. The bottleneck wasn't a lack of rigor; it was that our Know Your Customer (KYC) and underwriting processes were still reliant on manual judgment and implicit heuristics. This created a ceiling on our velocity and scalability.

As builders, we believe great systems shouldn’t ask good businesses to wait. If the technology exists to make correct decisions faster, then waiting days isn’t a technical constraint; it’s a design choice.

Today, most eligible businesses onboard to Brex in minutes.

We got there by rebuilding our onboarding flows as an AI-native, multi-agent system, where specialized agents collaborate through structured reasoning.

This post explains how we did it, the results, and where we're headed next.

## Refusing to sacrifice accuracy

KYC and underwriting exist to protect customers, partners, and the financial ecosystem by making accurate, defensible decisions. But traditional approaches force a tradeoff: move fast, and you risk missing signals; be thorough, and good customers wait days.

Our analysts were doing exceptional work. They were verifying entities, tracing ownership, reviewing financials, and identifying fraud patterns across fragmented tools. However, the process relied heavily on implicit institutional logic and manual "checkboxing" that was difficult to scale. Because much of the reasoning was rooted in individual experience rather than a unified digital system, the results were often siloed.

We realized that to break this cycle, we didn’t need to replace the rigor of our analysts; we needed to encode their judgment into a system that could execute it with the same — or better — accuracy in seconds, not days.

## Encoding human judgment at scale

We started by studying how our analysts worked. We watched them make decisions and asked them to narrate their thoughts. We documented everything that had never been written down: what signals they trusted, what they overvalued, and what they ignored. We mapped the moments where human intuition got it right and the moments where it failed.

From there, we built a massive dataset covering every type of customer we had ever seen. Every case was re-reviewed and labeled under a stricter standard. That dataset became our benchmark. The internal bar we set for agentic performance was strict:

- Catch every bad actor humans catch and more they historically miss
- Never reject a customer that a human would approve
- Always explain why a decision was made

The goal was to capture the best of human decision-making, correct its weaknesses, and encode it into something teachable.

## First principles for building a multi-agent system for onboarding

We built a modular, distributed architecture where specialized agents own distinct reasoning domains and can be improved independently.

A few principles anchored every decision as we built:

**Every approval or rejection must leave a clear reasoning trail**. Customers deserve to know why a decision was made.

**Agents must be able to say they're not sure**. Humans do this naturally by asking a colleague for a second opinion. Agents needed the same humility.

**The system had to be repeatable**. If we ran the same application through the pipeline twice, it should produce the same outcome both times. Consistency is how we know a process is reasoning rather than guessing.

Each agent is narrowly scoped, auditable, and explicit about both what it knows and what it doesn't. Agents exchange structured claims, supporting evidence, and confidence levels. This enables deterministic execution, replayable pipelines, and full auditability.

## How the onboarding agents work together

At a high level, our onboarding agents include:

- **Segmentation agents:** These agents leverage data sources like LinkedIn (via Clay), company website, and application information to determine at the very start of the application if a startup is either already professionally invested (PI) or likely to eventually receive professional investment.
- **Verification & OCR agents:** Specialized sub-agents automatically process and validate high-friction documents in real time. This includes an **OCR & classification agent** that verifies proof of address, articles of incorporation, SAFEs, and bank statements with high precision, allowing for instant auto-approval of previously manually reviewed documents.
- **Identity & fraud agents:** Beyond simple identity checks, these agents evaluate behavioral signals and anomalies. A dedicated **fuzzy-match agent** resolves name mismatches on IDs (e.g., "Johnny" vs. "John"), which has successfully reduced manual identity reviews by 70%.
- **Underwriting (UW) agents:** These agents reconstruct a company's financial profile by automatically qualifying and mapping applicants to UW segment policies.
- **Decision agent (orchestration layer)** A final decision agent synthesizes evidence, confidence scores, and Brex policy into a single outcome. When confidence is high, decisions are made instantly. When confidence falls below a defined threshold (e.g., when data sources conflict) the case is escalated to a human analyst. Those human decisions are then fed back into the system as supervised signals, continuously improving calibration and accuracy over time. Human-in-the-loop isn’t a fallback — it’s how reliability compounds.

## The impact of agents: faster, better decisions at higher volume

Before intelligent automation, improving speed or accuracy almost always meant sacrificing the other — or adding Operations headcount to compensate. Faster decisions reduced accuracy. Higher accuracy slowed throughput. Scale required linear staffing.

By rebuilding onboarding as an AI-native, multi-agent system, we removed that constraint. Decisions are now **faster**, **more accurate**, and able to handle **meaningfully higher volume at the same time** with no shortcuts, no hidden risk, and no linear staffing curve.

Across all customer segments, AI-native onboarding shifts outcomes *up and to the right*: better accuracy at faster speeds, with greater scale.

The impact is most pronounced in the small business segment, where application volume is highest and manual processes historically created the most friction. That’s where automation delivers the largest lift.

Importantly, the gains are consistent across **startups, upmarket, and commercial** as well. As complexity increases, agents apply repeatable, auditable judgment to sustain fast decisioning and high accuracy without slowing down.

The system adapts to complexity while preserving consistency and explainability across every segment. Together, these results reinforce a simple idea: when reasoning is explicit, auditable, and designed to defer when uncertain, speed doesn’t erode trust. It compounds it.

## What we learned

Onboarding that once took multiple analysts and several days now happens in minutes. But the biggest shift isn't speed; it's codification of excellence. By pairing our deep-domain SMEs with our AI engineers in a tight feedback loop, we’ve ensured that the "instinct" of our best analysts is now built into the foundation of the system.

A few things proved critical:

- **The power of the SME + builder partnership:** We moved past the traditional "requirements document" handoff. Instead, our risk analysts and engineers worked as a single unit to translate complex institutional logic into agentic workflows. This partnership allowed us to move from **0% to 40% auto-approval** of card applications in weeks, because the "builders" understood the "why" behind every risk decision.
- **Specialized agents outperform general ones.** Narrow scope means clearer accountability and easier iteration. By building dedicated agents for specific friction points, we achieved an 85% reduction in business address RFIs. Narrow accountability makes the system easier to debug and faster to iterate.
- **Deferral is a feature, not a flaw.** Teaching agents to say "I'm not sure" reduced errors on both sides. This "human-in-the-loop" design allowed analysts to focus on high-judgment edge cases rather than repetitive data entry.
- **Governance must live inside the system.** Auditability, privacy boundaries, and policy enforcement can't be bolted on later. Because every agent’s reasoning is inspectable, each human intervention doesn't just solve one case, it creates a labeled data point that sharpens future automation.

## What comes next

Looking ahead, we're focused on three priorities:

**Instant onboarding for more customers**. We're expanding the reach of the system so even more businesses can be verified, underwritten, and onboarded in minutes.

**Risk and governance that scale with automation**. We continue to invest in risk controls, calibration, and auditability with the same rigor we'd apply if every decision were made manually.

**Extending agentic patterns beyond onboarding**. The same approaches of structured reasoning, human-in-the-loop escalation, replayable decisions, and continuous learning are being applied to other workflows across Brex, wherever judgment and scale intersect.

Onboarding has always been where the relationship begins. Now, it's as fast as the businesses we serve.
