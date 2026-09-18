> Archived source snapshot  
> Source ID: `venturebeat-devday-codex`  
> Original URL: <https://venturebeat.com/infrastructure/the-most-important-openai-announcement-you-probably-missed-at-devday-2025>  
> Final URL: <https://venturebeat.com/infrastructure/the-most-important-openai-announcement-you-probably-missed-at-devday-2025>  
> Title: The most important OpenAI announcement you probably missed at DevDay 2025 | VentureBeat  
> Captured at: `2026-09-16T15:10:18Z`

---

![Credit: VentureBeat made with Midjourney](https://venturebeat.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fjdtwqhzvc2n1%2F2buVKIMlQ2KFcFg8BPHoqU%2Fc5d2dfbfd8cfe9a9432106a936fa204f%2Fnuneybits_A_retro_glowing_computer_on_gradient_background_that__094dfc70-9906-4074-bb00-d32b04faf5f9-1.webp%3Fw%3D1000%26q%3D100&w=3840&q=85)

OpenAI’s annual developer conference on Monday was a spectacle of ambitious AI product launches, from an [app store for ChatGPT](https://openai.com/index/introducing-apps-in-chatgpt/) to a stunning [video-generation API](https://openai.com/index/sora-2/) that brought creative concepts to life. But for the enterprises and technical leaders watching closely, the most consequential announcement was the quiet [general availability of Codex](https://openai.com/index/codex-now-generally-available/), the company's AI software engineer. This release signals a profound shift in how software—and by extension, modern business—is built.

While other announcements captured the public’s imagination, the production-ready release of [Codex](https://openai.com/codex/), supercharged by a [new specialized model](https://openai.com/index/introducing-upgrades-to-codex/) and a [suite of enterprise-grade tools](https://developers.openai.com/codex/sdk), is the engine behind OpenAI’s entire vision. It is the tool that builds the tools, the proven agent in a world buzzing with agentic potential, and the clearest articulation of the company's strategy to win the enterprise.

The [general availability of Codex](https://openai.com/index/codex-now-generally-available/) moves it from a "research preview" to a fully supported product, complete with a new [software development kit (SDK)](https://developers.openai.com/codex/sdk), a [Slack integration](https://developers.openai.com/codex/integrations/slack), and administrative controls for security and monitoring.This transition declares that Codex is ready for mission-critical work inside the world’s largest companies.

"We think this is the best time in history to be a builder; it has never been faster to go from idea to product," said OpenAI CEO Sam Altman during the [opening keynote](https://venturebeat.com/ai/openai-dev-day-2025-chatgpt-becomes-the-new-app-store-and-hardware-is-coming) presentation. "Software used to take months or years to build. You saw that it can take minutes now to build with AI."

That acceleration is not theoretical. It's a reality born from OpenAI’s own internal use — a massive "dogfooding" effort that serves as the ultimate case study for enterprise customers.

## Inside GPT-5-Codex: The AI model that codes autonomously for hours and drives 70% productivity gains

At the heart of the Codex upgrade is [GPT-5-Codex](https://chatgpt.com/features/codex?utm_source=google&utm_medium=paidsearch_brand&utm_campaign=GOOG_B_SEM_GBR_Core_TEM_BAU_ACQ_PER_BRD_ALL_NAMER_US_EN_080625&utm_term=openai%20codex&utm_content=187611721873&utm_ad=776422173331&utm_match=p&gad_source=1&gad_campaignid=23071604080&gbraid=0AAAAA-I0E5cl2krVAgcAc2VJzRhsB5CLd&gclid=CjwKCAjwup3HBhAAEiwA7euZupI6JVfC5p76PsLMGm1i2XCDyp7ERZnjrRPbaodVfs6hE2MM_g4_zhoCzE4QAvD_BwE), a version of OpenAI's latest flagship model that has been "purposely trained for Codex and agentic coding." The new model is designed to function as an autonomous teammate, moving far beyond simple code autocompletion.

"I personally like to think about it as a little bit like a human teammate," explained Tibo Sottiaux, an OpenAI engineer, during a technical session on Codex. "You can pair a program with it on your computer, you can delegate to it, or as you'll see, you can give it a job without explicit prompting."

This new model enables " [adaptive thinking](https://openai.com/index/introducing-upgrades-to-codex/)," allowing it to dynamically adjust the time and computational effort spent on a task based on its complexity.For simple requests, it's fast and efficient, but for complex refactoring projects, it can work for hours.

One engineer during the technical session noted, "I've seen the GPT-5-Codex model work for over seven hours productively... on a marathon session." This capability to handle long-running, complex tasks is a significant leap beyond the simple, single-shot interactions that define most AI coding assistants.

The results inside OpenAI have been dramatic. The company reported that 92% of its technical staff now uses Codex daily, and those engineers complete 70% more pull requests (a measure of code contribution) each week. Usage has surged tenfold since August.

"When we as a team see the stats, it feels great," Sottiaux shared. "But even better is being at lunch with someone who then goes 'Hey I use Codex all the time. Here's a cool thing that I do with it. Do you want to hear about it?'"

## How OpenAI uses Codex to build its own AI products and catch hundreds of bugs daily

Perhaps the most compelling argument for Codex’s importance is that it is the foundational layer upon which OpenAI’s other flashy announcements were built. During the [DevDay event](https://devday.openai.com/), the company showcased custom-built arcade games and a dynamic, AI-powered website for the conference itself, all developed using [Codex](https://openai.com/codex/).

In one session, engineers demonstrated how they built "Storyboard," a custom creative tool for the film industry, in just 48 hours during an internal hackathon. "We decided to test Codex, our coding agent... we would send tasks to Codex in between meetings. We really easily reviewed and merged PRs into production, which Codex even allowed us to do from our phones," said Allison August, a solutions engineering leader at OpenAI.

This reveals a critical insight: the rapid innovation showcased at DevDay is a direct result of the productivity flywheel created by [Codex](https://openai.com/codex/). The AI is a core part of the manufacturing process for all other AI products.

A key enterprise-focused feature is the new, more robust code review capability. OpenAI said it "purposely trained GPT-5-Codex to be great at ultra thorough code review," enabling it to explore dependencies and validate a programmer's intent against the actual implementation to find high-quality bugs.Internally, nearly every pull request at OpenAI is now reviewed by Codex, catching hundreds of issues daily before they reach a human reviewer.

"It saves you time, you ship with more confidence," Sottiaux said. "There's nothing worse than finding a bug after we actually ship the feature."

## Why enterprise software teams are choosing Codex over GitHub Copilot for mission-critical development

The maturation of [Codex](https://openai.com/codex/) is central to OpenAI’s broader strategy to conquer the enterprise market, a move essential to justifying its massive valuation and unprecedented compute expenditures. During a press conference, CEO Sam Altman confirmed the strategic shift.

"The models are there now, and you should expect a huge focus from us on really winning enterprises with amazing products, starting here," Altman said during a private press conference.

OpenAI President and Co-founder Greg Brockman immediately added, "And you can see it already with Codex, which I think has been just an incredible success and has really grown super fast."

For technical decision-makers, the message is clear. While consumer-facing agents that book dinner reservations are still finding their footing, [Codex](https://openai.com/codex/) is a proven enterprise agent delivering substantial ROI today. Companies like Cisco have already rolled out Codex to their engineering organizations, cutting code review times by 50% and reducing project timelines from weeks to days.

With the new [Codex SDK](https://developers.openai.com/codex/sdk/), companies can now embed this agentic power directly into their own custom workflows, such as automating fixes in a CI/CD pipeline or even creating self-evolving applications. During a live demo, an engineer showcased a mobile app that updated its own user interface in real-time based on a natural language prompt, all powered by the embedded Codex SDK.

While the launch of an [app ecosystem in ChatGPT](https://openai.com/index/introducing-apps-in-chatgpt/) and the breathtaking visuals of the [Sora 2 API](https://openai.com/index/sora-2/) rightfully generated headlines, the [general availability of Codex](https://openai.com/index/codex-now-generally-available/) marks a more fundamental and immediate transformation. It is the quiet but powerful engine driving the next era of software development, turning the abstract promise of AI-driven productivity into a tangible, deployable reality for businesses today.
