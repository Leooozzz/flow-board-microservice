import { RequestHandler } from "express";
import { CreateTagByTeamIdService } from "../service/CreateTagByTeamIdService.js";
import { CreateTagSchema } from "../schema/CreateTagSchema.js";

export const CreateTagByTeamIdController: RequestHandler = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const accessToken = req.accessToken;
    const data = CreateTagSchema.parse(req.body)
    const tag = await CreateTagByTeamIdService(String(teamId),req.user!,accessToken!,data)
    return res.status(201).json(tag)
  } catch (error) {
    next(error);
  }
};
