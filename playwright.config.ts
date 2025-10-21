import { defineConfig, devices } from '@playwright/test';
import { cfg } from './core/config';

// Optional webServer support for starting the REAL app under test when provided.
// To use, set WEB_SERVER_CMD (e.g., "npm run start") and ensure cfg.BASE_URL points to it.
const webServer = cfg.toggles.useHarMocks
  ? {
      command: 'PORT=3100 node mock-server.mjs',
      url: 'http://localhost:3100',
      reuseExistingServer: true,
      timeout: 10_000,
    }
  : process.env.WEB_SERVER_CMD
  ? {
      command: process.env.WEB_SERVER_CMD,
      url: cfg.BASE_URL,
      reuseExistingServer: true,
      timeout: 60_000,
    }
  : undefined;

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  reporter: [['html'], ['junit', { outputFile: 'reports/junit.xml' }]],
  globalSetup: './global-setup.ts',
  webServer,
  use: {
    baseURL: cfg.toggles.useHarMocks ? 'http://localhost:3100' : cfg.BASE_URL,
    testIdAttribute: 'data-testid',
    storageState: `storage-state/user.${process.env.NODE_ENV}.json`,
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

