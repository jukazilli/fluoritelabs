/**
 * Structured Logger & Observability Utility for Fluorite Labs.
 * Strictly adheres to privacy principles: NEVER logs raw PII (emails, phone numbers, full messages).
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogContext {
  requestId?: string;
  url?: string;
  method?: string;
  category?: string;
  leadId?: string;
  durationMs?: number;
  [key: string]: unknown;
}

export interface SanitizedLeadMetadata {
  leadId?: string;
  category?: string;
  hasName: boolean;
  hasEmail: boolean;
  hasPhone: boolean;
  messageLength: number;
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

/**
 * Strips all personal identifiable information (PII) from lead payloads.
 * Produces safe metadata for telemetry and debugging.
 */
export function sanitizeLeadPayload(payload: {
  id?: string;
  name?: string;
  email?: string;
  phone?: string | null;
  message?: string;
  category?: string;
}): SanitizedLeadMetadata {
  return {
    leadId: payload.id,
    category: payload.category,
    hasName: Boolean(payload.name && payload.name.trim().length > 0),
    hasEmail: Boolean(payload.email && payload.email.trim().length > 0),
    hasPhone: Boolean(payload.phone && payload.phone.trim().length > 0),
    messageLength: payload.message ? payload.message.length : 0,
  };
}

function formatLog(
  level: LogLevel,
  message: string,
  context?: LogContext,
  err?: unknown,
): LogEntry {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
  };

  if (context && Object.keys(context).length > 0) {
    entry.context = context;
  }

  if (err instanceof Error) {
    entry.error = {
      name: err.name,
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    };
  } else if (err) {
    entry.error = {
      name: "UnknownError",
      message: String(err),
    };
  }

  return entry;
}

export const logger = {
  debug(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV !== "production") {
      const entry = formatLog("debug", message, context);
      console.debug(JSON.stringify(entry));
    }
  },

  info(message: string, context?: LogContext): void {
    const entry = formatLog("info", message, context);
    console.info(JSON.stringify(entry));
  },

  warn(message: string, context?: LogContext, err?: unknown): void {
    const entry = formatLog("warn", message, context, err);
    console.warn(JSON.stringify(entry));
  },

  error(message: string, context?: LogContext, err?: unknown): void {
    const entry = formatLog("error", message, context, err);
    console.error(JSON.stringify(entry));
  },

  logLeadPersistenceFailure(
    payload: Parameters<typeof sanitizeLeadPayload>[0],
    err: unknown,
    requestId?: string,
  ): void {
    const sanitized = sanitizeLeadPayload(payload);
    logger.error(
      "Failed to persist lead record",
      {
        requestId,
        ...sanitized,
      },
      err,
    );
  },
};
