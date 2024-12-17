import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

type RawPost = {
  file: string;
  compiledContent: () => Promise<string>;
  frontmatter: {
    date: string;
    slug: string;
    title: string;
  };
};

type Post = {
  date: Dayjs;
  slug: string;
  title: string;
  content: string;
};

const pageImports = import.meta.glob("./*.md");
const rawPages = await Promise.all(
  Object.entries(pageImports).map(async ([, page]) => (await page()) as RawPost)
);
export const posts: Post[] = await Promise.all(
  rawPages.map(async (raw) => ({
    date: dayjs(raw.frontmatter.date),
    slug: raw.frontmatter.slug,
    title: raw.frontmatter.title,
    content: await raw.compiledContent(),
  }))
);
