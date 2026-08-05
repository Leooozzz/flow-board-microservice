import { RequestHandler } from "express";
import { CreateTagByTeamIdService } from "../service/CreateTagByTeamIdService.js";

export const CreateTagByTeamIdController: RequestHandler = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const accessToken = req.accessToken;
    const tag = await CreateTagByTeamIdService(String(teamId),req.user!,accessToken!)
  } catch (error) {
    next(error);
  }
};
