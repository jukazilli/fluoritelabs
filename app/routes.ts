import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("design-system", "routes/design-system.tsx"),
  route("sign-in/*", "routes/sign-in.tsx"),
  route("sign-up/*", "routes/sign-up.tsx"),
  route("admin", "routes/admin.tsx"),
  route("api/health", "routes/api.health.ts"),
  route("api/leads", "routes/api.leads.ts"),
  route("servicos/:slug", "routes/services.$slug.tsx"),
  route("work", "routes/work._index.tsx"),
  route("work/:slug", "routes/work.$slug.tsx"),
  route("journal", "routes/journal._index.tsx"),
  route("journal/:slug", "routes/journal.$slug.tsx"),
  route("privacidade", "routes/privacy.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.ts"),
  route("robots.txt", "routes/robots[.]txt.ts"),
] satisfies RouteConfig;
