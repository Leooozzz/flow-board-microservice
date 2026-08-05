import { RequestHandler } from "express";
import { CreateUserSchema } from "../schemas/CreateUserSchema.js";
import { CreateUserService } from "../service/CreateUserService.js";

export const CreateUserController: RequestHandler = async (req, res, next) => {
  try {
    const data = await CreateUserSchema.parse(req.body);
    const { user } = await CreateUserService(data, req.user!.id);
    return res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};
