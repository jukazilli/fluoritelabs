import { createRequestHandler, createContext, RouterContextProvider } from "react-router";
import { isPreviewOrNonProduction, getRobotsHeaderValue } from "../app/config/preview.ts";
import { logger } from "../app/utils/logger.server.ts";

export interface CloudflareContext {
  env: Env;
  ctx: ExecutionContext;
}

export const cloudflareContext = createContext<CloudflareContext>();

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env?.MODE || "development",
);

export default {
  async fetch(request, env, ctx) {
    const startTime = Date.now();
    const requestId =
      request.headers.get("cf-ray") || request.headers.get("x-request-id") || crypto.randomUUID();

    if (env) {
      Object.assign(globalThis, env);
    }

    try {
      const context = new RouterContextProvider();
      context.set(cloudflareContext, { env, ctx });
      const response = await requestHandler(request, context);

      const durationMs = Date.now() - startTime;
      const isNonProd = isPreviewOrNonProduction(request.url, env?.NODE_ENV);

      const headers = new Headers(response.headers);
      headers.set("X-Request-Id", requestId);

      if (isNonProd) {
        headers.set("X-Robots-Tag", getRobotsHeaderValue(true));
      }

      if (response.status >= 500) {
        logger.error("Server-side HTTP error response", {
          requestId,
          url: request.url,
          method: request.method,
          status: response.status,
          durationMs,
        });
      }

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    } catch (error) {
      const durationMs = Date.now() - startTime;
      logger.error(
        "Unhandled worker exception",
        {
          requestId,
          url: request.url,
          method: request.method,
          durationMs,
        },
        error,
      );

      return new Response("Internal Server Error", {
        status: 500,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Request-Id": requestId,
          "X-Robots-Tag": "noindex, nofollow, noarchive",
        },
      });
    }
  },
} satisfies ExportedHandler<Env>;
