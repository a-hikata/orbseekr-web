import { describe, expect, it } from 'vitest';
import { roadmap } from '../../src/content/ja/roadmap';

describe('roadmap status', () => {
  it('has exactly 4 phases in the Published -> Platform direction', () => {
    expect(roadmap.phases.map((p) => p.status)).toEqual(['Published', 'Validation', 'Expansion', 'Platform']);
  });

  it('describes direction, not committed calendar dates', () => {
    const allItems = roadmap.phases.flatMap((p) => p.items).join(' ');
    // No explicit year-quarter or month commitments (e.g. "2026-Q3", "2026年8月").
    expect(allItems).not.toMatch(/20\d{2}[-年]/);
  });

  it('marks Phase 1 as the only phase already published', () => {
    const [phase1] = roadmap.phases;
    expect(phase1.status).toBe('Published');
    expect(phase1.items).toContain('eo-claim-lint v0.1.0');
  });
});
