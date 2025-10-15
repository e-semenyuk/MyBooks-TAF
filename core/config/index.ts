import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z.enum(['local','dev','qa','prod']).default('local'),
  BASE_URL: z.string().url(),
  API_URL: z.string().url(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
  DB_DSN: z.string().optional(), // read-only by default
  ACCOUNT_POOL_TABLE: z.string().default('test_account_leases'),
});

const env = EnvSchema.parse(process.env);

// Per-env code overrides (timeouts, toggles, etc.)
/* eslint-disable @typescript-eslint/no-var-requires */
const perEnv = require(`./env/${env.NODE_ENV}.js`)?.default ?? {};

export const cfg = {
  ...env,
  timeouts: { action: 10_000, nav: 20_000, ...perEnv.timeouts },
  toggles: { useHarMocks: false, ...perEnv.toggles },
} as const;
export type Cfg = typeof cfg;

