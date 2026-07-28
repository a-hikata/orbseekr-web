import { links } from '../../lib/config';

export const openSource = {
  eyebrow: '06 · OPEN SOURCE',
  title: '公開された手順で運営する。',
  lede: 'ブランドを主張する場所ではありません。GitHub上ではUIに溶け込み、構造の丁寧さで示します。',
  facts: [
    { label: 'License', value: 'Apache License 2.0' },
    { label: 'Repository', value: 'Public' },
    { label: 'Distribution', value: 'GitHub Marketplace' },
    { label: 'Version', value: 'v0.1.0' },
    { label: 'Tests', value: '776 passed（1 skipped, v0.1.0）' },
    { label: 'Runtime dependencies', value: '0' },
    { label: 'Vulnerability reporting', value: 'Private (GitHub Security Advisories)' },
  ],
  documents: [
    { label: 'SUPPORT.md', href: links.support },
    { label: 'PRIVACY.md', href: links.privacy },
    { label: 'CONTRIBUTING.md', href: links.contributing },
  ],
  links: [
    { label: 'Repository', href: links.repo },
    { label: 'Marketplace', href: links.marketplace },
    { label: 'Security', href: links.security },
    { label: 'Issues', href: links.issues },
  ],
} as const;
