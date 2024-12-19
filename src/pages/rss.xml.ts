import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
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
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((post) => ({
        title: post.data.title,
        link: `${context.site}${post.data.slug}`,
        pubDate: post.data.date,
        description: excerpt(post.rendered!.html), // HACK
        content: post.rendered!.html,
      })),
  });
}
