import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  text,
  integer,
} from "drizzle-orm/pg-core";

export const cards = pgTable("cards", {
  id: uuid("id").primaryKey().defaultRandom(),
  columnId: uuid("column_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  position: integer("position").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});