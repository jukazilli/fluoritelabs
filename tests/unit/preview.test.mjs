import assert from "node:assert/strict";
import fs from "node:fs";
import { isPreviewOrNonProduction, getRobotsHeaderValue } from "../../app/config/preview.ts";

console.log("Running Preview & Environment Isolation unit tests...\n");

// 1. URL & Hostname classification tests
{
  console.log("1. Validating preview/non-production detection...");

  assert.equal(
    isPreviewOrNonProduction("https://preview.fluoritelabs.com"),
    true,
    "preview.fluoritelabs.com must be identified as non-production",
  );

  assert.equal(
    isPreviewOrNonProduction("https://staging.fluoritelabs.com"),
    true,
    "staging.fluoritelabs.com must be identified as non-production",
  );

  assert.equal(
    isPreviewOrNonProduction("https://pr-12.fluoritelabs.workers.dev"),
    true,
    "*.workers.dev must be identified as non-production",
  );

  assert.equal(
    isPreviewOrNonProduction("http://localhost:5173"),
    true,
    "localhost must be identified as non-production",
  );

  assert.equal(
    isPreviewOrNonProduction("https://fluoritelabs.com", "production"),
    false,
    "fluoritelabs.com in production mode must be identified as production",
  );

  assert.equal(
    isPreviewOrNonProduction("https://fluoritelabs.com", "preview"),
    true,
    "Explicit preview NODE_ENV must force non-production even on apex domain",
  );

  console.log("   ✓ URL & environment classification passed.");
}

// 2. Wrangler configuration validation for isolated preview environment
{
  console.log("2. Validating Wrangler environment definitions for isolation...");

  const wranglerRaw = fs.readFileSync("wrangler.jsonc", "utf8");
  const cleanJson = wranglerRaw.replace(/,\s*([}\]])/g, "$1");
  const wranglerConfig = JSON.parse(cleanJson);

  assert.ok(wranglerConfig.env, "wrangler.jsonc must define environments");
  assert.ok(wranglerConfig.env.preview, "wrangler.jsonc must define a preview environment");
  assert.ok(wranglerConfig.env.production, "wrangler.jsonc must define a production environment");

  assert.equal(
    wranglerConfig.env.preview.name,
    "fluoritelabs-preview",
    "Preview worker must have an isolated name",
  );

  assert.equal(
    wranglerConfig.env.preview.vars.NODE_ENV,
    "preview",
    "Preview worker must run with NODE_ENV=preview",
  );

  assert.equal(
    wranglerConfig.env.preview.vars.VITE_SITE_URL,
    "https://preview.fluoritelabs.com",
    "Preview site URL must point to preview domain",
  );

  // Storage isolation
  const previewBucket = wranglerConfig.env.preview.r2_buckets?.[0]?.bucket_name;
  const prodBucket = wranglerConfig.env.production.r2_buckets?.[0]?.bucket_name;
  assert.notEqual(
    previewBucket,
    prodBucket,
    "Preview R2 bucket must be isolated from production bucket",
  );

  console.log("   ✓ Wrangler environment isolation validated.");
}

// 3. Data safety & noindex header simulation
{
  console.log("3. Validating noindex enforcement and data safety rules...");

  // Mock response wrapping
  const originalResponse = new Response("<html><head></head><body>Preview</body></html>", {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });

  const previewReqUrl = "https://preview.fluoritelabs.com/journal";
  const isNonProd = isPreviewOrNonProduction(previewReqUrl, "preview");

  assert.ok(isNonProd, "Must trigger non-production protections");

  const headers = new Headers(originalResponse.headers);
  if (isNonProd) {
    headers.set("X-Robots-Tag", getRobotsHeaderValue(isNonProd));
  }

  assert.equal(
    headers.get("X-Robots-Tag"),
    "noindex, nofollow, noarchive",
    "Non-production responses must carry strict X-Robots-Tag header",
  );

  console.log("   ✓ Noindex header enforcement verified.");
}

console.log("\n✓ All Preview & Environment Isolation unit tests passed successfully!\n");
