import { z } from "zod";

export const userSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  avatar_url: z.string(),
});