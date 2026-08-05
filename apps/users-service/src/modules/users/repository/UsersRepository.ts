import { db } from "../../../database/client.js";
import { users } from "../../../database/schema/users.schema.js";
import { eq, inArray } from "drizzle-orm";
import { SingUpDTO } from "../dto/SingUpDTO.js";

export const FindByEmail = async (email: string) => {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0] ?? null;
};

export const FindById = async (id: string) => {
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0] ?? null;
};
type UserRow = typeof users.$inferSelect;

export const CreateUser = async (data: SingUpDTO): Promise<UserRow> => {
  const [user] = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      password: data.password,
    })
    .returning();

  return user!;
};

export const ListAllUsers = async (): Promise<UserRow[]> => {
  return await db.select().from(users);
};

export const FindManyByIds = async (ids: string[]): Promise<UserRow[]> => {
  if (ids.length === 0) {
    return [];
  }
  return await db.select().from(users).where(inArray(users.id, ids));
};

export const UpdateUser = async (
  id: string,
  data: Partial<Omit<UserRow, "id" | "createdAt" | "updatedAt">>,
): Promise<UserRow | null> => {
  const [user] = await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();

  return user ?? null;
};

export const DeleteUser = async (id: string): Promise<UserRow | null> => {
  const [user] = await db.delete(users).where(eq(users.id, id)).returning();
  return user ?? null;
};
