import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  text,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  teamId: uuid("team_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});