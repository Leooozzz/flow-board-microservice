import { AppError } from "../../../shared/errors/AppError.js";
import { AuthUser } from "../../../shared/middleware/AuthMiddleware.js";
import { GetTeamById } from "../repository/TeamRepository.js";

export const ListTeamByIdService = async (teamId: string, user: AuthUser) => {
  if (user.role !== "ADMIN") {
    throw new AppError(403, "Forbidden");
  }
  const team = await GetTeamById(teamId);
  if (!team) {
    throw new AppError(404, "Team not found");
  }
  return team;
};
