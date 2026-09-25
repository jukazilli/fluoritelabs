import assert from "node:assert/strict";
import worker from "../../build/server/index.js";

async function runSmokeTest() {
  console.log("Running Cloudflare Worker runtime smoke test...");

  const request = new Request("http://localhost:8787/");
  const env = {};
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
    html.includes("Fluorite Labs"),
    "HTML must include 'Fluorite Labs'",
  );
  assert.ok(
    html.includes("Fundação Técnica Inicializada"),
    "HTML must include 'Fundação Técnica Inicializada'",
  );

  console.log("✓ Cloudflare Worker runtime smoke test passed successfully!");
}

runSmokeTest().catch((err) => {
  console.error("✗ Smoke test failed:", err);
  process.exit(1);
});
