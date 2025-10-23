import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export class HomePage extends BasePage {
  // Locators
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
    await this.navProfileButton.click();
  }

  async clickAdminButton(): Promise<void> {
    await this.navAdminButton.click();
  }

  async clickLoginButton(): Promise<void> {
    await this.navLoginButton.click();
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
}


