# The Appliance Connection — Site Rebuild (v2)

Headless **WordPress** (custom native Gutenberg blocks) → **WPGraphQL + WPGraphQL Content Blocks** → **Astro** (static) + **React islands**.

> **Status:** high-fidelity design is in. The [Claude Design system](https://claude.ai/design/p/d4d2d2dc-a551-424b-aa98-c72db590688b) (mirrored in `design-system/`) drives the tokens, components and page templates. Pages render from typed fixtures until WordPress is wired. See `docs/` for the full brief, design system, and architecture.

## Why this stack (short version)

- **Astro static build** — a low-change lead-gen site should be fast, cheap, and secure (WP admin never public). Astro ships **zero JS by default**; interactivity is opt-in via **islands** (quote form, gallery).
- **Native Gutenberg blocks instead of ACF** — each page section is a custom block whose `block.json` attributes are its structured fields. No ACF Pro; also a deliberate learning goal. `WPGraphQL Content Blocks` exposes blocks as `editorBlocks`, and Astro maps `blockName → renderer component`.
- **Monorepo** — WordPress custom code and the Astro frontend live together so a "section" (WP block + its Astro renderer) is one atomic commit.

## Layout

```
docs/             Brief · design system · architecture · IA · dev workflow
design-system/    Claude Design mirror: tokens, base CSS, components, templates (see SOURCE.md)
cms/              Tracked WP code — symlinked into Local's wp-content
  plugins/        ac-blocks (native blocks)
  mu-plugins/     ac-core (CPTs, region taxonomy, post meta, WPGraphQL fields)
  themes/         ac-headless (minimal block theme)
web/              Astro app (renderer registry, GraphQL, routes)
packages/         Reserved (shared tokens package, future)
fixtures/         Typed mock editorBlocks/data — Astro builds before live WP
```

## Prerequisites

- Node ≥ 20 (repo pins 22 via `.nvmrc`)
- [Local](https://localwp.com/) running the WordPress site (this repo sits **beside** Local's `app/`)
- No system PHP/wp-cli needed for the frontend; WordPress runs inside Local.
- **Display font (optional):** ITC Benguiat is commercially licensed and is **not** in this repo.
  Without it, headings fall back to the serif stack in `--font-display`. See *Private files*.

## Quick start

```bash
# 1. WordPress custom code → symlink cms/ into Local's wp-content (one-time)
bash cms/scripts/link-into-local.sh

# 2. Build the native blocks (from repo root)
npm run blocks:build        # or: npm run blocks:start  (watch)

# 3. Frontend
npm run dev                 # Astro dev server (renders from fixtures until WP is wired)
```

## Private files

Some files can't be public: the licensed display font, client-confidential notes, local env, and
personal dev tooling config.
They live in a separate **private** repo, cloned into `./private` (gitignored here):

```bash
git clone git@github.com:CameronMBrown/appliance-connection-private.git private
bash private/setup.sh          # symlinks private files into place
```

```
private/
  setup.sh                        Symlinks private files into this repo
  docs/00-project-brief.full.md   Full client brief (partners, old-site baseline, open items)
  fonts/headings.woff2            ITC Benguiat webfont (licensed)
  web.env                         Local env for web/ (optional)
```

The site builds fine without `private/` — headings just use the fallback serif.

## The two publish lanes (headless mental model)

1. **Content lane (client):** WP Publish → webhook → host build hook → CI rebuilds Astro → deploy.
2. **Code lane (dev):** `git push` → same CI build → deploy.

Both converge on one build. The headless trade-offs (no instant WYSIWYG preview, a build delay) and how we mitigate them are in `docs/02-architecture.md`.

## Docs

Start with [`docs/00-project-brief.md`](./docs/00-project-brief.md).

## License

All rights reserved — see [`LICENSE`](./LICENSE).
