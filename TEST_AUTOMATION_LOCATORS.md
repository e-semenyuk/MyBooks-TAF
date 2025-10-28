# Test Automation Locators Reference

This document provides a comprehensive list of all available locators for test automation in the Next.js Bookstore application. These locators are organized by page/component and follow the `data-testid` attribute pattern for reliable test automation.

## Table of Contents
1. [Navigation Component](#navigation-component)
2. [Home Page](#home-page)
3. [Book Card Component](#book-card-component)
4. [Cart Page](#cart-page)
5. [Checkout Page](#checkout-page)
6. [Admin Page](#admin-page)
7. [Login Page](#login-page)
8. [Register Page](#register-page)
9. [Profile Page](#profile-page)
10. [Toast Notifications](#toast-notifications)
11. [Common Elements](#common-elements)
12. [Locator Usage Guidelines](#locator-usage-guidelines)

---

## Navigation Component

### Main Navigation
- `main-navigation` - Main navigation bar container
- `nav-logo-button` - Logo/brand button (navigates to home)
- `nav-home-button` - Home navigation button
- `nav-cart-button` - Cart navigation button
- `nav-admin-button` - Admin navigation button (visible only for admin users)
- `nav-profile-button` - Profile navigation button (visible when logged in)
- `nav-logout-button` - Logout button (visible when logged in)
- `nav-login-button` - Login navigation button (visible when not logged in)
- `nav-loading` - Loading spinner in navigation (during auth check)
- `cart-count-badge` - Cart item count badge

---

## Home Page

### Page Container
- `home-page` - Main home page container
- `search-section` - Hero search section
- `search-form` - Search form container
- `search-input` - Search input field
- `search-submit-button` - Search submit button
- `books-loading` - Loading spinner for books
- `no-books-message` - Message when no books found
- `view-all-books-button` - Button to view all books
- `books-count` - Books count display
- `clear-search-button` - Clear search button
- `books-grid` - Books grid container

---

## Book Card Component

### Individual Book Cards
- `book-card-{id}` - Individual book card container
- `book-stock-badge-{id}` - Stock status badge
- `book-title-{id}` - Book title
- `book-author-{id}` - Book author
- `book-price-{id}` - Book price
- `book-stock-{id}` - Stock quantity
- `add-to-cart-button-{id}` - Add to cart button

**Example Usage:**
```typescript
// For book with ID 1
const bookCard = page.getByTestId('book-card-1');
const addToCartBtn = page.getByTestId('add-to-cart-button-1');
const bookTitle = page.getByTestId('book-title-1');
```

---

## Cart Page

### Page Container
- `cart-page` - Main cart page container
- `cart-loading` - Loading spinner for cart
- `empty-cart-message` - Empty cart message
- `browse-books-button` - Browse books button (when cart is empty)
- `cart-items-list` - Cart items list container

### Individual Cart Items
- `cart-item-{id}` - Individual cart item container
- `cart-item-quantity-{id}` - Quantity input for cart item
- `cart-item-subtotal-{id}` - Subtotal for cart item
- `remove-cart-item-{id}` - Remove item button

### Order Summary
- `order-summary` - Order summary container
- `cart-total` - Total cart amount
- `proceed-to-checkout-button` - Proceed to checkout button
- `continue-shopping-button` - Continue shopping button

**Example Usage:**
```typescript
// For cart item with ID 1
const cartItem = page.getByTestId('cart-item-1');
const quantityInput = page.getByTestId('cart-item-quantity-1');
const removeBtn = page.getByTestId('remove-cart-item-1');
```

---

## Checkout Page

### Page Container
- `checkout-page` - Main checkout page container
- `checkout-form` - Checkout form container
- `checkout-name-input` - Customer name input
- `checkout-email-input` - Customer email input
- `checkout-address-input` - Customer address textarea
- `back-to-cart-button` - Back to cart button
- `place-order-button` - Place order button

---

## Admin Page

### Page Container
- `admin-page` - Main admin page container
- `admin-books-tab` - Books management tab
- `admin-orders-tab` - Orders management tab

### Book Management
- `admin-book-form` - Book form container
- `admin-book-title-input` - Book title input
- `admin-book-author-input` - Book author input
- `admin-book-isbn-input` - Book ISBN input
- `admin-book-price-input` - Book price input
- `admin-book-stock-input` - Book stock input
- `admin-book-description-input` - Book description textarea
- `admin-save-book-button` - Save book button
- `admin-cancel-edit-button` - Cancel edit button
- `admin-books-list` - Books list container

### Individual Book Items
- `admin-book-item-{id}` - Individual book item in admin list
- `admin-edit-book-{id}` - Edit book button
- `admin-delete-book-{id}` - Delete book button

### Order Management
- `admin-orders-section` - Orders section container
- `admin-orders-loading` - Loading spinner for orders
- `admin-no-orders` - No orders message
- `admin-orders-list` - Orders list container

### Individual Order Items
- `admin-order-item-{id}` - Individual order item
- `admin-order-status-{id}` - Order status dropdown

**Example Usage:**
```typescript
// For book with ID 1 in admin
const bookItem = page.getByTestId('admin-book-item-1');
const editBtn = page.getByTestId('admin-edit-book-1');
const deleteBtn = page.getByTestId('admin-delete-book-1');

// For order with ID 1 in admin
const orderItem = page.getByTestId('admin-order-item-1');
const statusSelect = page.getByTestId('admin-order-status-1');
```

---

## Login Page

### Page Container
- `login-page` - Main login page container
- `login-form` - Login form container
- `login-email-input` - Email input field
- `login-password-input` - Password input field
- `login-submit-button` - Login submit button
- `switch-to-register-button` - Switch to register button

---

## Register Page

### Page Container
- `register-page` - Main register page container
- `register-form` - Register form container
- `register-name-input` - Name input field
- `register-email-input` - Email input field
- `register-password-input` - Password input field
- `register-confirm-password-input` - Confirm password input field
- `register-submit-button` - Register submit button
- `switch-to-login-button` - Switch to login button

---

## Profile Page

### Page Container
- `profile-page` - Main profile page container
- `profile-header` - Profile header section
- `order-history-section` - Order history section
- `profile-orders-loading` - Loading spinner for orders
- `profile-no-orders` - No orders message
- `profile-orders-list` - Orders list container

### Individual Order Items
- `profile-order-item-{id}` - Individual order item in profile

**Example Usage:**
```typescript
// For order with ID 1 in profile
const orderItem = page.getByTestId('profile-order-item-1');
```

---

## Toast Notifications

### Sonner Toast System
The application uses Sonner for toast notifications. These can be located using:

- `[data-sonner-toaster]` - Toast container
- `[data-sonner-toast]` - Individual toast
- `[data-sonner-toast][data-type="success"]` - Success toast
- `[data-sonner-toast][data-type="error"]` - Error toast
- `[data-sonner-toast] [data-content]` - Toast content
- `[data-sonner-toast] [data-close-button]` - Toast close button

**Example Usage:**
```typescript
// Wait for success toast
await page.waitForSelector('[data-sonner-toast][data-type="success"]');

// Get toast content
const toastContent = page.locator('[data-sonner-toast] [data-content]');
```

---

## Common Elements

### Buttons
- All buttons use the `btn` CSS class
- Primary buttons: `btn btn-primary`
- Secondary buttons: `btn btn-secondary`
- Danger buttons: `btn btn-danger`
- Outline buttons: `btn btn-outline`

### Input Fields
- All inputs use the `input` CSS class
- Form inputs: `input`

### Cards
- Card containers: `card` or `card-gradient`
- Card content areas

### Badges
- Status badges: `badge`
- Success badges: `badge badge-success`
- Warning badges: `badge badge-warning`
- Danger badges: `badge badge-danger`
- Primary badges: `badge badge-primary`

---

## Locator Usage Guidelines

### 1. Preferred Locator Strategy
1. **Test IDs** (Primary): Use `data-testid` attributes
2. **Role-based**: Use `getByRole()` for semantic elements
3. **Text-based**: Use `getByText()` for visible text
4. **CSS Selectors**: Use `locator()` as last resort

### 2. Dynamic Locators
For elements with dynamic IDs, use the pattern:
```typescript
// For book with ID 1
const bookCard = page.getByTestId('book-card-1');
const addToCartBtn = page.getByTestId('add-to-cart-button-1');

// For cart item with ID 1
const cartItem = page.getByTestId('cart-item-1');
const quantityInput = page.getByTestId('cart-item-quantity-1');
```

### 3. Wait Strategies
```typescript
// Wait for element to be visible
await page.waitForSelector('[data-testid="home-page"]');

// Wait for toast notification
await page.waitForSelector('[data-sonner-toast][data-type="success"]');

// Wait for loading to complete
await page.waitForSelector('[data-testid="books-loading"]', { state: 'hidden' });
```

### 4. Form Interactions
```typescript
// Fill form fields
await page.getByTestId('login-email-input').fill('admin@bookstore.com');
await page.getByTestId('login-password-input').fill('admin123');

// Submit forms
await page.getByTestId('login-submit-button').click();
```

### 5. Assertions
```typescript
// Check element visibility
await expect(page.getByTestId('nav-admin-button')).toBeVisible();

// Check text content
await expect(page.getByTestId('cart-count-badge')).toHaveText('1');

// Check URL
await expect(page).toHaveURL(/cart/);
```

### 6. Test Data
The application includes demo credentials:
- **Admin**: `admin@bookstore.com` / `admin123`
- **Role**: `ADMIN`

### 7. Common Test Scenarios

#### Login Flow
```typescript
await page.getByTestId('nav-login-button').click();
await page.getByTestId('login-email-input').fill('admin@bookstore.com');
await page.getByTestId('login-password-input').fill('admin123');
await page.getByTestId('login-submit-button').click();
```

#### Add to Cart Flow
```typescript
await page.getByTestId('add-to-cart-button-1').click();
await expect(page.getByTestId('cart-count-badge')).toHaveText('1');
```

#### Checkout Flow
```typescript
await page.getByTestId('proceed-to-checkout-button').click();
await page.getByTestId('checkout-name-input').fill('Test User');
await page.getByTestId('checkout-email-input').fill('test@example.com');
await page.getByTestId('checkout-address-input').fill('123 Test St');
await page.getByTestId('place-order-button').click();
```

---

## Notes

1. **Framework**: This application uses Next.js with React and TypeScript
2. **Styling**: Tailwind CSS with custom component classes
3. **Notifications**: Sonner toast system for user feedback
4. **Authentication**: NextAuth.js for session management
5. **Database**: Prisma ORM with PostgreSQL (Supabase)

6. **Test Environment**: Ensure the application is running on the expected port (default: 3000)
7. **Admin Access**: Admin functionality is only available to users with `role: 'ADMIN'`
8. **Session Management**: User sessions persist across page navigation
9. **Cart Persistence**: Cart items persist in session storage
10. **Responsive Design**: All components are responsive and work on mobile/desktop

This locator reference should be used in conjunction with the test automation best practices document to create reliable, maintainable test automation for the Next.js Bookstore application.
