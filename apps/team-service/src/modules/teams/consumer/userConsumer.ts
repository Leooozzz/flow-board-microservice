import amqp from "amqplib";
import { env } from "../../../config/env.js";
import {
  HandleUserCreated,
  HandleUserDeleted,
  UserCreatedEvent,
  UserDeletedEvent,
} from "../service/UserEventsService.js";

const EXCHANGE = "users_events";

export const StartUserConsumers = async () => {
  const connection = await amqp.connect(env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE, "topic", { durable: true });

  await channel.assertQueue("team_user_created", { durable: true });
  await channel.bindQueue("team_user_created", EXCHANGE, "user.created");

  await channel.assertQueue("team_user_deleted", { durable: true });
  await channel.bindQueue("team_user_deleted", EXCHANGE, "user.deleted");

  await channel.consume("team_user_created", async (msg) => {
    if (!msg) return;

    try {
      const event: UserCreatedEvent = JSON.parse(msg.content.toString());
      await HandleUserCreated(event);
      channel.ack(msg);
    } catch (error) {
      console.error("Failed to handle user.created", error);
      channel.nack(msg, false, true);
    }
  });

  await channel.consume("team_user_deleted", async (msg) => {
    if (!msg) return;

    try {
      const event: UserDeletedEvent = JSON.parse(msg.content.toString());
      await HandleUserDeleted(event);
      channel.ack(msg);
    } catch (error) {
      console.error("Failed to handle user.deleted", error);
      channel.nack(msg, false, true);
    }
  });

  console.log(
    "RabbitMQ consumers listening (user.created, user.deleted)",
  );
};
