// ABOUTME: Publishes the same company membership and connections as its HTML page.
import type { APIRoute } from 'astro';
import { loadCatalog } from '../../lib/catalog';
import { organizationPaths } from '../../lib/routes';
import { organizationMarkdown } from '../../lib/organization-view';
export function getStaticPaths() {
  return organizationPaths(loadCatalog()).map((path) => ({ params: { id: path.split('/').pop() } }));
}
export const GET: APIRoute = ({ params }) => new Response(organizationMarkdown(loadCatalog(), params.id!), {
  headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
});
