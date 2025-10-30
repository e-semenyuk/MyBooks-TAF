import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export class HomePage extends BasePage {
  // Locators - try data-testid first, then fallback to flexible locators
  readonly homePageElement: Locator = this.byId('home-page');
  readonly navHomeButton: Locator = this.byId('nav-home-button');
  readonly navProfileButton: Locator = this.byId('nav-profile-button');
  readonly navAdminButton: Locator = this.byId('nav-admin-button');
  readonly navLoginButton: Locator = this.byId('nav-login-button');
  readonly navLogoutButton: Locator = this.byId('nav-logout-button');
  
  // Search functionality locators
  readonly searchInput: Locator = this.byId('search-input');
  readonly searchButton: Locator = this.byId('search-submit-button');
  readonly searchResultsHeader: Locator = this.byId('books-count');
  readonly allBooksHeader: Locator = this.byId('all-books-header');
  readonly noBooksFoundCard: Locator = this.byId('no-books-message');
  readonly viewAllBooksButton: Locator = this.byId('view-all-books-button');
  readonly bookGrid: Locator = this.byId('books-grid');
  readonly bookCards: Locator = this.bookGrid.locator('[data-testid^="book-card-"]');
  
  // Cart functionality locators
  readonly cartCount: Locator = this.byId('cart-count-badge');
  readonly cartButton: Locator = this.byId('nav-cart-button');
  readonly addToCartButton: Locator = this.page.locator('[data-testid^="add-to-cart-button-"]');

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

  async clickHomeButton(): Promise<void> {
    await this.navHomeButton.click();
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
  // Search functionality actions with flexible locators
  async performSearch(query: string): Promise<void> {
    // Try data-testid first, then fallback to flexible locators
    if (await this.searchInput.isVisible()) {
      await this.searchInput.fill(query);
      await this.searchButton.click();
    } else {
      const searchInputSelectors = [
        'input[placeholder*="Search"]',
        'input[placeholder*="search"]',
        'input[type="search"]',
        'input[name*="search"]',
        'input[id*="search"]',
        '.search-input',
        '.search-field'
      ];

      for (const selector of searchInputSelectors) {
        const element = this.page.locator(selector).first();
        if (await element.isVisible()) {
          await element.fill(query);
          break;
        }
      }

      const searchButtonSelectors = [
        'button:has-text("Search")',
        'button[type="submit"]',
        'input[type="submit"]',
        '.search-button',
        '.search-btn',
        'button[class*="search"]'
      ];

      for (const selector of searchButtonSelectors) {
        const element = this.page.locator(selector).first();
        if (await element.isVisible()) {
          await element.click();
          break;
        }
      }
    }
    // Wait for search results to load
    await this.page.waitForTimeout(1000);
  }

  async clearSearch(): Promise<void> {
    // Try data-testid first, then fallback to flexible locators
    if (await this.searchInput.isVisible()) {
      await this.searchInput.clear();
      await this.searchButton.click();
    } else {
      const searchInputSelectors = [
        'input[placeholder*="Search"]',
        'input[placeholder*="search"]',
        'input[type="search"]',
        'input[name*="search"]',
        'input[id*="search"]',
        '.search-input',
        '.search-field'
      ];

      for (const selector of searchInputSelectors) {
        const element = this.page.locator(selector).first();
        if (await element.isVisible()) {
          await element.clear();
          break;
        }
      }

      const searchButtonSelectors = [
        'button:has-text("Search")',
        'button[type="submit"]',
        'input[type="submit"]',
        '.search-button',
        '.search-btn',
        'button[class*="search"]'
      ];

      for (const selector of searchButtonSelectors) {
        const element = this.page.locator(selector).first();
        if (await element.isVisible()) {
          await element.click();
          break;
        }
      }
    }
    await this.page.waitForTimeout(1000);
  }

  async clickViewAllBooks(): Promise<void> {
    // Try data-testid first, then fallback to flexible locators
    if (await this.viewAllBooksButton.isVisible()) {
      await this.viewAllBooksButton.click();
    } else {
      const viewAllSelectors = [
        'button:has-text("View All Books")',
        'button:has-text("View All")',
        'button:has-text("Show All")',
        'button:has-text("All Books")',
        'a:has-text("View All Books")',
        'a:has-text("View All")',
        '[data-testid*="view-all"]',
        '[data-testid*="all-books"]',
        '.view-all',
        '.show-all',
        '.all-books'
      ];

      for (const selector of viewAllSelectors) {
        const element = this.page.locator(selector).first();
        if (await element.isVisible()) {
          await element.click();
          await this.page.waitForTimeout(1000);
          return;
        }
      }
      throw new Error('View All Books button not found');
    }
    await this.page.waitForTimeout(1000);
  }

  async getSearchResultsCount(): Promise<number> {
    const cards = await this.bookCards.count();
    return cards;
  }

  async getBookCardByTitle(title: string): Promise<Locator | null> {
    const cards = await this.bookCards.all();
    for (const card of cards) {
      const titleElement = card.locator('[data-testid^="book-title-"]');
      const cardTitle = await titleElement.textContent();
      if (cardTitle === title) {
        return card;
      }
    }
    return null;
  }

  async addBookToCart(title: string): Promise<void> {
    const bookCard = await this.getBookCardByTitle(title);
    if (bookCard) {
      const addButton = bookCard.locator('[data-testid^="add-to-cart-button-"]');
      await addButton.click();
      await this.page.waitForTimeout(500);
    } else {
      throw new Error(`Book with title "${title}" not found`);
    }
  }

  async getCartCount(): Promise<number> {
    const countText = await this.cartCount.textContent();
    return parseInt(countText || '0');
  }

  async isBookInStock(title: string): Promise<boolean> {
    const bookCard = await this.getBookCardByTitle(title);
    if (bookCard) {
      const addButton = bookCard.locator('[data-testid^="add-to-cart-button-"]');
      const isDisabled = await addButton.isDisabled();
      const buttonText = await addButton.textContent();
      // Check if button is disabled or shows "Out of Stock"
      return !isDisabled && !buttonText?.includes('Out of Stock');
    }
    return false;
  }

  async verifySearchResultsHeader(expectedCount: number): Promise<void> {
    const headerText = await this.searchResultsHeader.textContent();
    const expectedText = `Search Results (${expectedCount})`;
    if (headerText !== expectedText) {
      throw new Error(`Expected header "${expectedText}", but got "${headerText}"`);
    }
  }

  async verifyAllBooksHeader(expectedCount: number): Promise<void> {
    const headerText = await this.allBooksHeader.textContent();
    const expectedText = `All Books (${expectedCount})`;
    if (headerText !== expectedText) {
      throw new Error(`Expected header "${expectedText}", but got "${headerText}"`);
    }
  }

  async verifyNoBooksFound(): Promise<void> {
    await this.noBooksFoundCard.waitFor({ state: 'visible', timeout: 5000 });
    await this.viewAllBooksButton.waitFor({ state: 'visible', timeout: 5000 });
  }

  async verifySearchInputVisible(): Promise<void> {
    // Try data-testid first, then fallback to flexible locators
    if (await this.searchInput.isVisible()) {
      await this.searchInput.waitFor({ state: 'visible', timeout: 5000 });
    } else {
      const searchInputSelectors = [
        'input[placeholder*="Search"]',
        'input[placeholder*="search"]',
        'input[type="search"]',
        'input[name*="search"]',
        'input[id*="search"]',
        '.search-input',
        '.search-field'
      ];

      for (const selector of searchInputSelectors) {
        const element = this.page.locator(selector).first();
        if (await element.isVisible()) {
          await element.waitFor({ state: 'visible', timeout: 5000 });
          return;
        }
      }
      throw new Error('Search input not found');
    }
  }
  async verifyAddToCartToast(): Promise<void> {
    const toastSelectors = [
      'text=Book added to cart',
      'text=Added to cart',
      'text=Item added',
      '[data-testid*="toast"]',
      '.toast',
      '.notification',
      '.alert'
    ];

    for (const selector of toastSelectors) {
      const element = this.page.locator(selector).first();
      if (await element.isVisible()) {
        await element.waitFor({ state: 'visible', timeout: 5000 });
        return;
      }
    }
    throw new Error('Add to cart toast not found');
  }

  // Additional methods for user journey with flexible locators
  async clickCartButton(): Promise<void> {
    // Try data-testid first, then fallback to flexible locators
    if (await this.cartButton.isVisible()) {
      await this.cartButton.click();
    } else {
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

  // Additional cart functionality methods
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
