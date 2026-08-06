import { RequestHandler } from "express";
import { ListTagByIdService } from "../service/ListTagByIdService.js";

export const ListTagByIdController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const accessToken = req.accessToken;
    const tag = await ListTagByIdService(String(id),accessToken!,req.user!)
    return res.status(200).json(tag)
  } catch (error) {
    next(error);
  }
};
