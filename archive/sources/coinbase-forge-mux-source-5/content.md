> Archived source snapshot  
> Source ID: `coinbase-forge-mux-source-5`  
> Original URL: <https://www.chatprd.ai/how-i-ai/playbook-for-ai-engineering-adoption-at-coinbase>  
> Final URL: <https://www.chatprd.ai/how-i-ai/playbook-for-ai-engineering-adoption-at-coinbase>  
> Title: How I AI: Chintan Turakhia’s Playbook for AI Adoption at Coinbase | How I AI  
> Captured at: `2026-09-15T10:30:22Z`

---

Coinbase's Chintan Turakhia shares his tactical playbook for driving AI adoption across a 1,000+ person engineering org, from PR speed runs to a live feedback-to-feature pipeline.

![Claire Vo's profile picture](https://www.chatprd.ai/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fng65ow1q%2Fproduction%2Fa8324cc9df916635eb8f6e3dc366a17777eb7099-800x800.jpg&w=96&q=75)

Claire Vo

![](https://www.youtube.com/watch?v=tidINuXB7PA)

Full episode

## Watch or listen

[In this episode of How I AI](https://www.youtube.com/watch?v=tidINuXB7PA), Coinbase engineering leader Chintan Turakhia demonstrates how he studies Cursor usage, shortens the path from user feedback to a proposed code change, and uses visible team experiments to spread AI practices across a large engineering organization.

Coinbase has more than a thousand engineers. Chintan's group was also rebuilding Coinbase Wallet as a consumer social app on a six-to-nine-month timeline. He began by using the tools himself, sharing concrete wins, and reducing friction for engineers who wanted to try them.

The demonstrations include an adoption-analysis prototype built from sample Cursor data, an internal feedback and coding-agent workflow, and a personal ChatGPT project for wine recommendations. Each one turns existing context into a smaller decision surface.

## Measure behavior before prescribing adoption

The [data-driven AI adoption workflow](https://www.chatprd.ai/how-i-ai/workflows/create-a-data-driven-ai-adoption-playbook-using-cursor) includes the cohort prompt, dashboard output, and the review questions needed before turning usage patterns into a team program.

Earlier tool rollouts produced a burst of experimentation that did not last. Chintan wanted a more useful view than license activation, so he explored how different usage patterns might translate into coaching for engineers.

### Start with the fields the tool actually exposes

Cursor's admin interface can export a CSV with fields such as \`accepted\_lines\`, \`chat\_lines\`, and \`chat\_lines\_deleted\`. For the episode demonstration, Chintan used invented sample rows that followed the real schema rather than exposing employee-level production data.

![A developer utilizes an AI-powered code editor (likely Cursor IDE) to manage a project focused on analytics. The interface shows a file tree with Python, Markdown, and CSV files, an active AI code generation prompt ('Press ⌘K to generate code'), and a chat window displaying interactions with a 'claude-4.5-opus-high' agent, demonstrating an AI-assisted development workflow for data analysis.](https://www.chatprd.ai/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fng65ow1q%2Fproduction%2F1c1fea914e72df6771f403047c2eb3e64373d5fe-1920x1080.jpg%3Fw%3D1600%26auto%3Dformat&w=3840&q=75)

A developer utilizes an AI-powered code editor (likely Cursor IDE) to manage a project focused on analytics. The interface shows a file tree with Python, Markdown, and CSV files, an active AI code generation prompt ('Press ⌘K to generate code'), and a chat window displaying interactions with a 'claude-4.5-opus-high' agent, demonstrating an AI-assisted development workflow for data analysis.

### Look for patterns, not a single adoption score

Chintan loaded the sample CSV into Cursor and asked the agent to propose a cohort analysis. He used Claude Opus High in plan mode so he could inspect the approach before allowing it to build the analysis.

> I want to understand the usage of Cursor. I already know we have light users all the way to power users. What are the natural clusters of usage? Can you find them across the team? What is the best way to cohort them?

The plan considered volume, agent use, tab completion, model preference, acceptance rate, and feature breadth. It proposed a reusable Python script, enriched CSV output, and a small HTML dashboard.

![Analyzing Cursor usage data with an AI assistant: A developer prompts the AI within the Cursor IDE to identify user clusters from a loaded CSV file, demonstrating an AI-powered data analysis workflow.](https://www.chatprd.ai/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fng65ow1q%2Fproduction%2Ff9bf1c1e08a5d2449236df00edc5be3e8a06dece-1920x1080.jpg%3Fw%3D1600%26auto%3Dformat&w=3840&q=75)

Analyzing Cursor usage data with an AI assistant: A developer prompts the AI within the Cursor IDE to identify user clusters from a loaded CSV file, demonstrating an AI-powered data analysis workflow.

### Turn the analysis into coaching hypotheses

After Chintan approved the plan, the agent wrote the Python analysis and produced a simple HTML view. The percentages, names, and user counts visible in the demo were sample results, not measurements of Coinbase employees.

The sample analysis grouped behavior into patterns such as:

- Agent-heavy users: People who rely on the chat agent for larger tasks.
- Tab-heavy users: People who prefer inline completion and tighter control.
- Balanced users: People who use both agent and tab-completion workflows.
- Minimal or inactive users: People with little activity in the sample.
![A detailed view of a data analysis project within an IDE, showcasing an AI-generated plan, a terminal running a Python web server, and a report summary with user usage statistics and generated files.](https://www.chatprd.ai/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fng65ow1q%2Fproduction%2Fd22e4926079dad310c4ce14b613c8b281c958d7b-1920x1080.jpg%3Fw%3D1600%26auto%3Dformat&w=3840&q=75)

A detailed view of a data analysis project within an IDE, showcasing an AI-generated plan, a terminal running a Python web server, and a report summary with user usage statistics and generated files.

Chintan then asked the agent to translate the cohort model into explicit next steps:

> Based on the data, generate guidance for each user cohort on what they should do to advance and graduate to a super user. I am looking for explicit guidance, effectively like I wanna turn this into some type of playbook.

### Treat the playbook as a prototype

The model generated a dark-mode HTML playbook with cohort-specific suggestions and slogans such as "Stop typing, start shipping" and "Tab harder." These were prototype coaching ideas generated from sample data, not validated performance recommendations.

The useful pattern is to move from raw usage fields to a hypothesis about behavior, then review that hypothesis with the people who understand the work. The dashboard makes the analysis discussable; it does not establish that more generated code means better engineering.

![The Cursor Playbook interface displays key user engagement metrics (AI lines, agent requests, Bugbot usage) and a prompt for inactive users to start using AI, with the instruction 'Hit ⌘L and ask for something'.](https://www.chatprd.ai/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fng65ow1q%2Fproduction%2F99a9927b43b58e838dede296fab9756e6ae0b8d5-1920x1080.jpg%3Fw%3D1600%26auto%3Dformat&w=3840&q=75)

The Cursor Playbook interface displays key user engagement metrics (AI lines, agent requests, Bugbot usage) and a prompt for inactive users to start using AI, with the instruction 'Hit ⌘L and ask for something'.

## Shorten the path from feedback to a proposed fix

The [feedback-to-pull-request workflow](https://www.chatprd.ai/how-i-ai/workflows/build-an-automated-user-feedback-to-pull-request-pipeline) makes each handoff explicit: capture the report, review the issue, identify the repository, and keep the agent's progress visible.

Chintan wanted to reduce the handoffs between a dogfooding session and an engineer investigating a problem. His internal workflow captures feedback, creates a structured Linear issue, and passes that context to a Slack-based agent.

![A split-screen view showing a 'TestCapture' product feedback application on the left and a 'how-i-ai' chat application (possibly Slack) on the right, where a 'Claude Bot' is interacting with users. This demonstrates internal tools for feedback collection and AI integration in a communication platform.](https://www.chatprd.ai/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fng65ow1q%2Fproduction%2Fcc7f5e66c153669e903ee6cffa60dcfca690c240-1920x1080.jpg%3Fw%3D1600%26auto%3Dformat&w=3840&q=75)

A split-screen view showing a 'TestCapture' product feedback application on the left and a 'how-i-ai' chat application (possibly Slack) on the right, where a 'Claude Bot' is interacting with users. This demonstrates internal tools for feedback collection and AI integration in a communication platform.

### Capture the problem while it is happening

Chintan built a small web app in about half a weekend. During an in-person or remote session, a teammate can record feedback from a phone instead of reconstructing it later from notes.

For the demo, he recorded a sample report about numbers not appearing in a trade form.

![A detailed look at the 'How I AI' feedback capture web app (left) showing its 'No recordings yet' state, alongside a Slack channel (right) demonstrating an interaction with a Claude Bot and other team messages. The hosts of the podcast are visible in the corner.](https://www.chatprd.ai/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fng65ow1q%2Fproduction%2F3241d88553d887c94da88c244b1823cf457c6897-1920x1080.jpg%3Fw%3D1600%26auto%3Dformat&w=3840&q=75)

A detailed look at the 'How I AI' feedback capture web app (left) showing its 'No recordings yet' state, alongside a Slack channel (right) demonstrating an interaction with a Claude Bot and other team messages. The hosts of the podcast are visible in the corner.

### Create a reviewable issue from the recording

A language model transcribes and summarizes the recording into a proposed bug report. The person using the tool can review the summary before creating the issue.

The interface then creates a Linear ticket with a suggested title and relevant user-journey tags.

![An AI-powered workflow in action: A 'Claude Bot' command is entered in a chat interface (right) to automatically create a ticket, confirmed by the 'Ticket created' notification in the Linear UI (left).](https://www.chatprd.ai/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fng65ow1q%2Fproduction%2Fc5b39a14f26496c03dbd2773e1121fa52132c931-1920x1080.jpg%3Fw%3D1600%26auto%3Dformat&w=3840&q=75)

An AI-powered workflow in action: A 'Claude Bot' command is entered in a chat interface (right) to automatically create a ticket, confirmed by the 'Ticket created' notification in the Linear UI (left).

### Give the coding agent the approved context

Coinbase built an internal Slack agent called Claude bot. Despite the name, Chintan said it can use multiple underlying models. He triggered its pull-request command with the repository and Linear issue:

```
Claude bot create pr --repo wallet-mobile --ticket [TICKET_ID]
```

The internal agent can retrieve context from Linear and other approved company systems, then plan or attempt a change across relevant codebases. Coinbase built it in-house because its security requirements prevented the team from deploying available cloud background agents at the time.

![An AI bot, 'Claude Bot', in action within Slack, processing a `create-pr` command for 'wallet/wallet-mobile' and linking to a Linear issue ('TBAF-644') describing a bug where typed numbers fail to display in a trade tab. This showcases an AI-assisted technical workflow for development and bug tracking.](https://www.chatprd.ai/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fng65ow1q%2Fproduction%2F21dfe9abd2dc986b0cd1a72f2f2bdabe7df4eb17-1920x1080.jpg%3Fw%3D1600%26auto%3Dformat&w=3840&q=75)

An AI bot, 'Claude Bot', in action within Slack, processing a \`create-pr\` command for 'wallet/wallet-mobile' and linking to a Linear issue ('TBAF-644') describing a bug where typed numbers fail to display in a trade tab. This showcases an AI-assisted technical workflow for development and bug tracking.

In the recorded demo, the agent began working but the episode did not show a completed pull request. The demonstrated value was the connected handoff from recording to issue to agent, with progress visible in a shared Slack channel.

## Build a preference model from your own notes

The same pattern is broken out in the [personal AI sommelier workflow](https://www.chatprd.ai/how-i-ai/workflows/use-chatgpt-to-become-your-own-personal-wine-sommelier): derive the profile from your evidence first, then apply it to a new list.

Chintan also showed a personal version of the same pattern: extract preferences from his own notes, then apply the resulting profile to a new menu.

### Extract the preferences you repeatedly reward

Chintan photographed handwritten notes from a champagne tasting, including ratings and comments about particular producers.

![The ChatGPT interface actively analyzing uploaded handwritten notes to generate personalized taste preferences and recommendations, illustrating AI's capability in data interpretation from unstructured visual input.](https://www.chatprd.ai/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fng65ow1q%2Fproduction%2F294a9b645c6785ce08b7af0d229bbc9dd2c3cc06-1920x1080.jpg%3Fw%3D1600%26auto%3Dformat&w=3840&q=75)

The ChatGPT interface actively analyzing uploaded handwritten notes to generate personalized taste preferences and recommendations, illustrating AI's capability in data interpretation from unstructured visual input.

He uploaded the images to ChatGPT and asked it to infer a taste profile:

> Here are a bunch of champagnes that I tasted, figure out from my notes what my taste preferences are.

The model summarized preferences for low sugar, high acidity, some aging, grower champagne, and certain chalkier styles. Chintan compared the profile with what he already knew and said it was accurate.

![A detailed taste profile for Champagne, generated by ChatGPT, analyzes preferences for low/zero dosage and long lees aging based on user notes. This screenshot captures the AI's output alongside the speaker.](https://www.chatprd.ai/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fng65ow1q%2Fproduction%2Fa96fafbe59a4c2ac7dc171e84b6cd53f31516248-1920x1080.jpg%3Fw%3D1600%26auto%3Dformat&w=3840&q=75)

A detailed taste profile for Champagne, generated by ChatGPT, analyzes preferences for low/zero dosage and long lees aging based on user notes. This screenshot captures the AI's output alongside the speaker.

### Use the profile to narrow a real menu

Chintan then photographed a restaurant wine list and asked for recommendations against the saved profile:

> What would I like from this list? What are good values?

![ChatGPT 5.2 analyzing a wine list, providing specific recommendations and value assessments, demonstrating an AI's capability in detailed content analysis for user queries.](https://www.chatprd.ai/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fng65ow1q%2Fproduction%2Ffc2b3c544d2d28fbeb31b11dc3c8f18c40d17e94-1920x1080.jpg%3Fw%3D1600%26auto%3Dformat&w=3840&q=75)

ChatGPT 5.2 analyzing a wine list, providing specific recommendations and value assessments, demonstrating an AI's capability in detailed content analysis for user queries.

ChatGPT returned value picks, splurge options, and bottles to avoid. Chintan recognized at least one recommendation as a wine he had tried and liked. The workflow narrows a long menu using his own evidence; it does not replace checking availability, price, or the judgment of a sommelier.

![ChatGPT provides detailed wine recommendations, categorizing 'Best VALUE Picks' with tasting notes, prices, and critical scores, demonstrating AI's ability to offer personalized product suggestions from a user prompt.](https://www.chatprd.ai/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fng65ow1q%2Fproduction%2F439178d7c698f4ae09b2aa3b083df9cbe5e11065-1920x1080.jpg%3Fw%3D1600%26auto%3Dformat&w=3840&q=75)

ChatGPT provides detailed wine recommendations, categorizing 'Best VALUE Picks' with tasting notes, prices, and critical scores, demonstrating AI's ability to offer personalized product suggestions from a user prompt.

## How Chintan approaches adoption

Chintan argues that adoption comes from showing engineers useful work rather than issuing a mandate. His team created a "Cursor Wins" channel, and he ran a speed-run session in which roughly 100 participants opened about 70 pull requests in 15 minutes. Those were pull requests opened, not a claim that all 70 were merged or shipped.

The recurring design choice is visibility. Usage analysis becomes a dashboard the team can question. Feedback becomes a Linear issue with its source attached. Agent work happens in a shared Slack channel. That visibility helps people learn from one another while keeping review and engineering judgment in the loop.

Across all three examples, Chintan does not ask people to trust an invisible AI process. He creates an artifact they can inspect: a dashboard, a ticket, a Slack thread, or a written preference profile. That artifact gives the next person enough context to challenge the analysis and continue the work.
