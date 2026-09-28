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

console.log("Applying idempotent schema updates to 'articles' table for M5 Journal...");

try {
  await sql`ALTER TABLE "articles" ADD COLUMN IF NOT EXISTS "category_id" text;`;
  await sql`ALTER TABLE "articles" ADD COLUMN IF NOT EXISTS "category_name" text;`;
  console.log("✓ Articles table updated successfully with category_id and category_name!");
} catch (err) {
  console.error("Failed to alter table:", err);
  process.exit(1);
}
