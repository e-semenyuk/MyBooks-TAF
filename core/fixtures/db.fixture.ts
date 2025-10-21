import { test as base } from '@playwright/test';

type Db = {
  read<T = unknown>(query: string, params?: unknown[]): Promise<T[]>;
};

async function createDb(): Promise<Db> {
  return {
    async read() {
      return [];
    },
  };
}

export const test = base.extend<{ db: Db }>({
  db: async (_args, use) => {
    const db = await createDb();
    await use(db);
  },
});


