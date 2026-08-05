import { RequestHandler } from "express";
import { ListTeamMembersService } from "../service/ListTeamMembersService.js";

export const ListTeamMembersController: RequestHandler = async (req, res, next) => {
  try {
    const data = await ListTeamMembersService(req.user!.id);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
