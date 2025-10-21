import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../core/pages/LoginPage';
import { cfg } from '../../../core/config';

test.describe('Auth / Login', () => {
  test('@smoke user can login via UI', async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto(cfg.BASE_URL);
    await login.login(process.env.EMAIL_USER!, process.env.EMAIL_PASS!);
    await expect(page.getByTestId('home-page')).toBeVisible();
  });
});


