// ABOUTME: Serves the JSON record of one implementation in the catalog schema.
// ABOUTME: The bytes come from the normalized catalog, never from a rendered page.
import type { APIRoute, GetStaticPaths } from 'astro';
import { loadCatalog } from '../../lib/catalog';
import { recordJson } from '../../lib/exports';
import { assertPublishableId } from '../../lib/routes';

export const getStaticPaths = (() =>
  loadCatalog().approaches.map((approach) => {
    assertPublishableId(approach.id);
    return { params: { id: approach.id } };
  })) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) =>
  new Response(recordJson(loadCatalog(), params.id as string), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
