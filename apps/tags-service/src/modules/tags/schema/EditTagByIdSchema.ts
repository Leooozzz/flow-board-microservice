import z from "zod";

export const EditTagByIdSchema = z.object({
  name:z.string().min(2).optional(),
  color:z.string().min(2).optional(),
})