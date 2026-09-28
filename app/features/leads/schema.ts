import { z } from "zod";

/**
 * Canonical options for the 3-step Microbriefing.
 * Spec: docs/04_Experiencia_UX_e_Arquitetura_de_Informacao.md (§15)
 */
export const NEED_OPTIONS = [
  "Site institucional",
  "Landing page",
  "Página de produto ou serviço",
  "SEO",
  "Melhorar meu site atual",
  "Ainda não sei",
] as const;

export type NeedOption = (typeof NEED_OPTIONS)[number];

export const INVESTMENT_OPTIONS = [
  "até R$ 1.500",
  "R$ 1.500–3.000",
  "R$ 3.000–5.000",
  "acima de R$ 5.000",
  "ainda não defini",
] as const;

export type InvestmentOption = (typeof INVESTMENT_OPTIONS)[number];

/**
 * Client-side / Session Microbriefing state schema.
 */
export const microbriefingStateSchema = z.object({
  step: z.number().int().min(1).max(3).default(1),
  firstName: z.string().trim().default(""),
  need: z.enum(NEED_OPTIONS).nullable().default(null),
  budget: z.enum(INVESTMENT_OPTIONS).nullable().default(null),
  sourcePath: z.string().default("/"),
  completed: z.boolean().default(false),
});

export type MicrobriefingState = z.infer<typeof microbriefingStateSchema>;

/**
 * Server-side creation payload schema.
 * Spec: LEAD-003, LEAD-004, ENG-014.
 *
 * Enforces strict typing, rejects unauthorized extra fields,
 * and includes a silent honeypot guard against automated bot abuse.
 */
export const createLeadSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "Por favor informe ao menos 2 caracteres para o primeiro nome")
      .max(100, "O primeiro nome deve ter no máximo 100 caracteres"),

    need: z.enum(NEED_OPTIONS, {
      message: "Selecione uma necessidade válida",
    }),

    budget: z.enum(INVESTMENT_OPTIONS, {
      message: "Selecione uma faixa de investimento válida",
    }),

    sourcePath: z.string().trim().max(300).default("/"),
    referrer: z.string().trim().max(500).optional().nullable(),
    utmSource: z.string().trim().max(100).optional().nullable(),
    utmMedium: z.string().trim().max(100).optional().nullable(),
    utmCampaign: z.string().trim().max(100).optional().nullable(),
    utmTerm: z.string().trim().max(100).optional().nullable(),
    utmContent: z.string().trim().max(100).optional().nullable(),

    // Anti-spam Honeypot field (must remain empty for legitimate users)
    website: z.string().max(0, "Acesso rejeitado").optional().nullable(),
  })
  .strict();

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
