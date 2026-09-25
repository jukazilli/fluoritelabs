import { createRequestHandler, createContext, RouterContextProvider } from "react-router";
import { isPreviewOrNonProduction, getRobotsHeaderValue } from "../app/config/preview.ts";

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
    if (env) {
      Object.assign(globalThis, env);
    }
    const context = new RouterContextProvider();
    context.set(cloudflareContext, { env, ctx });
    const response = await requestHandler(request, context);

    const isNonProd = isPreviewOrNonProduction(request.url, env?.NODE_ENV);
    if (isNonProd) {
      const headers = new Headers(response.headers);
      headers.set("X-Robots-Tag", getRobotsHeaderValue(true));
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    return response;
  },
} satisfies ExportedHandler<Env>;
