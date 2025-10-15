import { chromium } from '@playwright/test';
import { cfg } from './core/config';

export default async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(cfg.BASE_URL);
  // do email+password login once and save state:
  await page.getByTestId('email').fill(cfg.EMAIL_USER);
  await page.getByTestId('password').fill(cfg.EMAIL_PASS);
  await page.getByTestId('login').click();
  await page.waitForURL('**/home');
  await ctx.storageState({ path: `storage-state/user.${process.env.NODE_ENV}.json` });
  await browser.close();
};

