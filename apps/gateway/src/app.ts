import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createProxyMiddleware } from "http-proxy-middleware";
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

app.use(
  "/users",
  createProxyMiddleware({
    target: env.USERS_SERVICE_URL,
    changeOrigin: true,
  }),
);

app.use(
  "/teams",
  createProxyMiddleware({
    target: env.TEAM_SERVICE_URL,
    changeOrigin: true,
  }),
);

app.use(
  "/tags",
  createProxyMiddleware({
    target: env.TAGS_SERVICE_URL,
    changeOrigin: true,
  }),
);
app.use(
  "/cards",
  createProxyMiddleware({
    target: env.CARD_SERVICE_URL,
    changeOrigin: true,
  }),
);
app.use(
  "/columns",
  createProxyMiddleware({
    target: env.COLUMN_SERVICE_URL,
    changeOrigin: true,
  }),
);
app.use(
  "/project",
  createProxyMiddleware({
    target: env.PROJECT_SERVICE_URL,
    changeOrigin: true,
  }),
);

app.get("/health", (_req, res) => {
  return res.status(200).json({
    status: "ok",
    service: "gateway",
  });
});

export { app };
