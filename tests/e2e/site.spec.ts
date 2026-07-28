import { test, expect } from '@playwright/test';

test.describe('OrbSeekr landing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('header shows the brand and the single primary CTA', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'OrbSeekr' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Install from Marketplace' }).first()).toBeVisible();
  });

  test('hero states the product line and both hero CTAs resolve to the real repo/marketplace', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('衛星データの主張に、根拠を義務づける。');

    const marketplaceLink = page.locator('#hero').getByRole('link', { name: 'Install from Marketplace' });
    await expect(marketplaceLink).toHaveAttribute('href', 'https://github.com/marketplace/actions/eo-claim-lint');

    const repoLink = page.locator('#hero').getByRole('link', { name: 'View on GitHub' });
    await expect(repoLink).toHaveAttribute('href', 'https://github.com/a-hikata/eo-claim-lint');
  });

  test('hero shows the current v0 usage example, never the outdated v1 mockup', async ({ page }) => {
    const code = page.locator('#hero pre');
    await expect(code).toContainText('a-hikata/eo-claim-lint@v0');
    await expect(code).not.toContainText('orbseekr/eo-claim-lint@v1');
  });

  test('FAQ accordion opens a question on activation', async ({ page }) => {
    const faq = page.locator('#faq');
    await faq.scrollIntoViewIfNeeded();
    const firstItem = faq.locator('details').first();
    await expect(firstItem).not.toHaveAttribute('open', '');
    await firstItem.locator('summary').click();
    await expect(firstItem).toHaveAttribute('open', '');
  });

  test('footer links to the real license, security, and support documents — and never to Discord', async ({ page }) => {
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer.getByRole('link', { name: /License/ })).toHaveAttribute(
      'href',
      'https://github.com/a-hikata/eo-claim-lint/blob/main/LICENSE',
    );
    await expect(page.getByText(/discord/i)).toHaveCount(0);
  });

  test('skip link is keyboard-reachable and jumps to main content', async ({ page }, testInfo) => {
    // WebKit's mobile/tablet emulation does not tab to <a> elements by default
    // (matching real Safari's "Full Keyboard Access" default) — this is a
    // physical-keyboard flow, so it is scoped to the desktop project.
    test.skip(testInfo.project.name !== 'desktop', 'keyboard-only navigation is a desktop input mode');

    await page.keyboard.press('Tab');
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toHaveAttribute('href', '#main');
  });
});
