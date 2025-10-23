import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export class AdminDashboardPage extends BasePage {
  // Locators
  readonly adminDashboardElement: Locator = this.page.locator('text=Admin Dashboard');
  readonly booksTab: Locator = this.page.locator('text=Books').first();

}
