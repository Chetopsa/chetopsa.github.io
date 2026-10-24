# CLAUDE.md

Personal portfolio site for Cheston Opsasnick, served at https://chetopsa.github.io.
React 19 + Vite SPA, styled entirely with styled-components, deployed to GitHub Pages.

## Commands

```bash
npm run dev        # Vite dev server
npm run build      # production build to dist/
npm run lint       # eslint over the repo
npm run preview    # serve the built dist/
npm run deploy     # build + push dist/ to the gh-pages branch (needs GITHUB_TOKEN)
```

There are no tests.

## Architecture

- `src/main.jsx` → `src/App.jsx` is the whole entry path. `App.jsx` owns the
  `BrowserRouter` and declares every route (`/`, `/profile`, `/projects`, `/contact`, `/blog`,
  `/blog/:slug`, and a `*` catch-all), each mapping to a file in `src/pages/`. `/blog/:slug` is
  lazy-loaded; see the blog pipeline section. `App.jsx` also mounts a small `ScrollToTop` so
  client-side navigation doesn't land you mid-page.
- **`#root` centers everything.** `src/App.css` sets
  `#root { max-width: 1280px; padding: 2rem; text-align: center }`. ID specificity beats the
  `createGlobalStyle` reset, so *every* page inherits centered text and an extra `2rem` of
  padding. New pages need an explicit `text-align: left`. Don't "fix" `App.css` — that
  restyles all the existing pages at once.
- `src/index.css` still carries Vite scaffolding that applies site-wide: `a { color: #646cff }`
  and `h1 { font-size: 3.2em }`. Anything rendering links or headings has to override them.
- **Do not put `display: flex` back on `body`.** The scaffolding had
  `body { display: flex; place-items: center }`, which made `#root` a flex item — and a flex
  item with `width: auto` is sized to **max-content**, so `#root`'s width tracked its longest
  line of text. Measured in Chrome, `#root` was 287px with a short post title and 675px with a
  long one, and `margin: 0 auto` re-centred it, so filtering the blog by tag jumped the whole
  page ~194px sideways. It also meant `width: 100%` on a page shell resolved against that
  collapsed width. As a block, `#root` is a stable 1280px. Every page centres itself, so nothing
  depended on the flex.
- **Styling is CSS-in-JS only.** Every page/component declares its `styled.*` components
  at the bottom of its own file; there is no shared component library beyond
  `src/components/atoms/Image.jsx`. Palette lives in `src/colors.js` and is imported as
  `{ colors }`. Global resets and the body gradient are injected by `createGlobalStyle`
  inside `src/components/NavBar.jsx`, not by a CSS file — `src/index.css` and
  `src/App.css` are mostly leftover Vite scaffolding (`App.css` does hold the
  `swirlDust` keyframes the dust background relies on).
- Imports frequently use root-absolute paths (`import { colors } from "/src/colors"`)
  rather than relative ones. Both styles appear; either works under Vite.
- `src/components/DustBackground.jsx` is **not a React component** despite the name and
  extension — it's a function with a self-invoking IIFE body that procedurally paints a
  canvas dust texture and assigns it as `document.body`'s background image. `App.jsx`
  calls it once from a `useEffect`. Returning JSX from it would be a behavior change.
- `src/data/projects.json` is empty. Project data is hardcoded as `mainProjects` /
  `smallProjects` arrays inside `src/pages/Projects.jsx`.
- `static-website/` is the pre-React version of this site (plain HTML/CSS/JS). It is not
  built, bundled, or deployed — treat it as an archive unless asked otherwise.

## Strava integration

The "latest run" card is a build-time data snapshot, not a runtime API call:

1. `.github/workflows/strava.yml` runs hourly, refreshes a Strava OAuth token from repo
   secrets (`STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET`, `STRAVA_REFRESH_TOKEN`), fetches
   the most recent activity, and writes `latest.json` **at the repo root**.
2. If the activity id changed it commits `latest.json`, then its `deploy` job calls
   `deploy.yml` as a **reusable workflow** (`uses: ./.github/workflows/deploy.yml`) to rebuild
   the site.
3. `src/components/StravaCard.jsx` does `import latest from "/latest.json"` — so the data
   is baked into the bundle at build time. A new `latest.json` requires a rebuild to appear.
   The card itself just renders a Strava embed placeholder and injects
   `https://strava-embeds.com/embed.js`.

Keep `latest.json` at the repo root; moving it breaks both the workflow and the import.

### Why the rebuild has to be a `workflow_call`

**A `GITHUB_TOKEN` cannot start a workflow run.** GitHub blocks it to prevent recursion. That
single rule broke this pipeline for roughly six months: the bot's `git push` never fired
`deploy.yml`'s `on: push`, and the old "trigger deploy" step POSTed a `workflow_dispatch` with
`secrets.GITHUB_TOKEN`, which was doubly dead — `deploy.yml` had no `workflow_dispatch` trigger
at the time, so the call returned 422, and the `curl` had no `-f`, so the failure was swallowed
and the step still went green. `latest.json` kept updating while the published site sat frozen.

A reusable `workflow_call` runs inside the *same* workflow run, so it isn't an event and isn't
subject to the restriction. No PAT needed. Consequences to respect:

- `deploy.yml` must keep its `workflow_call:` trigger, and its checkout must keep `ref: main`.
  On a `workflow_call` the run's `github.sha` predates the `latest.json` commit that was just
  made, so a default checkout would publish stale data.
- Both workflows declare `permissions: contents: write` explicitly rather than relying on the
  repo default.
- If you ever need to trigger a deploy from a *different* workflow run, that needs a PAT, not
  `GITHUB_TOKEN`.

### Strava script invariants

- `latest.json` is assembled with `jq`, not shell string interpolation. An activity name
  containing a quote, backslash or emoji would otherwise emit invalid JSON.
- Both API responses are validated. On error Strava returns an object rather than an array;
  the script fails the run and leaves the previous `latest.json` intact instead of committing
  `{"id": null}` over good data.
- `date` is `start_date` (true UTC). It used to be `start_date_local` with a `Z` suffix, which
  labelled local time as UTC.
- Strava can rotate the refresh token. The workflow can't write a new one back to secrets, so
  it emits a `::warning::` when the returned token differs from the stored one — if you see
  that, update `STRAVA_REFRESH_TOKEN` or runs will start failing.
- The API is queried with `per_page=1`, i.e. the latest activity of **any** type. If the latest
  is a swim or an elliptical, that's what the "Latest Run" card shows.

## Blog content pipeline

Posts are markdown files with YAML frontmatter in `src/content/blog/`. Nothing is fetched at
runtime — the content is baked into the bundle at build time:

1. `vite/markdown-plugin.js` is a Vite plugin with `enforce: 'pre'` that intercepts
   `src/content/**/*.md` and emits a module exporting one post object. It runs in **Node**, which
   is the whole point: `gray-matter` imports Node's `buffer` and throws in a browser, so it must
   never be imported from anything under `src/`. It stays a devDependency.
   - `enforce: 'pre'` is required. `.md` is not a default Vite asset type, so without it the raw
     markdown reaches the JS pipeline and the build fails on the first `---`.
   - The plugin also derives `readingTime`, `excerpt` (if frontmatter omits one), and
     `timestamp`, and normalizes `date` to a plain `YYYY-MM-DD` string. YAML would otherwise
     hand over a `Date`, which serializes with a timezone and renders a day early in the US.
   - The emitted module deliberately contains no `import` statements — the id still ends in
     `.md`, so Vite's import analysis would not rewrite them.
2. `src/content/posts.js` globs those modules eagerly and exports `posts` (newest first),
   `postsBySlug`, `allTags`, `getPost(slug)`, and `formatDate(isoDate)`. Drafts are visible in
   `vite dev` and filtered out of production builds via `import.meta.env.DEV`.
3. `src/pages/Blog.jsx` renders the index; the active tag lives in the URL (`/blog?tag=react`)
   via `useSearchParams`, so filtered views are shareable. `src/pages/BlogPost.jsx` renders one
   post and is **lazy-loaded** in `App.jsx` — `react-markdown` plus the highlight.js grammars are
   ~344 kB and belong in their own chunk, not the entry bundle. If `rehype-highlight` ever shows
   up in the entry chunk, that lazy boundary has regressed.
4. `src/components/Markdown.jsx` owns the `react-markdown` config and the `Prose` wrapper.
   react-markdown v9+ dropped the `className` prop, so that wrapper with descendant selectors is
   the only way to style rendered markdown. The `hljs-*` token colors are written there from
   `colors.js` tokens rather than importing a highlight.js theme stylesheet.

### Editing posts: Sveltia CMS

`public/admin/` holds a two-file admin UI ([Sveltia CMS](https://sveltiacms.app)) — an
`index.html` that loads the CMS from a CDN and a `config.yml`. It adds nothing to
`package.json` and nothing to the React bundle; it's a separate static page that Vite copies
verbatim. It commits markdown straight to `main`, which triggers the deploy workflow.

- Log in with a fine-grained GitHub PAT scoped to **only this repo**, Contents: read and write.
  GitHub Pages is static-only, which is why Decap CMS (needs an OAuth proxy) and Keystatic
  (needs server-side API routes) were not options here.
- The `repo:` owner casing must be `Chetopsa` — the GitHub API is case-sensitive, even though
  the deploy URL in `package.json` uses lowercase.
- **In `vite dev`, open `/admin/index.html`, not `/admin/`.** Vite's public-dir middleware only
  matches the exact file, and the SPA fallback then serves the React app for the directory path.
  GitHub Pages resolves directory indexes natively, so `/admin/` is correct in production.
- CMS media goes to `public/uploads/blog/`, served at `/uploads/blog/`. Deliberately **not**
  `public/blog/`, which would collide with the `/blog` route namespace. Markdown image paths are
  runtime strings Vite never sees, so they must be root-absolute and live under `public/`.
- Draft post text is still present in the built JS (only the index listing is filtered). The repo
  is public, so the markdown is readable on GitHub regardless.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`: `npm install` then
`npm run deploy`, which uses `gh-pages` to publish `dist/` to the `gh-pages` branch.

`vite.config.js` sets `base: '/'` because this is a user-pages repo (served at the domain
root, not a subpath). Client-side routing on GitHub Pages works via the
[spa-github-pages](https://github.com/rafgraph/spa-github-pages) trick: `public/404.html`
encodes the requested path into a query string and redirects to `/`, where the inline
script in `index.html` decodes it back with `history.replaceState`. If you change `base`,
both halves of that redirect need updating (`pathSegmentsToKeep` in `404.html`).

Static assets referenced in JSX live in `public/` and are addressed with root-absolute
paths (`/head_shot.png`). Font Awesome is loaded from a CDN `<link>` in `index.html`,
which is what the `<i className="fab fa-github" />` icons depend on.

## Known rough edges

- **`npm run lint` currently fails with 5 pre-existing errors**, all in
  `src/components/DustBackground.jsx` (two unused vars) and `src/components/StravaCard.jsx`
  (two unused vars plus `react-hooks/set-state-in-effect` for the `setActivity(latest)` call in
  an effect — that effect is pointless anyway, since `latest` is a static build-time import and
  could be used directly). Nothing in the blog code contributes to these, but it means lint is
  not a clean signal until they're fixed.
- `src/pages/Projects.jsx` points at `/project_gamblr.png`, `/project_gaussian.png`, and
  `/project_drone.png`, none of which exist in `public/`.
- `DustBackground` rasterizes a canvas the full height of `document.body` and installs a
  `ResizeObserver` on it. A very long blog post means a very tall canvas and a multi-MB base64
  string, re-paid whenever the height changes. If it ever janks, cap the generated height in
  `applyToElement` and let `background-repeat` tile it — it already repeats.
- `src/pages/Profile.jsx` has an uncommitted redesign in the working tree that drops the
  `colors` import for hardcoded hex values. The blog deliberately uses the `colors.js` tokens
  instead, so it doesn't depend on whether that rewrite is kept. Reconciling the two is a
  reasonable first step of the planned rework.
- styled-components v6 forwards unknown props to the DOM and React 19 warns about it. New
  components use `$`-prefixed transient props (`$active`, `$isOpen`); older ones may not.
