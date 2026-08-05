import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "../config/env.js";

export const client = postgres(env.DATABASE_URL);

export const db = drizzle(client);