import { RequestHandler } from "express";
import { ListTagsByTeamIdService } from "../service/ListTagsByTeamIdService.js";

export const ListTagsByTeamIdController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { teamId } = req.params;
    const accessToken = req.accessToken;
    const tags = await ListTagsByTeamIdService(
      String(teamId),
      req.user!,
      accessToken!,
    );
    return res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};
