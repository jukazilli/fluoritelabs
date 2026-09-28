import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import type { Route } from "./+types/work.$slug";
import { CANONICAL_WORK_CASES } from "../features/work/data.ts";
import { MicrobriefingModal } from "../features/leads/MicrobriefingModal.tsx";
import { buildSeoMeta } from "../features/seo/metadata.ts";
import { getBreadcrumbSchema } from "../features/seo/schema.ts";
import { trackEvent, CANONICAL_EVENTS } from "../features/analytics/events.ts";

export function meta({ params }: Route.MetaArgs) {
  const caseItem = CANONICAL_WORK_CASES[params.slug || ""];
  if (!caseItem) {
    return buildSeoMeta({
      title: "Projeto Não Encontrado — Fluorite Labs",
      description: "O estudo de caso solicitado não foi localizado em nosso arquivo de projetos.",
      noIndex: true,
    });
  }

  return buildSeoMeta({
    title: `${caseItem.title} — Estudo de Caso | Fluorite Labs`,
    description: caseItem.summary,
    path: `/work/${caseItem.slug}`,
    ogImage: `https://fluoritelabs.com${caseItem.image}`,
  });
}

export default function WorkCaseDetail() {
  const params = useParams();
  const slug = params.slug || "";
  const caseItem = CANONICAL_WORK_CASES[slug];
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (caseItem) {
      trackEvent(CANONICAL_EVENTS.WORK_VIEW, {
        work_slug: slug,
        page_path: `/work/${slug}`,
      });
    }
  }, [slug, caseItem]);

  if (!caseItem) {
    return (
      <main className="min-h-screen bg-[#08090a] text-[#f5f5f7] flex flex-col items-center justify-center p-8 text-center font-sans">
        <h1 className="text-4xl font-display font-light mb-4">Projeto não encontrado</h1>
        <p className="text-[#86868b] max-w-md mb-8">
          O estudo de caso solicitado não existe ou foi arquivado.
        </p>
        <Link to="/work" className="btn-primary-pill text-sm">
          Ver arquivo de projetos
        </Link>
      </main>
    );
  }

  const nextCase = CANONICAL_WORK_CASES[caseItem.nextSlug];

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
              { name: caseItem.title, path: `/work/${caseItem.slug}` },
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

      {/* Case Header */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 pt-16 pb-12">
        <div className="flex flex-col items-start max-w-4xl space-y-6">
          <div className="flex items-center gap-3">
            <Link
              to="/work"
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#86868b] hover:text-white transition-colors"
            >
              WORK
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#a0a5b5]">
              {caseItem.category}
            </span>
            <span className="text-white/20">•</span>
            <span className="text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded-full border border-white/20 bg-white/5 text-[#d1d1d6]">
              {caseItem.badge}
            </span>
          </div>

          <h1 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1]">
            {caseItem.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#86868b] font-light leading-relaxed max-w-3xl">
            {caseItem.headline}
          </p>

          {caseItem.demoUrl && (
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={caseItem.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all shadow-lg hover:shadow-emerald-500/20"
              >
                <span>⚡ Acessar Website Oficial do Projeto</span>
                <span>↗</span>
              </a>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/30">
                Subdomínio Dedicado: vertice-materiais.seekin-web.workers.dev
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Grand Hero Media Canvas (WORK-002/003/004) */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 pb-20">
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0e0f14] shadow-2xl shadow-black/80 aspect-[16/9]">
          <img
            src={caseItem.image}
            alt={caseItem.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {caseItem.demoUrl && (
            <div className="absolute bottom-6 right-6 z-20">
              <a
                href={caseItem.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-black/80 hover:bg-black backdrop-blur-md border border-white/20 text-white font-medium text-xs flex items-center gap-2 shadow-2xl transition-all"
              >
                <span>Visitar Website do Projeto</span>
                <span>↗</span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Context & Challenge Grid */}
      <section className="relative z-10 border-t border-white/10 bg-[#060709]/60 py-24">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#a0a5b5]">
                01 — VISÃO DO CLIENTE
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-light text-white">
                O Contexto do Negócio
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-8 text-base text-[#86868b] font-light leading-relaxed">
              <p>{caseItem.clientContext.overview}</p>
              <div className="p-8 rounded-2xl border border-white/10 bg-[#0d0e12] space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-white">
                  O DESAFIO CENTRAL
                </span>
                <p className="text-sm text-[#d1d1d6]">{caseItem.clientContext.challenge}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Concept & Palette */}
      <section className="relative z-10 border-t border-white/10 py-24">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#a0a5b5]">
                02 — DIREÇÃO VISUAL
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-light text-white">
                Conceito Estético
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-10">
              <p className="text-base text-[#86868b] font-light leading-relaxed">
                {caseItem.designConcept.philosophy}
              </p>
              <p className="text-sm text-[#a0a5b5] font-light leading-relaxed">
                {caseItem.designConcept.visualDirection}
              </p>

              {/* Color Swatches */}
              <div className="space-y-4 pt-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#86868b]">
                  PALETA DE ATMOSFERA
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {caseItem.designConcept.palette.map((swatch) => (
                    <div
                      key={swatch.name}
                      className="p-4 rounded-xl border border-white/10 bg-[#0d0e12] space-y-3"
                    >
                      <div
                        className="w-full h-8 rounded-lg border border-white/15"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-white">{swatch.name}</span>
                        <span className="text-[11px] font-mono text-[#86868b]">{swatch.hex}</span>
                        <span className="text-[11px] text-[#a0a5b5] mt-1">{swatch.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering & Telemetry Specs */}
      <section className="relative z-10 border-t border-white/10 bg-[#060709] py-24">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#a0a5b5]">
                03 — ENGENHARIA
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-light text-white">
                Rigor & Telemetria
              </h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0d0e12] space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white">
                  STACK & INFRAESTRUTURA
                </span>
                <ul className="space-y-2.5 text-xs text-[#a0a5b5]">
                  {caseItem.engineeringDetails.techStack.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-[#0d0e12] space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  TELEMETRIA COMPROVADA
                </span>
                <ul className="space-y-2.5 text-xs text-[#d1d1d6]">
                  {caseItem.engineeringDetails.performanceHighlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Interactive Dedicated Subdomain Callout Banner */}
      {caseItem.demoUrl && (
        <section className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 py-12">
          <div className="p-8 sm:p-12 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-[#0c0e14] to-black flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                WEBSITE REAL PUBLICADO EM SUBDOMÍNIO
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-white">
                Navegue no Website Oficial da Vértice Materiais
              </h3>
              <p className="text-sm text-muted-silver max-w-xl font-light leading-relaxed">
                Este projeto foi publicado em um ambiente de borda totalmente isolado e autônomo.
                Acesse o catálogo real da Vértice com busca instantânea, adicione itens à cesta de
                cotação e teste o envio formatado para o WhatsApp comercial.
              </p>
            </div>
            <a
              href={caseItem.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all shadow-xl hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              Acessar vertice-materiais.seekin-web.workers.dev ↗
            </a>
          </div>
        </section>
      )}

      {/* WORK-005: Seamless Continuous Case Navigation */}
      {nextCase && (
        <section className="relative z-10 border-t border-white/10 bg-gradient-to-b from-[#08090a] to-[#040507] py-28 transition-all hover:bg-white/[0.02]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col items-start space-y-8">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#86868b]">
              PRÓXIMO TRABALHO →
            </span>

            <Link to={`/work/${nextCase.slug}`} className="group block space-y-4 max-w-4xl">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#a0a5b5]">
                {nextCase.category}
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-light text-white group-hover:text-crystal-lilac transition-colors tracking-tight leading-tight">
                {nextCase.title} ↗
              </h2>
              <p className="text-base sm:text-lg text-[#86868b] font-light max-w-2xl">
                {nextCase.summary}
              </p>
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 pt-20 pb-16 bg-[#08090a]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col items-center text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-display font-light text-white tracking-tight max-w-2xl">
            Pronto para projetar algo singular para seu negócio?
          </h2>
          <button
            type="button"
            onClick={() => setBriefingOpen(true)}
            className="btn-primary-pill text-base px-8 py-4 cursor-pointer"
          >
            Iniciar conversa com a Fluorite Labs ↗
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
        sourcePath={`/work/${caseItem.slug}`}
      />
    </main>
  );
}
