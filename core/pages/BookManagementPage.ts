import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export interface BookData {
  title: string;
  author: string;
  isbn: string;
  price: string;
  stockQuantity: string;
}

export class BookManagementPage extends BasePage {
  // Locators - Add Book Form
  readonly addBookForm: Locator = this.page.locator('text=Add New Book').first();
  readonly titleInput: Locator = this.page.locator('input[type="text"]').nth(0);
  readonly authorInput: Locator = this.page.locator('input[type="text"]').nth(1);
  readonly isbnInput: Locator = this.page.locator('input[type="text"]').nth(2);
  readonly priceInput: Locator = this.page.locator('input[type="number"]').nth(0);
  readonly stockQuantityInput: Locator = this.page.locator('input[type="number"]').nth(1);
  readonly submitBookButton: Locator = this.page.locator('button:has-text("Add Book")');

  // Locators - Book List
  readonly bookList: Locator = this.byId('admin-books-list');
  readonly bookRows: Locator = this.bookList.locator('[data-testid^="admin-book-item-"]');

  // Locators - Toast Messages
  readonly successToast: Locator = this.page.locator('text=Book added successfully');
  readonly updateSuccessToast: Locator = this.page.locator('text=Book updated successfully');
  readonly deleteSuccessToast: Locator = this.page.locator('text=Book deleted successfully');

  // Locators - Edit Book Form (reuse same input locators as add form)
  readonly editBookForm: Locator = this.page.locator('text=Edit Book').first();
  readonly updateBookButton: Locator = this.page.locator('button:has-text("Update Book")');

  // Locators - Book Details
  readonly bookTitleElement: Locator = this.page.locator('h4');
  
  // Locators - Action Buttons
  readonly editBookButton: Locator = this.page.locator('[data-testid^="admin-edit-book-"]');
  readonly deleteBookButton: Locator = this.page.locator('[data-testid^="admin-delete-book-"]');
  
  // Helper method to get book by title locator
  private getBookByTitleLocator(title: string): Locator {
    return this.page.locator(`text=${title}`);
  }
  
  // Helper method to get book card locator
  private getBookCardLocator(title: string): Locator {
    return this.page.locator(`text=${title}`).locator('..').locator('..');
  }
  
  // Helper method to get author text locator
  private getAuthorTextLocator(author: string): Locator {
    return this.page.locator(`text=${author}`);
  }
  
  // Helper method to get ISBN text locator
  private getIsbnTextLocator(isbn: string): Locator {
    return this.page.locator(`text=${isbn}`);
  }

  // Actions - Add Book
  async fillTitle(title: string): Promise<void> {
    await this.titleInput.fill(title);
  }

  async fillAuthor(author: string): Promise<void> {
    await this.authorInput.fill(author);
  }

  async fillIsbn(isbn: string): Promise<void> {
    await this.isbnInput.fill(isbn);
  }

  async fillPrice(price: string): Promise<void> {
    await this.priceInput.fill(price);
  }

  async fillStockQuantity(stock: string): Promise<void> {
    await this.stockQuantityInput.fill(stock);
  }

  async fillAddBookForm(bookData: BookData): Promise<void> {
    await this.fillTitle(bookData.title);
    await this.fillAuthor(bookData.author);
    await this.fillIsbn(bookData.isbn);
    await this.fillPrice(bookData.price);
    await this.fillStockQuantity(bookData.stockQuantity);
  }

  async clickSubmitBookButton(): Promise<void> {
    await this.submitBookButton.click();
  }

  async addBook(bookData: BookData): Promise<void> {
    await this.fillAddBookForm(bookData);
    await this.clickSubmitBookButton();
  }

  // Actions - Book List
  async getBookRows(): Promise<Locator[]> {
    const count = await this.bookRows.count();
    const rows: Locator[] = [];
    for (let i = 0; i < count; i++) {
      rows.push(this.bookRows.nth(i));
    }
    return rows;
  }

  async findBookByTitle(title: string): Promise<Locator | null> {
    // Wait for book list to be visible
    await this.bookList.waitFor({ state: 'visible', timeout: 5000 });
    
    const rows = await this.getBookRows();
    console.log(`🔍 Looking for book: "${title}"`);
    console.log(`📚 Found ${rows.length} book rows`);
    
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      // Book title is an h4 heading within each book row
      const titleElement = row.locator(this.bookTitleElement);
      const titleText = await titleElement.textContent();
      console.log(`📖 Book ${i + 1}: "${titleText}"`);
      
      if (titleText === title) {
        console.log(`✅ Found matching book: "${titleText}"`);
        return row;
      }
    }
    
    console.log(`❌ Book "${title}" not found in ${rows.length} books`);
    return null;
  }

  async clickEditBookButton(bookTitle: string): Promise<void> {
    const bookRow = await this.findBookByTitle(bookTitle);
    if (bookRow) {
      // Edit button has data-testid="admin-edit-book-XX"
      await bookRow.locator(this.editBookButton).click();
    } else {
      throw new Error(`Book with title "${bookTitle}" not found`);
    }
  }

  async clickDeleteBookButton(bookTitle: string): Promise<void> {
    const bookRow = await this.findBookByTitle(bookTitle);
    if (bookRow) {
      // Delete button has data-testid="admin-delete-book-XX"
      await bookRow.locator(this.deleteBookButton).click();
    } else {
      throw new Error(`Book with title "${bookTitle}" not found`);
    }
  }

  // Actions - Edit Book (reuse same input locators as add form)
  async fillEditBookForm(bookData: Partial<BookData>): Promise<void> {
    if (bookData.title) await this.fillTitle(bookData.title);
    if (bookData.author) await this.fillAuthor(bookData.author);
    if (bookData.isbn) await this.fillIsbn(bookData.isbn);
    if (bookData.price) await this.fillPrice(bookData.price);
    if (bookData.stockQuantity) await this.fillStockQuantity(bookData.stockQuantity);
  }

  async clickUpdateBookButton(): Promise<void> {
    await this.updateBookButton.click();
  }

  async updateBook(bookTitle: string, updateData: Partial<BookData>): Promise<void> {
    await this.clickEditBookButton(bookTitle);
    await this.fillEditBookForm(updateData);
    await this.clickUpdateBookButton();
  }

  // Actions - Delete Book
  async deleteBook(bookTitle: string): Promise<void> {
    // Set up dialog handler BEFORE clicking the delete button
    this.page.on('dialog', async dialog => {
      console.log(`🚨 Native dialog message: ${dialog.message()}`);
      await dialog.accept(); // Click 'OK' on the native confirmation dialog
    });

    await this.clickDeleteBookButton(bookTitle);
    // No need to call clickConfirmDeleteButton() as the native dialog is handled by the event listener
  }

  // Actions - Toast Verification
  async verifyAddSuccessToast(): Promise<void> {
    // Wait a moment for the toast to appear after the action
    await this.page.waitForTimeout(1000);
    
    // Try multiple approaches to find the toast
    try {
      await this.successToast.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      // Fallback: look for any element containing the success message
      const fallbackToast = this.page.locator('text=Book added successfully').first();
      await fallbackToast.waitFor({ state: 'visible', timeout: 5000 });
    }
  }

  async verifyUpdateSuccessToast(): Promise<void> {
    // Wait a moment for the toast to appear after the action
    await this.page.waitForTimeout(1000);
    
    try {
      await this.updateSuccessToast.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      // Fallback: look for any element containing the success message
      const fallbackToast = this.page.locator('text=Book updated successfully').first();
      await fallbackToast.waitFor({ state: 'visible', timeout: 5000 });
    }
  }

  async verifyDeleteSuccessToast(): Promise<void> {
    // Wait a moment for the toast to appear after the action
    await this.page.waitForTimeout(1000);
    
    try {
      await this.deleteSuccessToast.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      // Fallback: look for any element containing the success message
      const fallbackToast = this.page.locator('text=Book deleted successfully').first();
      await fallbackToast.waitFor({ state: 'visible', timeout: 5000 });
    }
  }

  // Actions - Book Verification
  async verifyBookExists(bookTitle: string): Promise<void> {
    await this.getBookByTitleLocator(bookTitle).waitFor({ state: 'visible', timeout: 5000 });
  }

  async verifyBookNotExists(bookTitle: string): Promise<void> {
    await this.getBookByTitleLocator(bookTitle).waitFor({ state: 'hidden', timeout: 5000 });
  }

  async verifyBookDetails(bookTitle: string, author: string, isbn: string): Promise<void> {
    // Find the specific book by title and verify its details within that book card
    const bookCard = this.getBookCardLocator(bookTitle);
    await bookCard.locator(this.getAuthorTextLocator(author)).waitFor({ state: 'visible', timeout: 5000 });
    await bookCard.locator(this.getIsbnTextLocator(isbn)).waitFor({ state: 'visible', timeout: 5000 });
  }

}
