import { FetchTeamExisting } from "../../teams/FetchTeamExisting.js";
import { AppError } from "../errors/AppError.js";
import { AuthUser } from "../middlewares/AuthMiddleware.js";
import { tagsByTeamId } from "../repository/TagsRepository.js";

export const ListTagsByTeamIdService = async (
  teamId: string,
  user: AuthUser,
  accessToken: string,
) => {
  if (user.role !== "ADMIN") {
    throw new AppError(403, "Forbidden");
  }
  const existingTeam = await FetchTeamExisting(teamId, accessToken);
  if (!existingTeam) {
    throw new AppError(404, "Team not found");
  }
  const tags = await tagsByTeamId(teamId);
  if (!tags) {
    throw new AppError(404, "Tags not found");
  }
  return tags;
};
