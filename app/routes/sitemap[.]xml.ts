import type { LoaderFunctionArgs } from "react-router";
import { getPublishedArticles, INITIAL_ARTICLES } from "../features/journal/repository.server.ts";
import { CANONICAL_SERVICES } from "../features/services/data.ts";
import { CANONICAL_WORK_CASES } from "../features/work/data.ts";

/**
 * Dynamic XML Sitemap Generator
 * Spec: SEO-002 (Doc 05 §04)
 */
export async function loader(_args: LoaderFunctionArgs) {
  const baseUrl = "https://fluoritelabs.com";

  // 1. Static Canonical Pages
  const staticPages = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/work", priority: "0.9", changefreq: "weekly" },
    { path: "/journal", priority: "0.9", changefreq: "daily" },
    { path: "/privacidade", priority: "0.3", changefreq: "yearly" },
  ];

  // 2. Canonical Services
  const servicePages = Object.keys(CANONICAL_SERVICES).map((slug) => ({
    path: `/servicos/${slug}`,
    priority: "0.8",
    changefreq: "monthly",
  }));

  // 3. Canonical Work Projects
  const workPages = Object.keys(CANONICAL_WORK_CASES).map((slug) => ({
    path: `/work/${slug}`,
    priority: "0.8",
    changefreq: "monthly",
  }));

  // 4. Published Journal Articles Only (Drafts and Unpub are strictly excluded - SEO-002, SEO-004)
  let publishedArticles = await getPublishedArticles();
  if (publishedArticles.length === 0) {
    publishedArticles = INITIAL_ARTICLES.filter((a) => a.status === "PUBLISHED").map((a) => ({
      id: a.slug,
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      content: a.content,
      coverImageUrl: null,
      categoryId: null,
      categoryName: a.categoryName || null,
      readingTimeMinutes: a.readingTimeMinutes ?? null,
      status: a.status,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }

  const journalPages = publishedArticles.map((art) => ({
    path: `/journal/${art.slug}`,
    priority: "0.7",
    changefreq: "monthly",
    lastmod: (art.updatedAt || art.publishedAt || new Date()).toISOString().split("T")[0],
  }));

  const allUrls = [...staticPages, ...servicePages, ...workPages, ...journalPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${baseUrl}${item.path}</loc>
    ${"lastmod" in item ? `<lastmod>${item.lastmod}</lastmod>` : ""}
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=14400",
    },
  });
}
