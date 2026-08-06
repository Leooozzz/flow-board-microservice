import { resolve } from "node:dns";
import { FetchTeamOwnerId } from "../../teams/FetchTeamOwnerId.js";
import { AppError } from "../errors/AppError.js";
import { AuthUser } from "../middlewares/AuthMiddleware.js";
import {
  ListTagByIdTeam,
  RemoveTagById,
  RemoveTagByIdTeam,
} from "../repository/TagsRepository.js";

export const RemoveTagByIdService = async (
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
    const tagRemoved = await RemoveTagByIdTeam(id, userTeam.teamId);
    if (!tagRemoved) {
      throw new AppError(404, "Tag not found");
    }
    return tagRemoved;
  }
  const tag = await RemoveTagById(id);
  if (!tag) {
    throw new AppError(404, "Tag not found");
  }
  return tag;
};
