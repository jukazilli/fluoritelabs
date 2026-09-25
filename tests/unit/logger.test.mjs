import assert from "node:assert/strict";
import { sanitizeLeadPayload, logger } from "../../app/utils/logger.server.ts";

console.log("Running Logger & Observability unit tests...\n");

// 1. PII Sanitization Tests
{
  console.log("1. Validating Lead PII sanitization...");

  const rawLead = {
    id: "lead-abc-123",
    name: "Juliano Pedroso",
    email: "juliano@example.com",
    phone: "+55 11 98765-4321",
    message: "Gostaria de solicitar uma proposta para redesign completo de marca e web app.",
    category: "design_system",
  };

  const sanitized = sanitizeLeadPayload(rawLead);

  // Assert NO PII leaked into sanitized object
  assert.equal("email" in sanitized, false, "Sanitized metadata must not contain email");
  assert.equal("name" in sanitized, false, "Sanitized metadata must not contain name");
  assert.equal("phone" in sanitized, false, "Sanitized metadata must not contain phone");
  assert.equal("message" in sanitized, false, "Sanitized metadata must not contain raw message");

  // Assert essential debugging flags are preserved
  assert.equal(sanitized.leadId, "lead-abc-123");
  assert.equal(sanitized.category, "design_system");
  assert.equal(sanitized.hasName, true);
  assert.equal(sanitized.hasEmail, true);
  assert.equal(sanitized.hasPhone, true);
  assert.equal(
    sanitized.messageLength,
    "Gostaria de solicitar uma proposta para redesign completo de marca e web app.".length,
  );

  console.log("   ✓ PII strictly stripped and safe metadata retained.");
}

// 2. Structured JSON Log Formatting Tests
{
  console.log("2. Validating structured JSON logging output...");

  const captured = [];
  const originalError = console.error;
  const originalInfo = console.info;

  console.error = (msg) => captured.push(JSON.parse(msg));
  console.info = (msg) => captured.push(JSON.parse(msg));

  try {
    logger.info("Test server event", { requestId: "req-101", durationMs: 42 });
    logger.error(
      "Database query failed",
      { requestId: "req-102" },
      new Error("Connection timed out"),
    );

    assert.equal(captured.length, 2);

    // Info entry checks
    const infoEntry = captured[0];
    assert.equal(infoEntry.level, "info");
    assert.equal(infoEntry.message, "Test server event");
    assert.equal(infoEntry.context.requestId, "req-101");
    assert.equal(infoEntry.context.durationMs, 42);
    assert.ok(infoEntry.timestamp);

    // Error entry checks
    const errorEntry = captured[1];
    assert.equal(errorEntry.level, "error");
    assert.equal(errorEntry.message, "Database query failed");
    assert.equal(errorEntry.context.requestId, "req-102");
    assert.equal(errorEntry.error.name, "Error");
    assert.equal(errorEntry.error.message, "Connection timed out");
  } finally {
    console.error = originalError;
    console.info = originalInfo;
  }

  console.log("   ✓ Structured log output verified.");
}

// 3. Lead Persistence Failure Helper Test
{
  console.log("3. Validating lead persistence failure logger...");

  const captured = [];
  const originalError = console.error;
  console.error = (msg) => captured.push(JSON.parse(msg));

  try {
    logger.logLeadPersistenceFailure(
      {
        id: "lead-fail-456",
        name: "Confidential Client",
        email: "secret@company.org",
        phone: "+55 41 99999-0000",
        message: "Segredo comercial ultra sigiloso",
        category: "strategy",
      },
      new Error("Neon connection pool exhausted"),
      "req-fail-789",
    );

    assert.equal(captured.length, 1);
    const failureEntry = captured[0];

    assert.equal(failureEntry.level, "error");
    assert.equal(failureEntry.message, "Failed to persist lead record");
    assert.equal(failureEntry.context.requestId, "req-fail-789");
    assert.equal(failureEntry.context.leadId, "lead-fail-456");
    assert.equal(failureEntry.context.category, "strategy");
    assert.equal(failureEntry.context.hasEmail, true);
    assert.equal("secret@company.org" in failureEntry.context, false);
    assert.equal(
      JSON.stringify(failureEntry).includes("secret@company.org"),
      false,
      "Log must not contain email string",
    );
    assert.equal(
      JSON.stringify(failureEntry).includes("Segredo comercial"),
      false,
      "Log must not contain secret message",
    );
    assert.equal(failureEntry.error.message, "Neon connection pool exhausted");
  } finally {
    console.error = originalError;
  }

  console.log("   ✓ Lead persistence failure telemetry verified with privacy protection.");
}

console.log("\n✓ All Logger & Observability unit tests passed successfully!\n");
