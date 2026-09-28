export const LEAD_STATUSES = ["NEW", "CONTACTED", "CONVERTED", "ARCHIVED"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: "Novo",
  CONTACTED: "Contatado",
  CONVERTED: "Convertido",
  ARCHIVED: "Arquivado",
};
