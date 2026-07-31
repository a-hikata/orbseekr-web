import type { APIRoute } from 'astro';
import { isProduction } from '../lib/config';

/**
 * robots.txt is generated rather than served from `public/` so that it always
 * agrees with the origin the build was made for.
 *
 * Only the production origin invites crawlers. The GitHub Pages project URL is
 * a real, publicly reachable address, so left unguarded it would be indexed and
 * would then compete with www.orbseekr.jp for the same content.
 */
export const GET: APIRoute = ({ site }) => {
  const production = isProduction(site);
  const body = production
    ? ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('sitemap-index.xml', site)}`, ''].join('\n')
    : [
        '# Staging build — not the canonical origin for this site.',
        '# The published site is https://www.orbseekr.jp',
        'User-agent: *',
        'Disallow: /',
        '',
      ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
