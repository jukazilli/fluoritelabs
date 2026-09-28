/**
 * Fluorite Labs — Canonical Analytics Events Adapter
 * Spec: docs/05_SEO_Performance_e_Otimizacao.md & docs/08_Visao_do_Tech_Lead_e_Stack.md
 *
 * Privacy Rule (ENG-014 / Doc 05 §31):
 * PII (Personally Identifiable Information) such as contact name, email,
 * phone number, or raw messages MUST NEVER be sent to GA4 or third-party analytics.
 */

export const CANONICAL_EVENTS = {
  START_BRIEFING: "start_briefing",
  BRIEFING_STEP_1: "briefing_step_1",
  BRIEFING_STEP_2: "briefing_step_2",
  BRIEFING_STEP_3: "briefing_step_3",
  LEAD_CREATED: "lead_created",
  WHATSAPP_OPEN: "whatsapp_open",
  SERVICE_VIEW: "service_view",
  WORK_VIEW: "work_view",
  JOURNAL_VIEW: "journal_view",
  CTA_CLICK: "cta_click",
} as const;

export type CanonicalEventName = (typeof CANONICAL_EVENTS)[keyof typeof CANONICAL_EVENTS] | string;

export interface EventProperties {
  page_path?: string;
  source_position?: string;
  service_slug?: string;
  work_slug?: string;
  journal_slug?: string;
  need_category?: string;
  investment_tier?: string;
  lead_id?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  [key: string]: string | number | boolean | undefined;
}

// Prohibited PII keys that must be stripped before sending to analytics
const FORBIDDEN_PII_KEYS = new Set([
  "name",
  "first_name",
  "firstname",
  "last_name",
  "lastname",
  "email",
  "phone",
  "whatsapp",
  "message",
  "body",
  "address",
  "document",
  "cpf",
  "cnpj",
]);

/**
 * Strips any potential PII keys and sanitizes values.
 */
export function sanitizeAnalyticsProperties(
  props: EventProperties = {},
): Record<string, string | number | boolean> {
  const clean: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null) continue;
    if (FORBIDDEN_PII_KEYS.has(key.toLowerCase())) {
      console.warn(`[Analytics Guard] Stripped forbidden PII key: "${key}"`);
      continue;
    }

    if (typeof value === "string") {
      clean[key] = value.slice(0, 100);
    } else if (typeof value === "number" || typeof value === "boolean") {
      clean[key] = value;
    }
  }

  return clean;
}

/**
 * Dispatch analytics event to Google Analytics 4 (gtag) or internal logger.
 */
export function trackEvent(eventName: CanonicalEventName, properties: EventProperties = {}): void {
  const sanitized = sanitizeAnalyticsProperties(properties);

  if (typeof window !== "undefined") {
    // Check if gtag is loaded on window
    const win = window as unknown as {
      gtag?: (command: string, action: string, params: Record<string, unknown>) => void;
      dataLayer?: unknown[];
    };

    if (typeof win.gtag === "function") {
      win.gtag("event", eventName, sanitized);
    } else if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({ event: eventName, ...sanitized });
    }

    if (process.env.NODE_ENV === "development") {
      console.info(`[Analytics Event] "${eventName}":`, sanitized);
    }
  }
}
