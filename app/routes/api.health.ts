import type { LoaderFunctionArgs } from "react-router";
import { getDb } from "../data/db.server.ts";
import { sql } from "drizzle-orm";
import { logger } from "../utils/logger.server.ts";

export async function loader({ request }: LoaderFunctionArgs) {
  const startTime = Date.now();
  let dbHealthy = false;
  let dbLatencyMs: number | undefined;

  const dbUrl = process.env.DATABASE_URL || "";

  try {
    if (dbUrl) {
      const db = getDb(dbUrl);
      const dbStart = Date.now();
      await db.execute(sql`SELECT 1`);
      dbLatencyMs = Date.now() - dbStart;
      dbHealthy = true;
    }
  } catch (error) {
    logger.warn(
      "Health check database probe failed",
      {
        url: request.url,
      },
      error,
    );
    dbHealthy = false;
  }

  const durationMs = Date.now() - startTime;
  const isHealthy = dbHealthy;
  const status = isHealthy ? 200 : 503;

  const payload = {
    status: isHealthy ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    durationMs,
    services: {
      app: "ok",
      database: dbHealthy ? "connected" : "disconnected",
      ...(dbLatencyMs !== undefined ? { dbLatencyMs } : {}),
    },
    version: "1.0.0",
  };

  return Response.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
