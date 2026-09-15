// ABOUTME: Vercel middleware for canonical hosts, clean URLs, and HTML/Markdown negotiation.
// ABOUTME: Every decision comes from the pure negotiation module and the generated manifest.
import { next, rewrite } from '@vercel/functions';
import manifest from './routing-manifest.json' with { type: 'json' };
import { resolveRequest } from './scripts/negotiation.mjs';

type RoutingManifest = {
  schema_version: number;
  routes: Record<string, { html: string; markdown: string }>;
};

// The build writes this manifest from the publication inventory.
const { routes } = manifest as unknown as RoutingManifest;

// Keep this list in step with matches() in scripts/negotiation.mjs.
// It covers pages, legacy .html paths, and .md exports, and it skips bundled assets.
export const config = { matcher: ['/((?!_astro/|assets/)[^.]*)', '/:path*.html', '/:path*.md'] };

export default function middleware(request: Request) {
  const url = new URL(request.url);
  const decision = resolveRequest({
    routes,
    url,
    method: request.method,
    accept: request.headers.get('accept') ?? '',
  });
  if (decision.type === 'redirect' && decision.location) {
    return Response.redirect(decision.location, decision.status ?? 308);
  }
  if (decision.type === 'markdown' && decision.path) {
    url.pathname = decision.path;
    // Query filters change the browser view, not the complete reading representation.
    url.search = '';
    return rewrite(url, { headers: decision.headers });
  }
  return decision.headers ? next({ headers: decision.headers }) : next();
}
