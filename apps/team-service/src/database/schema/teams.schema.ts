import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const teamMemberRoleEnum = pgEnum("team_member_role", ["OWNER", "MEMBER"]);

export const teams = pgTable("teams", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  ownerId: uuid("owner_id").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const teamMembers = pgTable("team_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  teamId: uuid("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull().unique(),
  role: teamMemberRoleEnum("role").notNull().default("MEMBER"),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});
