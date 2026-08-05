import { users } from "../../../database/schema/users.schema.js";

type Users = typeof users.$inferSelect;

export type UserResponse = Omit<Users, "password">;

export function FormatUser(user: Users): UserResponse {
  const { password: _password, ...rest } = user;
  return rest;
}
