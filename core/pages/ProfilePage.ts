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

  async verifyOrderHistory(): Promise<{ found: boolean; count: number; selector: string }> {
    const orderSelectors = [
      '[data-testid*="order"]',
      '.order',
      '.order-history',
      '[class*="order"]',
      '[class*="history"]',
      'table',
      '.table',
      '[data-testid*="history"]'
    ];
    
    for (const selector of orderSelectors) {
      const elements = this.page.locator(selector);
      const count = await elements.count();
      if (count > 0) {
        return { found: true, count, selector };
      }
    }
    
    return { found: false, count: 0, selector: '' };
  }
}
