import assert from "node:assert/strict";
import { isAuthorizedAdmin } from "../../app/features/auth/auth.server.ts";

console.log("Running Clerk Authorization & Allowlist unit tests...\n");

// 1. Unauthenticated users (null / undefined userId)
{
  console.log("1. Testing unauthenticated user denial...");
  assert.equal(isAuthorizedAdmin(null, "user_admin_123"), false);
  assert.equal(isAuthorizedAdmin(undefined, "user_admin_123"), false);
  assert.equal(isAuthorizedAdmin("", "user_admin_123"), false);
  console.log("   ✓ Unauthenticated users correctly rejected.");
}

// 2. Unconfigured admin allowlist
{
  console.log("2. Testing unconfigured allowlist denial...");
  assert.equal(isAuthorizedAdmin("user_attacker_999", null), false);
  assert.equal(isAuthorizedAdmin("user_attacker_999", undefined), false);
  assert.equal(isAuthorizedAdmin("user_attacker_999", ""), false);
  console.log("   ✓ Empty admin allowlist correctly rejects all users.");
}

// 3. Authenticated but unauthorized users
{
  console.log("3. Testing authenticated non-admin user denial...");
  assert.equal(isAuthorizedAdmin("user_regular_customer_456", "user_admin_123"), false);
  assert.equal(isAuthorizedAdmin("user_malicious_user_789", "user_admin_123"), false);
  console.log("   ✓ Authenticated non-admin users correctly receive false.");
}

// 4. Explicitly authorized administrator
{
  console.log("4. Testing authorized admin grant...");
  assert.equal(isAuthorizedAdmin("user_admin_123", "user_admin_123"), true);
  // Trimming test
  assert.equal(isAuthorizedAdmin("  user_admin_123  ", "user_admin_123"), true);
  console.log("   ✓ Designated administrator successfully authorized.");
}

console.log("\n✓ All Clerk Authorization unit tests passed successfully!");
