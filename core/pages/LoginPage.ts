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
    const loginButton = this.page.locator('button:has-text("Login")').first();
    await loginButton.click();
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
    const emailInput = this.page.locator('input[type="email"]').first();
    const passwordInput = this.page.locator('input[type="password"]').first();
    const submitButton = this.page.locator('button[type="submit"]').first();

    await emailInput.fill(email);
    await this.page.waitForTimeout(500);
    await passwordInput.fill(password);
    await this.page.waitForTimeout(500);
    await submitButton.click();
  }

  async switchToRegister(): Promise<void> {
    const registerButton = this.page.locator('button:has-text("Register")').first();
    await registerButton.click();
  }
}


