import { AppError } from "../../../shared/errors/AppError.js";
import { PublishUserCreatedEvent } from "../../../shared/events/EventPublisher.js";
import { SingUpDTO } from "../dto/SingUpDTO.js";
import { JwtSignAccess, JwtSignRefresh } from "../libs/JwtLib.js";
import { PasswordHash } from "../libs/PasswordLib.js";
import { CreateUser, FindByEmail } from "../repository/UsersRepository.js";
import { FormatUser, UserResponse } from "../utils/FormatUser.js";

export interface SingUpResult {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}
export const SingUpService = async (data: SingUpDTO): Promise<SingUpResult> => {
  const existingUser = await FindByEmail(data.email);
  if (existingUser) {
    throw new AppError(409, "Email Existis");
  }

  const hashPassword = await PasswordHash(data.password);
  const user = await CreateUser({ ...data, password: hashPassword });

  await PublishUserCreatedEvent({
    userId: user.id,
    name: user.name,
    email: user.email,
  });

  const accessToken = JwtSignAccess(user.id, user.role);
  const refreshToken = JwtSignRefresh(user.id, user.role);

  return {
    user: FormatUser(user),
    accessToken,
    refreshToken,
  };
};
