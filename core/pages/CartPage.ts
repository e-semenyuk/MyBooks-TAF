import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export class CartPage extends BasePage {
  // Locators
  readonly cartPageElement: Locator = this.byId('cart-page');
  readonly cartItems: Locator = this.page.locator('[data-testid^="cart-item-"]');
  readonly cartTotal: Locator = this.byId('cart-total');
  readonly checkoutButton: Locator = this.byId('checkout-button');
  readonly emptyCartMessage: Locator = this.byId('empty-cart-message');
  readonly removeItemButton: Locator = this.page.locator('[data-testid^="remove-item-"]');
  readonly updateQuantityInput: Locator = this.page.locator('[data-testid^="quantity-input-"]');
  readonly updateQuantityButton: Locator = this.page.locator('[data-testid^="update-quantity-"]');

  // Toast messages
  readonly addToCartToast: Locator = this.page.locator('text=Book added to cart');
  readonly removeFromCartToast: Locator = this.page.locator('text=Book removed from cart');
  readonly updateQuantityToast: Locator = this.page.locator('text=Quantity updated');

  // Actions
  async isVisible(): Promise<boolean> {
    return await this.cartPageElement.isVisible();
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getCartItemByTitle(title: string): Promise<Locator | null> {
    const items = await this.cartItems.all();
    for (const item of items) {
      const titleElement = item.locator('[data-testid="cart-item-title"]');
      const itemTitle = await titleElement.textContent();
      if (itemTitle === title) {
        return item;
      }
    }
    return null;
  }

  async removeItemFromCart(title: string): Promise<void> {
    const cartItem = await this.getCartItemByTitle(title);
    if (cartItem) {
      const removeButton = cartItem.locator('[data-testid^="remove-item-"]');
      await removeButton.click();
      await this.page.waitForTimeout(500);
    } else {
      throw new Error(`Cart item with title "${title}" not found`);
    }
  }

  async updateItemQuantity(title: string, quantity: string): Promise<void> {
    const cartItem = await this.getCartItemByTitle(title);
    if (cartItem) {
      const quantityInput = cartItem.locator('[data-testid^="quantity-input-"]');
      const updateButton = cartItem.locator('[data-testid^="update-quantity-"]');
      
      await quantityInput.fill(quantity);
      await updateButton.click();
      await this.page.waitForTimeout(500);
    } else {
      throw new Error(`Cart item with title "${title}" not found`);
    }
  }

  async getCartTotal(): Promise<string> {
    const totalText = await this.cartTotal.textContent();
    return totalText || '0.00';
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.page.waitForTimeout(1000);
  }

  async verifyAddToCartToast(): Promise<void> {
    await this.addToCartToast.waitFor({ state: 'visible', timeout: 5000 });
  }

  async verifyRemoveFromCartToast(): Promise<void> {
    await this.removeFromCartToast.waitFor({ state: 'visible', timeout: 5000 });
  }

  async verifyUpdateQuantityToast(): Promise<void> {
    await this.updateQuantityToast.waitFor({ state: 'visible', timeout: 5000 });
  }

  async verifyEmptyCart(): Promise<void> {
    await this.emptyCartMessage.waitFor({ state: 'visible', timeout: 5000 });
  }

  async verifyCartItemExists(title: string): Promise<void> {
    const item = await this.getCartItemByTitle(title);
    if (!item) {
      throw new Error(`Cart item with title "${title}" not found`);
    }
  }

  async verifyCartItemNotExists(title: string): Promise<void> {
    const item = await this.getCartItemByTitle(title);
    if (item) {
      throw new Error(`Cart item with title "${title}" should not exist`);
    }
  }
}
