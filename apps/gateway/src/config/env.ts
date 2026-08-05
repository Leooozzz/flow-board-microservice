import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  FRONTEND_URL_PERMISSION: z.string(),
  USERS_SERVICE_URL: z.string(),
  TEAM_SERVICE_URL: z.string(),
  JWT_SECRET: z.string(),
  TAGS_SERVICE_URL: z.string(),
  CARD_SERVICE_URL:z.string(),
  COLUMN_SERVICE_URL:z.string(),
  PROJECT_SERVICE_URL:z.string()
});

export const env = envSchema.parse(process.env);
