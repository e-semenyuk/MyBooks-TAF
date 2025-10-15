import { test, expect } from '@playwright/test';
import { cfg } from '../../../core/config';

test.describe('Users / Profile', () => {
  test('@regression profile page loads', async ({ page }) => {
    await page.goto(cfg.BASE_URL + '/users/123');
    await expect(page.getByTestId('profile-header')).toBeVisible();
  });
});


