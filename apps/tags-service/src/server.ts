import { existsSync } from "node:fs";
import { app } from "./app.js";
import { env } from "./config/env.js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { client, db } from "./database/client.js";

if (existsSync("./drizzle")) {
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations applied successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    client.end();
    process.exit(1);
  }
} else {
  console.warn("No ./drizzle folder found, skipping migrations");
}

app.listen(env.PORT, () => {
  console.log(`Tags Service running on port ${env.PORT}`);
});
