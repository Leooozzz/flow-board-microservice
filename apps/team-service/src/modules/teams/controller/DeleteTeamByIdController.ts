import { RequestHandler } from "express";
import { AuthUser } from "../../../shared/middleware/AuthMiddleware.js";
import { DeleteTeamByIdService } from "../service/DeleteTeamByIdService.js";

export const DeleteTeamByIdController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { teamId } = req.params;
    const team = await DeleteTeamByIdService(String(teamId), req.user!);
    return res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};
