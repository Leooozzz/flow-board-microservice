import { AppError } from "../../../shared/errors/AppError.js";
import { PublishUserDeletedEvent } from "../../../shared/events/EventPublisher.js";
import { AuthUser } from "../../../shared/middleware/AuthMiddleware.js";
import { DeleteUser, FindById } from "../repository/UsersRepository.js";
import { FormatUser, UserResponse } from "../utils/FormatUser.js";

export const DeleteUserService = async (
  id: string,
  user: AuthUser,
): Promise<UserResponse> => {
  if (user.role !== "ADMIN" && user.id !== id) {
    throw new AppError(403, "You can only delete your own user");
  }

  const existing = await FindById(id);
  if (!existing) {
    throw new AppError(404, "User not found");
  }

  const deleted = await DeleteUser(id);
  if (!deleted) {
    throw new AppError(404, "User not found");
  }

  await PublishUserDeletedEvent({ userId: id, deletedBy: user.id });

  return FormatUser(deleted);
};
