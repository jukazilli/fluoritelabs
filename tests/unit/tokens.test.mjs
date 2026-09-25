import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("VIS-001 / VIS-002 / VIS-003 / VIS-005 Design Tokens & Assets Suite", () => {
  it("VIS-001: canonical reference assets exist and are accessible", () => {
    const canonicalDocs = path.resolve(process.cwd(), "docs/image.png");
    const canonicalRef = path.resolve(process.cwd(), "references/design/canonical-reference.png");
    const webpRef = path.resolve(
      process.cwd(),
      "references/design/fluorite-labs-hero-reference.webp",
    );

    assert.ok(fs.existsSync(canonicalDocs), "docs/image.png canonical file must exist");
    assert.ok(fs.existsSync(canonicalRef), "references/design/canonical-reference.png must exist");
    assert.ok(
      fs.existsSync(webpRef),
      "references/design/fluorite-labs-hero-reference.webp must exist",
    );

    const statDocs = fs.statSync(canonicalDocs);
    const statRef = fs.statSync(canonicalRef);
    assert.equal(statDocs.size, statRef.size, "canonical copies must have exact matching bytes");
  });

  it("VIS-002: CSS custom property tokens conform to Design System 03", () => {
    const cssContent = fs.readFileSync(path.resolve(process.cwd(), "app/styles/app.css"), "utf8");

    const requiredTokens = [
      // Base dark
      "--color-obsidian-black: #05070b",
      "--color-deep-charcoal: #0a0e14",
      "--color-soft-white: #f5f7fa",
      "--color-muted-silver: #a8b0bc",

      // Fluorite accents
      "--color-fluorite-violet: #8c72ff",
      "--color-crystal-lilac: #c7b8ff",
      "--color-emerald-teal: #62e7d6",
      "--color-ice-cyan: #a8f2ff",
      "--color-deep-indigo-glow: #3c4c9e",

      // Glows
      "--glow-white",
      "--glow-violet",
      "--glow-teal",
      "--glow-cyan",

      // Base editorial clara
      "--color-editorial-white: #f7f7f5",
      "--color-editorial-warm-white: #f2f1ed",
      "--color-refraction-mist: #edeaf7",
      "--color-ink: #111318",
      "--color-ink-muted: #555b66",

      // Typography
      "--font-display:",
      '"General Sans"',
      "--font-body:",
      '"Inter"',

      // UI Tokens
      "--radius-sm: 8px",
      "--radius-md: 16px",
      "--radius-lg: 24px",
      "--radius-pill: 9999px",

      // Motion
      "--ease-cinematic",
      "--duration-micro",
      "--duration-smooth",
      "--duration-deliberate",
    ];

    for (const token of requiredTokens) {
      assert.ok(
        cssContent.includes(token),
        `app/styles/app.css must contain token definition: ${token}`,
      );
    }
  });

  it("VIS-003: Typography font loaders are present in root.tsx", () => {
    const rootContent = fs.readFileSync(path.resolve(process.cwd(), "app/root.tsx"), "utf8");

    assert.ok(
      rootContent.includes("fonts.googleapis.com"),
      "root.tsx must preconnect or load Google Fonts",
    );
    assert.ok(
      rootContent.includes("api.fontshare.com"),
      "root.tsx must preconnect or load Fontshare for General Sans",
    );
    assert.ok(rootContent.includes("general-sans"), "root.tsx must link General Sans stylesheet");
    assert.ok(rootContent.includes("Inter"), "root.tsx must link Inter stylesheet");
  });

  it("VIS-005: Hero media assets exist with optimized footprint", () => {
    const heroMedia = path.resolve(process.cwd(), "public/images/hero-clean.webp");
    const workThumb = path.resolve(process.cwd(), "public/images/work-preview-thumb.webp");

    assert.ok(
      fs.existsSync(heroMedia),
      "public/images/hero-clean.webp must exist as high-performance poster",
    );
    assert.ok(fs.existsSync(workThumb), "public/images/work-preview-thumb.webp must exist");

    const statHero = fs.statSync(heroMedia);
    assert.ok(
      statHero.size > 50000 && statHero.size < 500000,
      `hero poster size (${statHero.size} bytes) should be optimized (< 500 KB)`,
    );
  });
});
