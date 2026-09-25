import assert from "node:assert/strict";
import { clientEnvSchema } from "../../app/config/env.client.ts";
import { validateServerEnv, EnvValidationError } from "../../app/config/env.server.ts";

console.log("Running Environment & Secrets Schema unit tests...\n");

// 1. Client Environment Tests
{
  console.log("1. Validating Client Environment Schema...");

  // Default values
  const defaultClient = clientEnvSchema.parse({});
  assert.equal(
    defaultClient.VITE_SITE_URL,
    "http://localhost:5173",
    "Should provide default site url",
  );

  // Custom valid URL
  const validClient = clientEnvSchema.parse({
    VITE_SITE_URL: "https://fluoritelabs.com",
    VITE_CLERK_PUBLISHABLE_KEY: "pk_test_123",
  });
  assert.equal(validClient.VITE_SITE_URL, "https://fluoritelabs.com");
  assert.equal(validClient.VITE_CLERK_PUBLISHABLE_KEY, "pk_test_123");

  // Invalid URL
  const invalidUrlResult = clientEnvSchema.safeParse({
    VITE_SITE_URL: "not-a-valid-url",
  });
  assert.equal(invalidUrlResult.success, false, "Should reject invalid URL");

  console.log("   ✓ Client schema validations passed.");
}

// 2. Server Environment Tests (Development / Baseline)
{
  console.log("2. Validating Server Environment Schema (Baseline)...");

  const baseline = validateServerEnv({});
  assert.equal(baseline.NODE_ENV, "development");

  const customDev = validateServerEnv({
    NODE_ENV: "development",
    DATABASE_URL:
      "postgresql://user:pass@ep-cool-123.sa-east-1.aws.neon.tech/fluorite?sslmode=require",
    CLERK_SECRET_KEY: "sk_test_mock",
    ADMIN_CLERK_USER_ID: "user_2mock",
  });
  assert.equal(customDev.NODE_ENV, "development");
  assert.ok(customDev.DATABASE_URL?.startsWith("postgresql://"));

  // Malformed database URL
  assert.throws(
    () =>
      validateServerEnv({
        DATABASE_URL: "mysql://invalid-protocol",
      }),
    (err) => {
      assert.ok(err instanceof EnvValidationError);
      assert.ok(err.issues.some((i) => i.includes("DATABASE_URL")));
      return true;
    },
    "Should reject non-postgres DATABASE_URL",
  );

  console.log("   ✓ Server baseline validations passed.");
}

// 3. Strict Production Mode Tests
{
  console.log("3. Validating Strict Production Mode Requirements...");

  // Missing required production secrets
  assert.throws(
    () =>
      validateServerEnv(
        {
          NODE_ENV: "production",
        },
        { strict: true },
      ),
    (err) => {
      assert.ok(err instanceof EnvValidationError);
      assert.ok(err.issues.some((i) => i.includes("DATABASE_URL")));
      assert.ok(err.issues.some((i) => i.includes("CLERK_SECRET_KEY")));
      assert.ok(err.issues.some((i) => i.includes("ADMIN_CLERK_USER_ID")));
      return true;
    },
    "Should reject production environment without required secrets",
  );

  // Complete valid production config
  const validProd = validateServerEnv(
    {
      NODE_ENV: "production",
      SITE_URL: "https://fluoritelabs.com",
      DATABASE_URL: "postgres://prod_user:mock_secret@neon.tech/fluorite",
      CLERK_SECRET_KEY: "sk_live_mock",
      ADMIN_CLERK_USER_ID: "user_admin_live",
    },
    { strict: true },
  );
  assert.equal(validProd.NODE_ENV, "production");
  assert.equal(validProd.ADMIN_CLERK_USER_ID, "user_admin_live");

  console.log("   ✓ Strict production validation passed.");
}

// 4. Secret Safety Boundary Test
{
  console.log("4. Verifying Client/Server Secret Boundary Isolation...");

  // Ensure server secrets cannot be queried as recognized keys on clientEnvSchema
  const clientKeys = Object.keys(clientEnvSchema.shape);
  assert.ok(!clientKeys.includes("CLERK_SECRET_KEY"));
  assert.ok(!clientKeys.includes("DATABASE_URL"));
  assert.ok(!clientKeys.includes("ADMIN_CLERK_USER_ID"));

  console.log("   ✓ Secret isolation boundary verified.");
}

console.log("\n✓ All Environment & Secrets Schema unit tests passed successfully!");
