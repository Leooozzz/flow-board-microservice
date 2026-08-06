import { FetchTeamOwnerId } from "../../teams/FetchTeamOwnerId.js";
import { AppError } from "../errors/AppError.js";
import { AuthUser } from "../middlewares/AuthMiddleware.js";
import { listAllTags, tagsByTeamId } from "../repository/TagsRepository.js";

export const ListTagsService = async (user: AuthUser, accessToken: string) => {
  if (user.role !== "ADMIN") {
    const userTeam = await FetchTeamOwnerId(accessToken);
    const tags = await tagsByTeamId(userTeam.teamId);
    if (!tags) {
      throw new AppError(404, "Error to find tags");
    }
    return tags;
  }
  const tags = await listAllTags();
  if (!tags) {
    throw new AppError(404, "Error to find tags");
  }
  return tags;
};
