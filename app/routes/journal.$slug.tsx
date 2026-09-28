import { useState, useEffect } from "react";
import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/journal.$slug";
import {
  getArticleBySlug,
  seedInitialJournalContent,
  INITIAL_ARTICLES,
} from "../features/journal/repository.server.ts";
import { RenderJournalBlocks, type BlockNoteBlock } from "../features/journal/blocks.tsx";
import { MicrobriefingModal } from "../features/leads/MicrobriefingModal.tsx";
import { buildSeoMeta } from "../features/seo/metadata.ts";
import { getBreadcrumbSchema, getArticleSchema } from "../features/seo/schema.ts";
import { trackEvent, CANONICAL_EVENTS } from "../features/analytics/events.ts";

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData?.article) {
    return buildSeoMeta({
      title: "Artigo Não Encontrado — Fluorite Labs",
      description: "O ensaio solicitado não existe ou foi removido.",
      noIndex: true,
    });
  }

  const { article, isPreview } = loaderData;
  const isPrivate = isPreview || article.status !== "PUBLISHED";

  return buildSeoMeta({
    title: `${article.title} — FLUOR JOURNAL | Fluorite Labs`,
    description: article.excerpt || "Ensaio editorial da Fluorite Labs.",
    path: `/journal/${article.slug}`,
    ogType: "article",
    ogImage: article.coverImageUrl || "https://fluoritelabs.com/images/hero-fluorite.webp",
    noIndex: isPrivate,
  });
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const slug = params.slug || "";
  const url = new URL(request.url);
  const isPreview = url.searchParams.get("preview") === "true";

  let article = await getArticleBySlug(slug, { includeDrafts: isPreview });

  // Safe fallback to initial articles
  if (!article) {
    await seedInitialJournalContent();
    article = await getArticleBySlug(slug, { includeDrafts: isPreview });

    if (!article) {
      const memoryMatch = INITIAL_ARTICLES.find((a) => a.slug === slug);
      if (memoryMatch) {
        article = {
          id: `seed-${slug}`,
          slug: memoryMatch.slug,
          title: memoryMatch.title,
          excerpt: memoryMatch.excerpt,
          content: memoryMatch.content,
          coverImageUrl: memoryMatch.coverImageUrl || null,
          categoryId: memoryMatch.categoryId || null,
          categoryName: memoryMatch.categoryName || "Geral",
          status: memoryMatch.status,
          readingTimeMinutes: memoryMatch.readingTimeMinutes || 4,
          publishedAt: memoryMatch.publishedAt || new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
    }
  }

  return { article, isPreview };
}

export default function JournalArticleDetail() {
  const { article, isPreview } = useLoaderData<typeof loader>();
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (article) {
      trackEvent(CANONICAL_EVENTS.JOURNAL_VIEW, {
        journal_slug: article.slug,
        page_path: `/journal/${article.slug}`,
      });
    }
  }, [article]);

  if (!article) {
    return (
      <main className="min-h-screen bg-[#08090a] text-[#f5f5f7] flex flex-col items-center justify-center p-8 text-center font-sans">
        <h1 className="text-4xl font-display font-light mb-4">Artigo não encontrado</h1>
        <p className="text-[#86868b] max-w-md mb-8">
          O ensaio editorial solicitado não foi publicado ou não está disponível.
        </p>
        <Link to="/journal" className="btn-primary-pill text-sm">
          Retornar ao Journal
        </Link>
      </main>
    );
  }

  const blocks = (Array.isArray(article.content) ? article.content : []) as BlockNoteBlock[];
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Março de 2026";

  const schemaJson = getArticleSchema({
    title: article.title,
    description: article.excerpt || "",
    slug: article.slug,
    datePublished: article.publishedAt
      ? new Date(article.publishedAt).toISOString()
      : new Date().toISOString(),
    categoryName: article.categoryName || undefined,
    imageUrl: article.coverImageUrl || undefined,
  });

  return (
    <main className="relative min-h-screen w-full bg-[var(--color-obsidian-black)] text-[var(--color-soft-white)] font-body overflow-x-hidden selection:bg-[var(--color-fluorite-violet)] selection:text-white">
      {/* Schema.org Article JSON-LD (JRN-002 / SEO-003) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* Structured Data: BreadcrumbList (SEO-003) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Fluor Journal", path: "/journal" },
              { name: article.title, path: `/journal/${article.slug}` },
            ]),
          ),
        }}
      />

      {/* Private Preview Banner if active (JRN-005) */}
      {isPreview && (
        <div className="bg-amber-500/20 border-b border-amber-500/30 px-6 py-2 text-center text-xs font-mono text-amber-200">
          MODO PREVIEW PRIVADO — Este artigo é um rascunho e não está indexado pelo Google.
        </div>
      )}

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

      {/* Article Header & Typography Hero */}
      <article className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 pt-16 pb-24">
        <header className="space-y-6 pb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link
              to="/journal"
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#86868b] hover:text-white transition-colors"
            >
              JOURNAL
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-crystal-lilac">
              {article.categoryName || "Geral"}
            </span>
          </div>

          <h1 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12]">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-xs font-mono text-[#86868b] pt-2">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{article.readingTimeMinutes} MIN DE LEITURA</span>
          </div>
        </header>

        {/* Cover Image if present */}
        {article.coverImageUrl && (
          <div className="my-12 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e12]">
            <img
              src={article.coverImageUrl}
              alt={article.title}
              className="w-full h-auto object-cover max-h-[500px]"
              loading="eager"
            />
          </div>
        )}

        {/* Structured Block Content (JRN-002) */}
        <div className="pt-8">
          <RenderJournalBlocks blocks={blocks} />
        </div>

        {/* Contextual Commercial CTA & Internal Links (JRN-004) */}
        <section className="mt-20 p-8 rounded-2xl border border-white/10 bg-[#0b0c10] space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#a0a5b5]">
            APROFUNDAMENTO & PROJETOS
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-light text-white leading-snug">
            Projetando seu produto digital com o rigor da Fluorite Labs
          </h2>
          <p className="text-sm text-[#86868b] font-light leading-relaxed">
            Seja estruturando um site institucional monolítico ou implementando uma landing page de
            alta conversão, combinamos estética dark luxury e performance sub-100ms.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => setBriefingOpen(true)}
              className="btn-primary-pill text-sm px-6 py-2.5 cursor-pointer"
            >
              Iniciar microbriefing ↗
            </button>
            <Link
              to="/#services"
              className="text-xs font-mono text-muted-silver hover:text-white transition-colors"
            >
              Conhecer serviços →
            </Link>
          </div>
        </section>
      </article>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 pt-16 pb-12 bg-[#08090a]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col sm:flex-row items-center justify-between text-xs text-[#86868b] gap-4">
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
        sourcePath={`/journal/${article.slug}`}
      />
    </main>
  );
}
