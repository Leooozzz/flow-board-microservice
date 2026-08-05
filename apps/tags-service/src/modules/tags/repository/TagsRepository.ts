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
