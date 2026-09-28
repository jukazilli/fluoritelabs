/**
 * Robots.txt Generator
 * Spec: SEO-002 & SEO-004
 */
export function loader() {
  const content = `# Fluorite Labs Robots Configuration (SEO-002, SEO-004)
User-agent: *
Allow: /

# Private areas & admin surfaces strictly excluded
Disallow: /admin
Disallow: /api/
Disallow: /sign-in
Disallow: /sign-up

Sitemap: https://fluoritelabs.com/sitemap.xml
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
