import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema.ts";

export type Database = NeonHttpDatabase<typeof schema>;

let cachedDb: Database | null = null;
let cachedUrl: string | null = null;

/**
 * Returns a typed Drizzle ORM instance using Neon HTTP serverless driver.
 * Supports connection pooling and reuse across serverless requests.
 */
export function getDb(databaseUrl: string): Database {
  if (!databaseUrl) {
    throw new Error(
      "Database connection error: DATABASE_URL is not configured or empty.",
    );
  }

  if (cachedDb && cachedUrl === databaseUrl) {
    return cachedDb;
  }

  const sql = neon(databaseUrl);
  cachedDb = drizzle(sql, { schema });
  cachedUrl = databaseUrl;

  return cachedDb;
}

export { schema };
