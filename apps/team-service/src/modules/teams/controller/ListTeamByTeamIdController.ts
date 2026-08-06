import { RequestHandler } from "express";
import { ListTeamByIdService } from "../service/ListTeamByIdService.js";

export const ListTeamByTeamIdController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { teamId } = req.params;
    const team = await ListTeamByIdService(String(teamId),req.user!);
    return res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};
