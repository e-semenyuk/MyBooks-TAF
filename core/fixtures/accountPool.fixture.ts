import { test as base } from '@playwright/test';
import { randomUUID } from 'crypto';

type Lease = { email: string; password: string; leaseId: string; expiresAt: number };

export const test = base.extend<{
  account: Lease;
}>({
  account: async (_args, use) => {
    const leaseId = randomUUID();
    const acct = await checkoutAccount({ leaseId, ttlSec: 900 });
    try {
      await use(acct);
    } finally {
      await releaseAccount(leaseId).catch(() => {});
    }
  },
});

async function checkoutAccount({ leaseId, ttlSec }: { leaseId: string; ttlSec: number }): Promise<Lease> {
  const email = process.env.EMAIL_USER!;
  const password = process.env.EMAIL_PASS!;
  return { email, password, leaseId, expiresAt: Date.now() + ttlSec * 1000 };
}

async function releaseAccount(leaseId: string) {
  void leaseId;
  // no-op stub; replace with DB/file-based lease release
}


