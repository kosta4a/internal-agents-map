// ABOUTME: Holds the titles, descriptions, and link lists the two guide pages share.
// ABOUTME: The HTML pages and their Markdown exports read the same values from here.

import { SITE_NAME } from './metadata';

export const DEFINITIONS_TITLE = `What makes an agent internal? · ${SITE_NAME}`;
export const DEFINITIONS_HEADING = 'What makes an agent internal?';
export const DEFINITIONS_DESCRIPTION =
  'How organizations turn general-purpose models into agents for their own work. ' +
  'Explore workflow breadth, organizational adaptation, and practical agent terminology.';

export const METHODOLOGY_TITLE = `Methodology · ${SITE_NAME}`;
export const METHODOLOGY_HEADING = 'Methodology';
export const METHODOLOGY_DESCRIPTION =
  'How Internal Agents Map records sources, separates reported claims from interpretation, ' +
  'and handles uncertainty.';

export const NOTES_TITLE = `Notes · ${SITE_NAME}`;
export const NOTES_HEADING = 'Notes';
export const NOTES_DESCRIPTION =
  'Short notes on agent design. Each note connects an observation to reports from teams ' +
  'that build internal agents.';
export const NOTES_EYEBROW = 'From the cases';
export const NOTES_LEDE = 'Short observations for people who build agents.';
/** The two halves of the introduction, around the link to the catalog. */
export const NOTES_INTRO_BEFORE = 'Each note examines a design choice from the ';
export const NOTES_INTRO_AFTER =
  '. Sources describe what teams report. Our observations explain what those reports may ' +
  'mean for other builders.';
export const NOTES_CLOSING =
  'These notes describe selected cases. They do not establish that one design works best ' +
  'for every team.';

export interface GuideLink {
  readonly label: string;
  readonly url: string;
}

/** The repository documents the Methodology guide sends a reader to. */
export const REPOSITORY_LINKS: readonly GuideLink[] = [
  {
    label: 'Data schema',
    url: 'https://github.com/steel-experiments/internal-agents-map/blob/main/data/schema.md',
  },
  {
    label: 'Note writing rules',
    url: 'https://github.com/steel-experiments/internal-agents-map/blob/main/docs/notes-writing.md',
  },
  {
    label: 'Contribution guide',
    url: 'https://github.com/steel-experiments/internal-agents-map/blob/main/CONTRIBUTING.md',
  },
];

export interface ReferencePlacement {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly reason: string;
  readonly links: readonly GuideLink[];
}

/**
 * Products and categories shown for comparison on the Definitions chart.
 * They are not catalog entries: they describe a default, unadapted setup.
 */
export const REFERENCE_PLACEMENTS: readonly ReferencePlacement[] = [
  {
    id: 'deep-research',
    name: 'Deep research agent',
    category: 'Research workflow',
    reason:
      'A ready-made agent for one research workflow: finding sources, reasoning across them, ' +
      'and producing a documented report. OpenAI, Google, and Perplexity offer examples.',
    links: [
      { label: 'OpenAI deep research', url: 'https://openai.com/index/introducing-deep-research/' },
      {
        label: 'Gemini Deep Research',
        url: 'https://support.google.com/gemini/answer/15719111?hl=en',
      },
      {
        label: 'Perplexity Research',
        url: 'https://www.perplexity.ai/help-center/en/articles/10738684-what-is-research-mode',
      },
    ],
  },
  {
    id: 'ready-made-task',
    name: 'Codex / Claude Code / Devin',
    category: 'Software engineering agents',
    reason:
      'Ready-made agents that cover several software engineering workflows. Repository ' +
      'instructions, internal development tools, and company processes can move a deployment upward.',
    links: [
      { label: 'Codex overview', url: 'https://developers.openai.com/' },
      {
        label: 'Claude Code overview',
        url: 'https://docs.anthropic.com/en/docs/claude-code/getting-started',
      },
      { label: 'Devin overview', url: 'https://docs.devin.ai/get-started/devin-intro' },
    ],
  },
  {
    id: 'general-assistant',
    name: 'ChatGPT / Claude',
    category: 'Default setup · reference products',
    reason:
      'General-purpose assistants that span many kinds of work. Company knowledge, connected ' +
      'apps, and custom tools can move a deployment upward.',
    links: [
      { label: 'ChatGPT use cases', url: 'https://learn.chatgpt.com/use-cases' },
      {
        label: 'Claude enterprise search',
        url: 'https://support.claude.com/en/articles/12489464-use-enterprise-search',
      },
    ],
  },
];

/** The reference markers that belong in the "ready-made task agents" region. */
export const READY_REFERENCES = REFERENCE_PLACEMENTS.filter(
  (item) => item.id === 'deep-research' || item.id === 'ready-made-task',
);

/** The reference marker that belongs in the "general-purpose assistants" region. */
export const ASSISTANT_REFERENCES = REFERENCE_PLACEMENTS.filter(
  (item) => item.id === 'general-assistant',
);
