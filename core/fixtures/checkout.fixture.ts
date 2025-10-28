export interface CheckoutData {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
}

export interface AdminCheckoutTestData {
  adminUser: {
    email: string;
    password: string;
  };
  checkout: CheckoutData;
  cart: {
    bookSelection: string;
  };
}

// Test data constants for admin checkout test
export const adminCheckoutTestData: AdminCheckoutTestData = {
  adminUser: {
    email: 'admin@bookstore.com',
    password: 'admin123'
  },
  checkout: {
    customerName: 'Admin Buyer',
    customerEmail: 'admin@bookstore.com',
    customerAddress: '1 Admin Way, Admin City'
  },
  cart: {
    bookSelection: 'Any in-stock book'
  }
};