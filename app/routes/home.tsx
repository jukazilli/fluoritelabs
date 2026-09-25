import { useState } from "react";
import type { Route } from "./+types/home";

export function meta(_args?: Route.MetaArgs) {
  return [
    { title: "Fluorite Labs — Estúdio Digital de Alta Performance" },
    {
      name: "description",
      content:
        "Estúdio digital focado em experiências web de alto impacto, arquitetura moderna, design de precisão e engenharia de refração.",
    },
  ];
}

export default function Home() {
  const [lang, setLang] = useState<"pt" | "en">("en");

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
      ctaHeader: "Iniciar projeto",
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
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
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
    },
  }[lang];

  return (
    <main className="relative min-h-screen w-full bg-[var(--color-obsidian-black)] text-[var(--color-soft-white)] font-body overflow-hidden selection:bg-[var(--color-fluorite-violet)] selection:text-white">
      {/* Background Graphic Canvas: High-Resolution Clean Fluorite Cluster */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src="/images/hero-clean.webp"
          alt="Fluorite Labs 3D Crystal Cluster"
          className="w-full h-full object-cover object-center"
          width={1536}
          height={1024}
        />
        {/* Subtle atmospheric vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-obsidian-black)] via-transparent to-transparent opacity-60" />
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
                className="text-[0.9375rem] font-normal text-muted-silver hover:text-soft-white transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Header Actions: Language Switcher + Pill CTA */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "pt" : "en")}
              className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-muted-silver hover:text-soft-white border border-white/10 hover:border-white/20 rounded-full transition-all"
              title="Alternar idioma / Switch language"
            >
              {lang.toUpperCase()}
            </button>

            <a
              href="#contact"
              className="glass-pill px-6 py-2.5 text-[0.875rem] font-medium text-soft-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 inline-flex items-center gap-2"
            >
              <span>{copy.ctaHeader}</span>
              <span className="text-xs font-light">↗</span>
            </a>
          </div>
        </header>

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
            <a href="#contact" className="btn-primary-pill group" id="hero-primary-cta">
              <span>{copy.ctaPrimary}</span>
              <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
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
    </main>
  );
}
