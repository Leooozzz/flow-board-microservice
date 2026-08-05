import z from "zod";

export const UpdateUserSchema = z
  .object({
    name: z.string().min(2).optional(),
    email: z.email().optional(),
    avatarUrl: z.string().max(500).optional(),
    password: z.string().min(8).optional(),
  })
  .strict();
