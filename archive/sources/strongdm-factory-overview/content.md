> Archived source snapshot  
> Source ID: `strongdm-factory-overview`  
> Original URL: <https://factory.strongdm.ai/>  
> Final URL: <https://factory.strongdm.ai/>  
> Title: StrongDM Software Factory  
> Captured at: `2026-09-15T10:25:58Z`

---

We built a **Software Factory**: non-interactive development where specs + scenarios drive agents that write code, run harnesses, and converge without human review.

The narrative form is included below. If you'd prefer to work from first principles, I offer a few constraints & guidelines that, applied iteratively, will accelerate any team toward the same intuitions, convictions [^1], and ultimately a factory [^2] of your own. In kōan or mantra form:

- Why am I doing this? (implied: the model should be doing this instead)

In rule form:

- Code **must not be** written by humans
- Code **must not be** reviewed by humans

Finally, in practical form:

- If you haven't spent at least **$1,000 on tokens today** per human engineer, your software factory has room for improvement

## The StrongDM AI Story

On July 14th, 2025, Jay Taylor and Navan Chauhan joined me (Justin McCarthy, co-founder, CTO) in founding the StrongDM AI team.

The catalyst was a transition observed in late 2024: with the second revision of Claude 3.5 (October 2024), long-horizon agentic coding workflows began to compound correctness rather than error.

![Compounding correctness vs compounding error](https://factory.strongdm.ai/images/growth.jpeg)

Compounding correctness vs compounding error

By December of 2024, the model's long-horizon coding performance was unmistakable via Cursor's [YOLO mode](https://forum.cursor.com/t/yolo-mode-is-amazing/36262).

Prior to this model improvement, iterative application of LLMs to coding tasks would accumulate errors of all imaginable varieties (misunderstandings, hallucinations, syntax, DRY violations, library incompatibility, etc). The app or product would decay and ultimately "collapse": death by a thousand cuts, etc.

Together with YOLO mode, the updated model from Anthropic provided the first glimmer of what we now refer to internally as **non-interactive** development or **grown** software.

## Find Knobs, Turn To Eleven

![These go to 11](https://factory.strongdm.ai/images/eleven.jpg)

"These go to 11"

In the first hour of the first day of our AI team, we established a charter which set us on a path toward a series of findings (which we refer to as our "unlocks"). In retrospect, the most important line in the charter document was the following:

![Hands off](https://factory.strongdm.ai/images/no-hand-coded.jpg)

Hands off!

Initially it was just a hunch. An experiment. How far could we get, without writing any code by hand?

Not very far! At least: not very far, until we added tests. However, the agent, obsessed with the immediate task, soon began to take shortcuts: **return true** is a great way to pass narrowly written tests, but probably won't generalize to the software you want.

Tests were not enough. How about integration tests? Regression tests? End-to-end tests? Behavior tests?

## From Tests to Scenarios and Satisfaction

One recurring theme of the agentic moment: we need new language. For example, the word "test" has proven insufficient and ambiguous. A test, stored in the codebase, can be lazily rewritten to match the code. The code could be rewritten to trivially pass the test.

We repurposed the word **scenario** to represent an end-to-end "user story", often stored outside the codebase (similar to a "holdout" set in model training), which could be intuitively understood and flexibly validated by an LLM.

![Synthetic scenario curation and shaping interface](https://factory.strongdm.ai/images/synthchat.png)

Synthetic scenario curation and shaping interface

Because much of the software we grow itself has an agentic component, we transitioned from boolean definitions of success ("the test suite is green") to a probabilistic and empirical one. We use the term **satisfaction** to quantify this validation: of all the observed trajectories through all the scenarios, what fraction of them likely satisfy the user?

## Validating Scenarios in the Digital Twin Universe

In previous regimes, a team might rely on integration tests, regression tests, UI automation to answer "is it working?"

We noticed two limitations of previously reliable techniques:

1. **Tests are too rigid** - we were coding with agents, but we're also building with LLMs and agent loops as design primitives; evaluating success often required LLM-as-judge
2. **Tests can be reward hacked** - we needed validation that was less vulnerable to the model cheating

The Digital Twin Universe is our answer: behavioral clones of the third-party services our software depends on. We built twins of Okta, Jira, Slack, Google Docs, Google Drive, and Google Sheets, replicating their APIs, edge cases, and observable behaviors.

With the DTU, we can validate at volumes and rates far exceeding production limits. We can test failure modes that would be dangerous or impossible against live services. We can run thousands of scenarios per hour without hitting rate limits, triggering abuse detection, or accumulating API costs.

Digital Twin Universe: behavioral clones of Okta, Jira, Google Docs, Slack, Drive, and Sheets  
(click to enlarge)

## Unconventional Economics

Our success with DTU illustrates one of the many ways in which the Agentic Moment has profoundly changed the economics of software. Creating a high fidelity clone of a significant SaaS application was always possible, but never economically feasible. Generations of engineers may have *wanted* a full in-memory replica of their CRM to test against, but self-censored the proposal to build it. They didn't even bring it to their manager, because they knew the answer would be no.

Those of us building software factories must practice a **deliberate naivete**: finding and removing the habits, conventions, and constraints of [Software 1.0](https://www.youtube.com/watch?v=LCEmiRjPEtQ&t=95s). The DTU is our proof that what was unthinkable six months ago is now routine.

## Read Next

- [Principles](https://factory.strongdm.ai/principles): what we believe is true about building software with agents
- [Techniques](https://factory.strongdm.ai/techniques): repeated patterns for applying those principles
- [Products](https://factory.strongdm.ai/products): tools we use daily and believe others will benefit from

Thank you for reading. We wish you the best of luck constructing your own Software Factory.

---

[^1]: We are not alone in these convictions. See also: Luke PM's ["The Software Factory"](https://lukepm.com/blog/the-software-factory/), Sam Schillace's ["I Have Seen the Compounding Teams"](https://sundaylettersfromsam.substack.com/p/i-have-seen-the-compounding-teams), and Dan Shapiro's ["Five Levels from Spicy Autocomplete to the Software Factory"](https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/)

[^2]: Others are building factories too: [Devin](https://devin.ai/), [8090](https://www.8090.ai/), [Factory](https://www.fastcompany.com/91279593/factory-ai-code-generation-matan-grinberg-eno-reyes), [Superconductor](https://www.superconductor.com/), and Jesse Vincent's [Superpowers](https://github.com/obra/superpowers)
