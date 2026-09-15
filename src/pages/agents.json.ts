// ABOUTME: Serves the complete normalized catalog that the repository commits.
// ABOUTME: The published bytes are the committed file, so the two never disagree.
import type { APIRoute } from 'astro';
import catalogText from '../../data/agents.json?raw';
import { loadCatalog } from '../lib/catalog';

export const GET: APIRoute = () => {
  // Load the catalog first, so unvalidated data can never reach the download.
  loadCatalog();
  return new Response(catalogText, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
