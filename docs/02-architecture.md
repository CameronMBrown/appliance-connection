# 02 — Architecture

**Headless WordPress (custom native Gutenberg blocks) → WPGraphQL + WPGraphQL Content Blocks
(`editorBlocks`) → Astro (static/SSG) + React islands.** Monorepo. Dev env = Local by Flywheel.

## Why Astro static (the "why")

A low-change-frequency lead-gen site should be **fast, cheap, and secure**. A static build means:
- WP admin is **never publicly exposed** — the public site is just HTML/CSS/JS on a CDN.
- Excellent Core Web Vitals → directly helps SEO (a primary goal).
- Astro ships **zero JS by default**; interactivity is opt-in via **islands**. A mostly-static marketing
  site with a few interactive bits (quote form, gallery) is Astro's sweet spot.

## Why native Gutenberg blocks instead of ACF

Client doesn't have/want ACF Pro, and native blocks are a deliberate learning goal. It also happens to
give the **curated block library** editing model — each block's `block.json` `attributes` *is* its
structured field set, and the client composes pages from *our* on-brand blocks.

**Linchpin:** WPGraphQL does **not** expose block attributes as structured GraphQL by default — it gives
`content` as rendered HTML with `<!-- wp:… {attrs} -->` comments (fragile to parse). The **WPGraphQL
Content Blocks** plugin (WP Engine, free) fixes this: it exposes an **`editorBlocks`** field — each block
as a typed node *with its attributes*. Astro then maps `blockName → renderer component`. That mapping is
the native twin of the ACF-flexible-content→component pattern, and the centerpiece of this build.

### Content model

- **Sections = custom native blocks** (`@wordpress/create-block` / `@wordpress/scripts`), packaged in
  `cms/plugins/ac-blocks`. **Prefer dynamic/attribute-only blocks** (`save` returns null) so there's no
  saved markup to hit block-validation churn — Astro renders the real output, not `save`.
- **Page-level fields = post meta**, not blocks: `register_post_meta(… 'show_in_graphql' => true)` +
  SlotFill sidebar UIs (`PluginDocumentSettingPanel`). E.g. Location region/coords/phone, Service
  icon/order, Project date, SEO title/desc.
- **Grouping = taxonomies** (`region`: Durham/Peterborough) — native, free, WPGraphQL-exposed; avoids a
  hand-built relationship UI.
- **CPTs:** Service, Location (region hub + city), Project (portfolio, phase 2), Testimonial, Brand +
  singletons (Home/About/Contact). Per-CPT block **`templateLock`** keeps structured pages rigid (dev
  owns layout); Home gets an unlocked curated palette.
- **Typed props:** run **GraphQL Codegen** against the schema → TypeScript types for block attributes →
  Astro renderers get typed props.

### ACF-free gaps to plan around

- **Repeaters → InnerBlocks** (a parent block with child blocks; Astro renders `innerBlocks` recursively).
- **Relationship/reference fields** are the weak spot — no native UI. Use taxonomies, InnerBlocks, or a
  custom `PostSelect` control.
- **Editor ≠ preview.** `edit.js` is an approximation; the real design lives in Astro. Keep editor styles
  minimal — don't double-invest.
- Blocks need their own Node build (`@wordpress/scripts`) — fits the monorepo.

## Rendering pipeline (Astro)

```
WPGraphQL (editorBlocks) ──▶ query ──▶ [ {name, attributes, innerBlocks}, … ]
                                          │
                    web/src/lib/blocks/registry.ts   (blockName → Astro component)
                                          │
                    <BlockRenderer blocks={…} />  → renders each section component
```
Pages are generated via Astro dynamic routes / content from GraphQL (Locations → programmatic city
pages). **Fixtures-first:** until live WP is wired, renderers build from typed mock `editorBlocks` in
`fixtures/`, proving the whole pipeline without a running GraphQL endpoint.

## Two publish lanes → one build pipeline

1. **Content lane (client):** WP Publish → **webhook** → host **build hook** → CI rebuilds Astro →
   deploys. The client publishes copy/photos without touching code.
2. **Code lane (dev):** Cameron edits templates/components/blocks → `git push` → same CI build → deploy.

Both converge on one build. **CI path-filters** so `web/**` changes trigger the FE build and `cms/**`
changes deploy WP — no wasted builds (this is the monorepo tax, and it's a solved one).

## Headless taxes (and mitigations)

- **No instant WYSIWYG preview** — the editor shows block shapes, not the final Astro design. Mitigate
  later with a preview deploy (a branch/preview build fed by draft GraphQL).
- **Build delay** between publish and live. Mitigate with build **debounce** and a clear "your change is
  live in ~N minutes" expectation set with the client.

## Hosting / deploy (documented now, built later)

WP on a managed host (or keep the current host, content-only); Astro on **Netlify / Cloudflare Pages /
Vercel**; build hook wired to WP publish. Not built in the foundation pass — fixtures-first for now.
