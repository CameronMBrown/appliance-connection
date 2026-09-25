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
design-system/    tokens.json / tokens.css (source of truth) + style-guide.html
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

## Everyday loops

**Blocks (WP side)**
```bash
npm run blocks:start     # @wordpress/scripts watch build → edit in the WP block editor
npm run blocks:build     # production build
```

**Frontend (Astro)**
```bash
npm run dev              # Astro dev server — renders from fixtures/ until WP is wired
npm run build            # static build
```

**Types**
```bash
npm run codegen          # (in web/) GraphQL Codegen → typed block attributes
```

## The two publish lanes (in practice)

1. **Content lane (client):** WP Publish → webhook → host build hook → CI rebuild + deploy.
2. **Code lane (dev):** `git push` → same CI build → deploy. CI path-filters `web/**` vs `cms/**`.

> Deploy/CI + build hooks are **documented, not built** in the foundation pass — we're fixtures-first.

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
6. **Add a fixture** in `fixtures/` so it renders before live WP.

## Conventions

- **Semantic tokens only** in components (`var(--color-text)`), never primitives.
- **Atomic commits** across the WP-block ↔ Astro-renderer seam.
- **Dynamic/attribute-only blocks** (`save` returns null) to avoid block-validation churn.
- Commit style: short imperative subject; group a section's block + renderer together.
- Formatting: `npm run format` (Prettier, incl. `prettier-plugin-astro`).
