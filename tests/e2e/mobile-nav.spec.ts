import { test, expect } from '@playwright/test';

test.describe('mobile navigation', () => {
  test('the nav toggle opens the menu on narrow viewports', async ({ page }) => {
    await page.goto('/');

    const viewport = page.viewportSize();
    test.skip(!viewport || viewport.width >= 1120, 'hamburger toggle only renders below the desktop breakpoint');

    const toggle = page.locator('#nav-toggle');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: 'Problem' })).toBeVisible();
  });
});
