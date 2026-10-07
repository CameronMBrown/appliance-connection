# 01 — Design System

**Source of truth:** the Claude Design project
[The Appliance Connection Design System](https://claude.ai/design/p/d4d2d2dc-a551-424b-aa98-c72db590688b),
mirrored in `design-system/` (see `design-system/SOURCE.md` for what's mirrored and how
to re-sync). The full brand write-up is `design-system/README.md`. This page is the
short version.

> This replaces the v0 direction (warm neutrals + deep blue + brass, placeholder
> tokens, `tokens.json`, `style-guide.html`). Those files are gone. If you find a
> blue or brass reference anywhere, it's stale.

## The rules

1. **Monochrome base + one wood accent as punctuation.** True-neutral paper → ink
   (from the black-and-white cube trucks). Take the accent away and it should still
   read as The Appliance Connection.
2. **Thin, strong lines and boxes on graph paper.** An 8px ruling (`--grid-image`)
   sits under every band and flips to white hairlines inside `.on-dark`. It drops
   out below 640px. Boxes are square, drawn with one 1px ink line
   (`--color-border-strong`) and a short soft shadow. Depth is never a gradient.
   Grids of cells share **one** ruling.
3. **Chrome stays monochrome. Full colour lives only in photography and the
   Craig & Harley illustrations.**
4. **One ornament:** a 10px wood square in a box's top-left corner (hero panel, CTA
   box, menus, quote form, testimonials). Use it sparingly.

## Colour

Two tiers: **primitives** (raw ramps) feed **semantic roles**. Components use
semantic roles only.

- Neutrals: `--neutral-0` `#ffffff` … `--neutral-900` `#111111` (ink).
- Wood, the only hue: `--wood-300` `#d9b27c` = `--color-accent` / `--cta-bg` (primary
  button, with ink text). `--wood-700` `#7a4e2a` = `--link` and `--cta-bg-hover`,
  which flips the label to paper.
- Form feedback only: `--color-success` (green-700), `--color-error` (red-700).
- **Dark sections:** add `.on-dark` to flip every semantic role (footer, CTA
  bands). Components need no dark-specific styling.

## Typography

- **ITC Benguiat** (self-hosted, weight 400): headlines (`h1`, `h2`), the wordmark,
  phone numbers, stat values, testimonial quotes. Licensed, but the file is never
  committed to this public repo; `private/setup.sh` links it to `web/public/fonts/headings.woff2`.
- **System sans stack** for everything else, including `h3`/`h4`.
- Fluid `clamp()` scale `--text-xs` … `--text-display`. Body line-height 1.6,
  display 1.08 with `text-wrap: balance`.
- Sentence case everywhere. Uppercase only via the `.eyebrow` / micro-label CSS.

## Spacing, radii, shadow, motion

16px root, editorial scale `--space-3xs` … `--space-5xl`. Containers: narrow 704px,
max 1200px, wide 1344px. **Square corners everywhere** (`--radius-*` = 0). The one
exception is `--radius-input` 2px on form controls. Shadows `sm` (resting) / `md`
(hover, ruled grids) / `lg` (hero panel, menus, CTA box, quote form). Motion: colour
transitions only (`--dur` 200ms, `--ease-standard`), collapsed under
`prefers-reduced-motion`.

## Brand assets

- **Logo:** the real truck mark (`/logo/truck-logo-detailed.png` is the primary).
  `truck-logo-ac.png` and `truck-logo-a.png` are simpler line versions.
- **Wordmark:** *arched* ("APPLIANCE CONNECTION" on a shallow arch, small "THE"
  above its left end) at display scale, e.g. the homepage hero. Use *flat* ("THE"
  above a two-line lockup) where an arch won't fit: nav, footer. Never retype the
  name as a lockup.
- **Illustrations:** Craig & Harley (`/illustrations/*.webp`): waving (region pages),
  pair (contact/about), carrying a box (services), dolly + fridge (local crew).
  They show the real owner and crew, so they're consistent with "only real AC people".
- **Hero video:** lives in the WordPress Media Library, not the repo (see
  `docs/04-dev-workflow.md` → Hero video). 16:9, muted, plays once, WebM + MP4 at 640/960/1280px,
  plus a WebP poster. Never autoplays under reduced motion or Data Saver; always has a pause button.
- **Partner logos:** Paddy's Market (Durham), Peterborough Appliances (Peterborough).

## Imagery rules

Object/space-led photography (the finished install). **No stock people.** Only real
AC people appear, as photos or the Craig & Harley illustrations. Until real photos
exist, image slots use the **labelled photo placeholder**: a ruled cell with a tag
naming the shot (`.photo-ph`). Never use filler stock.

## Voice

Plain-spoken tradesperson. Facts that stop, not hype. "We" for the company, direct
address, no exclamation points or emoji. Specific over adjectives: phone numbers,
30+ years, TSSA, 24-hour response, town names. Testimonials are attributed
"Homeowner, {town}". Unfinished content is **labelled as a placeholder in visible
copy**, never faked.

## Component → block map

| Section (block) | Renderer | Design source |
| --- | --- | --- |
| `ac/hero` | `Hero.astro` → DS `Hero` island | components/blocks/Hero |
| `ac/page-header` | `PageHeader.astro` | templates/location, contact |
| `ac/trust` | `Trust.astro` | templates/homepage |
| `ac/intro` | `Intro.astro` | templates/homepage |
| `ac/partners` | `Partners.astro` | templates/homepage |
| `ac/stat-block` | `StatBlock.astro` | components/blocks/StatBlock |
| `ac/service-grid` + `ac/service-card` | `ServiceGrid.astro`, `ServiceCard.astro` | components/blocks/ServiceGrid, ServiceCard |
| `ac/media-text` | `MediaText.astro` | templates/location |
| `ac/town-carousel` | `TownCarousel.astro` | (ours; replaced the DS TownGrid) |
| `ac/testimonials` | `Testimonials.astro` | components/feedback/Testimonial |
| `ac/faq` | `Faq.astro` → DS `Accordion` island | components/blocks/Accordion |
| `ac/contact` | `Contact.astro` → DS `QuoteForm` island | templates/contact |
| `ac/cta-band` | `CtaBand.astro` | components/blocks/CtaBand |
| *(chrome)* | DS `Header` island, `Footer.astro`, `CallBar.astro`, `Wordmark.astro` | components/navigation, feedback, core |

**Not wired yet:** `Tabs`, `TrustBar` (badge variant), and the form primitives
(`FormField`, `Select`, `Checkbox`, `RadioGroup`, `Textarea`) exist in the design
system but no page uses them yet.

## Open design items

- **Press/active states** are undefined in the design system (hover only).
- **About and service pages** have no Claude Design template yet. They're composed
  from existing blocks for now.
- **Quote form isn't wired**: it validates and shows success but sends nothing.
  Region-routed submission is still to build.
