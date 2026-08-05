import { RequestHandler } from "express";
import { SingUpSchema } from "../schemas/SingUpSchema.js";
import { env } from "../../../config/env.js";
import { SingUpService } from "../service/SingUpService.js";

const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
export const SingUpController: RequestHandler = async (req, res, next) => {
  try {
    const data = SingUpSchema.parse(req.body);
    const { user, accessToken, refreshToken } = await SingUpService(data);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: REFRESH_TOKEN_MAX_AGE,
      path: "/",
    });

    return res.status(201).json({ user, accessToken });
  } catch (error) {
    next(error);
  }
};
