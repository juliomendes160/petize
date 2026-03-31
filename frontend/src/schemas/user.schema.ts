import { z } from "zod";

export const userSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  avatar_url: z.string(),
  bio: z.string().nullable(),
  html_url: z.string(),
  twitter_username: z.string().nullable(),
});

export type User = z.infer<typeof userSchema>;