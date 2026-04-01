import { z } from "zod";

export const repoSchema = z.object({
  id: z.number(),
  name: z.string(),
  html_url: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  updated_at: z.string(),
});

export type Repo = z.infer<typeof repoSchema>;