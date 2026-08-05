import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import router from "./modules/route.js";
import { ErrorHandler } from "./shared/middleware/ErrorHandler.js";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL_PERMISSION,
    credentials: true,
  }),
);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(router);

app.get("/health", (_req, res) => {
  return res.status(200).json({
    status: "ok",
    service: "column-service",
  });
});

app.use((_req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

app.use(ErrorHandler);

export { app };