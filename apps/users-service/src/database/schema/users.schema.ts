import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const authRoleEnum = pgEnum("user_role", ["ADMIN", "USER"]);
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  email: varchar("email", {
    length: 255,
  })
    .notNull()
    .unique(),
  password: varchar("password", {
    length: 255,
  }).notNull(),
  avatarUrl: varchar("avatar_url", {
    length: 500,
  }),
  role: authRoleEnum("role").notNull().default("USER"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
