import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("design-system", "routes/design-system.tsx"),
  route("sign-in/*", "routes/sign-in.tsx"),
  route("sign-up/*", "routes/sign-up.tsx"),
  route("admin", "routes/admin.tsx"),
  route("api/health", "routes/api.health.ts"),
] satisfies RouteConfig;
