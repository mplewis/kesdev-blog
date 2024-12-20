import sanitize from "sanitize-html";

const EXCERPT_CHARS = 400;

export function excerpt(html: string) {
  let text = sanitize(html, { allowedTags: [] })
    .replaceAll("\n", " ")
    .replaceAll(/\s+/g, " ")
    .trim();
  if (text.length <= EXCERPT_CHARS) return text;
  return text.slice(0, EXCERPT_CHARS) + "…";
}
