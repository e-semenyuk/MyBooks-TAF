import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export class HomePage extends BasePage {
  // Locators - try data-testid first, then fallback to flexible locators
  readonly homePageElement: Locator = this.byId('home-page');
  readonly navProfileButton: Locator = this.byId('nav-profile-button');
  readonly navAdminButton: Locator = this.byId('nav-admin-button');
  readonly navLoginButton: Locator = this.byId('nav-login-button');
  readonly navLogoutButton: Locator = this.byId('nav-logout-button');

  // Actions
  async isVisible(): Promise<boolean> {
    return await this.homePageElement.isVisible();
  }

  async clickProfileButton(): Promise<void> {
    // Try data-testid first, then fallback to flexible locators
    if (await this.navProfileButton.isVisible()) {
      await this.navProfileButton.click();
    } else {
      const profileSelectors = [
        'button:has-text("Profile")',
        'a:has-text("Profile")',
        '[data-testid*="profile"]',
        '.profile',
        '.user-profile'
      ];

      for (const selector of profileSelectors) {
        const element = this.page.locator(selector).first();
        if (await element.isVisible()) {
          await element.click();
          return;
        }
      }
      throw new Error('Profile button not found');
    }
  }

  async clickAdminButton(): Promise<void> {
    await this.navAdminButton.click();
  }

  async clickLoginButton(): Promise<void> {
    // Try data-testid first, then fallback to flexible locators
    if (await this.navLoginButton.isVisible()) {
      await this.navLoginButton.click();
    } else {
      const loginButton = this.page.locator('button:has-text("Login")').first();
      await loginButton.click();
    }
  }

  async clickLogoutButton(): Promise<void> {
    await this.navLogoutButton.click();
  }

  async isProfileButtonVisible(timeout: number = 3000): Promise<boolean> {
    return await this.navProfileButton.isVisible({ timeout }).catch(() => false);
  }

  async isAdminButtonVisible(timeout: number = 3000): Promise<boolean> {
    return await this.navAdminButton.isVisible({ timeout }).catch(() => false);
  }

  async isLoginButtonVisible(timeout: number = 3000): Promise<boolean> {
    return await this.navLoginButton.isVisible({ timeout }).catch(() => false);
  }

  async isLogoutButtonVisible(timeout: number = 3000): Promise<boolean> {
    return await this.navLogoutButton.isVisible({ timeout }).catch(() => false);
  }

  // Additional methods for user journey
  async clickCartButton(): Promise<void> {
    const cartSelectors = [
      'button:has-text("Cart")',
      'a:has-text("Cart")',
      '[data-testid*="cart"]',
      '.cart',
      '.shopping-cart',
      'button[class*="cart"]',
      'a[class*="cart"]',
      'button:has-text("🛒")',
      'button:has-text("Basket")',
      'button:has-text("Bag")'
    ];

    for (const selector of cartSelectors) {
      const element = this.page.locator(selector).first();
      if (await element.isVisible()) {
        await element.click();
        return;
      }
    }
    throw new Error('Cart button not found');
  }

  async addFirstBookToCart(): Promise<void> {
    const addToCartSelectors = [
      'button:has-text("Add to Cart")',
      'button:has-text("Add")',
      '[data-testid*="add"]',
      '[data-testid*="cart"]',
      'button[class*="add"]',
      'button[class*="cart"]',
      '.add-to-cart',
      '.btn-add',
      'button:has-text("Buy")',
      'button:has-text("Purchase")'
    ];

    for (const selector of addToCartSelectors) {
      const element = this.page.locator(selector).first();
      if (await element.isVisible()) {
        await element.click();
        return;
      }
    }
    throw new Error('Add to Cart button not found');
  }

  async isAddToCartButtonVisible(): Promise<boolean> {
    const addToCartSelectors = [
      'button:has-text("Add to Cart")',
      'button:has-text("Add")',
      '[data-testid*="add"]',
      '[data-testid*="cart"]',
      'button[class*="add"]',
      'button[class*="cart"]',
      '.add-to-cart',
      '.btn-add',
      'button:has-text("Buy")',
      'button:has-text("Purchase")'
    ];

    for (const selector of addToCartSelectors) {
      const element = this.page.locator(selector).first();
      if (await element.isVisible()) {
        return true;
      }
    }
    return false;
  }
}


