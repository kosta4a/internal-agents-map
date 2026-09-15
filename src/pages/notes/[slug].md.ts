// ABOUTME: Serves one note as Markdown, built from the body the author wrote.
// ABOUTME: Citations, diagram explanations, sources, and catalog links all remain.
import type { APIRoute, GetStaticPaths } from 'astro';
import { loadCatalog } from '../../lib/catalog';
import { noteMarkdown, noteViewBySlug, noteViews } from '../../lib/notes';

export const getStaticPaths: GetStaticPaths = () =>
  noteViews().map((note) => ({ params: { slug: note.slug } }));

export const GET: APIRoute = ({ params }) => {
  const note = noteViewBySlug(params.slug as string);
  return new Response(`${noteMarkdown(loadCatalog(), note)}\n`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
