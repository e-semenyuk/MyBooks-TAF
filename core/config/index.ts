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

// Per-env code overrides (timeouts, toggles, etc.) using ESM imports
import localCfg from './env/local';
import devCfg from './env/dev';
import qaCfg from './env/qa';
import prodCfg from './env/prod';

const perEnvMap: Record<typeof env.NODE_ENV, unknown> = {
  local: localCfg,
  dev: devCfg,
  qa: qaCfg,
  prod: prodCfg,
};

type PerEnvCfg = { timeouts?: Record<string, number>; toggles?: Record<string, unknown> };
const perEnv = (perEnvMap[env.NODE_ENV] as PerEnvCfg) ?? {} as PerEnvCfg;

export const cfg = {
  ...env,
  timeouts: { action: 10_000, nav: 20_000, ...perEnv.timeouts },
  toggles: { useHarMocks: false, ...perEnv.toggles },
} as const;
export type Cfg = typeof cfg;

