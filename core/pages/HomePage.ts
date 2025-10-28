import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export class HomePage extends BasePage {
  // Locators
  readonly homePageElement: Locator = this.byId('home-page');
  readonly navProfileButton: Locator = this.byId('nav-profile-button');
  readonly navAdminButton: Locator = this.byId('nav-admin-button');
  readonly navLoginButton: Locator = this.byId('nav-login-button');
  readonly navLogoutButton: Locator = this.byId('nav-logout-button');
  readonly navCartButton: Locator = this.byId('nav-cart-button');
  readonly cartCountBadge: Locator = this.byId('cart-count-badge');
  readonly booksGrid: Locator = this.byId('books-grid');

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

  async clickCartButton(): Promise<void> {
    await this.navCartButton.click();
  }

  async getCartCount(): Promise<string> {
    try {
      // Check if cart badge is visible first
      if (await this.cartCountBadge.isVisible({ timeout: 2000 })) {
        return await this.cartCountBadge.textContent() || '0';
      } else {
        // If cart badge is not visible, cart is likely empty
        return '0';
      }
    } catch (error) {
      // If there's any error getting the cart count, assume it's 0
      return '0';
    }
  }

  async isCartCountVisible(): Promise<boolean> {
    return await this.cartCountBadge.isVisible();
  }

  // Dynamic locators for book cards
  getBookCard(id: string): Locator {
    return this.byId(`book-card-${id}`);
  }

  getAddToCartButton(id: string): Locator {
    return this.byId(`add-to-cart-button-${id}`);
  }

  getBookTitle(id: string): Locator {
    return this.byId(`book-title-${id}`);
  }

  async addBookToCart(bookId: string): Promise<void> {
    await this.getAddToCartButton(bookId).click();
  }

  async waitForAddToCartSuccess(): Promise<void> {
    // Wait for success toast to appear
    await this.page.waitForSelector('[data-sonner-toast][data-type="success"]', { timeout: 10000 });
  }

  async getAddToCartSuccessMessage(): Promise<string> {
    const toastContent = this.page.locator('[data-sonner-toast][data-type="success"] [data-content]');
    return await toastContent.textContent() || '';
  }
}


