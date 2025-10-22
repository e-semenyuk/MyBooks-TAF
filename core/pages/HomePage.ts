import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export class HomePage extends BasePage {
  // Locators
  readonly homePageElement: Locator = this.byId('home-page');
  readonly navProfileButton: Locator = this.byId('nav-profile-button');

  // Actions
  async isVisible(): Promise<boolean> {
    return await this.homePageElement.isVisible();
  }

  async clickProfileButton(): Promise<void> {
    await this.navProfileButton.click();
  }

  async isProfileButtonVisible(timeout: number = 3000): Promise<boolean> {
    return await this.navProfileButton.isVisible({ timeout }).catch(() => false);
  }
}


