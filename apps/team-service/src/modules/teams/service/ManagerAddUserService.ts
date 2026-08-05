import { AppError } from "../../../shared/errors/AppError.js";
import { AuthUser } from "../../../shared/middleware/AuthMiddleware.js";
import { FetchUserById } from "../../users/libs/UserServiceClient.js";
import {
  AddMember,
  FindMembershipByUserId,
  FindTeamById,
} from "../repository/TeamRepository.js";

export const ManagerAddUserService = async (
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
  const userAdd = await AddMember({
    userId: userId,
    teamId: teamId,
    role: "MEMBER",
  });
  if (!userAdd) {
    throw new AppError(409, "Failed to add user to the team");
  }
  return userAdd;
};
