import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const columns = pgTable("columns", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  position: integer("position").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});