import { FetchTeamExisting } from "../../teams/FetchTeamExisting.js";
import { CreateTagDTO } from "../dto/CreateTagDTO.js";
import { AppError } from "../errors/AppError.js";
import { AuthUser } from "../middlewares/AuthMiddleware.js";
import { createTag } from "../repository/TagsRepository.js";

export const CreateTagByTeamIdService = async (
  teamId: string,
  user: AuthUser,
  accessToken: string,
  data: CreateTagDTO,
) => {
  if (user.role !== "ADMIN") {
    throw new AppError(403, "Forbidden");
  }
  const existingTeam = await FetchTeamExisting(teamId, accessToken);
  if (!existingTeam) {
    throw new AppError(404, "Team not found");
  }
  const tag = await createTag(existingTeam.id, data);
  if (!tag) {
    throw new AppError(400, "Error to create Tag");
  }
  return tag;
};
