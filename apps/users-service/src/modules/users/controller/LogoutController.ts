import { RequestHandler } from "express";
import { env } from "../../../config/env.js";

export const LogoutController: RequestHandler = (_req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return res.status(200).json({ message: "Logout" });
};
