// ABOUTME: Serves the guide that explains how to read the catalog files and the schema.
// ABOUTME: It joins the authored guide with the generated schema reference.
import type { APIRoute } from 'astro';
import schema from '../../data/schema.md?raw';
import guide from '../../templates/data-guide.md?raw';

export const GET: APIRoute = () =>
  new Response(`${guide}\n${schema}`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
