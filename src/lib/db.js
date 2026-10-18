import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Database Url is missing from .env.local");
}

const globalForPg = globalThis;

const pool =
  globalForPg.pgPool ??
  new Pool({
    connectionString,
    max: 10,
  });

  if(process.env.NODE_ENV!=="production"){
    globalForPg.pgPool=pool;
  }

  export default pool;