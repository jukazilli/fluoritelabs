import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/work._index";
import { CANONICAL_WORK_CASES } from "../features/work/data.ts";
import { MicrobriefingModal } from "../features/leads/MicrobriefingModal.tsx";
import { buildSeoMeta } from "../features/seo/metadata.ts";
import { getBreadcrumbSchema } from "../features/seo/schema.ts";

export function meta(_args?: Route.MetaArgs) {
  return buildSeoMeta({
    title: "Work — Arquivo de Projetos & Engenharia | Fluorite Labs",
    description:
      "Curadoria de projetos conceituais e soluções digitais de alto impacto construídas pela Fluorite Labs com arquitetura moderna e design de precisão.",
    path: "/work",
  });
}

export default function WorkIndex() {
  const projects = Object.values(CANONICAL_WORK_CASES);
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-[var(--color-obsidian-black)] text-[var(--color-soft-white)] font-body overflow-x-hidden selection:bg-[var(--color-fluorite-violet)] selection:text-white">
      {/* Structured Data: BreadcrumbList (SEO-003) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
            ]),
          ),
        }}
      />

      {/* Header Navigation */}
      <header className="relative z-30 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 pt-8 flex items-center justify-between">
        <Link
          to="/"
          className="group flex flex-col focus:outline-none"
          aria-label="Fluorite Labs Home"
        >
          <span className="font-display font-medium text-[1.125rem] tracking-[0.24em] text-soft-white group-hover:text-crystal-lilac transition-colors duration-300 leading-none">
            FLUORITE
          </span>
          <span className="font-display font-medium text-[0.625rem] tracking-[0.42em] text-muted-silver mt-1.5 leading-none">
            LABS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="Navegação Principal">
          <Link to="/work" className="text-[0.9375rem] font-medium text-white transition-colors">
            Work
          </Link>
          <Link
            to="/#services"
            className="text-[0.9375rem] font-normal text-muted-silver hover:text-soft-white transition-colors"
          >
            Serviços
          </Link>
          <Link
            to="/#process"
            className="text-[0.9375rem] font-normal text-muted-silver hover:text-soft-white transition-colors"
          >
            Processo
          </Link>
          <Link
            to="/journal"
            className="text-[0.9375rem] font-normal text-muted-silver hover:text-soft-white transition-colors"
          >
            Journal
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setBriefingOpen(true)}
            className="hidden sm:inline-flex glass-pill px-6 py-2.5 text-[0.875rem] font-medium text-soft-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 items-center gap-2 cursor-pointer"
          >
            <span>Começar agora</span>
            <span className="text-xs font-light">↗</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full border border-white/10 text-soft-white"
            aria-label="Abrir menu"
          >
            <span className="w-4 h-[1.5px] bg-white -translate-y-1" />
            <span className="w-4 h-[1.5px] bg-white translate-y-1" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#08090a]/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <span className="font-display font-medium text-lg tracking-[0.24em] text-white">
              FLUORITE LABS
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white"
            >
              ✕
            </button>
          </div>
          <nav className="flex flex-col gap-6 my-auto text-left py-8">
            <Link
              to="/work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-display text-white"
            >
              Work
            </Link>
            <Link
              to="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-display text-white"
            >
              Serviços
            </Link>
            <Link
              to="/#process"
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-display text-white"
            >
              Processo
            </Link>
            <Link
              to="/journal"
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-display text-white"
            >
              Journal
            </Link>
          </nav>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setBriefingOpen(true);
            }}
            className="btn-primary-pill w-full text-center"
          >
            Começar agora ↗
          </button>
        </div>
      )}

      {/* Index Hero */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 pt-20 pb-20 lg:pt-28 lg:pb-28">
        <div className="flex flex-col items-start max-w-4xl">
          <div className="flex items-center gap-3.5 mb-8">
            <span className="w-8 h-[1px] bg-muted-silver/40 inline-block" />
            <span className="text-micro-overline text-muted-silver font-medium">
              ARQUIVO DE PROJETOS & VISÃO
            </span>
          </div>

          <h1 className="font-display font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] mb-8">
            Projetos concebidos para impressionar e converter.
          </h1>

          <p className="text-base sm:text-lg text-[#86868b] font-light leading-relaxed max-w-2xl">
            Uma seleção de conceitos de alto impacto que demonstram como refinamento estético,
            tipografia editorial e engenharia moderna de ponta refratam a presença digital de marcas
            ambiciosas.
          </p>
        </div>
      </section>

      {/* Projects Showcase Stream (WORK-001) */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 pb-32">
        <div className="space-y-24 sm:space-y-32">
          {projects.map((item, idx) => (
            <article
              key={item.slug}
              className={`flex flex-col ${idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 lg:gap-16 items-center border-t border-white/10 pt-16`}
            >
              {/* Media Preview Box */}
              <div className="w-full lg:w-3/5 group overflow-hidden rounded-2xl border border-white/10 bg-[#0e0f14]">
                <Link
                  to={`/work/${item.slug}`}
                  className="block relative aspect-[16/10] overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-[#d1d1d6]">
                      {item.badge}
                    </span>
                  </div>
                </Link>
              </div>

              {/* Text Description Box */}
              <div className="w-full lg:w-2/5 flex flex-col items-start space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#86868b]">PROJETO {item.num}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-xs font-mono text-white/50">{item.year}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#a0a5b5]">
                    {item.category}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-display font-light text-white tracking-tight leading-snug">
                    <Link
                      to={`/work/${item.slug}`}
                      className="hover:text-crystal-lilac transition-colors"
                    >
                      {item.title}
                    </Link>
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#86868b] font-light leading-relaxed">
                  {item.summary}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to={`/work/${item.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-crystal-lilac transition-colors group"
                  >
                    <span>Ver estudo de caso detalhado</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>

                  {item.demoUrl && (
                    <Link
                      to={item.demoUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-500/30 transition-all"
                    >
                      <span>⚡ Demonstração Ao Vivo</span>
                      <span>→</span>
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 pt-24 pb-16 bg-[#08090a]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col items-center text-center space-y-8">
          <h2 className="text-3xl sm:text-5xl font-display font-light text-white tracking-tight max-w-2xl">
            Pronto para ver sua marca posicionada com esse nível de refinamento?
          </h2>
          <button
            type="button"
            onClick={() => setBriefingOpen(true)}
            className="btn-primary-pill text-base px-8 py-4 cursor-pointer"
          >
            Iniciar meu projeto ↗
          </button>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#86868b] gap-4">
          <span>© 2026 Fluorite Labs. Todos os direitos reservados.</span>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/work" className="hover:text-white transition-colors">
              Work
            </Link>
            <Link to="/#services" className="hover:text-white transition-colors">
              Serviços
            </Link>
            <Link to="/journal" className="hover:text-white transition-colors">
              Journal
            </Link>
          </div>
        </div>
      </footer>

      {/* Microbriefing Modal */}
      <MicrobriefingModal
        isOpen={briefingOpen}
        onClose={() => setBriefingOpen(false)}
        sourcePath="/work"
      />
    </main>
  );
}
