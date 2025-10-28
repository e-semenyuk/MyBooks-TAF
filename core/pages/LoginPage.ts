import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export class LoginPage extends BasePage {
  // Locators - try data-testid first, then fallback to flexible locators
  readonly navLoginButton: Locator = this.byId('nav-login-button');
  readonly emailInput: Locator = this.byId('login-email-input');
  readonly passwordInput: Locator = this.byId('login-password-input');
  readonly submitButton: Locator = this.byId('login-submit-button');

  // Actions
  async clickLoginButton(): Promise<void> {
    // Try data-testid first, then fallback to flexible locators
    if (await this.navLoginButton.isVisible()) {
      await this.navLoginButton.click();
    } else {
      const loginButton = this.page.locator('button:has-text("Login")').first();
      await loginButton.click();
    }
  }

  async fillEmail(email: string): Promise<void> {
    // Try data-testid first, then fallback to flexible locators
    if (await this.emailInput.isVisible()) {
      await this.emailInput.fill(email);
    } else {
      const emailInput = this.page.locator('input[type="email"]').first();
      await emailInput.fill(email);
    }
  }

  async fillPassword(password: string): Promise<void> {
    // Try data-testid first, then fallback to flexible locators
    if (await this.passwordInput.isVisible()) {
      await this.passwordInput.fill(password);
    } else {
      const passwordInput = this.page.locator('input[type="password"]').first();
      await passwordInput.fill(password);
    }
  }

  async clickSubmitButton(): Promise<void> {
    // Try data-testid first, then fallback to flexible locators
    if (await this.submitButton.isVisible()) {
      await this.submitButton.click();
    } else {
      const submitButton = this.page.locator('button[type="submit"]').first();
      await submitButton.click();
    }
  }

  async login(email: string, password: string): Promise<void> {
    await this.clickLoginButton();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSubmitButton();
  }

  // Additional methods for user journey
  async switchToRegister(): Promise<void> {
    const registerButton = this.page.locator('button:has-text("Register")').first();
    await registerButton.click();
  }

  async fillRegistrationForm(name: string, email: string, password: string): Promise<void> {
    const passwordInputs = this.page.locator('input[type="password"]');
    const passwordCount = await passwordInputs.count();

    const nameInput = this.page.locator('input[type="text"]').first();
    const emailInput = this.page.locator('input[type="email"]').first();
    const firstPasswordInput = passwordInputs.first();
    const secondPasswordInput = passwordInputs.nth(1);
    const submitButton = this.page.locator('button[type="submit"]').first();

    await nameInput.fill(name);
    await this.page.waitForTimeout(500);
    await emailInput.fill(email);
    await this.page.waitForTimeout(500);
    await firstPasswordInput.fill(password);
    await this.page.waitForTimeout(500);
    if (passwordCount > 1) {
      await secondPasswordInput.fill(password);
      await this.page.waitForTimeout(500);
    }
    await submitButton.click();
  }

  async fillLoginForm(email: string, password: string): Promise<void> {
    const loginEmailInput = this.page.locator('input[type="email"]').first();
    const loginPasswordInput = this.page.locator('input[type="password"]').first();
    const loginSubmitButton = this.page.locator('button[type="submit"]').first();

    await loginEmailInput.fill(email);
    await this.page.waitForTimeout(500);
    await loginPasswordInput.fill(password);
    await this.page.waitForTimeout(500);
    await loginSubmitButton.click();
  }

  async switchToLoginAfterRegistration(): Promise<void> {
    // Wait for registration to complete and switch to login
    await this.page.waitForTimeout(2000);

    // Check if we need to switch to login form
    const switchToLoginButton = this.page.locator('button:has-text("Login")').first();
    if (await switchToLoginButton.isVisible()) {
      await switchToLoginButton.click();
      await this.page.waitForTimeout(1000);
    }
  }
}


