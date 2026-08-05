import { AppError } from "../../../shared/errors/AppError.js";
import { AuthUser } from "../../../shared/middleware/AuthMiddleware.js";
import { EditTeamDTO } from "../dto/EditTeamDTO.js";
import { FindTeamById, updateTeam } from "../repository/TeamRepository.js";

export const EditTeamByIdService = async (
  teamId: string,
  user: AuthUser,
  data: EditTeamDTO,
) => {
  const existing = await FindTeamById(teamId);
  if (!existing) {
    throw new AppError(404, "Team not found");
  }
  if (user.role !== "ADMIN" && existing.ownerId !== user.id) {
    throw new AppError(403, "Forbidden");
  }
  const updated = await updateTeam(teamId, data);
  if (!updated) {
    throw new AppError(404, "Team not found");
  }
  return updated;
};
