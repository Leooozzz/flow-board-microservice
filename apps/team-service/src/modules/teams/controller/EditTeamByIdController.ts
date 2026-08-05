import { RequestHandler } from "express";
import { EditTeamByIdService } from "../service/EditTeamByIdService.js";
import { EditTeamSchema } from "../schema/EditTeamSchema.js";

export const EditTeamByIdController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { teamId } = req.params;
    const data = EditTeamSchema.parse(req.body);
    const team = await EditTeamByIdService(String(teamId), req.user!, data);
    return res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};
