import assert from "node:assert/strict";
import * as dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { createLeadSchema } from "../../app/features/leads/schema.ts";
import { formatWhatsappMessage, buildWhatsappUrl } from "../../app/features/leads/whatsapp.ts";
import { SlidingWindowRateLimiter } from "../../app/features/leads/rate-limiter.server.ts";
import {
  sanitizeAnalyticsProperties,
  CANONICAL_EVENTS,
} from "../../app/features/analytics/events.ts";
import {
  createLead,
  markWhatsappHandoff,
  LeadPersistenceError,
} from "../../app/features/leads/repository.server.ts";
import { getDb } from "../../app/data/db.server.ts";
import { leads } from "../../app/data/schema.ts";

dotenv.config({ path: ".env.local" });
dotenv.config();

console.log("Running Marco M3 — Conversão & Leads Test Suite (LEAD-001 to LEAD-006)...\n");

// ============================================================================
// 1. LEAD-001 / LEAD-003: Validation & Anti-Abuse Schemas
// ============================================================================
{
  console.log("1. Validating Lead creation payload schema (LEAD-001 / LEAD-003)...");

  // A. Valid complete payload
  const validPayload = {
    firstName: "Mariana",
    need: "Site institucional",
    budget: "R$ 3.000–5.000",
    sourcePath: "/servicos/site-institucional",
    referrer: "https://google.com",
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "spring_launch",
  };
  const resultValid = createLeadSchema.safeParse(validPayload);
  assert.ok(resultValid.success, "Valid payload must pass schema validation");
  if (resultValid.success) {
    assert.equal(resultValid.data.firstName, "Mariana");
    assert.equal(resultValid.data.need, "Site institucional");
    assert.equal(resultValid.data.budget, "R$ 3.000–5.000");
  }

  // B. First name too short (< 2 chars)
  const shortNamePayload = {
    firstName: "M",
    need: "Landing page",
    budget: "R$ 1.500–3.000",
  };
  const resultShort = createLeadSchema.safeParse(shortNamePayload);
  assert.equal(resultShort.success, false, "Name < 2 characters must be rejected");

  // C. Invalid need enum
  const invalidNeedPayload = {
    firstName: "Lucas",
    need: "Aplicativo móvel não suportado",
    budget: "até R$ 1.500",
  };
  const resultNeed = createLeadSchema.safeParse(invalidNeedPayload);
  assert.equal(resultNeed.success, false, "Invalid need must be rejected");

  // D. Invalid budget enum
  const invalidBudgetPayload = {
    firstName: "Lucas",
    need: "SEO",
    budget: "R$ 50 mil",
  };
  const resultBudget = createLeadSchema.safeParse(invalidBudgetPayload);
  assert.equal(resultBudget.success, false, "Invalid budget must be rejected");

  // E. Unauthorized extra field rejection (.strict())
  const extraFieldPayload = {
    firstName: "Lucas",
    need: "Landing page",
    budget: "até R$ 1.500",
    maliciousInjectedField: "DROP TABLE users;",
  };
  const resultExtra = createLeadSchema.safeParse(extraFieldPayload);
  assert.equal(
    resultExtra.success,
    false,
    "Extra unknown fields must be rejected by strict schema",
  );

  // F. Honeypot check
  const honeypotPayload = {
    firstName: "BotUser",
    need: "SEO",
    budget: "ainda não defini",
    website: "https://spam-link.ru",
  };
  const resultHoneypot = createLeadSchema.safeParse(honeypotPayload);
  assert.equal(resultHoneypot.success, false, "Honeypot with content must fail schema");

  console.log("   ✓ All schema validation and anti-spam constraints passed.");
}

// ============================================================================
// 2. LEAD-005: WhatsApp Message Formatting and URL Generation
// ============================================================================
{
  console.log("2. Validating WhatsApp handoff generation (LEAD-005)...");

  const message = formatWhatsappMessage({
    firstName: "Gabriel",
    need: "Site institucional",
    budget: "acima de R$ 5.000",
  });

  assert.ok(message.includes("Olá, sou Gabriel."), "Message must contain standard greeting");
  assert.ok(
    message.includes("Tenho interesse em Site institucional."),
    "Message must specify need",
  );
  assert.ok(
    message.includes("Faixa de investimento: acima de R$ 5.000."),
    "Message must specify budget",
  );

  const url = buildWhatsappUrl({
    firstName: "Gabriel",
    need: "Site institucional",
    budget: "acima de R$ 5.000",
    whatsappNumber: "55 (11) 98888-7777",
  });

  assert.ok(url.startsWith("https://wa.me/5511988887777?text="), "URL must sanitize phone number");
  assert.ok(url.includes("Gabriel"), "URL must contain encoded name");
  assert.ok(url.includes(encodeURIComponent("Site institucional")), "URL must encode parameters");

  console.log("   ✓ WhatsApp handoff message and URL generation verified.");
}

// ============================================================================
// 3. LEAD-003: Rate Limiting Guard
// ============================================================================
{
  console.log("3. Validating Rate Limiter behavior (LEAD-003)...");

  const limiter = new SlidingWindowRateLimiter({
    maxRequests: 3,
    windowSeconds: 10,
  });

  const ip = "192.168.1.100";
  const now = Date.now();

  const r1 = limiter.check(ip, now);
  assert.equal(r1.allowed, true);
  assert.equal(r1.remaining, 2);

  const r2 = limiter.check(ip, now + 100);
  assert.equal(r2.allowed, true);
  assert.equal(r2.remaining, 1);

  const r3 = limiter.check(ip, now + 200);
  assert.equal(r3.allowed, true);
  assert.equal(r3.remaining, 0);

  // 4th request from same IP within window -> Rejected
  const r4 = limiter.check(ip, now + 300);
  assert.equal(r4.allowed, false, "4th request must be blocked by rate limit");
  assert.equal(r4.remaining, 0);

  // Different IP is allowed
  const rOther = limiter.check("10.0.0.1", now + 400);
  assert.equal(rOther.allowed, true, "Different IP must not be affected");

  // After window expiration -> Allowed again
  const rAfterWindow = limiter.check(ip, now + 11000);
  assert.equal(rAfterWindow.allowed, true, "Request after window must be allowed");

  console.log("   ✓ Rate limiter sliding window and IP isolation verified.");
}

// ============================================================================
// 4. Privacy & Analytics Guard (ENG-014 / Doc 05)
// ============================================================================
{
  console.log("4. Validating Analytics PII protection guard (ENG-014)...");

  const unsafeProps = {
    firstName: "Juliano",
    name: "Juliano Pedroso",
    email: "juliano@example.com",
    phone: "11999999999",
    need_category: "Site institucional",
    investment_tier: "R$ 3.000–5.000",
    page_path: "/servicos/site-institucional",
  };

  const sanitized = sanitizeAnalyticsProperties(unsafeProps);

  assert.equal(sanitized.firstName, undefined, "firstName must be stripped from analytics");
  assert.equal(sanitized.name, undefined, "name must be stripped from analytics");
  assert.equal(sanitized.email, undefined, "email must be stripped from analytics");
  assert.equal(sanitized.phone, undefined, "phone must be stripped from analytics");
  assert.equal(sanitized.need_category, "Site institucional", "Non-PII context preserved");
  assert.equal(sanitized.investment_tier, "R$ 3.000–5.000", "Non-PII context preserved");

  assert.ok(CANONICAL_EVENTS.START_BRIEFING, "CANONICAL_EVENTS.START_BRIEFING exists");
  assert.ok(CANONICAL_EVENTS.LEAD_CREATED, "CANONICAL_EVENTS.LEAD_CREATED exists");
  assert.ok(CANONICAL_EVENTS.WHATSAPP_OPEN, "CANONICAL_EVENTS.WHATSAPP_OPEN exists");

  console.log("   ✓ Analytics PII protection guard verified.");
}

// ============================================================================
// 5. LEAD-004 & LEAD-006: Database Persistence & Safe Degradation
// ============================================================================
{
  console.log("5. Validating Lead Database Persistence & Safe Degradation (LEAD-004, LEAD-006)...");

  const dbUrl = process.env.DATABASE_URL;

  if (dbUrl) {
    // A. Successful live persistence
    const testInput = {
      firstName: "TestLeadM3",
      need: "Landing page",
      budget: "R$ 1.500–3.000",
      sourcePath: "/servicos/landing-page",
      referrer: "https://fluoritelabs.com",
      utmSource: "test_suite",
      utmMedium: "unit",
      utmCampaign: "marco_m3",
    };

    const created = await createLead(testInput, dbUrl);
    assert.ok(created, "Lead record must be returned");
    assert.ok(created.id.startsWith("lead_"), "Lead ID must start with lead_ prefix");
    assert.equal(created.firstName, "TestLeadM3");
    assert.equal(created.need, "Landing page");
    assert.equal(created.budget, "R$ 1.500–3.000");
    assert.equal(created.status, "NEW");
    assert.equal(created.sourcePath, "/servicos/landing-page");
    assert.equal(created.referrer, "https://fluoritelabs.com");

    // Test handoff mark
    await markWhatsappHandoff(created.id, dbUrl);

    // Verify handoff updated
    const db = getDb(dbUrl);
    const [retrieved] = await db.select().from(leads).where(eq(leads.id, created.id)).limit(1);
    assert.ok(retrieved.whatsappHandoffAt instanceof Date, "whatsappHandoffAt must be recorded");

    // Cleanup test record
    await db.delete(leads).where(eq(leads.id, created.id));
    console.log("   ✓ Live Neon PostgreSQL insertion, handoff timestamp, and cleanup validated.");
  } else {
    console.log("   ⚠️ DATABASE_URL not present, skipping live query.");
  }

  // B. Safe Degradation on Database failure (LEAD-006)
  const invalidDbUrl = "postgresql://mockuser:mockpass@localhost:54321/mockdb";
  try {
    await createLead(
      {
        firstName: "DegradationTest",
        need: "SEO",
        budget: "ainda não defini",
        sourcePath: "/",
      },
      invalidDbUrl,
    );
    assert.fail("Should have thrown LeadPersistenceError on unavailable DB");
  } catch (err) {
    assert.ok(err instanceof LeadPersistenceError, "Must throw structured LeadPersistenceError");
    console.log("   ✓ Safe Degradation error structured handling verified.");
  }
}

console.log("\n✓ All Marco M3 (LEAD-001 to LEAD-006) tests passed successfully!");
