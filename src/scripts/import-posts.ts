import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import { stringify } from "yaml";
import dayjs from "dayjs";

interface Post {
  title: string;
  slug: string;
  html: string;
  date: string;
}

const inputFilePath = "tmp/posts.json";
const outputDir = "src/content/posts";

async function convertJsonToYaml() {
  const jsonData = await readFile(inputFilePath, "utf-8");
  const posts: Post[] = JSON.parse(jsonData);

  await mkdir(outputDir, { recursive: true });

  posts.forEach((post) => {
    const { title, slug, date } = post;
    const yamlContent = stringify({ title, slug, date });

    const fileContent = `---
${yamlContent}---
${post.html}`;

    const formattedDate = dayjs(post.date).format("YYYY-MM-DD");
    const outputFilePath = join(outputDir, `${formattedDate}-${post.slug}.md`);
    writeFile(outputFilePath, fileContent, "utf-8");
    console.log(outputFilePath);
  });
}

convertJsonToYaml();
