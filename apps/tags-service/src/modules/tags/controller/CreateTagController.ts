import { RequestHandler } from "express";
import { CreateTagSchema } from "../schema/CreateTagSchema.js";
import { CreateTagService } from "../service/CreateTagService.js";

export const CreateTagController: RequestHandler = async (req, res, next) => {
  try {
    const data = CreateTagSchema.parse(req.body);
    const accessToken = req.accessToken;
    const tag = await CreateTagService(req.user!, data, accessToken!);
    return res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
};
