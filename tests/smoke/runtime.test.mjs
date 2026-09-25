import assert from "node:assert/strict";
import * as dotenv from "dotenv";
import worker from "../../build/server/index.js";

dotenv.config({ path: ".env.local" });
dotenv.config();

async function runSmokeTest() {
  console.log("Running Cloudflare Worker runtime smoke test...");

  const request = new Request("http://localhost:8787/");
  const env = {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "sk_test_placeholder_smoke_test_key_12345",
    CLERK_PUBLISHABLE_KEY:
      process.env.VITE_CLERK_PUBLISHABLE_KEY ||
      process.env.CLERK_PUBLISHABLE_KEY ||
      "pk_test_bWlnaHR5LW1vbGUtNTQuY2xlcmsuYWNjb3VudHMuZGV2JA",
    DATABASE_URL: process.env.DATABASE_URL || "",
  };
  const ctx = {
    waitUntil() {},
    passThroughOnException() {},
  };

  const response = await worker.fetch(request, env, ctx);

  assert.equal(response.status, 200, "Worker response status must be 200");
  assert.match(
    response.headers.get("content-type") || "",
    /text\/html/,
    "Content-Type must be text/html",
  );

  const html = await response.text();
  assert.ok(
    html.includes("Fluorite Labs") || html.includes("FLUORITE"),
    "HTML must include 'Fluorite Labs' or 'FLUORITE'",
  );
  assert.ok(
    html.includes("hero-clean.webp"),
    "HTML must include hero graphic asset 'hero-clean.webp'",
  );

  console.log("✓ Cloudflare Worker runtime smoke test passed successfully!");
}

runSmokeTest().catch((err) => {
  console.error("✗ Smoke test failed:", err);
  process.exit(1);
});
