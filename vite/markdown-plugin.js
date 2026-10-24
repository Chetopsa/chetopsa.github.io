import path from "node:path";
import matter from "gray-matter";

const CONTENT_RE = /\/src\/content\/.*\.md$/;
const WORDS_PER_MINUTE = 225;
const EXCERPT_LENGTH = 180;

// Reduce markdown to readable prose, so word counts and excerpts aren't thrown
// off by code blocks and link URLs.
function stripMarkdown(md) {
  return md
    .replace(/```[\s\S]*?```/g, " ")         // fenced code
    .replace(/`[^`]*`/g, " ")                // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")   // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> their text
    .replace(/^\s{0,3}>\s?/gm, "")           // blockquote markers
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")      // headings
    .replace(/^\s*[-*+]\s+/gm, "")           // bullets
    .replace(/^\s*\d+\.\s+/gm, "")           // ordered bullets
    .replace(/[*_~]/g, "")                   // emphasis marks
    .replace(/\s+/g, " ")
    .trim();
}

function readingTime(md) {
  const words = stripMarkdown(md).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function autoExcerpt(md) {
  const text = stripMarkdown(md);
  if (text.length <= EXCERPT_LENGTH) return text;
  const cut = text.slice(0, EXCERPT_LENGTH);
  const lastSpace = cut.lastIndexOf(" ");
  return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}…`;
}

// YAML turns an unquoted `date: 2026-03-14` into a JS Date, which JSON would
// serialize with a time and timezone. Collapse to a plain "YYYY-MM-DD" so no
// timezone math can shift the displayed day.
function normalizeDate(value) {
  if (value instanceof Date) {
    const year = value.getUTCFullYear();
    const month = String(value.getUTCMonth() + 1).padStart(2, "0");
    const day = String(value.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return String(value ?? "").slice(0, 10);
}

function toTags(value) {
  if (Array.isArray(value)) return value.map((t) => String(t).trim()).filter(Boolean);
  if (typeof value === "string") return value.split(",").map((t) => t.trim()).filter(Boolean);
  return [];
}

// Turns a .md file in src/content into a module exporting one post object.
//
// This runs in Node at build/dev time on purpose: gray-matter imports Node's
// `buffer`, so parsing frontmatter in the browser throws. Reading time and
// excerpt are derived here too, so they cost nothing on the client.
export default function markdownPlugin() {
  return {
    name: "chetopsa:markdown-content",
    // Required: Vite has no built-in .md handler, so without this the raw
    // markdown reaches the JS pipeline and the build fails on the first `---`.
    enforce: "pre",
    transform(code, id) {
      const file = id.split("?")[0];
      if (!CONTENT_RE.test(file)) return null;

      const { data, content } = matter(code);
      const fallbackSlug = path.basename(file, ".md").toLowerCase();
      const date = normalizeDate(data.date);
      const body = content.trim();

      const post = {
        slug: String(data.slug || fallbackSlug),
        title: String(data.title || fallbackSlug),
        date,
        timestamp: Date.parse(`${date}T00:00:00Z`) || 0,
        tags: toTags(data.tags),
        draft: data.draft === true,
        excerpt: (data.excerpt && String(data.excerpt).trim()) || autoExcerpt(body),
        readingTime: readingTime(body),
        body,
      };

      // The emitted module deliberately contains no imports: the id still ends
      // in .md, so Vite's import analysis would not rewrite them.
      return {
        code: `export default ${JSON.stringify(post)};\n`,
        map: { mappings: "" },
      };
    },
  };
}
