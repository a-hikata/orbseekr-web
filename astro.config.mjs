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
});
