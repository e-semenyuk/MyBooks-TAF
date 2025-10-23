export interface AdminUser {
  email: string;
  password: string;
}

export interface BookData {
  title: string;
  author: string;
  isbn: string;
  price: string;
  stockQuantity: string;
}

export interface BookUpdateData {
  price: string;
  stockQuantity: string;
}

// Test data constants
export const adminUser: AdminUser = {
  email: 'admin@bookstore.com',
  password: 'admin123'
};

// Generate unique test data per worker to avoid conflicts
const workerId = process.env.TEST_WORKER_INDEX || '0';

export const testBook: BookData = {
  title: `The Pragmatic Programmer ${workerId}`,
  author: 'Andrew Hunt',
  isbn: `978-0201616224-${workerId}`,
  price: '42.50',
  stockQuantity: '10'
};

export const bookUpdateData: BookUpdateData = {
  price: '39.99',
  stockQuantity: '15'
};
