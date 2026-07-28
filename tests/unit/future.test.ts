import { describe, expect, it } from 'vitest';
import { future } from '../../src/content/ja/future';

describe('product availability labels', () => {
  it('flags the future roadmap as conceptual, not shipped', () => {
    expect(future.conceptNotice).toBe('Conceptual roadmap — not yet available');
  });

  it('lists eo-claim-lint as the only current product', () => {
    expect(future.current.items).toContain('eo-claim-lint');
  });

  it('never lists a vision-stage product under "current"', () => {
    for (const item of future.visionItems) {
      expect(future.current.items).not.toContain(item.name);
    }
  });

  it('does not mark unreleased eo-* products as available', () => {
    const visionText = JSON.stringify(future.visionItems);
    expect(visionText).not.toMatch(/利用可能|now available|released/);
  });
});
