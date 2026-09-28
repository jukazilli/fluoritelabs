import { eq, desc, and } from "drizzle-orm";
import { getDb } from "../../data/db.server.ts";
import {
  articles,
  categories,
  type Article,
  type NewArticle,
  type Category,
} from "../../data/schema.ts";

export interface ArticleInput {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: unknown;
  coverImageUrl?: string | null;
  categoryId?: string | null;
  categoryName?: string | null;
  status: "DRAFT" | "PUBLISHED" | "UNPUBLISHED";
  readingTimeMinutes?: number;
  publishedAt?: Date | null;
}

/**
 * Canonical initial articles for JRN-003.
 */
export const INITIAL_ARTICLES: ArticleInput[] = [
  {
    slug: "site-institucional-ou-landing-page",
    title: "Site institucional ou landing page: qual faz sentido para o seu momento?",
    excerpt:
      "Entenda os trade-offs estratégicos entre construir autoridade perene de longo prazo ou criar funis táticos de conversão rápida.",
    categoryName: "Estratégia & Decisão",
    readingTimeMinutes: 4,
    status: "PUBLISHED",
    publishedAt: new Date("2026-03-10T10:00:00Z"),
    coverImageUrl: "/images/work-aethel.webp",
    content: [
      {
        id: "block-1",
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Uma das dúvidas mais comuns de fundadores e diretores de marketing ao planejar uma presença digital é escolher entre construir um site institucional completo ou apostar exclusivamente em landing pages táticas.",
          },
        ],
      },
      {
        id: "block-2",
        type: "heading",
        props: { level: 2 },
        content: [
          { type: "text", text: "O papel do site institucional: o anfitrião de longo prazo" },
        ],
      },
      {
        id: "block-3",
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Um site institucional funciona como a sede da sua empresa no mundo digital. Ele não é projetado para forçar uma venda imediata em um clique, mas sim para receber bem, transmitir solidez inegável e responder às perguntas críticas de quem está prestes a fechar um contrato relevante.",
          },
        ],
      },
      {
        id: "block-4",
        type: "blockquote",
        content: [
          {
            type: "text",
            text: "Assim como ninguém fecha um contrato de alto valor após ler apenas um anúncio, um decisor corporativo precisa de evidências sólidas de capacidade e visão antes de solicitar uma proposta.",
          },
        ],
      },
      {
        id: "block-5",
        type: "heading",
        props: { level: 2 },
        content: [{ type: "text", text: "A landing page: foco cirúrgico em uma ação" }],
      },
      {
        id: "block-6",
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "A landing page, por outro lado, elimina toda a dispersão. Seu único objetivo é converter tráfego qualificado de campanhas específicas, apresentando uma proposta de valor direta e sem distrações de menu ou links secundários.",
          },
        ],
      },
      {
        id: "block-7",
        type: "heading",
        props: { level: 2 },
        content: [{ type: "text", text: "A sinergia ideal" }],
      },
      {
        id: "block-8",
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Na Fluorite Labs, recomendamos frequentemente uma arquitetura combinada: um site institucional com design editorial e velocidade extrema servindo como base de autoridade, e landing pages cirúrgicas para campanhas pagas de alta velocidade.",
          },
        ],
      },
    ],
  },
  {
    slug: "site-industria-b2b-confianca",
    title: "O que um site de indústria B2B precisa demonstrar para gerar confiança imediata?",
    excerpt:
      "Como telemetria visual, especificações técnicas rigorosas e clareza arquitetural encurtam ciclos de negociação high-ticket.",
    categoryName: "Indústria & B2B",
    readingTimeMinutes: 6,
    status: "PUBLISHED",
    publishedAt: new Date("2026-03-05T14:30:00Z"),
    coverImageUrl: "/images/work-vektor.webp",
    content: [
      {
        id: "block-1",
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Vendas industriais entre empresas envolvem comitês técnicos rigorosos. Engenheiros, diretores de operações e gerentes de suprimentos não são convencidos por retórica publicitária genérica.",
          },
        ],
      },
      {
        id: "block-2",
        type: "heading",
        props: { level: 2 },
        content: [{ type: "text", text: "A precisão como linguagem de marca" }],
      },
      {
        id: "block-3",
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Quando um cliente industrial visita seu site, a interface inteira está comunicando o rigor dos seus processos produtivos. Um site lento, com tabelas desformatadas no celular ou imagens com ruído transmite descuido operacional imediato.",
          },
        ],
      },
      {
        id: "block-4",
        type: "heading",
        props: { level: 2 },
        content: [{ type: "text", text: "Três elementos indispensáveis" }],
      },
      {
        id: "block-5",
        type: "bulletListItem",
        content: [
          {
            type: "text",
            text: "Telemetria e especificações acessíveis: tabelas de tolerância, normas técnicas e certificações fáceis de consultar e baixar.",
          },
        ],
      },
      {
        id: "block-6",
        type: "bulletListItem",
        content: [
          {
            type: "text",
            text: "Visualização autêntica de componentes: imagens em altíssima resolução com renderização rápida e sem distorção.",
          },
        ],
      },
      {
        id: "block-7",
        type: "bulletListItem",
        content: [
          {
            type: "text",
            text: "Caminho desimpedido para contato com a engenharia de aplicação, sem formulários burocráticos de 20 campos.",
          },
        ],
      },
    ],
  },
  {
    slug: "por-que-sites-bonitos-nao-convertem",
    title: "Por que sites esteticamente bonitos ainda podem falhar em conversão?",
    excerpt:
      "A fronteira crítica entre polimento visual decorativo e arquitetura cognitiva de decisão desenhada para gerar confiança.",
    categoryName: "UX & Performance",
    readingTimeMinutes: 5,
    status: "PUBLISHED",
    publishedAt: new Date("2026-02-22T09:15:00Z"),
    coverImageUrl: "/images/work-lumena.webp",
    content: [
      {
        id: "block-1",
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Existe um equívoco perigoso no mercado digital: acreditar que um site bonito é, por si só, um site que converte. O design puramente decorativo é frequentemente o maior culpado pela baixa conversão.",
          },
        ],
      },
      {
        id: "block-2",
        type: "heading",
        props: { level: 2 },
        content: [{ type: "text", text: "Fricção cognitiva e excesso de ruído" }],
      },
      {
        id: "block-3",
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Quando a estética compete com a mensagem, o visitante se perde. Animações lentas que atrasam a leitura, contrastes apagados que cansam os olhos e carrosséis que giram sem controle são sintomas de um design focado em impressionar outros designers, não em servir o cliente.",
          },
        ],
      },
      {
        id: "block-4",
        type: "blockquote",
        content: [
          {
            type: "text",
            text: "O verdadeiro luxo técnico não grita. Ele se manifesta no carregamento imperceptível, na tipografia que guia o olhar com serenidade e na facilidade com que o cliente encontra exatamente o que precisa.",
          },
        ],
      },
      {
        id: "block-5",
        type: "heading",
        props: { level: 2 },
        content: [{ type: "text", text: "O princípio da decisão sem atrito" }],
      },
      {
        id: "block-6",
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Na Fluorite Labs, cada decisão visual é submetida a uma pergunta simples: isso facilita a decisão do visitante ou adiciona atrito? Se adiciona atrito, é eliminado sem piedade.",
          },
        ],
      },
    ],
  },
];

/**
 * Retrieves public published articles for the Journal index.
 * Spec: JRN-001, JRN-006.
 */
export async function getPublishedArticles(databaseUrl?: string): Promise<Article[]> {
  const dbUrl = databaseUrl || process.env.DATABASE_URL;
  if (!dbUrl) return [];

  try {
    const db = getDb(dbUrl);
    return await db
      .select()
      .from(articles)
      .where(eq(articles.status, "PUBLISHED"))
      .orderBy(desc(articles.publishedAt));
  } catch (err) {
    console.error("[Journal Repository] Error fetching published articles:", err);
    return [];
  }
}

/**
 * Retrieves article by slug with optional draft inclusion for private preview.
 * Spec: JRN-002, JRN-005.
 */
export async function getArticleBySlug(
  slug: string,
  options: { includeDrafts?: boolean } = {},
  databaseUrl?: string,
): Promise<Article | null> {
  const dbUrl = databaseUrl || process.env.DATABASE_URL;
  if (!dbUrl) return null;

  try {
    const db = getDb(dbUrl);
    const conditions = options.includeDrafts
      ? eq(articles.slug, slug)
      : and(eq(articles.slug, slug), eq(articles.status, "PUBLISHED"));

    const [found] = await db.select().from(articles).where(conditions).limit(1);
    return found || null;
  } catch (err) {
    console.error(`[Journal Repository] Error fetching article '${slug}':`, err);
    return null;
  }
}

/**
 * Retrieves all articles for the authenticated Admin panel.
 * Spec: ADM-004.
 */
export async function getAllArticlesAdmin(databaseUrl?: string): Promise<Article[]> {
  const dbUrl = databaseUrl || process.env.DATABASE_URL;
  if (!dbUrl) return [];

  try {
    const db = getDb(dbUrl);
    return await db.select().from(articles).orderBy(desc(articles.createdAt));
  } catch (err) {
    console.error("[Journal Repository] Error fetching admin articles:", err);
    return [];
  }
}

/**
 * Creates or updates an article in Neon PostgreSQL.
 * Spec: ADM-004, JRN-006.
 */
export async function createOrUpdateArticle(
  input: ArticleInput,
  databaseUrl?: string,
): Promise<Article> {
  const dbUrl = databaseUrl || process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL not configured");
  }

  const db = getDb(dbUrl);
  const articleId =
    input.id || `art_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;

  const record: NewArticle = {
    id: articleId,
    slug: input.slug.trim().toLowerCase(),
    title: input.title.trim(),
    excerpt: input.excerpt?.trim() || null,
    content: input.content,
    coverImageUrl: input.coverImageUrl || null,
    categoryId: input.categoryId || null,
    categoryName: input.categoryName || null,
    status: input.status,
    readingTimeMinutes: input.readingTimeMinutes || 1,
    publishedAt: input.status === "PUBLISHED" ? input.publishedAt || new Date() : null,
    updatedAt: new Date(),
  };

  const [saved] = await db
    .insert(articles)
    .values(record)
    .onConflictDoUpdate({
      target: articles.slug,
      set: {
        title: record.title,
        excerpt: record.excerpt,
        content: record.content,
        coverImageUrl: record.coverImageUrl,
        categoryId: record.categoryId,
        categoryName: record.categoryName,
        status: record.status,
        readingTimeMinutes: record.readingTimeMinutes,
        publishedAt: record.publishedAt,
        updatedAt: new Date(),
      },
    })
    .returning();

  return saved;
}

/**
 * Updates status of an article (DRAFT / PUBLISHED / UNPUBLISHED).
 * Spec: JRN-006.
 */
export async function updateArticleStatus(
  articleId: string,
  newStatus: "DRAFT" | "PUBLISHED" | "UNPUBLISHED",
  databaseUrl?: string,
): Promise<Article | null> {
  const dbUrl = databaseUrl || process.env.DATABASE_URL;
  if (!dbUrl) return null;

  const db = getDb(dbUrl);
  const [updated] = await db
    .update(articles)
    .set({
      status: newStatus,
      publishedAt: newStatus === "PUBLISHED" ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, articleId))
    .returning();

  return updated || null;
}

/**
 * Retrieves all categories.
 * Spec: ADM-005.
 */
export async function getCategories(databaseUrl?: string): Promise<Category[]> {
  const dbUrl = databaseUrl || process.env.DATABASE_URL;
  if (!dbUrl) return [];

  try {
    const db = getDb(dbUrl);
    return await db.select().from(categories).orderBy(categories.name);
  } catch (err) {
    console.error("[Journal Repository] Error fetching categories:", err);
    return [];
  }
}

/**
 * Seeds initial articles and categories idempotently.
 * Spec: JRN-003.
 */
export async function seedInitialJournalContent(databaseUrl?: string): Promise<void> {
  const dbUrl = databaseUrl || process.env.DATABASE_URL;
  if (!dbUrl) return;

  try {
    const db = getDb(dbUrl);
    const existing = await db.select().from(articles).limit(1);

    if (existing.length === 0) {
      console.log("[Journal Seed] Populating canonical initial articles (JRN-003)...");
      for (const item of INITIAL_ARTICLES) {
        await createOrUpdateArticle(item, dbUrl);
      }
      console.log("[Journal Seed] Seed completed successfully!");
    }
  } catch (err) {
    console.warn("[Journal Seed] Non-blocking seed issue:", err);
  }
}
