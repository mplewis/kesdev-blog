import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection, render } from "astro:content";
import { excerpt } from "../logic/excerpt";

export async function GET(context: APIContext) {
  if (!context.site) throw new Error("site is undefined");

  const posts = await getCollection("posts");
  const withContent = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      const { rendered } = post;
      if (!rendered)
        throw new Error(`Post ${post.data.slug} has no rendered content`);
      return { ...post, rendered, Content };
    })
  );
  const sorted = withContent.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    site: context.site,
    title: "Kestrel Development",
    description: "Make. Break. Repeat.",
    customData: `<language>en-us</language>`,
    items: sorted.map((post) => ({
      title: post.data.title,
      link: `${context.site}${post.data.slug}`,
      pubDate: post.data.date,
      description: excerpt(post.rendered.html),
      content: post.rendered.html,
    })),
  });
}
