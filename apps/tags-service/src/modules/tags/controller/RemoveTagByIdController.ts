import { RequestHandler } from "express";
import { RemoveTagByIdService } from "../service/RemoveTagByIdService.js";

export const RemoveTagByIdController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { id } = req.params;
    const accessToken = req.accessToken;
    const tag = await RemoveTagByIdService(String(id), accessToken!, req.user!);
    return res.status(204).json(tag);
  } catch (error) {
    next(error);
  }
};
