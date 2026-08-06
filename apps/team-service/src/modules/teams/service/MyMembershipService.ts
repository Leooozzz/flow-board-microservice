import { AppError } from "../../../shared/errors/AppError.js";
import { AuthUser } from "../../../shared/middleware/AuthMiddleware.js";
import { FindMembershipByUserId } from "../repository/TeamRepository.js";

export const MyMembershipService = async (user: AuthUser) => {
  const membership = await FindMembershipByUserId(user.id);

  if (!membership) {
    throw new AppError(404, "User is not part of any team");
  }

  return {
    teamId: membership.teamId,
    userId: membership.userId,
    role: membership.role,
    joinedAt: membership.joinedAt,
  };
};
