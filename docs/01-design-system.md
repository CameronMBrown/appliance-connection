# 01 — Design System

**Source of truth:** `design-system/tokens/tokens.json` (structured) + `tokens.css` (runtime CSS custom
properties). **Living style guide:**
`design-system/style-guide.html`

> Values are considered **placeholder defaults** encoding the agreed direction. They're meant to be
> tuned against high-fidelity design. Components consume **semantic roles only** — re-skin by editing
> primitives, never by touching components.

## The three rules

1. **Monochrome foundation.** Black / white / warm neutral greys carry the brand (inherited from the
   black-and-white cube trucks + the "AC" icon). Strip all colour and it should still read as the brand.
2. **Colour as punctuation.** Deep blue + warm brass appear sparingly and intentionally — a CTA, a stat,
   a section accent. Never a blue header bar, never colour for its own sake.
3. **Chrome vs. photography.** The interface stays monochrome + accents. **Photography is where full
   colour lives** (the finished kitchen, the install done right). Quiet frame, loud work.

## Colour

Two tiers — **primitives** (raw palette + scales) feed **semantic roles** (what components use).
- Neutrals: warm-tinted ramp `--neutral-0 … --neutral-900` (paper `#f8f5f0`, ink `#1d1a16`).
- Blue (refined/deepened from old `#3B89C8`): `--blue-600 #1d5b84` (brand), `--blue-800 #123f5c` (deep).
- Brass (warm accent): `--brass-500 #b58a4b` (accent), `--brass-700 #94702f` (deep).
- **Primary CTA** = brass bg + ink text (AA ≈5.6:1); hover = `--brass-600`. **Links** = brand blue.
- **Dark sections:** add `.on-dark` to flip semantic roles to the inverse set (no component changes).
- Accessibility notes live in `tokens.json → color.contrastNotes`. Prefer `--color-text-soft` for long
  body copy; `--color-text-muted` is the AA floor (large/secondary text).

## Typography

- **Display / headings / wordmark → ITC Benguiat** (matches the trucks; warm characterful serif; the
  *only* custom font). Self-host + subset (1–2 weights), `font-display:swap` + `preload`.
  ⚠️ **Commercial — needs a webfont license (Monotype/MyFonts) to self-host.** Until then a serif
  fallback stack renders (Georgia/Iowan/Times) — treat scale as final, letterforms arrive with the license.
- **Body / UI → system font stack** (zero network cost, native render, instant paint — a big Core Web
  Vitals win, and exactly the restraint Astro rewards).
- Fluid modular scale (`--text-xs … --text-display`) via `clamp()`; generous line-height/measure
  (`--measure: 66ch`); uppercase eyebrows get `--tracking-wide`.

## Spacing / radii / shadow / motion

16px root, generous editorial spacing scale (`--space-xs … --space-5xl`). Restrained radii (sharp reads
premium) and quiet warm-tinted shadows. Motion tokens with a `prefers-reduced-motion` reset.

## Imagery rules

- **Object/space-led** — appliances, kitchens/laundry, fixtures, detail/texture. **No stock people.**
- Only **real AC team/owner** ever appear as people (About/trust). Everything else = objects, spaces,
  the monochrome truck, brand iconography.
- Launch on curated premium stock under **one consistent colour treatment**; layer in real finished-job
  photos over time. Monochrome chrome frames full-colour photography.

## Voice & tone

Confident, plain-spoken expert; warm, reassuring, human. No hype, no jargon-dump, no exclamation spam.
Lead with the customer's problem + the reassurance (licensed, warrantied, done right by people who've
done it 30 years). Local and specific. (Derived from the personality — refine with the client.)

## Component inventory (v1)

Each = a native Gutenberg block (`block.json` attributes), surfaced via `editorBlocks`, mapped 1:1 to an
Astro renderer. Global: header (logo + nav + call), sticky mobile call bar, footer (dual-region phones +
service areas + partners + credentials), quote form (React island), SEO/schema head. Sections: hero,
service grid/cards, service-detail (intro / included / process / FAQ / gallery / CTA), location hub +
location page (intro / local services / service-area map / local projects + testimonials / CTA), trust
bar (data-driven), testimonials, stats band, brands strip, CTA band, text+image, gallery/lightbox (React
island), FAQ (schema), partners strip. Islands only where needed: quote form, gallery/lightbox, mobile
nav, optional service-area lookup — everything else ships as static HTML/CSS.
