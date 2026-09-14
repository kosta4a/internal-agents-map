// ABOUTME: Allows crawling of the public catalog and states the content signals.
// ABOUTME: The cited publishers keep their own rights; the signals cover this site.
import type { APIRoute } from 'astro';
import { ORIGIN } from '../lib/routes';

const SIGNAL = 'Content-Signal: search=yes, ai-input=yes, ai-train=yes';

export const ROBOTS_TXT =
  '# Public catalog: crawling is allowed.\n' +
  '# Content Signals express preferences; cited publishers retain their own rights.\n' +
  `User-agent: *\nAllow: /\n${SIGNAL}\n\n` +
  'User-agent: OAI-SearchBot\nUser-agent: ChatGPT-User\n' +
  `User-agent: Claude-SearchBot\nUser-agent: Claude-User\nAllow: /\n${SIGNAL}\n\n` +
  `Sitemap: ${ORIGIN}/sitemap.xml\n`;

export const GET: APIRoute = () =>
  new Response(ROBOTS_TXT, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
