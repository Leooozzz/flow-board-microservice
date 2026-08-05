import { AppError } from "../../../shared/errors/AppError.js";
import { AuthUser } from "../../../shared/middleware/AuthMiddleware.js";
import { UpdateUserDTO } from "../dto/UpdateUserDTO.js";
import { PasswordHash } from "../libs/PasswordLib.js";
import {
  FindByEmail,
  FindById,
  UpdateUser,
} from "../repository/UsersRepository.js";
import { FormatUser, UserResponse } from "../utils/FormatUser.js";

export const UpdateUserService = async (
  id: string,
  data: UpdateUserDTO,
  user: AuthUser,
): Promise<UserResponse> => {
  if (user.role !== "ADMIN" && user.id !== id) {
    throw new AppError(403, "You can only update your own user");
  }

  const existing = await FindById(id);
  if (!existing) {
    throw new AppError(404, "User not found");
  }

  if (data.email && data.email !== existing.email) {
    const emailTaken = await FindByEmail(data.email);
    if (emailTaken) {
      throw new AppError(409, "Email already in use");
    }
  }

  const password = data.password
    ? await PasswordHash(data.password)
    : undefined;

  const updated = await UpdateUser(id, {
    name: data.name,
    email: data.email,
    avatarUrl: data.avatarUrl,
    password,
  });

  if (!updated) {
    throw new AppError(404, "User not found");
  }

  return FormatUser(updated);
};
