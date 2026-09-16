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

/** The badge colours available to a category. */
const BADGE_TONES = ['blue', 'indigo', 'purple', 'pink', 'crimson', 'orange', 'green', 'cyan'] as const;

type BadgeTone = (typeof BADGE_TONES)[number];

/**
 * The colour each category wears. Categories are listed by how often the
 * catalog uses them, and a colour only repeats far down that order, so the
 * categories that share a card are the ones least likely to share a colour.
 * Coding and code review lead the catalog together, so they sit apart.
 */
const CATEGORY_TONES: Readonly<Record<string, BadgeTone>> = {
  coding: 'blue',
  'code-review': 'orange',
  support: 'green',
  'on-call': 'crimson',
  'customer-success': 'pink',
  research: 'purple',
  data: 'cyan',
  'finance-ops': 'indigo',
  security: 'purple',
  maintenance: 'green',
  ops: 'cyan',
  recruitment: 'pink',
  'ci-triage': 'orange',
  migrations: 'indigo',
};

/**
 * The colour a category badge wears. A category the map does not name still
 * gets a stable colour, so a new one needs no edit here to look right.
 */
export function badgeTone(id: string): BadgeTone {
  const named = CATEGORY_TONES[id];
  if (named) return named;
  let sum = 0;
  for (const character of id) sum = (sum * 31 + character.charCodeAt(0)) % 100003;
  return BADGE_TONES[sum % BADGE_TONES.length]!;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Write a recorded date the way it reads aloud: `2025-10` as October 2025.
 * The catalog records a year, a month, or a day, and an unrecognised shape is
 * returned unchanged rather than guessed at.
 */
export function observedDate(value: string): string {
  const match = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/.exec(value.trim());
  if (!match) return value;
  const [, year, month, day] = match;
  if (!month) return year!;
  const name = MONTHS[Number(month) - 1];
  if (!name) return value;
  return day ? `${Number(day)} ${name} ${year}` : `${name} ${year}`;
}
