export const site = {
  url: 'https://orbseekr.jp',
  name: 'OrbSeekr',
} as const;

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
