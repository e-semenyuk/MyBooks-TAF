import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export class RegistrationPage extends BasePage {
  // Locators using flexible selectors
  readonly registrationForm: Locator = this.page.locator('form').first();
  readonly nameInput: Locator = this.page.locator('input[type="text"]').first();
  readonly emailInput: Locator = this.page.locator('input[type="email"]').first();
  readonly passwordInput: Locator = this.page.locator('input[type="password"]').first();
  readonly confirmPasswordInput: Locator = this.page.locator('input[type="password"]').nth(1);
  readonly submitButton: Locator = this.page.locator('button[type="submit"]').first();
  readonly switchToLoginButton: Locator = this.page.locator('button:has-text("Login")').first();
  readonly successToast: Locator = this.page.locator('[class*="toast"], [class*="success"], [class*="alert"]').first();
  readonly errorToast: Locator = this.page.locator('[class*="error"], [class*="danger"]').first();

  // Actions
  async isRegistrationFormVisible(): Promise<boolean> {
    return await this.registrationForm.isVisible();
  }

  async fillName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async fillConfirmPassword(confirmPassword: string): Promise<void> {
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async register(name: string, email: string, password: string, confirmPassword: string): Promise<void> {
    await this.fillName(name);
    await this.page.waitForTimeout(500);
    await this.fillEmail(email);
    await this.page.waitForTimeout(500);
    await this.fillPassword(password);
    await this.page.waitForTimeout(500);
    await this.fillConfirmPassword(confirmPassword);
    await this.page.waitForTimeout(500);
    await this.submitButton.click();
    
    // Wait for registration to complete and switch to login
    await this.page.waitForTimeout(2000);
    
    // Check if we need to switch to login form
    if (await this.switchToLoginButton.isVisible()) {
      await this.switchToLoginButton.click();
      await this.page.waitForTimeout(1000);
    }
  }

  async switchToLogin(): Promise<void> {
    await this.switchToLoginButton.click();
  }

  async isSuccessToastVisible(): Promise<boolean> {
    return await this.successToast.isVisible();
  }

  async isErrorToastVisible(): Promise<boolean> {
    return await this.errorToast.isVisible();
  }

  async getSuccessToastText(): Promise<string> {
    return await this.successToast.textContent() || '';
  }

  async getErrorToastText(): Promise<string> {
    return await this.errorToast.textContent() || '';
  }
}
