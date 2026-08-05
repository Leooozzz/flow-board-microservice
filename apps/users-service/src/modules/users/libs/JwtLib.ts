import jwt from "jsonwebtoken";
import { env } from "../../../config/env.js";

const ACCESS_TOKEN_EXPIRES_IN = "1d";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

export const JwtSignAccess = (userId: string, role: string) => {
  return jwt.sign(
    {
      sub: userId,
      role,
    },
    env.JWT_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  );
};

export const JwtSignRefresh = (userId: string, role: string) => {
  return jwt.sign(
    {
      sub: userId,
      role,
    },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    },
  );
};

export const JwtVerifyAccess = (accessToken: string) => {
  const payload = jwt.verify(accessToken, env.JWT_SECRET) as {
    sub: string;
    role: string;
  };
  return payload;
};

export const JwtVerifyRefresh = (refreshToken: string) => {
  const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as {
    sub: string;
    role: string;
  };
  return payload;
};
