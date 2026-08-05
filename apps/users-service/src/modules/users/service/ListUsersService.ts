import { AuthUser } from "../../../shared/middleware/AuthMiddleware.js";
import { FetchMyTeamMembers } from "../libs/TeamServiceClient.js";
import { FindManyByIds, ListAllUsers } from "../repository/UsersRepository.js";
import { FormatUser, UserResponse } from "../utils/FormatUser.js";

export const ListUsersService = async (
  user: AuthUser,
  accessToken: string,
): Promise<UserResponse[]> => {
  if (user.role === "ADMIN") {
    const users = await ListAllUsers();
    return users.map(FormatUser);
  }

  const { members } = await FetchMyTeamMembers(accessToken);
  const userIds = members.map((member) => member.userId);
  const users = await FindManyByIds(userIds);

  return users.map(FormatUser);
};
