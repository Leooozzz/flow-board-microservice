import { AppError } from "../errors/AppError.js";
import { AuthUser } from "../middlewares/AuthMiddleware.js";
import { listAllTags } from "../repository/TagsRepository.js";

export const ListTagsService = async (user: AuthUser) => {
  if (user.role !== "ADMIN") {
    throw new AppError(403, "Forbidden");
  }
  const tags = await listAllTags();
  if (!tags) {
    throw new AppError(404, "Error to find tags");
  }
  return tags;
};
