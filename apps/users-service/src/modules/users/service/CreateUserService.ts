import { AppError } from "../../../shared/errors/AppError.js";
import { PublishUserCreatedEvent } from "../../../shared/events/EventPublisher.js";
import { CreateUserDTO } from "../dto/CreateUserDTO.js";
import { PasswordHash } from "../libs/PasswordLib.js";
import { CreateUser, FindByEmail } from "../repository/UsersRepository.js";
import { FormatUser, UserResponse } from "../utils/FormatUser.js";

export interface CreateUserResponse {
  user: UserResponse;
}

export const CreateUserService = async (
  data: CreateUserDTO,
  creatorId: string,
): Promise<CreateUserResponse> => {
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
    createdBy: creatorId,
  });

  return {
    user: FormatUser(user),
  };
};
