import { test as base } from '@playwright/test';
import path from 'path';

export const test = base.extend<{
  authStorageStatePath: string;
}>({
  authStorageStatePath: async ({}, use) => {
    const role = process.env.TEST_ROLE ?? 'user';
    const state = path.resolve(`storage-state/${role}.${process.env.NODE_ENV}.json`);
    await use(state);
  },
});


