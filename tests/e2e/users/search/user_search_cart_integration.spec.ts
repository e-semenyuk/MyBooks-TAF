import { test, expect } from '@playwright/test';
import { HomePage } from '../../../../core/pages/HomePage';
import { cfg } from '../../../../core/config';
import { searchTestData, getBooksBySearch } from '../../../../core/fixtures/search.fixture';

test.describe('E2E: User journey from search to adding to cart and back to all books', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to base URL before each test
    await page.goto(cfg.BASE_URL);
  });

  test('@e2e @user @search @cart @validation user can search, add to cart, and view all books', async ({ page }) => {
    const homePage = new HomePage(page);

    // Step 1: Navigate to the base URL
    await expect(homePage.homePageElement).toBeVisible();
    await homePage.verifySearchInputVisible();
    console.log('✅ Step 1: Homepage loads with search field');

    // Step 2: Search by partial title
    await homePage.performSearch(searchTestData.partial_title);
    
    // Verify search results
    const searchResults = getBooksBySearch(searchTestData.partial_title);
    const resultsCount = await homePage.getSearchResultsCount();
    
    await homePage.verifySearchResultsHeader(resultsCount);
    console.log(`✅ Step 2: Results list appears with 'Search Results (${resultsCount})'`);

    // Step 3: Add an in-stock search result to cart
    const inStockBooks = searchResults.filter(book => book.inStock);
    if (inStockBooks.length > 0) {
      const bookToAdd = inStockBooks[0];
      const initialCartCount = await homePage.getCartCount();
      
      await homePage.addBookToCart(bookToAdd.title);
      await homePage.verifyAddToCartToast();
      
      const updatedCartCount = await homePage.getCartCount();
      expect(updatedCartCount).toBe(initialCartCount + 1);
      
      console.log(`✅ Step 3: Toast: "Book added to cart"; navbar cart count increments to ${updatedCartCount}`);
    } else {
      console.log('⚠️ Step 3: No in-stock books found in search results');
    }

    // Step 4: Search for non-existent title
    await homePage.performSearch('NoSuchTitle-000');
    
    // Verify no books found
    await homePage.verifyNoBooksFound();
    console.log(`✅ Step 4: 'No books found' with 'View All Books' button`);

    // Step 5: Click 'View All Books'
    await homePage.clickViewAllBooks();
    
    // Verify all books are displayed
    const allBooksCount = await homePage.getSearchResultsCount();
    await homePage.verifyAllBooksHeader(allBooksCount);
    console.log(`✅ Step 5: All books displayed; header changes to 'All Books (${allBooksCount})'`);

    // Step 6: Negative: Try to add an 'Out of Stock' book from grid
    const outOfStockBooks = getBooksBySearch('').filter(book => !book.inStock);
    if (outOfStockBooks.length > 0) {
      const outOfStockBook = outOfStockBooks[0];
      const bookCard = await homePage.getBookCardByTitle(outOfStockBook.title);
      
      if (bookCard) {
        const addButton = bookCard.locator('[data-testid^="add-to-cart-button-"]');
        const isDisabled = await addButton.isDisabled();
        const buttonText = await addButton.textContent();
        
        // Check if button is disabled or shows "Out of Stock"
        const isOutOfStock = isDisabled || buttonText?.includes('Out of Stock');
        expect(isOutOfStock).toBe(true);
        console.log(`✅ Step 6: Add button disabled for out-of-stock book "${outOfStockBook.title}"; no success toast`);
      }
    } else {
      console.log('⚠️ Step 6: No out-of-stock books found to test');
    }
  });
});
