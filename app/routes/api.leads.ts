import type { ActionFunctionArgs } from "react-router";
import { createLeadSchema } from "../features/leads/schema.ts";
import { createLead } from "../features/leads/repository.server.ts";
import { buildWhatsappUrl } from "../features/leads/whatsapp.ts";
import { leadCreationRateLimiter, getClientIp } from "../features/leads/rate-limiter.server.ts";
import { logger } from "../utils/logger.server.ts";

const MAX_PAYLOAD_BYTES = 10 * 1024; // 10 KB limit (LEAD-003)

export async function loader() {
  return new Response(JSON.stringify({ error: "Method not allowed. Use POST." }), {
    status: 405,
    headers: { "Content-Type": "application/json", Allow: "POST" },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 455,
      headers: { "Content-Type": "application/json", Allow: "POST" },
    });
  }

  // 1. IP Rate Limiting Guard (LEAD-003)
  const clientIp = getClientIp(request);
  const rateLimitResult = leadCreationRateLimiter.check(clientIp);

  if (!rateLimitResult.allowed) {
    logger.warn("Lead creation rate limit exceeded", { clientIp });
    return new Response(
      JSON.stringify({
        ok: false,
        error: "RATE_LIMIT_EXCEEDED",
        message: "Muitas tentativas em curto período. Por favor, aguarde alguns instantes.",
        retryAfter: rateLimitResult.resetInSeconds,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(rateLimitResult.resetInSeconds),
        },
      },
    );
  }

  // 2. Payload size guard (LEAD-003)
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "PAYLOAD_TOO_LARGE",
        message: "Payload excede o limite máximo permitido de 10KB.",
      }),
      {
        status: 413,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // 3. Parse JSON Body
  let rawBody: unknown;
  try {
    const rawText = await request.text();
    if (rawText.length > MAX_PAYLOAD_BYTES) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "PAYLOAD_TOO_LARGE",
          message: "Payload excede o limite máximo permitido de 10KB.",
        }),
        {
          status: 413,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    rawBody = JSON.parse(rawText);
  } catch {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "INVALID_JSON",
        message: "Corpo da requisição deve ser um JSON válido.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // 4. Zod Schema Validation & Honeypot Check (LEAD-003)
  const parseResult = createLeadSchema.safeParse(rawBody);
  if (!parseResult.success) {
    const issues = parseResult.error.issues.map((i) => ({
      field: i.path.join("."),
      message: i.message,
    }));

    return new Response(
      JSON.stringify({
        ok: false,
        error: "VALIDATION_FAILED",
        message: "Dados de formulário inválidos.",
        issues,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const validData = parseResult.data;

  // Bot honeypot verification
  if (validData.website && validData.website.trim().length > 0) {
    logger.warn("Bot submission detected via honeypot field", { clientIp });
    return new Response(
      JSON.stringify({
        ok: false,
        error: "SPAM_DETECTED",
        message: "Requisição rejeitada pelo filtro anti-spam.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Generate WhatsApp handoff URL
  const whatsappUrl = buildWhatsappUrl({
    firstName: validData.firstName,
    need: validData.need,
    budget: validData.budget,
  });

  // 5. Database Persistence (LEAD-004) with Safe Degradation (LEAD-006)
  try {
    const lead = await createLead(validData);

    logger.info("Lead registered successfully", {
      leadId: lead.id,
      need: lead.need,
      sourcePath: lead.sourcePath,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        leadId: lead.id,
        whatsappUrl,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    // Safe Degradation (LEAD-006 / ENG-015):
    // Never expose PII or crash the commercial flow.
    // Allow user to retry or proceed directly to WhatsApp!
    logger.error("Failed to persist lead to database", {
      error: err instanceof Error ? err.message : String(err),
      need: validData.need,
      sourcePath: validData.sourcePath,
    });

    return new Response(
      JSON.stringify({
        ok: false,
        error: "PERSISTENCE_FAILED",
        message:
          "Não conseguimos registrar seu contato no momento. Você pode tentar novamente ou falar diretamente conosco no WhatsApp.",
        canFallbackToWhatsapp: true,
        whatsappUrl,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
