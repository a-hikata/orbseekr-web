import { describe, expect, it } from 'vitest';
import { navItems, headerCta } from '../../src/content/ja/nav';
import { links } from '../../src/lib/config';

describe('navigation', () => {
  it('has exactly the 8 in-page section links, all as anchors', () => {
    expect(navItems).toHaveLength(8);
    for (const item of navItems) {
      expect(item.href.startsWith('#')).toBe(true);
    }
  });

  it('does not link to Discord anywhere', () => {
    const joined = navItems.map((i) => i.href).join(' ');
    expect(joined.toLowerCase()).not.toContain('discord');
  });

  it('header CTA installs from the Marketplace, not the repo', () => {
    expect(headerCta.href).toBe(links.marketplace);
    expect(headerCta.label).toBe('Install from Marketplace');
  });
});
