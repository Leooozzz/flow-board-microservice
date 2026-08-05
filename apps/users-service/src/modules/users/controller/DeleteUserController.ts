import { RequestHandler } from "express";
import { DeleteUserService } from "../service/DeleteUserService.js";

export const DeleteUserController: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await DeleteUserService(String(userId), req.user!);
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
