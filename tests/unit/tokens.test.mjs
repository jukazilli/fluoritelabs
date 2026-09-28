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

  it("VIS-007: Mobile responsive adaptation criteria and visual assets exist", () => {
    const mobileHeroScreenshot = path.resolve(process.cwd(), "docs/hero-mobile-implemented.png");
    const mobileMenuScreenshot = path.resolve(
      process.cwd(),
      "docs/hero-mobile-menu-implemented.png",
    );

    assert.ok(
      fs.existsSync(mobileHeroScreenshot),
      "docs/hero-mobile-implemented.png evidence must exist",
    );
    assert.ok(
      fs.existsSync(mobileMenuScreenshot),
      "docs/hero-mobile-menu-implemented.png evidence must exist",
    );

    const homeContent = fs.readFileSync(path.resolve(process.cwd(), "app/routes/home.tsx"), "utf8");
    assert.ok(homeContent.includes("mobile-menu-toggle"), "home.tsx must have mobile menu toggle");
    assert.ok(
      homeContent.includes("mobile-navigation-drawer"),
      "home.tsx must have mobile navigation drawer",
    );
    assert.ok(
      homeContent.includes("object-[75%_center]"),
      "home.tsx must position crystal optimally for vertical mobile viewport",
    );
  });

  it("PUB-001: Header and public navigation conform strictly to criteria", () => {
    const homeContent = fs.readFileSync(path.resolve(process.cwd(), "app/routes/home.tsx"), "utf8");

    // Canonical items
    assert.ok(homeContent.includes('"Work"'), "Navigation must include Work");
    assert.ok(
      homeContent.includes('"Serviços"') || homeContent.includes('"Services"'),
      "Navigation must include Serviços/Services",
    );
    assert.ok(
      homeContent.includes('"Processo"') || homeContent.includes('"Process"'),
      "Navigation must include Processo/Process",
    );
    assert.ok(homeContent.includes('"Journal"'), "Navigation must include Journal");
    assert.ok(
      homeContent.includes('"Começar agora"') && homeContent.includes('"Start a project"'),
      "CTA must include Começar agora / Start a project",
    );

    // Prohibited items in canonical nav (PUB-001)
    assert.ok(!homeContent.includes('{ label: "Sobre"'), "Navigation must NOT include Sobre");
    assert.ok(!homeContent.includes('{ label: "About"'), "Navigation must NOT include About");
    assert.ok(!homeContent.includes('{ label: "Contato"'), "Navigation must NOT include Contato");
    assert.ok(!homeContent.includes('{ label: "Contact"'), "Navigation must NOT include Contact");

    // Keyboard & focus-visible
    assert.ok(
      homeContent.includes("focus-visible:ring"),
      "Navigation elements must have focus-visible styling",
    );
    assert.ok(
      homeContent.includes('e.key === "Escape"'),
      "Mobile navigation must handle Escape key for keyboard dismissal",
    );
  });

  it("PUB-002: Section 'Por que Fluorite Labs' conforms to editorial criteria", () => {
    const homeContent = fs.readFileSync(path.resolve(process.cwd(), "app/routes/home.tsx"), "utf8");

    // Section existence
    assert.ok(homeContent.includes('id="why-fluorite"'), "Section why-fluorite must exist");

    // Dominant idea
    assert.ok(
      homeContent.includes("Um bom produto digital deve receber bem."),
      "Must contain Portuguese dominant idea",
    );
    assert.ok(
      homeContent.includes("A great digital product should welcome its visitors."),
      "Must contain English dominant idea",
    );

    // Editorial structure - no cards, no bullet lists in why-fluorite
    const whySectionMatch = homeContent.match(/id="why-fluorite"[\s\S]*?<\/section>/);
    assert.ok(whySectionMatch, "why-fluorite section markup must be parsable");
    const whySectionContent = whySectionMatch[0];

    assert.ok(!whySectionContent.includes("<ul"), "Section must NOT use bullet lists");
    assert.ok(!whySectionContent.includes("<ol"), "Section must NOT use bullet lists");
    assert.ok(!whySectionContent.includes("card"), "Section must NOT use generic card references");
    assert.ok(
      whySectionContent.includes("h2"),
      "Section must contain heading element for dominant idea",
    );
  });

  it("PUB-003: Section 'Serviços' conforms to editorial criteria, services and complementary notes", () => {
    const homeContent = fs.readFileSync(path.resolve(process.cwd(), "app/routes/home.tsx"), "utf8");

    // Section existence
    assert.ok(homeContent.includes('id="services"'), "Section services must exist");

    // 4 Canonical services
    assert.ok(
      homeContent.includes("Site institucional") || homeContent.includes("Corporate website"),
      "Must offer Site institucional / Corporate website",
    );
    assert.ok(homeContent.includes("Landing page"), "Must offer Landing page");
    assert.ok(
      homeContent.includes("Página de produto ou serviço") ||
        homeContent.includes("Product or service page"),
      "Must offer Página de produto ou serviço / Product or service page",
    );
    assert.ok(homeContent.includes('"SEO"'), "Must offer SEO");

    // Complementary services present without competing hierarchy
    assert.ok(
      homeContent.includes("Hospedagem") || homeContent.includes("hosting"),
      "Must mention Hospedagem / hosting as complementary",
    );
    assert.ok(
      homeContent.includes("implantação") || homeContent.includes("deployment"),
      "Must mention implantação / deployment as complementary",
    );

    // Navigable links for each service
    assert.ok(
      homeContent.includes('"/servicos/site-institucional"'),
      "Service must have site institucional path",
    );
    assert.ok(
      homeContent.includes('"/servicos/landing-page"'),
      "Service must have landing page path",
    );
    assert.ok(
      homeContent.includes('"/servicos/pagina-de-produto"'),
      "Service must have product page path",
    );
    assert.ok(homeContent.includes('"/servicos/seo"'), "Service must have SEO path");
    assert.ok(
      homeContent.includes("href={svc.href}"),
      "Services must be rendered as navigable links",
    );

    // Editorial layout: no generic cards
    const servicesMatch = homeContent.match(/id="services"[\s\S]*?<\/section>/);
    assert.ok(servicesMatch, "services section markup must be parsable");
    const servicesContent = servicesMatch[0];
    assert.ok(
      !servicesContent.includes("card"),
      "Services section must NOT use generic card references",
    );
    assert.ok(
      servicesContent.includes("divide-y"),
      "Services section uses editorial list with dividers",
    );
  });

  it("PUB-004: Section 'Work' conforms to three concept projects criteria and visual assets", () => {
    const homeContent = fs.readFileSync(path.resolve(process.cwd(), "app/routes/home.tsx"), "utf8");

    // Section existence
    assert.ok(homeContent.includes('id="work"'), "Section work must exist");

    // 3 Concept Projects
    assert.ok(
      homeContent.includes("aethel-architecture"),
      "Must include Concept 01 (architecture)",
    );
    assert.ok(homeContent.includes("lumena-health"), "Must include Concept 02 (clinic/health)");
    assert.ok(homeContent.includes("vektor-robotics"), "Must include Concept 03 (b2b robotics)");

    // Concept Badge present
    assert.ok(homeContent.includes('"CONCEITO"'), "Must contain CONCEITO badge");
    assert.ok(homeContent.includes('"CONCEPT"'), "Must contain CONCEPT badge");

    // Visual assets exist on disk and have optimized footprint
    const aethelAsset = path.resolve(process.cwd(), "public/images/work-aethel.webp");
    const lumenaAsset = path.resolve(process.cwd(), "public/images/work-lumena.webp");
    const vektorAsset = path.resolve(process.cwd(), "public/images/work-vektor.webp");

    assert.ok(fs.existsSync(aethelAsset), "work-aethel.webp asset must exist");
    assert.ok(fs.existsSync(lumenaAsset), "work-lumena.webp asset must exist");
    assert.ok(fs.existsSync(vektorAsset), "work-vektor.webp asset must exist");

    assert.ok(
      fs.statSync(aethelAsset).size < 300000,
      "work-aethel.webp must be optimized (< 300 KB)",
    );
    assert.ok(
      fs.statSync(lumenaAsset).size < 300000,
      "work-lumena.webp must be optimized (< 300 KB)",
    );
    assert.ok(
      fs.statSync(vektorAsset).size < 300000,
      "work-vektor.webp must be optimized (< 300 KB)",
    );

    // Navigable case links and view all link
    assert.ok(
      homeContent.includes("href={project.href}"),
      "Cases must be rendered as navigable links",
    );
    assert.ok(homeContent.includes("viewAll"), "Must contain view all link");
  });

  it("PUB-005: Section 'Processo' conforms to 5 simple, customer-oriented steps criteria", () => {
    const homeContent = fs.readFileSync(path.resolve(process.cwd(), "app/routes/home.tsx"), "utf8");

    // Section existence
    assert.ok(homeContent.includes('id="process"'), "Section process must exist");

    // 5 Canonical steps
    assert.ok(
      homeContent.includes('"Conversamos"') || homeContent.includes('"We talk"'),
      "Step 1 must be Conversamos / We talk",
    );
    assert.ok(
      homeContent.includes('"Entendemos"') || homeContent.includes('"We understand"'),
      "Step 2 must be Entendemos / We understand",
    );
    assert.ok(
      homeContent.includes('"Planejamos"') || homeContent.includes('"We plan"'),
      "Step 3 must be Planejamos / We plan",
    );
    assert.ok(
      homeContent.includes('"Criamos"') || homeContent.includes('"We create"'),
      "Step 4 must be Criamos / We create",
    );
    assert.ok(
      homeContent.includes('"Publicamos"') || homeContent.includes('"We publish"'),
      "Step 5 must be Publicamos / We publish",
    );

    // Customer-centric editorial layout (no complex technical jargon, 5 sequential steps)
    const processMatch = homeContent.match(/id="process"[\s\S]*?<\/section>/);
    assert.ok(processMatch, "process section markup must be parsable");
    const processContent = processMatch[0];
    assert.ok(!processContent.includes("<ul"), "Process section must NOT use bullet lists");
    assert.ok(!processContent.includes("<ol"), "Process section must NOT use bullet lists");
    assert.ok(
      processContent.includes("lg:grid-cols-5"),
      "Process section uses clean 5-column linear sequence",
    );
  });

  it("PUB-006: Section 'Standards of Rigor' reinforces trust through observable technical criteria", () => {
    const homeContent = fs.readFileSync(path.resolve(process.cwd(), "app/routes/home.tsx"), "utf8");

    // Section existence
    assert.ok(homeContent.includes('id="standards"'), "Section standards must exist");

    // 4 Technical Pillars
    assert.ok(
      homeContent.includes("Velocidade & Core Web Vitals") ||
        homeContent.includes("Speed & Core Web Vitals"),
      "Must include Speed & Core Web Vitals pillar",
    );
    assert.ok(
      homeContent.includes("Design de Precisão & Acessibilidade") ||
        homeContent.includes("Precision Design & Accessibility"),
      "Must include Accessibility & Design pillar",
    );
    assert.ok(
      homeContent.includes("Arquitetura Moderna & Escalável") ||
        homeContent.includes("Modern & Scalable Architecture"),
      "Must include Architecture pillar",
    );
    assert.ok(
      homeContent.includes("Transparência & Propriedade Total") ||
        homeContent.includes("Transparency & Complete Ownership"),
      "Must include Ownership & Transparency pillar",
    );

    // Verified technical tags
    assert.ok(homeContent.includes("EDGE NATIVE / SUB-100MS"), "Must include edge native tag");
    assert.ok(homeContent.includes("WCAG AAA / SEMANTIC HTML5"), "Must include WCAG AAA tag");
    assert.ok(homeContent.includes("TYPESCRIPT / ZERO BLOAT"), "Must include TypeScript tag");
    assert.ok(homeContent.includes("100% OWNERSHIP / ZERO LOCK-IN"), "Must include ownership tag");

    // Prohibition of fabricated proof (reviews, stars, fake testimonials)
    const standardsMatch = homeContent.match(/id="standards"[\s\S]*?<\/section>/);
    assert.ok(standardsMatch, "standards section markup must be parsable");
    const standardsContent = standardsMatch[0];
    assert.ok(!standardsContent.includes("testimonial"), "Must not use fake testimonials");
    assert.ok(!standardsContent.includes("depoimento"), "Must not use fake testimonials");
    assert.ok(!standardsContent.includes("review"), "Must not use fake reviews");
    assert.ok(!standardsContent.includes("★"), "Must not use star ratings");
  });

  it("PUB-007: Section 'FLUOR JOURNAL' conforms to 3 editorial articles criteria", () => {
    const homeContent = fs.readFileSync(path.resolve(process.cwd(), "app/routes/home.tsx"), "utf8");

    // Section existence
    assert.ok(homeContent.includes('id="journal"'), "Section journal must exist");

    // 3 Canonical articles
    assert.ok(
      homeContent.includes("site-institucional-ou-landing-page"),
      "Must include Article 1 (strategy & decision)",
    );
    assert.ok(
      homeContent.includes("site-industria-b2b-confianca"),
      "Must include Article 2 (industry & b2b)",
    );
    assert.ok(
      homeContent.includes("por-que-sites-bonitos-nao-convertem"),
      "Must include Article 3 (ux & conversion)",
    );

    // Editorial layout: no generic blog appearance
    const journalMatch = homeContent.match(/id="journal"[\s\S]*?<\/section>/);
    assert.ok(journalMatch, "journal section markup must be parsable");
    const journalContent = journalMatch[0];
    assert.ok(journalContent.includes("divide-y"), "Journal uses linear editorial divider list");
    assert.ok(journalContent.includes("readTime"), "Articles include reading time metadata");
  });

  it("PUB-008: Footer as full experience section conforms to clean navigation and legal requirements", () => {
    const homeContent = fs.readFileSync(path.resolve(process.cwd(), "app/routes/home.tsx"), "utf8");

    // Footer section existence
    assert.ok(homeContent.includes('id="contact"'), "Footer section contact must exist");

    // Primary CTA
    assert.ok(
      homeContent.includes('id="footer-primary-cta"'),
      "Footer must have primary CTA button",
    );
    assert.ok(
      homeContent.includes("hello@fluoritelabs.com"),
      "Footer must offer direct contact email",
    );

    // Legal & Copyright
    assert.ok(homeContent.includes("/privacidade"), "Footer must link to privacy policy");
    assert.ok(homeContent.includes("/termos"), "Footer must link to terms");
    assert.ok(homeContent.includes("/cookies"), "Footer must link to cookies");
    assert.ok(homeContent.includes("2026 Fluorite Labs"), "Footer must have copyright notice");
  });
});
