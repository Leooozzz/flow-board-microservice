import { RequestHandler } from "express";
import { GetMeService } from "../service/GetMeService.js";

export const GetMeController: RequestHandler = async (req, res, next) => {
  try {
    const user = await GetMeService(req.user!.id);
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
