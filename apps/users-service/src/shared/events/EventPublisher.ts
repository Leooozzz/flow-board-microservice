import amqp from "amqplib";
import { env } from "../../config/env.js";

const EXCHANGE = "users_events";

type AmqpChannelModel = Awaited<ReturnType<typeof amqp.connect>>;

let connection: AmqpChannelModel | null = null;
let channel: amqp.Channel | null = null;

export interface UserCreatedEventPayload {
  userId: string;
  name: string;
  email: string;
  createdAt?: string;
  createdBy?: string | null;
}

export interface UserDeletedEventPayload {
  userId: string;
  deletedBy: string;
}

const getChannel = async (): Promise<amqp.Channel> => {
  if (!channel) {
    connection = await amqp.connect(env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE, "topic", { durable: true });
  }
  return channel;
};

const publish = async (routingKey: string, payload: unknown) => {
  try {
    const ch = await getChannel();
    ch.publish(EXCHANGE, routingKey, Buffer.from(JSON.stringify(payload)), {
      persistent: true,
    });
  } catch (error) {
    console.error(`Failed to publish ${routingKey} event`, error);
  }
};

export const PublishUserCreatedEvent = (
  payload: UserCreatedEventPayload,
): Promise<void> => publish("user.created", payload);

export const PublishUserDeletedEvent = (
  payload: UserDeletedEventPayload,
): Promise<void> => publish("user.deleted", payload);
