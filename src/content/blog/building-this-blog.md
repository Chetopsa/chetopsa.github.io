---
title: Building This Blog
date: 2026-10-15
tags:
  - web
  - react
excerpt: Markdown files in the repo, parsed at build time, with a CMS that needs no server.
draft: false
---

This site is a React app built with Vite and deployed to GitHub Pages. Adding a blog to that
setup has one real constraint: GitHub Pages serves static files and nothing else. There is no
server, so anything that needs one is off the table.

## Posts are just files

Every post is a markdown file in `src/content/blog/` with YAML frontmatter on top. A small Vite
plugin parses that frontmatter at build time and hands the app a plain object:

```js
export default function markdownPlugin() {
  return {
    name: 'blog-markdown',
    enforce: 'pre',
    transform(code, id) {
      if (!id.split('?')[0].endsWith('.md')) return null
      const { data, content } = matter(code)
      return { code: `export default ${JSON.stringify({ frontmatter: data, body: content })}` }
    },
  }
}
```

The `enforce: 'pre'` matters. Without it, Vite hands the raw markdown to its JavaScript pipeline
and the build dies on the first `---`.

> Parsing at build time isn't just tidier. `gray-matter` imports Node's `buffer`, which doesn't
> exist in browsers, so calling it on the client throws. Doing the work in the plugin sidesteps
> the problem instead of polyfilling around it.

## Why not a hosted CMS

The options sort themselves out quickly once you ask which ones need a server:

| Option | Needs a server | Content lives in |
| --- | --- | --- |
| Sveltia CMS | No | this repo |
| Decap CMS | Yes | this repo |
| Keystatic | Yes | this repo |
| Sanity | No | their cloud |

Keystatic is the React-native one, which would have been the natural fit here — but its admin
routes read and write on the server, so a static export can't host them. Sveltia CMS is a
standalone admin page that authenticates with a personal access token, which is all a single
author actually needs.

It lives at `/admin`, commits straight to `main`, and the deploy workflow that was already
running takes it from there.
