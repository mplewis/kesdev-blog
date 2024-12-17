import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import dayjs from "dayjs";

const postSchema = z.object({
  title: z.string(),
  date: z.date(),
  slug: z.string(),
});

export type Post = {
  data: z.infer<typeof postSchema>;
  rendered: { html: string };
};

const posts = defineCollection({
  loader: glob({ base: "src/content/posts", pattern: "*.md" }),
  schema: postSchema,
});

export const collections = { posts };
