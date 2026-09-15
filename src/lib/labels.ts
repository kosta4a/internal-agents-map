// ABOUTME: Turns catalog identifiers and field paths into short human labels.
// ABOUTME: It keeps the wording of the published catalog stable across pages.

const TERM_LABELS: Record<string, string> = {
  'ci-triage': 'CI triage',
  'on-call': 'On-call',
};

/** Make a readable label from an identifier such as `work-product-review`. */
export function termLabel(value: string): string {
  const known = TERM_LABELS[value];
  if (known) return known;
  const words = value.replace(/[-_]/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** Name the kind of statement a claim field path holds. */
export function fieldLabel(field: string): string {
  if (field === 'summary') return 'Summary';
  if (field === 'headline_metric') return 'Headline claim';
  if (field === 'architecture.context_mgmt') return 'Context management';
  if (field.startsWith('architecture.')) return termLabel(field.slice('architecture.'.length));
  if (field.startsWith('primitives.')) return 'Supporting component';
  if (field.startsWith('key_metrics.')) return 'Key observation';
  if (field.startsWith('lessons_learned.')) return 'Lesson';
  if (field.startsWith('operating_models.')) return 'Operating model assessment';
  return termLabel(field);
}

/** Name a supervision level, which can be unknown for a supporting system. */
export function levelLabel(level: number | null): string {
  return level === null ? 'Level unknown' : `Level ${level}`;
}
