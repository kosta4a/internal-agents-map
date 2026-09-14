// ABOUTME: Serves the Definitions guide as Markdown, including the chart placements.
// ABOUTME: The placements come from the catalog, so the export follows the evidence.
import type { APIRoute } from 'astro';
import { loadCatalog } from '../lib/catalog';
import { placements, placementsByCell, type PlacementView } from '../lib/definitions';
import {
  ASSISTANT_REFERENCES,
  DEFINITIONS_HEADING,
  READY_REFERENCES,
  REFERENCE_PLACEMENTS,
  type ReferencePlacement,
} from '../lib/guide-content';
import { canonicalUrl, entryPath, guidePath } from '../lib/routes';

const MINIONS_PART_ONE =
  'https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents';
const MINIONS_PART_TWO = `${MINIONS_PART_ONE}-part-2`;

function marker(placement: PlacementView): string {
  return `- [**${placement.company}** ${placement.agentName}](${canonicalUrl(placement.path)} "${placement.reason}")`;
}

function referenceMarker(reference: ReferencePlacement): string {
  return `- **${reference.name}** ${reference.category}`;
}

function cell(heading: string, lines: readonly string[]): string[] {
  return [`### ${heading}`, lines.length > 0 ? lines.join('\n') : '- No selected example currently fits.'];
}

function placementNote(placement: PlacementView): string {
  const links = placement.evidence
    .map((item) => `[${item.label}](${canonicalUrl(item.href)})`)
    .join(' · ');
  return [
    `- **${placement.company} · ${placement.agentName}**`,
    `  ${placement.reason}`,
    `  ${links}`,
  ].join('\n\n');
}

function referenceNote(reference: ReferencePlacement): string {
  const links = reference.links.map((link) => `[${link.label} ↗](${link.url})`).join(' · ');
  return [
    `- **Reference · ${reference.name}**`,
    `  ${reference.reason}`,
    `  ${links}`,
  ].join('\n\n');
}

function document(): string {
  const catalog = loadCatalog();
  const cells = placementsByCell(catalog);
  const placed = placements(catalog);
  const page = canonicalUrl(guidePath('definitions'));
  const minions = canonicalUrl(entryPath('stripe-minions'));
  return [
    `Source: ${page}`,
    'Understanding the map',
    `# ${DEFINITIONS_HEADING}`,
    'How organizations turn general-purpose models into agents for their own work.',
    'A model alone doesn’t know a company’s codebase, follow its processes, or have access to its tools. Organizations supply that context and access, and shape how the agent carries out work.',
    'Internal Agents Map documents these systems: what they do, how teams build or adapt them, and what public evidence tells us about their use.',
    `[Internal agents ↓](${page}#terms) [How agents fit ↓](${page}#quadrant) [Other terms ↓](${page}#terminology)`,
    '01 / The scope of the map',
    '## What is an internal agent?',
    'Working definition',
    'An **internal agent** works with company context and tools to carry out the organization’s own work.',
    'An agent connected to knowledge, tools, and workflows within an organization',
    'It might investigate a failed deployment, prepare a code change, or help an employee resolve an IT issue. “Internal” describes the work it serves. The organization can build the system itself or adapt an existing product.',
    'An agent answering customers directly serves a customer-facing role. One system can support both kinds of work.',
    '### What makes it an agent?',
    'For this guide, an **agent** uses a model to choose and carry out steps toward a task, using tools and feedback as it works.',
    'Real systems often combine model-directed steps with programmed automation. A coding agent might decide how to fix a problem while a fixed pipeline runs tests and prepares the result for review.',
    'The map includes these agents alongside the platforms and supporting systems that enable them.',
    '02 / From a model to a workflow',
    '## From a model to an internal workflow',
    `Consider [Stripe’s Minions](${minions}). An engineer can ask a Minion to fix a flaky test. It works with Stripe’s code and development tools, makes a change, runs checks, and prepares a pull request for human review.`,
    'Company task **Fix a flaky test**',
    'Agent working with company context and tools **Stripe’s code · development environment · checks**',
    'Result in the company’s workflow **A pull request for human review**',
    `Sources: [Stripe’s workflow description](${MINIONS_PART_ONE}) and [execution environment](${MINIONS_PART_TWO}).`,
    'What makes this internal is its role in Stripe’s engineering work. Its cloud execution and unattended operation describe other aspects of the same system.',
    `[Explore Minions in the catalog →](${minions})`,
    '03 / Different approaches',
    '## How agents fit the organization',
    'Two questions help explain the different approaches in the map:',
    'Horizontal axis · work breadth',
    '### How broad is the work?',
    'One workflow Many workflows',
    'Focused agents follow one defined workflow. Broader agents support many kinds of work or provide a shared platform.',
    'Vertical axis · adaptation',
    '### How specific is it to the organization?',
    'Standard Company-specific',
    'Standard products arrive with common capabilities. Internal systems add company knowledge, tools, conventions, and processes.',
    'Catalog entry Reference example',
    'Standard → Company-specific capabilities',
    ...cell('Company-specific · focused Specialized internal agents', cells.specialized.map(marker)),
    ...cell(
      'Company-specific · broad General internal agents & shared platforms',
      cells.shared.map(marker),
    ),
    ...cell('Standard · focused Ready-made task agents', [
      ...cells.ready.map(marker),
      ...READY_REFERENCES.map(referenceMarker),
    ]),
    ...cell('Standard · broad General-purpose assistants', ASSISTANT_REFERENCES.map(referenceMarker)),
    'One workflow Many workflows →',
    'Illustrative placements based on public descriptions. Blue markers are catalog entries; hollow markers are reference products or categories in their default setup. Positions show broad relationships, not measured scores. Spacing within a region is for readability.',
    'The markers represent named systems and their documented scope. A company may operate several systems in different regions.',
    'Broader scope and greater adaptation are not measures of quality. A focused agent may be exactly what a workflow needs.',
    'Why these systems are placed here',
    [...placed.map(placementNote), ...REFERENCE_PLACEMENTS.map(referenceNote)].join('\n'),
    '### What the team built or adapted',
    'An organization can adapt an existing product deeply, or build a small custom agent for a narrow task. Building software in-house does not by itself tell us how broadly the system works or how closely it fits the organization.',
    'Each catalog entry looks at the concrete choices: context, tools, execution environment, workflow, and the parts the team built or configured.',
    '04 / Other terms you’ll encounter',
    '## Different questions about the same system',
    'These terms answer different questions about a system. They can apply together.',
    '### Cloud and local: where does the work run?',
    'Local and cloud describe **where the agent runs.**',
    'Local execution: the agent runs inside your device',
    '**Local** Execution on your device',
    'Cloud execution: your device connects to an agent running on a remote computer',
    '**Cloud** Execution on hosted infrastructure',
    'A **cloud agent** executes on hosted infrastructure, independently of the user’s device.',
    'A **local agent** executes on the user’s device. It may still call a model hosted in the cloud: model hosting and agent execution can happen in different places.',
    'Stripe’s Minions run on AWS EC2 development machines, making them an example of cloud execution.',
    '### Foreground and background: how do people interact with it?',
    'Foreground and background describe **how you participate while it works.**',
    'Foreground work: repeated exchanges between you and the agent',
    '**Foreground** Discuss, steer, and iterate as it works',
    'Background work: a trigger starts the agent, which works independently and returns a result',
    '**Background** Work proceeds without continuous interaction',
    '**Foreground work** involves active interaction with a person: discussing the task, giving instructions, or steering the next steps.',
    '**Background work** proceeds without continuous interaction. A person can start it and return later, or a schedule or event can trigger it.',
    'These are modes of work. The same agent can move between them. An engineer might give a Minion instructions, leave it to work, then return to discuss the result.',
    'These descriptions work together',
    'One agent can be **internal, cloud-hosted, and background.**',
    'Whose work?\n:   Internal',
    'Where does it run?\n:   Cloud',
    'How do you participate?\n:   Background',
    'A local agent can also work in the background. A cloud agent can work with you in the foreground.',
    '### Autonomy: what can it do without approval?',
    '**Autonomy** describes the decisions and actions an agent can take without human approval.',
    'Describe that authority concretely:',
    '> A Minion can write code and run checks on its own. Production pull requests require human review.',
    'Working without someone’s continuous attention does not imply permission to take every action.',
    '05 / Common questions',
    '## Common questions',
    'Does “internal” mean built in-house?',
    'No. A company can configure an existing product around its own workflows. The relevant question is what work the system serves and how it uses company context and tools.',
    'Does “internal” mean private or self-hosted?',
    'No. An internal agent can use hosted services. Hosting, data handling, and access controls need to be described separately.',
    'Is a shared agent platform itself an agent?',
    'A platform can provide the context, tools, execution environments, and controls used by multiple agents. The map includes platforms because they help explain how organizations make agents available across teams.',
    'Is every automated workflow an agent?',
    'For this guide, the distinction is whether a model chooses steps or actions as the task unfolds. A fixed sequence of programmed steps is automation; a system can combine both.',
    'Why are some details unknown?',
    'Public descriptions vary in depth. An article may explain a workflow without documenting its permissions or execution environment. The map leaves those details unknown rather than inferring them from a product name.',
    'Are these official definitions?',
    'These are working definitions for reading the map. Product terminology varies. Concrete descriptions of the work, context, tools, and behavior are more useful than a label alone.',
  ].join('\n\n');
}

export const GET: APIRoute = () =>
  new Response(`${document()}\n`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
