// ABOUTME: Serves the Markdown record of one implementation, with all of its evidence.
// ABOUTME: It reads the same reading model as the entry page, not the entry page HTML.
import type { APIRoute, GetStaticPaths } from 'astro';
import { loadCatalog } from '../../lib/catalog';
import { recordMarkdown } from '../../lib/exports';
import { assertPublishableId } from '../../lib/routes';

export const getStaticPaths = (() =>
  loadCatalog().approaches.map((approach) => {
    assertPublishableId(approach.id);
    return { params: { id: approach.id } };
  })) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) =>
  new Response(recordMarkdown(loadCatalog(), params.id as string), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
