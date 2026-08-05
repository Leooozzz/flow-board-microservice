import { RequestHandler } from "express";
import { JwtVerifyAccess } from "../../modules/users/libs/JwtLib.js";
import { AppError } from "../errors/AppError.js";

export interface AuthUser {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      accessToken?: string;
    }
  }
}

export const AuthMiddleware: RequestHandler = (req, _res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
      throw new AppError(401, "Token não informado");
    }

    const accessToken = header.slice(7);
    const payload = JwtVerifyAccess(accessToken);

    req.user = {
      id: payload.sub,
      role: payload.role,
    };
    req.accessToken = accessToken;

    next();
  } catch (error) {
    next(error);
  }
};
