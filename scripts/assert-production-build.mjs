// Refuses a build that is not fit to publish at https://www.orbseekr.jp.
//
// This exists because a staging build once reached the production domain. It
// returned 200, so nothing alerted: the HTML was served from the custom domain
// while every asset was still addressed under the project subpath, the
// canonical named github.io, and the robots policy said noindex. The site was
// live, unstyled, non-interactive, and asking search engines to ignore it.
//
// The checks below read the built artifact rather than the configuration that
// produced it, so they hold regardless of how the origin comes to be wrong.
//
//   node scripts/assert-production-build.mjs [distDir]

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const DIST = resolve(process.argv[2] ?? 'dist');
const ORIGIN = 'https://www.orbseekr.jp';
const STAGING_MARKERS = ['a-hikata.github.io', '/orbseekr-web'];

const failures = [];
const fail = (message) => failures.push(message);

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

if (!existsSync(DIST)) {
  console.error(`no build at ${DIST} — run \`npm run build\` first`);
  process.exit(1);
}

const files = walk(DIST);
const indexPath = join(DIST, 'index.html');

// 1. The artifact root is what GitHub Pages serves from at a custom domain.
if (!existsSync(indexPath)) fail('dist/index.html is missing from the artifact root');

const html = existsSync(indexPath) ? readFileSync(indexPath, 'utf8') : '';

// 2. No staging origin or subpath may survive anywhere in the output.
for (const file of files.filter((f) => /\.(html|xml|txt|json|js|css)$/.test(f))) {
  const text = readFileSync(file, 'utf8');
  for (const marker of STAGING_MARKERS) {
    if (text.includes(marker)) {
      fail(`${relative(DIST, file)} still contains the staging marker "${marker}"`);
    }
  }
}

// URLs are compared by parsed origin, never by string prefix: "https://
// www.orbseekr.jp.example.com/" starts with the production origin as text but
// is a different site.
const originOf = (value) => {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
};
const isProductionUrl = (value) => originOf(value) === ORIGIN;

// 3. The document must claim the production origin.
const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
if (canonical !== `${ORIGIN}/`) fail(`canonical is "${canonical}", expected "${ORIGIN}/"`);

for (const property of ['og:url', 'og:image']) {
  const value = html.match(new RegExp(`<meta property="${property}" content="([^"]+)"`))?.[1];
  if (!value || !isProductionUrl(value)) {
    fail(`${property} is "${value}", expected an absolute URL on ${ORIGIN}`);
  }
}

// Structured data may cite external projects, so the rule is by host: anything
// that is not a deliberate outbound reference has to be this site's own origin.
// Matching on the word "orbseekr" would miss exactly the case that broke —
// a JSON-LD url of https://a-hikata.github.io/ names no such word.
const JSON_LD_EXTERNAL_HOSTS = new Set(['github.com', 'schema.org']);
for (const jsonLd of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
  const urls = JSON.stringify(JSON.parse(jsonLd[1])).match(/https?:\/\/[^"]+/g) ?? [];
  for (const url of urls) {
    const { host } = new URL(url);
    if (JSON_LD_EXTERNAL_HOSTS.has(host)) continue;
    if (!isProductionUrl(url)) fail(`JSON-LD names a non-production URL: ${url}`);
  }
}

// 4. The page must be indexable.
const robotsMeta = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? '';
if (/noindex|nofollow/i.test(robotsMeta)) fail(`robots meta blocks indexing: "${robotsMeta}"`);

const robotsTxt = existsSync(join(DIST, 'robots.txt'))
  ? readFileSync(join(DIST, 'robots.txt'), 'utf8')
  : fail('robots.txt is missing') || '';
if (/^\s*Disallow:\s*\/\s*$/im.test(robotsTxt)) fail('robots.txt disallows the whole site');

// 5. The sitemap must advertise the production origin.
const sitemapIndex = join(DIST, 'sitemap-index.xml');
if (!existsSync(sitemapIndex)) {
  fail('sitemap-index.xml is missing');
} else {
  const locs = [...readFileSync(sitemapIndex, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) fail('sitemap-index.xml lists no <loc>');
  for (const loc of locs.filter((l) => !isProductionUrl(l))) {
    fail(`sitemap-index.xml lists a non-production URL: ${loc}`);
  }
}

// 6. Every local reference must exist in the artifact. A 404 asset is the
//    symptom that made the original breakage invisible to a status check.
const referenced = new Set(
  [...html.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map((m) => m[1].split(/[?#]/)[0]).filter((p) => !p.endsWith('/')),
);
for (const path of referenced) {
  if (!existsSync(join(DIST, path))) fail(`referenced asset is not in the artifact: ${path}`);
}

if (failures.length > 0) {
  console.error('This build must not be published:\n');
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`production build OK — ${files.length} files, ${referenced.size} local references resolved, origin ${ORIGIN}`);
