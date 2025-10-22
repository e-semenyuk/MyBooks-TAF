import { test, expect } from '@playwright/test';
import { HomePage } from '../../../core/pages/HomePage';
import { ProfilePage } from '../../../core/pages/ProfilePage';
import { cfg } from '../../../core/config';

test.describe('Users / Profile', () => {
  test('@regression profile page loads', async ({ page }) => {
    const homePage = new HomePage(page);
    const profilePage = new ProfilePage(page);
    
    await page.goto(cfg.BASE_URL);
    
    if (await homePage.isProfileButtonVisible()) {
      await homePage.clickProfileButton();
    } else {
      await profilePage.navigateToProfile('123');
    }
    
    await expect(profilePage.profileHeader).toBeVisible();
  });
});


