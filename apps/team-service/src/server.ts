import { existsSync } from "node:fs";
import { app } from "./app.js";
import { env } from "./config/env.js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { client, db } from "./database/client.js";
import { StartUserConsumers } from "./modules/teams/consumer/userConsumer.js";

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

try {
  await StartUserConsumers();
} catch (error) {
  console.error("Failed to start RabbitMQ consumers:", error);
}

app.listen(env.PORT, () => {
  console.log(`Team Service running on port ${env.PORT}`);
});
