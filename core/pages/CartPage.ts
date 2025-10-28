import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export class CartPage extends BasePage {
  // Locators
  readonly cartPageElement: Locator = this.byId('cart-page');
  readonly cartLoading: Locator = this.byId('cart-loading');
  readonly emptyCartMessage: Locator = this.byId('empty-cart-message');
  readonly browseBooksButton: Locator = this.byId('browse-books-button');
  readonly cartItemsList: Locator = this.byId('cart-items-list');
  readonly orderSummary: Locator = this.byId('order-summary');
  readonly cartTotal: Locator = this.byId('cart-total');
  readonly proceedToCheckoutButton: Locator = this.byId('proceed-to-checkout-button');
  readonly continueShoppingButton: Locator = this.byId('continue-shopping-button');

  // Actions
  async isVisible(): Promise<boolean> {
    return await this.cartPageElement.isVisible();
  }

  async waitForCartToLoad(): Promise<void> {
    await this.cartLoading.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible();
  }

  async getCartTotal(): Promise<string> {
    return await this.cartTotal.textContent() || '';
  }

  async clickProceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async clickBrowseBooks(): Promise<void> {
    await this.browseBooksButton.click();
  }

  // Dynamic locators for cart items
  getCartItem(id: string): Locator {
    return this.byId(`cart-item-${id}`);
  }

  getCartItemQuantity(id: string): Locator {
    return this.byId(`cart-item-quantity-${id}`);
  }

  getCartItemSubtotal(id: string): Locator {
    return this.byId(`cart-item-subtotal-${id}`);
  }

  getRemoveCartItemButton(id: string): Locator {
    return this.byId(`remove-cart-item-${id}`);
  }

  async getCartItemCount(): Promise<number> {
    const items = await this.cartItemsList.locator('[data-testid^="cart-item-"]').count();
    return items;
  }

  async removeCartItem(id: string): Promise<void> {
    await this.getRemoveCartItemButton(id).click();
  }

  async updateCartItemQuantity(id: string, quantity: string): Promise<void> {
    await this.getCartItemQuantity(id).fill(quantity);
  }
}