import { FetchTeamOwnerId } from "../../teams/FetchTeamOwnerId.js";
import { AppError } from "../errors/AppError.js";
import { AuthUser } from "../middlewares/AuthMiddleware.js";
import { ListTagById, ListTagByIdTeam } from "../repository/TagsRepository.js";

export const ListTagByIdService = async (
  id: string,
  accessToken: string,
  user: AuthUser,
) => {
  if (user.role !== "ADMIN") {
    const userTeam = await FetchTeamOwnerId(accessToken);
    const tag = await ListTagByIdTeam(id, userTeam.teamId);
    if (!tag) {
      throw new AppError(404, "Tag not found");
    }
    return tag;
  }
  const tag = await ListTagById(id);
  if (!tag) {
    throw new AppError(404, "Tag not found");
  }
  return tag;
};
