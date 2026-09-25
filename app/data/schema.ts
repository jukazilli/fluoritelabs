import { pgTable, text, varchar, timestamp, jsonb, integer, index } from "drizzle-orm/pg-core";

// ============================================================================
// 1. Leads / Microbriefing Schema (docs/01, docs/02, docs/04, docs/06)
// ============================================================================

export const leads = pgTable(
  "leads",
  {
    id: text("id").primaryKey(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    need: text("need").notNull(),
    budget: varchar("budget", { length: 100 }).notNull(),
    status: varchar("status", { length: 50 }).notNull().default("NEW"),
    whatsappHandoffAt: timestamp("whatsapp_handoff_at", {
      withTimezone: true,
    }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("leads_status_idx").on(table.status),
    index("leads_created_at_idx").on(table.createdAt),
  ],
);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;

// ============================================================================
// 2. Journal Articles Schema (docs/01, docs/02, docs/06, docs/08)
// ============================================================================

export const articles = pgTable(
  "articles",
  {
    id: text("id").primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt"),
    content: jsonb("content").notNull(),
    coverImageUrl: text("cover_image_url"),
    status: varchar("status", { length: 50 }).notNull().default("DRAFT"),
    readingTimeMinutes: integer("reading_time_minutes").default(1),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("articles_slug_idx").on(table.slug),
    index("articles_status_idx").on(table.status),
    index("articles_published_at_idx").on(table.publishedAt),
  ],
);

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;

// ============================================================================
// 3. Journal Categories Schema
// ============================================================================

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
