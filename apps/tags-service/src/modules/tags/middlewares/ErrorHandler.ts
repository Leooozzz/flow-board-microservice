import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError.js";

export const ErrorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: "Dados de entrada inválidos",
      errors: error.flatten(),
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  console.error(error);
  res.status(500).json({ message: "Internal Server Error" });
};
