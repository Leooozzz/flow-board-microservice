import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export const ErrorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    status: "error",
    statusCode: 500,
    message: "Internal Server Error",
  });
};