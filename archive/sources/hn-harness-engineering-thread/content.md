> Archived source snapshot  
> Source ID: `hn-harness-engineering-thread`  
> Original URL: <https://news.ycombinator.com/item?id=48416264>  
> Final URL: <https://news.ycombinator.com/item?id=48416264>  
> Title: Harness engineering: Leveraging Codex in an agent-first world | Hacker News  
> Captured at: `2026-09-16T15:10:30Z`

---

[https://openai.com/index/harness-engineering/](https://openai.com/index/harness-engineering/)

---

## Comments

> **bko** · [2026-06-07](https://news.ycombinator.com/item?id=48430531)
> 
> \> We had weeks to ship what ended up being a million lines of code... Five months later, the repository contains on the order of a million lines of code across application logic, infrastructure, tooling, documentation, and internal developer utilities. Over that period, roughly 1,500 pull requests have been opened and merged with a small team of just three engineers driving Codex. This translates to an average throughput of 3.5 PRs per engineer per day, and surprisingly the throughput has increased as the team has grown to now seven engineers. Importantly, this wasn’t output for output’s sake: the product has been used by hundreds of users internally, including daily internal power users.
> 
> That's an insane level of throughput. What's a good baseline? Prior to agentic coding, whats the typical number of PRs engineers were expected to push? Maybe a 2-10?
> 
> Do people feel the software has gotten better in the last 6 months? The number of engs is prob the same so we should expect maybe 5x faster cycle in major software apps, but I don't see it. The AI apps do change very fast but given its a very new field, I'd expect as much. But outside of that, I don't see it.
> 
> > **torben-friis** · [2026-06-07](https://news.ycombinator.com/item?id=48430677)
> > 
> > Here's a fun one: firefox lists its current count at about 2.5M LOC, from roughly 1M commits during the years.
> > 
> > You end up with about 3 lines added per commit, which is not ridiculous when you consider that most would be editions rather than full additions.
> > 
> > Here, we have 1500 PRs and 1M LOC, which is about 650 added LOC per PR. Remember, not 650 lines total in the PR, but +650 balance after additions-removals.
> > 
> > Fun questions for attentive readers:
> > 
> > \- What does a project growing at a rate of one full firefox-codebase worth of LOC per year look like, a decade down the line?
> > 
> > \- What does the line count say about the verbosity of the tool, and what does it say about outcomes that the purpose of the project isn't clearly disclosed?
> > 
> > \- Do we have reasons to care about LOC in a world where we don't write code manually? What happens to token usage numbers when the codebase is significantly larger?
> > 
> > \- If it was confirmed that LLM usage blows up your line count, what's the implication for codebases that want to return to manual coding after months of usage? (Say, because the tool gets expensive).
> > 
> > > **stult** · [2026-06-07](https://news.ycombinator.com/item?id=48431953)
> > > 
> > > \> - Do we have reasons to care about LOC in a world where we don't write code manually? What happens to token usage numbers when the codebase is significantly larger?
> > > 
> > > Yes, at least to the extent that we care about context windows and tokens consumed by coding agents processing code that is ultimately irrelevant to their assigned task.
> > > 
> > > Anecdotally, I've found keeping file sizes small has been important for agentic coding not just to maintain human readability, but also for optimizing agent performance, precisely because it limits the amount of incidental context they load while working a problem, because they generally load entire files rather than just parsing the part relevant to their current assignment as a human might. That smaller file size thus reduces input noise and the LLM generates a tighter solution, which in turn reduces input noise for future solutions. Or at least this strategy avoids a death spiral into exploding context length.
> > > 
> > > I expect (but cannot currently prove) that keeping overall LOC down yields similar benefits even when file sizes are kept small because it spares the LLM from parsing potentially relevant files that prove irrelevant to its current task.
> > > 
> > > > **everforward** · [2026-06-07](https://news.ycombinator.com/item?id=48434959)
> > > > 
> > > > Seconded on smaller files. I feel like I tend to get better responses faster.
> > > > 
> > > > A notable flaw here is that I’ve not tried large vs small files in a large codebase. Most of my experimentation there has been on personal projects where even a small file contains a significant part of the project. I could see degradation when it has to load 5 files to figure out how something works.
> > > > 
> > > > Total LOC (tokens, really, literal lines probably don’t matter) is interesting as a factor. That might go some way towards explaining why LLMs are weirdly good at Clojure.
> > > > 
> > > > Eg last I checked Anthropics one-shot performance on Clojure was about the same as Python or Go despite almost certainly being less represented in training data. The combination of density and simple primitives might be easier for an LLM to wrangle, ameliorating the impact of a less popular language.
> > > > 
> > > > > **torben-friis** · [2026-06-07](https://news.ycombinator.com/item?id=48435460)
> > > > > 
> > > > > \>Eg last I checked Anthropics one-shot performance on Clojure was about the same as Python or Go despite almost certainly being less represented in training data. The combination of density and simple primitives might be easier for an LLM to wrangle, ameliorating the impact of a less popular language.
> > > > > 
> > > > > There might be tons of confounding factors there. One that comes to mind is the quality of of data, it might perfectly be that the average clojure snippet is higher quality, due to the users demographics. Very few people start writing code with clojure, whether in college or during bootcamps.
> > > > > 
> > > > > > **everforward** · [2026-06-08](https://news.ycombinator.com/item?id=48446236)
> > > > > > 
> > > > > > Oh there absolutely are, I don’t mean to imply any certainty in that attribution.
> > > > > > 
> > > > > > Quality of data is totally one. Immutability may be another (it’s easier to reason about if you don’t have to track mutations to a variable). Another interesting one is Clojures emphasis on composability using basic primitives that are sort of hard to grok initially but unlock really cool stuff.
> > > > > > 
> > > > > > You can do some incredible stuff with recursive map and arrow functions in a few dozen characters.
> > 
> > > **therealdrag0** · [2026-06-07](https://news.ycombinator.com/item?id=48431402)
> > > 
> > > Does the Firefox LOC include ALL forms of text: infrastructure (Firefox doesn’t have), documentation, developer scripts,tests, etc? How is the test coverage of Firefox?
> > > 
> > > **CleanCoder** · [2026-06-07](https://news.ycombinator.com/item?id=48431045)
> > > 
> > > When I got to the 1M LOC I involuntarily paused feeling like this must be satire.
> 
> > **krackers** · [2026-06-07](https://news.ycombinator.com/item?id=48430584)
> > 
> > They never specified what exactly the product was, without which it's impossible to judge the post.
> > 
> > For some reason most of the uses of "agents" are to build yet other AI products, it's turtles all the way down. Maybe that says more about the field of harnesses than it does about the power of "agents".
> > 
> > > **theptip** · [2026-06-07](https://news.ycombinator.com/item?id=48431228)
> > > 
> > > There is a sense in which it doesn’t matter at all; many of the limitations of agents in large codebases are just the context management challenges. So proving that you can cohere and progress at O(1m) is a useful scale observation. “Can I use agents in my 1m line codebase?”
> > > 
> > > There is of course another sense in which the output quality is the only thing that matters. “Can I use agents to build a 1m line codebase that I want to maintain going forward.”
> > > 
> > > I take this as being exclusively a tech demo of the former. Quality (feature velocity, bugs, scalability) is not demonstrated.
> > > 
> > > **becomevocal** · [2026-06-07](https://news.ycombinator.com/item?id=48430726)
> > > 
> > > Feels like the active discovery going on is trying to understand what is computer vs what is AI, for every product.
> > > 
> > > Agents help a ton with the discovery, but the act of building a product needs a deeper level of thought and validation to make it actually better than what came before. So IMO what you see is people still learning what needs to be understood and crafted first hand to make a product better (including economics)
> > > 
> > > We’ll get there if more of us try
> 
> > **getnormality** · [2026-06-07](https://news.ycombinator.com/item?id=48436169)
> > 
> > We've known for decades that output metrics like LOC/day are very bad measures of real productivity in software. But they seem to be back in vogue in the age of AI, because AI is so good at maxing these useless metrics, and we need to show how impressive our AI is and how impressive our usage of AI is.
> > 
> > **techblueberry** · [2026-06-07](https://news.ycombinator.com/item?id=48431310)
> > 
> > I’ve been vibe coding a lot over the past year or so, and I think I’m going to stop. In fact, I sort of want to challenge myself to see, can I go back to a sort of the fork in the road with the old copilot autocomplete workflow and really maximize that. Be in the drivers seat for most of the code being written, but find ways to use AI to really enhance the flow state / remove blockers. Tools only minimal actual code generation.
> > 
> > > **chasd00** · [2026-06-07](https://news.ycombinator.com/item?id=48435381)
> > > 
> > > One workflow I like is writing a comment for what I’m about to do and then waiting a few seconds and then tab through the auto-completions. Then I check what the agent came up with, make some edits, and then on to the next block. That works well, I feel in control but don’t have to type as much.
> > > 
> > > I do use claudecode totally hands off too however. Mostly for UI tasks. Like themifying css or data grids and CRUd with all the bells and whistles, I hate that stuff and cc gets it done in minutes and mostly right. It’s also super nice to say things like “user profile in the upper right hand corner” without having to fight css.
> > > 
> > > /if it’s not clear, I hate dealing with css and related frameworks.
> > > 
> > > **59nadir** · [2026-06-07](https://news.ycombinator.com/item?id=48432778)
> > > 
> > > I would be very impressed with someone who's been vibecoding "a lot" for about a year who could then go back to being fully in the loop for even 50%. I would even say I'd expect withdrawal symptoms at that point.
> > > 
> > > The dopamine hits are core to why people even do vibecoding (or vibecoding-in-a-dress/spec-driven development) and why they tend to overestimate its output so much. Hell, it's core to all forms of LLM-assisted development (because it feels like magic), but most of the other forms are more value, less delusion.
> > > 
> > > > **chasd00** · [2026-06-07](https://news.ycombinator.com/item?id=48435450)
> > > > 
> > > > The dopamine hit is real, I feel like that was identified early on by OpenAI and probably lit a fire to get ChatGPT in the hands of the public. Bf Skinner (I think) is the one who narrowed in on variable ratio reward systems to maximize operant conditioning. An LLM, with hallucinations and imperfections, is the perfect variable ratio reward system. It’s no wonder they’re getting pushed so hard along with a consumption based pricing model. Whether you’re a human, rat, plant, bacteria there’s no real defense against that kind of conditioning.
> > > > 
> > > > First hit on Google
> > > > 
> > > > [https://www.simplypsychology.org/operant-conditioning.html](https://www.simplypsychology.org/operant-conditioning.html)
> > > > 
> > > > **techblueberry** · [2026-06-07](https://news.ycombinator.com/item?id=48434055)
> > > > 
> > > > I actually don’t find vibe coding satisfying is one of the many reasons I’m going back. I feel a little of what you’re talking about, but I’m a nerd. I like to code.
> > > > 
> > > > But I’m not dismissing your concern. Because it is one of the reasons I’m making this decision. I’m a professional. I’m not just here to feel good I’m here to do a good job over the course of a career. I think all in, when you think about writing good maintainable, software, learning, staying mentally sharp, and speed put together. Vibe coding could be less effective and maybe even in the aggregate “slower”.
> 
> > **ano-ther** · [2026-06-07](https://news.ycombinator.com/item?id=48434395)
> > 
> > It feels like the update cadence has indeed sped up. But not necessarily quality.
> > 
> > Looking at MS Office I notice a lot of small changes recently that are mostly annoying. Things like Word comments losing the focus after you @-tagged a colleague, needing to click the Outlook search field twice before you can enter text, Outlook mobile date picker losing its ability to show your and attendee's availability.
> > 
> > So it looks like lots of throughput, but unfortunately breaking features that work. Or wasting time on things that don’t matter such as the status bar of OneDrive search circling around the input field.
> > 
> > **Aperocky** · [2026-06-07](https://news.ycombinator.com/item?id=48430640)
> > 
> > \> ended up being a million lines of code
> > 
> > This almost reeks of "I've never cleaned up our code base because there is too much code, and didn't even bother having agents/LLM cleaning them up".
> > 
> > You almost never need a million lines of code - this includes your software, infra, testing and operational tools. You didn't ship the linux kernel in 3 weeks and you know it. The code is already speghetti and it achieve the basic functions OK but it will harder and harder to simplify and untangle and maintain.
> > 
> > > **bombcar** · [2026-06-07](https://news.ycombinator.com/item?id=48430817)
> > > 
> > > Even the linux kernel doesn't need millions of lines of code; most of the actual LOC is device drivers, and you don't need all of them, you just need the ones for the devices you have.
> > > 
> > > > **Chu4eeno** · [2026-06-07](https://news.ycombinator.com/item?id=48430911)
> > > > 
> > > > And Linux maintainers are actively pushing to radically cut down on the LOC by eliminating drivers etc.
> > 
> > > **girvo** · [2026-06-07](https://news.ycombinator.com/item?id=48430651)
> > > 
> > > Yeah I cannot see how "we shipped 1 million lines of code in three weeks" is... something to be proud of haha
> > > 
> > > **zahlman** · [2026-06-07](https://news.ycombinator.com/item?id=48431977)
> > > 
> > > As a point of reference, 1MLOC is about the size of the *entire* Python standard library *including tests*, as well as stuff like IDLE. (Well, the Python part of the code. There's about half that much again of C in Modules/ .)
> > > 
> > > **faustin** · [2026-06-07](https://news.ycombinator.com/item?id=48431174)
> > > 
> > > They directly address routine code cleanup and regularly paying down technical debt near the end of the article.
> > > 
> > > > **Aperocky** · [2026-06-07](https://news.ycombinator.com/item?id=48432120)
> > > > 
> > > > I stand corrected, but the LOC being advertised still make me doubt the efficacy of their process.
> > 
> > > **QuercusMax** · [2026-06-07](https://news.ycombinator.com/item?id=48439872)
> > > 
> > > I ported/rewrote a million-LOC medical imaging workstation app over the course of 2 years with a team of 6. We had a full feature matrix with an extensive manual testing plan from previous work.
> > > 
> > > I suspect there's insane amounts of duplication.
> 
> > **AbrahamParangi** · [2026-06-07](https://news.ycombinator.com/item?id=48434345)
> > 
> > The average efficiency improvement is closer to something like 2-3x per Anthropic’s numbers and this is only the rate at which software can advance. Do you expect to notice if 12 months of software engineering on a project you’re following gets done in 6 months? I suspect not.
> > 
> > The root cause is that the acceleration is pareto distributed so the modern engineering team at the moment looks like one 10x engineer, one 5x engineer, and the rest are approximately 1.5x engineers.
> > 
> > **aleqs** · [2026-06-07](https://news.ycombinator.com/item?id=48430763)
> > 
> > \> should expect maybe 5x faster cycle in major software apps
> > 
> > To what end and what would that even look like though? Enshittifying everything at maximum speed? The apps/platforms I use regularly - GitHub, Spotify, Google maps (just to name a few), have gotten noticeably shittier in recent times.
> > 
> > > **linsomniac** · [2026-06-07](https://news.ycombinator.com/item?id=48431087)
> > > 
> > > \>GitHub, Spotify, Google maps (just to name a few), have gotten noticeably shittier in recent times.
> > > 
> > > What if AI lets you create new versions of those tools, but without the enshitification?
> > > 
> > > I say that being in the "soaking" stage of using AI to rebuild a shitty software project in 70KLOC over about 2 weeks of spare time, so this may not be as theoretical as you might think.
> > > 
> > > > **aleqs** · [2026-06-07](https://news.ycombinator.com/item?id=48431313)
> > > > 
> > > > Oh I definitely agree that AI can and will help create great software.
> > > > 
> > > > It's just that creating great software isn't really the SV/VC/big tech business model or main goal.
> > > > 
> > > > **NoraCodes** · [2026-06-07](https://news.ycombinator.com/item?id=48431295)
> > > > 
> > > > \> What if AI lets you create new versions of those tools, but without the enshitification?
> > > > 
> > > > I'm not sure I fully understand what you're saying here. Isn't the value of these tools almost entirely independent of their actual software? That is, we have many good open source, self-hostable forges (Forgejo, sr.ht, etc.), lots of great music player software (Jellyfin, Symphonium, etc.), and decent maps software (OsmAnd and Organic Maps). People use GitHub, Spotify, and Google Maps -- perhaps even \_put up\_ with their often bad/glitchy software -- because of network effects (all three) and content/licensing partnerships (Spotify/GMaps). That proprietary data isn't something AI can help you with, right?
> > > > 
> > > > > **linsomniac** · [2026-06-07](https://news.ycombinator.com/item?id=48431359)
> > > > > 
> > > > > It really depends on the use-case. For example, my most starred github repo is a tool to convert Spotify playlists to YouTube Music (that was done pre-AI). Github depends on what issues you have with it, what your use case is, and whether you can leverage some of the network effects via API from the github source. Maps, same story.
> > > > > 
> > > > > **nostrademons** · [2026-06-07](https://news.ycombinator.com/item?id=48431303)
> > > > > 
> > > > > AI coders are great for making scrapers, possibly because AI companies use their own tools to make an awful lot of scrapers.
> > 
> > > **Art9681** · [2026-06-07](https://news.ycombinator.com/item?id=48435841)
> > > 
> > > Confirmation bias. The internet has complained about software updates decades before LLMs became ubiquitous. I made a career fixing human slop by domain experts.
> > > 
> > > We easily forget that the great majority of software engineering is fixing the mistakes of other highly capable software engineers.
> > > 
> > > It's just so easy to blame the machine instead of admitting no one here is an expert on anything and they count their hits and not misses. If they did, we would find the probability of making a mistake to be higher than a fronter coding agent.
> > > 
> > > It's a hard headed crowd and everyone, LLM pilled or not, suffers from the Dunning-Kruger. All of us.
> > > 
> > > Just look at the comments. Everyone is perfect when they do things themselves.
> 
> > **endomorphosis** · [2026-06-07](https://news.ycombinator.com/item?id=48435398)
> > 
> > I have been building an entire operating system ( not figuratively)
> > 
> > Prior to ai autocomplete 500 loc a day and then with ai autocomplete I could do 2500 a day and now 50k is pretty normal. Walking around tech week with my phone yielded 150k this week
> > 
> > **bicepjai** · [2026-06-08](https://news.ycombinator.com/item?id=48453499)
> > 
> > It’s sad we back at measuring code quality with lines of code
> > 
> > **dchftcs** · [2026-06-07](https://news.ycombinator.com/item?id=48431215)
> > 
> > This is a lot tamer than what Claude Code's team claims tbf.
> > 
> > **jakolaptu** · [2026-06-07](https://news.ycombinator.com/item?id=48431088)
> > 
> > It is likely better because AI agents make access to domain knowledge easier. However, I would wager that the problem is people don’t remember the code well. The problems are going to be long-term as the pace of change increases.
> > 
> > If you think about it, successful products rely on designing well-thought-out experiences, customer discovery (see all the Forward-Deployed Enginneer job listings at OpenAI) so the code velocity somewhat becomes irrelevant.
> > 
> > If you’re solving the right problem and you’ve got a good team then competitive advantage comes from somewhere OUTSIDE of code velocity.
> > 
> > The more important question I think is does faster code yield more value long-term? At the moment, it’s like yeah we do 3.5 pull requests per day.
> > 
> > I’m thinking, great, good for you. You could also combine three pull requests into one and then you’re doing 1 per day. This is quantitative data that doesn’t really mean anything tangible.

> **shepherdjerred** · [2026-06-07](https://news.ycombinator.com/item?id=48431064)
> 
> This mirrors exactly what I have been doing.
> 
> \- Give Claude/Codex a way to verify its own work (browser, smoke tests, e2e tests, high-fidelity local environment)
> 
> \- Keep all context (issue tracking, docs, ideas, plans, worklogs) in-repo ([https://github.com/shepherdjerred/monorepo/tree/main/package...](https://github.com/shepherdjerred/monorepo/tree/main/packages/docs))
> 
> \- Give Claude/Codex access to observability (Grafana, Prometheus, Tempo, PagerDuty)
> 
> \- Have Claude/Codex follow good engineering guidelines like fail-fast, type safety, parse at boundaries
> 
> I haven't yet been able to achieve full autonomy due to cost and CI load on my homelab.
> 
> > **para\_parolu** · [2026-06-07](https://news.ycombinator.com/item?id=48431186)
> > 
> > Does it yield good results? I found that instead of docs it’s easier just to ask ai to read code. I feel like this is same as comments in code. Become outdated fast
> > 
> > > **shepherdjerred** · [2026-06-07](https://news.ycombinator.com/item?id=48431233)
> > > 
> > > I don't really use "docs" for documentation. I've prompted Claude/Codex to always write a "log" and save it in-repo to track what it did and why.
> > > 
> > > I've found this to be really helpful, e.g. "you did this last week, and now some other thing is happening" or "you tried this approach before to solve alert X but it didn't work" -- except it can discover this itself.
> > > 
> > > [https://github.com/shepherdjerred/monorepo/tree/main/package...](https://github.com/shepherdjerred/monorepo/tree/main/packages/docs/logs)
> > > 
> > > I've also used it to store TODOs and plans. For example I might want to explore some idea and defer it for later, or some weekend have it execute on some tech debt I've put off. One last use case is asking "what did I work on in the last 2-3 weeks, is it healthy, and what additional quality checks can/should I do; is there any follow-up work?"
> > > 
> > > > **DenisM** · [2026-06-07](https://news.ycombinator.com/item?id=48436215)
> > > > 
> > > > I find that preserving logs that contain errors will confuse future sessions even if the errors were corrected at the time. Do you have that problem?
> > > > 
> > > > Essentially preserving logs extends the context window with all related problems.
> > > > 
> > > > > **shepherdjerred** · [2026-06-07](https://news.ycombinator.com/item?id=48436281)
> > > > > 
> > > > > I haven’t actually noticed that, but I’m not sure why. Maybe because I specifically describe it to the agent as a work log rather than documentation? I’m not sure
> > 
> > > **c0rruptbytes** · [2026-06-07](https://news.ycombinator.com/item?id=48433360)
> > > 
> > > it does not result in great results left unattended, it’ll start creating slop or hardcoding solutions
> > > 
> > > but overtime if you adjust your verification rubric, it’s not too bad, gets pretty good, if you do make it do TDD, it gets kinda crazy and you’ll have 2000-3000 tests after awhile, or on my common case, 6000-7000 lines of code in single files (i usually have a cron to audit files for decomposition and create tickets)
> > > 
> > > i wouldn’t use it at my job yet, but it’s been fun to use for personal projects - it’s like modded minecraft automation or factorio
> > > 
> > > > **shepherdjerred** · [2026-06-07](https://news.ycombinator.com/item?id=48436286)
> > > > 
> > > > Static analysis can help here! Add CI checks for duplicated code or file length.
> > > > 
> > > > For test growth, maybe use a coverage tracker and remove redundant tests?
> 
> > **geoffbp** · [2026-06-07](https://news.ycombinator.com/item?id=48433890)
> > 
> > I like the idea of saving the work done into files - helps to prevent the llm from redoing the same work. Maybe one day instead of code in a repo it will just be a list of prompts.
> > 
> > > **shepherdjerred** · [2026-06-07](https://news.ycombinator.com/item?id=48437843)
> > > 
> > > Yes, this was a huge help for me. For example I would have a difficult bug that requires a few sessions/deployments to truly close out.
> > > 
> > > With the worklog, it can easily see "oh I've worked on something similar before"

> **murat124** · [2026-06-07](https://news.ycombinator.com/item?id=48430767)
> 
> The other day I came across to a video showing workers in a e-vape factory. They pick up a bunch of e-vapes from the conveyor belt (each has 6 e-vape think), stick in their mouth and vigorously vape all of them for about 5 seconds, then test the next bunch. Humans reviewing hundreds of lines of change in a PR written by AI is not very different.
> 
> > **Eridrus** · [2026-06-07](https://news.ycombinator.com/item?id=48436128)
> > 
> > You can do statistical testing of the e-vape line because you have a specific criteria and well defined tolerances that you can define on a per-sample basis and that the factory meets with some acceptable 9s of reliability.
> > 
> > PRs are not like this because a single bad PR can be catastrophic for your business in a way that a single bad e-vape cannot.
> > 
> > I would also argue that the current output from the AIs when sampled by software engineers regularly doesn't meet the bar of quality we want in our product, hence the need to review every PR and fix a substantial fraction.
> > 
> > If you can start to bound the impact of changes and the outputs begin to be generally acceptable unsupervised, such that all you're doing is double checking that nothing has regressed in the factory, then the sampling approach can work.
> > 
> > **prakashn27** · [2026-06-07](https://news.ycombinator.com/item?id=48431411)
> > 
> > Very true. If a PR has 1000 lines I would check only a handful full of them and leave the rest for test suit .

> **h4ny** · [2026-06-07](https://news.ycombinator.com/item?id=48432037)
> 
> I'm not an AI skeptic but I'm skeptical of the intent of this article. It makes great claims about agent-first engineering and tries to make a real case based on a real product, with real users, and a real team that's been growing — all without even saying what was built or showing it, just like every other AI hype article.
> 
> > **zbrock** · [2026-06-07](https://news.ycombinator.com/item?id=48435137)
> > 
> > At the time we wrote the article we hadn’t released the product and weren’t ready to talk about it. It was an internal prototype that looked very much like the current Codex app.
> > 
> > > **getnormality** · [2026-06-07](https://news.ycombinator.com/item?id=48436390)
> > > 
> > > So, did this internal prototype ultimately end up being used to create/influence a real product, e.g. Codex app?
> > > 
> > > > **zbrock** · [2026-06-07](https://news.ycombinator.com/item?id=48439749)
> > > > 
> > > > Yep!
> > > > 
> > > > > **getnormality** · [2026-06-11](https://news.ycombinator.com/item?id=48485780)
> > > > > 
> > > > > No detail about this in the article or your comment here, but the voluminous lines of code get a big call-out. Very interesting!
> 
> > **epolanski** · [2026-06-07](https://news.ycombinator.com/item?id=48434143)
> > 
> > And this thread too is filled with users that "I also have done this or that" but bar one user, nobody followed up with any link to anything.

> **mohsen1** · [2026-06-07](https://news.ycombinator.com/item?id=48432813)
> 
> I've been doing the same experiment in tsz\[1\] for a while now (the same past five months in fact) and I have come to very similar conclusions. Lots of harness to enforce good architecture splits. Lots of tests and CI.
> 
> My point of working on tsz is to learn how to do very big projects with AI. Eventually the same workflows and attitude can be leveraged to build customer product apps with UI as well. I see that OpenAI is leveraging automated browser testing and even videos as part of their workflow. I think as models get better this direction for making software would eventually make sense. I don't think we're there yet though. But at least, unlike OpenAI vague claims I can share the output with you to see!
> 
> Most of the solutions that offer a very high level of automation like Lovable are a bit too optimistic and solutions are not tightly coupled with lots of automated testing.
> 
> \[1\] [https://github.com/tsz-org/tsz](https://github.com/tsz-org/tsz)

> **thelucent** · [2026-06-07](https://news.ycombinator.com/item?id=48431449)
> 
> This might work only if you have “infinite” compute and infinite tokens.
> 
> As someone that used the $20 plan, this pure agentic approach is impossible to do because I’d hit the limit fast and I would end up with less outcome.
> 
> What I found that work incredibly well was to provide a human written code as reference, and ask it to extend it. So I scaffold the entire thing, architect it, write few samples code (controllers, services, models, components, database schema, how auth works, etc) so the LLM can have a headstart on their attention (pun intended)
> 
> I usually wrote a stub with a lot of details on how to implement it. Something like a higher abstraction pseudo code. Then ask the LLM to implement it.
> 
> When it fails, it is often better to undo the whole changes, adjust the stub so it catches what fails before, and try again.
> 
> Or, commit the changes, and use a new fresh context and only address what went wrong.
> 
> \-
> 
> Whenever I tried this agentic from scratch approach, I always end up disappointed; both on the outcome and on the limit that I hit before an hour even passed.
> 
> > **zuzululu** · [2026-06-07](https://news.ycombinator.com/item?id=48432152)
> > 
> > You are not going anywhere with $20 plan
> > 
> > Upgrade to $200/month and you should see more usage but even for a hardcore user for me, one can never have enough.
> > 
> > I'm still very jealous of those guys that got 200x usage simply by RSVP'ing to openai party

> **zbrock** · [2026-06-07](https://news.ycombinator.com/item?id=48435082)
> 
> Hello! I’m one of the three engineers who write this piece. Happy to answer questions.
> 
> > **e12e** · [2026-06-07](https://news.ycombinator.com/item?id=48436960)
> > 
> > Interesting write up!
> > 
> > Have you been able to extract libraries or tools from this project yet? If so how was that experience?
> > 
> > That is, do you see yourself releasing a metric harness, or sub-projects that are equivalent of ActiveRecord, zod, or similar open source tooling that frequently originate in a large in-house project - and then is exported out as a stand-alone toll, utility, library or framework?
> > 
> > Because while ai can reimplement minor tools, it's utility entirely depends on the existence of solid tools, libraries and frameworks.
> > 
> > **aabdi** · [2026-06-07](https://news.ycombinator.com/item?id=48435110)
> > 
> > Very cool article!
> > 
> > \- are other teams adopting this approach? What’s the blockers if not?
> > 
> > \- have there been problems where the models alone were not enough to debug and the devs had to fix it themselves?
> > 
> > \- as the rate of changes has increased with more devs how have you dealt with concurrent writers with merge conflicts?
> > 
> > \- if there was anything you could change in the approach you started with, what would it be?
> > 
> > > **zbrock** · [2026-06-07](https://news.ycombinator.com/item?id=48435213)
> > > 
> > > 1\. Yes! Many teams internally have adopted a lot of the same practices we outlined in the blog post. Ryan has also been spending time both internally and externally helping companies figure out how to do this in their code bases.
> > > 
> > > 2\. Hmm, kind of. There have definitely been issues the models can’t one shot. But we still use Codex to write all the actual code with human guidance.
> > > 
> > > 3\. More agents :) Some teams are experimenting with centralized Agent mediated integration queues, others use normal merge queues, many have local Codex threads that monitor CI to resolve and land conflicts or failures.
> > > 
> > > 4\. Today’s models and codex app. We started doing all this with gpt-5 and codex-cli. The tools today, 9 months later, are so much better than what we had then.
> > > 
> > > > **HorizonXP** · [2026-06-07](https://news.ycombinator.com/item?id=48435312)
> > > > 
> > > > Have you built any tooling or products around all of this and deploying it somehow? I’d love to learn more and share notes, because we’ve been doing this too. About 3100+ PRs merged across our 4 person team in 4 months. Impossible without harness engineering, and I agree, the tools are getting even better.
> 
> > **janstice** · [2026-06-09](https://news.ycombinator.com/item?id=48455832)
> > 
> > If you were paying commercial token rates, what would the cost have looked like?
> > 
> > **DenisM** · [2026-06-07](https://news.ycombinator.com/item?id=48436491)
> > 
> > Fantastic job!
> > 
> > Can you share what type of project that was? On the spectrum from a database engine to cat picture sharing web site (very high demand for correctness vs very lax).
> > 
> > > **zbrock** · [2026-06-07](https://news.ycombinator.com/item?id=48439712)
> > > 
> > > This was primarily an Electron app with some small hosted backend services
> 
> > **pramodbiligiri** · [2026-06-07](https://news.ycombinator.com/item?id=48436389)
> > 
> > Have you been satisfied with the quality of code generated by the model? Or did you have to tweak some rule file or skill to improve it? Or is human-readable code not even a goal at this point?
> > 
> > > **zbrock** · [2026-06-07](https://news.ycombinator.com/item?id=48439737)
> > > 
> > > We spent a lot of time tweaking skills, doc files, and prompts. I’d say that was our primary activity as engineers. Our job became tweaking the harness every time we got code or results we didn’t like. Eventually we were pretty happy with most agent runs, but we were always happy to just throw out ones that didn’t meet our standards. I think more than half didn’t.
> 
> > **s3p** · [2026-06-07](https://news.ycombinator.com/item?id=48435174)
> > 
> > Were those em dashes you, or GPT

> **drivebyhooting** · [2026-06-07](https://news.ycombinator.com/item?id=48431423)
> 
> I wish these breathless blog posts would actually try to be more didactic.
> 
> For example, actually doing a walkthrough of how to set up these allegedly super powered workflows and concrete demonstrations.
> 
> I’m not an AI skeptic. Rather I’d don’t want to miss out on any actual super powers.
> 
> > **nimonian** · [2026-06-07](https://news.ycombinator.com/item?id=48431534)
> > 
> > I do quite a lot of what this post describes in a reasonably large project. Here's what works for me:
> > 
> > \- write gherkin features for new features; update them for enhancements; don't touch them for refactors. Label your PRs with these nouns.
> > 
> > \- use pre-push hooks for type checks, linting, unit tests, and other quick, scriptable validations.
> > 
> > \- make a viteperess subsite in your repo, have the agents maintain it - document important principles, architecture, etc.
> > 
> > \- make a cli command which lists all pages along with the yaml frontmatter description so agents can choose what to read without blowing up the context window.
> > 
> > \- use ddd and monorepo - write your logic in headless layers, and compose layers into apps. agents navigate layers very successfully.
> > 
> > \- use zod (or your language equivalent) and contract-first API development; this is my favourite bit tbh, I use orpc
> > 
> > \- make a single skill called "code" which describes the lifecycle: open a worktree, setup .env to guarantee no conflict with other agents (choose unused ports etc - docker is good here), write or update feature file (this is where you negotiate the spec), implement, validate (e.g. using playwright mcp), pre-push checks, push and wait for review, tear down and fast forward main
> > 
> > \- testcontainers is great for ensuring multiple agents can run tests that don't conflict
> > 
> > Seriously I only have one skill that's it. Everything else is in the docs. I'm feeling very productive like this, in a "making good software" sense not a LoC sense.
> > 
> > > **nullbio** · [2026-06-07](https://news.ycombinator.com/item?id=48431903)
> > > 
> > > Can you share your skill please?
> > > 
> > > > **pramodbiligiri** · [2026-06-07](https://news.ycombinator.com/item?id=48432645)
> > > > 
> > > > I agree with many of the points made by nimonian above (esp the one starting with 'make a single skill called "code" which describes the lifecycle'), based on my limited experience with these things.
> > > > 
> > > > I'm building a skill + CLI tool along those lines (for solo devs not corporates). Here is what my "lifecycle" type skill looks like right now: [https://github.com/bitkentech/shipsmooth/blob/releases/dist/...](https://github.com/bitkentech/shipsmooth/blob/releases/dist/skills/start/SKILL.md) (warning, heavily work in progress). You can see a demo here: [https://shipsmooth.net/](https://shipsmooth.net/)
> > > > 
> > > > I was not happy with the default code quality generated by Claude Code. So I've been adding some skill-file rules to address that, and so far happy with the results: [https://github.com/bitkentech/shipsmooth/tree/main/skills/ex...](https://github.com/bitkentech/shipsmooth/tree/main/skills/experimental/refine/rules). There was a similar one on HN yesterday called opencodereview: [https://news.ycombinator.com/item?id=48406358](https://news.ycombinator.com/item?id=48406358)
> > > > 
> > > > There are many such workflows out there! Matt Pocock gave a good talk about how he approaches it: [https://www.youtube.com/watch?v=-QFHIoCo-Ko](https://www.youtube.com/watch?v=-QFHIoCo-Ko)
> > > > 
> > > > **rednb** · [2026-06-07](https://news.ycombinator.com/item?id=48432292)
> > > > 
> > > > That's a big ask. This kind of harness usually contains plenty of proprietary insights about their business. And also, nowadays, a good harness is a major competitive advantage.
> > > > 
> > > > > **nullbio** · [2026-06-07](https://news.ycombinator.com/item?id=48432724)
> > > > > 
> > > > > Good thing I wasn't asking you.
> > > > > 
> > > > > Also, a skill is not a harness.
> > > > > 
> > > > > > **rednb** · [2026-06-07](https://news.ycombinator.com/item?id=48433908)
> > > > > > 
> > > > > > Your hostile tone is unfortunate, especially since my post was actually friendly. I was just trying to point why it is very likely the OP won't give you what you're asking so you're not left confused if he ends up ghosting you.
> > > > > > 
> > > > > > Many people use the term harness to refer to the agent coding software (eg. Opencode, Claude Code...), i use this term more broadly to refer to the environment (set of skills, system prompts, constraints, memory, hooks etc...). What the OP is referring to is not just one giant skill. It's usually a comprehensive ecosystem of skills, bespoke tools to make certain agent tasks deterministic (eg localization), and so on.
> > > > > > 
> > > > > > I've seen someone post Github repos in this thread, these can be very useful especially if you use the same tech stack, but you won't reach the level of productivity reported by successful teams unless you invest substantial time to build your own harness. But the way to do so is to do it progressively : start with something simple to address the need you have on day 1 . And then, turn recurring prompts into skills, turn recurring coding patterns and coding style recommendations into guidelines, turn repetivive tasks for which the LLM tends to build a python script that it occasionally gets wrong into a deterministic tool documented in a skill etc...
> > > > > > 
> > > > > > And after a couple of days, weeks, and months, you'll have a very dependable harness giving you optimal productivity, without needing to invest weeks of work upfront or take the fun out of agent-assisted coding.
> > > > > > 
> > > > > > Hope this helps.
> > > > > > 
> > > > > > > **yencabulator** · [2026-06-10](https://news.ycombinator.com/item?id=48479883)
> > > > > > > 
> > > > > > > Meanwhile, in the grandparent:
> > > > > > > 
> > > > > > > \> I wish these breathless blog posts would actually try to be more didactic.
> > > > > > > 
> > > > > > > *Especially* from a company actually trying to promote AI use, Mr. Occam says hiding such details is best explained by them not actually being that impressive.
> > > > > > > 
> > > > > > > (See also: Claude Code source leak)
> 
> > **gildas** · [2026-06-07](https://news.ycombinator.com/item?id=48433972)
> > 
> > I have an example of a side-project \[1\] where I think I naturally applied the best practices described in this article. My goal was to see if it's possible to code an entire project using a single agent (Claude).
> > 
> > To do this, I "simply" asked the agent, every time it encountered an issue, how to resolve it, using a validation tool or script. I also asked it to code these tools during audits. As a result, I now have over 30+ rules \[2\] for validating their commits. It's working pretty well now.
> > 
> > \[1\] [https://github.com/gildas-lormeau/rebuild-and-ruin](https://github.com/gildas-lormeau/rebuild-and-ruin) (let the timer expire to see the "demo" mode)
> > 
> > \[2\] [https://github.com/gildas-lormeau/rebuild-and-ruin/blob/a4c3...](https://github.com/gildas-lormeau/rebuild-and-ruin/blob/a4c348fc8fb3e3dc3dbb652495be3f5e8da09d23/package.json#L52-L91)
> > 
> > **tchalla** · [2026-06-07](https://news.ycombinator.com/item?id=48433693)
> > 
> > A lot to these blogposts are trying to catch on the next buzzword "harness". It's almost close to the productivity porn mindset that we witnessed 10-15 years ago where creating the complicated system is more exciting than using the system for daily tasks.
> > 
> > **kmetan** · [2026-06-07](https://news.ycombinator.com/item?id=48437004)
> > 
> > Instead of reading articles like this one end to end, I ask AI to read them in detail and prepare a new harness for me. The important part is not to do this in a single prompt, but to first create a detailed plan and let the model think deeply about each aspect. This approach lets me build the new harness without the missing didactic information you mentioned.
> > 
> > Basically, I am moving from “I build products without writing or reading the code” to “I build products without writing or reading the harness.”
> > 
> > Once the new implementation harness is prepared, I start it, but I keep the original session open. In that original session, “we” monitor the implementation harness from the outside: how effective it is, where the bottlenecks are, what breaks down, and what could be improved. From time to time, the monitoring session suggests changes to the implementation harness. We apply those changes, restart the harness, and monitor it again.
> > 
> > The overall approach is not to spend X hours understanding an article like this in detail, because another similar article will appear in 3 weeks. Instead, I take immediate action, learn on the fly, and replace the harness when a better pattern emerges. And yes, I still have to spend X hours on setting up, monitoring and fine tuning the new harness, but at the end I have the latest fancy "thing" working for me.
> > 
> > > **frankieg33** · [2026-06-09](https://news.ycombinator.com/item?id=48463119)
> > > 
> > > I will use chatgpt chat to do the same thing, but I like the idea of using basically a fork of the claude code session to splinter off and watch the system from the outside with the same amount of context
> > > 
> > > **drivebyhooting** · [2026-06-07](https://news.ycombinator.com/item?id=48437606)
> > > 
> > > I love this idea! Thanks
> 
> > **bze12** · [2026-06-07](https://news.ycombinator.com/item?id=48432738)
> > 
> > I agree. I followed this article for a repo I'm working on, and I had a very hard time inferring how, specifically, they implemented "providers" and enforced import layers. A sample repo would've been nice.

> **zatkin** · [2026-06-07](https://news.ycombinator.com/item?id=48430883)
> 
> I worry most about blindspots with this kind of approach. Let's say that this repository goes on for years, at which point the docs folder is several MB in size. Would Codex be able to think outside of the box? Or would the aggregate of the Markdown content fundamentally cover enough ground to prevent it from thinking of novel new approaches to existing problems?
> 
> > **esikich** · [2026-06-07](https://news.ycombinator.com/item?id=48431038)
> > 
> > You tell it to update the docs: not append. I've done the same thing with a readme in the root with links to the docs. After every commit, before the push, I have my agent "update all relevant and related docs, add or remove what's needed" or something to that extent. And it works remarkably well. I also have an append only change log it's supposed to add to. Between that, good commit messages, and comprehensive testing, I've built a homebrew OS and updating it is remarkably smooth. Runs a homebrew FTP and HTTP server and can run Wolfenstein. Working on DOOM right now. Close, but sound has been difficult.
> > 
> > [https://github.com/ESikich/smallos](https://github.com/ESikich/smallos)
> > 
> > > **satvikpendem** · [2026-06-07](https://news.ycombinator.com/item?id=48431819)
> > > 
> > > Someone else in the comments said to have it make a static website with the info instead with clickable pages and sections so it reads only the content it needs to rather than dumping a long file into context windows. Although I suppose you can have a ToC in the readme too with multiple smaller markdown files as references.
> > > 
> > > **vibcdingenjoyer** · [2026-06-07](https://news.ycombinator.com/item?id=48431275)
> > > 
> > > Yep. You’ve got to have it update the docs. After a few sessions, if I forget to request this, opus starts rehashing the same tasks and finds that they are complete - and sometimes still won’t update those docs unless I ask.
> > > 
> > > Another tip is to condense the doc files into the minimal required. Sometimes I’ll end up with 5 to 6 floating around in various states of staleness. Condensing to 2-3 and removing completed tasks seems to help a lot
> 
> > **therealdrag0** · [2026-06-07](https://news.ycombinator.com/item?id=48431412)
> > 
> > It’s not a self coding machine. There is human in the loop, they even added MORE engineers to the team of this project! 7 engineers should be able to collaborate with the AI to find good solutions to problems.

> **yurimo** · [2026-06-07](https://news.ycombinator.com/item?id=48431161)
> 
> What I still can't understand is why is massive amount of code generated is a flex? I don't feel that software has gotten a lot better in past 3 years, only sloppier. It's surprising to me that people who know about reward hacking choose a simple objective like lines of code generated as a signal for quality. I'd argue you have to optimize for less lines generated as possible while secondary optimization should be readability for humans. I suspect it's not seen as a problem by providers because more lines generated means more tokens used and hence more billing put out on customers.
> 
> And if I am working on an existing codebase then isn't a good commit often a negative sum between added and removed lines? I don't want to bloat my codebase but make it more polished and elegant. After reading that I wonder if what they have done could have been accomplished for a far fewer LoC budget.
> 
> > **YZF** · [2026-06-07](https://news.ycombinator.com/item?id=48431756)
> > 
> > Lines of code has always been a terrible metric. But all else being equal it is a measure. If all else is not equal, which is usually the case, then it's not.
> > 
> > A lot of the focus has been on AI recently.
> > 
> > Three years ago we didn't have software where a non-software engineer can describe what they want in English and get working (-ish) software generated by other software? Is that not "software has gotten a lot better"?
> > 
> > Other than that I'm not sure how we measure "software has gotten better". New applications? More features? How do we measure sloppier? Is Google Maps suddenly taking you the wrong way more often? I'm not really doubting your subjective experience but seriously how do tell? I mean a doc is a doc and a spreadsheet is a spreadsheet.
> > 
> > We're also only about 10 months into models that are powerful enough to potentially make a bigger difference and we are still figuring out how to use them best.
> > 
> > > **yurimo** · [2026-06-07](https://news.ycombinator.com/item?id=48432563)
> > > 
> > > I personally don't view coding agents making software as "software gotten better" you are comparing a tool and the end result, these are two different things. Agent you use going down and your product going down mean two different things to you customers. I will not deny that we made incredible progress in coding and hell, even design over the past 3.5 years, this technology is here to stay.
> > > 
> > > That being said while I agree that measuring better quality of software is vague (part of the reason it is hard for models as well), there are universal things I believe every engineer will agree on. Reliability, uptime, customer feedback, legibility of your engineering, performance, these are things we often optimized for. Google Maps is a bit of a strawman because neither of us (unless you work on it), knows how much agent code there is, I think it is likely that it's little since it was working fine prior to 2023. I could bring up github reliability as an example, given how much copilot usage they promote at MS, but once again only folks there know for certain. I do, however, see scores of various AI powered SAAS that looks like it is in a perpetual MVP state. I think you are right in that even if agents give us "good enough" results and we can swallow failure rates and our increasingly lesser understanding of what we, or more so model, created, then it is still progress overall, but this is progress not to human-AI collaboration but to AI-only engineering IMO, this is good or bad depending on how you view the future.
> > > 
> > > I'm a scientist and most of code I currently write is somewhere on the intersection of critical software and machine learning, squaring these two is not easy and I guess the way I was taught to reason about engineering informs my opinions on this. Maybe it's just a matter of time before codex can help here in an unconstrained manner as well, but I am skeptical at the moment.
> > > 
> > > > **YZF** · [2026-06-07](https://news.ycombinator.com/item?id=48437373)
> > > > 
> > > > My point was "look at what computers(software) can do today vs. 3 years ago" - for everyone. You are saying that software that the arborist can have ChatGPT write to help it draw the garden isn't the same quality as a team of software engineers would write manually (I think). GitHub is (mostly?) software for software developers. Most software in the world is software for random people. Nobody(tm) cares about the quality of GitHub. The "has software (computers) gotten better" has to be measured from the perspective of the consumer, not the perspective of the software engineer, and nobody using AI is going to tell you "computers now are worse/can do less than they were 3 years ago". At least that's my thesis.
> > > > 
> > > > If AI today can make you more productive that's already progress. If it can't then maybe it makes other people more productive.
> > 
> > > **Fargren** · [2026-06-07](https://news.ycombinator.com/item?id=48433660)
> > > 
> > > \> Lines of code has always been a terrible metric. But all else being equal it is a measure.
> > > 
> > > A terrible metric is \_worse\_ than no metric. A terrible metric can \_only\_ lead you in the wrong direction. "No metric" means saying we don't know, and that leads us to stop and reconsider. But we've taken "move fast and break things" as a mantra, and we'd rather run towards any direction than stay still.
> > > 
> > > Using LoC as a metric for quality of LLMs will promote LLMs that write more code. It's better to say we have no way to compare different LLMs than it is to say "let's use the LLMs that produced more LoC because at least we can measure that". We, as an industry, should be focusing on developing better metrics for quality, not on improving LLMs based on known-bad metrics. We should be turning to the computer scientists, not to the venture capitalists.
> > > 
> > > When a pundit talks about how many lines of code an LLM has created, we should lose all respect for them. It's as if someone talking about physics measured the phlogiston, or as if a doctor started measuring our skulls. We know these theories don't work, and anyone using them should be mocked.
> > > 
> > > **arcticbull** · [2026-06-07](https://news.ycombinator.com/item?id=48432182)
> > > 
> > > I also can't help but notice they didn't mention how many tokens were burned, or how much that translates to in terms of cost over the 5 months at enterprise AI prices. I'm going to guess this wasn't a cheap demo.
> > > 
> > > **csomar** · [2026-06-07](https://news.ycombinator.com/item?id=48433263)
> > > 
> > > \> Is Google Maps suddenly taking you the wrong way more often?
> > > 
> > > Funny you mention that because I had that issue in a cab just yesterday. Google decided to drive us of the main road to a series of small roads which happened to be a dead end. My guess is that the AI decided that this is a shorter road? less busier road?
> > > 
> > > That being said, Google maps have been gradually degrading. Most notably, its search function is quasi-broken now.
> 
> > **trollbridge** · [2026-06-07](https://news.ycombinator.com/item?id=48431569)
> > 
> > The "lines of code" at this point are basically the same thing as binary code that comes out of a compiler - something you almost never look at and certainly won't try to touch by hand.
> > 
> > The actual "code" is everything driving the harness.
> > 
> > The current problem for this is that the harness is not (yet) deterministic, so it's sort of like having a compiler where your output program works slightly differently every build, and then the compiler tries to just patch the binary programs when you recompile to minimise this problem, or even worse, disassembles the whole thing to figure out what it does, makes the chance, and then recompiles it.
> > 
> > > **yurimo** · [2026-06-07](https://news.ycombinator.com/item?id=48432116)
> > > 
> > > I think the telling part is in this line:
> > > 
> > > \> Because the repository is entirely agent-generated, it’s optimized first for Codex’s legibility
> > > 
> > > I asked a question from a perspective of a human engineer, as in, I will have to read the code and understand, fix it once it breaks. OpenAI approach is opposite, even if it is breaking it is the agent that will be doing the fixing, millions of lines and inelegant designs don't matter because human readability doesn't matter. In any case you use more tokens so you fork over more money.
> > > 
> > > I will say, however, that IMHO there is objectively bad and good code in terms what it can do and performance, if I can do the same thing in 50 lines as opposed to 1000 lines, this difference still matters for the model. Smaller context usage, better approach that informs downstream generation.
> > > 
> > > > **ArtRichards** · [2026-06-07](https://news.ycombinator.com/item?id=48432284)
> > > > 
> > > > This is the part I think we will see become more relevant.
> > > > 
> > > > I created docs-cli (pypi) to manage the index of specs as source code: the framework that goes with it will first create tests for as much as it can, so reproducability becomes the goal, not readability.
> > > > 
> > > > [https://github.com/ArtRichards/docs-cli](https://github.com/ArtRichards/docs-cli)
> > > > 
> > > > [https://artrichards.github.io/agent-playbook-suite/blog/](https://artrichards.github.io/agent-playbook-suite/blog/)
> 
> > **jstummbillig** · [2026-06-07](https://news.ycombinator.com/item?id=48433371)
> > 
> > Well, to be fair, the amount of goalpost shifting that is going on is quite intense. AI not being able to work in a "serious" project, and being limited to "toy projects" has been a long standing critique.
> > 
> > But also, bigger projects need some amount of loc written and it's a bit silly to pretend that this is not the case or a bad thing.
> > 
> > So the answer to the question is roughly: Establishing that an agent can work in a large-ish code base is valuable, because 1) them not being able to do so has been a critique and 2) it's something that is required for a lot of software projects.
> > 
> > > **uxhacker** · [2026-06-07](https://news.ycombinator.com/item?id=48433955)
> > > 
> > > Should we not be counting function points rather than LOC’s.
> > > 
> > > Lines of Code is a meaningless measure. It should also be easy to count function points using AI.
> > > 
> > > > **embedding-shape** · [2026-06-07](https://news.ycombinator.com/item?id=48434000)
> > > > 
> > > > I'd argue LoC isn't actually a meaningless measure, but people use it the wrong way. The same program with the same features but less LoC is more likely to have a proper design and architecture, and is most likely easier to change and maintain in the future. Of course, only if it's less LoC because of proper design, not because you've folded everything to one line.
> > > > 
> > > > So if anything, we should find a way to aim for as little lines of code as possible. If you have two agents, and one can build exactly the same program as another, but with half the LoC, then most likely the first agent is better at software engineering and particularly software design.
> > > > 
> > > > Of course, as the author of an experiment that investigated exactly this, I'm slightly biased. Cursor's browser had millions lines of code which sounded weird to me based on the features and functionality it had. Meanwhile, I built the same thing but actually thinking about the design with the agent and ended up with ~20K lines of code instead.
> > > > 
> > > > **Garlef** · [2026-06-07](https://news.ycombinator.com/item?id=48434018)
> > > > 
> > > > Sure; But that's not the point that is argued about here.
> > > > 
> > > > (To state it in AI lingo:)
> > > > 
> > > > It's not about the best measure for "amount of code".
> > > > 
> > > > It's about wether "amount of code" is a good metric to begin with.
> > 
> > > **TeriyakiBomb** · [2026-06-07](https://news.ycombinator.com/item?id=48433442)
> > > 
> > > I don’t think it’s solvable. And I think Anthropic etc know it. LLMs can only reconstitute things in its training data and they are so hungry they can’t do a good job in long lived codebase full of complexity and novelty. There’s never going to be enough similar code on the open internet.
> > > 
> > > > **ElFitz** · [2026-06-07](https://news.ycombinator.com/item?id=48433558)
> > > > 
> > > > \> LLMs can only reconstitute things in its training data
> > > > 
> > > > Such as a 4D raytracing engine in Metal? Or integrating APIs for features first released months after their knowledge cut-off date?
> > > > 
> > > > LLMs have shown an ability to transfer "knowledge" and capabilities across domains, languages, and use-cases outside their training data.
> > > > 
> > > > Case in point: GPT-2 "learning" to translate English to French and vice versa despite non-English examples having been voluntarily (and *almost* entirely) removed from the dataset.
> > > > 
> > > > > **data\_maan** · [2026-06-07](https://news.ycombinator.com/item?id=48433882)
> > > > > 
> > > > > Was this in the GPT2 paper?
> > > > > 
> > > > > > **ElFitz** · [2026-06-07](https://news.ycombinator.com/item?id=48434652)
> > > > > > 
> > > > > > In "Language Models are Unsupervised Multitask Learners"\[0\]. Not sure whether it’s "the" GPT-2 paper.
> > > > > > 
> > > > > > 3.7 Translation
> > > > > > 
> > > > > > \> Performance on this task was surprising to us, since we deliberately removed non-English webpages from WebText as a filtering step. In order to con- firm this, we ran a byte-level language detector2 on WebText which detected only 10MB of data in the French language \[…\]
> > > > > > 
> > > > > > \[0\]: [https://cdn.openai.com/better-language-models/language\_model...](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)
> 
> > **jh00ker** · [2026-06-07](https://news.ycombinator.com/item?id=48432548)
> > 
> > \>I suspect it's not seen as a problem by providers because more lines generated means more tokens used and hence more billing put out on customers.
> > 
> > I have also grown skeptical of token usage in order to run up my bill! But since I feel like it takes me MORE effort to write LESS lines of code myself, I'd expect a quick and dirty AI-generated solution to be MORE lines of code and cost LESS to generate than a concise/elegant solution in LESS lines of code.
> > 
> > > **small\_model** · [2026-06-07](https://news.ycombinator.com/item?id=48433217)
> > > 
> > > The latest frontier models will write code better than you and more elegant, with less lines of code, in 100th of the time, with full test coverage. Hand coding is like writing out assembly/machine code rather than using a compiler.
> > > 
> > > > **camdenreslink** · [2026-06-07](https://news.ycombinator.com/item?id=48434592)
> > > > 
> > > > This hasn’t been my experience. State of the art models available to the public still do all sorts of bandaids and bad hacks. Putting code where it doesn’t belong. Stapling types onto variable (in TypeScript) when abstractions/types already exist to use. I use it to generate code, but still have to review every line and have corrections/steering basically every time.
> > > > 
> > > > Maybe you have access to some other model?
> > > > 
> > > > **bitwize** · [2026-06-07](https://news.ycombinator.com/item?id=48434134)
> > > > 
> > > > This.
> > > > 
> > > > Insisting on writing code by hand when LLMs are available is not software engineering in 2026. Engineers find the most cost-effective solution for the problem at hand that meets the requirements.
> > > > 
> > > > **dwb** · [2026-06-07](https://news.ycombinator.com/item?id=48434267)
> > > > 
> > > > \> The latest frontier models will write code better than you and more elegant
> > > > 
> > > > They often do, but they often don’t. I regularly have to push for more elegant, or less lazy solutions.
> 
> > **crdrost** · [2026-06-07](https://news.ycombinator.com/item?id=48431405)
> > 
> > Yeah so all of personal computing—text editing, SVG antialiasing, etc, fits in 20,000 LOC (VPRI's STEPS project) so a million lines of code is 50 reïnventions of personal computing. BUT: it is unlikely that humans would have solved this problem in 20 kLOC. Sussman said “we really don't know how to compute!” as his talk title and LLMs had to ossify some pre-existing voice as the forever programming *habitus* and it chose a persona that doesn't know how to program—because we don't —and now we are stuck with it. Claude is our tickets, our implementations, our documentation... And if you tell it “hey the node role should not have those permissions, that should be a service account” it will happily do the right thing, but it has no intrinsic sense of taste and the error message it's trying to clear just says “the node role doesn't have that permission and the system prompt says “keep it short, stupid ” and graybeards might be our last bulwark.
> > 
> > > **zahlman** · [2026-06-07](https://news.ycombinator.com/item?id=48431911)
> > > 
> > > \> VPRI's STEPS project
> > > 
> > > The what now? Search engines failed me here.
> > > 
> > > > **linguae** · [2026-06-07](https://news.ycombinator.com/item?id=48432203)
> > > > 
> > > > This is a description of Alan Kay’s STEPS project:
> > > > 
> > > > [https://worrydream.com/refs/Kay\_2007\_-\_STEPS\_2007\_Progress\_R...](https://worrydream.com/refs/Kay_2007_-_STEPS_2007_Progress_Report.pdf)
> > > > 
> > > > This is the final report:
> > > > 
> > > > [https://tinlizzie.org/VPRIPapers/tr2012001\_steps.pdf](https://tinlizzie.org/VPRIPapers/tr2012001_steps.pdf)
> 
> > **dotancohen** · [2026-06-07](https://news.ycombinator.com/item?id=48432319)
> > 
> > I've heard it said that measuring productivity of a software developer by lines of code added, is akin to measuring the productivity of an aerospace engineer by mass added.
> > 
> > It is a metric. It is often not a good metric. But it is easy to measure.
> > 
> > > **Sparkyte** · [2026-06-07](https://news.ycombinator.com/item?id=48432513)
> > > 
> > > Indeed. The more you do to add complexity or generate without ensuring it isn't pointless code adds bloat. It is still probably more MVP than junk developers will do, but not ever anywhere near as great as someone who studies a programming language.
> 
> > **CTDOCodebases** · [2026-06-07](https://news.ycombinator.com/item?id=48433341)
> > 
> > I think it's a rebuttal against claims that LLMs are incompatible with large code bases. It's not so much a flex about the quality of the code, it's more a flex about the complexity of the code and the LLMs ability to deal with such complexity.
> > 
> > Whether or not that complexity is warranted is a different story.
> > 
> > The codebase may be bloated by a factor of 10 but if the costs associated with that are less than the costs of developing the software from a business standpoint the choice is clear.
> > 
> > **Lwerewolf** · [2026-06-07](https://news.ycombinator.com/item?id=48434326)
> > 
> > Far from everybody is using it for massive code generation - code size is still very much a liability. I currently use it (ds4-flash, local, code isn't open to non-local) to modify and trim a certain internal project for a different use case. Tons of review passes, fuzz test generation and running, "give me your thoughts on this", etc, etc - basically iterating over and over and over. Funnily enough, my intrinsic knowledge of the codebase improves massively like this. It is involved, but the acceleration is real - and I don't have to worry about wrist nerves as much.
> > 
> > The only people I know that have LoC/token use/etc metrics imposed on them work for big corps where such things are (or used to be) en vogue.
> > 
> > **bonigv** · [2026-06-07](https://news.ycombinator.com/item?id=48431923)
> > 
> > It is a very valid question. My intution (no grounding) is to the model training. Optimizations traditionally have worked well in human wrote software with either experience of the developer , usage of architectural patterns or a second ir third pass of fine tuning. In case of model written code - (e/p one token at a time), only possible orchitectural optimization is either with a strict guardrail on patterns to use for a specific implementation OR by giving a second or third optmization path. All of which burns more tokens, but can lead to better software.
> > 
> > **pyrale** · [2026-06-07](https://news.ycombinator.com/item?id=48433291)
> > 
> > \> It's surprising to me that people who know about reward hacking choose a simple objective like lines of code generated as a signal for quality.
> > 
> > The simple answer is that promoting locs as a relevant metric is also reward hacking. Is it easier to promote big loc counts as a key metric, or is it easier to prove agentic engineering against harder metrics?
> > 
> > On a more general note, software practice marketers have been pushing in that direction for quite a while. "You need cloud", "Here's how to do agile at scale", "microservice everything", etc.
> > 
> > **B-Con** · [2026-06-07](https://news.ycombinator.com/item?id=48432237)
> > 
> > People want to do X, so the metric is how much X can be done.
> > 
> > Everyone is over-complicating the explanation. The answer for "why are we fixating on this bad metric" is almost always the same pattern.
> > 
> > Broad audiences need simple metrics to talk about. If the metric itself requires nuance, it's hard to communicate and hard to reason about. It's easier to push the need for nuance from understanding the metric itself down the road to where the metric is applied, which allows everyone to ignore it in immediate conversation.
> > 
> > **small\_model** · [2026-06-07](https://news.ycombinator.com/item?id=48433204)
> > 
> > It's not massive amount of code for the sake of it, it's that it built a complex large piece of software itself. If you compared the linux kernel LOC to some guys toy kernel on GitHub the LOC difference should give you an idea on the complexity. "Yeah why is Tolstoy flexing about his number of pages in his book, I wrote Spot goes to school and its only 20 pages"
> > 
> > **bjertoref** · [2026-06-07](https://news.ycombinator.com/item?id=48433565)
> > 
> > \> I suspect it's not seen as a problem by providers because more lines generated means more tokens used and hence more billing put out on customers.
> > 
> > To generate elegant code with more restrictions, it means more thinking tokens and more stronger adherence to instructions. So tha naive view that they are doing it for billing is wrong.
> > 
> > **cpard** · [2026-06-07](https://news.ycombinator.com/item?id=48431579)
> > 
> > I don’t think the flex here is the amount of code alone. Their goal is to show that AI can improve productivity, the number of lines is just the proxy to that. This article is a marketing piece after all.
> > 
> > Now someone can argue that lines of code are not a good proxy of engineering productivity, but I wouldn’t be surprised if the audience they target with this content is not the HN commenters of this thread.
> > 
> > > **zbrock** · [2026-06-07](https://news.ycombinator.com/item?id=48435155)
> > > 
> > > Correct on the first part, partially correct on the second. LOC is a bad metric, but it is at least a legible one. Lots of people working on better ways to measure Software Productivity!
> 
> > **Npovview** · [2026-06-07](https://news.ycombinator.com/item?id=48432087)
> > 
> > Don't compare human loc with machine loc.
> > 
> > Compare machine to machine (as these headlines come) and discount that by a factor.
> > 
> > > **yurimo** · [2026-06-07](https://news.ycombinator.com/item?id=48432217)
> > > 
> > > You can't really do that here because one of the key arguments for this, as people in the thread focus on is "1/10th of time" estimate, the comparison with humans is here already, albeit it is just an estimate and no actual comparison has been done.
> > > 
> > > This is a problem of conflicting incentives that exists today in my opinion. Companies will market greater human-AI collaboration in science and engineering but focus on releasing things like this where it is clear that downstream goal is complete agent ownership over the product, from inception to testing to monitoring. Maybe the speculative future agents will use their own very efficient language to code that won't be readable for people at all. They focus on agent code being readable by agent in the article, as you've said. But in my mind in at least near future, there is a case where your prod will break, you won't be able to understand it or the attempted fixes. Maybe agent will fail to fix it at all and start a massive rewrite. In any case is this different from kicking technical debt down the road along with worse interpretability of what you have built?
> > > 
> > > I do think there is a way where agent can write great solid code that we can read, but with the way LLMs are built this requires something new in terms of reward that accounts for "taste" and constant refinement so it might take more than 1/10th of a time to produce something good.
> 
> > **threethirtytwo** · [2026-06-07](https://news.ycombinator.com/item?id=48431784)
> > 
> > Because sloppy code and doesn't matter. He wrote he completed it in 1/10th time. That's equivalent to 1/10th the engineers.
> > 
> > That is a business win. That is really all that matters in capitalism.
> > 
> > The flex is a direct insult to your face. He is shitting on the faces of all software engineers (me included). It is equivalent to saying we don't need you to code anymore. One man can produce 10x the code.
> > 
> > So why am i voting him up even though he's shitting on my face? Because what he says is true. I value honesty and people who say things like it is. Yes my identity as a software engineer is getting dismantled before my very eyes. But the solution to this problem isn't some delusional statement about not understanding what he's flexing about. We're not stupid. Everyone on this thread understands his flex. The difference is some people like you don't want to understand it.
> > 
> > Like seriously. He literally wrote it was completed in 1/10th of the time and you expect me to believe that YOU don't know what HE is flexing about? Be real. You're not stupid.
> > 
> > > **estetlinus** · [2026-06-07](https://news.ycombinator.com/item?id=48431955)
> > > 
> > > The real flex is delivering it in one-tenth of the time. Mentioning lines of code is mostly noise.
> > > 
> > > I’ve worked with 20-year-old codebases and products that grew organically over decades and still sit well below a million lines of code. Using LOC as some kind of health or success metric makes me more suspicious than impressed.
> 
> > **dumbdumb125** · [2026-06-07](https://news.ycombinator.com/item?id=48431391)
> > 
> > It's a huge flex if the alternative is no code at all. Reward hacking aside, LOC resonates with me in the sense that I've seen 10+ projects to fruition that wouldn't have even begun without an agentic harness and an LLM.
> > 
> > It's like the difference between doing stock price predictions with binary "up" or "down" histories and trying to figure out how to normalize actual price histories (basically impossible). The binary work gives a well-defined signal.

> **zuzululu** · [2026-06-07](https://news.ycombinator.com/item?id=48432138)
> 
> I think a lot of people are sleeping on the contents of this article. There is still valuable tidbits I'm going to be applying.

> **swyx** · [2026-06-07](https://news.ycombinator.com/item?id=48432395)
> 
> we interviewed Ryan here: [https://www.latent.space/p/harness-eng](https://www.latent.space/p/harness-eng)
> 
> and he gave a talk version of it in london: [https://www.youtube.com/watch?v=am\_oeAoUhew](https://www.youtube.com/watch?v=am_oeAoUhew)
> 
> > **pramodbiligiri** · [2026-06-07](https://news.ycombinator.com/item?id=48436248)
> > 
> > This is a great interview! I had to switch from the transcript to watching it though - the transcript had many mistakes.
> > 
> > > **swyx** · [2026-06-07](https://news.ycombinator.com/item?id=48439892)
> > > 
> > > ya sorry we upgraded our thing after this

> **patdoli** · [2026-06-07](https://news.ycombinator.com/item?id=48434560)
> 
> \> We tried this early on — used ChatGPT as "project manager" to set up the entire harness before writing any code. After a week it produced 140+ docs of rules, architecture, frameworks. Zero lines of code. When we finally brought in another tool to review, the verdict was: "a perfectly secure empty safe." The harness was immaculate. There was just nothing inside it. > > Harness matters, but if you're not shipping code alongside it, you're just writing fiction.

> **faangguyindia** · [2026-06-07](https://news.ycombinator.com/item?id=48430815)
> 
> Codex updates usually appear every few hours (i am not saying this how often it's published) but that's my perception as a user. Often i update codex just to see new update within an hour so.
> 
> Many times those updates are not properly tested, for example in one update the model selector got completely changed.
> 
> then next hotfix was pushed which restored original.
> 
> > **dawnerd** · [2026-06-07](https://news.ycombinator.com/item?id=48430843)
> > 
> > Who needs a QA team when you can just test on users and iterate instantly /s

> **epolanski** · [2026-06-07](https://news.ycombinator.com/item?id=48434107)
> 
> I am not much understanding the naysayers here.
> 
> I will do a premise: I don't like where software engineering is heading, at all. I have never been unhappier to work in this field since AI came out. And no, it is not possible to opt out of AI, especially when your teammates are all great engineers whose productivity increased a lot without any drops in quality code-wise (in fact the opposite has happened). You need to keep up. But it's tiring and the fun/interesting parts are disappearing.
> 
> That being said, it's clear that harness engineering is the most important part of our job and that task is going to take increasingly more of our time. And thus having a glimpse of how an AI company handles it is by any means interesting.

> **advertum** · [2026-06-08](https://news.ycombinator.com/item?id=48441744)
> 
> LOC was never really the point, if anything it's often the opposite. Being able to say the same thing more concisely makes code cheaper to maintain and easier to understand. (Not always: sometimes people are concise just for its own sake, and that's worse.) Either way, that whole debate feels like the past now.
> 
> As for metrics based on how much was produced or spent, like companies measuring developer performance by tokens used, that's a dead end regardless. Performance should be measured by outcomes: incident/failure rate, SLA, user numbers and feedback, revenue, that kind of thing.

> **charintstr** · [2026-06-07](https://news.ycombinator.com/item?id=48431306)
> 
> I am at a major company that is essentially vibe coding. I’ve shipped about 100k LoC this entire half and am toward top 10% of my team. I find it likely that either
> 
> A. The code is absolute garbage and is speed for speed sake B. They’re using an internal model that is a generation beyond GPT 5.5
> 
> I say this because we’ve attempted to do something similar using the latest gen Claude models and a significantly larger team. The code is probably along the lines of millions LoC but is an absolute mess because of vibing. There’s a price you pay for speed
> 
> > **sajithdilshan** · [2026-06-07](https://news.ycombinator.com/item?id=48432840)
> > 
> > I think vibe coding is okay for a small internal tool, dashboard, etc. but it’s definitely a no-go for a production running service.
> > 
> > **iso1337** · [2026-06-07](https://news.ycombinator.com/item?id=48431912)
> > 
> > Q1 - How much effort did you put into deterministic guardrails like AST linters, etc?
> > 
> > I find there’s a ton of slop unless hard guardrails are added, eg step 1 is just around syntax, step 2 is to enforce mental models
> > 
> > You still need someone steering direction and have a logically consistent idea of what you actually want to build
> > 
> > Q2 - I find that vibe coding really accelerates FE projects because it’s possible to run everything locally and check results
> > 
> > For pure distributed infra backend more investments have to be made into the devloop to be able to shift left the feedback loop and decouple it from humans or real deploys
> > 
> > **therealdrag0** · [2026-06-07](https://news.ycombinator.com/item?id=48431432)
> > 
> > I like how they said they were spending 20% of their time addressing slop. Sounds like they’ve tried to automate the slop correction but it’s a good honest reminder.
> > 
> > Additionally it’s an internal tool, which is likely much more amenable to slop.

> **jonmoore** · [2026-06-07](https://news.ycombinator.com/item?id=48431116)
> 
> This would be much more convincing if the repos, issue trackers, etc. were accessible.

> **skulquake** · [2026-06-07](https://news.ycombinator.com/item?id=48437050)
> 
> Thanks for pointing this article out, it really helped me in optimizing a pattern I'm developing to ensure agent context windows don't get bloated over time.

> **ajpaulson** · [2026-06-07](https://news.ycombinator.com/item?id=48431801)
> 
> \> The diagram below shows the rule: within each business domain (e.g. App Settings), code can only depend “forward” through a fixed set of layers (Types → Config → Repo → Service → Runtime → UI). Cross-cutting concerns (auth, connectors, telemetry, feature flags) enter through a single explicit interface: Providers. Anything else is disallowed and enforced mechanically.
> 
> Can anyone give me a simplified explanation of what they’re saying here? Having some trouble understanding.
> 
> > **shepherdjerred** · [2026-06-07](https://news.ycombinator.com/item?id=48431924)
> > 
> > They're describing a layered architecture enforced by some script in CI.
> > 
> > For example, if you had a \`backend\`, \`common\`, and \`frontend\` package, you would be OK having backend/frontend depending on common, but you wouldn't want common depending on backend/frontend or backend/frontend depending on each other.
> > 
> > If you think about JavaScript, there is nothing stopping your dependency graph from becoming spaghetti. It sounds like they built static analysis to enforce rules.
> > 
> > Some languages have this built in like Java (Project Jigsaw), Go, and Rust. JavaScript, Python, etc. have no such feature.
> > 
> > It's really nothing special -- it has existed before. It just becomes a \_lot\_ more important with agents since they produce a lot of code, and it is good to have lots of static analysis when heavily utilizing agents.
> > 
> > They mention this in the article:
> > 
> > \> This is the kind of architecture you usually postpone until you have hundreds of engineers. With coding agents, it’s an early prerequisite: the constraints are what allows speed without decay or architectural drift.
> > 
> > **iso1337** · [2026-06-07](https://news.ycombinator.com/item?id=48431871)
> > 
> > IIUC its just strict separation of concerns
> > 
> > Eg UI cannot reach down and directly read config files
> > 
> > Configs must be only read by (im assuming) a storage interface layer called repo
> > 
> > There’s a strict directionality of dependency
> > 
> > Somewhat similar to ports and adaptors but presumably more strictly enforced by deterministic linters
> > 
> > **pramodbiligiri** · [2026-06-07](https://news.ycombinator.com/item?id=48432799)
> > 
> > As other commenters have clarified, it's about layering, separation of concerns etc. Goes by many names. One such terminology here: [https://en.wikipedia.org/wiki/Hexagonal\_architecture\_(softwa...](https://en.wikipedia.org/wiki/Hexagonal_architecture_\(software\)). DI frameworks use terminology like "Provider": [https://en.wikipedia.org/wiki/Dependency\_injection#Injectors](https://en.wikipedia.org/wiki/Dependency_injection#Injectors)

> **bigcat12345678** · [2026-06-07](https://news.ycombinator.com/item?id=48432430)
> 
> This matches quite verbatim for my cursor based agentic repo.
> 
> There isn't anything that were not already experienced and factored into constructs in the repo.
> 
> And I also find all of the bits created for an effective agentic engineering project, matches perfectly with the main stream engineering best practices. That has been one of my primary reason to all in on agentic engineering, prior to this, applying best practices is always too costly and conflict with teams daily priority.

> **andai** · [2026-06-07](https://news.ycombinator.com/item?id=48431018)
> 
> \> To drive a PR to completion, we instruct Codex to review its own changes locally, request additional specific agent reviews both locally and in the cloud, respond to any human or agent given feedback, and iterate in a loop until all agent reviewers are satisfied (effectively this is a Ralph Wiggum Loop ).
> 
> [https://ghuntley.com/loop/](https://ghuntley.com/loop/)
> 
> > **aniceperson** · [2026-06-07](https://news.ycombinator.com/item?id=48432978)
> > 
> > ok, but you had 1x token to generate , then more 1x to review locally, 1x for the agent local, 1 x for the cloud. then ???x until all bots are satisfied.
> > 
> > You end-up spending at least 5x the amount of tokens for maybe prediction machine to find a discontinuity?
> > 
> > I would say a way better approach is 1.123x to generate code + tests + passing analysis tools + human review + 1x "simplify as much as possible", than letting the snake its own tail without boundaries.

> **Frannky** · [2026-06-07](https://news.ycombinator.com/item?id=48431433)
> 
> I started using chatgpt for functions and checking, then for single file changes and checking, now for multiple changes and checking. I am at a point where the only changes I correct are architectural. So it may start to become smarter to learn how to see only the architectural directions while multiple agents work, test, and commit both on unit and against live deployment.

> **darepublic** · [2026-06-07](https://news.ycombinator.com/item?id=48430647)
> 
> Codex pushed an update that made my old threads inaccessible. This takes a million of lines to put out a half baked crud app?

> **simonbarker87** · [2026-06-07](https://news.ycombinator.com/item?id=48432746)
> 
> I’d be interested to know two things:
> 
> 1\. What’s the job satisfaction like day to day being an engineer on this project? How have they adapted to this way of working?
> 
> 2\. How much did it cost? Work is being done whilst the engineers sleep but if that 6 hours overnight task cost $300 and could have been done by a person in 2 hours is it a real saving?
> 
> > **epolanski** · [2026-06-07](https://news.ycombinator.com/item?id=48434150)
> > 
> > \> 1. What’s the job satisfaction like day to day being an engineer on this project? How have they adapted to this way of working?
> > 
> > The job satisfaction is looking at the bank account every time you feel your job sucks.

> **Aperocky** · [2026-06-07](https://news.ycombinator.com/item?id=48431057)
> 
> 1 million lines of code aside, I feel like anyone who seriously thought about this would eventually run their own harness.
> 
> Just like .vimrc and .zshrc, the harness "code" itself can be easy and personal. Provided that it's built on working and existing construct such as tmux.

> **janpeuker** · [2026-06-07](https://news.ycombinator.com/item?id=48433671)
> 
> I find it so interesting "Agent legibility is the goal" picks up James C. Scott term (without defining it, so I assume that's what they mean) which is \_not a good thing\_. Legibility is a governance effort to box in life.
> 
> > **williamcotton** · [2026-06-07](https://news.ycombinator.com/item?id=48433997)
> > 
> > Legibility has a time and place, for example, global health data around pandemics.

> **egorferber** · [2026-06-07](https://news.ycombinator.com/item?id=48434405)
> 
> Yep thats true pre grounding is very much worth it, if you just feed the agent a quick environment brief upront instead of making it spam tool calls to figure out where it is, you save a lot of tokens.

> **xyzal** · [2026-06-07](https://news.ycombinator.com/item?id=48433895)
> 
> Given that we can code at 10x speed for at least half a year, one would expect to see at least some pieces of machine-created software with 5 years' worth of equivalent human engineering work.
> 
> Anyone know some?

> **osigurdson** · [2026-06-07](https://news.ycombinator.com/item?id=48435754)
> 
> They will have to open source it. Otherwise it is impossible for anyone outside of OAI to gain any insights - basically just a Boris at this point.

> **IAmGraydon** · [2026-06-07](https://news.ycombinator.com/item?id=48431458)
> 
> Title should probably be marked with (February 2026).

> **apical\_dendrite** · [2026-06-07](https://news.ycombinator.com/item?id=48431049)
> 
> I wonder why we as engineers aren't protesting AI in the same way that artists and people in film and television are. This post should instill the same terror that visual artists feel.
> 
> If you're a more senior person in tech, this post is effectively saying that a large portion of your skillset is about to become completely worthless. This goes beyond the skills involved in writing the code. Everything that you've learned over years about how to determine whether code is good or bad, and what practices make an engineering team effective is not just obsolete, it's fundamentally counter-productive because it assumes a slow, human-centric process that requires you to actually review and understand the code. Even your ability to mentor junior engineers is now obsolete, because all that experience you've built up is now worthless to them.
> 
> If this is the approach the industry takes, particularly when combined with a lack of interest in quality from the business (and let's face it, consumers have shown us that they're happy to pay for cheap crap), it's hard to see much of a future for software engineers. You don't need thousands of people with deep technical expertise, you need a handful of manager-types, who will focus on defining product and business requirements and configuring how the AI gets enough context to implement the requirements.
> 
> Maybe, if we're extremely lucky, there's so much demand for software that total employment doesn't fall off a cliff, but the nature of the work will change so much that many older, more expensive engineers will become unemployable. Those who remain will have to accept that the skills they spend decades developing are now worthless, that younger engineers no longer respect or listen to them, that the business no longer sees them as experts worthy of respect, but old fogies who grew up in a different world.
> 
> Joe Biden liked to say that a job is more than just a paycheck, it's part of your identity and your sense of self-worth. We're all very used to a certain level of respect (and commensurate remuneration). If you don't think that's true, compare how a software engineer is treated to how a warehouse worker is treated. What happens when we lose that?
> 
> > **linsomniac** · [2026-06-07](https://news.ycombinator.com/item?id=48431156)
> > 
> > \>a large portion of your skillset is about to become completely worthless
> > 
> > I'm not convinced of that.
> > 
> > I watched a video of an architect using AI to create architectural drawings. It became very clear to me that he has a lot of skills and terminology that helped him produce something very specific, in a few minutes. I've been working on some home improvement stuff including a studio/shed and I've struggled to produce even something simple (currently trying to get a conversation packet on the roof trusses to take the the permit department to get started). Even with my high school architecture class.
> > 
> > After watching that I wonder how much of what I'm doing with AI that looks easy is because I hae a deep technical knowledge, plus 3 years of heavy work with AI.
> > 
> > > **apical\_dendrite** · [2026-06-07](https://news.ycombinator.com/item?id=48432101)
> > > 
> > > This is the case now - I can explain to the AI that I want to re-factor a component to support different implementations using a strategy pattern, and I can get a similar outcome to what I would have written, just implemented a bit faster. My expertise brings value.
> > > 
> > > But that's not what this specific article is describing. The world this article is describing is one where you describe the business requirements, and you don't think about how it's implemented. You don't write the code, you don't review the code, you don't test the code. You give the AI business requirements and you give it access to sources of context (slack, meeting notes, etc). Every place where the human would act as a gate reduces throughput, so it should be eliminated through building harnesses and providing context.
> > > 
> > > What they're doing here is the equivalent of taking a factory where you have 2 process engineers and 100 operators, and replacing all the operators with robots. They want to automate the whole process of making the software and just leave the part that figures out how to make the automation work effectively.
> > > 
> > > In this world, the average software company doesn't need people who know how to write good software, because writing, reviewing, maintaining, and testing the software will be entirely automated. There will be a small number of people at companies like OpenAI that need to know how to write good software in order to supervise training the models, and there will be a small number of people at the software companies who have expertise in setting up the automation.
> > > 
> > > > **linsomniac** · [2026-06-07](https://news.ycombinator.com/item?id=48434861)
> > > > 
> > > > \>where you describe the business requirements
> > > > 
> > > > That right there is what I'm talking about: that architect would write the requirements for a building *way* different than I would.
> > 
> > > **jplusequalt** · [2026-06-07](https://news.ycombinator.com/item?id=48431686)
> > > 
> > > How do you keep your skills if you no longer engage in the activity that keeps them sharp?
> > > 
> > > > **linsomniac** · [2026-06-07](https://news.ycombinator.com/item?id=48434798)
> > > > 
> > > > See, I just don't get that angle.
> > > > 
> > > > Just because I'm not typing "strcat(); strcpy(); sprintf()" doesn't mean I'm not thinking about problems. I'm still doing critical thinking all over my stack, and I don't see that going away. I'm just doing different thinking.
> > > > 
> > > > There are people who think, and AI just isn't going to change that. There are people who don't think, and they've existed long before AI. Back in the 90s when I worked at the phone company, man, I worked with some people who didn't do a lick of work (along with some really sharp people).
> 
> > **YZF** · [2026-06-07](https://news.ycombinator.com/item?id=48431840)
> > 
> > What is that protest going to get us? We'll convince or force business leaders to not use a cheaper/better tool and protect our jobs? And nobody else in the world is going to pivot either? And our companies will remain competitive?
> > 
> > Software engineers have always adapted to new technologies. New languages, frameworks, native apps, browser apps etc. So far this doesn't seem to be close to completely removing us from the loop.
> > 
> > If you are smart, educated, and can adapt, you'll figure it out. The economy has to find some stable equilibrium and it's not a zero sum game. Everyone in the economy getting a paycheck is also a consumer. With no consumers there is no business. The companies who are using AI and become more productive can do more things that before were not profitable but now are. Some of the people who are getting laid off are going to start new businesses and hire people. These things always cycle, and they basically have to.
> > 
> > I don't have a crystal ball though.
> > 
> > **briHass** · [2026-06-07](https://news.ycombinator.com/item?id=48431324)
> > 
> > It's the other way around, unfortunately. The senior engineers will still be useful for architecture and infrastructure considerations, as well as guiding the agents. It's the junior engineers that get nailed, because there's little incentive to hire one when a LLM does a better job immediately and costs less.
> > 
> > > **apical\_dendrite** · [2026-06-07](https://news.ycombinator.com/item?id=48432146)
> > > 
> > > That's true now. But in the world of this article, it's also the senior engineers that get nailed. In the world of this article, all code is like what machine code or bytecode is now - it's designed to be used by the machine, not the human, because the expectation is that humans will rarely, if ever, touch it.
> 
> > **mhitza** · [2026-06-07](https://news.ycombinator.com/item?id=48432133)
> > 
> > Individual voices aren't strong enough to drown the marketing machine.
> > 
> > Artists and writers are unionized, why they have a more powerful collective voice.
> > 
> > Second, there are enough peole for which their jobs are very well paid and too cozy to dare to rock the boat.
> > 
> > The economy and job market isn't so hot either at the moment for people to quickly be able to jump ship.
> > 
> > Can you even be sure that you find a tech company that isn't jumping head first onto the AI hype train? Even politicians can't have enough of AI in their mouth.
> > 
> > **usernametaken29** · [2026-06-07](https://news.ycombinator.com/item?id=48432108)
> > 
> > I for one am not protesting because I know that this is bullshit marketing nonsense. Look at reliability metrics of OpenAI, they’re terrible. Everyone knew a long way ahead that it’s a scam, now they’re cranking up pricing and trying to rug pull. There will be a lot of developers who will come out very well once the stock tanks. That’s my two cents
> > 
> > **zuzululu** · [2026-06-07](https://news.ycombinator.com/item?id=48432183)
> > 
> > engineers undervalue their own process
> > 
> > artists overvalue their own outputs

> **mgaunard** · [2026-06-07](https://news.ycombinator.com/item?id=48432207)
> 
> Isn't this essentially normal AI usage and what everyone has been doing for 6 months?

> **DenisM** · [2026-06-07](https://news.ycombinator.com/item?id=48437228)
> 
> Notably the feed metrics and traces into the agent. I never thought of doing that.

> **drchaim** · [2026-06-07](https://news.ycombinator.com/item?id=48430699)
> 
> But this is almost what we have been doing for the last 3/5 months, isn’t?
> 
> > **wilsonnb3** · [2026-06-07](https://news.ycombinator.com/item?id=48430706)
> > 
> > Article is from February so that tracks
> > 
> > **fbrncci** · [2026-06-07](https://news.ycombinator.com/item?id=48430775)
> > 
> > Well to a lot of people this is still a foreign concept.

> **bronny1989** · [2026-06-07](https://news.ycombinator.com/item?id=48430900)
> 
> why do you have “weeks” to ship what would take “months”?
> 
> > **andai** · [2026-06-07](https://news.ycombinator.com/item?id=48431023)
> > 
> > \> We intentionally chose this constraint so we would build what was necessary to increase engineering velocity by orders of magnitude.
> > 
> > > **robotresearcher** · [2026-06-07](https://news.ycombinator.com/item?id=48431097)
> > > 
> > > I guess orders of magnitude ain’t what they used to be.
> > > 
> > > **whateveracct** · [2026-06-07](https://news.ycombinator.com/item?id=48439760)
> > > 
> > > holy wow. so they really are deluded and are believing fallacies from the mythical man month

> **mwkaufma** · [2026-06-07](https://news.ycombinator.com/item?id=48436812)
> 
> Another breathless sales pitch selling pickaxes to miners, but where's the gold? Where's the incredible product that the chatbots-talking-to-chatbots over git generating LOC heaps have actually \_created\_? I just don't see it.

> **shevy-java** · [2026-06-07](https://news.ycombinator.com/item?id=48432346)
> 
> The world is now agent-first already?

> **aulin** · [2026-06-07](https://news.ycombinator.com/item?id=48432472)
> 
> Dear OpenAI, the target audience of your blog or at least of this blog post understands English pretty well. Why won't you give them a simple way to disable the shitty ai translation and read the original content? Why translate it at all in the first place?
> 
> EDIT: found the button, all the way down in the bottom of the page... I hate this so much, give me the original content, I will decide if and when I need translation

> **nullbio** · [2026-06-07](https://news.ycombinator.com/item?id=48432689)
> 
> Step 1: Be rich.

> **Sarkie** · [2026-06-07](https://news.ycombinator.com/item?id=48430636)
> 
> I would never dare put that in production

> **witx** · [2026-06-07](https://news.ycombinator.com/item?id=48433232)
> 
> "Engineering"
> 
> These people are so delusional it feels like a mental desease by now.
> 
> I really hope no one gets hurt by all this slop code in the future by these wanna be engineers.

> **Yokohiii** · [2026-06-07](https://news.ycombinator.com/item?id=48431575)
> 
> \> in an agent-first world
> 
> casual gaslighting

> **varenc** · [2026-06-07](https://news.ycombinator.com/item?id=48430805)
> 
> digression:
> 
> It's interesting this was submitted to HN over 15 times since it was published in February: [https://hn.algolia.com/?dateRange=all&page=0&prefix=false&qu...](https://hn.algolia.com/?dateRange=all&page=0&prefix=false&query=https%3A%2F%2Fopenai.com%2Findex%2Fharness-engineering&sort=byPopularity&type=story)
> 
> But this is the only submission that's had any traction. Since the content is nearly the same for all submissions, it highlights how getting to the front page can be a bit random. (Though this is the only one that capitalized 'Leveraged' so maybe that's the secret)
> 
> > **dang** · [2026-06-08](https://news.ycombinator.com/item?id=48440060)
> > 
> > Someone emailed us about it and we ended up putting it in the SCP ([https://news.ycombinator.com/item?id=26998308](https://news.ycombinator.com/item?id=26998308)).
> > 
> > I'd say this case is a failure mode for HN for sure. Falling through the cracks 15 times in a row just sucks. Not sure what the best fix would be.
> > 
> > **swyx** · [2026-06-07](https://news.ycombinator.com/item?id=48432397)
> > 
> > time of day also matters
> > 
> > > **pramodbiligiri** · [2026-06-07](https://news.ycombinator.com/item?id=48433991)
> > > 
> > > (OP here) The truth is much simpler. I mailed the mods and they bumped it up in the second chance pool \[1\] :)
> > > 
> > > 1\. [https://news.ycombinator.com/item?id=26998309](https://news.ycombinator.com/item?id=26998309)
> > > 
> > > > **swyx** · [2026-06-07](https://news.ycombinator.com/item?id=48439891)
> > > > 
> > > > ha ok but why do that for a post you didnt write?
> > > > 
> > > > > **dredmorbius** · [2026-06-08](https://news.ycombinator.com/item?id=48451855)
> > > > > 
> > > > > I do this somewhat frequently myself.
> > > > > 
> > > > > Why? Because good stuff often falls through the cracks, and I like to see people discuss substantive material rather than just the "easy" submissions which tend to attract quick votes. This is one of the best ways to have a positive impact on the HN submission queue. And mods appreciate the suggestions (they can't keep up with the firehose *either*, and are well aware of the HN submission queue's weaknesses).
> > > > > 
> > > > > See: <[https://news.ycombinator.com/item?id=46018486](https://news.ycombinator.com/item?id=46018486)\>, <[https://news.ycombinator.com/item?id=26998308](https://news.ycombinator.com/item?id=26998308)\>.
> > > > > 
> > > > > **pramodbiligiri** · [2026-06-08](https://news.ycombinator.com/item?id=48440826)
> > > > > 
> > > > > Because I thought this is a good blog and more people should get to know. Found it by chance in some other thread: [https://news.ycombinator.com/item?id=48414452](https://news.ycombinator.com/item?id=48414452).
> > > > > 
> > > > > Did the same with this Cloudflare one the other day: [https://news.ycombinator.com/item?id=48276152](https://news.ycombinator.com/item?id=48276152)

> **angrydev** · [2026-06-07](https://news.ycombinator.com/item?id=48430720)
> 
> Published Feb 11, 2026
> 
> > **ukuina** · [2026-06-07](https://news.ycombinator.com/item?id=48431145)
> > 
> > Might as well be 2025.

> **spacebacon** · [2026-06-07](https://news.ycombinator.com/item?id=48432723)
> 
> Leveraging a better way. No last mile.
> 
> [https://github.com/space-bacon/SRT](https://github.com/space-bacon/SRT)

> **EnPissant** · [2026-06-07](https://news.ycombinator.com/item?id=48431262)
> 
> \> Over the past five months, our team has been running an experiment: building and shipping an internal beta of a software product with 0 lines of manually-written code.
> 
> This is such a common thing among software engineers nowadays that I was very surprised that OpenAI would open with that line as if it were mind blowing.
> 
> But then I saw it was published in February and OP is just reposting it to farm karma.

> **rfw300** · [2026-06-07](https://news.ycombinator.com/item?id=48430665)
> 
> I understand that the’ve written zero lines of code for this application, but would it kill them to write a few lines of the blog post by hand?
> 
> Forcing readers to wade through an unceasing string of LLM clichés demonstrates the opposite of the point you’re trying to make—that the consumers of your work are worse off because you exercised no human judgment in creating it.
> 
> > **whateveracct** · [2026-06-07](https://news.ycombinator.com/item?id=48439774)
> > 
> > these AI companies are high in their own supply
> > 
> > and/or they are really trying to shift norms where AI is required to exist (which is good for their financials)

> **knicholes** · [2026-06-07](https://news.ycombinator.com/item?id=48430673)
> 
> Everyone is criticizing the number of lines of code and the lack of attention that must certainly have been applied to generate that code and push it into production. What is being ignored is this awesome prompt that is almost certainly better than having no agents.md or plans.md or whatever you've come up with, to add validation steps for committed changes. You're still free to look at your code, the changes, and ask the agent to clean up. Try it. It's really nice.
