import { AppError } from "../../../shared/errors/AppError.js";
import { SingInDTO } from "../dto/SingInDTO.js";
import { JwtSignAccess, JwtSignRefresh } from "../libs/JwtLib.js";
import { PasswordCompare } from "../libs/PasswordLib.js";
import { FindByEmail } from "../repository/UsersRepository.js";
import { FormatUser, UserResponse } from "../utils/FormatUser.js";

export interface SingInResult {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}

export const SingInService = async (data: SingInDTO): Promise<SingInResult> => {
  const user = await FindByEmail(data.email);

  if (!user) {
    throw new AppError(401, "Invalid Credentials");
  }

  const passwordMatch = await PasswordCompare(data.password, user.password);
  if (!passwordMatch) {
    throw new AppError(401, "Invalid Credentials");
  }

  const accessToken = JwtSignAccess(user.id, user.role);
  const refreshToken = JwtSignRefresh(user.id, user.role);

  return {
    user: FormatUser(user),
    accessToken,
    refreshToken,
  };
};
