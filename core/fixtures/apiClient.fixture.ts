import { test as base } from '@playwright/test';
export { expect } from '@playwright/test';
import { cfg } from '../config';
import { RestClient } from '../clients/restClient';

export const test = base.extend<{ api: RestClient }>({
  api: async ({ request }, use) => {
    const apiBase = cfg.toggles.useHarMocks ? 'http://localhost:3100/api' : cfg.API_URL;
    await use(new RestClient(request, apiBase));
  },
});


