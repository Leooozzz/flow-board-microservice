import { RequestHandler } from "express";
import { ListUsersService } from "../service/ListUsersService.js";

export const ListUsersController: RequestHandler = async (req, res, next) => {
  try {
    const users = await ListUsersService(req.user!, req.accessToken!);
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};
