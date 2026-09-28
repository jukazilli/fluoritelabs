import { desc, eq } from "drizzle-orm";
import { getDb } from "../../data/db.server.ts";
import { leads, type Lead } from "../../data/schema.ts";

import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus } from "./types.ts";
export { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus };

/**
 * Retrieves all leads for the authorized Admin dashboard.
 * Spec: ADM-002.
 */
export async function getAllLeadsAdmin(databaseUrl?: string): Promise<Lead[]> {
  const dbUrl = databaseUrl || process.env.DATABASE_URL;
  if (!dbUrl) return [];

  try {
    const db = getDb(dbUrl);
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  } catch (error) {
    console.error("[Leads Admin] Error fetching leads:", error);
    return [];
  }
}

/**
 * Updates a lead status (Novo, Contatado, Convertido, Arquivado).
 * Spec: ADM-003.
 */
export async function updateLeadStatus(
  leadId: string,
  newStatus: LeadStatus,
  databaseUrl?: string,
): Promise<Lead | null> {
  const dbUrl = databaseUrl || process.env.DATABASE_URL;
  if (!dbUrl) return null;

  try {
    const db = getDb(dbUrl);
    const [updated] = await db
      .update(leads)
      .set({
        status: newStatus,
        updatedAt: new Date(),
      })
      .where(eq(leads.id, leadId))
      .returning();

    return updated || null;
  } catch (error) {
    console.error(`[Leads Admin] Error updating status for lead '${leadId}':`, error);
    return null;
  }
}
