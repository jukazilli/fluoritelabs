import { useState, useEffect } from "react";
import type { Route } from "./+types/home";
import { MicrobriefingModal } from "../features/leads/MicrobriefingModal.tsx";
import { buildSeoMeta } from "../features/seo/metadata.ts";
import { getOrganizationSchema } from "../features/seo/schema.ts";

export function meta(_args?: Route.MetaArgs) {
  return buildSeoMeta({
    title: "Fluorite Labs — Estúdio Digital de Alta Performance",
    description:
      "Estúdio digital focado em experiências web de alto impacto, arquitetura moderna, design de precisão e engenharia de refração.",
    path: "/",
  });
}

export default function Home() {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(
    typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("menu") === "true",
  );
  const [briefingOpen, setBriefingOpen] = useState(
    typeof window !== "undefined" &&
      (new URLSearchParams(window.location.search).get("briefing") === "true" ||
        window.location.hash === "#briefing"),
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem("fluorite_lang");
      if (saved === "pt" || saved === "en") {
        setLang(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleToggleLang = () => {
    const nextLang = lang === "pt" ? "en" : "pt";
    setLang(nextLang);
    try {
      localStorage.setItem("fluorite_lang", nextLang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const copy = {
    pt: {
      overline: "PRODUTOS DIGITAIS PARA UM AMANHÃ MAIS BRILHANTE",
      headlineLead: "Ideias, ",
      headlineGradient: "refratadas",
      headlineLine2: "em experiências",
      headlineLine3: "digitais.",
      support:
        "Criamos websites de alto impacto para empresas que buscam diferenciação, escala e conversão.",
      ctaPrimary: "Começar agora",
      ctaHeader: "Começar agora",
      nav: [
        { label: "Work", href: "#work" },
        { label: "Serviços", href: "#services" },
        { label: "Processo", href: "#process" },
        { label: "Journal", href: "#journal" },
      ],
      microLabels: ["CLAREZA", "INOVAÇÃO", "EXPLORAÇÃO", "IMPACTO REAL"],
      scroll: "SCROLL",
      services: [
        { num: "01", title: "ESTRATÉGIA", desc: "Da ideia à oportunidade." },
        { num: "02", title: "DESIGN", desc: "Interfaces que inspiram." },
        {
          num: "03",
          title: "DESENVOLVIMENTO",
          desc: "Websites de alta performance.",
        },
        {
          num: "04",
          title: "CRESCIMENTO",
          desc: "Experiências que convertem.",
        },
      ],
      exploreWork: "EXPLORAR",
      ourWorks: "PROJETOS —",
      whyUs: {
        overline: "FILOSOFIA EDITORIAL",
        headline: "Um bom produto digital deve receber bem.",
        body: "Assim como um espaço impecável e um anfitrião atencioso fazem uma pessoa querer permanecer e retornar, construímos experiências digitais sem atrito, claras e memoráveis. Criamos websites com refinamento arquitetural que transmitem solidez imediata, geram valor sustentável ao seu negócio e transformam curiosos em clientes fiéis.",
        highlightLead: "Sem atritos desnecessários.",
        highlightSub: "Clareza que gera confiança e conversão natural.",
      },
      servicesSection: {
        overline: "02 — CAPACIDADES & SERVIÇOS",
        headline: "Soluções digitais com propósito, arquitetura e escala.",
        support:
          "Do posicionamento institucional a páginas de alta conversão, cada projeto recebe atenção artesanal e engenharia de precisão.",
        items: [
          {
            num: "01",
            title: "Site institucional",
            desc: "Posicione sua marca com autoridade inquestionável, arquitetura moderna e experiência imersiva que gera confiança imediata e capta oportunidades comerciais de alto valor.",
            href: "/servicos/site-institucional",
            badge: "Presença & Autoridade",
          },
          {
            num: "02",
            title: "Landing page",
            desc: "Página cirurgicamente focada em uma campanha ou objetivo específico de conversão, combinando velocidade de carregamento, persuasão visual e ausência de ruído.",
            href: "/servicos/landing-page",
            badge: "Conversão Direta",
          },
          {
            num: "03",
            title: "Página de produto ou serviço",
            desc: "Apresentação envolvente e detalhada de ofertas de alta complexidade, traduzindo diferenciais técnicos em valor tangível para o cliente.",
            href: "/servicos/pagina-de-produto",
            badge: "Aprofundamento",
          },
          {
            num: "04",
            title: "SEO",
            desc: "Otimização técnica aprofundada, dados estruturados JSON-LD, Core Web Vitals impecáveis e arquitetura de conteúdo para indexação e relevância orgânica consistente.",
            href: "/servicos/seo",
            badge: "Relevância Técnica",
          },
        ],
        complementaryLabel: "INFRAESTRUTURA COMPLEMENTAR",
        complementaryText:
          "Hospedagem global em Cloudflare Edge e implantação contínua automatizada inclusas como padrão arquitetural em todas as entregas.",
      },
      workSection: {
        overline: "03 — WORK SELECIONADO",
        headline: "Projetos construídos para impressionar e converter.",
        support:
          "Uma curadoria de experiências digitais com arquitetura sólida, refinamento estético e obsessão por detalhes funcionais.",
        viewAll: "Ver todos os projetos",
        conceptBadge: "CONCEITO",
        projects: [
          {
            num: "01",
            slug: "aethel-architecture",
            title: "Aethel Architecture Studio",
            category: "Arquitetura & Design Espacial",
            summary:
              "Posicionamento monolítico e experiência editorial imersiva para prática de arquitetura contemporânea e engenharia de precisão.",
            image: "/images/work-aethel.webp",
            href: "/work/aethel-architecture",
            year: "2026",
          },
          {
            num: "02",
            slug: "lumena-health",
            title: "Lumena Integrative Health",
            category: "Saúde & Biotecnologia",
            summary:
              "Interface acolhedora com refração fluida, transmitindo rigor clínico e tranquilidade para medicina diagnóstica de alta complexidade.",
            image: "/images/work-lumena.webp",
            href: "/work/lumena-health",
            year: "2026",
          },
          {
            num: "03",
            slug: "vektor-robotics",
            title: "Vektor Precision Robotics",
            category: "Robótica & Indústria B2B",
            summary:
              "Autoridade técnica inquestionável e telemetria visual precisa para fabricante líder em atuadores robóticos industriais.",
            image: "/images/work-vektor.webp",
            href: "/work/vektor-robotics",
            year: "2026",
          },
        ],
      },
      processSection: {
        overline: "04 — NOSSO PROCESSO",
        headline: "Do primeiro diálogo ao lançamento, com clareza.",
        support:
          "Um método fluido e sem burocracia, desenhado para que você acompanhe a evolução com total tranquilidade.",
        steps: [
          {
            num: "01",
            title: "Conversamos",
            desc: "Alinhamos seus objetivos comerciais, público-alvo e visão em uma conversa direta e sem jargões desnecessários.",
          },
          {
            num: "02",
            title: "Entendemos",
            desc: "Mapeamos suas oportunidades e o que torna sua oferta verdadeiramente única e desejável no mercado.",
          },
          {
            num: "03",
            title: "Planejamos",
            desc: "Estruturamos a arquitetura de informação, caminhos de conversão e hierarquia editorial sob medida.",
          },
          {
            num: "04",
            title: "Criamos",
            desc: "Desenvolvemos o design de precisão e a engenharia de alta performance com refração estética e velocidade incomparável.",
          },
          {
            num: "05",
            title: "Publicamos",
            desc: "Realizamos testes minuciosos de performance e colocamos seu produto no ar com infraestrutura global Cloudflare.",
          },
        ],
      },
      trustSection: {
        overline: "05 — CRITÉRIOS DE RIGOR",
        headline: "Engenharia sem atalhos. Confiança comprovada na prática.",
        support:
          "Nossa credibilidade é construída na qualidade observável da entrega: performance extrema, código limpo e compromisso irrestrito com cada padrão técnico.",
        pillars: [
          {
            num: "01",
            title: "Velocidade & Core Web Vitals",
            desc: "Arquitetura edge-native no Cloudflare, tempo de carregamento no percentil 99 e notas máximas nos índices de experiência do usuário.",
            tag: "EDGE NATIVE / SUB-100MS",
          },
          {
            num: "02",
            title: "Design de Precisão & Acessibilidade",
            desc: "Direção visual de luxo técnico com contraste auditado (WCAG AAA), hierarquia semântica e suporte integral a navegação por teclado.",
            tag: "WCAG AAA / SEMANTIC HTML5",
          },
          {
            num: "03",
            title: "Arquitetura Moderna & Escalável",
            desc: "Stack moderna e resiliente: React Router SSR, TypeScript estrito, Neon PostgreSQL serverless e Cloudflare Workers.",
            tag: "TYPESCRIPT / ZERO BLOAT",
          },
          {
            num: "04",
            title: "Transparência & Propriedade Total",
            desc: "Comunicação direta, escopo transparente sem surpresas comerciais e código-fonte que pertence 100% à sua empresa.",
            tag: "100% OWNERSHIP / ZERO LOCK-IN",
          },
        ],
      },
      journalSection: {
        overline: "06 — FLUOR JOURNAL",
        headline: "Ideias e reflexões sobre engenharia, design e conversão.",
        support:
          "Ensaios editoriais sobre arquitetura de software, posicionamento e experiência do usuário no ambiente digital contemporâneo.",
        viewAll: "Explorar o Journal",
        articles: [
          {
            num: "01",
            category: "ESTRATÉGIA & DECISÃO",
            title: "Site institucional ou landing page: qual faz sentido para sua empresa?",
            excerpt:
              "Entenda os pontos de inflexão entre presença institucional de longo prazo e campanhas táticas de conversão direta.",
            href: "/journal/site-institucional-ou-landing-page",
            readTime: "4 min",
            date: "MAR 2026",
          },
          {
            num: "02",
            category: "INDÚSTRIA & B2B",
            title: "O que o site de uma indústria B2B precisa mostrar para gerar confiança?",
            excerpt:
              "Como telemetria visual, especificações técnicas claras e hierarquia de autoridade aceleram ciclos complexos de negociação.",
            href: "/journal/site-industria-b2b-confianca",
            readTime: "6 min",
            date: "MAR 2026",
          },
          {
            num: "03",
            category: "UX & PERFORMANCE",
            title: "Por que sites visualmente atraentes ainda podem converter mal?",
            excerpt:
              "A fronteira entre estética superficial e arquitetura de decisão desenhada para a psicologia do visitante.",
            href: "/journal/por-que-sites-bonitos-nao-convertem",
            readTime: "5 min",
            date: "FEV 2026",
          },
        ],
      },
      footerSection: {
        headline: "Pronto para refratar suas ideias em um produto digital único?",
        subheadline:
          "Inicie seu projeto com arquitetura de alta performance, design de precisão e entrega sem atrito.",
        cta: "Começar agora",
        emailLabel: "CONTATO DIRETO",
        email: "hello@fluoritelabs.com",
        rights: "© 2026 Fluorite Labs. Todos os direitos reservados.",
        legal: [
          { label: "Privacidade", href: "/privacidade" },
          { label: "Termos", href: "/termos" },
          { label: "Cookies", href: "/cookies" },
        ],
      },
    },
    en: {
      overline: "DIGITAL PRODUCTS FOR A BRIGHTER TOMORROW",
      headlineLead: "Ideas, ",
      headlineGradient: "refracted",
      headlineLine2: "into digital",
      headlineLine3: "experiences.",
      support:
        "We build high-impact websites for companies that want to stand out, scale and convert.",
      ctaPrimary: "Start a project",
      ctaHeader: "Start a project",
      nav: [
        { label: "Work", href: "#work" },
        { label: "Services", href: "#services" },
        { label: "Process", href: "#process" },
        { label: "Journal", href: "#journal" },
      ],
      microLabels: ["CLARITY", "INNOVATION", "EXPLORATION", "REAL IMPACT"],
      scroll: "SCROLL",
      services: [
        { num: "01", title: "STRATEGY", desc: "From idea to opportunity." },
        { num: "02", title: "DESIGN", desc: "Interfaces that inspire." },
        {
          num: "03",
          title: "DEVELOPMENT",
          desc: "High-performance websites.",
        },
        { num: "04", title: "GROWTH", desc: "Digital experiences that convert." },
      ],
      exploreWork: "EXPLORE",
      ourWorks: "OUR WORKS —",
      whyUs: {
        overline: "EDITORIAL PHILOSOPHY",
        headline: "A great digital product should welcome its visitors.",
        body: "Just as an impeccably curated space and a thoughtful host make someone want to stay and return, we engineer frictionless, crystal-clear, and memorable digital experiences. Websites crafted with architectural precision that inspire instant trust, deliver lasting value for your business, and turn visitors into loyal clients.",
        highlightLead: "Zero unnecessary friction.",
        highlightSub: "Clarity that breeds trust and effortless conversion.",
      },
      servicesSection: {
        overline: "02 — CAPABILITIES & SERVICES",
        headline: "Digital solutions crafted for purpose, architecture, and scale.",
        support:
          "From institutional positioning to high-converting landing pages, each project receives handcrafted design and cutting-edge engineering.",
        items: [
          {
            num: "01",
            title: "Corporate website",
            desc: "Position your brand with unmistakable authority, modern architecture, and an immersive experience that commands instant trust and captures high-value opportunities.",
            href: "/servicos/site-institucional",
            badge: "Presence & Authority",
          },
          {
            num: "02",
            title: "Landing page",
            desc: "Surgically focused on a specific campaign or conversion goal, fusing instant load times, visual clarity, and frictionless decision paths.",
            href: "/servicos/landing-page",
            badge: "Direct Conversion",
          },
          {
            num: "03",
            title: "Product or service page",
            desc: "Immersive and thorough presentation for complex solutions, translating technical depth into compelling commercial clarity.",
            href: "/servicos/pagina-de-produto",
            badge: "In-Depth Showcase",
          },
          {
            num: "04",
            title: "SEO",
            desc: "Deep technical search engine optimization, JSON-LD structured schema, flawless Core Web Vitals, and semantic hierarchy for lasting organic visibility.",
            href: "/servicos/seo",
            badge: "Technical Reach",
          },
        ],
        complementaryLabel: "COMPLEMENTARY INFRASTRUCTURE",
        complementaryText:
          "Ultra-low-latency global hosting on Cloudflare Edge and continuous automated deployment included as baseline architectural standards.",
      },
      workSection: {
        overline: "03 — SELECTED WORK",
        headline: "Projects engineered to inspire and convert.",
        support:
          "A curated collection of digital experiences featuring architectural solidity, aesthetic refinement, and obsession with functional detail.",
        viewAll: "View all projects",
        conceptBadge: "CONCEPT",
        projects: [
          {
            num: "01",
            slug: "aethel-architecture",
            title: "Aethel Architecture Studio",
            category: "Architecture & Spatial Design",
            summary:
              "Monolithic positioning and immersive editorial experience for contemporary architecture and precision spatial practice.",
            image: "/images/work-aethel.webp",
            href: "/work/aethel-architecture",
            year: "2026",
          },
          {
            num: "02",
            slug: "lumena-health",
            title: "Lumena Integrative Health",
            category: "Health & Biotechnology",
            summary:
              "Welcoming interface with fluid light refraction, blending clinical rigor with serene calm for advanced medical care.",
            image: "/images/work-lumena.webp",
            href: "/work/lumena-health",
            year: "2026",
          },
          {
            num: "03",
            slug: "vektor-robotics",
            title: "Vektor Precision Robotics",
            category: "Robotics & High-Ticket B2B",
            summary:
              "Unmistakable technical authority and precision visual telemetry for an industrial leader in robotic automation.",
            image: "/images/work-vektor.webp",
            href: "/work/vektor-robotics",
            year: "2026",
          },
        ],
      },
      processSection: {
        overline: "04 — OUR PROCESS",
        headline: "From first dialogue to launch, with complete clarity.",
        support:
          "A frictionless, straightforward methodology designed so you can follow progress with ease and total predictability.",
        steps: [
          {
            num: "01",
            title: "We talk",
            desc: "We align on your business goals, target audience, and brand vision in a direct conversation with zero jargon.",
          },
          {
            num: "02",
            title: "We understand",
            desc: "We map your true commercial opportunities and pinpoint what makes your offering unique and compelling.",
          },
          {
            num: "03",
            title: "We plan",
            desc: "We structure information architecture, conversion funnels, and tailored editorial hierarchy.",
          },
          {
            num: "04",
            title: "We create",
            desc: "We build precision design and high-performance engineering with distinct aesthetic refraction and blazing speed.",
          },
          {
            num: "05",
            title: "We publish",
            desc: "We execute rigorous quality validation and launch your digital product on high-availability global Cloudflare infrastructure.",
          },
        ],
      },
      trustSection: {
        overline: "05 — STANDARDS OF RIGOR",
        headline: "Engineering without shortcuts. Trust earned in practice.",
        support:
          "Our credibility is built on observable quality: extreme performance, clean code, and uncompromising adherence to modern technical standards.",
        pillars: [
          {
            num: "01",
            title: "Speed & Core Web Vitals",
            desc: "Edge-native Cloudflare architecture, 99th-percentile load times, and top-tier metrics across Google's Core Web Vitals.",
            tag: "EDGE NATIVE / SUB-100MS",
          },
          {
            num: "02",
            title: "Precision Design & Accessibility",
            desc: "Technical luxury aesthetic with WCAG AAA contrast compliance, strict semantic hierarchy, and full keyboard accessibility.",
            tag: "WCAG AAA / SEMANTIC HTML5",
          },
          {
            num: "03",
            title: "Modern & Scalable Architecture",
            desc: "Resilient future-proof stack: React Router SSR, strict TypeScript, serverless Neon PostgreSQL, and Cloudflare Workers.",
            tag: "TYPESCRIPT / ZERO BLOAT",
          },
          {
            num: "04",
            title: "Transparency & Complete Ownership",
            desc: "Direct communication, transparent scope with zero commercial gimmicks, and clean codebase owned 100% by your team.",
            tag: "100% OWNERSHIP / ZERO LOCK-IN",
          },
        ],
      },
      journalSection: {
        overline: "06 — FLUOR JOURNAL",
        headline: "Perspectives on engineering, aesthetics, and conversion.",
        support:
          "Editorial essays dissecting software architecture, strategic positioning, and user experience in modern digital environments.",
        viewAll: "Explore the Journal",
        articles: [
          {
            num: "01",
            category: "STRATEGY & DECISION",
            title: "Corporate website or landing page: which makes sense for your business?",
            excerpt:
              "Understanding the strategic trade-offs between enduring institutional authority and high-velocity tactical conversion funnels.",
            href: "/journal/site-institucional-ou-landing-page",
            readTime: "4 min",
            date: "MAR 2026",
          },
          {
            num: "02",
            category: "INDUSTRY & B2B",
            title: "What must an industrial B2B website demonstrate to build instant trust?",
            excerpt:
              "How visual telemetry, rigorous technical specifications, and architectural clarity shorten high-ticket sales cycles.",
            href: "/journal/site-industria-b2b-confianca",
            readTime: "6 min",
            date: "MAR 2026",
          },
          {
            num: "03",
            category: "UX & PERFORMANCE",
            title: "Why aesthetically polished websites can still suffer from poor conversion",
            excerpt:
              "The critical boundary between decorative visual polish and cognitive decision architecture designed for user trust.",
            href: "/journal/por-que-sites-bonitos-nao-convertem",
            readTime: "5 min",
            date: "FEB 2026",
          },
        ],
      },
      footerSection: {
        headline: "Ready to refract your ideas into a standout digital product?",
        subheadline:
          "Start your project with high-performance architecture, precision design, and frictionless execution.",
        cta: "Start a project",
        emailLabel: "DIRECT INQUIRIES",
        email: "hello@fluoritelabs.com",
        rights: "© 2026 Fluorite Labs. All rights reserved.",
        legal: [
          { label: "Privacy", href: "/privacidade" },
          { label: "Terms", href: "/termos" },
          { label: "Cookies", href: "/cookies" },
        ],
      },
    },
  }[lang];

  return (
    <main className="relative min-h-screen w-full bg-[var(--color-obsidian-black)] text-[var(--color-soft-white)] font-body overflow-x-hidden selection:bg-[var(--color-fluorite-violet)] selection:text-white">
      {/* Structured Data: Organization (SEO-003) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
      />

      {/* Hero Fold Section (VIS-004 / VIS-007 / PUB-001) */}
      <section
        id="hero"
        className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden"
      >
        {/* Background Graphic Canvas: High-Resolution Clean Fluorite Cluster */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <img
            src="/images/hero-clean.webp"
            alt="Fluorite Labs 3D Crystal Cluster"
            className="w-full h-full object-cover object-[75%_center] md:object-center"
            width={1536}
            height={1024}
          />
          {/* Subtle atmospheric vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-obsidian-black)] via-transparent to-transparent opacity-60" />
          {/* Mobile readability scrim: preserves crystal atmosphere while guaranteeing AAA contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-obsidian-black)]/80 via-[var(--color-obsidian-black)]/50 to-[var(--color-obsidian-black)]/90 md:hidden pointer-events-none" />
        </div>

        {/* Main Content Layout */}
        <div className="relative z-10 flex flex-col justify-between min-h-screen max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 pt-8 pb-10">
          {/* Top Header Navigation */}
          <header className="flex items-center justify-between w-full">
            {/* Brand Wordmark */}
            <a
              href="/"
              className="group flex flex-col focus:outline-none"
              aria-label="Fluorite Labs Home"
            >
              <span className="font-display font-medium text-[1.125rem] tracking-[0.24em] text-soft-white group-hover:text-crystal-lilac transition-colors duration-300 leading-none">
                FLUORITE
              </span>
              <span className="font-display font-medium text-[0.625rem] tracking-[0.42em] text-muted-silver mt-1.5 leading-none">
                LABS
              </span>
            </a>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-10" aria-label="Navegação Principal">
              {copy.nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[0.9375rem] font-normal text-muted-silver hover:text-soft-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-lilac/70 rounded-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Header Actions: Language Switcher + Pill CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleLang}
                className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-muted-silver hover:text-soft-white border border-white/10 hover:border-white/20 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-lilac/70 cursor-pointer"
                title="Alternar idioma / Switch language"
              >
                {lang.toUpperCase()}
              </button>

              <button
                type="button"
                onClick={() => setBriefingOpen(true)}
                className="hidden sm:inline-flex glass-pill px-6 py-2.5 text-[0.875rem] font-medium text-soft-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-lilac/70 cursor-pointer"
              >
                <span>{copy.ctaHeader}</span>
                <span className="text-xs font-light">↗</span>
              </button>

              {/* Mobile Menu Toggle Button (VIS-007) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full border border-white/10 text-soft-white hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-lilac/70"
                aria-label="Abrir menu de navegação"
                aria-expanded={mobileMenuOpen}
                id="mobile-menu-toggle"
              >
                <span
                  className={`w-4 h-[1.5px] bg-white transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[2px]" : "-translate-y-1"}`}
                />
                <span
                  className={`w-4 h-[1.5px] bg-white transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[2px]" : "translate-y-1"}`}
                />
              </button>
            </div>
          </header>

          {/* Mobile Fullscreen Drawer Navigation (VIS-007) */}
          {mobileMenuOpen && (
            <div
              id="mobile-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu principal"
              className="fixed inset-0 z-50 bg-[var(--color-obsidian-black)]/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden transition-opacity duration-300"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div className="flex flex-col">
                  <span className="font-display font-medium text-lg tracking-[0.24em] text-soft-white leading-none">
                    FLUORITE
                  </span>
                  <span className="font-display font-medium text-[10px] tracking-[0.42em] text-muted-silver mt-1.5 leading-none">
                    LABS
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-soft-white hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-lilac/70"
                  aria-label="Fechar menu"
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-col gap-6 my-auto text-left py-8">
                {copy.nav.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-display font-medium text-soft-white hover:text-crystal-lilac transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-lilac/70"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setBriefingOpen(true);
                  }}
                  className="btn-primary-pill w-full text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-lilac/70 cursor-pointer"
                >
                  <span>{copy.ctaHeader}</span>
                  <span>↗</span>
                </button>
                <div className="flex items-center justify-between pt-2 text-xs text-muted-silver">
                  <span>IDIOMA</span>
                  <button
                    type="button"
                    onClick={handleToggleLang}
                    className="px-3 py-1 font-mono rounded-full border border-white/20 text-white cursor-pointer"
                  >
                    {lang.toUpperCase()}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Hero Middle Section: Headline, Copy, CTA & Micro Elements */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-12 lg:py-16">
            {/* Left Column: Overline, Headline, Support Copy & Primary CTA */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left max-w-2xl">
              {/* Overline with fine horizontal rule */}
              <div className="flex items-center gap-3.5 mb-6">
                <span className="w-8 h-[1px] bg-muted-silver/40 inline-block" />
                <span className="text-micro-overline text-muted-silver font-medium">
                  {copy.overline}
                </span>
              </div>

              {/* Monumental Headline */}
              <h1 className="text-display-xl text-soft-white tracking-tight mb-8">
                <span className="whitespace-nowrap">
                  {copy.headlineLead}
                  <span className="text-refraction-gradient">{copy.headlineGradient}</span>
                </span>
                <br />
                {copy.headlineLine2}
                <br />
                {copy.headlineLine3}
              </h1>

              {/* Compact Support Copy */}
              <p className="text-body-regular text-muted-silver max-w-[480px] mb-10 leading-relaxed font-light">
                {copy.support}
              </p>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={() => setBriefingOpen(true)}
                className="btn-primary-pill group cursor-pointer"
                id="hero-primary-cta"
              >
                <span>{copy.ctaPrimary}</span>
                <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </button>
            </div>

            {/* Right Column: Microelement Lines & Scroll Indicator */}
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 flex-col justify-between items-end h-full self-stretch pointer-events-none pl-8">
              {/* Micro Labels with delicate vertical line */}
              <div className="flex items-start gap-4 mr-2">
                <div className="w-[1px] h-28 bg-white/20" />
                <div className="flex flex-col gap-2.5 text-[10px] tracking-[0.25em] text-muted-silver uppercase font-mono">
                  {copy.microLabels.map((lbl) => (
                    <span key={lbl}>{lbl}</span>
                  ))}
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="flex flex-col items-center gap-3 mr-6 mb-2">
                <span className="text-[10px] tracking-[0.3em] text-muted-silver uppercase font-mono">
                  {copy.scroll}
                </span>
                <div className="w-[1px] h-10 bg-white/30" />
              </div>
            </div>
          </div>

          {/* Bottom Integrated Strip: 4 Service Steps & Explore Works Thumbnail */}
          <footer className="w-full pt-8 border-t border-white/5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              {/* 4 Service Columns */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12 flex-1">
                {copy.services.map((svc) => (
                  <div key={svc.num} className="flex flex-col text-left">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-micro-overline text-muted-silver/70 font-mono">
                        {svc.num}
                      </span>
                      <span className="w-3 h-[1px] bg-muted-silver/30" />
                      <span className="text-[11px] tracking-[0.18em] font-medium text-soft-white uppercase">
                        {svc.title}
                      </span>
                    </div>
                    <p className="text-[13px] text-muted-silver/80 font-light leading-snug">
                      {svc.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Far Right: Work Explore Interactive Thumbnail */}
              <a
                href="#work"
                className="group flex items-center gap-4 text-left self-start lg:self-auto pl-0 lg:pl-6 border-l-0 lg:border-l border-white/10 focus:outline-none"
                aria-label="Explorar nossos trabalhos"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 group-hover:border-white/50 group-focus:border-crystal-lilac transition-all duration-300 shadow-[0_0_15px_rgba(140,114,255,0.15)]">
                  <img
                    src="/images/work-preview-thumb.webp"
                    alt="Explore works thumbnail"
                    className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] tracking-[0.25em] text-muted-silver uppercase font-mono">
                    {copy.exploreWork}
                  </span>
                  <span className="text-xs tracking-[0.18em] text-soft-white font-medium uppercase group-hover:text-emerald-teal transition-colors">
                    {copy.ourWorks}
                  </span>
                </div>
              </a>
            </div>
          </footer>
        </div>
      </section>

      {/* Section: Por que Fluorite Labs (PUB-002) */}
      <section
        id="why-fluorite"
        aria-labelledby="why-fluorite-title"
        className="relative w-full py-28 sm:py-36 md:py-44 border-t border-white/5 bg-[var(--color-obsidian-black)]"
      >
        {/* Subtle ambient refraction backdrops */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[var(--color-fluorite-violet)]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[var(--color-ice-cyan)]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16">
          {/* Editorial overline */}
          <div className="flex items-center gap-3.5 mb-8">
            <span className="w-8 h-[1px] bg-muted-silver/40 inline-block" />
            <span className="text-micro-overline text-muted-silver font-medium">
              {copy.whyUs.overline}
            </span>
          </div>

          {/* Asymmetrical Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Dominant Idea (H2) */}
            <div className="lg:col-span-7 xl:col-span-8">
              <h2
                id="why-fluorite-title"
                className="font-display font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-soft-white tracking-tight leading-[1.12]"
              >
                {copy.whyUs.headline}
              </h2>
            </div>

            {/* Editorial Support Copy & Micro Quote */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between pt-2">
              <p className="text-base sm:text-lg text-muted-silver/90 font-light leading-relaxed mb-10">
                {copy.whyUs.body}
              </p>

              {/* Editorial Accent Quote Lockup: pure typographic refinement without boxy containers or bullet lists */}
              <div className="border-l border-white/15 pl-6 flex flex-col gap-1">
                <span className="text-sm font-medium text-soft-white tracking-wide">
                  {copy.whyUs.highlightLead}
                </span>
                <span className="text-xs text-muted-silver font-light">
                  {copy.whyUs.highlightSub}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Serviços (PUB-003) */}
      <section
        id="services"
        aria-labelledby="services-title"
        className="relative w-full py-28 sm:py-36 md:py-44 border-t border-white/5 bg-[var(--color-obsidian-black)]"
      >
        {/* Ambient atmospheric refraction */}
        <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-[var(--color-emerald-teal)]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16">
          {/* Section Editorial Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24 pb-8 border-b border-white/10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3.5 mb-6">
                <span className="w-8 h-[1px] bg-muted-silver/40 inline-block" />
                <span className="text-micro-overline text-muted-silver font-medium">
                  {copy.servicesSection.overline}
                </span>
              </div>
              <h2
                id="services-title"
                className="font-display font-medium text-3xl sm:text-4xl md:text-5xl text-soft-white tracking-tight leading-tight"
              >
                {copy.servicesSection.headline}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-muted-silver/80 font-light max-w-md leading-relaxed">
              {copy.servicesSection.support}
            </p>
          </div>

          {/* Editorial Services List: high-craft linear typography layout with dividers */}
          <div className="flex flex-col divide-y divide-white/10">
            {copy.servicesSection.items.map((svc) => (
              <a
                key={svc.num}
                href={svc.href}
                className="group py-10 sm:py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-300 hover:pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-lilac/70 rounded-lg"
              >
                <div className="flex items-start sm:items-center gap-6 lg:w-1/3">
                  <span className="text-sm font-mono text-muted-silver/60 group-hover:text-crystal-lilac transition-colors">
                    {svc.num}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-soft-white group-hover:text-crystal-lilac transition-colors">
                      {svc.title}
                    </h3>
                    <span className="inline-block mt-2 text-[10px] tracking-widest uppercase font-mono px-2.5 py-0.5 rounded-full border border-white/10 text-muted-silver group-hover:border-white/20 transition-colors">
                      {svc.badge}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-muted-silver/80 font-light leading-relaxed lg:max-w-xl flex-1">
                  {svc.desc}
                </p>

                <div className="self-end lg:self-center flex items-center justify-center w-11 h-11 rounded-full border border-white/15 text-soft-white group-hover:border-crystal-lilac group-hover:bg-white/5 transition-all duration-300">
                  <span className="text-sm font-light transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Complementary Services Editorial Note */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-muted-silver">
              <span className="w-2 h-2 rounded-full bg-emerald-teal inline-block" />
              <span>{copy.servicesSection.complementaryLabel}</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-silver/70 font-light max-w-2xl">
              {copy.servicesSection.complementaryText}
            </p>
          </div>
        </div>
      </section>

      {/* Section: Selected Work Preview (PUB-004) */}
      <section
        id="work"
        aria-labelledby="work-title"
        className="relative w-full py-28 sm:py-36 md:py-44 border-t border-white/5 bg-[var(--color-obsidian-black)]"
      >
        {/* Ambient atmospheric refraction */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[var(--color-fluorite-violet)]/8 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-[var(--color-emerald-teal)]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16">
          {/* Section Editorial Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24 pb-8 border-b border-white/10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3.5 mb-6">
                <span className="w-8 h-[1px] bg-muted-silver/40 inline-block" />
                <span className="text-micro-overline text-muted-silver font-medium">
                  {copy.workSection.overline}
                </span>
              </div>
              <h2
                id="work-title"
                className="font-display font-medium text-3xl sm:text-4xl md:text-5xl text-soft-white tracking-tight leading-tight"
              >
                {copy.workSection.headline}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <p className="text-sm sm:text-base text-muted-silver/80 font-light max-w-sm leading-relaxed">
                {copy.workSection.support}
              </p>
              <a
                href="#contact"
                className="glass-pill px-6 py-2.5 text-[0.875rem] font-medium text-soft-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 inline-flex items-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-lilac/70"
              >
                <span>{copy.workSection.viewAll}</span>
                <span className="text-xs font-light">↗</span>
              </a>
            </div>
          </div>

          {/* Three Concept Projects Showcase */}
          <div className="flex flex-col space-y-20 lg:space-y-28">
            {copy.workSection.projects.map((project) => (
              <a
                key={project.slug}
                href={project.href}
                className="group flex flex-col gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-lilac/70 rounded-2xl"
              >
                {/* Immersive Widescreen Visual Container */}
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/8] rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/30 transition-all duration-500 shadow-2xl bg-[var(--color-deep-charcoal)]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    width={1440}
                    height={810}
                    loading="lazy"
                  />
                  {/* Subtle edge vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-obsidian-black)]/70 via-transparent to-[var(--color-obsidian-black)]/30 pointer-events-none" />

                  {/* Top floating metadata badges */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full border border-white/20 bg-[var(--color-obsidian-black)]/80 text-[10px] tracking-[0.22em] font-mono text-soft-white uppercase backdrop-blur-md">
                      {copy.workSection.conceptBadge}
                    </span>
                    <span className="px-3 py-1 rounded-full border border-white/10 bg-[var(--color-obsidian-black)]/60 text-[10px] font-mono text-muted-silver backdrop-blur-md">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Editorial Project Info Footer */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
                  <div className="flex flex-col gap-1.5 lg:w-5/12">
                    <span className="text-[11px] tracking-[0.2em] uppercase font-mono text-crystal-lilac/90">
                      {project.category}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-soft-white group-hover:text-crystal-lilac transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-muted-silver/80 font-light leading-relaxed lg:max-w-xl flex-1">
                    {project.summary}
                  </p>

                  <div className="self-end lg:self-center flex items-center justify-center w-11 h-11 rounded-full border border-white/15 text-soft-white group-hover:border-crystal-lilac group-hover:bg-white/5 transition-all duration-300">
                    <span className="text-sm font-light transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Nosso Processo (PUB-005) */}
      <section
        id="process"
        aria-labelledby="process-title"
        className="relative w-full py-28 sm:py-36 md:py-44 border-t border-white/5 bg-[var(--color-obsidian-black)]"
      >
        {/* Ambient atmospheric refraction */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--color-fluorite-violet)]/6 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16">
          {/* Section Editorial Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24 pb-8 border-b border-white/10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3.5 mb-6">
                <span className="w-8 h-[1px] bg-muted-silver/40 inline-block" />
                <span className="text-micro-overline text-muted-silver font-medium">
                  {copy.processSection.overline}
                </span>
              </div>
              <h2
                id="process-title"
                className="font-display font-medium text-3xl sm:text-4xl md:text-5xl text-soft-white tracking-tight leading-tight"
              >
                {copy.processSection.headline}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-muted-silver/80 font-light max-w-md leading-relaxed">
              {copy.processSection.support}
            </p>
          </div>

          {/* 5-Step Process Sequence (Customer-centric, editorial linear flow) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {copy.processSection.steps.map((step) => (
              <div
                key={step.num}
                className="group relative flex flex-col justify-between pt-6 border-t border-white/15 hover:border-crystal-lilac/60 transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-muted-silver/60 group-hover:text-crystal-lilac transition-colors">
                      {step.num}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-crystal-lilac transition-colors" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-soft-white mb-3 group-hover:text-crystal-lilac transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-silver/80 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Critérios de Rigor / Reforços de Confiança (PUB-006) */}
      <section
        id="standards"
        aria-labelledby="standards-title"
        className="relative w-full py-28 sm:py-36 md:py-44 border-t border-white/5 bg-[var(--color-obsidian-black)]"
      >
        {/* Ambient atmospheric refraction */}
        <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-[var(--color-emerald-teal)]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[var(--color-fluorite-violet)]/6 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16">
          {/* Section Editorial Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24 pb-8 border-b border-white/10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3.5 mb-6">
                <span className="w-8 h-[1px] bg-muted-silver/40 inline-block" />
                <span className="text-micro-overline text-muted-silver font-medium">
                  {copy.trustSection.overline}
                </span>
              </div>
              <h2
                id="standards-title"
                className="font-display font-medium text-3xl sm:text-4xl md:text-5xl text-soft-white tracking-tight leading-tight"
              >
                {copy.trustSection.headline}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-muted-silver/80 font-light max-w-md leading-relaxed">
              {copy.trustSection.support}
            </p>
          </div>

          {/* 4 Pillars Grid (No fabricated social proof, 100% technical and operational transparency) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
            {copy.trustSection.pillars.map((pillar) => (
              <div
                key={pillar.num}
                className="group relative flex flex-col justify-between pt-6 border-t border-white/15 hover:border-crystal-lilac/60 transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-muted-silver/60 group-hover:text-crystal-lilac transition-colors">
                      {pillar.num}
                    </span>
                    <span className="text-[10px] tracking-widest font-mono text-crystal-lilac/80 uppercase px-2.5 py-0.5 rounded-full border border-white/10 group-hover:border-white/20 transition-colors">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-soft-white mb-3 group-hover:text-crystal-lilac transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-silver/80 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: FLUOR JOURNAL Preview (PUB-007) */}
      <section
        id="journal"
        aria-labelledby="journal-title"
        className="relative w-full py-28 sm:py-36 md:py-44 border-t border-white/5 bg-[var(--color-obsidian-black)]"
      >
        {/* Ambient atmospheric refraction */}
        <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[var(--color-crystal-lilac)]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16">
          {/* Section Editorial Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24 pb-8 border-b border-white/10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3.5 mb-6">
                <span className="w-8 h-[1px] bg-muted-silver/40 inline-block" />
                <span className="text-micro-overline text-muted-silver font-medium">
                  {copy.journalSection.overline}
                </span>
              </div>
              <h2
                id="journal-title"
                className="font-display font-medium text-3xl sm:text-4xl md:text-5xl text-soft-white tracking-tight leading-tight"
              >
                {copy.journalSection.headline}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <p className="text-sm sm:text-base text-muted-silver/80 font-light max-w-sm leading-relaxed">
                {copy.journalSection.support}
              </p>
              <a
                href="#journal"
                className="glass-pill px-6 py-2.5 text-[0.875rem] font-medium text-soft-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 inline-flex items-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-lilac/70"
              >
                <span>{copy.journalSection.viewAll}</span>
                <span className="text-xs font-light">↗</span>
              </a>
            </div>
          </div>

          {/* 3 Editorial Articles List (Non-generic blog layout) */}
          <div className="flex flex-col divide-y divide-white/10">
            {copy.journalSection.articles.map((article) => (
              <a
                key={article.num}
                href={article.href}
                className="group py-10 sm:py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-300 hover:pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-lilac/70 rounded-lg"
              >
                <div className="flex items-start sm:items-center gap-6 lg:w-4/12">
                  <span className="text-sm font-mono text-muted-silver/60 group-hover:text-crystal-lilac transition-colors">
                    {article.num}
                  </span>
                  <div>
                    <span className="inline-block mb-2 text-[10px] tracking-widest uppercase font-mono text-crystal-lilac/90">
                      {article.category}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-soft-white group-hover:text-crystal-lilac transition-colors leading-snug">
                      {article.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-muted-silver/80 font-light leading-relaxed lg:max-w-md flex-1">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-6 self-end lg:self-center">
                  <div className="flex items-center gap-3 text-xs font-mono text-muted-silver/60">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 text-soft-white group-hover:border-crystal-lilac group-hover:bg-white/5 transition-all duration-300">
                    <span className="text-sm font-light transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer as Full Experience Section (PUB-008) */}
      <footer
        id="contact"
        aria-labelledby="footer-title"
        className="relative w-full pt-28 sm:pt-36 pb-16 border-t border-white/10 bg-[var(--color-obsidian-black)] overflow-hidden"
      >
        {/* Deep ambient refraction background */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[var(--color-fluorite-violet)]/10 via-[var(--color-ice-cyan)]/5 to-transparent rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col justify-between min-h-[500px]">
          {/* Main Closing Statement & Primary CTA */}
          <div className="flex flex-col items-start max-w-4xl mb-24">
            <div className="flex items-center gap-3.5 mb-8">
              <span className="w-8 h-[1px] bg-muted-silver/40 inline-block" />
              <span className="text-micro-overline text-muted-silver font-medium">
                START A CONVERSATION
              </span>
            </div>
            <h2
              id="footer-title"
              className="font-display font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-soft-white tracking-tight leading-[1.08] mb-8"
            >
              {copy.footerSection.headline}
            </h2>
            <p className="text-base sm:text-lg text-muted-silver/80 font-light leading-relaxed max-w-2xl mb-12">
              {copy.footerSection.subheadline}
            </p>
            <button
              type="button"
              onClick={() => setBriefingOpen(true)}
              className="btn-primary-pill group text-base px-8 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-lilac cursor-pointer"
              id="footer-primary-cta"
            >
              <span>{copy.footerSection.cta}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </button>
          </div>

          {/* Integrated Navigation and Legal Bottom Strip */}
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Wordmark and Direct Email */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="font-display font-medium text-lg tracking-[0.24em] text-soft-white leading-none">
                  FLUORITE
                </span>
                <span className="font-display font-medium text-[9px] tracking-[0.42em] text-muted-silver mt-1 leading-none">
                  LABS
                </span>
              </div>
              <a
                href={`mailto:${copy.footerSection.email}`}
                className="text-xs font-mono text-muted-silver hover:text-crystal-lilac transition-colors mt-2"
              >
                {copy.footerSection.email}
              </a>
            </div>

            {/* Clean Section Navigation Links */}
            <nav
              className="flex flex-wrap items-center gap-6 sm:gap-8"
              aria-label="Navegação do rodapé"
            >
              {copy.nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs sm:text-sm text-muted-silver hover:text-soft-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-lilac rounded-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Legal Links and Copyright */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-muted-silver/60 font-light">
              <span>{copy.footerSection.rights}</span>
              <div className="flex items-center gap-3">
                {copy.footerSection.legal.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="hover:text-muted-silver transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-crystal-lilac"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive 3-Step Microbriefing Modal (LEAD-001 - LEAD-006) */}
      <MicrobriefingModal
        isOpen={briefingOpen}
        onClose={() => setBriefingOpen(false)}
        sourcePath="/"
      />
    </main>
  );
}
