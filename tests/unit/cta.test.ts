import { describe, expect, it } from 'vitest';
import { hero } from '../../src/content/ja/hero';
import { faq } from '../../src/content/ja/faq';
import { contact } from '../../src/content/ja/contact';
import { links } from '../../src/lib/config';

describe('CTA URLs', () => {
  it('hero primary CTA installs from Marketplace, secondary views the repo', () => {
    expect(hero.primaryCta).toEqual({ label: 'Install from Marketplace', href: links.marketplace });
    expect(hero.secondaryCta).toEqual({ label: 'View on GitHub', href: links.repo });
  });

  it('hero code sample uses the current v0 tag and files input, never v1', () => {
    expect(hero.code).toContain('a-hikata/eo-claim-lint@v0');
    expect(hero.code).toContain('files: claims/*.json');
    expect(hero.code).not.toContain('@v1');
    expect(hero.code).not.toContain('orbseekr/eo-claim-lint');
    expect(hero.code).not.toContain('reports/**/*.md');
    expect(hero.code).not.toContain('require-uncertainty');
  });

  it('FAQ support CTA points at GitHub Issues', () => {
    expect(faq.cta.href).toBe(links.issues);
  });

  it('contact channels only ever link to real, existing surfaces', () => {
    const ctaHrefs = contact.channels.map((c) => c.cta?.href).filter(Boolean);
    for (const href of ctaHrefs) {
      expect(href).toMatch(/^https:\/\/github\.com\/a-hikata\/eo-claim-lint/);
    }
    // The one channel without a resolved inbox must show the fallback, not a fabricated address.
    const researchChannel = contact.channels.find((c) => c.label.includes('Research'));
    expect(researchChannel?.cta).toBeUndefined();
    expect(researchChannel?.fallback).toBe('Research and commercial inquiries will be available soon.');
  });

  it('never links to GitHub Discussions (not enabled on the repository)', () => {
    const all = JSON.stringify({ hero, faq, contact });
    expect(all.toLowerCase()).not.toContain('discussion');
  });
});
