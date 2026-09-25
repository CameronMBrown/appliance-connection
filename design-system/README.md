# The Appliance Connection — Design System

The Appliance Connection is a locally owned, licensed appliance-installation business serving Durham Region & Peterborough, Ontario — 30+ years installing (and gas-fitting) the built-in kitchen and laundry appliances a general handyman won't touch. This project rebuilds their marketing site (currently at [theapplianceconnection.ca](https://theapplianceconnection.ca/)) from scratch with modern, professional design and code.

## Sources this system was built from

- `design-system/` (mounted local folder) — `tokens/tokens.css` + `tokens.json` (the canonical token set) and `style-guide.html` (a v0 specimen/handoff doc). Both are **placeholder-flagged by their own authors**: the tokens file states values are "tweakable placeholder defaults" and the style guide calls out two open items — a licensed display font and a real logo. **Both have since been supplied** (see below) and are now baked into this system as the real assets.
- `web/` (mounted local folder) — a real, in-progress Astro codebase: a headless block-rendering pipeline (`lib/blocks/registry.ts` + `types.ts`) driven by typed fixtures (`fixtures/pages.ts`) standing in for a future WPGraphQL/WordPress source, `BaseLayout.astro`, `Header.astro`, `Footer.astro`, and block renderers `Hero`, `ServiceGrid`, `ServiceCard`, `CtaBand`. This is the ground truth for real component structure, class names, and copy.
- `uploads/headings.woff2` — the real, licensed ITC Benguiat display webfont (self-hosted at `assets/fonts/benguiat-display.woff2`), replacing the serif-fallback placeholder both source docs flagged as pending.
- `uploads/a-logo-basic-1.png`, `uploads/ac-logo-basic-2.png`, `uploads/detailed.png` — the real truck/AC logo marks (self-hosted at `assets/logo/`; `detailed.png` → `truck-logo-detailed.png` is the primary, highest-fidelity mark), replacing the "AC" text-monogram placeholder both source docs flagged as pending.

No Figma file or slide deck was provided.

## Index — what's in this project

- `styles.css` — the single global stylesheet entry point (import list only). Links every file below.
- `tokens/` — `colors.css`, `typography.css`, `fonts.css` (@font-face), `spacing.css`, `effects.css` (radius/shadow/motion/z).
- `base.css` — shared element resets (ports `web/src/styles/global.css`).
- `assets/logo/` — `truck-logo-detailed.png` (primary, highest-fidelity mark — use this by default), `truck-logo-ac.png`, `truck-logo-a.png` (simpler line versions), `favicon.svg`.
- `assets/fonts/` — `benguiat-display.woff2` (real, licensed).
- `components/` — 20 reusable components across 5 groups (each has `<Name>.jsx`, `<Name>.d.ts`, and a `@dsCard` demo page):
  - **core** — `Button`, `Wordmark` (arched signature lockup + flat lockup; light/dark)
  - **navigation** — `Header`, `Footer`
  - **blocks** — `Hero`, `ServiceGrid`, `ServiceCard`, `CtaBand`, `SectionHeader`, `Accordion`, `Tabs`, `StatBlock`, `TownGrid`
  - **forms** — `FormField`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `QuoteForm`
  - **feedback** — `TrustBar`, `Testimonial`, `CallBar`
- `guidelines/` — 15 foundation specimen cards (Colors, Type, Spacing, Brand) populating the Design System tab.
- `ui_kits/website/` — full click-through recreation of the 5 real page templates (Home, Service, Region, About, Contact), composed entirely from `components/`.
- `thumbnail.html` — the project's homepage tile.
- `SKILL.md` — portable skill wrapper for use in Claude Code.

## Components — intentional additions

The `web/` codebase's own component inventory is `Hero`, `ServiceGrid`, `ServiceCard`, `CtaBand` (the block registry), plus `Header`/`Footer` (site chrome). Beyond that exact set, this system adds:

- **Button** — the codebase styles buttons via shared `.btn`/`.btn--primary`/`.btn--secondary` classes rather than a component file; `style-guide.html` additionally shows a `.btn-ghost` treatment. Promoted to a real component since it's the single most reused primitive.
- **SectionHeader, Accordion, Tabs, StatBlock, TownGrid** — section furniture the page templates need and the block registry doesn't cover: the standard eyebrow/heading/rule opener, the FAQ pattern, a general tab primitive, the credential row (30+ years, licensed, warrantied, thousands of installs), and the service-area town grid that makes the regional hubs navigable.
- **Textarea, Select, Checkbox, RadioGroup, QuoteForm** — the control set and the assembled quote request (name, email, phone, message) with live blur validation and a designed success state, replacing the "React island — coming next" note in `contact.astro`.
- **FormField, TrustBar, Testimonial, CallBar** — `contact.astro` explicitly notes the quote form "is a React island — coming next," and `style-guide.html` (§06 Components) demonstrates a trust-badge row, testimonial quote, form field states, and sticky call bar as settled design intent not yet implemented in code. Built from that specimen so the UI kit's Contact page and homepage aren't missing pieces the brand has already designed.

## Content fundamentals

**Voice:** plain-spoken tradesperson, not a marketing voice. Sentences state a fact and stop — *"Licensed, insured, and warrantied — 30+ years installing the built-ins a general handyman won't touch."* No hype adjectives ("amazing," "best-in-class"), no exclamation points, no emoji.

**Person:** "we" for the company, direct address ("Call us," "your Durham Region appliance installers") — never a distancing third person ("The Appliance Connection provides...").

**Casing:** sentence case everywhere, including headings — never Title Case, never all-caps except the small-caps-style `.eyebrow` kicker (uppercase via CSS `text-transform`, not typed uppercase).

**Specificity over adjectives:** copy leans on real, checkable facts — phone numbers, years in business (30+), regulator names (TSSA), response time (24 hours), town names (Whitby, Oshawa, Lakefield) — rather than vague superlatives. The trust bar is explicitly "data-driven: each badge renders only when there's a real credential behind it — we never fake trust" (style-guide.html).

**Structure:** eyebrow (context) → headline (the offer, as a plain statement) → one line of sub-copy (the proof: licensed/insured/years) → one or two actions. Repeated verbatim across home, service, and region pages.

**Testimonials:** attributed "Homeowner, {town}" — never a full name. Real-but-private.

**Placeholders are labelled, not faked:** unfinished sections say so directly in visible copy — *"Owner story, credentials, and the trucks go here (real content + photos to follow)"* (about.astro) — rather than shipping filler lorem ipsum.

## Visual foundations

**The core rule:** monochrome base + one wood accent as punctuation. True-neutral ink and paper — inherited from the black-and-white cube trucks — carry the brand; if you removed the accent it should still read as The Appliance Connection. **Chrome stays monochrome; full colour lives only in photography** (the finished install).

**The structural language:** thin, strong lines and boxes on graph paper. An 8px ruling (`--grid-image`, `--grid-line`) sits under every band and flips to white hairlines inside `.on-dark`; it fades out below 640px. Boxes are square, drawn with a single 1px ink line, and lifted with a short soft shadow — semi-flat depth, never a gradient. Grids of cells share **one** ruling (1px gap on an ink ground) rather than each cell drawing its own outline, so a card grid reads as one continuous spreadsheet. A 10px wood square in a box's top-left corner is the system's one ornament — used sparingly, on the hero panel, CTA box, menus and the quote form.

**Color:** true neutrals (`neutral-0` `#ffffff` through `neutral-900` ink `#111111`) plus a single wood ramp — `wood-300` `#d9b27c` (`--color-accent`, primary-button fill with ink text) and `wood-700` `#7a4e2a` (`--link`, and the hover fill, which flips the label to paper). No other hue exists. Two tiers: primitives (raw ramps) feed semantic roles (`--color-text`, `--cta-bg`, etc.) — components only ever reference semantic roles, so re-skinning is a primitives-only edit.

**Type:** two roles, no more. ITC Benguiat (self-hosted, `font-weight: 400` display) for headlines and the wordmark only — an oversized, editorial display serif. A zero-cost system sans stack for everything read at length (body, UI, nav). Fluid `clamp()` scale from `--text-xs` (0.79rem) to `--text-display` (clamp 3.2rem–5.5rem) so headlines scale with viewport instead of jumping at breakpoints. Generous line-height on body (1.6) and tight/balanced on display (1.08, `text-wrap: balance`).

**Spacing:** 16px root, an editorial (generous) scale — `--space-xs` (8px) through `--space-5xl` (128px). Sections lean on the large end (`--space-4xl` = 96px section padding) rather than compressed SaaS-density spacing.

**Radii:** square everywhere — `--radius-none`/`sm`/`md`/`lg` all resolve to 0; `--radius-input` 2px is the single exception, on form controls. `--radius-pill` exists but is unused. Sharp corners are a deliberate signal, not an oversight.

**Shadows:** short and soft — `shadow-sm` for resting boxes, `shadow-md` on hover and ruled grids, `shadow-lg` for the hero panel, menus, CTA box and quote form. Shadows (plus deeper steps of the same neutral) are how depth is built, since gradients are out.

**Backgrounds:** flat colour plus the 8px ruling — no gradients, no textures, no illustration. Photo placeholders are an explicit pattern: a ruled cell with a crossed-diagonal hairline and a labelled tag naming the shot that belongs there, so an unshot slot always reads as "photo not yet supplied."

**Borders:** two weights only. `--color-border` (neutral-300) is the internal hairline — rows inside a box, dividers, nav separators. `--color-border-strong` (ink) is the structural line that outlines every box, card, input and grid. No colored borders, no left-border-accent card pattern.

**Cards:** white surface, 1px ink border, square, `shadow-sm`. Inside a ruled grid a card drops its own border and shares the grid's ruling. `ServiceCard` has no image/icon slot by design (text-first).

**Hover states:** primary button fills `wood-700` and flips its label to paper; secondary inverts to solid ink; links darken toward ink. Ruled cells lighten to `--color-bg-alt`. No lightening of buttons on hover anywhere.

**Press/active states:** not yet defined in source material — no scale/shrink or explicit active-state token exists today. Flagging as an open item.

**Dark sections:** a single `.on-dark` utility scope flips every semantic role to its inverse mapping (footer, feature CTA bands) — components never need dark-specific styling; they just render inside the scope.

**Transparency/blur:** none in the product UI. (The style-guide.html handoff document itself uses a `backdrop-filter: blur` sticky nav, but that's the specimen doc's own chrome, not a documented product pattern — not carried into this system's components.)

**Imagery:** none supplied yet. Every image slot in the source is an explicit "Finished install photo" placeholder — object/space-led photography (the finished kitchen, the completed install), no stock people, is the stated intent. Warm-neutral gradient placeholder stands in until real photography exists.

**Animation:** minimal and functional only — colour/background transitions on hover (`--dur` 200ms, `--dur-fast` 120ms, `ease-standard` cubic-bezier(0.2,0,0,1)), respecting `prefers-reduced-motion` (durations collapse to 0). No entrance animations, no bounce/spring easing, no scroll-triggered effects documented.

**Layout:** no fixed/sticky header — the header scrolls with the page. A sticky mobile tap-to-call bar (`CallBar`) is the one persistent fixed element, and it's mobile-only. Container widths: `--container-narrow` 704px (reading/about/contact copy), `--container-max` 1200px (default), `--container-wide` 1344px.

## Wordmark

The arched wordmark is core brand identity: "APPLIANCE CONNECTION" on a shallow arch, with a small horizontal "THE" resting above its left end. Use `Wordmark` (`variant="arched"`) wherever the name appears at display scale. It fills its container's width, so size it by sizing the parent, and keep it arched at every breakpoint. Where an arch won't fit (the primary nav, the footer), use `variant="flat"`, which puts a half-size "THE" above and left of "APPLIANCE" and "CONNECTION" on two lines. Use `tone="light"` on video and ink, with its ink offset shadow on for contrast, and `tone="dark"` on paper. Never retype the name in plain text as a lockup.

## Iconography

No icon font, no SVG icon set, no sprite. Glyphs are added only when a component genuinely needs one, and they're drawn in CSS from the same square-and-hairline vocabulary: the accordion's +/– tick, the select caret, the nav caret, the radio's inner square, the `→` on links. The two literal marks are the **✓ Unicode checkmark** (trust badges, checkbox, stat block) and the real **truck/AC logo mark** (`assets/logo/`). No emoji anywhere in product copy or UI.

## Known gaps / caveats

- **Press/active button & link states** are undefined in every source document — only hover states are specified. I have not invented one.
- **Real install photography** does not exist yet — every image slot renders the neutral gradient placeholder labelled "Finished install photo."
- `--radius-xl` (16px) is defined in tokens but not used by any current component — kept for future use, not removed.
