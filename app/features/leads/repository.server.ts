import { eq } from "drizzle-orm";
import { getDb } from "../../data/db.server.ts";
import { leads, type Lead, type NewLead } from "../../data/schema.ts";
import type { CreateLeadInput } from "./schema.ts";

export class LeadPersistenceError extends Error {
  public readonly cause?: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "LeadPersistenceError";
    this.cause = cause;
  }
}

/**
 * Generates an URL-safe unique ID for leads.
 */
function generateLeadId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `lead_${timestamp}_${random}`;
}

/**
 * Creates and persists a new lead record in Neon PostgreSQL.
 * Spec: LEAD-004 & ENG-014.
 */
export async function createLead(input: CreateLeadInput, databaseUrl?: string): Promise<Lead> {
  const dbUrl = databaseUrl || process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new LeadPersistenceError("DATABASE_URL is not configured on server.");
  }

  try {
    const db = getDb(dbUrl);
    const leadId = generateLeadId();

    const utmMetadata = {
      utmSource: input.utmSource || null,
      utmMedium: input.utmMedium || null,
      utmCampaign: input.utmCampaign || null,
      utmTerm: input.utmTerm || null,
      utmContent: input.utmContent || null,
    };

    const newRecord: NewLead = {
      id: leadId,
      firstName: input.firstName.trim(),
      need: input.need,
      budget: input.budget,
      status: "NEW",
      sourcePath: input.sourcePath || "/",
      referrer: input.referrer || null,
      metadata: utmMetadata,
    };

    const [inserted] = await db.insert(leads).values(newRecord).returning();
    if (!inserted) {
      throw new LeadPersistenceError("Database returned empty result upon lead insertion.");
    }

    return inserted;
  } catch (error) {
    if (error instanceof LeadPersistenceError) {
      throw error;
    }
    throw new LeadPersistenceError("Failed to persist lead record to database.", error);
  }
}

/**
 * Records the timestamp when user was redirected to WhatsApp.
 * Spec: LEAD-005.
 */
export async function markWhatsappHandoff(leadId: string, databaseUrl?: string): Promise<void> {
  const dbUrl = databaseUrl || process.env.DATABASE_URL;
  if (!dbUrl) return;

  try {
    const db = getDb(dbUrl);
    await db
      .update(leads)
      .set({
        whatsappHandoffAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(leads.id, leadId));
  } catch (error) {
    // Non-blocking telemetry update
    console.error("[Leads Repository] Failed to mark WhatsApp handoff timestamp:", error);
  }
}
