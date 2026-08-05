import { AppError } from "../../../shared/errors/AppError.js";
import { FindById } from "../repository/UsersRepository.js";
import { FormatUser, UserResponse } from "../utils/FormatUser.js";

export const GetMeService = async (id: string): Promise<UserResponse> => {
  const user = await FindById(id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return FormatUser(user);
};
