import { describe, expect, it } from 'vitest';
import { openSource } from '../../src/content/ja/openSource';
import { links } from '../../src/lib/config';

describe('open source facts', () => {
  const factValue = (label: string) => openSource.facts.find((f) => f.label === label)?.value;

  it('shows Apache License 2.0', () => {
    expect(factValue('License')).toBe('Apache License 2.0');
  });

  it('shows v0.1.0, not a v1 release', () => {
    expect(factValue('Version')).toBe('v0.1.0');
  });

  it('shows 0 runtime dependencies', () => {
    expect(factValue('Runtime dependencies')).toBe('0');
  });

  it('shows the verified test count (776 passed, 1 skipped, from a from-clean build at the published a15ac74 commit)', () => {
    const tests = factValue('Tests');
    expect(tests).toContain('776 passed');
  });

  it('links point at the real repository and marketplace listing', () => {
    expect(openSource.links.find((l) => l.label === 'Repository')?.href).toBe(links.repo);
    expect(openSource.links.find((l) => l.label === 'Marketplace')?.href).toBe(links.marketplace);
  });
});
