export interface SearchData {
  valid_title: string;
  partial_title: string;
  nonexistent_title: string;
}

export interface CartData {
  quantity: string;
}

export interface BookSearchResult {
  title: string;
  author: string;
  isbn: string;
  price: string;
  stockQuantity: string;
  inStock: boolean;
}

// Search test data constants
export const searchTestData: SearchData = {
  valid_title: "Pragmatic",
  partial_title: "Prag",
  nonexistent_title: "UnknownTitle9876"
};

export const cartTestData: CartData = {
  quantity: "1"
};

// Mock book data for search results
export const mockSearchBooks: BookSearchResult[] = [
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    isbn: "978-0201616224",
    price: "42.50",
    stockQuantity: "10",
    inStock: true
  },
  {
    title: "Pragmatic Thinking and Learning",
    author: "Andy Hunt",
    isbn: "978-1934356050",
    price: "39.99",
    stockQuantity: "5",
    inStock: true
  },
  {
    title: "Clean Code",
    author: "Robert Martin",
    isbn: "978-0132350884",
    price: "45.00",
    stockQuantity: "0",
    inStock: false
  },
  {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    isbn: "978-0596517748",
    price: "29.99",
    stockQuantity: "8",
    inStock: true
  }
];

// Helper function to get books by search query
export function getBooksBySearch(query: string): BookSearchResult[] {
  if (!query || query.trim() === '') {
    return mockSearchBooks;
  }
  
  const lowerQuery = query.toLowerCase();
  return mockSearchBooks.filter(book => 
    book.title.toLowerCase().includes(lowerQuery) ||
    book.author.toLowerCase().includes(lowerQuery)
  );
}

// Helper function to check if book is in stock
export function isBookInStock(title: string): boolean {
  const book = mockSearchBooks.find(b => b.title === title);
  return book ? book.inStock : false;
}
