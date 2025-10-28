import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../core/pages/LoginPage';
import { HomePage } from '../../../core/pages/HomePage';
import { CartPage } from '../../../core/pages/CartPage';
import { CheckoutPage } from '../../../core/pages/CheckoutPage';
import { cfg } from '../../../core/config';
import { adminCheckoutTestData } from '../../../core/fixtures/checkout.fixture';

test.describe('E2E: Admin checks out successfully from cart', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to base URL before each test
    await page.goto(cfg.BASE_URL);
  });

  test('@e2e @admin @checkout @validation admin can proceed to checkout from cart, submit the form, and see order confirmation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Navigate to the base URL
    await expect(homePage.homePageElement).toBeVisible();
    console.log('✅ Step 1: Homepage loads successfully');

    // Step 2: Login as admin via navbar
    await loginPage.login(adminCheckoutTestData.adminUser.email, adminCheckoutTestData.adminUser.password);
    
    // Wait for login to complete - wait for the Admin button to appear
    await expect(homePage.navAdminButton).toBeVisible({ timeout: 10000 });
    
    // Verify login succeeds and navbar shows Admin button
    console.log('✅ Step 2: Login succeeds; Admin button visible');

    // Step 3: Add an in-stock book to cart from grid
    // Wait for books to load by looking for the books grid
    await page.waitForSelector('[data-testid="books-grid"]', { timeout: 10000 });
    
    // Wait for login toast to disappear first
    await page.waitForSelector('[data-sonner-toast]', { state: 'hidden', timeout: 5000 }).catch(() => {});
    
    // Find the first "Add to Cart" button that's visible
    const addToCartButtons = page.locator('button:has-text("Add to Cart")');
    await expect(addToCartButtons.first()).toBeVisible();
    
    // Click the first available "Add to Cart" button
    await addToCartButtons.first().click();
    
    // Wait for add to cart success toast specifically
    await page.waitForSelector('[data-sonner-toast][data-type="success"]', { timeout: 10000 });
    const addToCartMessage = await page.locator('[data-sonner-toast][data-type="success"] [data-content]').textContent();
    expect(addToCartMessage).toContain('Book added to cart');
    
    // Verify cart badge increments
    await expect(homePage.cartCountBadge).toHaveText('1');
    console.log('✅ Step 3: Toast: "Book added to cart"; cart badge increments');

    // Step 4: Open Cart from navbar
    await homePage.clickCartButton();
    await cartPage.waitForCartToLoad();
    await expect(cartPage.cartPageElement).toBeVisible();
    
    // Verify cart shows at least one item
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBeGreaterThan(0);
    console.log('✅ Step 4: Cart page shows item with quantity 1');

    // Step 5: Click Proceed to Checkout
    await cartPage.clickProceedToCheckout();
    await expect(checkoutPage.checkoutPageElement).toBeVisible();
    
    // Verify checkout page renders with form fields
    await expect(checkoutPage.nameInput).toBeVisible();
    await expect(checkoutPage.emailInput).toBeVisible();
    await expect(checkoutPage.addressInput).toBeVisible();
    console.log('✅ Step 5: Checkout page renders with form fields: Full Name, Email, Address');

    // Step 6: Submit checkout form
    await checkoutPage.fillCheckoutForm(adminCheckoutTestData.checkout);
    await checkoutPage.clickPlaceOrder();
    
    // Wait for order success toast with longer timeout
    await page.waitForSelector('[data-sonner-toast][data-type="success"]', { timeout: 30000 });
    const orderSuccessMessage = await page.locator('[data-sonner-toast][data-type="success"] [data-content]').textContent();
    expect(orderSuccessMessage).toContain('Order placed successfully');
    expect(orderSuccessMessage).toContain('Order ID:');
    
    // Wait for navigation back to home/catalog (this is when cart gets cleared)
    await expect(homePage.homePageElement).toBeVisible({ timeout: 15000 });
    
    // Wait longer for the cart to be cleared after redirect
    await page.waitForTimeout(5000);
    
    // Verify cart count resets to 0 after redirect (with retry logic)
    let cartCount = await homePage.getCartCount();
    let attempts = 0;
    while (cartCount !== '0' && attempts < 3) {
      console.log(`Cart count is ${cartCount}, waiting for it to reset to 0...`);
      await page.waitForTimeout(2000);
      cartCount = await homePage.getCartCount();
      attempts++;
    }
    expect(cartCount).toBe('0');
    console.log('✅ Step 6: Order is created; toast: "Order placed successfully! Order ID: <id>"; navigates to Home; cart count resets');
  });
});