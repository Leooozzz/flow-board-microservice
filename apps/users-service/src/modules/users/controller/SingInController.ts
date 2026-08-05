import { RequestHandler } from "express";
import { env } from "../../../config/env.js";
import { SingInSchema } from "../schemas/SingInSchema.js";
import { SingInService } from "../service/SingInService.js";

const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

export const SingInController: RequestHandler = async (req, res, next) => {
  try {
    const data = SingInSchema.parse(req.body);

    const { user, accessToken, refreshToken } = await SingInService(data);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: REFRESH_TOKEN_MAX_AGE,
      path: "/",
    });

    return res.status(200).json({ user, accessToken });
  } catch (error) {
    next(error);
  }
};
