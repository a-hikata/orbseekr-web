import { links } from '../../lib/config';

export const footer = {
  tagline: 'Evidence for what you claim about Earth.',
  columns: [
    {
      title: 'Product',
      links: [
        { label: 'eo-claim-lint', href: links.repo },
        { label: 'GitHub Marketplace', href: links.marketplace },
        { label: 'Releases', href: links.releases },
      ],
    },
    {
      title: 'Project',
      links: [
        { label: 'License (Apache-2.0)', href: links.license },
        { label: 'Security', href: links.security },
        { label: 'Support', href: links.support },
        { label: 'Privacy', href: links.privacy },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} OrbSeekr Core.`,
} as const;
