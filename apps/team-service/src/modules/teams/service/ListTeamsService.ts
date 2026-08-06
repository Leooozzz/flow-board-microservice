import { AppError } from "../../../shared/errors/AppError.js";
import { AuthUser } from "../../../shared/middleware/AuthMiddleware.js";
import { ListAllTeams } from "../repository/TeamRepository.js";

export const ListTeamsService = async (user: AuthUser) => {
  if (user.role !== "ADMIN") {
    throw new AppError(403, "Forbidden");
  }
  const teams = await ListAllTeams();
  if (!teams) {
    throw new AppError(404, "Teams not found");
  }
  return teams;
};
