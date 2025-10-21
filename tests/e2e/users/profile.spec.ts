import { test, expect } from '@playwright/test';
import { cfg } from '../../../core/config';

test.describe('Users / Profile', () => {
  test('@regression profile page loads', async ({ page }) => {
    await page.goto(cfg.BASE_URL);
    const navProfile = page.getByTestId('nav-profile-button');
    if (await navProfile.isVisible({ timeout: 3000 }).catch(() => false)) {
      await navProfile.click();
    } else {
      await page.goto(cfg.BASE_URL + '/users/123');
    }
    await expect(page.getByTestId('profile-header')).toBeVisible();
  });
});


