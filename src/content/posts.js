// Every post in src/content/blog, parsed by vite/markdown-plugin.js.
//
// The glob is eager because the index page needs every post's metadata and the
// full tag set anyway. The bodies are a few KB each; the bytes that actually
// matter are the markdown renderer, which is split out via React.lazy on the
// /blog/:slug route instead.
const modules = import.meta.glob("/src/content/blog/*.md", {
  eager: true,
  import: "default",
});

const byNewest = (a, b) => b.timestamp - a.timestamp || a.title.localeCompare(b.title);

// Drafts stay visible in `vite dev` so you can preview them while writing.
// import.meta.env.DEV is replaced with `false` at build time, so this filter
// folds away and drafts never reach the published index.
export const posts = Object.values(modules)
  .filter((post) => import.meta.env.DEV || !post.draft)
  .sort(byNewest);

export const postsBySlug = new Map(posts.map((post) => [post.slug, post]));

export const allTags = [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) =>
  a.localeCompare(b)
);

export function getPost(slug) {
  return postsBySlug.get(slug) ?? null;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  // Without this, "2026-03-14" renders as March 13 in US timezones.
  timeZone: "UTC",
});

export function formatDate(isoDate) {
  if (!isoDate) return "";
  return dateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}
