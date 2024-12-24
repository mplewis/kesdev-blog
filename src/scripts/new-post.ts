import dayjs from "dayjs";
import { writeFile } from "fs/promises";
import { join } from "path";
import { argv } from "process";

const POSTS_DIR = "src/content/posts";

const USAGE = `
Usage: pnpm new-post <title>
`.trim();

const TEMPLATE = `
---
title: {{title}}
slug: {{slug}}
date: {{date}}
---

Fill out your post here!
`.trim();

async function main() {
  const [, , ...args] = argv;
  if (args.length === 0 || args.includes("--help")) {
    console.error(USAGE);
    process.exit(1);
  }

  const title = args.join(" ");
  const slug = title
    .toLowerCase()
    .replace(/\[^\w\s]/g, "")
    .replace(/\s+/g, "-");
  const now = dayjs();
  const fn = `${now.format("YYYY-MM-DD")}-${slug}.md`;

  const content = TEMPLATE.replace("{{title}}", title)
    .replace("{{slug}}", slug)
    .replace("{{date}}", now.toISOString());

  const path = join(POSTS_DIR, fn);
  await writeFile(path, content, "utf-8");
  console.log(`Created new post: ${path}`);
}

main();
