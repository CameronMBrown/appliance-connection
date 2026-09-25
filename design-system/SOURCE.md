# design-system/ — Claude Design mirror

This folder is a **read-mostly mirror** of the Claude Design project
**"The Appliance Connection Design System"**:
https://claude.ai/design/p/d4d2d2dc-a551-424b-aa98-c72db590688b

Claude Design is the source of truth for tokens, components, templates and
assets. Change the design there, then re-sync here. Don't hand-edit these files.
App-specific adaptations belong in `web/`.

Last synced: **2026-09-25**.

## What's mirrored

| Path | What it is | Used by the app? |
| --- | --- | --- |
| `styles.css`, `base.css`, `tokens/*.css` | Tokens + element base | **Yes**. `web/src/layouts/BaseLayout.astro` imports them (all except `tokens/fonts.css`) |
| `components/**/*.jsx` / `.d.ts` / `.prompt.md` | React component library + API docs | **Yes, for the interactive ones**: Header, Hero, Accordion, QuoteForm are mounted as Astro islands via the `@ds` alias. Static ones are ported to `.astro` (see below) |
| `components/**/*.card.html`, `guidelines/*.html`, `_ds_bundle.js`, `_ds_manifest.json`, `thumbnail.html` | Specimen cards from the Design System tab (open in a browser) | Reference only |
| `templates/{homepage,location,contact}/*.dc.html` | Page templates. These are the **layout source** for the Astro pages | Reference only. Composition + copy live in `web/src/fixtures/pages.ts` |
| `assets/logo/**` | Truck marks, partner logos, favicon | Reference. Deployable copies are in `web/public/logo/` |
| `assets/fonts/benguiat-display.woff2` | Licensed ITC Benguiat | **Gitignored** (commercial licence). The app serves it from `web/public/fonts/headings.woff2` (linked by `private/setup.sh`) |
| `_adherence.oxlintrc.json` | Claude Design's adherence lint rules | Reference |

**Not mirrored** (too heavy for git, or not needed): the illustrations and the hero
video. Optimised copies live in `web/public/illustrations/*.webp` (resized to
720px, ~50 KB each, from ~2 MB PNGs) and `web/public/video/hero-install.mp4`.
Also skipped: `uploads/` (raw originals), `scraps/`, `ui_kits/` (superseded by
`templates/`), the per-template `support.js` runtime, and the inspiration PDFs.

## How the app consumes it

- **Static sections** (Footer, SectionHeader, ServiceGrid/Card, StatBlock,
  TownGrid, Testimonial, CtaBand, CallBar, flat Wordmark) are **ported to
  `.astro`**, with CSS copied verbatim from the component. Zero JS ships.
- **Interactive components** are imported straight from here as React islands:
  `Header` (`client:load`), `Hero` (`client:load`; the arched wordmark measures
  itself, and the video pauses for reduced motion), `Accordion` and `QuoteForm`
  (`client:visible`).
- Template-only sections (trust strip, intro split, partners, page header,
  media-text, contact panel) are Astro renderers written from the `.dc.html`
  markup.

## Deviations from the design (intentional, app-side)

- **Ruled grids use inset rules.** In the design, cells draw their right/bottom
  hairlines with an *outward* `box-shadow`. The next grid cell paints over that
  shadow, so the dividers between cells vanish (reproducible in the design's
  own preview). The Astro ports use `inset -1px -1px` cell rules plus a frame
  (top/left border + inset right/bottom) on the grid. **Worth fixing upstream in
  Claude Design.**
- **CtaBand on dark** sets `color: var(--color-text)`, so the heading flips to
  white. The design component leaves it inheriting ink on ink.
- **CallBar** is docked `position: fixed` at ≤640px, per the readme's "sticky
  mobile tap-to-call bar". The component itself is only the bar.

## Re-syncing

1. Pull the project files (the Claude Design MCP: `list_files` / `read_file`,
   binaries via `render_preview`).
2. Overwrite the mirrored paths above, then `git diff design-system/` to see
   what changed.
3. Port changed static components into their `.astro` counterparts. Islands
   pick up changes automatically.
4. `npm run build` + eyeball the three templated pages (`/`, `/durham/`, `/contact/`).
