import z from "zod";

export const EditTeamSchema = z.object({
  name:z.string().min(1).optional()
})