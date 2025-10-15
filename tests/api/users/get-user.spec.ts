import { test, expect } from '../../../core/fixtures/apiClient.fixture';

test('@api get user by id returns schema-valid payload', async ({ api }) => {
  const user = await api.getUser('123');
  expect(user).toHaveProperty('id', '123');
});


