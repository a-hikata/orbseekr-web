// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The production identity of the site. Staging builds — the GitHub Pages
// project URL, used until DNS points www.orbseekr.jp here — override both of
// these, so canonical URLs, the sitemap, and robots.txt describe wherever the
// build is actually served from rather than a host it has not reached yet.
//
//   SITE_URL   absolute origin, no trailing path
//   BASE_PATH  '/' in production, '/<repo>/' on a Pages project URL
const SITE_URL = process.env.SITE_URL ?? 'https://www.orbseekr.jp';
const BASE_PATH = process.env.BASE_PATH ?? '/';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  integrations: [sitemap()],
  build: {
    // Emit the two component scripts as files rather than inlining them.
    // A Content-Security-Policy of `script-src 'self'` blocks inline
    // execution, which would silently break the nav toggle and the tabbed
    // code viewer; served from a file, both are allowed by the same policy
    // without loosening it to 'unsafe-inline'.
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
