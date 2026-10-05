# 04 — Dev Workflow

## Prerequisites

- Node ≥ 20 (repo pins 22 via `.nvmrc`). Package manager: **npm workspaces** (pnpm not installed).
- **Local** (by Flywheel) running the WordPress site. This repo lives **beside** Local's `app/` at
  `~/Local Sites/applianceconnection/appliance-connection/`; WP core stays in Local, outside the repo.
- No system PHP/wp-cli needed for frontend work — WordPress runs inside Local, and the block build uses
  Node (`@wordpress/scripts`).

## Monorepo layout

```
docs/             This documentation
design-system/    Claude Design mirror: tokens/*.css, base.css, components/, templates/ (SOURCE.md)
cms/              WP custom code (symlinked into Local's wp-content)
  plugins/ac-blocks/     native blocks (block.json + edit.js + index.js)
  mu-plugins/ac-core/    CPTs, region taxonomy, post meta, WPGraphQL fields
  themes/ac-headless/    minimal block theme (theme.json)
  scripts/link-into-local.sh   one-time symlink helper
web/              Astro app
  src/layouts/           BaseLayout + header/footer shells
  src/components/blocks/  one Astro renderer per block type
  src/lib/blocks/registry.ts   blockName → component + <BlockRenderer/>
  src/lib/graphql/       client + queries + codegen output
  src/pages/             index, [service], [region], [region]/[city], about, contact
fixtures/         typed mock editorBlocks/data (Astro builds before live WP)
```

## One-time setup

```bash
# Symlink our WP code into Local's wp-content (idempotent)
bash cms/scripts/link-into-local.sh

# Install JS deps
npm install                    # root (web workspace)
npm --prefix cms/plugins/ac-blocks install   # block plugin deps
```
Then in Local's WP admin: activate the **AC Blocks** plugin and the **AC Headless** theme, and install
**WPGraphQL** + **WPGraphQL Content Blocks** (via the plugin installer or Composer). `ac-core` loads
automatically as an mu-plugin.

```bash
# Point Astro at WordPress (Local's "Site host", e.g. http://localhost:10018)
cp web/.env.example web/.env

# Seed WP with the design-approved content: pages, services, locations,
# region terms + phones, and the primary/footer/legal menus. Idempotent.
npm run seed:export                          # fixtures → cms/scripts/seed/content.json
wp eval-file cms/scripts/seed/seed.php       # run in Local's "Open site shell"
```
WP `home` and `siteurl` must both be the URL WordPress actually answers on (Settings → General).
If they differ, the editor's REST calls go to the wrong host and fail.

## Everyday loops

**Blocks (WP side)**
```bash
npm run blocks:start     # @wordpress/scripts watch build → edit in the WP block editor
npm run blocks:build     # production build
```

**Frontend (Astro)**
```bash
npm run dev              # Astro dev server on :4321. Reads WordPress live (refresh after a WP edit)
npm run build            # static build. Fetches all WP content once
```
With `WPGRAPHQL_URL` unset, both fall back to the typed fixtures (`web/src/fixtures/pages.ts`).

**How WordPress and Astro connect**
- **Pages:** every published page, `ac_service` and `ac_location` becomes a route (`web/src/pages/[...path].astro`):
  page → `/{slug}/` (front page → `/`), service → `/services/{slug}/`, location → `/{hub}/` or `/{hub}/{town}/`.
- **Sections:** `editorBlocks` → `registry.ts`. The GraphQL fragments are generated from each
  `block.json` (`web/src/lib/graphql/blocks.ts`), so a new attribute is queried with no query edits.
- **Nav:** Appearance → Menus, locations **primary** (header, dropdowns = child items), **footer**, **legal**.
- **Phones:** the `ac_phone` meta on each region hub Location (Durham, Peterborough).
- **SEO:** `ac_seo_title` / `ac_seo_description` meta. Falls back to "{title} — The Appliance Connection".
- **WordPress's own front end redirects to Astro** (`ac-core/headless.php`), and admin "View" links
  open the Astro page. Set `AC_FRONTEND_URL` in `wp-config.php` per environment (default `http://localhost:4321`).
  So `npm run dev` must be running to see the site locally.

**Types**
```bash
npm run codegen          # (in web/) GraphQL Codegen → typed block attributes
```

## The two publish lanes (in practice)

1. **Content lane (client):** WP Publish → webhook → host build hook → CI rebuild + deploy.
2. **Code lane (dev):** `git push` → same CI build → deploy. CI path-filters `web/**` vs `cms/**`.

> Deploy/CI + build hooks are **documented, not built** in the foundation pass — we're fixtures-first.

## Hero video

The home hero video is **not in git**. It lives in the WordPress Media Library; the Hero block
stores which files to use. WordPress doesn't make video renditions, so the dev encodes them:

```bash
# from the repo root; ffmpeg comes from the ffmpeg-static devDependency
npm run video:encode --workspace web -- path/to/master.mp4   # → web/.video-out/ (gitignored)
```

1. Encode: `hero-install-{640,960,1280}.{webm,mp4}` + `hero-install-poster.webp`. Widths never upscale,
   so a better master (1080p or more) is what unlocks sharper widescreen/2× output: add widths to
   `TIERS` in the script.
2. Upload all files to **Media → Add New** (or `wp media import`).
3. In the Hero block: **Video → Add video renditions** (select all 6), **Poster image** (the WebP).
   The editor stores `{id, url, mime, width}` per file and a poster `srcset` from WP's sizes.
4. Keep the master file somewhere safe (it is no longer in the repo; `private/` is a good home).

How the front end uses it (`web/src/components/islands/Hero.tsx`):
- The poster `<img>` (srcset, `fetchpriority=high`) is server-rendered and is the LCP element.
- JS picks the smallest rendition tier that is sharp enough for the frame size × DPR (capped 1.5),
  and upgrades (never downgrades) on resize. `<source type>` lets the browser choose WebM vs MP4.
- Reduced motion, Data Saver and 2G: no video is downloaded; the poster shows and the button plays it.
  3G gets the smallest tier. The video plays once on load and holds its last frame. Scrolled fully out of view and back, it replays
  from the start (unless the visitor paused it).
- Decorative: `aria-hidden`, no captions or `VideoObject` schema. A visible pause/play button is the
  WCAG 2.2.2 control.

**Production hosting checklist** (the WP host, not Astro): serve `wp-content/uploads` with
`Accept-Ranges` (default on nginx/Apache) and `Cache-Control: public, max-age=31536000, immutable`;
`.webm`/`.mp4` MIME types; ideally behind a CDN. The poster is requested from the WP origin on first
paint, so that origin's latency counts toward LCP. Re-seeding keeps the hero's media attributes
(`ac_seed_keep_hero_media` in `seed.php`).

## How to add a new section (the core pattern)

A section spans WP + Astro; keep both halves in **one commit** (that's why we're a monorepo).

1. **Scaffold the block** in `cms/plugins/ac-blocks/src/<name>/` — `block.json` with `attributes`
   (its structured fields), `edit.js` (editor controls via `@wordpress/components`), attribute-only
   `save` (return `null`; dynamic/headless).
2. **Expose it** — attributes flow through `editorBlocks` automatically via WPGraphQL Content Blocks.
   Add page-level fields (if any) as `register_post_meta` in `cms/mu-plugins/ac-core`.
3. **Add the query field** in `web/src/lib/graphql/` and run `npm run codegen` for typed attributes.
4. **Write the renderer** `web/src/components/blocks/<Name>.astro` — consume **semantic tokens only**.
5. **Register it** in `web/src/lib/blocks/registry.ts` (`'ac/<name>' → <Name>`).
6. **Add a fixture** in `web/src/fixtures/pages.ts` so it renders without WP (and re-seeds cleanly).

## Conventions

- **Semantic tokens only** in components (`var(--color-text)`), never primitives.
- **Atomic commits** across the WP-block ↔ Astro-renderer seam.
- **Dynamic/attribute-only blocks** (`save` returns null) to avoid block-validation churn.
- Commit style: short imperative subject; group a section's block + renderer together.
- Formatting: `npm run format` (Prettier, incl. `prettier-plugin-astro`).
