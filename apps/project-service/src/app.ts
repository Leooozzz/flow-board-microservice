import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorHandler } from "./modules/project/middlewares/ErrorHandler.js";
import router from "./modules/route.js";
import helmet from "helmet"
import { env } from "./config/env.js";

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

app.get("/health", (_req, res) => {
  return res.status(200).json({
    status: "ok",
    service: "project-service",
  });
});

app.use(router);

app.use((_req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

app.use(ErrorHandler);

export { app };
