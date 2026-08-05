import jwt from "jsonwebtoken";
import { env } from "../../../config/env.js";

export const JwtVerifyAccess = (accessToken: string) => {
  const payload = jwt.verify(accessToken, env.JWT_SECRET) as {
    sub: string;
    role: string;
  };
  return payload;
};
