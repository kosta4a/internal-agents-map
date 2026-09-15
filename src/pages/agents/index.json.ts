// ABOUTME: Serves the compact index that lists every implementation and its exports.
// ABOUTME: The page URL points at the entry page; the export URLs are unchanged.
import type { APIRoute } from 'astro';
import { loadCatalog } from '../../lib/catalog';
import { compactIndexJson } from '../../lib/exports';

export const GET: APIRoute = () =>
  new Response(compactIndexJson(loadCatalog()), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
