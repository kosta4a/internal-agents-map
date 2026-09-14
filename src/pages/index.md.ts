// ABOUTME: Serves the whole catalog as Markdown, with every claim and every source.
// ABOUTME: It is the complete reading interface, not the short text of the directory.
import type { APIRoute } from 'astro';
import { loadCatalog } from '../lib/catalog';
import { catalogMarkdown } from '../lib/exports';

export const GET: APIRoute = () =>
  new Response(catalogMarkdown(loadCatalog()), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
