// ABOUTME: Opts the development server into Agentation with ENABLE_ANNOTATIONS=1.
// ABOUTME: It injects nothing for a build, so React and the toolbar stay out of dist/.

import type { AstroIntegration } from 'astro';

/** The module the injected script loads. Astro resolves it from the project root. */
const ENTRY = 'src/scripts/annotate.ts';

/**
 * Register the annotation toolbar only for explicitly opted-in `astro dev` runs.
 * Injecting only under the dev command keeps the toolbar out of the build graph,
 * so no orphan chunk of it reaches the output the publication check guards.
 */
export function annotationIntegration(): AstroIntegration {
  return {
    name: 'internal-agents-annotation',
    hooks: {
      'astro:config:setup': ({ command, injectScript }) => {
        if (command !== 'dev' || process.env.ENABLE_ANNOTATIONS !== '1') return;
        injectScript('page', `import { startAnnotating } from '/${ENTRY}';\nstartAnnotating();`);
      },
    },
  };
}
