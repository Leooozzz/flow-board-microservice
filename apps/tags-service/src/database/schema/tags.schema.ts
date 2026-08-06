import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const tagEnum = pgEnum("tags_enum_type", ["PROJECT", "CARD"]);

export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  teamId: uuid("team_id").notNull(),
  type: tagEnum().notNull(),
  color: varchar("color_tag", {
    length: 255,
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tagsRelated = pgTable("tags_related", {
  id: uuid("id").primaryKey().defaultRandom(),
  tagId: uuid("tags_id")
    .notNull()
    .references(() => tags.id, { onDelete: "cascade" }),
  projectId: uuid("project_id"),
  cardId: uuid("card_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
