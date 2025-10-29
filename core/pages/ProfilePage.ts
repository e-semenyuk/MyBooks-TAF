import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';
import { cfg } from '../config';

export class ProfilePage extends BasePage {
  // Locators
  readonly profileHeader: Locator = this.byId('profile-header');
  readonly orderHistory: Locator = this.byId('order-history');
  readonly orderItems: Locator = this.page.locator('[data-testid^="order-item-"]');

  // Actions
  async isProfileHeaderVisible(): Promise<boolean> {
    return await this.profileHeader.isVisible();
  }

  async navigateToProfile(userId: string): Promise<void> {
    await this.page.goto(`${cfg.BASE_URL}/users/${userId}`);
  }

  async verifyOrderHistory(): Promise<{ found: boolean; count: number; selector: string }> {
    try {
      await this.orderHistory.waitFor({ state: 'visible', timeout: 5000 });
      const count = await this.orderItems.count();
      return {
        found: true,
        count: count,
        selector: '[data-testid^="order-item-"]'
      };
    } catch (error) {
      return {
        found: false,
        count: 0,
        selector: '[data-testid^="order-item-"]'
      };
    }
  }
}
