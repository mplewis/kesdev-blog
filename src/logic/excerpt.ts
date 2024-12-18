import sanitize from "sanitize-html";

const EXCERPT_CHARS = 200;

export function excerpt(html: string) {
  const text = sanitize(html, { allowedTags: [] });
  if (text.length <= EXCERPT_CHARS) return text;
  return text.slice(0, EXCERPT_CHARS) + "…";
}
