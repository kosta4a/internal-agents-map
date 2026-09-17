// ABOUTME: Publishes the infrastructure collection with full evidence.
import type { APIRoute } from 'astro';
import { loadCatalog } from '../lib/catalog';
import { catalogMarkdown } from '../lib/exports';
export const GET: APIRoute = () => new Response(catalogMarkdown(loadCatalog(), 'infrastructure'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
