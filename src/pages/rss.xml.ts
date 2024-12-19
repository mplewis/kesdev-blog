import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { excerpt } from "../logic/excerpt";
import type { Post } from "../content.config";

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
      .map((post: Post) => {
        if (!post.rendered)
          throw new Error(`Post ${post.data.slug} has no rendered content`);
        return {
          title: post.data.title,
          link: `${context.site}${post.data.slug}`,
          pubDate: post.data.date,
          description: excerpt(post.rendered.html),
          content: post.rendered.html,
        };
      }),
  });
}
