import { describe, expect, it } from 'vitest';
import { hero } from '../../src/content/ja/hero';
import { problem } from '../../src/content/ja/problem';
import { solution } from '../../src/content/ja/solution';
import { features } from '../../src/content/ja/features';
import { architecture } from '../../src/content/ja/architecture';
import { openSource } from '../../src/content/ja/openSource';
import { useCases } from '../../src/content/ja/useCases';
import { future } from '../../src/content/ja/future';
import { roadmap } from '../../src/content/ja/roadmap';
import { faq } from '../../src/content/ja/faq';
import { contact } from '../../src/content/ja/contact';
import { footer } from '../../src/content/ja/footer';
import { navItems } from '../../src/content/ja/nav';

const allContent = JSON.stringify({
  hero,
  problem,
  solution,
  features,
  architecture,
  openSource,
  useCases,
  future,
  roadmap,
  faq,
  contact,
  footer,
  navItems,
});

describe('brand and factual guardrails (Design Book §21 content tests)', () => {
  it('never mentions Discord', () => {
    expect(allContent.toLowerCase()).not.toContain('discord');
  });

  it('never claims scientific correctness is guaranteed', () => {
    expect(allContent).not.toContain('科学的に正しいことを保証');
  });

  it('never claims legal validity', () => {
    expect(allContent).not.toContain('法的に有効');
  });

  it('never asserts total network isolation as a bare fact — only as an explicit denial', () => {
    const bannedPhrase = '完全にネットワークアクセスがない';
    let index = allContent.indexOf(bannedPhrase);
    let found = false;
    while (index !== -1) {
      found = true;
      const tail = allContent.slice(index, index + bannedPhrase.length + 30);
      expect(tail).toContain('ではありません');
      index = allContent.indexOf(bannedPhrase, index + 1);
    }
    // The phrase must actually appear (as a denial) — a silent absence would hide the disclaimer.
    expect(found).toBe(true);
    expect(allContent).not.toContain('完全に外部通信なし');
  });

  it('never uses hype superlatives banned by the Design Book brand voice', () => {
    for (const word of ['革新的', '世界初', '革命的']) {
      expect(allContent).not.toContain(word);
    }
  });

  it('never advertises the outdated v1 usage example', () => {
    expect(allContent).not.toContain('orbseekr/eo-claim-lint@v1');
    expect(allContent).not.toContain('require-uncertainty');
  });

  it('shows the real Apache-2.0 license and v0.1.0 version somewhere', () => {
    expect(allContent).toContain('Apache License 2.0');
    expect(allContent).toContain('v0.1.0');
  });

  it('shows the test count verified by a from-clean build (776 passed, 1 skipped), not a stale figure', () => {
    expect(allContent).toContain('776');
    expect(allContent).not.toContain('734 passed');
  });
});
