import { links } from '../../lib/config';

export const navItems = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'Features', href: '#features' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const headerCta = {
  label: 'Install from Marketplace',
  href: links.marketplace,
} as const;
