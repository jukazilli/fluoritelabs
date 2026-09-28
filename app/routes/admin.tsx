import { useState } from "react";
import { UserButton } from "@clerk/react-router";
import {
  useLoaderData,
  useFetcher,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "react-router";
import { requireAdmin } from "../features/auth/auth.server.ts";
import { getAllLeadsAdmin, updateLeadStatus } from "../features/leads/admin.server.ts";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus } from "../features/leads/types.ts";
import {
  getAllArticlesAdmin,
  updateArticleStatus,
  createOrUpdateArticle,
  getCategories,
  seedInitialJournalContent,
} from "../features/journal/repository.server.ts";
import { getDb } from "../data/db.server.ts";
import { categories } from "../data/schema.ts";

export function meta() {
  return [
    { title: "Painel de Operações — Fluorite Labs" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export async function loader(args: LoaderFunctionArgs) {
  const session = await requireAdmin(args);

  await seedInitialJournalContent();

  const [leadsList, articlesList, categoriesList] = await Promise.all([
    getAllLeadsAdmin(),
    getAllArticlesAdmin(),
    getCategories(),
  ]);

  return {
    adminUserId: session.userId,
    leads: leadsList,
    articles: articlesList,
    categories: categoriesList,
  };
}

export async function action(args: ActionFunctionArgs) {
  await requireAdmin(args);
  const formData = await args.request.formData();
  const intent = formData.get("intent");

  if (intent === "update_lead_status") {
    const leadId = String(formData.get("leadId") || "");
    const newStatus = String(formData.get("newStatus") || "") as LeadStatus;
    if (leadId && LEAD_STATUSES.includes(newStatus)) {
      await updateLeadStatus(leadId, newStatus);
      return { ok: true, action: "lead_status_updated" };
    }
  }

  if (intent === "update_article_status") {
    const articleId = String(formData.get("articleId") || "");
    const newStatus = String(formData.get("newStatus") || "") as
      "DRAFT" | "PUBLISHED" | "UNPUBLISHED";
    if (articleId && ["DRAFT", "PUBLISHED", "UNPUBLISHED"].includes(newStatus)) {
      await updateArticleStatus(articleId, newStatus);
      return { ok: true, action: "article_status_updated" };
    }
  }

  if (intent === "save_article") {
    const title = String(formData.get("title") || "").trim();
    const slug = String(formData.get("slug") || "")
      .trim()
      .toLowerCase();
    const categoryName = String(formData.get("categoryName") || "Geral");
    const excerpt = String(formData.get("excerpt") || "").trim();
    const readingTime = parseInt(String(formData.get("readingTimeMinutes") || "4"), 10);
    const coverImageUrl = String(formData.get("coverImageUrl") || "").trim() || null;
    const bodyParagraph = String(formData.get("bodyParagraph") || "").trim();

    if (title && slug) {
      const structuredContent = [
        {
          id: "p1",
          type: "paragraph",
          content: [{ type: "text", text: bodyParagraph || excerpt }],
        },
      ];

      await createOrUpdateArticle({
        slug,
        title,
        excerpt,
        content: structuredContent,
        categoryName,
        readingTimeMinutes: readingTime,
        coverImageUrl,
        status: "DRAFT",
      });

      return { ok: true, action: "article_created" };
    }
  }

  if (intent === "create_category") {
    const name = String(formData.get("name") || "").trim();
    const slug = String(formData.get("slug") || "")
      .trim()
      .toLowerCase();

    if (name && slug) {
      const dbUrl = process.env.DATABASE_URL;
      if (dbUrl) {
        const db = getDb(dbUrl);
        await db.insert(categories).values({
          id: `cat_${Date.now().toString(36)}`,
          name,
          slug,
        });
      }
      return { ok: true, action: "category_created" };
    }
  }

  return { ok: false, error: "Invalid action" };
}

export default function AdminDashboard() {
  const { adminUserId, leads, articles, categories } = useLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState<"leads" | "journal" | "categories">("leads");
  const [showNewArticleModal, setShowNewArticleModal] = useState(false);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const fetcher = useFetcher();

  const newLeadsCount = leads.filter((l) => l.status === "NEW").length;

  return (
    <div className="min-h-screen bg-[#060709] text-[#f5f5f7] font-sans selection:bg-[#c4b5fd] selection:text-black">
      {/* Top Header Navigation */}
      <header className="border-b border-white/10 px-6 sm:px-10 py-4 flex items-center justify-between bg-[#08090a]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <span className="text-xs uppercase tracking-[0.3em] font-display text-white">
            FLUORITE LABS
          </span>
          <span className="text-white/20">/</span>
          <span className="text-xs font-mono text-crystal-lilac">Painel de Operações</span>
        </div>
        <div className="flex items-center space-x-6">
          <span className="hidden sm:inline-block text-xs font-mono text-[#86868b]">
            {adminUserId}
          </span>
          <UserButton />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-10 space-y-8">
        {/* Navigation Tabs (ADM-001) */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("leads")}
              className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "leads"
                  ? "bg-white text-black shadow-lg shadow-white/5"
                  : "bg-white/5 text-[#86868b] hover:text-white hover:bg-white/10"
              }`}
            >
              Leads Comerciais ({leads.length})
              {newLeadsCount > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-400 text-black font-mono text-[10px] font-bold">
                  {newLeadsCount} novos
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("journal")}
              className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "journal"
                  ? "bg-white text-black shadow-lg shadow-white/5"
                  : "bg-white/5 text-[#86868b] hover:text-white hover:bg-white/10"
              }`}
            >
              Fluor Journal ({articles.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("categories")}
              className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "categories"
                  ? "bg-white text-black shadow-lg shadow-white/5"
                  : "bg-white/5 text-[#86868b] hover:text-white hover:bg-white/10"
              }`}
            >
              Categorias ({categories.length})
            </button>
          </div>

          <div>
            {activeTab === "journal" && (
              <button
                type="button"
                onClick={() => setShowNewArticleModal(true)}
                className="px-4 py-2 rounded-full border border-white/20 bg-white/10 text-xs font-medium text-white hover:bg-white hover:text-black transition-all"
              >
                + Novo Artigo
              </button>
            )}
            {activeTab === "categories" && (
              <button
                type="button"
                onClick={() => setShowNewCategoryModal(true)}
                className="px-4 py-2 rounded-full border border-white/20 bg-white/10 text-xs font-medium text-white hover:bg-white hover:text-black transition-all"
              >
                + Nova Categoria
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: LEADS & MICROBRIEFING (ADM-002, ADM-003) */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-display font-light text-white">Leads Capturados</h2>
                <p className="text-xs text-[#86868b]">
                  Registrados antes do handoff para WhatsApp com persistência atômica no Neon.
                </p>
              </div>
            </div>

            {leads.length === 0 ? (
              <div className="p-12 text-center border border-white/10 rounded-2xl bg-[#0b0c10] space-y-2">
                <p className="text-sm text-[#86868b]">Nenhum lead capturado até o momento.</p>
                <p className="text-xs text-[#555]">
                  Novas submissões do microbriefing aparecerão aqui automaticamente.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0b0e]">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 bg-white/[0.02] text-[#86868b] font-mono uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Nome</th>
                      <th className="py-3.5 px-4">Necessidade</th>
                      <th className="py-3.5 px-4">Orçamento</th>
                      <th className="py-3.5 px-4">Origem</th>
                      <th className="py-3.5 px-4">Data</th>
                      <th className="py-3.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#d1d1d6]">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 font-medium text-white">{lead.firstName}</td>
                        <td className="py-3.5 px-4 text-[#a0a5b5]">{lead.need}</td>
                        <td className="py-3.5 px-4 font-mono text-emerald-300/80">{lead.budget}</td>
                        <td className="py-3.5 px-4 font-mono text-[#86868b] max-w-[150px] truncate">
                          {lead.sourcePath || "/"}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[#86868b]">
                          {new Date(lead.createdAt).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="py-3.5 px-4">
                          <fetcher.Form method="post">
                            <input type="hidden" name="intent" value="update_lead_status" />
                            <input type="hidden" name="leadId" value={lead.id} />
                            <select
                              name="newStatus"
                              defaultValue={lead.status}
                              onChange={(e) => e.target.form?.requestSubmit()}
                              className="bg-[#121318] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-white/30"
                            >
                              {LEAD_STATUSES.map((st) => (
                                <option key={st} value={st}>
                                  {LEAD_STATUS_LABELS[st]}
                                </option>
                              ))}
                            </select>
                          </fetcher.Form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FLUOR JOURNAL ARTICLES (ADM-004, JRN-006) */}
        {activeTab === "journal" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-display font-light text-white">
                Artigos do Fluor Journal
              </h2>
              <p className="text-xs text-[#86868b]">
                Publicação de artigos editoriais com experiência visual em blocos e controle de
                ciclo de vida.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="p-6 rounded-2xl border border-white/10 bg-[#0a0b0e] flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border border-white/15 text-crystal-lilac">
                        {art.categoryName || "Geral"}
                      </span>
                      <span
                        className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded ${
                          art.status === "PUBLISHED"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : art.status === "DRAFT"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-white/10 text-[#86868b]"
                        }`}
                      >
                        {art.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-display text-white font-medium">{art.title}</h3>
                    <p className="text-xs text-[#86868b] line-clamp-2">{art.excerpt}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`/journal/${art.slug}?preview=true`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg border border-white/15 bg-white/5 text-xs text-[#d1d1d6] hover:text-white hover:bg-white/10 transition-colors"
                    >
                      Preview Privado ↗
                    </a>

                    <fetcher.Form method="post">
                      <input type="hidden" name="intent" value="update_article_status" />
                      <input type="hidden" name="articleId" value={art.id} />
                      <input
                        type="hidden"
                        name="newStatus"
                        value={art.status === "PUBLISHED" ? "UNPUBLISHED" : "PUBLISHED"}
                      />
                      <button
                        type="submit"
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          art.status === "PUBLISHED"
                            ? "border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                            : "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                        }`}
                      >
                        {art.status === "PUBLISHED" ? "Despublicar" : "Publicar Agora"}
                      </button>
                    </fetcher.Form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORIES (ADM-005) */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-display font-light text-white">Categorias Editoriais</h2>
              <p className="text-xs text-[#86868b]">
                Taxonomia canônica do Journal para indexação e agrupamento de artigos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-5 rounded-xl border border-white/10 bg-[#0a0b0e] space-y-1"
                >
                  <h3 className="text-sm font-medium text-white">{cat.name}</h3>
                  <span className="text-xs font-mono text-[#86868b]">/{cat.slug}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal: New Article (ADM-004) */}
      {showNewArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#0a0b0e] p-8 text-[#f5f5f7] space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-display text-white">Novo Artigo Editorial</h3>
              <button
                type="button"
                onClick={() => setShowNewArticleModal(false)}
                className="text-[#86868b] hover:text-white"
              >
                ✕
              </button>
            </div>

            <fetcher.Form
              method="post"
              onSubmit={() => setShowNewArticleModal(false)}
              className="space-y-4 text-xs"
            >
              <input type="hidden" name="intent" value="save_article" />
              <div className="space-y-1">
                <label className="text-[#86868b] font-mono">TÍTULO</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Ex: Como o design de precisão reduz o CAC"
                  className="w-full bg-[#121318] border border-white/15 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#86868b] font-mono">SLUG (URL)</label>
                <input
                  type="text"
                  name="slug"
                  required
                  placeholder="ex: design-de-precisao-reduz-cac"
                  className="w-full bg-[#121318] border border-white/15 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#86868b] font-mono">CATEGORIA</label>
                  <input
                    type="text"
                    name="categoryName"
                    defaultValue="Estratégia & Decisão"
                    className="w-full bg-[#121318] border border-white/15 rounded-xl px-4 py-2 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#86868b] font-mono">TEMPO LEITURA (MIN)</label>
                  <input
                    type="number"
                    name="readingTimeMinutes"
                    defaultValue="5"
                    className="w-full bg-[#121318] border border-white/15 rounded-xl px-4 py-2 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#86868b] font-mono">RESUMO EDITORIAL (EXCERPT)</label>
                <textarea
                  name="excerpt"
                  rows={2}
                  placeholder="Síntese atraente para previews e meta description"
                  className="w-full bg-[#121318] border border-white/15 rounded-xl px-4 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#86868b] font-mono">PARÁGRAFO INICIAL</label>
                <textarea
                  name="bodyParagraph"
                  rows={3}
                  placeholder="Texto do primeiro bloco do artigo..."
                  className="w-full bg-[#121318] border border-white/15 rounded-xl px-4 py-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewArticleModal(false)}
                  className="px-4 py-2 rounded-full border border-white/15 text-xs text-[#86868b]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-white text-black text-xs font-medium"
                >
                  Criar Rascunho
                </button>
              </div>
            </fetcher.Form>
          </div>
        </div>
      )}

      {/* Modal: New Category (ADM-005) */}
      {showNewCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-[#0a0b0e] p-6 text-[#f5f5f7] space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-display text-white">Nova Categoria</h3>
              <button
                type="button"
                onClick={() => setShowNewCategoryModal(false)}
                className="text-[#86868b] hover:text-white"
              >
                ✕
              </button>
            </div>

            <fetcher.Form
              method="post"
              onSubmit={() => setShowNewCategoryModal(false)}
              className="space-y-4 text-xs"
            >
              <input type="hidden" name="intent" value="create_category" />
              <div className="space-y-1">
                <label className="text-[#86868b] font-mono">NOME DA CATEGORIA</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Ex: Engenharia de Software"
                  className="w-full bg-[#121318] border border-white/15 rounded-xl px-4 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#86868b] font-mono">SLUG</label>
                <input
                  type="text"
                  name="slug"
                  required
                  placeholder="ex: engenharia-de-software"
                  className="w-full bg-[#121318] border border-white/15 rounded-xl px-4 py-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewCategoryModal(false)}
                  className="px-4 py-2 rounded-full border border-white/15 text-xs text-[#86868b]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-white text-black text-xs font-medium"
                >
                  Salvar
                </button>
              </div>
            </fetcher.Form>
          </div>
        </div>
      )}
    </div>
  );
}
