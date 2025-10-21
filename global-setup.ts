import { chromium } from '@playwright/test';
import { cfg } from './core/config';

export default async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(cfg.BASE_URL);
  // Attempt SPA login, fall back to mock simple form if SPA not present
  try {
    await page.getByTestId('nav-login-button').click({ timeout: 3000 });
    await page.getByTestId('login-email-input').fill(cfg.EMAIL_USER);
    await page.getByTestId('login-password-input').fill(cfg.EMAIL_PASS);
    await page.getByTestId('login-submit-button').click();
  } catch {
    await page.goto(cfg.BASE_URL + '/login');
    await page.getByTestId('email').fill(cfg.EMAIL_USER);
    await page.getByTestId('password').fill(cfg.EMAIL_PASS);
    await page.getByTestId('login').click();
  }
  await ctx.storageState({ path: `storage-state/user.${process.env.NODE_ENV}.json` });
  await browser.close();
};

