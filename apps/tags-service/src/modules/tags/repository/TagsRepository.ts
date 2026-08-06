import { eq } from "drizzle-orm";
import { db } from "../../../database/client.js";
import { tags } from "../../../database/schema/tags.schema.js";
import { CreateTagDTO } from "../dto/CreateTagDTO.js";

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
