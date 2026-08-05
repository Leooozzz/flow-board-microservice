import { RequestHandler } from "express";
import { ListUserByIdService } from "../service/ListUserByIdService.js";

export const ListUserByIdController: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await ListUserByIdService(String(userId), req.user!, req.accessToken!);
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
