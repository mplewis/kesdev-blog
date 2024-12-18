import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import type { Post } from "../content.config";
import { excerpt } from "../logic/excerpt";

export async function GET(context: APIContext) {
  if (!context.site) throw new Error("site is undefined");
  const posts = await getCollection("posts");

  return rss({
    site: context.site,
    title: "Kestrel Development",
    description: "Make. Break. Repeat.",
    customData: `<language>en-us</language>`,
    items: posts
      .sort((a: Post, b: Post) => b.data.date.getTime() - a.data.date.getTime())
      .map((post: Post) => ({
        title: post.data.title,
        link: `${context.site}${post.data.slug}`,
        description: excerpt(post.rendered.html),
        pubDate: post.data.date,
      })),
  });
}
