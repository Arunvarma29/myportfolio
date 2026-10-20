import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing from .env.local");
}

export default {
  "database-url-var": process.env.DATABASE_URL,
  "migrations-dir": "db/migrations",
  "single-transaction": true,
  "check-order": true,
};