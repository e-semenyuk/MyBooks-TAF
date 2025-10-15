import { test as base } from '@playwright/test';
import { cfg } from '../config';
import { RestClient } from '../clients/restClient';

export const test = base.extend<{ api: RestClient }>({
  api: async ({ request }, use) => {
    await use(new RestClient(request, cfg.API_URL));
  },
});


