import { AppError } from "../../../shared/errors/AppError.js";
import { AuthUser } from "../../../shared/middleware/AuthMiddleware.js";
import { DeleteTeamById, FindTeamById } from "../repository/TeamRepository.js";

export const DeleteTeamByIdService = async (teamId: string, user: AuthUser) => {
  const existing = await FindTeamById(teamId);
  if (!existing) {
    throw new AppError(404, "Team not found");
  }
  if (user.role !== "ADMIN" && existing.ownerId !== user.id) {
    throw new AppError(403, "Forbidden");
  }
  const team = await DeleteTeamById(teamId);
  return team;
};
