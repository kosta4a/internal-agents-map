// ABOUTME: Pure routing and content negotiation rules for the site edge middleware.
// ABOUTME: It maps one request to a redirect, a Markdown rewrite, or a pass-through decision.

/** The only origin that serves the site. Alias hosts redirect to it. */
export const CANONICAL_ORIGIN = 'https://internal-agents.com';
const ALIAS_HOSTS = new Set(['www.internal-agents.com', 'internal-agents-map.vercel.app']);
/** Paths that hold build assets. The middleware does not change their responses. */
const ASSET_PREFIXES = ['/_astro/', '/assets/'];
const PAGE_CACHE = { Vary: 'Accept', 'Cache-Control': 'public, max-age=0, must-revalidate' };
const RELATED_LINKS =
  `<${CANONICAL_ORIGIN}/data-guide.md>; rel="describedby"; type="text/markdown", ` +
  `<${CANONICAL_ORIGIN}/agents/index.json>; rel="collection"; type="application/json"`;

const link = (path, rel, type) =>
  `<${CANONICAL_ORIGIN}${path}>; rel="${rel}"` + (type ? `; type="${type}"` : '');

/** True for pages, legacy .html paths, and Markdown exports. Other files go to the host. */
export function matches(pathname) {
  if (ASSET_PREFIXES.some(prefix => pathname.startsWith(prefix))) return false;
  const name = pathname.slice(pathname.lastIndexOf('/') + 1);
  return !name.includes('.') || name.endsWith('.html') || name.endsWith('.md');
}

/** The clean path of a known route when the request uses a legacy form, or null. */
function cleanPath(pathname, routes) {
  let path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (path.endsWith('.html')) path = path.slice(0, -'.html'.length);
  if (path === '/index' || path === '') path = '/';
  return path !== pathname && Object.hasOwn(routes, path) ? path : null;
}

/** The clean path whose Markdown export is this file, or null. */
function markdownOwner(pathname, routes) {
  if (!pathname.endsWith('.md')) return null;
  return Object.keys(routes).find(path => routes[path].markdown === pathname) ?? null;
}

/** Prefer HTML unless the client explicitly requests an acceptable Markdown type. */
export function wantsMarkdown(accept = '') {
  const ranges = accept.toLowerCase().split(',').map(part => {
    const [type, ...params] = part.trim().split(';').map(value => value.trim());
    const qParam = params.find(value => value.startsWith('q='));
    const q = qParam ? Number(qParam.slice(2)) : 1;
    return { type, q: Number.isFinite(q) && q >= 0 && q <= 1 ? q : 0 };
  });
  const explicit = ranges.find(range => range.type === 'text/markdown');
  if (!explicit || explicit.q === 0) return false;
  const html = ranges.find(range => range.type === 'text/html');
  const fallback = ranges.find(range => range.type === 'text/*')
    ?? ranges.find(range => range.type === '*/*');
  const htmlQ = (html ?? fallback)?.q ?? 0;
  return explicit.q > htmlQ || (explicit.q === htmlQ && !html);
}

/**
 * Decide the response for one request. `routes` is the routing manifest route map.
 * @returns {{type: 'pass' | 'redirect' | 'markdown', status?: number, location?: string,
 *   path?: string, headers?: Record<string, string>}}
 */
export function resolveRequest({ routes, url, method = 'GET', accept = '' }) {
  if (!matches(url.pathname)) return { type: 'pass' };
  const alias = ALIAS_HOSTS.has(url.hostname);
  const clean = cleanPath(url.pathname, routes);
  if (alias || clean) {
    // One redirect answers an alias host and a legacy path together.
    const origin = alias ? CANONICAL_ORIGIN : url.origin;
    const target = clean ?? url.pathname;
    return { type: 'redirect', status: 308, location: origin + target + url.search };
  }
  const route = routes[url.pathname];
  if (route && (method === 'GET' || method === 'HEAD')) {
    if (wantsMarkdown(accept)) {
      const canonical = link(url.pathname, 'canonical');
      const type = 'text/markdown; charset=utf-8';
      return { type: 'markdown', path: route.markdown,
        headers: { ...PAGE_CACHE, 'Content-Type': type, Link: canonical } };
    }
    const alternate = link(route.markdown, 'alternate', 'text/markdown');
    return { type: 'pass', headers: { ...PAGE_CACHE, Link: `${alternate}, ${RELATED_LINKS}` } };
  }
  // A direct Markdown request needs the canonical link to its page.
  const owner = markdownOwner(url.pathname, routes);
  if (owner) return { type: 'pass', headers: { Link: link(owner, 'canonical') } };
  return { type: 'pass' };
}
