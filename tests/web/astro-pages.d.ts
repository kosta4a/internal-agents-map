// ABOUTME: Declares the type of an Astro page module for the TypeScript check.
// ABOUTME: The guide test renders two pages, and `tsc` needs their module shape.

declare module '*.astro' {
  import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

  const Component: AstroComponentFactory;
  export default Component;
}
