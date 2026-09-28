/**
 * Fluorite Labs — Canonical SEO Metadata Generator
 * Spec: SEO-001 (Doc 05 §02, §03, §08)
 */

export interface SeoMetaOptions {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

export function buildSeoMeta({
  title,
  description,
  path = "/",
  ogImage = "https://fluoritelabs.com/images/hero-fluorite.webp",
  ogType = "website",
  noIndex = false,
}: SeoMetaOptions) {
  const canonicalUrl = `https://fluoritelabs.com${path.startsWith("/") ? path : `/${path}`}`;

  const tags: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: canonicalUrl },

    // Open Graph
    { property: "og:site_name", content: "Fluorite Labs" },
    { property: "og:type", content: ogType },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: ogImage },

    // Twitter Cards
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
  ];

  if (noIndex) {
    tags.push({ name: "robots", content: "noindex, nofollow" });
  } else {
    tags.push({ name: "robots", content: "index, follow" });
  }

  return tags;
}
