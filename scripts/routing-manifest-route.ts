// ABOUTME: Builds the routing manifest inside the Astro build, where content loads.
// ABOUTME: The publication integration moves the result to the repository root.

import type { APIRoute } from 'astro';
import { loadCatalog } from '../src/lib/catalog.ts';
import { contentPaths } from '../src/lib/content-routes.ts';
import { routeInventory, type RouteInventory } from '../src/lib/routes.ts';
import { serializeManifest } from './site-publication.ts';

/** The inventory the manifest, the sitemap, and the middleware share. */
export async function publicationInventory(): Promise<RouteInventory> {
  return routeInventory(loadCatalog(), await contentPaths());
}

export const GET: APIRoute = async () =>
  new Response(serializeManifest(await publicationInventory()), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
