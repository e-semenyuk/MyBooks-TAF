import { defineConfig, devices } from '@playwright/test';
import { cfg } from './core/config';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  reporter: [['html'], ['junit', { outputFile: 'reports/junit.xml' }]],
  use: {
    baseURL: cfg.BASE_URL,
    testIdAttribute: 'data-testid',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: cfg.timeouts.action,
    navigationTimeout: cfg.timeouts.nav,
    ignoreHTTPSErrors: true,
  },
  expect: { timeout: 5_000 },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],
  grepInvert: cfg.toggles.useHarMocks ? undefined : /@mock/,
});

