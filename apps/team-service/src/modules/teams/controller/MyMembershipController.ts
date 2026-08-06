import { RequestHandler } from "express";
import { MyMembershipService } from "../service/MyMembershipService.js";

export const MyMembershipController: RequestHandler = async (req, res, next) => {
  try {
    const membership = await MyMembershipService(req.user!);
    return res.status(200).json(membership);
  } catch (error) {
    next(error);
  }
};
