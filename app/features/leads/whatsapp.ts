/**
 * Fluorite Labs — WhatsApp Handoff Generator
 * Spec: docs/04_Experiencia_UX_e_Arquitetura_de_Informacao.md (§18, §19) & LEAD-005
 */

export const DEFAULT_WHATSAPP_NUMBER = "5511999999999";

export interface WhatsappMessageParams {
  firstName: string;
  need: string;
  budget: string;
  whatsappNumber?: string;
}

/**
 * Formats canonical WhatsApp pre-filled message.
 * Spec:
 * Olá, sou [nome].
 *
 * Tenho interesse em [necessidade].
 * Faixa de investimento: [faixa].
 */
export function formatWhatsappMessage(params: {
  firstName: string;
  need: string;
  budget: string;
}): string {
  const name = params.firstName.trim();
  const need = params.need.trim();
  const budget = params.budget.trim();

  return `Olá, sou ${name}.\n\nTenho interesse em ${need}.\nFaixa de investimento: ${budget}.`;
}

/**
 * Builds canonical WhatsApp redirect URL.
 */
export function buildWhatsappUrl(params: WhatsappMessageParams): string {
  const number = (params.whatsappNumber || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, "");
  const text = formatWhatsappMessage(params);
  const encodedText = encodeURIComponent(text);

  return `https://wa.me/${number}?text=${encodedText}`;
}
