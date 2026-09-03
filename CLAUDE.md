# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

Marketing website for **Ezer Avocats**, a French law firm in Paris (75116) specialising in business litigation. The site's goals are to build trust, generate appointment bookings, and establish SEO authority through legal articles. The brand tone is expert and precise — no superlatives, no startup aesthetics.

## Commands

```bash
npm run dev              # Vite dev server (HMR, no SSG)
npm run build            # SSG build + sitemap generation (production)
npm run build:legacy     # Plain Vite build (no SSG, no sitemap)
npm run lint             # ESLint
npm run preview          # Preview the Vite build
npm run preview:prod     # Preview on port 4173 (strictPort)
npm run optimize-images  # Regenerate public/images/ from src/assets/images/
```

There are no tests.

## Architecture

### SSG via vite-react-ssg

The app uses **vite-react-ssg** (not standard Vite + React Router). Key implications:

- `src/main.tsx` exports `createRoot = ViteReactSSG({ routes })` — this is the SSG entry point, not a `ReactDOM.render` call.
- `src/App.tsx` exports a `routes: RouteRecord[]` array (not a `<Routes>` JSX tree). All routes must be registered here.
- `<Head>` from `vite-react-ssg` is used (not `react-helmet`). `SeoHead` wraps it.
- Article routes are discovered at build time in `vite.config.ts` (`getArticleRoutes()`) and added to `ssgOptions.includedRoutes`. When adding new static routes, update **both** `vite.config.ts` and `scripts/generate-sitemap.mjs`.

### Routing & layout

All pages share a single `RootLayout` in `App.tsx` that mounts `<RouteTracker />`, `<ScrollToTop />`, and `<Layout />`. `Layout` renders `Header` → `<Outlet />` → `Footer`.

The layout components actually used are in **`src/components/layout/`** (`Header`, `Navbar`, `Footer`, `Layout`). The root-level `src/components/Footer.tsx`, `Layout.tsx` etc. are legacy stubs — do not modify or use them.

### Articles (Markdown)

Articles live in `src/content/articles/*.md` as plain Markdown with YAML frontmatter:

```yaml
---
title: "..."
description: "..."
date: 2026-03-27
domaine: droit-commercial   # see DOMAINE_LABELS in Articles.tsx / ArticlePage.tsx
slug: my-article-slug
---
```

They are imported eagerly at build time via `import.meta.glob` with `eager: true`, so SSG can pre-render each article page. `ArticlePage.tsx` contains a hand-rolled `mdToHtml()` converter (no external Markdown library). Styles for article body text live in the `.article-body` block in `src/index.css`.

### Images

All production images go through a two-step pipeline:

1. Source images live in `src/assets/images/` (originals, not served directly).
2. Run `npm run optimize-images` to generate multi-resolution WebP variants + JPEG fallback in `public/images/`:
   - `{name}-400.webp`, `{name}-800.webp`, `{name}-1600.webp`
   - `{name}-1200.jpg` (fallback)

Use `<ResponsiveImage src="/images/{name}" ... />` in components — never reference `src/assets/images` directly. The `src` prop is a base path without extension or size suffix. Pass `priority={true}` only for the above-the-fold LCP image on each page.

When adding a new source image, add an entry to the `SOURCES` map in `scripts/optimize-images.mjs`, run the script, then commit the generated files in `public/images/`.

### SEO / Schema.org

Every page must include `<SeoHead>` with at minimum `title`, `description`, and `canonical`. JSON-LD schema builders are centralised in `src/lib/schemas.ts` (`legalServiceSchema`, `founderSchema`, `serviceSchema`, `breadcrumbSchema`). Import from there rather than constructing schema objects inline in pages.

Use `SeoHead`'s `preloadImage` prop (base path, e.g. `"/images/homepage"`) to emit the LCP preload `<link>` — this avoids Critters emitting 18 font preloads.

### Scroll animations

`<ScrollReveal>` wraps any element that should animate in on scroll. It uses `useScrollReveal` (IntersectionObserver) and CSS classes defined in `src/index.css` (`.scroll-reveal`, `.revealed`, animation variants). `prefers-reduced-motion` is respected automatically — both in the hook and in the CSS via `@media`.

Use `overflow-x: clip` on `html` (already set) rather than `overflow-x: hidden` — the latter breaks IntersectionObserver on mobile Safari.

## Design constraints (from PRODUCT.md)

- Typography: **EB Garamond** (serif, headings) + **Jost** (sans, body). Both self-hosted in `public/fonts/` via `src/assets/fonts.css`.
- Brand colour `primary`: `rgb(113, 145, 170)` (steel blue). Defined in `tailwind.config.js`.
- `md` breakpoint is overridden to `900px` (not Tailwind's default 768px).
- Avoid gradients, rounded corners, emoji, neon colours, stock icon packs, startup language.
- WCAG AA compliance required; respect `prefers-reduced-motion`.

## Deployment

Deployed to **Netlify** (site `ezeravocats`, production URL `https://www.ezeravocats.com`). Build command `npm run build`, publish directory `dist/`, both configured in the Netlify UI (no `netlify.toml`).

- Every pull request gets a **deploy preview** (`https://deploy-preview-<PR>--ezeravocats.netlify.app`), reported as GitHub checks (`netlify/ezeravocats/deploy-preview`). Merging to `main` deploys production. Production deploys do not report a commit status on GitHub — verify by comparing asset hashes on the live site with the deploy preview.
- **Node version** is pinned by `.node-version` (22). Vite 7 requires Node ≥ 20.19 or ≥ 22.12; on Node 18 the build fails with `crypto.hash is not a function`.
- `public/_headers` sets cache and security headers, `public/_redirects` contains the SPA fallback (`/* /index.html 200`). Both use the Netlify format and are copied verbatim into `dist/`.

## Dependency constraints

- **`react-router-dom` must stay on 6.x.** `vite-react-ssg` 0.9.x only supports react-router 6. With react-router 7 the client router starts uninitialised, `RouterProvider` renders `null` during hydration, React gives up hydrating and appends a second copy of the DOM under the invisible SSR copy (pages blank below the hero, mobile menu dead, calendar missing). This broke production on 2026-09-03. The remaining `npm audit` moderate advisories on react-router 6 (open redirect via backslash in `<Link>`, `deserializeErrors` in framework-mode SSR) do not apply to this site (static links, no framework mode).
- `ssgOptions.script` must be `'defer'`, not `'async'`. Vite injects the module script in `<head>`; the `vite-react-ssg` client looks up `#root` as soon as the module runs, so an `async` script can execute before `<body>` is parsed and silently skip hydration (`[vite-react-ssg] Root container not found`).
- `package.json` has an npm `override` for `beasties` because `vite-react-ssg` still declares an old peer range. `critters` is deprecated and replaced by `beasties` (`beastiesOptions` in `vite.config.ts`).
- When checking hydration in a browser, verify that `#root` has a single element child and that `.scroll-reveal` elements carry a React fiber. `IntersectionObserver` does not fire in a background tab, so a `revealed` count of 0 in a hidden tab is not a bug.
