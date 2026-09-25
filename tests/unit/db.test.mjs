import assert from "node:assert/strict";
import * as dotenv from "dotenv";
import { getDb, schema } from "../../app/data/db.server.ts";

dotenv.config({ path: ".env.local" });
dotenv.config();

console.log("Running Drizzle Database & Schema unit tests...\n");

// 1. Schema Structure Tests
{
  console.log("1. Validating schema definitions...");

  assert.ok(schema.leads, "Schema must export leads table");
  assert.ok(schema.articles, "Schema must export articles table");
  assert.ok(schema.categories, "Schema must export categories table");

  // Verify leads columns
  const leadCols = Object.keys(schema.leads);
  assert.ok(leadCols.includes("id"));
  assert.ok(leadCols.includes("firstName"));
  assert.ok(leadCols.includes("need"));
  assert.ok(leadCols.includes("budget"));
  assert.ok(leadCols.includes("status"));

  // Verify articles columns
  const articleCols = Object.keys(schema.articles);
  assert.ok(articleCols.includes("id"));
  assert.ok(articleCols.includes("slug"));
  assert.ok(articleCols.includes("title"));
  assert.ok(articleCols.includes("content"));
  assert.ok(articleCols.includes("status"));

  console.log("   ✓ Schema definition assertions passed.");
}

// 2. Database Connection Error Handling
{
  console.log("2. Validating connection guard...");

  assert.throws(
    () => getDb(""),
    /DATABASE_URL is not configured or empty/,
    "Should throw when database URL is empty",
  );

  console.log("   ✓ Connection guard passed.");
}

// 3. Database Connectivity & Query Test
{
  console.log("3. Validating query execution against Neon PostgreSQL...");

  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    const db = getDb(databaseUrl);

    // Query categories table created by migration
    const result = await db.select().from(schema.categories);
    assert.ok(Array.isArray(result), "Query result should be an array");

    // Query leads table created by migration
    const leadsResult = await db.select().from(schema.leads);
    assert.ok(Array.isArray(leadsResult), "Leads query result should be an array");

    console.log(`   ✓ Successfully queried Neon database! Found ${result.length} categories and ${leadsResult.length} leads.`);
  } else {
    console.log("   ⚠ DATABASE_URL not set in environment, skipping live query.");
  }
}

console.log("\n✓ All Drizzle Database unit tests passed successfully!");
