import { AppError } from "../../../shared/errors/AppError.js";
import { FetchUserById } from "../../users/libs/UserServiceClient.js";
import { FindMembershipByUserId } from "../repository/TeamRepository.js";

export const ManagerByIdService = async (
  userId: string,
  accessToken: string,
) => {
  await FetchUserById(accessToken, userId);
  const membership = await FindMembershipByUserId(userId);
  if (membership) {
    throw new AppError(409, "User already belongs to a team");
  }
  return membership;
};
