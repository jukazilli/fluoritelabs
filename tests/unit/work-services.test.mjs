import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { CANONICAL_SERVICES } from "../../app/features/services/data.ts";
import { CANONICAL_WORK_CASES } from "../../app/features/work/data.ts";

console.log("Running Marco M4 — Conteúdo Comercial e Prova (PUB-009, WORK-001 to WORK-005)...\n");

// ============================================================================
// 1. PUB-009: Páginas de Serviço Canônicas
// ============================================================================
{
  console.log("1. Validating Canonical Services Specification (PUB-009)...");

  const requiredSlugs = ["site-institucional", "landing-page", "pagina-de-produto", "seo"];

  const services = Object.values(CANONICAL_SERVICES);
  assert.equal(services.length, 4, "Must define exactly 4 primary services");

  for (const slug of requiredSlugs) {
    const service = CANONICAL_SERVICES[slug];
    assert.ok(service, `Service '${slug}' must exist in CANONICAL_SERVICES`);
    assert.equal(service.slug, slug);
    assert.ok(service.title.length > 0, "Service title must not be empty");
    assert.ok(service.summary.length > 20, "Service summary must be descriptive");
    assert.ok(service.headline.length > 20, "Service headline must be descriptive");

    // Problem context structure
    assert.ok(service.problemContext.title, "Problem context title must exist");
    assert.ok(service.problemContext.description, "Problem description must exist");
    assert.ok(
      Array.isArray(service.problemContext.frictionPoints) &&
        service.problemContext.frictionPoints.length >= 2,
      "Must have at least 2 friction points",
    );

    // Expected result structure
    assert.ok(service.expectedResult.title, "Expected result title must exist");
    assert.ok(service.expectedResult.description, "Expected result description must exist");
    assert.ok(
      Array.isArray(service.expectedResult.outcomes) && service.expectedResult.outcomes.length >= 2,
      "Must have at least 2 tangible outcomes",
    );

    // How we build pillars
    assert.ok(service.howWeBuild.title, "How we build title must exist");
    assert.equal(
      service.howWeBuild.pillars.length,
      3,
      "Must feature exactly 3 engineering/design pillars",
    );

    // Related work bridge
    assert.ok(
      CANONICAL_WORK_CASES[service.relatedWorkSlug],
      `Related work '${service.relatedWorkSlug}' must resolve to a valid work case`,
    );

    // SEO metadata
    assert.ok(service.seoTitle.includes("Fluorite Labs"), "SEO title must mention Fluorite Labs");
    assert.ok(service.seoDescription.length > 30, "SEO description must be descriptive");
  }

  console.log("   ✓ All 4 canonical services conform strictly to PUB-009 requirements.");
}

// ============================================================================
// 2. WORK-001 to WORK-004: Three Conceptual Case Studies
// ============================================================================
{
  console.log("2. Validating Conceptual Work Cases (WORK-001 to WORK-004)...");

  const requiredCases = [
    "aethel-architecture",
    "lumena-health",
    "vektor-robotics",
    "vertice-materiais",
  ];

  const cases = Object.values(CANONICAL_WORK_CASES);
  assert.ok(cases.length >= 4, "Must define at least 4 conceptual projects");

  for (const slug of requiredCases) {
    const caseItem = CANONICAL_WORK_CASES[slug];
    assert.ok(caseItem, `Case '${slug}' must exist in CANONICAL_WORK_CASES`);
    assert.equal(caseItem.badge, "CONCEITO", "Must display transparent CONCEITO badge");

    // Check media file on disk
    const publicPath = path.resolve(process.cwd(), "public", caseItem.image.replace(/^\//, ""));
    assert.ok(fs.existsSync(publicPath), `Media asset file '${publicPath}' must exist on disk`);

    // Verify file size is within high-performance guidelines (< 250KB)
    const stats = fs.statSync(publicPath);
    assert.ok(
      stats.size < 250 * 1024,
      `Media asset ${caseItem.image} should be optimized under 250KB (current: ${(stats.size / 1024).toFixed(1)}KB)`,
    );

    // Context & Challenge
    assert.ok(caseItem.clientContext.overview.length > 30, "Overview must be rich and descriptive");
    assert.ok(caseItem.clientContext.challenge.length > 30, "Challenge must be well-articulated");

    // Design Concept & Palette
    assert.ok(caseItem.designConcept.philosophy.length > 30, "Philosophy must be present");
    assert.equal(caseItem.designConcept.palette.length, 3, "Must feature 3 palette swatches");

    // Engineering details
    assert.ok(caseItem.engineeringDetails.techStack.length >= 3, "Must feature tech stack specs");
    assert.ok(
      caseItem.engineeringDetails.performanceHighlights.length >= 2,
      "Must feature performance telemetry",
    );
  }

  console.log(
    "   ✓ All 4 conceptual projects conform strictly to WORK-001 - WORK-004 requirements.",
  );
}

// ============================================================================
// 3. WORK-005: Seamless Continuous Navigation Chain
// ============================================================================
{
  console.log("3. Validating Continuous Navigation Chain (WORK-005)...");

  const aethel = CANONICAL_WORK_CASES["aethel-architecture"];
  const lumena = CANONICAL_WORK_CASES["lumena-health"];
  const vektor = CANONICAL_WORK_CASES["vektor-robotics"];
  const vertice = CANONICAL_WORK_CASES["vertice-materiais"];

  // Chain: Aethel -> Lumena -> Vektor -> Vertice -> Aethel (circular loop)
  assert.equal(aethel.nextSlug, "lumena-health", "Aethel must point to Lumena");
  assert.equal(lumena.nextSlug, "vektor-robotics", "Lumena must point to Vektor");
  assert.equal(vektor.nextSlug, "vertice-materiais", "Vektor must point to Vertice");
  assert.equal(vertice.nextSlug, "aethel-architecture", "Vertice must point back to Aethel");

  // Titles must match target case
  assert.equal(aethel.nextTitle, lumena.title);
  assert.equal(lumena.nextTitle, vektor.title);
  assert.equal(vektor.nextTitle, vertice.title);
  assert.equal(vertice.nextTitle, aethel.title);

  console.log("   ✓ Continuous circular navigation verified (WORK-005).");
}

console.log("\n✓ All Marco M4 (PUB-009, WORK-001 to WORK-005) tests passed successfully!");
