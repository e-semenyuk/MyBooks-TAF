export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface CheckoutData {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
}

// Test data constants
export const newUser: NewUser = {
  name: 'Alice Reader',
  email: 'alice.reader+e2e@example.com',
  password: 'alicepass'
};

export const checkoutData: CheckoutData = {
  customerName: 'Alice Reader',
  customerEmail: 'alice.reader+e2e@example.com',
  customerAddress: '123 Library Ln, Booktown'
};

// Generate unique test data per worker to avoid conflicts
const workerId = process.env.TEST_WORKER_INDEX || '0';

export const uniqueUser: NewUser = {
  name: `Alice Reader ${workerId}`,
  email: `alice.reader+e2e-${workerId}@example.com`,
  password: 'alicepass'
};

export const uniqueCheckoutData: CheckoutData = {
  customerName: `Alice Reader ${workerId}`,
  customerEmail: `alice.reader+e2e-${workerId}@example.com`,
  customerAddress: '123 Library Ln, Booktown'
};
