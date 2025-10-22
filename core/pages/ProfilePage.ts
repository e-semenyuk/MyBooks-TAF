import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';
import { cfg } from '../config';

export class ProfilePage extends BasePage {
  // Locators
  readonly profileHeader: Locator = this.byId('profile-header');

  // Actions
  async isProfileHeaderVisible(): Promise<boolean> {
    return await this.profileHeader.isVisible();
  }

  async navigateToProfile(userId: string): Promise<void> {
    await this.page.goto(`${cfg.BASE_URL}/users/${userId}`);
  }
}
