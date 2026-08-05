import { RequestHandler } from "express";
import { ManagerRemoveUserService } from "../service/ManagerRemoveUserService.js";

export const ManagerRemoveUserController: RequestHandler = async (req, res, next) => {
  try {
    const { userId, teamId } = req.params;
    const accessToken = req.accessToken;
    const team = await ManagerRemoveUserService(String(userId),String(teamId),accessToken!,req.user!)
    return res.status(204).json(team)
  } catch (error) {
    next(error);
  }
};
