import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export interface CheckoutData {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
}

export class CheckoutPage extends BasePage {
  // Locators
  readonly checkoutPageElement: Locator = this.byId('checkout-page');
  readonly checkoutForm: Locator = this.byId('checkout-form');
  readonly nameInput: Locator = this.byId('checkout-name-input');
  readonly emailInput: Locator = this.byId('checkout-email-input');
  readonly addressInput: Locator = this.byId('checkout-address-input');
  readonly backToCartButton: Locator = this.byId('back-to-cart-button');
  readonly placeOrderButton: Locator = this.byId('place-order-button');

  // Actions
  async isVisible(): Promise<boolean> {
    return await this.checkoutPageElement.isVisible();
  }

  async fillName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillAddress(address: string): Promise<void> {
    await this.addressInput.fill(address);
  }

  async fillCheckoutForm(checkoutData: CheckoutData): Promise<void> {
    await this.fillName(checkoutData.customerName);
    await this.fillEmail(checkoutData.customerEmail);
    await this.fillAddress(checkoutData.customerAddress);
  }

  async clickPlaceOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }

  async clickBackToCart(): Promise<void> {
    await this.backToCartButton.click();
  }

  async isFormValid(): Promise<boolean> {
    const nameValue = await this.nameInput.inputValue();
    const emailValue = await this.emailInput.inputValue();
    const addressValue = await this.addressInput.inputValue();
    
    return nameValue.length > 0 && emailValue.length > 0 && addressValue.length > 0;
  }

  async waitForOrderSuccess(): Promise<void> {
    // Wait for success toast to appear
    await this.page.waitForSelector('[data-sonner-toast][data-type="success"]', { timeout: 10000 });
  }

  async getOrderSuccessMessage(): Promise<string> {
    const toastContent = this.page.locator('[data-sonner-toast][data-type="success"] [data-content]');
    return await toastContent.textContent() || '';
  }
}