// ABOUTME: The address the browser tests use for the previewed static build.
// ABOUTME: The Playwright config and the server hooks read the same values.

export const PREVIEW_HOST = '127.0.0.1';
/** The default port, or `PREVIEW_PORT` when another local server already holds it. */
export const PREVIEW_PORT = Number(process.env.PREVIEW_PORT) || 4180;
export const PREVIEW_URL = `http://${PREVIEW_HOST}:${PREVIEW_PORT}`;
