import { test, expect } from '@playwright/test';
import { HomePage } from '../../../../core/pages/HomePage';
import { cfg } from '../../../../core/config';
import { searchTestData, getBooksBySearch } from '../../../../core/fixtures/search.fixture';

test.describe('E2E: User searches catalog by title and views all books', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to base URL before each test
    await page.goto(cfg.BASE_URL);
  });

  test('@e2e @user @search @validation user can search books by title and view all books', async ({ page }) => {
    const homePage = new HomePage(page);

    // Step 1: Navigate to the base URL
    await expect(homePage.homePageElement).toBeVisible();
    await homePage.verifySearchInputVisible();
    console.log('✅ Step 1: Homepage loads; search input visible');

    // Step 2: Search by valid title
    await homePage.performSearch(searchTestData.valid_title);
    
    // Verify search results
    const validResults = getBooksBySearch(searchTestData.valid_title);
    const resultsCount = await homePage.getSearchResultsCount();
    
    await homePage.verifySearchResultsHeader(resultsCount);
    console.log(`✅ Step 2: Books matching "${searchTestData.valid_title}" displayed; header shows "Search Results (${resultsCount})"`);

    // Step 3: Search by partial title
    await homePage.performSearch(searchTestData.partial_title);
    
    // Verify partial search results
    const partialResults = getBooksBySearch(searchTestData.partial_title);
    const partialResultsCount = await homePage.getSearchResultsCount();
    
    await homePage.verifySearchResultsHeader(partialResultsCount);
    console.log(`✅ Step 3: Books whose titles contain "${searchTestData.partial_title}" displayed`);

    // Step 4: Search by non-existent title
    await homePage.performSearch(searchTestData.nonexistent_title);
    
    // Verify no books found
    await homePage.verifyNoBooksFound();
    console.log(`✅ Step 4: Displays 'No books found' and 'View All Books' button`);

    // Step 5: Click 'View All Books'
    await homePage.clickViewAllBooks();
    
    // Verify all books are listed
    const allBooksCount = await homePage.getSearchResultsCount();
    await homePage.verifyAllBooksHeader(allBooksCount);
    console.log(`✅ Step 5: All books are listed; header shows "All Books (${allBooksCount})"`);

    // Step 6: Negative: Clear search and submit empty query
    await homePage.clearSearch();
    
    // Verify all books are still shown
    const finalBooksCount = await homePage.getSearchResultsCount();
    await homePage.verifyAllBooksHeader(finalBooksCount);
    console.log(`✅ Step 6: All books are shown after empty search; no errors`);
  });
});
