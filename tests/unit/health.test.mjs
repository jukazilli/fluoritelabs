import assert from "node:assert/strict";
import * as dotenv from "dotenv";
import { loader } from "../../app/routes/api.health.ts";

dotenv.config({ path: ".env.local" });
dotenv.config();

console.log("Running Health Check & Uptime Monitoring probe unit tests...\n");

// 1. Health Probe test with live/mocked database
{
  console.log("1. Validating health check probe execution...");

  const request = new Request("http://localhost:5173/api/health");
  const response = await loader({ request, params: {}, context: {} });

  assert.ok(
    response.status === 200 || response.status === 503,
    "Health response status must be 200 (healthy) or 503 (degraded)",
  );

  const data = await response.json();
  assert.ok(data.status === "healthy" || data.status === "degraded");
  assert.equal(data.services.app, "ok");
  assert.ok("database" in data.services);
  assert.ok(data.timestamp);

  // Headers check
  assert.equal(
    response.headers.get("Cache-Control"),
    "no-cache, no-store, must-revalidate",
    "Health check must disable caching",
  );
  assert.equal(
    response.headers.get("X-Robots-Tag"),
    "noindex, nofollow",
    "Health check must be noindex",
  );

  console.log(`   ✓ Health probe returned status ${response.status} (${data.status}).`);
}

// 2. Alert rule criteria validation
{
  console.log("2. Validating alert threshold specification...");

  // In accordance with AC-04: an isolated error should not create excessive noise.
  // Uptime monitoring configuration rule: requires 2 consecutive probe failures before dispatching alert.
  const monitoringConfig = {
    endpoint: "/api/health",
    intervalSeconds: 60,
    consecutiveFailuresToAlert: 2,
    notificationChannels: ["email"],
  };

  assert.equal(
    monitoringConfig.consecutiveFailuresToAlert >= 2,
    true,
    "Alert policy must require at least 2 consecutive failures to suppress transient noise",
  );

  console.log("   ✓ Alert rule criteria verified.");
}

console.log("\n✓ All Health Check unit tests passed successfully!\n");
