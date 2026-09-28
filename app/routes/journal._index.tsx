import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/journal._index";
import {
  getPublishedArticles,
  seedInitialJournalContent,
  INITIAL_ARTICLES,
} from "../features/journal/repository.server.ts";
import { MicrobriefingModal } from "../features/leads/MicrobriefingModal.tsx";
import { buildSeoMeta } from "../features/seo/metadata.ts";
import { getBreadcrumbSchema } from "../features/seo/schema.ts";

export function meta(_args?: Route.MetaArgs) {
  return buildSeoMeta({
    title: "FLUOR JOURNAL — Engenharia, Design & Conversão | Fluorite Labs",
    description:
      "Ensaios editoriais e perspectivas técnicas sobre arquitetura de software, posicionamento de marca, Core Web Vitals e experiência do usuário.",
    path: "/journal",
  });
}

export async function loader() {
  await seedInitialJournalContent();
  const dbArticles = await getPublishedArticles();

  // Fallback to in-memory initial articles if database is offline (Safe Degradation)
  const articlesList =
    dbArticles.length > 0
      ? dbArticles
      : INITIAL_ARTICLES.filter((a) => a.status === "PUBLISHED").map((a, idx) => ({
          id: `seed-${idx}`,
          slug: a.slug,
          title: a.title,
          excerpt: a.excerpt,
          content: a.content,
          coverImageUrl: a.coverImageUrl || null,
          categoryId: a.categoryId || null,
          categoryName: a.categoryName || "Geral",
          status: a.status,
          readingTimeMinutes: a.readingTimeMinutes || 4,
          publishedAt: a.publishedAt || new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

  return { articles: articlesList };
}

export default function JournalIndex() {
  const { articles } = useLoaderData<typeof loader>();
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
              { name: "Fluor Journal", path: "/journal" },
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
          <Link to="/journal" className="text-[0.9375rem] font-medium text-white transition-colors">
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

      {/* Journal Index Hero */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="flex flex-col items-start max-w-4xl space-y-6">
          <div className="flex items-center gap-3.5">
            <span className="w-8 h-[1px] bg-muted-silver/40 inline-block" />
            <span className="text-micro-overline text-muted-silver font-medium">
              FLUOR JOURNAL — PUBLICAÇÃO EDITORIAL
            </span>
          </div>

          <h1 className="font-display font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
            Perspectivas sobre engenharia, estética e conversão.
          </h1>

          <p className="text-base sm:text-lg text-[#86868b] font-light leading-relaxed max-w-2xl">
            Ensaios dedicados à dissecação de arquitetura de software, diferenciação de marca e
            psicologia de decisão em ambientes digitais modernos.
          </p>
        </div>
      </section>

      {/* Editorial Stream (JRN-001) */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 pb-32">
        <div className="border-t border-white/10 divide-y divide-white/10">
          {articles.map((article) => {
            const formattedDate = article.publishedAt
              ? new Date(article.publishedAt)
                  .toLocaleDateString("pt-BR", {
                    month: "short",
                    year: "numeric",
                  })
                  .toUpperCase()
              : "MAR 2026";

            return (
              <article key={article.slug} className="py-12 group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Metadata Column */}
                  <div className="lg:col-span-3 flex flex-row lg:flex-col justify-between lg:justify-start gap-4">
                    <span className="text-xs font-mono tracking-wider text-crystal-lilac uppercase font-medium">
                      {article.categoryName || "Artigo"}
                    </span>
                    <div className="flex items-center gap-3 text-xs font-mono text-[#86868b]">
                      <span>{formattedDate}</span>
                      <span>•</span>
                      <span>{article.readingTimeMinutes} MIN DE LEITURA</span>
                    </div>
                  </div>

                  {/* Title & Excerpt Column */}
                  <div className="lg:col-span-7 space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-display font-light text-white group-hover:text-crystal-lilac transition-colors leading-snug">
                      <Link to={`/journal/${article.slug}`}>{article.title}</Link>
                    </h2>
                    <p className="text-sm sm:text-base text-[#86868b] font-light leading-relaxed max-w-3xl">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Read Link Column */}
                  <div className="lg:col-span-2 flex justify-start lg:justify-end">
                    <Link
                      to={`/journal/${article.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/70 group-hover:text-white transition-colors"
                    >
                      <span>Ler ensaio</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 pt-20 pb-16 bg-[#08090a]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col items-center text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-display font-light text-white tracking-tight">
            Gostaria de aplicar esses conceitos na sua empresa?
          </h2>
          <button
            type="button"
            onClick={() => setBriefingOpen(true)}
            className="btn-primary-pill text-sm px-6 py-3 cursor-pointer"
          >
            Iniciar conversa com a Fluorite Labs ↗
          </button>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#86868b] gap-4">
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
        sourcePath="/journal"
      />
    </main>
  );
}
