import { RequestHandler } from "express";
import { ManagerByIdService } from "../service/ManagerByIdService.js";

export const ManagerByIdController: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const accessToken = req.accessToken;
    const user = await ManagerByIdService(String(userId),accessToken!);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
