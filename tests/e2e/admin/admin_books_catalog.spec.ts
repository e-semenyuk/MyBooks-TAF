import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../core/pages/LoginPage';
import { HomePage } from '../../../core/pages/HomePage';
import { AdminDashboardPage } from '../../../core/pages/AdminDashboardPage';
import { BookManagementPage } from '../../../core/pages/BookManagementPage';
import { cfg } from '../../../core/config';
import { adminUser, testBook, bookUpdateData } from '../../../core/fixtures/admin.fixture';

test.describe('E2E: Admin manages book catalog (add, edit, delete)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to base URL before each test
    await page.goto(cfg.BASE_URL);
  });

  test('@e2e @admin @books @validation admin can create, update, and delete books', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const adminDashboardPage = new AdminDashboardPage(page);
    const bookManagementPage = new BookManagementPage(page);

    // Step 1: Navigate to the base URL
    await expect(homePage.homePageElement).toBeVisible();
    console.log('✅ Step 1: Homepage loads successfully');

    // Step 2: Open Login from navbar and sign in as admin
    await loginPage.login(adminUser.email, adminUser.password);
    
    // Wait for login to complete - wait for the Admin button to appear
    await expect(homePage.navAdminButton).toBeVisible({ timeout: 10000 });
    
    // Verify login succeeds and navbar shows Admin button
    console.log('✅ Step 2: Login succeeds; navbar shows Admin button');

    // Step 3: Navigate to Admin dashboard from navbar
    await homePage.clickAdminButton();
    await page.waitForTimeout(2000); // Wait for navigation
    await expect(adminDashboardPage.adminDashboardElement).toBeVisible({ timeout: 10000 });
    await expect(adminDashboardPage.booksTab).toBeVisible({ timeout: 10000 });
    console.log('✅ Step 3: Admin dashboard loads with Books tab active');

    // Step 4: Fill Add New Book form and submit
    await page.waitForTimeout(1000); // Wait for form to appear
    await expect(bookManagementPage.addBookForm).toBeVisible();
    await bookManagementPage.addBook(testBook);
    
    // Verify success toast appears
    await bookManagementPage.verifyAddSuccessToast();
    console.log('✅ Success toast: "Book added successfully"');
    
    // Verify book appears in list with unique identifiers
    await bookManagementPage.verifyBookExists(testBook.title);
    await bookManagementPage.verifyBookDetails(testBook.title, testBook.author, testBook.isbn);
    console.log('✅ Step 4: Book added successfully and appears in list with unique details');

      // Step 5: Select Edit on the created book and update fields
      await page.waitForTimeout(2000); // Wait for book list to be fully rendered
      await bookManagementPage.updateBook(testBook.title, bookUpdateData);
    
    // Verify update success toast
    await bookManagementPage.verifyUpdateSuccessToast();
    console.log('✅ Step 5: Book updated successfully');

    // Step 6: Click Delete on the book and confirm browser prompt
    await page.waitForTimeout(2000);// Wait for book list to be fully rendered
    await bookManagementPage.deleteBook(testBook.title);
    
    // Verify delete success toast
    await bookManagementPage.verifyDeleteSuccessToast();
    console.log('✅ Success toast: "Book deleted successfully"');
    
    // Verify book is removed from list
    await bookManagementPage.verifyBookNotExists(testBook.title);
    console.log('✅ Step 6: Book deleted successfully and removed from list');
  });
});
