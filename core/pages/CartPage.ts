import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export class CartPage extends BasePage {
  // Locators using flexible selectors
  readonly cartPageElement: Locator = this.page.locator('[class*="cart"], [data-testid*="cart"]').first();
  readonly cartItems: Locator = this.page.locator('[class*="cart-item"], [data-testid*="cart-item"]');
  readonly firstCartItem: Locator = this.cartItems.first();
  readonly cartTotal: Locator = this.page.locator('[class*="total"], [data-testid*="total"]').first();
  readonly cartSubtotal: Locator = this.page.locator('[class*="subtotal"], [data-testid*="subtotal"]').first();
  readonly proceedToCheckoutButton: Locator = this.page.locator('button:has-text("Proceed to Checkout"), button:has-text("Checkout"), button:has-text("Proceed")').first();
  readonly removeItemButton: Locator = this.page.locator('button:has-text("Remove"), button:has-text("Delete")').first();
  readonly emptyCartMessage: Locator = this.page.locator('[class*="empty"], [class*="no-items"]').first();
  readonly updateQuantityButton: Locator = this.page.locator('button:has-text("Update"), button:has-text("Save")').first();
  readonly clearCartButton: Locator = this.page.locator('button:has-text("Clear"), button:has-text("Empty")').first();

  // Actions
  async isCartPageVisible(): Promise<boolean> {
    return await this.cartPageElement.isVisible();
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getFirstBookTitle(): Promise<string> {
    const titleSelectors = [
      '[data-testid*="title"]',
      '[class*="title"]',
      'h1, h2, h3, h4, h5, h6',
      '[class*="book-title"]',
      '[class*="item-title"]'
    ];
    
    for (const selector of titleSelectors) {
      const element = this.firstCartItem.locator(selector).first();
      if (await element.isVisible()) {
        return await element.textContent() || '';
      }
    }
    return '';
  }

  async getFirstBookPrice(): Promise<string> {
    const priceSelectors = [
      '[data-testid*="price"]',
      '[class*="price"]',
      '[class*="cost"]',
      '[class*="amount"]'
    ];
    
    for (const selector of priceSelectors) {
      const element = this.firstCartItem.locator(selector).first();
      if (await element.isVisible()) {
        return await element.textContent() || '';
      }
    }
    return '';
  }

  async getFirstBookQuantity(): Promise<string> {
    const quantityInput = this.firstCartItem.locator('input[type="number"], input[type="text"]').first();
    return await quantityInput.inputValue();
  }

  async updateFirstBookQuantity(quantity: number): Promise<void> {
    const quantityInput = this.firstCartItem.locator('input[type="number"], input[type="text"]').first();
    await quantityInput.fill(quantity.toString());
    await this.updateQuantityButton.click();
  }

  async removeFirstItem(): Promise<void> {
    await this.removeItemButton.click();
  }

  async clearCart(): Promise<void> {
    await this.clearCartButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    const checkoutSelectors = [
      'button:has-text("Proceed to Checkout")',
      'button:has-text("Checkout")',
      'button:has-text("Proceed")',
      '[data-testid*="checkout"]',
      'button[class*="checkout"]',
      'button[class*="proceed"]'
    ];

    for (const selector of checkoutSelectors) {
      const element = this.page.locator(selector).first();
      if (await element.isVisible()) {
        await element.click();
        return;
      }
    }
    throw new Error('Proceed to Checkout button not found');
  }

  async getCartTotal(): Promise<string> {
    return await this.cartTotal.textContent() || '';
  }

  async getCartSubtotal(): Promise<string> {
    return await this.cartSubtotal.textContent() || '';
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible();
  }

  async waitForCartToLoad(): Promise<void> {
    await this.cartPageElement.waitFor({ state: 'visible' });
  }

  async isProceedToCheckoutEnabled(): Promise<boolean> {
    return await this.proceedToCheckoutButton.isEnabled();
  }
}
