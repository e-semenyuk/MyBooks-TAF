import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export class LoginPage extends BasePage {
  // Locators
  readonly navLoginButton: Locator = this.byId('nav-login-button');
  readonly emailInput: Locator = this.byId('login-email-input');
  readonly passwordInput: Locator = this.byId('login-password-input');
  readonly submitButton: Locator = this.byId('login-submit-button');

  // Actions
  async clickLoginButton(): Promise<void> {
    await this.navLoginButton.click();
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.clickLoginButton();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSubmitButton();
  }
}


