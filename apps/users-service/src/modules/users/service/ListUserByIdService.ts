import { AppError } from "../../../shared/errors/AppError.js";
import { AuthUser } from "../../../shared/middleware/AuthMiddleware.js";
import { FetchMyTeamMembers } from "../libs/TeamServiceClient.js";
import { FindById } from "../repository/UsersRepository.js";
import { FormatUser, UserResponse } from "../utils/FormatUser.js";

export const ListUserByIdService = async (
  id: string,
  user: AuthUser,
  accessToken: string,
): Promise<UserResponse> => {
  if (user.role === "ADMIN") {
    const found = await FindById(id);
    if (!found) {
      throw new AppError(404, "User not found");
    }
    return FormatUser(found);
  }

  const { members } = await FetchMyTeamMembers(accessToken);
  const isInTeam = members.some((member) => member.userId === id);
  if (!isInTeam) {
    throw new AppError(403, "You can only view users from your own team");
  }

  const found = await FindById(id);
  if (!found) {
    throw new AppError(404, "User not found");
  }
  return FormatUser(found);
};
