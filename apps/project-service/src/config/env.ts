import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3007),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  FRONTEND_URL_PERMISSION: z.string(),
  RABBITMQ_URL: z.string(),
});

export const env = envSchema.parse(process.env);
