import { and, eq } from "drizzle-orm";
import { db } from "../../../database/client.js";
import { tags } from "../../../database/schema/tags.schema.js";
import { CreateTagDTO } from "../dto/CreateTagDTO.js";
import { EditTagDTO } from "../dto/EditTagDTO.js";

export const createTag = async (teamId: string, data: CreateTagDTO) => {
  const [tag] = await db
    .insert(tags)
    .values({
      name: data.name,
      color: data.color,
      type: data.type,
      teamId: teamId,
    })
    .returning();

  return tag ?? null;
};
export const listAllTags = async () => {
  const result = await db.select().from(tags);
  return result ?? null;
};

export const tagsByTeamId = async (teamId: string) => {
  const result = await db.select().from(tags).where(eq(tags.teamId, teamId));
  return result ?? null;
};
export const ListTagById = async (tagId: string) => {
  const result = await db.select().from(tags).where(eq(tags.id, tagId));
  return result ?? null;
};
export const ListTagByIdTeam = async (tagId: string, teamId: string) => {
  const result = await db
    .select()
    .from(tags)
    .where(and(eq(tags.id, tagId), eq(tags.teamId, teamId)));
  return result ?? null;
};

export const EditTagById = async (id: string, data: EditTagDTO) => {
  const [tag] = await db
    .update(tags)
    .set(data)
    .where(eq(tags.id, id))
    .returning();
  return tag ?? null;
};
export const EditTagByIdTeam = async (
  id: string,
  data: EditTagDTO,
  teamId: string,
) => {
  const [tag] = await db
    .update(tags)
    .set(data)
    .where(and(eq(tags.id, id), eq(tags.teamId, teamId)))
    .returning();
  return tag ?? null;
};

export const RemoveTagById = async (id: string) => {
  const [tag] = await db.delete(tags).where(eq(tags.id, id)).returning();
  return tag ?? null;
};
export const RemoveTagByIdTeam = async (id: string, teamId: string) => {
  const [tag] = await db
    .delete(tags)
    .where(and(eq(tags.id, id), eq(tags.teamId, teamId)))
    .returning();
  return tag ?? null;
};
