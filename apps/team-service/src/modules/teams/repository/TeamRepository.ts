import { eq } from "drizzle-orm";
import { db } from "../../../database/client.js";
import { teamMembers, teams } from "../../../database/schema/teams.schema.js";
import { EditTeamDTO } from "../dto/EditTeamDTO.js";

export const FindTeamByOwnerId = async (ownerId: string) => {
  const result = await db
    .select()
    .from(teams)
    .where(eq(teams.ownerId, ownerId));
  return result[0] ?? null;
};

export const CreateTeam = async (data: { name: string; ownerId: string }) => {
  const [team] = await db.insert(teams).values(data).returning();
  return team!;
};

export const FindMembershipByUserId = async (userId: string) => {
  const result = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.userId, userId));
  return result[0] ?? null;
};

export const FindMembersByTeamId = async (teamId: string) => {
  return await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.teamId, teamId));
};

export const AddMember = async (data: {
  teamId: string;
  userId: string;
  role: "OWNER" | "MEMBER";
}) => {
  const [member] = await db
    .insert(teamMembers)
    .values(data)
    .onConflictDoNothing()
    .returning();

  return member ?? null;
};

export const RemoveMember = async (userId: string) => {
  const [member] = await db
    .delete(teamMembers)
    .where(eq(teamMembers.userId, userId))
    .returning();

  return member ?? null;
};

export const DeleteTeamById = async (teamId: string) => {
  const [team] = await db.delete(teams).where(eq(teams.id, teamId)).returning();
  return team ?? null;
};

export const FindTeamById = async (teamId: string) => {
  const team = await db.select().from(teams).where(eq(teams.id, teamId));
  return team[0] ?? null;
};
export const updateTeam = async (teamId: string, data: EditTeamDTO) => {
  const [team] = await db
    .update(teams)
    .set({ name: data.name })
    .where(eq(teams.id, teamId))
    .returning();
  return team;
};
