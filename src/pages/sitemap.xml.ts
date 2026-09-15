// ABOUTME: Lists the canonical HTML pages of the site for search engines.
// ABOUTME: It holds no exports, no 404, and no filter URLs, and no invented dates.
import type { APIRoute } from 'astro';
import { loadCatalog } from '../lib/catalog';
import { contentPaths } from '../lib/content-routes';
import { canonicalUrl, routeInventory } from '../lib/routes';

/** Escape the five XML characters, so catalog text can never break the document. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Build the sitemap from the publication inventory.
 * There is no `lastmod`: no page records a real content modification date, and
 * the build time and the review dates describe something else.
 */
export function sitemapXml(paths: readonly string[]): string {
  const urls = paths
    .map((path) => `  <url><loc>${escapeXml(canonicalUrl(path))}</loc></url>\n`)
    .join('');
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls +
    '</urlset>\n'
  );
}

export const GET: APIRoute = async () => {
  const inventory = routeInventory(loadCatalog(), await contentPaths());
  return new Response(sitemapXml(Object.keys(inventory.routes)), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
