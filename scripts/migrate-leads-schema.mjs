import * as dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";

dotenv.config({ path: ".env.local" });
dotenv.config();

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.log("No DATABASE_URL found. Skipping DDL update.");
  process.exit(0);
}

const sql = neon(dbUrl);

console.log("Applying idempotent schema updates to 'leads' table for LEAD-004...");

try {
  await sql`ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "source_path" varchar(500);`;
  await sql`ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "referrer" text;`;
  await sql`ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "metadata" jsonb;`;
  console.log("✓ Leads table updated successfully with source_path, referrer, and metadata!");
} catch (err) {
  console.error("Failed to alter table:", err);
  process.exit(1);
}
