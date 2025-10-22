import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../core/pages/LoginPage';
import { HomePage } from '../../../core/pages/HomePage';
import { cfg } from '../../../core/config';

test.describe('Auth / Login', () => {
  test('@smoke user can login via UI', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    
    await page.goto(cfg.BASE_URL);
    await loginPage.login(process.env.EMAIL_USER!, process.env.EMAIL_PASS!);
    await expect(homePage.homePageElement).toBeVisible();
  });
});


