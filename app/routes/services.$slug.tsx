import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import type { Route } from "./+types/services.$slug";
import { CANONICAL_SERVICES } from "../features/services/data.ts";
import { MicrobriefingModal } from "../features/leads/MicrobriefingModal.tsx";
import { buildSeoMeta } from "../features/seo/metadata.ts";
import { getBreadcrumbSchema } from "../features/seo/schema.ts";
import { trackEvent, CANONICAL_EVENTS } from "../features/analytics/events.ts";

export function meta({ params }: Route.MetaArgs) {
  const service = CANONICAL_SERVICES[params.slug || ""];
  if (!service) {
    return buildSeoMeta({
      title: "Serviço Não Encontrado — Fluorite Labs",
      description:
        "A especialidade solicitada não foi localizada em nossa arquitetura de serviços.",
      noIndex: true,
    });
  }

  return buildSeoMeta({
    title: `${service.title} — Fluorite Labs`,
    description: service.summary,
    path: `/servicos/${service.slug}`,
  });
}

export default function ServiceDetail() {
  const params = useParams();
  const slug = params.slug || "";
  const service = CANONICAL_SERVICES[slug];
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (service) {
      trackEvent(CANONICAL_EVENTS.SERVICE_VIEW, {
        service_slug: slug,
        page_path: `/servicos/${slug}`,
      });
    }
  }, [slug, service]);

  if (!service) {
    return (
      <main className="min-h-screen bg-[#08090a] text-[#f5f5f7] flex flex-col items-center justify-center p-8 text-center font-sans">
        <h1 className="text-4xl font-display font-light mb-4">Serviço não encontrado</h1>
        <p className="text-[#86868b] max-w-md mb-8">
          A especialidade que você procurava não existe ou foi reorganizada em nossa arquitetura de
          serviços.
        </p>
        <Link to="/" className="btn-primary-pill text-sm">
          Retornar à Home
        </Link>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full bg-[var(--color-obsidian-black)] text-[var(--color-soft-white)] font-body overflow-x-hidden selection:bg-[var(--color-fluorite-violet)] selection:text-white">
      {/* Structured Data: BreadcrumbList (SEO-003) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Serviços", path: "/#services" },
              { name: service.title, path: `/servicos/${service.slug}` },
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
          <Link
            to="/work"
            className="text-[0.9375rem] font-normal text-muted-silver hover:text-soft-white transition-colors"
          >
            Work
          </Link>
          <Link
            to="/#services"
            className="text-[0.9375rem] font-medium text-white transition-colors"
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

      {/* Hero Section */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="flex flex-col items-start max-w-4xl">
          {/* Breadcrumb & Number */}
          <div className="flex items-center gap-3.5 mb-8">
            <Link
              to="/#services"
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#86868b] hover:text-white transition-colors"
            >
              SERVIÇOS
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/50">
              {service.num}
            </span>
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="text-[11px] font-mono tracking-wider px-3 py-1 rounded-full border border-white/15 bg-white/[0.03] text-[#d1d1d6]">
              {service.badge}
            </span>
          </div>

          <h1 className="font-display font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] mb-8">
            {service.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#86868b] font-light leading-relaxed max-w-3xl mb-12">
            {service.headline}
          </p>

          <button
            type="button"
            onClick={() => setBriefingOpen(true)}
            className="btn-primary-pill group text-base px-8 py-3.5 inline-flex items-center gap-3 cursor-pointer"
          >
            <span>Iniciar projeto de {service.title}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </button>
        </div>
      </section>

      {/* Problem Context & Expected Result — 2-Column Editorial Grid */}
      <section className="relative z-10 border-t border-white/10 bg-[#060709]/80 py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* The Problem / Market Context */}
            <div className="flex flex-col space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-rose-300/80">
                01 — O CENÁRIO COMUM
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-light text-white tracking-tight">
                {service.problemContext.title}
              </h2>
              <p className="text-sm sm:text-base text-[#86868b] font-light leading-relaxed">
                {service.problemContext.description}
              </p>
              <div className="pt-4 space-y-3">
                {service.problemContext.frictionPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02]"
                  >
                    <span className="text-rose-400 font-mono text-sm leading-none mt-0.5">✕</span>
                    <span className="text-sm text-[#d1d1d6] font-light leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expected Result & Transformation */}
            <div className="flex flex-col space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-300/80">
                02 — O PADRÃO FLUORITE
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-light text-white tracking-tight">
                {service.expectedResult.title}
              </h2>
              <p className="text-sm sm:text-base text-[#86868b] font-light leading-relaxed">
                {service.expectedResult.description}
              </p>
              <div className="pt-4 space-y-3">
                {service.expectedResult.outcomes.map((outcome) => (
                  <div
                    key={outcome}
                    className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.04]"
                  >
                    <span className="text-emerald-400 font-mono text-sm leading-none mt-0.5">
                      ✓
                    </span>
                    <span className="text-sm text-white font-medium leading-snug">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Build — Technical Architectural Pillars */}
      <section className="relative z-10 py-24 lg:py-32 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16">
          <div className="max-w-2xl mb-16 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#a0a5b5]">
              03 — ENGENHARIA & RIGOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-light text-white tracking-tight">
              {service.howWeBuild.title}
            </h2>
            <p className="text-sm sm:text-base text-[#86868b] font-light leading-relaxed">
              {service.howWeBuild.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.howWeBuild.pillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="p-8 rounded-2xl border border-white/10 bg-[#0d0e12] flex flex-col justify-between space-y-6 hover:border-white/20 transition-all"
              >
                <div className="space-y-4">
                  <span className="font-mono text-xs text-[#86868b]">PILLAR 0{idx + 1}</span>
                  <h3 className="text-lg font-display text-white font-medium">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-[#86868b] font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="w-8 h-[1px] bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Work Bridge */}
      <section className="relative z-10 py-24 border-t border-white/10 bg-[#060709]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#86868b]">
              CASO DE USO RELACIONADO
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-light text-white">
              Veja como aplicamos essa filosofia no projeto {service.relatedWorkTitle}
            </h2>
          </div>
          <Link
            to={`/work/${service.relatedWorkSlug}`}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/20 bg-white/5 text-sm text-white font-medium hover:bg-white hover:text-black transition-all"
          >
            Explorar estudo de caso ↗
          </Link>
        </div>
      </section>

      {/* Closing CTA & Footer */}
      <footer className="relative z-10 border-t border-white/10 pt-24 pb-16 bg-[#08090a]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col items-center text-center space-y-8">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#86868b]">
            PRONTO PARA COMEÇAR?
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-light text-white tracking-tight max-w-2xl">
            Pronto para transformar sua presença digital com {service.title.toLowerCase()}?
          </h2>
          <p className="text-sm sm:text-base text-[#86868b] font-light max-w-xl">
            Responda 3 perguntas rápidas em nosso microbriefing e continue diretamente pelo WhatsApp
            com nossa equipe técnica.
          </p>
          <button
            type="button"
            onClick={() => setBriefingOpen(true)}
            className="btn-primary-pill text-base px-8 py-4 cursor-pointer"
          >
            Iniciar microbriefing agora ↗
          </button>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#86868b] gap-4">
          <span>© 2026 Fluorite Labs. Todos os direitos reservados.</span>
          <div className="flex items-center gap-6">
            <Link to="/work" className="hover:text-white transition-colors">
              Work
            </Link>
            <Link to="/#services" className="hover:text-white transition-colors">
              Serviços
            </Link>
            <Link to="/#process" className="hover:text-white transition-colors">
              Processo
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
        sourcePath={`/servicos/${service.slug}`}
      />
    </main>
  );
}
