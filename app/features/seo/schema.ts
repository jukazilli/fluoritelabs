/**
 * Fluorite Labs — Structured Data (JSON-LD) Generator
 * Spec: SEO-003 (Doc 05 §08)
 */

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fluorite Labs",
    url: "https://fluoritelabs.com",
    logo: "https://fluoritelabs.com/images/hero-fluorite.webp",
    description:
      "Estúdio digital focado em experiências web de alto impacto, arquitetura moderna, design de precisão e engenharia de refração.",
    slogan: "Ideias refratadas em experiências digitais de alta performance.",
    email: "hello@fluoritelabs.com",
    sameAs: [
      "https://github.com/fluoritelabs",
      "https://linkedin.com/company/fluoritelabs",
      "https://twitter.com/fluoritelabs",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@fluoritelabs.com",
      availableLanguage: ["Portuguese", "English"],
    },
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fluoritelabs.com${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}

export function getArticleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  categoryName,
  imageUrl,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  categoryName?: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `https://fluoritelabs.com/journal/${slug}`,
    image: imageUrl || "https://fluoritelabs.com/images/hero-fluorite.webp",
    datePublished,
    dateModified: dateModified || datePublished,
    articleSection: categoryName || "Technology",
    author: {
      "@type": "Organization",
      name: "Fluorite Labs Editorial",
      url: "https://fluoritelabs.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Fluorite Labs",
      url: "https://fluoritelabs.com",
      logo: {
        "@type": "ImageObject",
        url: "https://fluoritelabs.com/images/hero-fluorite.webp",
      },
    },
  };
}
