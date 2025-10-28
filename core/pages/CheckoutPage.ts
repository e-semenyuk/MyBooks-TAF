import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export class CheckoutPage extends BasePage {
  // Locators using flexible selectors
  readonly checkoutForm: Locator = this.page.locator('form').first();
  readonly customerNameInput: Locator = this.page.locator('input[name*="name"], input[id*="name"], input[placeholder*="name"]').first();
  readonly customerEmailInput: Locator = this.page.locator('input[name*="email"], input[id*="email"], input[type="email"]').first();
  readonly customerAddressInput: Locator = this.page.locator('textarea[name*="address"], input[name*="address"], textarea[id*="address"], input[id*="address"]').first();
  readonly customerPhoneInput: Locator = this.page.locator('input[name*="phone"], input[id*="phone"], input[type="tel"]').first();
  readonly submitOrderButton: Locator = this.page.locator('button:has-text("Place Order"), button:has-text("Submit Order"), button:has-text("Submit"), button[type="submit"]').first();
  readonly successToast: Locator = this.page.locator('[class*="toast"], [class*="success"], [class*="alert"]').first();
  readonly errorToast: Locator = this.page.locator('[class*="error"], [class*="danger"]').first();
  readonly orderSummary: Locator = this.page.locator('[class*="summary"], [class*="order-summary"]').first();
  readonly orderItems: Locator = this.page.locator('[class*="order-item"], [class*="item"]');
  readonly orderSubtotal: Locator = this.page.locator('[class*="subtotal"], [class*="order-subtotal"]').first();
  readonly orderTotal: Locator = this.page.locator('[class*="total"], [class*="order-total"]').first();
  readonly orderId: Locator = this.page.locator('[class*="order-id"], [class*="id"]').first();
  readonly backToCartButton: Locator = this.page.locator('button:has-text("Back"), button:has-text("Return")').first();
  readonly cancelOrderButton: Locator = this.page.locator('button:has-text("Cancel"), button:has-text("Cancel Order")').first();

  // Actions
  async isCheckoutFormVisible(): Promise<boolean> {
    return await this.checkoutForm.isVisible();
  }

  async fillCustomerName(name: string): Promise<void> {
    await this.customerNameInput.fill(name);
  }

  async fillCustomerEmail(email: string): Promise<void> {
    await this.customerEmailInput.fill(email);
  }

  async fillAddress(address: string): Promise<void> {
    const addressSelectors = [
      'textarea[name="customerAddress"]',
      'input[name="customerAddress"]',
      'textarea[id="customerAddress"]',
      'input[id="customerAddress"]',
      'textarea[placeholder*="address"]',
      'input[placeholder*="address"]',
      'textarea[placeholder*="Address"]',
      'input[placeholder*="Address"]',
      'textarea',
      'input[type="text"]'
    ];

    for (const selector of addressSelectors) {
      const element = this.page.locator(selector).first();
      if (await element.isVisible()) {
        const placeholder = await element.getAttribute('placeholder');
        const name = await element.getAttribute('name');
        const id = await element.getAttribute('id');

        if (placeholder?.toLowerCase().includes('address') ||
            name?.toLowerCase().includes('address') ||
            id?.toLowerCase().includes('address') ||
            selector.includes('textarea')) {
          await element.fill(address);
          return;
        }
      }
    }
    throw new Error('Address input not found');
  }

  async fillPhone(phone: string): Promise<void> {
    await this.customerPhoneInput.fill(phone);
  }

  async fillCustomerInfo(name: string, email: string, address: string, phone?: string): Promise<void> {
    await this.fillCustomerName(name);
    await this.fillCustomerEmail(email);
    await this.fillAddress(address);
    if (phone) {
      await this.fillPhone(phone);
    }
  }

  async submitOrder(): Promise<void> {
    const placeOrderButton = this.page.locator('button:has-text("Place Order"), button:has-text("Submit Order"), button:has-text("Submit"), button[type="submit"]').first();
    await placeOrderButton.click();
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

  async getOrderId(): Promise<string> {
    return await this.orderId.textContent() || '';
  }

  async getOrderTotal(): Promise<string> {
    return await this.orderTotal.textContent() || '';
  }

  async getOrderSubtotal(): Promise<string> {
    return await this.orderSubtotal.textContent() || '';
  }

  async getOrderItemsCount(): Promise<number> {
    return await this.orderItems.count();
  }

  async isOrderSummaryVisible(): Promise<boolean> {
    return await this.orderSummary.isVisible();
  }

  async backToCart(): Promise<void> {
    await this.backToCartButton.click();
  }

  async cancelOrder(): Promise<void> {
    await this.cancelOrderButton.click();
  }

  async isSubmitButtonEnabled(): Promise<boolean> {
    return await this.submitOrderButton.isEnabled();
  }

  async waitForOrderSubmission(): Promise<void> {
    await this.successToast.waitFor({ state: 'visible' });
  }

  async isFormValid(): Promise<boolean> {
    const nameValue = await this.customerNameInput.inputValue();
    const emailValue = await this.customerEmailInput.inputValue();
    const addressValue = await this.customerAddressInput.inputValue();
    
    return nameValue.length > 0 && emailValue.length > 0 && addressValue.length > 0;
  }
}
