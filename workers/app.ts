import { createRequestHandler, createContext, RouterContextProvider } from "react-router";

export interface CloudflareContext {
  env: Env;
  ctx: ExecutionContext;
}

export const cloudflareContext = createContext<CloudflareContext>();

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    if (env) {
      Object.assign(globalThis, env);
    }
    const context = new RouterContextProvider();
    context.set(cloudflareContext, { env, ctx });
    return requestHandler(request, context);
  },
} satisfies ExportedHandler<Env>;
