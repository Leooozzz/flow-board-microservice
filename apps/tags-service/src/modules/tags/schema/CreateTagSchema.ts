import z from "zod";

const hexColorRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;

export const CreateTagSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255),
  color: z.string().trim().regex(hexColorRegex, "Color must be a valid hex"),
  type: z.enum(["PROJECT", "CARD"]),
});