import { links } from '../../lib/config';

export const hero = {
  eyebrow: 'OPEN SOURCE · GITHUB ACTION',
  headline: '衛星データの主張に、根拠を義務づける。',
  body: 'eo-claim-lintは、地球観測データから作られた主張を、根拠・不確実性・データの由来・表示の整合性という観点から自動検査するオープンソースツールです。',
  primaryCta: { label: 'Install from Marketplace', href: links.marketplace },
  secondaryCta: { label: 'View on GitHub', href: links.repo },
  codeLabel: '.github/workflows/eo.yml',
  code: `permissions:
  contents: read

steps:
  - uses: actions/checkout@v4
  - uses: a-hikata/eo-claim-lint@v0
    with:
      files: claims/*.json`,
} as const;
