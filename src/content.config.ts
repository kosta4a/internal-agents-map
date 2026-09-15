// ABOUTME: Declares the notes collection and the metadata every note must carry.
// ABOUTME: The schema stops the build when a note is missing a required field.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** A calendar date, written as `YYYY-MM-DD` and kept as text. */
const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'the date must be written as YYYY-MM-DD.');

/** One numbered source at the end of a note. Its identifier is its anchor. */
const noteSource = z.object({
  /** The anchor part of `#source-<id>` inside the note. */
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string(),
  url: z.string().url(),
  /** What the note takes from that source. */
  note: z.string(),
});

const notes = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    /** The page description, used for search results and link previews. */
    description: z.string(),
    /** The short label above the title, such as `01 / Run limits`. */
    eyebrow: z.string(),
    /** The opening line under the title. */
    lede: z.string(),
    /** The text the notes index shows for this note. */
    summary: z.string(),
    /** The reading time the note reports, such as `2 min read`. */
    readingTime: z.string(),
    /** The position of the note in the reading order, counted from 1. */
    order: z.number().int().positive(),
    publishedAt: isoDate,
    /** The date of a later content change. Write it only when one happened. */
    updatedAt: isoDate.optional(),
    /** The catalog implementations this note examines. */
    relatedAgentIds: z.array(z.string()).nonempty(),
    sources: z.array(noteSource).nonempty(),
  }),
});

export const collections = { notes };
