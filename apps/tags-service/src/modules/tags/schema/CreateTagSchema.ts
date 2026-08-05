import z from "zod";

export const CreateTagSchema =  z.object({
  name:z.string(),
  color:z.string(),
  type:z.enum(["PROJECT","CARD"])
})