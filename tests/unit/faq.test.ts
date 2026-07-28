import { describe, expect, it } from 'vitest';
import { faq } from '../../src/content/ja/faq';

describe('FAQ data', () => {
  it('has at least the 12 required questions', () => {
    expect(faq.items.length).toBeGreaterThanOrEqual(12);
  });

  it('every item has a non-empty question and answer', () => {
    for (const item of faq.items) {
      expect(item.question.length).toBeGreaterThan(0);
      expect(item.answer.length).toBeGreaterThan(0);
    }
  });

  it('states plainly that a pass does not guarantee scientific or legal correctness', () => {
    const verification = faq.items.find((i) => i.question.includes('数字が正しいか'));
    expect(verification?.answer).toContain('数字の科学的正しさや法的有効性を保証しません');
  });

  it('denies — rather than asserts — zero network access, and discloses the real install-time traffic', () => {
    const dataQuestion = faq.items.find((i) => i.question.includes('データは外部へ送信'));
    // The phrase may appear only inside an explicit denial ("...という意味ではありません").
    expect(dataQuestion?.answer).toContain('という意味ではありません');
    expect(dataQuestion?.answer).toContain('setup-python');
  });
});
