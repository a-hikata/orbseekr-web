/**
 * The site's own identity.
 *
 * `url` is not hardcoded here: it comes from `Astro.site`, which is set in
 * `astro.config.mjs` from `SITE_URL`. Keeping one source means a staging build
 * cannot emit canonical tags pointing at a host it is not served from.
 */
export const site = {
  name: 'OrbSeekr',
} as const;

/** True only for the production origin; staging builds must not be indexed. */
export const isProduction = (siteUrl: URL | undefined): boolean => siteUrl?.origin === 'https://www.orbseekr.jp';

export const links = {
  repo: 'https://github.com/a-hikata/eo-claim-lint',
  marketplace: 'https://github.com/marketplace/actions/eo-claim-lint',
  security: 'https://github.com/a-hikata/eo-claim-lint/security',
  securityAdvisories: 'https://github.com/a-hikata/eo-claim-lint/security/advisories/new',
  issues: 'https://github.com/a-hikata/eo-claim-lint/issues',
  releases: 'https://github.com/a-hikata/eo-claim-lint/releases',
  license: 'https://github.com/a-hikata/eo-claim-lint/blob/main/LICENSE',
  support: 'https://github.com/a-hikata/eo-claim-lint/blob/main/SUPPORT.md',
  privacy: 'https://github.com/a-hikata/eo-claim-lint/blob/main/PRIVACY.md',
  contributing: 'https://github.com/a-hikata/eo-claim-lint/blob/main/CONTRIBUTING.md',
} as const;

/**
 * Research / commercial contact address. Unset in the initial release —
 * do not hardcode a real inbox until one is confirmed operational
 * (Design Book brief §11 / §19).
 */
export const contactEmail: string | undefined = import.meta.env.PUBLIC_CONTACT_EMAIL || undefined;
