import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { ErrorHandler } from "./modules/tags/middlewares/ErrorHandler.js";
import router from "./modules/route.js";

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
    service: "tags-service",
  });
});

app.use(router);

app.use((_req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

app.use(ErrorHandler);

export { app };
