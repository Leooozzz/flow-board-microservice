import { RequestHandler } from "express";
import { UpdateUserSchema } from "../schemas/UpdateUserSchema.js";
import { UpdateUserService } from "../service/UpdateUserService.js";

export const UpdateUserController: RequestHandler = async (req, res, next) => {
  try {
    const data = UpdateUserSchema.parse(req.body);
    const { userId } = req.params;
    const user = await UpdateUserService(String(userId), data, req.user!);
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
