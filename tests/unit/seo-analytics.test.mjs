import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import * as dotenv from "dotenv";
import { buildSeoMeta } from "../../app/features/seo/metadata.ts";
import {
  getOrganizationSchema,
  getBreadcrumbSchema,
  getArticleSchema,
} from "../../app/features/seo/schema.ts";
import {
  CANONICAL_EVENTS,
  sanitizeAnalyticsProperties,
} from "../../app/features/analytics/events.ts";
import { loader as sitemapLoader } from "../../app/routes/sitemap[.]xml.ts";
import { loader as robotsLoader } from "../../app/routes/robots[.]txt.ts";
import { CANONICAL_SERVICES } from "../../app/features/services/data.ts";
import { CANONICAL_WORK_CASES } from "../../app/features/work/data.ts";

dotenv.config({ path: ".env.local" });
dotenv.config();

console.log("Running Marco M6 — SEO & Analytics Test Suite (SEO-001 to SEO-007)...\n");

// ============================================================================
// 1. SEO-001: Metadata System (Open Graph, Twitter, Canonical)
// ============================================================================
{
  console.log("1. Validating Canonical SEO Metadata System (SEO-001)...");

  const meta = buildSeoMeta({
    title: "Test Page — Fluorite Labs",
    description: "A test description for indexing.",
    path: "/test-path",
    ogImage: "https://fluoritelabs.com/test.webp",
  });

  const titleEntry = meta.find((m) => m.title);
  assert.equal(titleEntry?.title, "Test Page — Fluorite Labs");

  const descEntry = meta.find((m) => m.name === "description");
  assert.equal(descEntry?.content, "A test description for indexing.");

  const canonicalEntry = meta.find((m) => m.rel === "canonical");
  assert.equal(canonicalEntry?.href, "https://fluoritelabs.com/test-path");

  const ogTitle = meta.find((m) => m.property === "og:title");
  assert.equal(ogTitle?.content, "Test Page — Fluorite Labs");

  const twitterCard = meta.find((m) => m.name === "twitter:card");
  assert.equal(twitterCard?.content, "summary_large_image");

  const robotsEntry = meta.find((m) => m.name === "robots");
  assert.equal(robotsEntry?.content, "index, follow");

  // Private test
  const privateMeta = buildSeoMeta({
    title: "Private Page",
    description: "Draft",
    noIndex: true,
  });
  const privateRobots = privateMeta.find((m) => m.name === "robots");
  assert.equal(privateRobots?.content, "noindex, nofollow");

  console.log("   ✓ SEO-001 metadata builder strictly conforms to specification.");
}

// ============================================================================
// 2. SEO-002: Dynamic XML Sitemap & Robots.txt
// ============================================================================
{
  console.log("2. Validating Dynamic XML Sitemap & Robots.txt (SEO-002, SEO-004)...");

  // Test robots.txt
  const robotsRes = robotsLoader();
  const robotsText = await robotsRes.text();
  assert.ok(robotsText.includes("User-agent: *"), "Robots must declare wildcard user-agent");
  assert.ok(robotsText.includes("Disallow: /admin"), "Robots must disallow /admin");
  assert.ok(robotsText.includes("Disallow: /api/"), "Robots must disallow /api/");
  assert.ok(
    robotsText.includes("Sitemap: https://fluoritelabs.com/sitemap.xml"),
    "Robots must link sitemap",
  );

  // Test sitemap.xml
  const dummyRequest = new Request("https://fluoritelabs.com/sitemap.xml");
  const sitemapRes = await sitemapLoader({ request: dummyRequest, params: {}, context: {} });
  assert.equal(sitemapRes.headers.get("Content-Type"), "application/xml; charset=utf-8");

  const sitemapXml = await sitemapRes.text();
  assert.ok(sitemapXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(sitemapXml.includes("<loc>https://fluoritelabs.com/</loc>"));
  assert.ok(sitemapXml.includes("<loc>https://fluoritelabs.com/work</loc>"));
  assert.ok(sitemapXml.includes("<loc>https://fluoritelabs.com/journal</loc>"));
  assert.ok(sitemapXml.includes("<loc>https://fluoritelabs.com/privacidade</loc>"));

  // Check all services are listed
  for (const s of Object.keys(CANONICAL_SERVICES)) {
    assert.ok(
      sitemapXml.includes(`<loc>https://fluoritelabs.com/servicos/${s}</loc>`),
      `Sitemap must include service ${s}`,
    );
  }

  // Check all work cases are listed
  for (const w of Object.keys(CANONICAL_WORK_CASES)) {
    assert.ok(
      sitemapXml.includes(`<loc>https://fluoritelabs.com/work/${w}</loc>`),
      `Sitemap must include work ${w}`,
    );
  }

  // Ensure admin and drafts are never in sitemap
  assert.ok(!sitemapXml.includes("/admin"), "Sitemap must never include /admin");
  assert.ok(!sitemapXml.includes("/sign-in"), "Sitemap must never include /sign-in");

  console.log("   ✓ SEO-002 dynamic sitemap and robots.txt strictly validated.");
}

// ============================================================================
// 3. SEO-003: Structured Data (Organization, BreadcrumbList, Article)
// ============================================================================
{
  console.log("3. Validating Structured Data Schemas (SEO-003)...");

  // Organization
  const org = getOrganizationSchema();
  assert.equal(org["@type"], "Organization");
  assert.equal(org.name, "Fluorite Labs");
  assert.equal(org.url, "https://fluoritelabs.com");
  assert.ok(org.contactPoint);

  // Breadcrumbs
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Serviços", path: "/#services" },
    { name: "Site Institucional", path: "/servicos/site-institucional" },
  ]);
  assert.equal(breadcrumbs["@type"], "BreadcrumbList");
  assert.equal(breadcrumbs.itemListElement.length, 3);
  assert.equal(breadcrumbs.itemListElement[0].name, "Home");
  assert.equal(breadcrumbs.itemListElement[2].name, "Site Institucional");

  // Article
  const art = getArticleSchema({
    title: "Artigo de Exemplo",
    description: "Resumo do artigo.",
    slug: "artigo-exemplo",
    datePublished: "2026-03-10T12:00:00.000Z",
  });
  assert.equal(art["@type"], "Article");
  assert.equal(art.headline, "Artigo de Exemplo");
  assert.equal(art.author["@type"], "Organization");
  assert.equal(art.publisher["@type"], "Organization");

  console.log("   ✓ SEO-003 Structured Data JSON-LD generators verified.");
}

// ============================================================================
// 4. SEO-005 & SEO-006: Analytics Events & Anti-PII Guard
// ============================================================================
{
  console.log("4. Validating Product Events & Strict Privacy Guard (SEO-005, SEO-006)...");

  const requiredEvents = [
    "start_briefing",
    "briefing_step_1",
    "briefing_step_2",
    "briefing_step_3",
    "lead_created",
    "whatsapp_open",
    "service_view",
    "work_view",
    "journal_view",
    "cta_click",
  ];

  const actualEvents = Object.values(CANONICAL_EVENTS);
  for (const req of requiredEvents) {
    assert.ok(actualEvents.includes(req), `Canonical events must contain "${req}"`);
  }

  // Anti-PII Sanitization
  const dirtyProps = {
    page_path: "/servicos/site-institucional",
    service_slug: "site-institucional",
    firstName: "Juliano",
    email: "juliano@example.com",
    phone: "+5511999999999",
    message: "Sensitive text",
  };

  const sanitized = sanitizeAnalyticsProperties(dirtyProps);
  assert.equal(sanitized.page_path, "/servicos/site-institucional");
  assert.equal(sanitized.service_slug, "site-institucional");
  assert.equal(sanitized.firstName, undefined, "firstName must be stripped");
  assert.equal(sanitized.email, undefined, "email must be stripped");
  assert.equal(sanitized.phone, undefined, "phone must be stripped");
  assert.equal(sanitized.message, undefined, "message must be stripped");

  console.log("   ✓ SEO-005 / SEO-006 analytics event taxonomy and privacy filter verified.");
}

// ============================================================================
// 5. SEO-007: Privacy Page & Compliance Integrity
// ============================================================================
{
  console.log("5. Validating Privacy Route & LGPD Compliance (SEO-007)...");

  const privacyFile = path.resolve(process.cwd(), "app/routes/privacy.tsx");
  assert.ok(fs.existsSync(privacyFile), "Privacy route file must exist");

  const content = fs.readFileSync(privacyFile, "utf-8");
  assert.ok(content.includes("LGPD"), "Privacy page must explicitly reference LGPD");
  assert.ok(
    content.includes("Microbriefing"),
    "Privacy page must explain Microbriefing data usage",
  );
  assert.ok(
    content.includes("privacidade@fluoritelabs.com"),
    "Privacy page must specify contact channel",
  );

  console.log("   ✓ SEO-007 privacy route and LGPD compliance verified.");
}

console.log("\n✓ All Marco M6 SEO & Analytics (SEO-001 to SEO-007) tests passed successfully!");
