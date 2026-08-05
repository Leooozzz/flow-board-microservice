import { AppError } from "../../../shared/errors/AppError.js";
import { AuthUser } from "../../../shared/middleware/AuthMiddleware.js";
import { FetchUserById } from "../../users/libs/UserServiceClient.js";
import {
  FindMembershipByUserId,
  FindTeamById,
  RemoveMember,
} from "../repository/TeamRepository.js";

export const ManagerRemoveUserService = async (
  userId: string,
  teamId: string,
  accessToken: string,
  requester: AuthUser,
) => {
  const existingTeam = await FindTeamById(teamId);
  if (!existingTeam) {
    throw new AppError(404, "Team not found");
  }
  if (requester.role !== "ADMIN" && existingTeam.ownerId !== requester.id) {
    throw new AppError(403, "Forbidden");
  }
  await FetchUserById(accessToken, userId);
  const membership = await FindMembershipByUserId(userId);
  if (membership) {
    throw new AppError(409, "User already belongs to a team");
  }
  const removeMember = await RemoveMember(userId);
  if (!removeMember) {
    throw new AppError(409, "Failed to remove user to the team");
  }
  return removeMember;
};
